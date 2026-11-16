import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from 'motion/react';

export const EASE_LUXURY: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#A82F55] via-[#D45578] to-[#F2CFD9] z-50 pointer-events-none"
    />
  );
}

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function Tilt3DCard({
  children,
  className = '',
  intensity = 10
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 260,
    damping: 24
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 260,
    damping: 24
  });
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), {
    stiffness: 200,
    damping: 28
  });
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), {
    stiffness: 200,
    damping: 28
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(px);
    mouseY.set(py);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 62%)`
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        shouldReduceMotion
          ? undefined
          : {
              transformPerspective: 1000,
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d'
            }
      }
      whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
      transition={{ duration: 0.25, ease: EASE_LUXURY }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          style={{ background: glareBackground }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        />
      )}
    </motion.div>
  );
}

interface Scroll3DRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
}

export function Scroll3DReveal({
  children,
  className = '',
  direction = 'up'
}: Scroll3DRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const initialRotateX = direction === 'up' ? 12 : 5;
  const initialRotateY = direction === 'left' ? -12 : direction === 'right' ? 12 : 0;

  return (
    <div className={`[perspective:1200px] ${className}`}>
      <motion.div
        initial={{
          opacity: 0.2,
          scale: 0.94,
          y: 28,
          rotateX: initialRotateX,
          rotateY: initialRotateY
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0
        }}
        viewport={{ once: true, amount: 0.16 }}
        style={{
          transformPerspective: 1200,
          transformStyle: 'preserve-3d'
        }}
        transition={{ duration: 0.62, ease: EASE_LUXURY }}
        className="w-full h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
