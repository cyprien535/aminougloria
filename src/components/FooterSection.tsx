import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterSectionProps {
  onOpenBooking: () => void;
  onOpenDiagnostic: () => void;
}

const EASE_LUXURY: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function FooterSection({ onOpenBooking, onOpenDiagnostic }: FooterSectionProps) {
  const scrollToSection = (id: string) => {
    if (id === 'accueil') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 22, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      style={{ transformPerspective: 1000 }}
      transition={{ duration: 0.5, ease: EASE_LUXURY }}
      className="relative z-0 w-full lg:w-[95%] max-w-[1390px] pt-12 sm:pt-16 pb-8 sm:pb-10 px-1 sm:px-4 md:px-6 border-t border-[#A82F55]/25 mt-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#A82F55]/20">
        {/* Brand & Positioning */}
        <div className="md:col-span-5">
          <button
            type="button"
            onClick={() => scrollToSection('accueil')}
            className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-[#171318] hover:text-[#A82F55] transition-colors cursor-pointer text-left"
          >
            Gloria Aminou
          </button>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#A82F55]">
            Beauty Coach &amp; Cosmétique Naturelle · Cotonou, Bénin
          </p>
          <p className="mt-3 text-xs sm:text-sm text-[#3D3238] leading-relaxed max-w-sm">
            Accompagnement cutané holistique et actifs bruts d’Afrique de l’Ouest : réparer, équilibrer et régénérer votre peau naturellement.
          </p>
        </div>

        {/* Navigation Mirror */}
        <div className="md:col-span-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#171318] mb-3">
            Navigation
          </div>
          <nav aria-label="Navigation pied de page" className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs sm:text-sm text-[#3D3238]">
            <button
              type="button"
              onClick={() => scrollToSection('accueil')}
              className="text-left hover:text-[#A82F55] hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              Accueil
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('probleme')}
              className="text-left hover:text-[#A82F55] hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              Le constat
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('solution')}
              className="text-left hover:text-[#A82F55] hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              La Solution
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('boutique')}
              className="text-left hover:text-[#A82F55] hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              Boutique
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('apropos')}
              className="text-left hover:text-[#A82F55] hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              À propos
            </button>
            <button
              type="button"
              onClick={onOpenDiagnostic}
              className="text-left hover:text-[#A82F55] hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              Diagnostic gratuit
            </button>
          </nav>
        </div>

        {/* Direct Contact & Social */}
        <div className="md:col-span-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#171318] mb-3">
            Contact &amp; Échanges
          </div>
          <div className="flex flex-col items-start gap-2.5 text-xs sm:text-sm text-[#3D3238]">
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 hover:text-[#A82F55] hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#A82F55]" aria-hidden="true" />
              <span>Prendre rendez-vous WhatsApp</span>
            </button>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-[#A82F55] hover:underline underline-offset-4 transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#A82F55]" aria-hidden="true" />
              <span>@gloriaaminou</span>
            </a>
            <a
              href="mailto:contact@gloriaaminou.com"
              className="hover:text-[#A82F55] hover:underline underline-offset-4 transition-colors"
            >
              contact@gloriaaminou.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Brand Line */}
      <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#4A3F45]">
        <span>© {new Date().getFullYear()} Gloria Aminou · Tous droits réservés.</span>
        <span>Soins naturels · Sans hydroquinone, sans corticoïdes, sans artifices.</span>
      </div>
    </motion.footer>
  );
}
