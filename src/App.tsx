/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Menu as MenuIcon, 
  X, 
  Sun, 
  Droplets, 
  Send,
  MessageCircle,
  Instagram,
  Sparkles
} from 'lucide-react';

// Visual Assets
const PORTRAIT_CUTOUT = "/assets/img/Portrait découpé d’une femme assise en tailleur.png";

interface DiagnosticResult {
  skinType: string;
  concern: string;
  climate: string;
  routine: {
    matin: string[];
    soir: string[];
    actifStar: string;
    conseilGloria: string;
  };
}

const SKIN_PROBLEMS = [
  {
    id: 'teint-irregulier',
    num: '01.',
    concernKey: 'taches',
    title: 'Teint irrégulier & taches rebelles',
    symptom: 'Zones sombres persistantes, effet masque et perte d’uniformité malgré les crèmes.',
    cause: 'Les mélanges décapants et actifs agressifs provoquent une inflammation chronique qui dérègle la mélanine.',
    reflex: 'Apaiser l’inflammation cutanée et réinstaller une protection solaire quotidienne avant toute correction.',
    image: '/src/assets/images/problem_uneven_skintone_1794663804656.jpg',
    imageAlt: 'Peau noire présentant un teint irrégulier et des taches d’hyperpigmentation naturelles'
  },
  {
    id: 'peau-abimee',
    num: '02.',
    concernKey: 'decapage',
    title: 'Peau brûlée, affinée ou sensibilisée',
    symptom: 'Échauffements, rougeurs, tiraillements vifs et peau qui marque au moindre frottement.',
    cause: 'L’hydroquinone, les corticoïdes et les savons trop abrasifs détruisent le film hydrolipidique protecteur.',
    reflex: 'Couper net l’agression chimique et colmater la barrière cutanée avec des lipides purs non raffinés.',
    image: '/src/assets/images/problem_sensitized_skin_1794663804705.jpg',
    imageAlt: 'Peau sensibilisée, rougie et fragilisée par l’altération de la barrière cutanée'
  },
  {
    id: 'perte-eclat',
    num: '03.',
    concernKey: 'secheresse',
    title: 'Perte d’éclat naturel & dépendance',
    symptom: 'Teint terne ou grisé dès que tu arrêtes un produit, avec sensation de peau cartonnée.',
    cause: 'La surcharge de soins chimiques inadaptés au climat étouffe la respiration cellulaire naturelle.',
    reflex: 'Alléger la routine vers 3 gestes essentiels : nettoyer sans décaper, hydrater et nourrir simplement.',
    image: '/src/assets/images/problem_dull_skin_fatigue_1794663805184.jpg',
    imageAlt: 'Peau terne et fatiguée face à l’accumulation de produits cosmétiques inadaptés'
  }
] as const;

const BOUTIQUE_ESSENTIALS = [
  {
    id: 'karite-brut',
    name: 'Beurre de Karité Brut Non Raffiné',
    origin: 'Nord Bénin · Pression artisanale',
    benefit: 'Répare les peaux brûlées et restaure le film hydrolipidique sans obstruer les pores.',
    price: '8 500 FCFA'
  },
  {
    id: 'huile-baobab',
    name: 'Huile Vierge de Baobab Pressée à Froid',
    origin: 'Afrique de l’Ouest · 100% pure',
    benefit: 'Nourrit en profondeur, assouplit les peaux cartonnées et redonne de l’éclat naturel.',
    price: '12 000 FCFA'
  },
  {
    id: 'eau-hibiscus',
    name: 'Eau Florale d’Hibiscus Apaisante',
    origin: 'Cotonou · Distillation douce',
    benefit: 'Rééquilibre le pH après le nettoyage, calme les rougeurs et prépare à l’hydratation.',
    price: '6 500 FCFA'
  }
] as const;

