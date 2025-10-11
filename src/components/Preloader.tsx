import { useEffect, useState } from "react";

export const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentLogo, setCurrentLogo] = useState(0);
  const logos = ["/simplelogo.png", "/logo.png", "/2ndrylogo.png"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const logoInterval = setInterval(() => {
      setCurrentLogo((prev) => (prev + 1) % logos.length);
    }, 800);

    return () => clearInterval(logoInterval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-charcoal flex items-center justify-center overflow-hidden">
      {/* Minimal animated background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--taupe)) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Logo container with smooth transitions */}
      <div className="relative z-10">
        <div className="relative h-32 w-32 md:h-40 md:w-40">
          {logos.map((logo, index) => (
            <img 
              key={logo}
              src={logo} 
              alt="On3 Logo" 
              className="absolute inset-0 h-full w-full object-contain transition-all duration-500"
              style={{
                opacity: currentLogo === index ? 1 : 0,
                transform: currentLogo === index ? 'scale(1)' : 'scale(0.9)',
                filter: 'drop-shadow(0 0 20px hsla(var(--taupe) / 0.4))',
              }}
            />
          ))}
        </div>

        {/* Loading indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-taupe"
              style={{
                animation: 'bounce 1s infinite',
                animationDelay: `${i * 0.15}s`
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-10px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
