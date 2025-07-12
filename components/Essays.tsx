import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ESSAYS_DATA } from '../constants';

interface EssaysProps {
    essays: typeof ESSAYS_DATA;
}

// --- Animation Variants ---
const listVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.05 // A subtle stagger for each list item
      },
    },
};

const itemVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
        x: 0, 
        opacity: 1,
        transition: { type: 'spring', stiffness: 120 }
    },
};

// --- EssayItem Sub-Component ---
const EssayItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.li 
        variants={itemVariants} 
        className="flex items-center"
    >
        <span className="text-brand-primary mr-4 text-xl">➤</span>
        {/* ACTION: Kept the clean, modern typography from previous version */}
        <span className="font-sans text-lg text-slate-300">{children}</span>
    </motion.li>
);

// --- Main Essays Component ---
export const Essays: React.FC<EssaysProps> = ({ essays }) => {
    return (
        // This structure is correct. The 'section' class is crucial.
        <section id="writings" className="section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                
                <h2 className="font-orbitron text-3xl text-brand-light mb-12 text-center section-marker">
                    ESSAYS & WRITINGS
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    
                    {/* DRAFT PIPELINE 1 - Now an interactive glass card */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        // FIX: 'once: false' makes animation fire on scroll up and down.
                        viewport={{ once: false, amount: 0.2 }}
                        variants={listVariants}
                        className="
                            p-8 rounded-lg flex flex-col
                            bg-slate-800/40 backdrop-blur-lg 
                            border border-slate-700 
                            shadow-lg shadow-black/20
                            can-hover:hover:bg-slate-700/50 can-hover:hover:border-cyan-400
                            transition-all duration-300
                        "
                        whileHover={{ y: -8, scale: 1.02 }}
                    >
                        <h3 className="font-orbitron text-2xl text-brand-light mb-6 border-b border-slate-700 pb-3">// DRAFT PIPELINE 1</h3>
                        <ul className="space-y-4">
                            {essays.planned.map(title => <EssayItem key={title}>{title}</EssayItem>)}
                        </ul>
                    </motion.div>

                    {/* DRAFT PIPELINE 2 - Also an interactive glass card */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.2 }}
                        variants={listVariants}
                         className="
                            p-8 rounded-lg flex flex-col
                            bg-slate-800/40 backdrop-blur-lg 
                            border border-slate-700 
                            shadow-lg shadow-black/20
                            can-hover:hover:bg-slate-700/50 can-hover:hover:border-cyan-400
                            transition-all duration-300
                        "
                        whileHover={{ y: -8, scale: 1.02 }}
                    >
                        <h3 className="font-orbitron text-2xl text-brand-light mb-6 border-b border-slate-700 pb-3">// DRAFT PIPELINE 2</h3>
                        <ul className="space-y-4">
                            {essays.drafts.map(title => <EssayItem key={title}>{title}</EssayItem>)}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};