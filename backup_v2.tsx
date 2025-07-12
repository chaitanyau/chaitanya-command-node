import React, { Suspense } from 'react';
// Remove useScroll from framer-motion as drei's hook is preferred within the canvas
// import { useScroll } from 'framer-motion'; 
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';

import StarsCanvas from './components/StarsCanvas'; // Import the new 3D canvas

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
// You can remove these as they are replaced by the 3D canvas
import BloomBackground from './components/BloomBackground'; 
import NebulaGradient from './components/NebulaGradient';

const App: React.FC = () => {
  // scrollYProgress from framer-motion is no longer needed for the background
  // const { scrollYProgress } = useScroll();

  // Define the number of pages based on your content length.
  // This is an estimate; you may need to adjust it for perfect scroll length.
  const pages = 9; 

  return (
    <>
    <BloomBackground />
    <NebulaGradient />
      {/* 🧠 Custom Cursor */}
      <CustomCursor />

      {/* 🛰️ Top Navigation */}
      <Header links={NAVIGATION_LINKS} />

      {/* 🌌 3D Scrolling Background */}
      <Canvas style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
        <Suspense fallback={null}>
          <ScrollControls pages={pages} damping={0.1}>
            {/* 3D content */}
            <StarsCanvas />

            {/* HTML content synchronized with the scroll */}
            <Scroll html>
              <main className="relative z-20 px-4 md:px-12 xl:px-24 scale-[1.0]">
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

              {/* ⚓ Footer */}
              <Footer data={FOOTER_DATA} />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </>
  );
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-brand-light tracking-tight uppercase mb-12 section-marker">
    {children}
  </h2>
);

export default App;