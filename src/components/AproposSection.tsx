import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { EASE_LUXURY, Scroll3DReveal, Tilt3DCard } from './Motion3D';

interface AproposSectionProps {
  onOpenBooking: () => void;
  onOpenDiagnostic: () => void;
}

const GLORIA_PILLARS = [
  {
    num: '01.',
    title: 'Vérité & pédagogie sans détours',
    detail:
      'Comprendre pourquoi une crème décape ou provoque un rebond pigmentaire avant d’appliquer quoi que ce soit sur sa peau.'
  },
  {
    num: '02.',
    title: 'Richesses botaniques brutes d’Afrique de l’Ouest',
    detail:
      'Karité sauvage non raffiné du Nord Bénin, huile vierge de baobab pressée à froid et eau florale d’hibiscus sans artifices.'
  },
  {
    num: '03.',
    title: 'Protocoles adaptés à ton vrai climat',
    detail:
      'Chaleur humide côtière, harmattan sec ou hiver européen : chaque peau reçoit uniquement les 3 gestes dont elle a besoin.'
  }
] as const;

export function AproposSection({ onOpenBooking, onOpenDiagnostic }: AproposSectionProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section
      id="apropos"
      className="relative z-0 w-full lg:w-[95%] max-w-[1390px] py-12 sm:py-16 md:py-22 px-1 sm:px-4 md:px-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
        {/* Left Column: Portrait Photograph with 3D Scroll Unfold & Subtle Hover Tilt */}
        <div className="lg:col-span-5">
          <Scroll3DReveal direction="left">
            <Tilt3DCard
              intensity={10}
              className="group w-full aspect-[4/5] rounded-[28px] md:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#FCE4EC] to-[#F2CFD9] border border-[#A82F55]/20 shadow-md hover:shadow-xl transition-shadow"
            >
              {imageFailed ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                  <Sparkles className="w-10 h-10 text-[#A82F55] mb-3" />
                  <p className="font-serif-luxury text-2xl text-[#171318] font-medium">
                    Gloria Aminou · La Régénératrice
                  </p>
                </div>
              ) : (
                <img
                  src="/assets/webp/gloria-apropos-md.webp"
                  srcSet="/assets/webp/gloria-apropos-sm.webp 480w, /assets/webp/gloria-apropos-md.webp 680w, /assets/webp/gloria-apropos.webp 1000w"
                  sizes="(max-width: 1023px) 92vw, 38vw"
                  alt="Gloria Aminou, Beauty Coach et fondatrice béninoise en studio"
                  width={1000}
                  height={1250}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => setImageFailed(true)}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              )}
            </Tilt3DCard>
          </Scroll3DReveal>
        </div>

        {/* Right Column: Editorial Story, Principles & Actions */}
        <motion.div
          initial={{ opacity: 0, x: 24, rotateY: -6 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          style={{ transformPerspective: 1100 }}
          transition={{ duration: 0.55, ease: EASE_LUXURY }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-semibold uppercase tracking-wider text-[#A82F55]">
            <span>À propos</span>
            <span aria-hidden="true" className="text-[#4A3F45]">·</span>
            <span>Gloria Aminou</span>
            <span aria-hidden="true" className="text-[#4A3F45]">·</span>
            <span className="text-[#4A3F45] font-medium">Cotonou, Bénin &amp; Visio internationale</span>
          </div>

          <h2 className="mt-3 font-serif-luxury text-3xl sm:text-4xl lg:text-[46px] text-[#171318] font-medium leading-[1.08] tracking-tight text-balance">
            Je n’embellis pas la réalité : <br className="hidden sm:inline" />
            <span className="text-[#A82F55] italic"> je t’apprends à réparer ta peau.</span>
          </h2>

          <p className="mt-5 text-sm sm:text-base text-[#3D3238] leading-relaxed max-w-2xl">
            Fondatrice de l’approche <strong className="text-[#171318] font-semibold">La Régénératrice</strong>, j’accompagne au quotidien les femmes et les hommes dont la peau a été fragilisée par les promesses rapides, les savons abrasifs et les mélanges éclaircissants à base d’hydroquinone ou de corticoïdes.
          </p>

          <p className="mt-3 text-sm sm:text-base text-[#3D3238] leading-relaxed max-w-2xl">
            Depuis Cotonou et en consultation visio partout dans le monde, ma conviction reste simple : une peau saine n’a besoin ni de dizaines de flacons, ni de décapage — seulement d’actifs bruts purs, de régularité et de gestes respectueux de sa mélanine naturelle.
          </p>

          {/* 3 Clean Editorial Pillars separated by hairlines */}
          <div className="mt-7 w-full max-w-2xl border-t border-[#A82F55]/25 divide-y divide-[#A82F55]/20">
            {GLORIA_PILLARS.map((pillar) => (
              <div key={pillar.num} className="py-4 flex items-baseline gap-3 sm:gap-4">
                <span className="font-serif-luxury text-lg font-semibold text-[#A82F55] tabular-nums shrink-0">
                  {pillar.num}
                </span>
                <div>
                  <h3 className="font-serif-luxury text-lg sm:text-xl font-medium text-[#171318] leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#3D3238] leading-relaxed">
                    {pillar.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenBooking}
              className="group w-full sm:w-auto justify-center px-6 sm:px-7 py-3.5 rounded-full bg-[#BD3A60] hover:bg-[#9E294D] text-[#FFFFFF] transition-colors duration-200 text-xs sm:text-sm font-semibold uppercase tracking-wider cursor-pointer shadow-sm flex items-center gap-2.5 whitespace-nowrap shrink-0"
            >
              <span>Échanger avec Gloria</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </motion.button>

            <button
              type="button"
              onClick={onOpenDiagnostic}
              className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#A82F55] hover:text-[#171318] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Faire mon diagnostic gratuit →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
