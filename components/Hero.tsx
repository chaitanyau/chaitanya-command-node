import React from 'react';
import { motion, useTransform, useMotionValue, useSpring, Variants } from 'framer-motion';
import { HERO_DATA } from '../constants';

// --- Animation Variants (for the initial reveal) ---
const containerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // Corrected, valid ease curve
    },
  },
};


export const Hero: React.FC = () => {
  const heroRef = React.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // --- Parallax Logic ---
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0) };
  
  const titleX = useTransform(x, (val) => val / 40);
  const titleY = useTransform(y, (val) => val / 40);
  const subtitleX = useTransform(x, (val) => val / 30);
  const subtitleY = useTransform(y, (val) => val / 30);
  const buttonsX = useTransform(x, (val) => val / 35);
  const buttonsY = useTransform(y, (val) => val / 35);

  // --- Breathing Glow Logic (Now only for the title) ---
  const glow = useSpring(0, { stiffness: 50, damping: 20, mass: 1 });
  React.useEffect(() => {
    const animate = () => { glow.set(glow.get() > 0.5 ? 0 : 1) };
    const interval = setInterval(animate, 2000);
    return () => clearInterval(interval);
  }, [glow]);
  const breathingTextShadow = useTransform(glow, (g) => {
    const blur1 = 2 + g * 4, blur2 = 8 + g * 10, blur3 = 20 + g * 22;
    const color = '#68faff';
    return `0 0 ${blur1}px #fff, 0 0 ${blur2}px ${color}, 0 0 ${blur3}px ${color}`;
  });
  
  // NOTE: The breathingBoxShadow is no longer needed as we will use whileHover for interactive glow.

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-screen flex items-center justify-center text-center relative select-none px-4"
    >
      <motion.div
        className="flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* --- TITLE --- */}
        <motion.h1
          variants={itemVariants}
          style={{
            x: titleX,
            y: titleY,
            textShadow: breathingTextShadow,
            fontSize: 'var(--font-size-xxl)',
          }}
          className="font-orbitron font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-400 text-stroke-1 text-stroke-cyan-400/50"
        >
          {HERO_DATA.title}
        </motion.h1>

        {/* --- SUBTITLE --- */}
        <motion.p
          variants={itemVariants}
          style={{
            x: subtitleX,
            y: subtitleY,
            fontSize: 'var(--font-size-base)',
            marginTop: 'var(--space-m)',
          }}
          className="max-w-2xl font-sans text-slate-400 tracking-wide leading-relaxed"
        >
          {HERO_DATA.subtitle}
        </motion.p>

        {/* --- BUTTONS --- */}
        <motion.div
          variants={itemVariants}
          style={{
            x: buttonsX,
            y: buttonsY,
            marginTop: 'var(--space-m)',
          }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.a
            href="#projects"
            // ACTION: The style prop is removed. All interactivity is now handled by Framer Motion props.
            whileHover={{ 
                scale: 1.05, // Increase size on hover
                // Add a highlight glow on hover
                boxShadow: "0px 5px 30px rgba(104, 250, 255, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }} // Shrink down on click/tap for feedback
            transition={{ type: "spring", stiffness: 400, damping: 17 }} // A snappy transition for hover/tap
            className="px-8 py-3 font-orbitron font-semibold text-sm uppercase tracking-wide bg-brand-primary text-brand-dark border-2 border-brand-primary rounded-md can-hover:hover:bg-transparent can-hover:hover:text-brand-primary"
          >
            Deployed Constructs
          </motion.a>
          
          <motion.a
            href="#mission"
            whileHover={{ 
                scale: 1.05, 
                boxShadow: "0px 5px 30px rgba(104, 250, 255, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="px-8 py-3 font-orbitron font-semibold text-sm uppercase tracking-wide text-brand-primary border-2 border-brand-primary rounded-md can-hover:hover:bg-brand-primary can-hover:hover:text-brand-dark"
          >
            {HERO_DATA.ctaSecondary}
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};