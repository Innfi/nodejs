import { motion } from 'motion/react';

export function AnimatedKettlebell({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Kettlebell handle */}
        <path
          d="M60 20C65.5228 20 70 24.4772 70 30V35H50V30C50 24.4772 54.4772 20 60 20Z"
          fill="currentColor"
          className="text-primary"
        />
        {/* Kettlebell body */}
        <ellipse
          cx="60"
          cy="70"
          rx="35"
          ry="30"
          fill="currentColor"
          className="text-primary"
        />
        {/* Handle connection */}
        <rect
          x="50"
          y="35"
          width="20"
          height="15"
          fill="currentColor"
          className="text-primary"
        />
        {/* Highlight */}
        <ellipse
          cx="50"
          cy="60"
          rx="8"
          ry="6"
          fill="currentColor"
          className="text-primary/30"
        />
      </svg>
    </motion.div>
  );
}