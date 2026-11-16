import React, { useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { EASE_LUXURY, Scroll3DReveal } from './Motion3D';

export type FaqCategory = 'toutes' | 'reparation' | 'actifs' | 'routine';

export interface FaqItem {
  id: string;
  category: Exclude<FaqCategory, 'toutes'>;
  themeLabel: string;
  question: string;
  answer: string;
}

const NATURAL_SKINCARE_FAQS: FaqItem[] = [
  {
    id: 'delai-reparation',
    category: 'reparation',
    themeLabel: 'Réparation · Délais',
    question: 'Combien de temps faut-il pour réparer une peau brûlée ou fragilisée ?',
    answer:
      'Dès que tu stoppes les agents décapants (hydroquinone, corticoïdes, savons agressifs), les sensations d’échauffement et de tiraillement diminuent généralement au bout de 10 à 14 jours grâce aux lipides purs comme le beurre de karité non raffiné. Pour restaurer durablement la barrière cutanée et stabiliser le teint, compte entre 4 et 8 semaines de régularité.'
  },
  {
    id: 'karite-baobab-pores',
    category: 'actifs',
    themeLabel: 'Actifs purs · Tolérance',
    question: 'Le beurre de karité brut ou l’huile de baobab risquent-ils de boucher mes pores ?',
    answer:
      'Non, lorsqu’ils sont purs, pressés à froid et dosés avec justesse sur une peau légèrement humidifiée après une eau florale ou du gel d’aloe vera. Ce sont les mélanges industriels chargés de silicones, d’huiles minérales et de cires occlusives qui étouffent la peau — pas deux gouttes d’huile vierge de baobab ou une fine noisette de karité chauffée dans les paumes.'
  },
  {
    id: 'arret-cremes-eclaircissantes',
    category: 'reparation',
    themeLabel: 'Teint & Rebond pigmentaire',
    question: 'Pourquoi mon teint ternit-il dès que j’arrête mes crèmes éclaircissantes ?',
    answer:
      'C’est un effet de dépendance et de rebond inflammatoire : les produits décapants bloquent artificiellement la mélanine tout en irritant le derme. À l’arrêt, la peau se protège en surproduisant du pigment. En réparant d’abord l’inflammation et en protégeant la peau du soleil au quotidien, tu retrouves un teint propre et stable qui ne s’effondre plus.'
  },
  {
    id: 'climat-tropical-harmattan',
    category: 'routine',
    themeLabel: 'Climat · Adaptation',
    question: 'Les soins naturels fonctionnent-ils sous climat chaud, humide ou en période d’harmattan ?',
    answer:
      'Oui, à condition d’adapter les textures à ton climat réel. Sous forte chaleur humide, on allège la routine avec un nettoyage doux sans décaper, une brume d’hibiscus et un hydratant léger non gras. En période d’harmattan sec ou sous climat tempéré hivernal, on renforce le scellement lipidique le soir pour éviter la peau cartonnée.'
  },
  {
    id: 'trier-routine-actuelle',
    category: 'routine',
    themeLabel: 'Transition · Tri beauté',
    question: 'Dois-je jeter tous mes produits actuels avant de commencer la méthode ?',
    answer:
      'Seulement tout soin contenant de l’hydroquinone, des corticoïdes ou des acides irritants non encadrés. Pour le reste, lors du diagnostic ou d’un accompagnement en visio, nous passons ta routine actuelle en revue afin de conserver ce qui respecte ta peau et remplacer progressivement le superflu par 3 gestes essentiels.'
  },
  {
    id: 'choisir-actifs-adaptes',
    category: 'actifs',
    themeLabel: 'Diagnostic · Sur mesure',
    question: 'Comment savoir quels actifs naturels conviennent vraiment à ma peau ?',
    answer:
      'Chaque peau a son propre niveau de sensibilité, son historique et son environnement. Tu peux démarrer gratuitement par le diagnostic cutané en ligne sur cette page pour obtenir une ordonnance matin et soir ciblée, puis réserver une séance visio si ta peau demande un suivi sur mesure.'
  }
];

const FAQ_FILTERS: Array<{ id: FaqCategory; label: string }> = [
  { id: 'toutes', label: 'Toutes' },
  { id: 'reparation', label: 'Réparation' },
  { id: 'actifs', label: 'Actifs purs' },
  { id: 'routine', label: 'Routine & Climat' }
];

interface FaqAccordionItemProps {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

export function FaqAccordionItem({ item, index, isOpen, onToggle }: FaqAccordionItemProps) {
  const buttonId = `faq-trigger-${item.id}`;
  const panelId = `faq-panel-${item.id}`;
  const numLabel = `0${index + 1}.`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: EASE_LUXURY }}
      className={`rounded-2xl transition-colors duration-200 ${
        isOpen
          ? 'bg-[#FDF0F5]/90 px-4 sm:px-6 my-1.5 border border-[#D45578]/25'
          : 'px-2 sm:px-3 border-b border-[#A82F55]/18 last:border-b-0 hover:bg-[#FDF0F5]/45'
      }`}
    >
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full py-5 sm:py-6 text-left flex items-start justify-between gap-4 cursor-pointer group"
      >
        <div className="flex items-start gap-3 sm:gap-4 min-w-0">
          <span
            className={`font-serif-luxury text-base sm:text-lg font-semibold tabular-nums shrink-0 pt-0.5 transition-colors ${
              isOpen ? 'text-[#A82F55]' : 'text-[#6F6268] group-hover:text-[#A82F55]'
            }`}
          >
            {numLabel}
          </span>

          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#A82F55]/85 mb-1">
              {item.themeLabel}
            </div>
            <span
              className={`block font-serif-luxury text-lg sm:text-xl md:text-[22px] font-medium leading-snug transition-colors ${
                isOpen ? 'text-[#171318]' : 'text-[#171318]/90 group-hover:text-[#A82F55]'
              }`}
            >
              {item.question}
            </span>
          </div>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.24, ease: EASE_LUXURY }}
          className={`shrink-0 mt-1 w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
            isOpen
              ? 'bg-[#D45578] border-[#D45578] text-[#FFFFFF]'
              : 'bg-[#FFFFFF] border-[#A82F55]/25 text-[#A82F55] group-hover:border-[#D45578]'
          }`}
          aria-hidden="true"
        >
          <Plus className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: EASE_LUXURY }}
            className="overflow-hidden"
          >
            <div className="pb-5 sm:pb-6 pl-7 sm:pl-10 pr-2 sm:pr-10">
              <p className="text-sm sm:text-[15px] text-[#3D3238] leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface FaqSectionProps {
  onOpenDiagnostic: () => void;
  onOpenBooking: () => void;
}

