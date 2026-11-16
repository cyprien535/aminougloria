import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CtaSectionProps {
  onOpenBooking: () => void;
  onOpenDiagnostic: () => void;
}

const EASE_LUXURY: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function CtaSection({ onOpenBooking, onOpenDiagnostic }: CtaSectionProps) {
  return (
    <section
      id="cta"
      className="relative z-0 w-[96%] sm:w-[95%] md:w-[94%] lg:w-[93%] max-w-[1390px] py-8 sm:py-12 px-2 sm:px-4 md:px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: EASE_LUXURY }}
        className="rounded-3xl md:rounded-[36px] bg-[#171318] text-[#FFFFFF] px-6 sm:px-10 md:px-14 py-12 sm:py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center shadow-xl"
      >
        <div className="lg:col-span-7">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#F2CFD9] mb-3 flex flex-wrap items-center gap-2">
            <span>La Régénératrice</span>
            <span aria-hidden="true" className="text-[#FFFFFF]/40">·</span>
            <span>Passage à l’action</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[48px] font-medium leading-[1.08] tracking-tight text-balance">
            Prête à arrêter de détruire ta peau <br />
            <span className="text-[#F2CFD9] italic">et à retrouver ton vrai teint ?</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#FFFFFF]/80 leading-relaxed max-w-xl">
            Je construis plus qu’une marque : une référence sans artifices, sans mensonges et sans dépendance chimique. Échangeons en visio sur ta peau ou démarre ton bilan cutané dès maintenant.
          </p>
        </div>

        <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-4">
          <motion.button
            type="button"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenBooking}
            className="group px-7 sm:px-9 py-4 rounded-full bg-[#D45578] hover:bg-[#A82F55] text-[#FFFFFF] transition-colors duration-200 text-xs sm:text-sm font-semibold uppercase tracking-wider cursor-pointer shadow-md flex items-center gap-2.5 whitespace-nowrap shrink-0"
          >
            <span>Prendre rendez-vous avec Gloria</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenDiagnostic}
            className="px-6 py-3 rounded-full border border-[#FFFFFF]/25 hover:border-[#F2CFD9] text-[#FFFFFF]/90 hover:text-[#F2CFD9] transition-colors text-xs sm:text-sm font-semibold uppercase tracking-wider cursor-pointer whitespace-nowrap shrink-0"
          >
            Faire le diagnostic gratuit
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