const SOLUTION_PILLARS = [
  {
    id: 'reparer',
    num: '01',
    stepLabel: 'Étape 01 · Réparer',
    timing: 'Semaines 1 à 2 · Apaisement & barrière cutanée',
    promise: 'Tu comprends ce qui abîme ta peau',
    headline: 'Couper net l’agression chimique et apaiser la barrière cutanée',
    description:
      'Tu comprends ce qui abîme ta peau : on élimine les mélanges décapants, l’hydroquinone et les corticoïdes pour stopper l’inflammation et reconstruire le film protecteur naturel.',
    actif: 'Beurre de Karité brut non raffiné du Nord Bénin',
    concernKey: 'decapage',
    matin: 'Rinçage doux à l’eau florale d’hibiscus & protection solaire SPF 50.',
    soir: 'Nettoyage à l’huile de baobab & beurre de karité brut pour cicatriser.',
    ctaLabel: 'Démarrer par la phase Réparer',
    ctaType: 'diagnostic' as const,
    image: '/src/assets/images/botanical_ingredients_shea_1794391064166.jpg',
    imageAlt: 'Beurre de karité brut non raffiné et huile botanique naturelle sur pierre travertine'
  },
  {
    id: 'equilibrer',
    num: '02',
    stepLabel: 'Étape 02 · Équilibrer',
    timing: 'Semaines 3 à 5 · Hydratation & simplicité',
    promise: 'Tu apprends à la réparer naturellement',
    headline: 'Alléger ta routine vers 3 gestes justes selon ton climat',
    description:
      'Tu apprends à la réparer naturellement : fini l’accumulation de flacons incompatibles. Tu stabilises le pH et l’hydratation selon ton climat (tropical humide, harmattan ou tempéré).',
    actif: 'Huile vierge de Baobab pressée à froid & Aloe vera pur',
    concernKey: 'secheresse',
    matin: 'Nettoyage minimaliste doux & hydratation légère à l’aloe vera.',
    soir: 'Brume d’hibiscus sur peau humide & 2 gouttes d’huile de baobab.',
    ctaLabel: 'Découvrir les actifs en boutique',
    ctaType: 'boutique' as const,
    image: '/src/assets/images/solution_step2_balance_1794665884233.jpg',
    imageAlt: 'Flacon d’huile de baobab pressée à froid, feuille d’aloe vera fraîche et fleurs d’hibiscus'
  },
  {
    id: 'regenerer',
    num: '03',
    stepLabel: 'Étape 03 · Régénérer',
    timing: 'Semaine 6 et plus · Éclat propre & autonomie',
    promise: 'Tu retrouves un teint propre, stable, sain',
    headline: 'Unifier ton teint durablement, sans artifices ni dépendance',
    description:
      'Tu retrouves un teint propre, stable, sain : une fois la barrière restaurée, les taches s’estompent au rythme naturel des cellules sans jamais dépendre d’une crème miracle.',
    actif: 'Macérât doux d’Hibiscus & Omégas de Baobab',
    concernKey: 'taches',
    matin: 'Eau florale réveillant l’éclat naturel & écran solaire haute tolérance.',
    soir: 'Soin doux aux fleurs d’hibiscus (2 soirs/sem.) & élixir de baobab.',
    ctaLabel: 'Faire mon diagnostic gratuit',
    ctaType: 'diagnostic' as const,
    image: '/src/assets/images/radiant_melanin_skin_1794391065883.jpg',
    imageAlt: 'Peau noire naturelle, uniforme, saine et lumineuse sans artifices'
  }
] as const;

