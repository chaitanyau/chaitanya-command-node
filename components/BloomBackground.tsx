import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine, ISourceOptions, MoveAttract } from "tsparticles-engine";

const BloomBackground: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // Initializes the particles engine
    await loadSlim(engine);
  }, []);

  const particlesOptions: ISourceOptions = {
    preset: "stars",
    background: {
      color: "#ed1f1f", // my desired background color
      opacity: 0 , 
    },
    particles: {
      number: {
        value: 500,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: { min: 0.1, max: 0.5 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
      size: {
        value: { min: 0.1, max: 2 },
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: "none",
        straight: false,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "attract",
        },
      },
      modes: {
        MoveAttract: {
          distance: 50,
          duration: 0.4,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesOptions}
    />
  );
};

export default BloomBackground;