import React from 'react';
import { motion, Variants } from 'framer-motion';
import { TechCategory } from '../types';

interface TechStackProps {
  categories: TechCategory[];
}

// --- Animation Variants (Consistent with other sections) ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const TechStack: React.FC<TechStackProps> = ({ categories }) => {
  return (
    // FIX: The component is now wrapped in a proper <section> to solve header conflicts.
    <section id="stack" className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        
        {/* ACTION: Added a main H2 title for consistency. */}
        <h2 
          className="font-orbitron text-brand-light mb-16 text-center section-marker"
          style={{ fontSize: 'var(--font-size-xl)' }}
        >
          TECHNOLOGY STACK
        </h2>

        {/* ACTION: The grid is now the main animation container. */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          // FIX: 'once: false' ensures animation triggers on scroll up and down.
          viewport={{ once: false, amount: 0.1 }}
        >
          {categories.map((category) => (
            // ACTION: Each category is now a fully interactive "glass card".
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="
                p-6 rounded-lg flex flex-col h-full 
                bg-slate-800/40 backdrop-blur-lg 
                border border-slate-700 
                shadow-lg shadow-black/20
                transition-all duration-300
                can-hover:hover:bg-slate-700/50 can-hover:hover:border-cyan-400
              "
              whileHover={{
                y: -8,
                scale: 1.05,
                boxShadow: "0px 10px 40px rgba(104, 250, 255, 0.15)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* ACTION: Upgraded title typography and border color. */}
              <h3 className="font-orbitron text-lg font-bold text-brand-light mb-4 pb-3 border-b border-slate-700 uppercase tracking-wider">
                {category.title}
              </h3>

              {/* ACTION: Upgraded list typography for better readability. */}
              <ul className="space-y-3 mt-4">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center font-sans text-base text-slate-300"
                  >
                    <span className="text-brand-accent mr-3 font-bold"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};