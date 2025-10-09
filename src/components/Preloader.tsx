import { useEffect, useState } from "react";

export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-[#191919] flex flex-col items-center justify-center transition-opacity duration-500"
      style={{ opacity: progress >= 100 ? 0 : 1 }}
    >
      {/* Logo/Brand Name with Glitch Effect */}
      <div className="relative mb-12">
        <h1 className="font-hero text-6xl md:text-8xl font-bold text-[#DDCEB6] glitch">
          On3<span className="text-[#81715D]">_</span>
        </h1>
        
        {/* Glitch layers */}
        <h1 
          className="font-hero text-6xl md:text-8xl font-bold absolute top-0 left-0 opacity-70"
          style={{
            color: '#81715D',
            clipPath: 'inset(0 0 0 0)',
            animation: 'glitch-1 2s infinite'
          }}
        >
          On3<span className="text-[#81715D]">_</span>
        </h1>
        
        <h1 
          className="font-hero text-6xl md:text-8xl font-bold absolute top-0 left-0 opacity-70"
          style={{
            color: '#DDCEB6',
            clipPath: 'inset(0 0 0 0)',
            animation: 'glitch-2 2s infinite'
          }}
        >
          On3<span className="text-[#81715D]">_</span>
        </h1>
      </div>

      {/* Loading Bar */}
      <div className="w-64 md:w-96 h-1 bg-[#1C1C1C] rounded-full overflow-hidden relative">
        <div 
          className="h-full bg-gradient-to-r from-[#81715D] via-[#97816B] to-[#DDCEB6] transition-all duration-300 relative"
          style={{ width: `${progress}%` }}
        >
          {/* Glowing effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-6 font-body text-[#81715D] text-sm tracking-[0.3em]">
        LOADING<span className="animate-pulse">...</span>
      </div>

      {/* Progress Percentage */}
      <div className="mt-2 font-price text-[#DDCEB6] text-lg font-medium">
        {progress}%
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: 'linear-gradient(#81715D 1px, transparent 1px), linear-gradient(90deg, #81715D 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <style>{`
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          33% { transform: translate(-2px, 2px); }
          66% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          33% { transform: translate(2px, -2px); }
          66% { transform: translate(-2px, 2px); }
        }
      `}</style>
    </div>
  );
};