export default function App() {
  // Navigation & Modals
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isBoutiqueOpen, setIsBoutiqueOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Problem Section Interactive State
  const [selectedProblem, setSelectedProblem] = useState<string>('teint-irregulier');

  // Solution Section Image Fallback State
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Diagnostic Quiz State
  const [quizStep, setQuizStep] = useState(1);
  const [skinType, setSkinType] = useState('mixte');
  const [concern, setConcern] = useState('taches');
  const [climate, setClimate] = useState('tropical');
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);

  // Booking Form State
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');

  // Calculate diagnostic result
  const handleCalculateDiagnostic = () => {
    let actif = "Huile pure de Baobab pressée à froid";
    let conseil = "Votre peau a besoin de respirer. Arrêtez les gommages agressifs et renforcez votre barrière lipidique.";
    let matin = [
      "Nettoyage doux à l'eau florale d'hibiscus",
      "Sérum hydratant à l'aloe vera local",
      "Protection solaire fluide SPF 50"
    ];
    let soir = [
      "Double nettoyage à l'huile végétale bio",
      "Hydrolat purifiant de moringa",
      "2 gouttes d'huile régénérante de baobab"
    ];

    if (concern === 'decapage') {
      actif = "Beurre de Karité brut non raffiné du Bénin & Huile de Baobab";
      conseil = "Arrête immédiatement tout produit éclaircissant ou gommage décapant. Ta peau a été brûlée chimiquement : nous devons d'abord réparer la barrière lipidique et éteindre l'inflammation.";
      matin = [
        "Rinçage à l'eau florale tiède sans savon agressif",
        "Gel d'aloe vera pur pour calmer l'inflammation et le feu",
        "Fine couche de karité brut sauvage pour isoler et cicatriser"
      ];
      soir = [
        "Nettoyage ultra-doux à l'huile végétale de baobab",
        "Compresse d'eau florale apaisante",
        "Baume réparateur nuit au karité brut sauvage du Bénin"
      ];
    } else if (concern === 'taches') {
      actif = "Macérât d'Hibiscus Bio & Huile de Baobab";
      conseil = "Les acides de fruits doux de l'hibiscus unifient le teint sans décaper, tandis que les omégas du baobab estompent les marques d'hyperpigmentation.";
      soir[2] = "Élixir unifiant baobab & karkadé";
    } else if (concern === 'secheresse') {
      actif = "Beurre de Karité brut non raffiné du Bénin";
      conseil = "Appliquez une noisette de karité chauffée au creux des mains sur peau encore humide pour sceller l'hydratation.";
      soir[2] = "Baume de nuit protecteur au karité sauvage";
    } else if (concern === 'imperfections') {
      actif = "Infusion de Moringa et Huile de Jojoba";
      conseil = "Ne cherchez pas à assécher votre peau : l'excès de sébum est souvent une réaction de défense face aux produits trop décapants.";
      matin[1] = "Fluide régulateur au moringa purifiant";
    }

    setDiagnosticResult({
      skinType,
      concern,
      climate,
      routine: { matin, soir, actifStar: actif, conseilGloria: conseil }
    });
    setQuizStep(4);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setIsBookingOpen(false);
      setBookingName('');
      setBookingEmail('');
      setBookingPhone('');
      setBookingNotes('');
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#F2CFD9] text-[#171318] font-sans-clean selection:bg-[#D45578] selection:text-[#FFFFFF] flex flex-col justify-between p-3 sm:p-5 md:p-6 relative overflow-x-hidden">
      {/* Subtle Luxury Grain Overlay */}
      <div className="beauty-grain" aria-hidden="true" />

      {/* Main Framed Container */}
      <div className="w-full max-w-[1560px] mx-auto flex flex-col flex-1 items-center gap-4 sm:gap-5 md:gap-6 relative z-10">

        {/* ========================================================
            NAVIGATION (3D Brand + Accueil / Services / Boutique + Button)
            ======================================================== */}
        <header className="w-[99%] sm:w-[98%] md:w-[97%] lg:w-[96%] max-w-[1480px] rounded-full bg-[#FFFFFF]/95 backdrop-blur-md border border-[#FFFFFF] px-5 sm:px-8 md:px-10 py-2.5 sm:py-3 flex items-center justify-between gap-4 sm:gap-8 text-[#171318] shadow-sm shrink-0 transition-all">
          {/* Zone 1: 3D Brand Name */}
          <a
            href="#accueil"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-serif-luxury text-2xl sm:text-[26px] md:text-[30px] font-bold tracking-tight whitespace-nowrap shrink-0 text-3d-brand select-none"
          >
            Gloria Aminou
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#171318]">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-[#D45578] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Accueil
            </button>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('solution');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#D45578] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => setIsBoutiqueOpen(true)}
              className="hover:text-[#D45578] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Boutique
            </button>
          </nav>

          {/* Zone 3: Primary Button (+ mobile drawer trigger on small screens) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsBookingOpen(true)}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#D45578] hover:bg-[#A82F55] text-[#FFFFFF] text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 cursor-pointer shadow-xs transition-colors"
            >
              Prendre rendez-vous
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 rounded-full text-[#171318] hover:bg-[#F2CFD9]/40 transition-colors cursor-pointer"
              aria-label="Ouvrir le menu"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* ========================================================
            HERO SECTION (Large Framed Rounded Card - Foreground z-30)
            ======================================================== */}
        <section id="accueil" className="relative z-30 w-[96%] sm:w-[95%] md:w-[94%] lg:w-[93%] max-w-[1390px] flex-1 rounded-3xl md:rounded-[40px] overflow-hidden border border-[#D45578]/25 bg-gradient-to-r from-[#FFFFFF] via-[#FCE4EC] to-[#F2CFD9] shadow-lg min-h-[72vh] md:min-h-[80vh] flex flex-col md:flex-row items-center justify-between">
          {/* Left-to-Right Gradient Backdrop behind the text content */}
          <div 
            className="absolute inset-y-0 left-0 w-full md:w-3/4 lg:w-3/5 bg-gradient-to-r from-[#FFFFFF]/95 via-[#FDF0F5]/80 to-transparent pointer-events-none z-0" 
            aria-hidden="true" 
          />

          {/* Left Content Area (The 4 wireframed elements) */}
          <div className="relative z-10 w-full md:w-[54%] lg:w-[52%] px-6 sm:px-10 md:pl-12 md:pr-4 lg:pl-16 lg:pr-6 pt-10 pb-6 sm:py-12 md:py-16 flex flex-col items-start justify-center">
            
            {/* Wireframe Bar 1: Eyebrow capsule */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#F2CFD9] text-[#A82F55] text-xs font-semibold tracking-wider uppercase shadow-xs mb-4">
              <span className="w-2 h-2 rounded-full bg-[#D45578] animate-pulse" />
              Gloria Aminou · La Régénératrice
            </div>

            {/* Wireframe Bar 2: Main Headline from copywrite.txt */}
            <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-[58px] text-[#171318] leading-[1.08] font-medium tracking-tight mb-4">
              Peau brûlée, éclaircie ou abîmée ? <br />
              <span className="text-[#D45578] italic">Retrouve ton vrai teint.</span>
            </h1>

            {/* Wireframe Bar 3: Subtitle / Description */}
            <p className="text-sm sm:text-base text-[#6F6268] leading-relaxed max-w-lg mb-6 sm:mb-8 font-normal">
              Tu as essayé des produits, suivi des conseils, mais ta peau ne suit plus ?
            </p>

            {/* Wireframe Bar 4: Action Button with Glowing Effect */}
            <div className="flex items-center">
              <button 
                onClick={() => {
                  setQuizStep(1);
                  setDiagnosticResult(null);
                  setIsDiagnosticOpen(true);
                }}
                className="group relative flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#D45578] text-[#FFFFFF] hover:bg-[#A82F55] transition-all duration-300 text-xs sm:text-sm font-semibold tracking-wider uppercase cursor-pointer ring-4 ring-[#D45578]/25 hover:ring-[#D45578]/50 animate-rose-glow hover:-translate-y-0.5"
              >
                <span>Je corrige ma peau</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Method Tag with Smooth Scroll */}
            <a 
              href="#solution"
              className="mt-5 text-[11.5px] text-[#6F6268] hover:text-[#D45578] flex items-center gap-2 transition-colors cursor-pointer group"
            >
              <span className="text-[#D45578] font-bold">Approche :</span>
              <span className="font-medium text-[#171318] group-hover:text-[#D45578] transition-colors">Réparer · Équilibrer · Régénérer</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>

          </div>

          {/* Foreground Portrait Cutout on the right (Infinitely responsive across any card shape/size) */}
          <div className="relative md:absolute right-0 bottom-0 z-20 w-full md:w-auto h-[44vh] sm:h-[50vh] md:h-[92%] lg:h-[96%] flex items-end justify-center md:justify-end pointer-events-none px-4 md:px-0 md:pr-6 lg:pr-12">
            <img 
              src={PORTRAIT_CUTOUT} 
              alt="Gloria Aminou - Beauty coach béninoise"
              className="w-auto h-full max-h-[50vh] sm:max-h-[58vh] md:max-h-[85vh] lg:max-h-[92vh] object-contain object-bottom drop-shadow-[0_20px_40px_rgba(23,19,24,0.22)] select-none transition-all duration-300"
            />
          </div>
        </section>

        {/* ========================================================
            SECTION PROBLÈME (SUR LE PLAN D'ARRIÈRE-PLAN SANS CARTE)
            "Le problème, ce n'est pas toi. C'est ce que tu utilises."
            ======================================================== */}
        <section
          id="probleme"
          className="relative z-0 w-[96%] sm:w-[95%] md:w-[94%] lg:w-[93%] max-w-[1390px] py-12 sm:py-16 md:py-20 px-2 sm:px-4 md:px-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Editorial Truth & CTA */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <div className="text-xs font-semibold tracking-wider uppercase text-[#A82F55] mb-3 flex flex-wrap items-center gap-2">
                <span>Le constat</span>
                <span aria-hidden="true" className="text-[#4A3F45]">·</span>
                <span>Comprendre avant d’agir</span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[46px] text-[#171318] font-medium leading-[1.1] tracking-tight text-balance">
                Le problème, ce n’est pas toi. <br />
                <span className="text-[#A82F55] italic">C’est ce que tu utilises.</span>
              </h2>

              <p className="mt-5 text-sm sm:text-base text-[#3D3238] leading-relaxed max-w-md">
                Si tu es ici, ce n’est pas un hasard. Tu as essayé des produits, suivi des conseils, mais ta peau ne suit plus. Je n’embellis pas la réalité : je la corrige.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    const active = SKIN_PROBLEMS.find((p) => p.id === selectedProblem);
                    if (active) setConcern(active.concernKey);
                    setQuizStep(1);
                    setDiagnosticResult(null);
                    setIsDiagnosticOpen(true);
                  }}
                  className="group px-7 py-3.5 rounded-full bg-[#D45578] text-[#FFFFFF] hover:bg-[#A82F55] transition-all duration-200 text-xs sm:text-sm font-semibold uppercase tracking-wider cursor-pointer shadow-sm hover:shadow-md flex items-center gap-2.5"
                >
                  <span>Identifier mon problème</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Column: Interactive List of the 3 Core Skin Problems with Dedicated Visuals */}
            <div className="lg:col-span-7 flex flex-col border-t border-[#A82F55]/25">
              {SKIN_PROBLEMS.map((problem) => {
                const isSelected = selectedProblem === problem.id;
                return (
                  <div
                    key={problem.id}
                    className={`border-b border-[#A82F55]/25 transition-colors duration-200 ${
                      isSelected ? 'bg-[#FFFFFF]/70 px-4 sm:px-6 py-5 sm:py-6 rounded-2xl my-2 border-transparent shadow-xs' : 'py-5 sm:py-6 px-2 sm:px-3'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedProblem(problem.id)}
                      className="w-full text-left flex flex-col sm:flex-row items-start gap-4 sm:gap-5 cursor-pointer group"
                      aria-expanded={isSelected}
                    >
                      {/* Dedicated Problem Image (4:3) */}
                      <div className="w-full sm:w-40 md:w-44 aspect-[4/3] rounded-xl overflow-hidden bg-[#A82F55]/10 shrink-0 relative">
                        <img
                          src={problem.image}
                          alt={problem.imageAlt}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex-1 flex items-start justify-between gap-3 w-full">
                        <div className="flex items-baseline gap-2.5 sm:gap-3">
                          <span className="font-serif-luxury text-xl sm:text-2xl font-semibold text-[#A82F55] tabular-nums shrink-0">
                            {problem.num}
                          </span>
                          <div>
                            <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#171318] font-medium group-hover:text-[#A82F55] transition-colors leading-snug">
                              {problem.title}
                            </h3>
                            <p className="mt-1.5 text-xs sm:text-sm text-[#3D3238] leading-relaxed">
                              {problem.symptom}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-xs font-semibold uppercase tracking-wider shrink-0 mt-1 transition-colors ${
                            isSelected ? 'text-[#A82F55]' : 'text-[#4A3F45] group-hover:text-[#A82F55]'
                          }`}
                        >
                          {isSelected ? 'Ouvert' : 'Voir'}
                        </span>
                      </div>
                    </button>

                    {isSelected && (
                      <div className="mt-5 pt-4 border-t border-[#A82F55]/15 grid grid-cols-1 sm:grid-cols-2 gap-5 pl-0 sm:pl-44 md:pl-49">
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-[#A82F55] mb-1">
                            Ce qui abîme ta peau
                          </div>
                          <p className="text-xs sm:text-sm text-[#3D3238] leading-relaxed">
                            {problem.cause}
                          </p>
                        </div>
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-[#171318] mb-1">
                            Premier réflexe Gloria
                          </div>
                          <p className="text-xs sm:text-sm text-[#3D3238] leading-relaxed">
                            {problem.reflex}
                          </p>
                        </div>

                        <div className="sm:col-span-2 pt-1 flex flex-wrap items-center justify-between gap-3">
                          <span className="text-xs text-[#4A3F45]">
                            Approche naturelle · Sans dépendance chimique
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setConcern(problem.concernKey);
                              setQuizStep(1);
                              setDiagnosticResult(null);
                              setIsDiagnosticOpen(true);
                            }}
                            className="text-xs font-bold uppercase tracking-wider text-[#A82F55] hover:text-[#171318] flex items-center gap-1.5 cursor-pointer transition-colors"
                          >
                            <span>Corriger ce problème</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================
        {/* ========================================================
            SECTION SOLUTION (MÉTHODE EN 3 ÉTAPES EN ZIG-ZAG SUR ARRIÈRE-PLAN)
            ======================================================== */}
        <section
          id="solution"
          className="relative z-0 w-[96%] sm:w-[95%] md:w-[94%] lg:w-[93%] max-w-[1390px] py-14 sm:py-18 md:py-24 px-2 sm:px-4 md:px-6"
        >
          {/* Centered Top Header (Matching Wireframe) */}
          <div className="max-w-3xl mx-auto text-center pb-12 sm:pb-16">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A82F55] mb-3">
              La Solution · Approche naturelle
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[48px] text-[#171318] font-medium leading-[1.08] tracking-tight text-balance">
              Réparer, équilibrer, régénérer. <br />
              <span className="text-[#A82F55] italic">Ma méthode en 3 étapes.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#3D3238] leading-relaxed max-w-2xl mx-auto">
              Je n’embellis pas la réalité. Je la corrige. Sans artifices, sans mensonges et sans dépendance aux produits chimiques, voici comment ta peau retrouve un teint propre, stable et sain.
            </p>
          </div>

          {/* 3 Alternating Zig-Zag Steps */}
          <div className="space-y-14 sm:space-y-20 md:space-y-24">
            {SOLUTION_PILLARS.map((pillar, index) => {
              const isImageRight = index === 1;
              const isStepThree = index === 2;
              const isImageFailed = Boolean(failedImages[pillar.image]);

              return (
                <div
                  key={pillar.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center"
                >
                  {/* Step Image Block (Left on Steps 1 & 3, Right on Step 2) */}
                  <div
                    className={`${
                      isStepThree ? 'lg:col-span-6' : 'lg:col-span-5'
                    } ${isImageRight ? 'lg:order-2' : 'lg:order-1'}`}
                  >
                    <div
                      className={`w-full overflow-hidden rounded-[28px] md:rounded-[36px] bg-gradient-to-br from-[#FFFFFF]/70 via-[#FCE4EC] to-[#D45578]/25 shadow-md ${
                        isStepThree ? 'aspect-[4/3] sm:aspect-[5/4]' : 'aspect-[4/3]'
                      }`}
                    >
                      {isImageFailed ? (
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                          <Sparkles className="w-10 h-10 text-[#A82F55] mb-3" />
                          <p className="font-serif-luxury text-2xl text-[#171318] font-medium">
                            {pillar.actif}
                          </p>
                        </div>
                      ) : (
                        <img
                          src={pillar.image}
                          alt={pillar.imageAlt}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [pillar.image]: true }))
                          }
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                        />
                      )}
                    </div>
                  </div>

                  {/* Step Editorial Text Block (Right on Steps 1 & 3, Left on Step 2) */}
                  <div
                    className={`${
                      isStepThree ? 'lg:col-span-6' : 'lg:col-span-7'
                    } ${isImageRight ? 'lg:order-1' : 'lg:order-2'} flex flex-col items-start`}
                  >
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-[#A82F55]">
                      <span>{pillar.stepLabel}</span>
                      <span aria-hidden="true" className="text-[#4A3F45]">·</span>
                      <span className="text-[#4A3F45] font-medium">{pillar.timing}</span>
                    </div>

                    <h3 className="mt-3 font-serif-luxury text-2xl sm:text-3xl lg:text-[36px] text-[#171318] font-medium leading-[1.12] text-balance">
                      {pillar.headline}
                    </h3>

                    <p className="mt-4 text-sm sm:text-base text-[#3D3238] leading-relaxed max-w-xl">
                      {pillar.description}
                    </p>

                    {/* Clean Matin / Soir & Actif Hairline Breakdown */}
                    <div className="mt-6 pt-5 border-t border-[#A82F55]/25 w-full max-w-xl space-y-2.5 text-xs sm:text-sm text-[#3D3238]">
                      <div className="flex items-baseline gap-2.5">
                        <Sun className="w-3.5 h-3.5 text-[#A82F55] shrink-0 translate-y-0.5" />
                        <span>
                          <strong className="text-[#171318] font-semibold">Matin :</strong>{' '}
                          {pillar.matin}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2.5">
                        <Droplets className="w-3.5 h-3.5 text-[#A82F55] shrink-0 translate-y-0.5" />
                        <span>
                          <strong className="text-[#171318] font-semibold">Soir :</strong>{' '}
                          {pillar.soir}
                        </span>
                      </div>
                      <div className="pt-1 text-xs font-medium text-[#A82F55]">
                        Actif clé · <span className="text-[#171318]">{pillar.actif}</span>
                      </div>
                    </div>

                    {/* Step Action(s) */}
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      {pillar.ctaType === 'boutique' ? (
                        <button
                          type="button"
                          onClick={() => setIsBoutiqueOpen(true)}
                          className="group text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#A82F55] hover:text-[#171318] flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap shrink-0"
                        >
                          <span>{pillar.ctaLabel}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      ) : isStepThree ? (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setConcern(pillar.concernKey);
                              setQuizStep(1);
                              setDiagnosticResult(null);
                              setIsDiagnosticOpen(true);
                            }}
                            className="group px-7 py-3.5 rounded-full bg-[#D45578] hover:bg-[#A82F55] text-[#FFFFFF] transition-all duration-200 text-xs sm:text-sm font-semibold uppercase tracking-wider cursor-pointer shadow-sm flex items-center gap-2.5 whitespace-nowrap shrink-0"
                          >
                            <span>{pillar.ctaLabel}</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsBookingOpen(true)}
                            className="px-6 py-3.5 rounded-full border border-[#171318]/30 hover:border-[#A82F55] hover:bg-[#FFFFFF]/40 text-[#171318] hover:text-[#A82F55] transition-colors text-xs sm:text-sm font-semibold uppercase tracking-wider cursor-pointer whitespace-nowrap shrink-0"
                          >
                            Prendre rendez-vous
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setConcern(pillar.concernKey);
                            setQuizStep(1);
                            setDiagnosticResult(null);
                            setIsDiagnosticOpen(true);
                          }}
                          className="group text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#A82F55] hover:text-[#171318] flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap shrink-0"
                        >
                          <span>{pillar.ctaLabel}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>

      {/* ========================================================
          MODAL 1 : DIAGNOSTIC DE PEAU INTERACTIF
          ======================================================== */}
      {isDiagnosticOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#171318]/70 backdrop-blur-sm">
          <div className="relative max-w-xl w-full bg-[#FFFFFF] border border-[#F2CFD9] p-6 md:p-8 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => setIsDiagnosticOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-[#6F6268] hover:text-[#171318] transition-colors rounded-full hover:bg-[#F2CFD9]/40 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Step Header */}
            <div className="text-xs uppercase tracking-[0.2em] text-[#D45578] font-semibold mb-1">
              {quizStep <= 3 ? `Étape ${quizStep} sur 3 · Diagnostic Cutané` : "Votre Prescription Personnalisée"}
            </div>
            <h3 className="font-serif-luxury text-2xl md:text-3xl text-[#171318] mb-6 font-medium">
              {quizStep === 1 && "Quel est votre type de peau dominant ?"}
              {quizStep === 2 && "Quelle est votre préoccupation prioritaire ?"}
              {quizStep === 3 && "Dans quel climat vivez-vous ?"}
              {quizStep === 4 && "Votre ordonnance beauté naturelle"}
            </h3>

            {/* Step 1: Skin Type */}
            {quizStep === 1 && (
              <div className="space-y-3">
                {[
                  { id: 'seche', title: 'Peau Sèche', desc: 'Tiraillements fréquents, manque de souplesse, desquamation.' },
                  { id: 'mixte', title: 'Peau Mixte', desc: 'Zone T (front, nez, menton) brillante, joues normales à sèches.' },
                  { id: 'grasse', title: 'Peau Grasse', desc: 'Brillance sur l’ensemble du visage, pores dilatés, sébum abondant.' },
                  { id: 'sensible', title: 'Peau Sensible / Réactive', desc: 'Rougeurs, démangeaisons, réactions faciles aux produits conventionnels.' }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSkinType(item.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      skinType === item.id 
                        ? 'border-[#D45578] bg-[#F2CFD9]/35 text-[#171318] shadow-xs' 
                        : 'border-[#F2CFD9] hover:bg-[#F2CFD9]/15 text-[#6F6268]'
                    }`}
                  >
                    <div className="font-semibold text-sm text-[#171318]">{item.title}</div>
                    <div className="text-xs text-[#6F6268] mt-0.5">{item.desc}</div>
                  </div>
                ))}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setQuizStep(2)}
                    className="px-6 py-3 rounded-full bg-[#D45578] text-[#FFFFFF] text-xs uppercase font-semibold tracking-wider hover:bg-[#A82F55] transition-colors cursor-pointer"
                  >
                    Suivant →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Main Concern */}
            {quizStep === 2 && (
              <div className="space-y-3">
                {[
                  { id: 'decapage', title: 'Peau abîmée ou brûlée par produits décapants', desc: 'Produits éclaircissants, brûlures, rougeurs intenses, perte du teint naturel.' },
                  { id: 'taches', title: 'Teint irrégulier & Taches sombres rebelles', desc: 'Hyperpigmentation tenace, marques post-boutons, manque d’uniformité.' },
                  { id: 'secheresse', title: 'Barrière cutanée détruite & Peau cartonnée', desc: 'Peau qui tiraille, tiraillements vifs après la douche, manque de souplesse.' }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setConcern(item.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      concern === item.id 
                        ? 'border-[#D45578] bg-[#F2CFD9]/35 text-[#171318] shadow-xs' 
                        : 'border-[#F2CFD9] hover:bg-[#F2CFD9]/15 text-[#6F6268]'
                    }`}
                  >
                    <div className="font-semibold text-sm text-[#171318]">{item.title}</div>
                    <div className="text-xs text-[#6F6268] mt-0.5">{item.desc}</div>
                  </div>
                ))}
                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setQuizStep(1)}
                    className="px-5 py-2.5 rounded-full border border-[#6F6268] text-xs font-semibold text-[#6F6268] hover:text-[#171318] cursor-pointer"
                  >
                    ← Retour
                  </button>
                  <button
                    onClick={() => setQuizStep(3)}
                    className="px-6 py-3 rounded-full bg-[#D45578] text-[#FFFFFF] text-xs uppercase font-semibold tracking-wider hover:bg-[#A82F55] transition-colors cursor-pointer"
                  >
                    Suivant →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Climate */}
            {quizStep === 3 && (
              <div className="space-y-3">
                {[
                  { id: 'tropical', title: 'Climat Tropical / Chaud & Humide', desc: 'Afrique de l’Ouest, bord de mer, sueur et sébum fréquents.' },
                  { id: 'harmattan', title: 'Climat Sec / Période d’Harmattan', desc: 'Air sec chargé de poussière, dessèchement rapide de la peau.' },
                  { id: 'tempere', title: 'Climat Tempéré / 4 Saisons (Europe, Amérique)', desc: 'Chauffage en hiver, calcaire de l’eau, variations de température.' }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setClimate(item.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      climate === item.id 
                        ? 'border-[#D45578] bg-[#F2CFD9]/35 text-[#171318] shadow-xs' 
                        : 'border-[#F2CFD9] hover:bg-[#F2CFD9]/15 text-[#6F6268]'
                    }`}
                  >
                    <div className="font-semibold text-sm text-[#171318]">{item.title}</div>
                    <div className="text-xs text-[#6F6268] mt-0.5">{item.desc}</div>
                  </div>
                ))}
                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setQuizStep(2)}
                    className="px-5 py-2.5 rounded-full border border-[#6F6268] text-xs font-semibold text-[#6F6268] hover:text-[#171318] cursor-pointer"
                  >
                    ← Retour
                  </button>
                  <button
                    onClick={handleCalculateDiagnostic}
                    className="px-6 py-3 rounded-full bg-[#D45578] text-[#FFFFFF] text-xs uppercase font-semibold tracking-wider hover:bg-[#A82F55] transition-colors cursor-pointer"
                  >
                    Voir mon bilan personnalisé
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Diagnostic Result Output */}
            {quizStep === 4 && diagnosticResult && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-[#F2CFD9]/30 border border-[#D45578]/30">
                  <div className="text-xs uppercase font-semibold text-[#A82F55] mb-1">
                    Actif Botanique Clé
                  </div>
                  <div className="text-base font-serif-luxury font-semibold text-[#171318]">
                    {diagnosticResult.routine.actifStar}
                  </div>
                  <p className="text-xs text-[#6F6268] mt-1.5 leading-relaxed">
                    {diagnosticResult.routine.conseilGloria}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171318] mb-2 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-[#D45578]" />
                    Routine Matin (3 gestes essentiels)
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#6F6268] bg-[#FFFFFF] p-3 rounded-xl border border-[#F2CFD9]">
                    {diagnosticResult.routine.matin.map((step, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D45578]" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171318] mb-2 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-[#A82F55]" />
                    Routine Soir (Régénération & Réparation)
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#6F6268] bg-[#FFFFFF] p-3 rounded-xl border border-[#F2CFD9]">
                    {diagnosticResult.routine.soir.map((step, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A82F55]" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setIsDiagnosticOpen(false);
                      setIsBookingOpen(true);
                    }}
                    className="w-full py-3.5 rounded-full bg-[#171318] text-[#FFFFFF] hover:bg-[#D45578] transition-colors text-xs uppercase font-semibold tracking-wider text-center cursor-pointer"
                  >
                    Approfondir en visio avec Gloria Aminou
                  </button>
                  <button
                    onClick={() => setQuizStep(1)}
                    className="w-full py-2 text-xs text-[#6F6268] hover:text-[#171318] text-center cursor-pointer"
                  >
                    Recommencer le diagnostic
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2 : PRISE DE RENDEZ-VOUS & COACHING
          ======================================================== */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#171318]/70 backdrop-blur-sm">
          <div className="relative max-w-lg w-full bg-[#FFFFFF] border border-[#F2CFD9] p-6 md:p-8 rounded-3xl shadow-2xl">
            <button 
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-[#6F6268] hover:text-[#171318] transition-colors rounded-full hover:bg-[#F2CFD9]/40 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#F2CFD9] text-[#A82F55] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-2xl text-[#171318] mb-2 font-medium">
                  Demande bien reçue !
                </h3>
                <p className="text-xs text-[#6F6268] max-w-xs leading-relaxed">
                  Merci {bookingName || "chère cliente"}. Gloria Aminou ou son équipe vous recontactera sous 24h ouvrées par WhatsApp pour planifier votre séance.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#D45578] font-semibold mb-1">
                    Accompagnement Personnalisé
                  </div>
                  <h3 className="font-serif-luxury text-2xl md:text-3xl text-[#171318] font-medium">
                    Prendre rendez-vous
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#171318] mb-1">
                    Votre Nom complet *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ex: Reine Dossou"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2CFD9] text-xs text-[#171318] focus:outline-none focus:border-[#D45578]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#171318] mb-1">
                      Numéro WhatsApp *
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+229 ... ou +33 ..."
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2CFD9] text-xs text-[#171318] focus:outline-none focus:border-[#D45578]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#171318] mb-1">
                      Adresse Email *
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="reine@example.com"
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2CFD9] text-xs text-[#171318] focus:outline-none focus:border-[#D45578]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#171318] mb-1">
                    Vos défis de peau actuels (optionnel)
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="Décrivez brièvement votre routine actuelle ou ce que vous souhaitez améliorer..."
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#F2CFD9] text-xs text-[#171318] focus:outline-none focus:border-[#D45578]"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#D45578] hover:bg-[#A82F55] text-[#FFFFFF] transition-all text-xs uppercase font-semibold tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Envoyer ma demande de coaching</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 3 : SEARCH
          ======================================================== */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#171318]/60 backdrop-blur-sm">
          <div className="relative max-w-xl w-full bg-[#FFFFFF] border border-[#F2CFD9] p-6 shadow-2xl rounded-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-[#F2CFD9] pb-3">
              <div className="flex items-center gap-2.5 w-full">
                <Search className="w-4 h-4 text-[#D45578]" />
                <input 
                  type="text"
                  placeholder="Rechercher un actif, un conseil, une routine..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent text-[#171318] placeholder-[#6F6268]/60 text-sm focus:outline-none"
                />
              </div>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-[#6F6268] hover:text-[#171318] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="py-2 text-xs text-[#6F6268] uppercase tracking-wider mb-2">Thématiques fréquentes</div>
            <div className="flex flex-col gap-2">
              {[
                { title: "Diagnostic de peau en ligne gratuit", action: () => { setIsSearchOpen(false); setIsDiagnosticOpen(true); } },
                { title: "Bienfaits du beurre de karité brut non raffiné", action: () => { setIsSearchOpen(false); setIsDiagnosticOpen(true); } },
                { title: "Prendre rendez-vous en visio avec Gloria Aminou", action: () => { setIsSearchOpen(false); setIsBookingOpen(true); } }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={item.action}
                  className="flex items-center justify-between p-2.5 hover:bg-[#F2CFD9]/25 text-left transition-colors rounded-lg group cursor-pointer"
                >
                  <span className="text-sm text-[#171318] group-hover:text-[#D45578] transition-colors">{item.title}</span>
                  <span className="text-[10px] text-[#A82F55] font-semibold uppercase tracking-wider">Accéder →</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          NAVIGATION DRAWER MENU
          ======================================================== */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-start bg-[#171318]/60 backdrop-blur-sm transition-all duration-300">
          <div className="relative w-full max-w-sm h-full bg-[#FFFFFF] border-r border-[#F2CFD9] p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-10">
                <span className="font-serif-luxury text-2xl font-semibold text-[#171318]">Gloria Aminou</span>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 text-[#6F6268] hover:text-[#171318] cursor-pointer"
                  aria-label="Fermer le menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {[
                  { 
                    name: "Accueil", 
                    action: () => { 
                      setIsMenuOpen(false); 
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } 
                  },
                  { 
                    name: "Problèmes de peau", 
                    action: () => { 
                      setIsMenuOpen(false); 
                      const el = document.getElementById('probleme');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    } 
                  },
                  { 
                    name: "La Solution naturelle", 
                    action: () => { 
                      setIsMenuOpen(false); 
                      const el = document.getElementById('solution');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    } 
                  },
                  { 
                    name: "Boutique", 
                    action: () => { 
                      setIsMenuOpen(false); 
                      setIsBoutiqueOpen(true);
                    } 
                  },
                  { name: "Diagnostic de peau gratuit", action: () => { setIsMenuOpen(false); setIsDiagnosticOpen(true); } },
                  { name: "Prendre rendez-vous", action: () => { setIsMenuOpen(false); setIsBookingOpen(true); } }
                ].map((navItem, index) => (
                  <button
                    key={index}
                    onClick={navItem.action}
                    className="text-left font-serif-luxury text-xl text-[#171318] hover:text-[#D45578] transition-colors tracking-wide cursor-pointer"
                  >
                    {navItem.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="border-t border-[#F2CFD9] pt-6 text-xs text-[#6F6268] leading-relaxed">
              <p className="font-semibold text-[#171318]">Gloria Aminou</p>
              <p className="mt-0.5">Beauty Coach & Créatrice de contenus</p>
              <p className="mt-2 text-[#A82F55] font-medium">Cosmétique naturelle · Cotonou, Bénin</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 4 : BOUTIQUE NATURELLE
          ======================================================== */}
      {isBoutiqueOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#171318]/70 backdrop-blur-sm">
          <div className="relative max-w-2xl w-full bg-[#FFFFFF] border border-[#F2CFD9] p-6 md:p-8 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <button 
              type="button"
              onClick={() => setIsBoutiqueOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-[#6F6268] hover:text-[#171318] transition-colors rounded-full hover:bg-[#F2CFD9]/40 cursor-pointer"
              aria-label="Fermer la boutique"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs uppercase tracking-[0.2em] text-[#D45578] font-semibold mb-1">
              Boutique · Essentiels Naturels
            </div>
            <h3 className="font-serif-luxury text-2xl md:text-3xl text-[#171318] mb-2 font-medium">
              Actifs purs sélectionnés par Gloria
            </h3>
            <p className="text-xs sm:text-sm text-[#6F6268] mb-6">
              Des matières brutes non dénaturées, sans hydroquinone ni corticoïdes, adaptées à la réparation de la barrière cutanée.
            </p>

            <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-6 bg-[#F2CFD9]/20">
              <img
                src="/src/assets/images/botanical_ingredients_shea_1794391064166.jpg"
                alt="Karité brut et huile botanique naturelle sélectionnés par Gloria Aminou"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="divide-y divide-[#F2CFD9]">
              {BOUTIQUE_ESSENTIALS.map((item) => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-[#A82F55] font-medium">{item.origin}</div>
                    <div className="font-serif-luxury text-xl font-medium text-[#171318]">{item.name}</div>
                    <p className="text-xs text-[#6F6268] mt-1 max-w-md">{item.benefit}</p>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                    <span className="text-sm font-bold text-[#171318] tabular-nums">{item.price}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setBookingNotes(`Je souhaite commander / obtenir un conseil sur : ${item.name} (${item.price}).`);
                        setIsBoutiqueOpen(false);
                        setIsBookingOpen(true);
                      }}
                      className="px-4 py-2 rounded-full bg-[#D45578] hover:bg-[#A82F55] text-[#FFFFFF] text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      Commander
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
