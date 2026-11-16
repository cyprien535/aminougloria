import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Scroll3DReveal } from './Motion3D';

interface CtaSectionProps {
  onOpenBooking: () => void;
  onOpenDiagnostic: () => void;
}

export function CtaSection({ onOpenBooking, onOpenDiagnostic }: CtaSectionProps) {
  return (
    <section
      id="cta"
      className="relative z-0 w-full lg:w-[95%] max-w-[1390px] py-8 sm:py-12 px-1 sm:px-4 md:px-6"
    >
      <Scroll3DReveal direction="up">
        <div className="rounded-3xl md:rounded-[36px] bg-[#171318] text-[#FFFFFF] px-5 sm:px-10 md:px-14 py-10 sm:py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center shadow-xl">
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold tracking-wider uppercase text-[#F2CFD9] mb-3 flex flex-wrap items-center gap-2">
              <span>La Régénératrice</span>
              <span aria-hidden="true" className="text-[#FFFFFF]/40">·</span>
              <span>Passage à l’action</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[48px] font-medium leading-[1.08] tracking-tight text-balance">
              Prête à arrêter de détruire ta peau <br className="hidden sm:inline" />
              <span className="text-[#F2CFD9] italic"> et à retrouver ton vrai teint ?</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#FFFFFF]/80 leading-relaxed max-w-xl">
              Je construis plus qu’une marque : une référence sans artifices, sans mensonges et sans dépendance chimique. Échangeons en visio sur ta peau ou démarre ton bilan cutané dès maintenant.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-center gap-3.5 sm:gap-4">
            <motion.button
              type="button"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenBooking}
              className="group w-full sm:w-auto justify-center px-5 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#BD3A60] hover:bg-[#9E294D] text-[#FFFFFF] transition-colors duration-200 text-xs sm:text-sm font-semibold uppercase tracking-wider cursor-pointer shadow-md flex items-center gap-2.5 text-center sm:whitespace-nowrap shrink-0"
            >
              <span>Prendre rendez-vous avec Gloria</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenDiagnostic}
              className="w-full sm:w-auto justify-center px-5 sm:px-6 py-3 rounded-full border border-[#FFFFFF]/25 hover:border-[#F2CFD9] text-[#FFFFFF]/90 hover:text-[#F2CFD9] transition-colors text-xs sm:text-sm font-semibold uppercase tracking-wider cursor-pointer text-center sm:whitespace-nowrap shrink-0"
            >
              Faire le diagnostic gratuit
            </motion.button>
          </div>
        </div>
      </Scroll3DReveal>
    </section>
  );
}
