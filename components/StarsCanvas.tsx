import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// REMOVED: No longer need useScroll from drei
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';
import { useScrollStore } from '../useScrollStore'; // NEW: Import our store

const Starfield = (props: any) => {
  const ref = useRef<any>();

  // NEW: Get the scroll progress from our global store.
  const scrollProgress = useScrollStore((state) => state.scrollProgress);

  const [sphere] = useState(() => random.inSphere(new Float32Array(50000), { radius: 10 }));

  useFrame((state, delta) => {
    // Ambient rotation remains the same
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 25;

    // UPDATED: The animation is now driven by our store's 'scrollProgress' value.
    // This value is already between 0 and 1.
    state.camera.position.z = 1 + scrollProgress * 10;
    state.camera.rotation.z = -scrollProgress * 0.1;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          opacity={1}
          size={0.010}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default Starfield;