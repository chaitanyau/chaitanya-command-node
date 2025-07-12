import React from 'react';
import { motion, Variants } from 'framer-motion';

interface BulletPointProps {
    children: React.ReactNode;
}

const itemVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
};

export const BulletPoint: React.FC<BulletPointProps> = ({ children }) => (
    <motion.li variants={itemVariants} className="flex items-start">
        <span className="text-brand-primary mr-3 mt-1">&#10148;</span>
        <span>{children}</span>
    </motion.li>
);
