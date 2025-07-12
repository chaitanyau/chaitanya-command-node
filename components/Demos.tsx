import React from 'react';
import { motion, Variants } from 'framer-motion';
import { DEMOS_DATA } from '../constants';

interface DemosProps {
    demos: typeof DEMOS_DATA;
}

// --- Animation Variants ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, // Stagger each card's animation
      },
    },
};

const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
};

export const Demos: React.FC<DemosProps> = ({ demos }) => {
    return (
        // FIX: The component has the correct <section> wrapper to work with the header.
        <section id="demos" className="section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                
                {/* ACTION: Added a main H2 title for consistency and structure. */}
                <h2 
                    className="font-orbitron text-brand-light mb-16 text-center section-marker"
                    style={{ fontSize: 'var(--font-size-xl)' }}
                >
                    AVAILABLE DEMOS
                </h2>
                
                {/* 
                  ACTION: The list itself is now the animation container and a responsive grid.
                  This is a major structural and visual improvement.
                */}
                <motion.ul 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    // FIX: 'once: false' makes the animation trigger on scroll up AND down.
                    viewport={{ once: false, amount: 0.1 }}
                >
                    {demos.available.map((demo) => (
                        // ACTION: Each list item is now a fully interactive "glass card".
                        <motion.li 
                            key={demo}
                            variants={itemVariants} 
                            className="
                                p-6 rounded-lg flex items-center 
                                bg-slate-800/40 backdrop-blur-lg 
                                border border-slate-700 
                                shadow-lg shadow-black/20
                                can-hover:hover:bg-slate-700/50 can-hover:hover:border-cyan-400
                                transition-all duration-300
                            "
                            whileHover={{ 
                                y: -8, 
                                scale: 1.05,
                                boxShadow: "0px 10px 40px rgba(104, 250, 255, 0.15)"
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* ACTION: Typography is upgraded for a clean, modern look. */}
                             <span className="text-brand-primary mr-4 text-xl font-bold"></span>
                             <span className="font-sans text-lg font-medium text-slate-200">{demo}</span>
                        </motion.li> 
                    ))}
                </motion.ul>
            </div>
        </section>
    );
}