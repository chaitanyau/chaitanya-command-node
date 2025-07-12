import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Project } from '../types';

interface ProjectsProps {
    projects: Project[];
}

// --- Animation Variants ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger the appearance of each card
      },
    },
};

// ACTION: Enhanced item animation for a more modern "pop-in" effect
const itemVariants: Variants = {
    hidden: { 
        y: 30, 
        opacity: 0,
        scale: 0.95,
    },
    visible: { 
        y: 0, 
        opacity: 1,
        scale: 1,
        transition: { 
            duration: 0.5,
            ease: [0.25, 1, 0.5, 1] // A nice ease-out curve
        } 
    },
};


// --- ProjectCard Sub-Component ---
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <motion.div
            variants={itemVariants}
            // ACTION: Enhanced "Glass Stack" and Hover Effect
            // - The base styles create a more refined glass look with a semi-transparent grey-blue background.
            // - A subtle base box-shadow gives it depth.
            // - On hover, the background and border light up to a cyan color.
            // - The 'transition-all' property ensures these changes are smooth.
            className="
              flex flex-col h-full p-6 rounded-lg 
              bg-slate-800/40 backdrop-blur-lg 
              border border-slate-700 
              shadow-lg shadow-black/20
              can-hover:hover:bg-slate-700/50 can-hover:hover:border-cyan-400
              transition-all duration-300
            "
            // ACTION: The Framer Motion hover animation now adds a lift, scale, and a bright glow.
            whileHover={{ 
                y: -10, 
                scale: 1.03,
                boxShadow: "0px 10px 40px rgba(104, 250, 255, 0.2)"
            }}
        >
            <h3 className="font-orbitron text-xl font-bold text-brand-primary mb-3">{project.title}</h3>
            
            {/* ACTION: Upgraded typography for description for much better readability */}
            <p className="font-sans text-base text-slate-300 leading-relaxed mb-4 flex-grow">{project.description}</p>
            
            <div className="mt-auto pt-4 border-t border-slate-700/50">
                {project.stack && (
                    // ACTION: Upgraded typography for metadata
                    <p className="font-sans text-sm text-slate-400 mb-2">
                        <span className="font-bold text-brand-primary/80">// STACK: </span>{project.stack}
                    </p>
                )}
                <p className="font-sans text-sm text-slate-400">
                    <span className="font-bold text-brand-primary/80">// ROLE: </span>{project.role}
                </p>
            </div>
        </motion.div>
    );
};


// --- Main Projects Component ---
export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
    return (
        // FIX: The component is now wrapped in a <section> with the correct id and className.
        <section id="projects" className="section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                
                <h2 className="font-orbitron text-3xl text-brand-light mb-12 text-center section-marker">
                    DEPLOYED CONSTRUCTS
                </h2>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    // FIX: 'once: false' ensures animation runs every time it enters the viewport (up or down).
                    viewport={{ once: false, amount: 0.1 }}
                >
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};