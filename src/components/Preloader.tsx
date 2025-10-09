import { useEffect, useState } from "react";

export const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#191919] flex items-center justify-center overflow-hidden">
      {/* Animated particles/lines background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#81715D] to-transparent"
            style={{
              top: `${Math.random() * 100}%`,
              left: '-100%',
              width: `${Math.random() * 300 + 100}px`,
              animation: `slide-right ${Math.random() * 2 + 1}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Rotating rings around logo */}
      <div className="absolute">
        <div 
          className="w-64 h-64 md:w-80 md:h-80 border-2 border-[#81715D] rounded-full animate-spin-slow"
          style={{ animationDuration: '8s' }}
        />
        <div 
          className="absolute inset-0 w-56 h-56 md:w-72 md:h-72 m-auto border-2 border-[#97816B] rounded-full animate-spin-slow"
          style={{ animationDuration: '6s', animationDirection: 'reverse' }}
        />
        <div 
          className="absolute inset-0 w-48 h-48 md:w-64 md:h-64 m-auto border border-[#DDCEB6] rounded-full animate-spin-slow opacity-50"
          style={{ animationDuration: '10s' }}
        />
      </div>

      {/* Logo with multiple effects */}
      <div className="relative z-10">
        {/* Main logo */}
        <div className="relative animate-pulse-slow">
          <img 
            src="/logo.png" 
            alt="On3 Logo" 
            className="h-32 w-32 md:h-40 md:w-40 object-contain drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(129, 113, 93, 0.6))',
              animation: 'float 3s ease-in-out infinite'
            }}
          />
          
          {/* Glitch clones */}
          <img 
            src="/logo.png" 
            alt="" 
            className="absolute top-0 left-0 h-32 w-32 md:h-40 md:w-40 object-contain opacity-70 mix-blend-screen"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(221, 206, 182, 0.8))',
              animation: 'glitch-x 0.3s infinite'
            }}
          />
          <img 
            src="/logo.png" 
            alt="" 
            className="absolute top-0 left-0 h-32 w-32 md:h-40 md:w-40 object-contain opacity-60 mix-blend-screen"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(151, 129, 107, 0.6))',
              animation: 'glitch-y 0.4s infinite reverse'
            }}
          />
        </div>

        {/* Loading dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[#DDCEB6]"
              style={{
                animation: 'bounce 1s infinite',
                animationDelay: `${i * 0.15}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Animated grid in background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute inset-0 animate-pulse-slow" 
          style={{
            backgroundImage: 'linear-gradient(#81715D 1px, transparent 1px), linear-gradient(90deg, #81715D 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
      </div>

      <style>{`
        @keyframes slide-right {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes glitch-x {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-3px, 2px); }
          50% { transform: translate(3px, -2px); }
          75% { transform: translate(-2px, -3px); }
        }
        
        @keyframes glitch-y {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(2px, -3px); }
          66% { transform: translate(-3px, 2px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
