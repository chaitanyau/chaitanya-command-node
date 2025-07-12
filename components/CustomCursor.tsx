import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  // ACTION: Start with visibility set to false.
  // We will only make it visible if we confirm the user is on a desktop.
  const [isVisible, setIsVisible] = useState(false);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    // --- The Definitive Device Check ---
    // This media query is very specific. It checks for a device that can
    // truly hover (ruling out most touchscreens) AND has a fine-pointer (a mouse).
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // If it's not a desktop, we do nothing. The component remains invisible.
    if (!isDesktop) {
      return;
    }

    // If it IS a desktop, we make the cursor visible and add all our event listeners.
    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer');
    };
    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []); // The empty array ensures this effect runs only ONCE after the component mounts.

  // --- All variants remain the same ---
  const cursorVariants: Variants = {
    default: { height: 32, width: 32, border: '2px solid #2F81F7', backgroundColor: 'transparent', transition: { type: 'spring', stiffness: 500, damping: 30 } },
    pointer: { height: 48, width: 48, border: '2px solid #F77814', backgroundColor: 'rgba(247, 120, 20, 0.2)', transition: { type: 'spring', stiffness: 500, damping: 30 } },
    clicking: { height: 28, width: 28, border: '3px solid #F77814', backgroundColor: 'rgba(247, 120, 20, 0.3)', transition: { type: 'spring', stiffness: 400, damping: 20 } }
  };
  const dotVariants: Variants = {
    default: { height: 8, width: 8, backgroundColor: '#2F81F7' },
    pointer: { height: 6, width: 6, backgroundColor: '#F77814' },
    clicking: { height: 4, width: 4, backgroundColor: '#F77814' }
  };

  // FIX: We now check the 'isVisible' state. If it's false, we render nothing.
  if (!isVisible) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
        variants={cursorVariants}
        animate={isMouseDown ? 'clicking' : isPointer ? 'pointer' : 'default'}
        style={{ x: position.x - 16, y: position.y - 16 }}
      />
      <motion.div
         className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
         variants={dotVariants}
         animate={isMouseDown ? 'clicking' : isPointer ? 'pointer' : 'default'}
         style={{ x: position.x - 4, y: position.y - 4 }}
      />
    </>
  );
};