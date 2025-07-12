import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { CONTACT_DATA, RESUME_DATA } from '../constants';
import { getAiResponse } from '../lib/ai';

interface ContactProps {
    contact: typeof CONTACT_DATA;
    resume: typeof RESUME_DATA;
}

// --- Animation Variants ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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

// --- Contact Form Sub-Component ---
const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [response, setResponse] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setResponse('');
        try {
            const aiResponse = await getAiResponse(formData);
            setResponse(aiResponse);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error("Gemini API Error:", error);
            setResponse('// TRANSMISSION FAILED: Anomaly detected in the network. Please use an alternative communication channel.');
            setStatus('error');
        }
    };

    return (
        <motion.div 
            variants={itemVariants}
            className="p-8 rounded-lg bg-slate-800/40 backdrop-blur-lg border border-slate-700 shadow-lg shadow-black/20 h-full flex flex-col"
        >
            <h3 className="font-orbitron text-2xl text-brand-light mb-6">// OPEN CHANNEL</h3>
            <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
                <div className="space-y-4 flex-grow">
                    <div>
                        <label htmlFor="name" className="font-source-code text-sm text-brand-primary">CALLSIGN / NAME</label>
                        <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} aria-label="Your name or callsign" className="w-full bg-slate-900/70 border border-slate-700 rounded-md p-2 mt-1 text-slate-200 font-source-code focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                    </div>
                     <div>
                        <label htmlFor="email" className="font-source-code text-sm text-brand-primary">COORDINATES / EMAIL</label>
                        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} aria-label="Your email address" className="w-full bg-slate-900/70 border border-slate-700 rounded-md p-2 mt-1 text-slate-200 font-source-code focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                    </div>
                     <div>
                        <label htmlFor="message" className="font-source-code text-sm text-brand-primary">TRANSMISSION / MESSAGE</label>
                        <textarea id="message" name="message" required value={formData.message} onChange={handleChange} rows={5} aria-label="Your message" className="w-full bg-slate-900/70 border border-slate-700 rounded-md p-2 mt-1 text-slate-200 font-source-code focus:outline-none focus:ring-2 focus:ring-brand-primary"></textarea>
                    </div>
                </div>
                 <motion.button 
                    type="submit" 
                    disabled={status === 'loading'} 
                    className="mt-6 w-full text-center px-8 py-3 font-orbitron font-bold bg-brand-primary text-brand-dark border-2 border-brand-primary can-hover:hover:bg-transparent can-hover:hover:text-brand-primary transition-all duration-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05, boxShadow: "0px 5px 30px rgba(47, 129, 247, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                    {status === 'loading' ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}
                </motion.button>
            </form>
            <AnimatePresence>
            {response && (
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-4 p-3 rounded-md font-source-code text-sm ${status === 'success' ? 'bg-blue-900/50 text-blue-300' : 'bg-red-900/50 text-red-300'}`}
                    role={status === 'success' ? 'status' : 'alert'}
                 >
                    <p className='font-bold mb-1'>{status === 'success' ? '>> RESPONSE RECEIVED:' : '>> SYSTEM ALERT:'}</p>
                    <p>{response}</p>
                 </motion.div>
            )}
            </AnimatePresence>
        </motion.div>
    );
};

// --- Main Contact Component ---
export const Contact: React.FC<ContactProps> = ({ contact, resume }) => {
    const contactLinks = [
        { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
        { label: "GitHub", value: contact.github, href: contact.github },
        { label: "LinkedIn", value: contact.linkedin, href: contact.linkedin },
        { label: "Blog", value: contact.blog, href: contact.blog },
    ];

    return (
        <section id="contact" className="section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                 <h2 
                    className="font-orbitron text-brand-light mb-16 text-center section-marker"
                    style={{ fontSize: 'var(--font-size-xl)' }}
                 >
                    CONTACT & DOSSIER
                </h2>
                
                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                >
                    <motion.div className="space-y-12" variants={itemVariants}>
                        {/* SECURE CHANNELS */}
                        <div className="p-8 rounded-lg bg-slate-800/40 backdrop-blur-lg border border-slate-700 shadow-lg shadow-black/20">
                            <h3 className="font-orbitron text-2xl text-brand-light mb-6">// SECURE CHANNELS</h3>
                            <div className="space-y-4">
                                {contactLinks.map(link => (
                                    <div key={link.label}>
                                        <p className="font-source-code text-sm text-brand-primary">{link.label}:</p>
                                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="font-sans text-base text-slate-300 can-hover:hover:text-cyan-400 break-all transition-colors">{link.value}</a>
                                    </div>
                                ))}
                                <div>
                                    <p className="font-source-code text-sm text-brand-primary">Command Base:</p>
                                    <p className="font-sans text-base text-slate-300">{contact.base}</p>
                                </div>
                            </div>
                        </div>

                        {/* ACCESS DOSSIER */}
                        <div className="p-8 rounded-lg bg-slate-800/40 backdrop-blur-lg border border-slate-700 shadow-lg shadow-black/20">
                            <h3 className="font-orbitron text-2xl text-brand-light mb-6">// ACCESS DOSSIER</h3>
                            <p className="font-sans text-lg font-medium text-slate-300 leading-relaxed mb-6">{resume.objective}</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.a 
                                    href={resume.downloadLink} 
                                    download="../docs/ChaitanyaUpadhyay_T_Resume_Light.pdf"
                                    className="inline-block w-full sm:w-auto text-center px-8 py-3 font-orbitron font-bold bg-brand-accent text-brand-dark border-2 border-brand-accent can-hover:hover:bg-transparent can-hover:hover:text-brand-accent transition-all duration-300 rounded-md"
                                    whileHover={{ scale: 1.05, boxShadow: "0px 5px 30px rgba(247, 120, 20, 0.4)"}}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    DOWNLOAD RESUME 1
                                </motion.a>
                                <motion.a 
                                    href={resume.downloadLink} 
                                    download="../docs/ChaitanyaUpadhyay_T_Resume_Dark.pdf"
                                    className="inline-block w-full sm:w-auto text-center px-8 py-3 font-orbitron font-bold bg-purple-600 text-white border-2 border-purple-600 can-hover:hover:bg-transparent can-hover:hover:text-purple-600 transition-all duration-300 rounded-md"
                                    whileHover={{ scale: 1.05, boxShadow: "0px 5px 30px rgba(150, 50, 200, 0.4)"}}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    DOWNLOAD RESUME 2
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>

                    <ContactForm />
                </motion.div>
            </div>
        </section> 
    );
};