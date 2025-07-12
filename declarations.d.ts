/// <reference types="@react-three/fiber" />

import { ShaderMaterial, PlaneGeometry, Mesh, Object3D } from 'three';
import { Object3DNode } from '@react-three/fiber';
import { ThreeElements } from "@react-three/fiber";

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {}
    }
  }
}
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: Object3DNode<Mesh, typeof Mesh>;
      planeGeometry: Object3DNode<PlaneGeometry, typeof PlaneGeometry>;
      shaderMaterial: Object3DNode<ShaderMaterial, typeof ShaderMaterial>;
      primitive: Object3DNode<Object3D, typeof Object3D>;
    }
  }
}
declare namespace JSX {
  interface IntrinsicElements {
    primitive: any; // Or define specific props for 'primitive' if applicable
  }
}