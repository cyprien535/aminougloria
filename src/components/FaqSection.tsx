import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const NATURAL_SKINCARE_FAQS: FaqItem[] = [
  {
    id: 'delai-reparation',
    question: 'Combien de temps faut-il pour réparer une peau brûlée ou fragilisée ?',
    answer:
      'Dès que tu stoppes les agents décapants (hydroquinone, corticoïdes, savons agressifs), les sensations d’échauffement et de tiraillement diminuent généralement au bout de 10 à 14 jours grâce aux lipides purs comme le beurre de karité non raffiné. Pour restaurer durablement la barrière cutanée et stabiliser le teint, compte entre 4 et 8 semaines de régularité.'
  },
  {
    id: 'karite-baobab-pores',
    question: 'Le beurre de karité brut ou l’huile de baobab risquent-ils de boucher mes pores ?',
    answer:
      'Non, lorsqu’ils sont purs, pressés à froid et dosés avec justesse sur une peau légèrement humidifiée après une eau florale ou du gel d’aloe vera. Ce sont les mélanges industriels chargés de silicones, d’huiles minérales et de cires occlusives qui étouffent la peau — pas deux gouttes d’huile vierge de baobab ou une fine noisette de karité chauffée dans les paumes.'
  },
  {
    id: 'arret-cremes-eclaircissantes',
    question: 'Pourquoi mon teint ternit-il dès que j’arrête mes crèmes éclaircissantes ?',
    answer:
      'C’est un effet de dépendance et de rebond inflammatoire : les produits décapants bloquent artificiellement la mélanine tout en irritant le derme. À l’arrêt, la peau se protège en surproduisant du pigment. En réparant d’abord l’inflammation et en protégeant la peau du soleil au quotidien, tu retrouves un teint propre et stable qui ne s’effondre plus.'
  },
  {
    id: 'climat-tropical-harmattan',
    question: 'Les soins naturels fonctionnent-ils sous climat chaud, humide ou en période d’harmattan ?',
    answer:
      'Oui, à condition d’adapter les textures à ton climat réel. Sous forte chaleur humide, on allège la routine avec un nettoyage doux sans décaper, une brume d’hibiscus et un hydratant léger non gras. En période d’harmattan sec ou sous climat tempéré hivernal, on renforce le scellement lipidique le soir pour éviter la peau cartonnée.'
  },
  {
    id: 'trier-routine-actuelle',
    question: 'Dois-je jeter tous mes produits actuels avant de commencer la méthode ?',
    answer:
      'Seulement tout soin contenant de l’hydroquinone, des corticoïdes ou des acides irritants non encadrés. Pour le reste, lors du diagnostic ou d’un accompagnement en visio, nous passons ta routine actuelle en revue afin de conserver ce qui respecte ta peau et remplacer progressivement le superflu par 3 gestes essentiels.'
  },
  {
    id: 'choisir-actifs-adaptes',
    question: 'Comment savoir quels actifs naturels conviennent vraiment à ma peau ?',
    answer:
      'Chaque peau a son propre niveau de sensibilité, son historique et son environnement. Tu peux démarrer gratuitement par le diagnostic cutané en ligne sur cette page pour obtenir une ordonnance matin et soir ciblée, puis réserver une séance visio si ta peau demande un suivi sur mesure.'
  }
];

const EASE_LUXURY: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
      initial={{ opacity: 0, y: 18, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      style={{ transformPerspective: 950 }}
      transition={{ duration: 0.42, delay: index * 0.05, ease: EASE_LUXURY }}
      className="border-b border-[#A82F55]/25"
    >
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full py-5 sm:py-6 text-left flex items-start justify-between gap-4 cursor-pointer group"
      >
        <div className="flex items-baseline gap-3 sm:gap-4">
          <span
            className={`font-serif-luxury text-lg sm:text-xl font-semibold tabular-nums shrink-0 transition-colors ${
              isOpen ? 'text-[#A82F55]' : 'text-[#4A3F45] group-hover:text-[#A82F55]'
            }`}
          >
            {numLabel}
          </span>
          <span
            className={`font-serif-luxury text-xl sm:text-2xl font-medium leading-snug transition-colors ${
              isOpen ? 'text-[#171318]' : 'text-[#171318]/90 group-hover:text-[#A82F55]'
            }`}
          >
            {item.question}
          </span>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.28, ease: EASE_LUXURY }}
          className="shrink-0 mt-1 text-[#A82F55]"
          aria-hidden="true"
        >
          <ChevronDown className="w-5 h-5" />
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
            <div className="pb-6 pl-8 sm:pl-10 pr-4 sm:pr-8">
              <p className="text-sm sm:text-base text-[#3D3238] leading-relaxed">
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
  const [openId, setOpenId] = useState<string | null>(NATURAL_SKINCARE_FAQS[0].id);

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative z-0 w-[96%] sm:w-[95%] md:w-[94%] lg:w-[93%] max-w-[1390px] pt-14 sm:pt-18 md:pt-22 pb-16 sm:pb-20 px-2 sm:px-4 md:px-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Editorial Intro & Direct Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: EASE_LUXURY }}
          className="lg:col-span-5 flex flex-col items-start"
        >
          <div className="text-xs font-semibold tracking-wider uppercase text-[#A82F55] mb-3 flex flex-wrap items-center gap-2">
            <span>Questions fréquentes</span>
            <span aria-hidden="true" className="text-[#4A3F45]">·</span>
            <span>Soins naturels</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[46px] text-[#171318] font-medium leading-[1.08] tracking-tight text-balance">
            Tes questions, <br />
            <span className="text-[#A82F55] italic">nos réponses sans détours.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#3D3238] leading-relaxed max-w-md">
            Comprendre comment réagit ta peau face aux actifs naturels permet d’éviter les fausses promesses et d’installer une routine stable.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenBooking}
              className="group px-7 py-3.5 rounded-full bg-[#D45578] hover:bg-[#A82F55] text-[#FFFFFF] transition-colors duration-200 text-xs sm:text-sm font-semibold uppercase tracking-wider cursor-pointer shadow-sm flex items-center gap-2.5 whitespace-nowrap shrink-0"
            >
              <span>Poser ma question en visio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

        {/* Right Column: Simple Accordion List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.48, delay: 0.08, ease: EASE_LUXURY }}
          className="lg:col-span-7 border-t border-[#A82F55]/25"
        >
          {NATURAL_SKINCARE_FAQS.map((item, index) => (
            <FaqAccordionItem
              key={item.id}
              item={item}
              index={index}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
