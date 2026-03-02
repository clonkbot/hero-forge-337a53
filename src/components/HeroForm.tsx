import { useState } from 'react';
import { motion } from 'framer-motion';

interface HeroFormProps {
  onGenerate: (heroName: string, heroDescription: string, storyPrompt: string) => void;
  isGenerating: boolean;
}

export default function HeroForm({ onGenerate, isGenerating }: HeroFormProps) {
  const [heroName, setHeroName] = useState('');
  const [heroDescription, setHeroDescription] = useState('');
  const [storyPrompt, setStoryPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroName.trim() && heroDescription.trim()) {
      onGenerate(heroName, heroDescription, storyPrompt || 'epic battle against evil');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto"
    >
      <div className="relative">
        {/* Form background layers */}
        <div className="absolute -inset-2 md:-inset-3 bg-[#E53935] transform rotate-1 rounded-lg" />
        <div className="absolute -inset-1 md:-inset-2 bg-[#1E88E5] transform -rotate-1 rounded-lg" />

        <div className="relative bg-[#F5F0E1] border-4 md:border-6 border-black p-4 sm:p-6 md:p-8 rounded-lg">
          {/* Speech bubble pointer */}
          <div className="absolute -top-6 md:-top-8 left-8 md:left-12 w-0 h-0 border-l-[15px] md:border-l-[20px] border-l-transparent border-r-[15px] md:border-r-[20px] border-r-transparent border-b-[25px] md:border-b-[35px] border-b-black" />
          <div className="absolute -top-4 md:-top-6 left-[34px] md:left-[52px] w-0 h-0 border-l-[12px] md:border-l-[16px] border-l-transparent border-r-[12px] md:border-r-[16px] border-r-transparent border-b-[20px] md:border-b-[28px] border-b-[#F5F0E1]" />

          <div className="space-y-4 md:space-y-6">
            {/* Hero Name Input */}
            <div className="relative">
              <label className="font-bangers text-lg md:text-xl text-[#1A1A1A] block mb-2 drop-shadow-[1px_1px_0px_#FFD700]">
                HERO NAME
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={heroName}
                  onChange={(e) => setHeroName(e.target.value)}
                  placeholder="Captain Awesome"
                  className="w-full px-4 py-3 md:py-4 bg-white border-4 border-black rounded-lg font-comic text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-[#FFD700] transform transition-transform focus:scale-[1.02]"
                  required
                  disabled={isGenerating}
                />
                <div className="absolute -bottom-1 -right-1 w-full h-full bg-black rounded-lg -z-10" />
              </div>
            </div>

            {/* Hero Description Input */}
            <div className="relative">
              <label className="font-bangers text-lg md:text-xl text-[#1A1A1A] block mb-2 drop-shadow-[1px_1px_0px_#FFD700]">
                HERO APPEARANCE
              </label>
              <div className="relative">
                <textarea
                  value={heroDescription}
                  onChange={(e) => setHeroDescription(e.target.value)}
                  placeholder="Muscular hero in red and gold armor, glowing eyes, flowing cape..."
                  rows={2}
                  className="w-full px-4 py-3 md:py-4 bg-white border-4 border-black rounded-lg font-comic text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-[#FFD700] transform transition-transform focus:scale-[1.02] resize-none"
                  required
                  disabled={isGenerating}
                />
                <div className="absolute -bottom-1 -right-1 w-full h-full bg-black rounded-lg -z-10" />
              </div>
            </div>

            {/* Story Prompt Input */}
            <div className="relative">
              <label className="font-bangers text-lg md:text-xl text-[#1A1A1A] block mb-2 drop-shadow-[1px_1px_0px_#FFD700]">
                STORY THEME <span className="font-comic text-sm md:text-base text-[#666]">(optional)</span>
              </label>
              <div className="relative">
                <textarea
                  value={storyPrompt}
                  onChange={(e) => setStoryPrompt(e.target.value)}
                  placeholder="Fighting alien invaders in New York City..."
                  rows={2}
                  className="w-full px-4 py-3 md:py-4 bg-white border-4 border-black rounded-lg font-comic text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-[#FFD700] transform transition-transform focus:scale-[1.02] resize-none"
                  disabled={isGenerating}
                />
                <div className="absolute -bottom-1 -right-1 w-full h-full bg-black rounded-lg -z-10" />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isGenerating || !heroName.trim() || !heroDescription.trim()}
              whileHover={{ scale: 1.03, rotate: -1 }}
              whileTap={{ scale: 0.97 }}
              className="w-full relative mt-4 md:mt-6 group"
            >
              <div className="absolute inset-0 bg-[#1A1A1A] rounded-lg transform translate-x-2 translate-y-2" />
              <div className={`relative px-6 md:px-8 py-4 md:py-5 rounded-lg border-4 border-black font-bangers text-xl sm:text-2xl md:text-3xl tracking-wider transition-colors ${isGenerating ? 'bg-gray-400 text-gray-600' : 'bg-[#E53935] text-white group-hover:bg-[#FF4081]'}`}>
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-2 md:gap-3">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="inline-block w-5 h-5 md:w-6 md:h-6 border-4 border-white border-t-transparent rounded-full"
                    />
                    CREATING MAGIC...
                  </span>
                ) : (
                  <>
                    <span className="drop-shadow-[2px_2px_0px_#000]">GENERATE COMIC!</span>
                    <motion.span
                      className="absolute -right-2 -top-2 md:-right-4 md:-top-4"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                    >
                      <span className="font-bangers text-lg md:text-2xl text-[#FFD700] drop-shadow-[1px_1px_0px_#000] md:drop-shadow-[2px_2px_0px_#000]">BOOM!</span>
                    </motion.span>
                  </>
                )}
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.form>
  );
}
