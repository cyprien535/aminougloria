import React, { useState } from 'react';
import { ArrowRight, Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export type RoutinePhaseFilter = 'tous' | 'reparer' | 'equilibrer' | 'regenerer';

export interface BoutiqueProduct {
  id: string;
  name: string;
  origin: string;
  phase: Exclude<RoutinePhaseFilter, 'tous'>;
  phaseLabel: string;
  format: string;
  benefit: string;
  priceAmount: number;
  priceLabel: string;
  image: string;
  imageAlt: string;
}

export const BOUTIQUE_PRODUCTS: BoutiqueProduct[] = [
  {
    id: 'karite-brut',
    name: 'Beurre de Karité Brut Non Raffiné',
    origin: 'Nord Bénin · Pression artisanale',
    phase: 'reparer',
    phaseLabel: 'Étape 01 · Réparer',
    format: 'Pot ambré 150 g · 100% brut',
    benefit:
      'Calme immédiatement les échauffements, répare les peaux brûlées et reconstruit le film hydrolipidique sans obstruer les pores.',
    priceAmount: 8500,
    priceLabel: '8 500 FCFA',
    image: '/assets/webp/product-karite.webp',
    imageAlt: 'Pot en verre ambré de beurre de karité brut non raffiné sur pierre travertine'
  },
  {
    id: 'huile-baobab',
    name: 'Huile Vierge de Baobab Pressée à Froid',
    origin: 'Afrique de l’Ouest · 100% pure',
    phase: 'equilibrer',
    phaseLabel: 'Étape 02 · Équilibrer',
    format: 'Flacon pipette 50 ml · Première pression',
    benefit:
      'Nourrit en profondeur, assouplit les peaux cartonnées et stabilise l’hydratation sans effet gras sous climat chaud ou sec.',
    priceAmount: 12000,
    priceLabel: '12 000 FCFA',
    image: '/assets/webp/product-baobab.webp',
    imageAlt: 'Flacon compte-gouttes en verre ambré d’huile vierge de baobab pressée à froid'
  },
  {
    id: 'eau-hibiscus',
    name: 'Eau Florale d’Hibiscus Apaisante',
    origin: 'Cotonou · Distillation douce',
    phase: 'regenerer',
    phaseLabel: 'Étape 03 · Régénérer',
    format: 'Vaporisateur givré 100 ml · Sans alcool',
    benefit:
      'Rééquilibre le pH après le nettoyage, atténue les rougeurs diffuses et réveille l’éclat uniforme naturel du teint.',
    priceAmount: 6500,
    priceLabel: '6 500 FCFA',
    image: '/assets/webp/product-hibiscus.webp',
    imageAlt: 'Vaporisateur givré d’eau florale d’hibiscus apaisante avec pétale frais sur travertine'
  }
];

const PHASE_FILTERS: Array<{ id: RoutinePhaseFilter; label: string }> = [
  { id: 'tous', label: 'Tous les soins' },
  { id: 'reparer', label: 'Réparer' },
  { id: 'equilibrer', label: 'Équilibrer' },
  { id: 'regenerer', label: 'Régénérer' }
];

const EASE_LUXURY: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface CartEntry {
  product: BoutiqueProduct;
  quantity: number;
}

interface BoutiqueSectionProps {
  onCheckoutOrder: (orderSummary: string) => void;
  onOpenDiagnostic: () => void;
}

function formatFcfa(amount: number): string {
  return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA`;
}

export function BoutiqueSection({ onCheckoutOrder, onOpenDiagnostic }: BoutiqueSectionProps) {
  const [activeFilter, setActiveFilter] = useState<RoutinePhaseFilter>('tous');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredProducts =
    activeFilter === 'tous'
      ? BOUTIQUE_PRODUCTS
      : BOUTIQUE_PRODUCTS.filter((item) => item.phase === activeFilter);

  const cartEntries: CartEntry[] = BOUTIQUE_PRODUCTS.reduce<CartEntry[]>((acc, product) => {
    const qty = cart[product.id] ?? 0;
    if (qty > 0) {
      acc.push({ product, quantity: qty });
    }
    return acc;
  }, []);

  const totalItems = cartEntries.reduce((sum, entry) => sum + entry.quantity, 0);
  const totalAmount = cartEntries.reduce(
    (sum, entry) => sum + entry.product.priceAmount * entry.quantity,
    0
  );

  const handleAddToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] ?? 0) + 1
    }));
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCart((prev) => {
      const next = (prev[productId] ?? 0) + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: next };
    });
  };

  const handleProceedToOrder = () => {
    if (cartEntries.length === 0) return;
    const lines = cartEntries.map(
      ({ product, quantity }) =>
        `• ${quantity} × ${product.name} (${formatFcfa(product.priceAmount * quantity)})`
    );
    const summary = `Commande Boutique :\n${lines.join('\n')}\nTotal estimé : ${formatFcfa(totalAmount)}`;
    setIsCartOpen(false);
    onCheckoutOrder(summary);
  };

  const handleDirectOrder = (product: BoutiqueProduct) => {
    onCheckoutOrder(
      `Je souhaite commander : ${product.name} (${product.priceLabel}).`
    );
  };

  return (
    <section
      id="boutique"
      className="relative z-0 w-[96%] sm:w-[95%] md:w-[94%] lg:w-[93%] max-w-[1390px] py-14 sm:py-18 md:py-22 px-2 sm:px-4 md:px-6"
    >
      {/* Editorial Split Header + Phase Filter & Bag Trigger */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: EASE_LUXURY }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 sm:pb-10 border-b border-[#A82F55]/25"
      >
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#A82F55] mb-3 flex flex-wrap items-center gap-2">
            <span>Boutique</span>
            <span aria-hidden="true" className="text-[#4A3F45]">·</span>
            <span>Nos produits naturels</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[46px] text-[#171318] font-medium leading-[1.08] tracking-tight text-balance">
            L’essentiel pur pour <br />
            <span className="text-[#A82F55] italic">réparer sans surcharger.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#3D3238] leading-relaxed max-w-xl">
            Trois actifs bruts, non raffinés et sourcés en Afrique de l’Ouest, formulés sans hydroquinone, sans corticoïdes et sans parfum synthétique.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* Interactive Routine Filter Segmented Control */}
          <div
            role="tablist"
            aria-label="Filtrer les produits par étape"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-full bg-[#FFFFFF]/70 border border-[#A82F55]/20"
          >
            {PHASE_FILTERS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-3.5 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#FFFFFF]'
                      : 'text-[#3D3238] hover:text-[#171318]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="boutique-filter-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#171318] shadow-xs"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Bag Button with Live Tabular Count */}
          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsCartOpen(true)}
            aria-label={`Ouvrir le panier (${totalItems} article${totalItems > 1 ? 's' : ''})`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFFFFF] border border-[#A82F55]/25 hover:border-[#A82F55] text-[#171318] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
          >
            <ShoppingBag className="w-4 h-4 text-[#A82F55]" aria-hidden="true" />
            <span>Panier</span>
            <motion.span
              key={totalItems}
              initial={{ scale: 1.25 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="tabular-nums text-[#A82F55] font-bold"
            >
              ({totalItems})
            </motion.span>
          </motion.button>
        </div>
      </motion.div>

      {/* 3-Column Product Collection Grid */}
      <motion.div
        layout
        className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => {
            const qtyInCart = cart[product.id] ?? 0;
            const isImageFailed = Boolean(failedImages[product.image]);

            return (
              <motion.article
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ y: -4 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: EASE_LUXURY
                }}
                className="group flex flex-col justify-between"
              >
                <div>
                  {/* Product Photography (4:3, neutral warm travertine backdrop) */}
                  <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-[#FFFFFF] border border-[#A82F55]/15 shadow-sm group-hover:shadow-md transition-shadow">
                    {isImageFailed ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#FCE4EC]/60">
                        <Sparkles className="w-8 h-8 text-[#A82F55] mb-2" />
                        <span className="font-serif-luxury text-xl text-[#171318]">
                          {product.name}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        width={900}
                        height={672}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [product.image]: true }))
                        }
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      />
                    )}
                  </div>

                  {/* Clean Unboxed Metadata */}
                  <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-[#4A3F45] font-medium">
                    <span className="text-[#A82F55] font-semibold">{product.phaseLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.origin}</span>
                  </div>

                  {/* Title + Tabular Price Baseline */}
                  <div className="mt-2 flex items-baseline justify-between gap-3">
                    <h3 className="font-serif-luxury text-2xl font-medium text-[#171318] leading-snug">
                      {product.name}
                    </h3>
                    <span className="text-[15px] font-bold text-[#171318] tabular-nums whitespace-nowrap shrink-0">
                      {product.priceLabel}
                    </span>
                  </div>

                  <div className="mt-1 text-xs text-[#4A3F45]">{product.format}</div>

                  <p className="mt-3 text-xs sm:text-sm text-[#3D3238] leading-relaxed">
                    {product.benefit}
                  </p>
                </div>

                {/* Action Bar */}
                <div className="mt-5 pt-4 border-t border-[#A82F55]/20 flex items-center justify-between gap-3">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAddToCart(product.id)}
                    className="px-4 py-2.5 rounded-full bg-[#171318] hover:bg-[#A82F55] text-[#FFFFFF] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {qtyInCart > 0 ? `Dans le panier (${qtyInCart})` : 'Ajouter au panier'}
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => handleDirectOrder(product)}
                    className="group/btn text-xs font-bold uppercase tracking-wider text-[#A82F55] hover:text-[#171318] flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Commander</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Bottom Advisory Hairline */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        className="mt-10 sm:mt-12 pt-6 border-t border-[#A82F55]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#3D3238]"
      >
        <p>
          Livraison Cotonou &amp; expéditions diaspora · Tu hésites sur l’actif adapté à ta peau ?
        </p>
        <button
          type="button"
          onClick={onOpenDiagnostic}
          className="text-xs font-bold uppercase tracking-wider text-[#A82F55] hover:text-[#171318] transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
        >
          Faire mon diagnostic gratuit →
        </button>
      </motion.div>

      {/* Slide-Over Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex justify-end bg-[#171318]/65 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 34 }}
              className="relative w-full max-w-md h-full bg-[#FFFFFF] border-l border-[#F2CFD9] p-6 sm:p-8 flex flex-col justify-between shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#F2CFD9]">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#A82F55] font-semibold">
                    Votre Sélection
                  </div>
                  <h3 className="font-serif-luxury text-2xl font-medium text-[#171318]">
                    Panier ({totalItems})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Fermer le panier"
                  className="p-2 rounded-full text-[#6F6268] hover:text-[#171318] hover:bg-[#F2CFD9]/40 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 divide-y divide-[#F2CFD9]">
                {cartEntries.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <ShoppingBag className="w-10 h-10 text-[#D45578] mb-3" />
                    <p className="font-serif-luxury text-xl text-[#171318] font-medium">
                      Votre panier est vide
                    </p>
                    <p className="mt-1 text-xs text-[#6F6268] max-w-xs leading-relaxed">
                      Ajoutez un soin pur adapté à votre étape (Réparer, Équilibrer ou Régénérer) pour composer votre routine.
                    </p>
                  </div>
                ) : (
                  cartEntries.map(({ product, quantity }) => (
                    <div key={product.id} className="py-4 flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        width={80}
                        height={60}
                        referrerPolicy="no-referrer"
                        className="w-20 h-16 rounded-xl object-cover bg-[#FCE4EC] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-[#A82F55] font-medium">{product.phaseLabel}</div>
                        <div className="font-serif-luxury text-lg font-medium text-[#171318] truncate">
                          {product.name}
                        </div>
                        <div className="text-xs font-semibold text-[#3D3238] tabular-nums mt-0.5">
                          {formatFcfa(product.priceAmount * quantity)}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(product.id, -1)}
                          aria-label={`Retirer une unité de ${product.name}`}
                          className="w-8 h-8 rounded-full border border-[#F2CFD9] hover:border-[#A82F55] flex items-center justify-center text-[#171318] cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold tabular-nums text-[#171318]">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(product.id, 1)}
                          aria-label={`Ajouter une unité de ${product.name}`}
                          className="w-8 h-8 rounded-full border border-[#F2CFD9] hover:border-[#A82F55] flex items-center justify-center text-[#171318] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartEntries.length > 0 && (
                <div className="pt-4 border-t border-[#F2CFD9] space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6F6268] font-medium">Sous-total estimé</span>
                    <span className="text-lg font-bold text-[#171318] tabular-nums">
                      {formatFcfa(totalAmount)}
                    </span>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={handleProceedToOrder}
                    className="w-full py-3.5 rounded-full bg-[#D45578] hover:bg-[#A82F55] text-[#FFFFFF] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Finaliser la commande</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
