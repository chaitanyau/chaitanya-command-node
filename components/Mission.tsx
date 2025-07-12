import React from 'react';
import { motion, Variants } from 'framer-motion';
import { LEARNING_DATA, ASTRONAUT_DATA } from '../constants';
import { BulletPoint } from './BulletPoint';

interface MissionProps {
    learning: typeof LEARNING_DATA;
    astronaut: typeof ASTRONAUT_DATA;
}

// --- Animation Variants (Consistent with other sections) ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
};

export const Mission: React.FC<MissionProps> = ({ learning, astronaut }) => {
    return (
        // FIX: The component is now wrapped in a proper <section> to solve header conflicts.
        <section id="mission" className="section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">

                <h2 
                    className="font-orbitron text-brand-light mb-16 text-center section-marker"
                    style={{ fontSize: 'var(--font-size-xl)' }}
                >
                    MISSION DIRECTIVES
                </h2>
                
                {/* ACTION: The main grid is now the animation container */}
                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    // FIX: 'once: false' ensures animation triggers on scroll up and down.
                    viewport={{ once: false, amount: 0.1 }}
                >
                    {/* --- LEARNING & DEVELOPMENT CARD --- */}
                    <motion.div 
                        variants={itemVariants}
                        className="p-8 rounded-lg bg-slate-800/40 backdrop-blur-lg border border-slate-700 shadow-lg shadow-black/20"
                    >
                        <h3 className="font-orbitron text-2xl text-brand-light mb-6 border-b border-slate-700 pb-3">// LEARNING & DEVELOPMENT</h3>
                        <div className="space-y-8">
                            <div>
                                <h4 className="font-orbitron text-lg text-brand-primary/90 mb-3">CURRENT INITIATIVES:</h4>
                                <ul className="space-y-3">
                                    {learning.currentInitiatives.map(item => <BulletPoint key={item}>{item}</BulletPoint>)}
                                </ul>
                            </div>
                             <div>
                                <h4 className="font-orbitron text-lg text-brand-primary/90 mb-3">CONVERGENCE GOALS:</h4>
                                <ul className="space-y-3">
                                     {learning.convergenceGoals.map(item => <BulletPoint key={item}>{item}</BulletPoint>)}
                                </ul>
                            </div>
                            {/* ACTION: Styled the 9-month goal as a highlighted inner card */}
                             <div className="p-4 rounded-md bg-brand-accent/10 border border-brand-accent/50">
                                <h4 className="font-orbitron text-lg text-brand-accent mb-2">9-MONTH GOAL:</h4>
                                <p className="font-sans text-base text-slate-200">{learning.nineMonthGoal}</p>
                            </div>
                        </div>
                    </motion.div>
            
                    {/* --- ASTRONAUT TRACK CARD --- */}
                    <motion.div 
                        variants={itemVariants}
                        className="p-8 rounded-lg bg-slate-800/40 backdrop-blur-lg border border-slate-700 shadow-lg shadow-black/20"
                    >
                        <h3 className="font-orbitron text-2xl text-brand-light mb-6 border-b border-slate-700 pb-3">// ASTRONAUT TRACK</h3>
                        <div className="space-y-8">
                            <div>
                                <h4 className="font-orbitron text-lg text-brand-primary/90 mb-3">MISSION:</h4>
                                {/* ACTION: Upgraded typography for readability */}
                                <p className="font-sans text-base text-slate-300 leading-relaxed">{astronaut.mission}</p>
                            </div>
                            <div>
                                <h4 className="font-orbitron text-lg text-brand-primary/90 mb-3">LAUNCH PATH:</h4>
                                <ul className="space-y-3">
                                     {astronaut.launchPath.map(item => <BulletPoint key={item}>{item}</BulletPoint>)}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};