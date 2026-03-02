import { motion } from 'framer-motion';
import type { PanelData } from '../App';

interface ComicPanelProps {
  panel: PanelData;
  index: number;
  isLarge: boolean;
}

const rotations = [-2, 1.5, -1, 2, -1.5];

export default function ComicPanel({ panel, index, isLarge }: ComicPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: rotations[index] || 0 }}
      transition={{
        type: 'spring',
        damping: 15,
        delay: index * 0.15
      }}
      className={`relative group ${isLarge ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''}`}
    >
      {/* Panel shadow */}
      <div className="absolute inset-0 bg-black rounded-lg transform translate-x-2 translate-y-2" />

      {/* Panel frame */}
      <div className="relative bg-white border-4 border-black rounded-lg overflow-hidden">
        {/* Panel number */}
        <div className="absolute top-2 left-2 z-10 bg-[#FFD700] px-2 py-1 border-2 border-black rounded">
          <span className="font-bangers text-sm md:text-base">{index + 1}</span>
        </div>

        {/* Image container */}
        <div className={`relative ${isLarge ? 'aspect-square sm:aspect-[4/3] lg:aspect-[3/4]' : 'aspect-square sm:aspect-[4/3]'}`}>
          <img
            src={panel.imageUrl}
            alt={`Panel ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Halftone overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
              backgroundSize: '3px 3px'
            }}
          />

          {/* Action word decorations */}
          {index === 2 && (
            <motion.div
              className="absolute top-2 md:top-4 right-2 md:right-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              <div className="bg-[#FF4081] px-2 md:px-3 py-1 border-2 md:border-3 border-black rounded transform rotate-12">
                <span className="font-bangers text-white text-base md:text-xl drop-shadow-[1px_1px_0px_#000]">CRASH!</span>
              </div>
            </motion.div>
          )}

          {index === 3 && (
            <motion.div
              className="absolute bottom-12 md:bottom-16 right-2 md:right-4"
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
            >
              <div className="bg-[#FFD700] px-2 md:px-3 py-1 border-2 md:border-3 border-black rounded transform -rotate-6">
                <span className="font-bangers text-black text-base md:text-xl">WHAM!</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Caption box */}
        <div className="relative bg-[#F5F0E1] border-t-4 border-black p-2 md:p-3">
          {/* Narrative box styling */}
          <div className="bg-[#FFF9C4] border-2 border-black p-2 md:p-3 rounded">
            <p className="font-comic text-xs sm:text-sm md:text-base text-[#1A1A1A] leading-tight italic">
              {panel.caption}
            </p>
          </div>
        </div>
      </div>

      {/* Speed lines decoration for action panels */}
      {(index === 2 || index === 3) && (
        <div className="absolute -inset-2 md:-inset-4 pointer-events-none overflow-hidden rounded-lg">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] md:h-[2px] bg-black/20"
              style={{
                top: `${15 + i * 15}%`,
                left: '-10%',
                right: '-10%',
                transform: `rotate(${-15 + i * 3}deg)`
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