export function FaqSection({ onOpenDiagnostic, onOpenBooking }: FaqSectionProps) {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('toutes');
  const [openId, setOpenId] = useState<string | null>(NATURAL_SKINCARE_FAQS[0].id);

  const visibleFaqs =
    activeCategory === 'toutes'
      ? NATURAL_SKINCARE_FAQS
      : NATURAL_SKINCARE_FAQS.filter((item) => item.category === activeCategory);

  const handleCategoryChange = (category: FaqCategory) => {
    setActiveCategory(category);
    const matching =
      category === 'toutes'
        ? NATURAL_SKINCARE_FAQS
        : NATURAL_SKINCARE_FAQS.filter((item) => item.category === category);
    if (matching.length > 0 && !matching.some((item) => item.id === openId)) {
      setOpenId(matching[0].id);
    }
  };

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative z-0 w-full lg:w-[95%] max-w-[1390px] py-10 sm:py-14 md:py-16 px-1 sm:px-4 md:px-6"
    >
      <Scroll3DReveal direction="up">
        <div className="rounded-3xl md:rounded-[36px] bg-[#FFFFFF]/88 backdrop-blur-sm border border-[#FFFFFF] shadow-sm px-5 sm:px-9 md:px-12 lg:px-14 py-9 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Editorial Intro, Hairline Facts & Direct Actions */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: EASE_LUXURY }}
              className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-start"
            >
              <div className="text-xs font-semibold tracking-wider uppercase text-[#A82F55] mb-3 flex flex-wrap items-center gap-2">
                <span>Questions fréquentes</span>
                <span aria-hidden="true" className="text-[#4A3F45]">·</span>
                <span>Soins naturels</span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[44px] text-[#171318] font-medium leading-[1.08] tracking-tight text-balance">
                Tes questions, <br className="hidden sm:inline" />
                <span className="text-[#A82F55] italic"> nos réponses sans détours.</span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-[#3D3238] leading-relaxed max-w-md">
                Comprendre comment réagit ta peau face aux actifs naturels permet d’éviter les fausses promesses et d’installer une routine stable.
              </p>

              {/* Editorial Summary Metrics separated by subtle hairlines */}
              <div className="mt-6 pt-5 border-t border-[#A82F55]/20 w-full max-w-md grid grid-cols-2 gap-4">
                <div>
                  <div className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#171318] tabular-nums">
                    4–8 sem.
                  </div>
                  <div className="mt-0.5 text-xs text-[#6F6268]">
                    Pour stabiliser la barrière cutanée
                  </div>
                </div>
                <div>
                  <div className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#A82F55] tabular-nums">
                    0%
                  </div>
                  <div className="mt-0.5 text-xs text-[#6F6268]">
                    Hydroquinone ni corticoïdes
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenBooking}
                  className="group w-full sm:w-auto justify-center px-5 sm:px-7 py-3.5 rounded-full bg-[#D45578] hover:bg-[#A82F55] text-[#FFFFFF] transition-colors duration-200 text-xs sm:text-sm font-semibold uppercase tracking-wider cursor-pointer shadow-sm flex items-center gap-2.5 whitespace-nowrap shrink-0"
                >
                  <span>Poser ma question en visio</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                </motion.button>

                <button
                  type="button"
                  onClick={onOpenDiagnostic}
                  className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#A82F55] hover:text-[#171318] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Diagnostic gratuit →
                </button>
              </div>
            </motion.div>

            {/* Right Column: Theme Filter Tabs + Tactile Accordion List */}
            <div className="lg:col-span-7 flex flex-col">
              {/* Segmented Filter Tabs */}
              <div className="pb-5 mb-3 border-b border-[#A82F55]/20 flex flex-wrap items-center justify-between gap-3">
                <div
                  role="tablist"
                  aria-label="Filtrer les questions fréquentes"
                  className="inline-flex flex-wrap items-center gap-1 p-1 rounded-2xl sm:rounded-full bg-[#FDF0F5] border border-[#A82F55]/15 max-w-full"
                >
                  {FAQ_FILTERS.map((tab) => {
                    const isActive = activeCategory === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => handleCategoryChange(tab.id)}
                        className={`relative px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          isActive
                            ? 'text-[#FFFFFF]'
                            : 'text-[#3D3238] hover:text-[#171318]'
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="faq-filter-pill"
                            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                            className="absolute inset-0 rounded-full bg-[#171318] shadow-xs"
                          />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <span className="text-xs text-[#6F6268] font-medium tabular-nums">
                  {visibleFaqs.length} réponse{visibleFaqs.length > 1 ? 's' : ''}
                </span>
              </div>

              {/* Accordion Items */}
              <div className="divide-y divide-transparent">
                <AnimatePresence mode="popLayout" initial={false}>
                  {visibleFaqs.map((item, index) => (
                    <FaqAccordionItem
                      key={item.id}
                      item={item}
                      index={index}
                      isOpen={openId === item.id}
                      onToggle={() => handleToggle(item.id)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Scroll3DReveal>
    </section>
  );
}
