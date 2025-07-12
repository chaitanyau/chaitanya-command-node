import React, { useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useScrollStore } from './useScrollStore'; // NEW: Import our store

// Keep all  component and data imports
import Starfield from './components/StarsCanvas'; // I am using the name you provided
import {
  ABOUT_DATA, PROJECTS_DATA, TECH_STACK_DATA, LEARNING_DATA,
  ASTRONAUT_DATA, CONTACT_DATA, FOOTER_DATA, NAVIGATION_LINKS,
  RESUME_DATA, ESSAYS_DATA, DEMOS_DATA
} from './constants';
import { Header } from './components/Header';
import { CustomCursor } from './components/CustomCursor';
import { Section } from './components/Section';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { TechStack } from './components/TechStack';
import { Mission } from './components/Mission';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Essays } from './components/Essays';
import { Demos } from './components/Demos';
import BloomBackground from './components/BloomBackground'; 
import NebulaGradient from './components/NebulaGradient';
// NEW: A dedicated component for the 3D background scene.
// It is now completely separate from my HTML content.
const Scene = () => (
  <Canvas style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
    <Suspense fallback={null}>
      <Starfield />
    </Suspense>
  </Canvas>
);

const App: React.FC = () => {
  // Get the 'setter' function from our store.
  const setScrollProgress = useScrollStore((state) => state.setScrollProgress);

  // NEW: This effect listens to the main window's scroll event.
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      // Calculate scroll progress from 0 to 1 and avoid division by zero.
      const progress = scrollHeight > clientHeight ? scrollTop / (scrollHeight - clientHeight) : 0;
      // Update our global store with the new progress.
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call to set position on load 
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrollProgress]);

  return (
    <>
      {/* global components */}
       {/*     <BloomBackground />         */}    {/* update: Removed the Moving Particles for better  */}
      <NebulaGradient />
      <CustomCursor />
      <Header links={NAVIGATION_LINKS} />

      {/* 
       HTML content now lives here, in the main document,
        allowing for normal, reliable browser scrolling.
      */}
      <main className="relative z-10 px-4 md:px-12 xl:px-24">
        <Hero />

        <div className="max-w-7xl mx-auto space-y-32 md:space-y-48 lg:space-y-64">
          <Section id="about">
            <SectionTitle>About the Commander</SectionTitle>
            <About data={ABOUT_DATA} />
          </Section>

          <Section id="projects">
            <SectionTitle>Intelligence Constructs</SectionTitle>
            <Projects projects={PROJECTS_DATA} />
          </Section>

          <Section id="writings">
            <SectionTitle>Writings & Intel</SectionTitle>
            <Essays essays={ESSAYS_DATA} />
          </Section>

          <Section id="demos">
            <SectionTitle>Media & Demos</SectionTitle>
            <Demos demos={DEMOS_DATA} />
          </Section>

          <Section id="stack">
            <SectionTitle>Tech Stack</SectionTitle>
            <TechStack categories={TECH_STACK_DATA} />
          </Section>

          <Section id="mission">
            <SectionTitle>Mission Directives</SectionTitle>
            <Mission learning={LEARNING_DATA} astronaut={ASTRONAUT_DATA} />
          </Section>

          <Section id="contact">
            <SectionTitle>Contact Node</SectionTitle>
            <Contact contact={CONTACT_DATA} resume={RESUME_DATA} />
          </Section>
        </div>
      </main>

      <Footer data={FOOTER_DATA} />

      {/* The 3D scene is rendered last, sitting in the background. */}
      <Scene />
    </>
  );
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-brand-light tracking-tight uppercase mb-12 section-marker text-glow-cyan">
    {children}
  </h2>
);

export default App;