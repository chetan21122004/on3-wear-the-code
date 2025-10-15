import { useEffect, useState } from "react";

export const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentLogo, setCurrentLogo] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const logos = ["/simplelogo.png", "/logo.png"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const logoInterval = setInterval(() => {
      setCurrentLogo((prev) => (prev + 1) % logos.length);
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 800);

    return () => clearInterval(logoInterval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-charcoal flex items-center justify-center overflow-hidden">
      {/* Crazy animated background with moving lines */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={`line-${i}`}
            className="absolute bg-gradient-to-r from-transparent via-taupe to-transparent"
            style={{
              height: `${Math.random() > 0.5 ? '2px' : '1px'}`,
              top: `${Math.random() * 100}%`,
              left: '-100%',
              width: `${Math.random() * 400 + 200}px`,
              animation: `slide-right ${Math.random() * 1.5 + 0.8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.6 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Rotating geometric shapes */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(4)].map((_, i) => (
          <div
            key={`ring-${i}`}
            className="absolute border-taupe rounded-full opacity-20"
            style={{
              width: `${(i + 1) * 100}px`,
              height: `${(i + 1) * 100}px`,
              borderWidth: `${Math.random() > 0.5 ? '2px' : '1px'}`,
              animation: `spin-${i % 2 === 0 ? 'clockwise' : 'counter'} ${6 + i * 2}s linear infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Pulsating glow orbs */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full blur-2xl"
            style={{
              width: `${Math.random() * 150 + 100}px`,
              height: `${Math.random() * 150 + 100}px`,
              background: `radial-gradient(circle, hsla(var(--taupe) / ${Math.random() * 0.3 + 0.1}) 0%, transparent 70%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse-orb ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main logo container with crazy effects */}
      <div className="relative z-10">
        <div className="relative">
          {/* Background logos with different effects */}
          {logos.map((logo, index) => (
            <div key={`bg-${logo}`} className="absolute inset-0 -m-20">
              <img 
                src={logo} 
                alt="" 
                className="h-72 w-72 md:h-96 md:w-96 object-contain opacity-5"
                style={{
                  animation: `rotate-${index} ${10 + index * 2}s linear infinite`,
                  filter: 'blur(2px)',
                }}
              />
            </div>
          ))}

          {/* Main logo with glitch effect */}
          <div className="relative h-40 w-40 md:h-52 md:w-52">
            {/* Main logo */}
            <img 
              src={logos[currentLogo]} 
              alt="On3 Logo" 
              className="absolute inset-0 h-full w-full object-contain transition-all duration-300"
              style={{
                filter: 'drop-shadow(0 0 30px hsla(var(--taupe) / 0.6))',
                transform: glitchActive ? 'scale(1.05)' : 'scale(1)',
              }}
            />
            
            {/* Glitch clones */}
            {glitchActive && (
              <>
                <img 
                  src={logos[currentLogo]} 
                  alt="" 
                  className="absolute inset-0 h-full w-full object-contain opacity-70 mix-blend-screen"
                  style={{
                    filter: 'drop-shadow(0 0 20px hsla(var(--cream) / 0.8))',
                    animation: 'glitch-x 0.2s infinite',
                  }}
                />
                <img 
                  src={logos[currentLogo]} 
                  alt="" 
                  className="absolute inset-0 h-full w-full object-contain opacity-50 mix-blend-screen"
                  style={{
                    filter: 'drop-shadow(0 0 20px hsla(var(--taupe) / 0.6)) hue-rotate(45deg)',
                    animation: 'glitch-y 0.15s infinite reverse',
                  }}
                />
              </>
            )}

            {/* Spinning ring around logo */}
            <div 
              className="absolute inset-0 border-2 border-taupe rounded-full opacity-40"
              style={{
                animation: 'spin-clockwise 2s linear infinite',
                transform: 'scale(1.3)',
              }}
            />
          </div>

          {/* Crazy animated text */}
          <div className="mt-8 text-center">
            <div className="font-[quakiez] text-cream text-2xl font-bold tracking-wider">
              {'ON3'.split('').map((char, i) => (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    animation: `letter-bounce ${0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
            <div className="mt-2 text-taupe text-sm tracking-[0.3em] font-[quakiez]">
              WEAR THE CODE
            </div>
          </div>

          {/* Loading bars */}
          <div className="flex justify-center gap-1 mt-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1 bg-taupe rounded-full"
                style={{
                  height: `${Math.random() * 20 + 10}px`,
                  animation: 'bar-grow 0.8s ease-in-out infinite',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-right {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes spin-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-counter {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes rotate-0 {
          from { transform: rotate(0deg) scale(1); }
          to { transform: rotate(360deg) scale(1.1); }
        }
        
        @keyframes rotate-1 {
          from { transform: rotate(360deg) scale(1); }
          to { transform: rotate(0deg) scale(0.9); }
        }
        
        @keyframes rotate-2 {
          from { transform: rotate(0deg) scale(1.05); }
          50% { transform: rotate(180deg) scale(0.95); }
          to { transform: rotate(360deg) scale(1.05); }
        }
        
        @keyframes glitch-x {
          0%, 100% { transform: translate(0, 0) skew(0deg); }
          25% { transform: translate(-5px, 3px) skew(-2deg); }
          50% { transform: translate(5px, -3px) skew(2deg); }
          75% { transform: translate(-3px, -5px) skew(-1deg); }
        }
        
        @keyframes glitch-y {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(3px, -5px) scale(1.02); }
          66% { transform: translate(-5px, 3px) scale(0.98); }
        }
        
        @keyframes pulse-orb {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.6; 
            transform: scale(1.3);
          }
        }
        
        @keyframes letter-bounce {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
          }
          50% { 
            transform: translateY(-10px) rotate(5deg); 
          }
        }
        
        @keyframes bar-grow {
          0%, 100% { 
            transform: scaleY(0.5);
            opacity: 0.5;
          }
          50% { 
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
