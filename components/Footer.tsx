import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FOOTER_DATA } from '../constants';

interface FooterProps {
    data: typeof FOOTER_DATA;
}

const footerVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const Footer: React.FC<FooterProps> = ({ data }) => {
    return (
        // ACTION: This motion.footer now handles the full-width glass effect.
        // - 'mt-24' provides space from the previous section.
        // - 'py-16' (etc.) provides vertical padding INSIDE the glass container.
        // - 'px-4' (etc.) provides side padding for mobile, but on larger screens the content will be centered.
        <motion.footer 
            className=" relative z-20 mt-24 py-16 md:py-24 px-4 sm:px-6 lg:px-8
                bg-slate-80/40 backdrop-blur-lg
                rounded-lg border border-slate-700 shadow-lg shadow-black/20
                text-center text-slate-200 font-sans
                border-t border-slate-700"
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* 
              ACTION: This inner div's only job is to constrain the text content
              to the desired max-width and center it.
            */}
            <div className="max-w-4xl mx-auto">
                <div className="text-center">
                    <p className="font-sans text-base text-slate-400">{data.line1}</p>
                    <p className="font-sans text-base text-slate-400 mt-1">
                        {data.line2}
                        <span className="font-semibold text-slate-200">{data.line2bold}</span>
                    </p>
                </div>
                
                <blockquote className="my-8 border-l-4 border-brand-primary pl-6">
                    <p className="font-sans text-lg italic text-slate-200 leading-relaxed">
                        "{data.quote}"
                    </p>
                    <cite className="block text-right mt-4 not-italic font-sans text-slate-500 font-medium">
                        — {data.author}
                    </cite>
                </blockquote>
            </div>
        </motion.footer>
    );
};