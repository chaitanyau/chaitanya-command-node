import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// --- GLSL SHADER CODE ---
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  // Uniforms passed from our React component
  uniform float uTime;
uniform vec2 uResolution;
uniform float uScale;
varying vec2 vUv;

// --- Start of the translated vector field shader ---
/*
  Core elements from "Vector Field" by MartinRGB
  Translated for React Three Fiber with custom colors and noise.
*/

const int iterationTime1 = 20;
// Note: 'scale' is now controlled by the uScale uniform
const float velocity_x = 0.1;
const float velocity_y = 0.2;
const float mode_2_speed = 2.5;
const float mode_1_detail = 200.;
const float mode_1_twist = 50.;

float f(in vec2 p) {
    return sin(p.x + sin(p.y + uTime * velocity_x)) * sin(p.y * p.x * 0.1 + uTime * velocity_y);
}

// This struct is a container for the field's data
struct Field {
    vec2 vel;
};

Field getField(in vec2 p) {
    Field field;
    vec2 ep = vec2(0.05, 0.);
    vec2 rz = vec2(0);
    for( int i = 0; i < iterationTime1; i++ ) {
        float t0 = f(p);
        float t1 = f(p + ep.xy);
        float t2 = f(p + ep.yx);
        vec2 g = vec2((t1 - t0), (t2 - t0)) / ep.xx;
        vec2 t = vec2(-g.y, g.x);
        
        p += (mode_1_twist * 0.01) * t + g * (1. / mode_1_detail);
        p.x = p.x + sin( uTime * mode_2_speed / 10.) / 10.;
        p.y = p.y + cos(uTime * mode_2_speed / 10.) / 10.;
        rz = g; 
    }
    field.vel = rz;
    return field;
}

// --- NEW: Deep Blue & Red Color Function ---
vec3 getColor(in Field fld) {
  vec2 p = fld.vel; // Use the velocity vector to drive the color
  
  // Define our new three-color palette
  vec3 colorDeepBlue = vec3(0.0, 0.05, 0.2);     // A very dark, almost black-blue
  vec3 colorPurple = vec3(0.3, 0.0, 0.6);         // A rich, deep purple
  vec3 colorRed = vec3(0.9, 0.05, 0.05);         // A commanding, vibrant red, like the '>>' marker

  // Blend from deep blue to purple based on the horizontal flow
  vec3 col = mix(colorDeepBlue, colorPurple, smoothstep(-0.2, 0.2, p.x));
  // Mix in the red highlights based on the vertical flow
  col = mix(col, colorRed, smoothstep(0.0, 0.3, p.y));

  return col;
}

// Simple noise function to add texture
float rand(vec2 n) { 
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

// --- MAIN RENDER FUNCTION ---
void main() {
  // Correctly handle aspect ratio to prevent stretching
  vec2 p = vUv - 0.5;
  p.x *= uResolution.x / uResolution.y;
  p *= uScale;
  
  // Get the vector field data and calculate the color
  Field fld = getField(p);
  vec3 col = getColor(fld);
  
  // Add subtle, dynamic noise to break up artifacts and add texture
  float noise = rand(vUv * uTime * 0.1) * 0.01; // Adjust noise intensity as needed
  col += noise; // Apply the noise to the color
  col = mix(col, vec3(0.0), 0.1); // Slightly blend with black for depth
  col += noise;
  
  gl_FragColor = vec4(col, 1.0);
}

`;

// --- THE REACT COMPONENT ---
// UPDATED: It now accepts a 'scale' prop
export const GlossyGradient = ({ scale = 10.0 }: { scale?: number }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { viewport, size } = useThree();

  // UPDATED: Add uScale to the uniforms object
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
      uScale: { value: scale }, // Use the scale prop here
    }),
    [scale] // Re-create uniforms if the scale prop changes
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};