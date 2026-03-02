import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ComicPanel from './components/ComicPanel';
import HeroForm from './components/HeroForm';
import LoadingOverlay from './components/LoadingOverlay';

export interface PanelData {
  id: number;
  imageUrl: string;
  caption: string;
}

function App() {
  const [panels, setPanels] = useState<PanelData[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateComic = useCallback(async (heroName: string, heroDescription: string, storyPrompt: string) => {
    setIsGenerating(true);
    setError(null);
    setPanels([]);

    const panelPrompts = [
      `Comic book panel, ${heroName} origin story introduction, ${heroDescription}, dramatic pose, city skyline background, vintage comic style, bold colors, halftone dots, thick black outlines`,
      `Comic book panel, ${heroName} discovers their powers, ${heroDescription}, action scene, ${storyPrompt}, vintage Marvel DC style, dynamic composition, speed lines`,
      `Comic book panel, ${heroName} confronts the villain, ${heroDescription}, intense battle, ${storyPrompt}, classic superhero comic art, dramatic lighting, explosive action`,
      `Comic book panel, ${heroName} in epic fight scene, ${heroDescription}, mid-action pose, debris flying, ${storyPrompt}, retro comic book style, vibrant colors`,
      `Comic book panel, ${heroName} triumphant victory pose, ${heroDescription}, heroic stance, sunset background, ${storyPrompt}, vintage comic finale, inspirational`
    ];

    const captions = [
      `In a world that needed a hero... ${heroName} emerged from the shadows!`,
      `With newfound powers coursing through their veins, ${heroName} realized their destiny!`,
      `"You cannot stop me!" the villain roared. But ${heroName} had other plans...`,
      `The battle raged on! Every strike echoed through the city streets!`,
      `And so, ${heroName} stood victorious... but the adventure was only beginning!`
    ];

    const newPanels: PanelData[] = [];

    try {
      for (let i = 0; i < 5; i++) {
        const response = await fetch('https://api.nanobanana.pro/imagine', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: panelPrompts[i],
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to generate panel ${i + 1}`);
        }

        const data = await response.json();

        newPanels.push({
          id: i,
          imageUrl: data.imageUrl || data.url || data.image,
          caption: captions[i],
        });

        setPanels([...newPanels]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate comic. Please try again!');
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F0E1] relative overflow-x-hidden">
      {/* Halftone dot pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
          backgroundSize: '4px 4px'
        }}
      />

      {/* Comic book header */}
      <header className="relative py-6 md:py-10 px-4">
        <motion.div
          initial={{ y: -100, rotate: -5 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ type: 'spring', damping: 12 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Starburst background */}
            <div className="absolute -inset-4 md:-inset-8 bg-[#FFD700] transform -rotate-2 rounded-lg" />
            <div className="absolute -inset-3 md:-inset-6 bg-[#E53935] transform rotate-1 rounded-lg" />

            <div className="relative bg-[#1E88E5] p-4 md:p-6 rounded-lg border-4 md:border-8 border-black transform hover:rotate-1 transition-transform">
              <h1 className="font-bangers text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white text-center tracking-wider drop-shadow-[4px_4px_0px_#000] md:drop-shadow-[6px_6px_0px_#000]">
                HERO FORGE
              </h1>
              <p className="font-comic text-base sm:text-lg md:text-xl text-[#FFD700] text-center mt-2 drop-shadow-[2px_2px_0px_#000]">
                COMIC BOOK GENERATOR
              </p>
            </div>
          </div>

          {/* Action words decoration */}
          <motion.div
            className="absolute -left-2 md:-left-8 top-1/2 transform -translate-y-1/2 -rotate-12 hidden sm:block"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="font-bangers text-2xl md:text-4xl text-[#E53935] drop-shadow-[2px_2px_0px_#000] md:drop-shadow-[3px_3px_0px_#000]">
              POW!
            </span>
          </motion.div>
          <motion.div
            className="absolute -right-2 md:-right-8 top-1/4 transform rotate-12 hidden sm:block"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
          >
            <span className="font-bangers text-xl md:text-3xl text-[#FF4081] drop-shadow-[2px_2px_0px_#000] md:drop-shadow-[3px_3px_0px_#000]">
              ZAP!
            </span>
          </motion.div>
        </motion.div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 pb-24 md:pb-32">
        {/* Form section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 md:mb-12"
        >
          <HeroForm onGenerate={generateComic} isGenerating={isGenerating} />
        </motion.section>

        {/* Error display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mb-8 p-4 md:p-6 bg-[#E53935] border-4 border-black rounded-lg transform -rotate-1 max-w-2xl mx-auto"
            >
              <p className="font-comic text-white text-center text-base md:text-lg">
                <span className="font-bangers text-xl md:text-2xl">WHOOPS!</span> {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comic panels grid */}
        <AnimatePresence>
          {panels.length > 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative"
            >
              {/* Comic page frame */}
              <div className="relative bg-white border-4 md:border-8 border-black p-3 md:p-6 lg:p-8 rounded-lg shadow-[8px_8px_0px_#000] md:shadow-[12px_12px_0px_#000]">
                {/* Page number decoration */}
                <div className="absolute -top-3 md:-top-4 right-4 md:right-8 bg-[#FFD700] px-3 md:px-4 py-1 border-2 md:border-4 border-black rounded">
                  <span className="font-bangers text-sm md:text-lg">ISSUE #1</span>
                </div>

                {/* Panels container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                  {panels.map((panel, index) => (
                    <ComicPanel
                      key={panel.id}
                      panel={panel}
                      index={index}
                      isLarge={index === 2}
                    />
                  ))}
                </div>

                {/* "To be continued" decoration */}
                {panels.length === 5 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 md:mt-6 text-right"
                  >
                    <span className="font-comic text-lg sm:text-xl md:text-2xl italic text-[#1A1A1A]">
                      To be continued...
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {panels.length === 0 && !isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-12 md:py-20"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-[#1E88E5] transform rotate-3 rounded-lg" />
              <div className="relative bg-[#FFD700] border-4 border-black p-6 md:p-10 rounded-lg transform -rotate-1">
                <p className="font-comic text-lg sm:text-xl md:text-2xl text-[#1A1A1A]">
                  <span className="font-bangers text-2xl sm:text-3xl md:text-4xl block mb-2">YOUR STORY AWAITS!</span>
                  Create your superhero above and watch<br className="hidden sm:block" /> the comic come to life!
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Loading overlay */}
      <AnimatePresence>
        {isGenerating && <LoadingOverlay panelCount={panels.length} />}
      </AnimatePresence>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A]/90 backdrop-blur-sm py-3 border-t-4 border-[#FFD700]">
        <p className="font-comic text-xs md:text-sm text-[#F5F0E1]/60 text-center">
          Requested by <span className="text-[#FFD700]/80">@web-user</span> · Built by <span className="text-[#1E88E5]/80">@clonkbot</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
