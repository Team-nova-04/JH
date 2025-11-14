// components/FloatingElements.js - New component for floating animations
import { motion } from 'framer-motion';

const FloatingElement = ({ children, delay = 0, duration = 2 }) => {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;