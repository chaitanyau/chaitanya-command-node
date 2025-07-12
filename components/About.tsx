import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ABOUT_DATA } from '../constants';
import { BulletPoint } from './BulletPoint';

interface AboutProps {
    data: typeof ABOUT_DATA;
}

// --- Animation Variants ---
// ACTION: Enhanced variants for a smoother, more modern pop-in effect.
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" }
    },
};


// --- Main About Component ---
export const About: React.FC<AboutProps> = ({ data }) => {
    return ( 
        <section id="about" className="section">  
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">

                {/* ACTION: Added a consistent main title for the section */}
                <h2 className="font-orbitron text-3xl text-brand-light mb-16 text-center section-marker">
                    ABOUT COMMANDER
                </h2>
                
                {/* ACTION: The entire grid is now a motion component for staggered animations */}
                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    // FIX: 'once: false' makes animations fire every time it's scrolled into view
                    viewport={{ once: false, amount: 0.1 }}
                >
                    {/* --- LEFT COLUMN --- */}
                    <motion.div variants={itemVariants} className="lg:col-span-3">
                        <h3 className="font-orbitron text-2xl text-brand-light mb-4">// BIO</h3>
                        <p className="font-sans text-lg font-medium text-slate-300 leading-relaxed">{data.shortBio}</p>
                        
                        <div className="mt-12">
                            <h4 className="font-orbitron text-xl text-brand-light mb-4">// OPERATIONAL VALUES</h4>
                            {/* ACTION: Increased list item spacing */}
                            <ul className="space-y-4 font-sans text-slate-300">
                                {data.operationalValues.map((value, index) => (
                                    // Assuming BulletPoint renders a motion.li with itemVariants for stagger effect
                                    <BulletPoint key={index}>{value}</BulletPoint>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* --- RIGHT COLUMN --- */}
                    <motion.div variants={itemVariants} className="lg:col-span-2">
                        <h3 className="font-orbitron text-2xl text-brand-light mb-4">// CORE COMPETENCIES</h3>
                        <ul className="space-y-3">
                            {data.competencies.map((comp, index) => (
                                // ACTION: Transformed these list items into interactive glass cards
                                <motion.li 
                                    key={index} 
                                    variants={itemVariants} 
                                    className="
                                        p-4 rounded-md font-sans text-base font-medium text-slate-200
                                        bg-slate-800/40 backdrop-blur-lg 
                                        border border-slate-700
                                        can-hover:hover:bg-slate-700/50 can-hover:hover:border-cyan-400
                                        transition-all duration-300
                                    "
                                    whileHover={{
                                        y: -5,
                                        scale: 1.05,
                                        boxShadow: "0px 8px 30px rgba(104, 250, 255, 0.15)"
                                    }}
                                >
                                    {comp}
                                </motion.li>
                            ))}
                        </ul >
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};