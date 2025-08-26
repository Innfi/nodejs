import { motion } from 'motion/react';

export function AnimatedBarbell({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, 15, 0],
        rotate: [0, -3, 3, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
    >
      <svg
        width="140"
        height="80"
        viewBox="0 0 140 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left weight plate */}
        <circle
          cx="20"
          cy="40"
          r="18"
          fill="currentColor"
          className="text-primary"
        />
        <circle
          cx="20"
          cy="40"
          r="12"
          fill="currentColor"
          className="text-background"
        />
        
        {/* Right weight plate */}
        <circle
          cx="120"
          cy="40"
          r="18"
          fill="currentColor"
          className="text-primary"
        />
        <circle
          cx="120"
          cy="40"
          r="12"
          fill="currentColor"
          className="text-background"
        />
        
        {/* Barbell bar */}
        <rect
          x="38"
          y="37"
          width="64"
          height="6"
          rx="3"
          fill="currentColor"
          className="text-primary"
        />
        
        {/* Collar rings */}
        <rect
          x="35"
          y="35"
          width="6"
          height="10"
          rx="2"
          fill="currentColor"
          className="text-primary"
        />
        <rect
          x="99"
          y="35"
          width="6"
          height="10"
          rx="2"
          fill="currentColor"
          className="text-primary"
        />
        
        {/* Grip texture */}
        <rect x="55" y="38" width="1" height="4" fill="currentColor" className="text-primary/50" />
        <rect x="58" y="38" width="1" height="4" fill="currentColor" className="text-primary/50" />
        <rect x="61" y="38" width="1" height="4" fill="currentColor" className="text-primary/50" />
        <rect x="64" y="38" width="1" height="4" fill="currentColor" className="text-primary/50" />
        <rect x="67" y="38" width="1" height="4" fill="currentColor" className="text-primary/50" />
        <rect x="70" y="38" width="1" height="4" fill="currentColor" className="text-primary/50" />
        <rect x="73" y="38" width="1" height="4" fill="currentColor" className="text-primary/50" />
        <rect x="76" y="38" width="1" height="4" fill="currentColor" className="text-primary/50" />
        <rect x="79" y="38" width="1" height="4" fill="currentColor" className="text-primary/50" />
        <rect x="82" y="38" width="1" height="4" fill="currentColor" className="text-primary/50" />
      </svg>
    </motion.div>
  );
}