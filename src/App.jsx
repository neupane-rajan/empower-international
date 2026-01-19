import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Slide from './components/Slide';
import { slides } from './data/slides';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const progress = ((currentIndex + 1) / slides.length) * 100;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950 text-white flex flex-col font-sans selection:bg-indigo-500/30">

      {/* Ambient Background - Enhanced */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-fuchsia-600/10 rounded-full blur-[140px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center relative z-10 w-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <Slide slide={slides[currentIndex]} key={currentIndex} direction={direction} />
        </AnimatePresence>
      </main>

      {/* Navigation Controls */}
      <div className="relative z-20 w-full bg-slate-900/50 backdrop-blur-md border-t border-white/5 p-4 flex items-center justify-between">

        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="p-3 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex-1 mx-8 max-w-xl">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Slide {currentIndex + 1}</span>
            <span>{slides.length}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-indigo-500 to-fuchsia-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentIndex === slides.length - 1}
          className="p-3 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>

    </div>
  );
}

export default App;
