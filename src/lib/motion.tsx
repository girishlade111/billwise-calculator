import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: "easeOut" }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const slideInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const FloatButton = motion.button;

// Hook for scroll-triggered animations
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px", ...options });
  return { ref, isInView };
}

// Animation presets
export const animations = {
  fadeInUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight
};

// Page transitions
export const pageTransition = {
  initial: "initial",
  animate: "animate",
  exit: "exit",
  transition: { duration: 0.3 }
};

// Card hover animation
export const cardHover = {
  whileHover: { scale: 1.02, y: -5 },
  whileTap: { scale: 0.98 }
};

// Button press animation
export const buttonPress = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

// Glow pulse animation
export const glowPulse = {
  animate: {
    boxShadow: [
      "0 0 5px rgba(245, 158, 11, 0.4)",
      "0 0 20px rgba(245, 158, 11, 0.6)",
      "0 0 5px rgba(245, 158, 11, 0.4)"
    ]
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Bounce animation
export const bounceIn = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
};

export { motion, useInView };
export default motion;