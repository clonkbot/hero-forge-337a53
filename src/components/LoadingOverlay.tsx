import { motion } from 'framer-motion';

interface LoadingOverlayProps {
  panelCount: number;
}

const loadingPhrases = [
  "ASSEMBLING HEROES...",
  "DRAWING MUSCLES...",
  "ADDING CAPES...",
  "CREATING EXPLOSIONS...",
  "FINAL TOUCHES..."
];

export default function LoadingOverlay({ panelCount }: LoadingOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="relative">
        {/* Starburst background */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          className="absolute -inset-20 md:-inset-32"
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-4 h-32 md:h-48 bg-[#FFD700]/30 origin-bottom"
              style={{ transform: `translate(-50%, -100%) rotate(${i * 30}deg)` }}
            />
          ))}
        </motion.div>

        {/* Loading content */}
        <motion.div
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          className="relative"
        >
          <div className="absolute -inset-2 bg-[#E53935] transform rotate-2 rounded-lg" />
          <div className="absolute -inset-1 bg-[#1E88E5] transform -rotate-1 rounded-lg" />

          <div className="relative bg-[#FFD700] border-4 md:border-6 border-black p-6 md:p-10 rounded-lg text-center min-w-[280px] md:min-w-[400px]">
            {/* Animated dots */}
            <div className="flex justify-center gap-2 md:gap-3 mb-4 md:mb-6">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [-10, 10, -10],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6,
                    delay: i * 0.15
                  }}
                  className="w-4 h-4 md:w-6 md:h-6 bg-[#E53935] border-2 md:border-3 border-black rounded-full"
                />
              ))}
            </div>

            {/* Loading text */}
            <motion.h2
              key={panelCount}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-bangers text-2xl md:text-4xl text-[#1A1A1A] drop-shadow-[2px_2px_0px_#fff]"
            >
              {loadingPhrases[panelCount] || loadingPhrases[0]}
            </motion.h2>

            {/* Progress indicator */}
            <div className="mt-4 md:mt-6">
              <div className="flex justify-center gap-1 md:gap-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: i <= panelCount ? 1 : 0.5 }}
                    className={`w-6 h-6 md:w-8 md:h-8 border-2 md:border-3 border-black rounded ${i <= panelCount ? 'bg-[#1E88E5]' : 'bg-white'}`}
                  >
                    {i < panelCount && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <span className="text-white font-bangers text-sm md:text-lg">✓</span>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
              <p className="font-comic text-sm md:text-base text-[#1A1A1A] mt-2 md:mt-3">
                Panel {panelCount + 1} of 5
              </p>
            </div>

            {/* Decorative action words */}
            <motion.div
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              <span className="font-bangers text-xl md:text-3xl text-[#FF4081] drop-shadow-[2px_2px_0px_#000]">
                POW!
              </span>
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-4 md:-bottom-4 md:-left-6"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 0.7, delay: 0.2 }}
            >
              <span className="font-bangers text-lg md:text-2xl text-[#E53935] drop-shadow-[2px_2px_0px_#000]">
                ZAP!
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
