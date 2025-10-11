import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";

const VirtualKeypad = () => {
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [glitchKey, setGlitchKey] = useState<string | null>(null);
  const [pulseKey, setPulseKey] = useState<string | null>(null);

  const validCodes = ["⚡★✦◆", "▲●■◎", "☯❖☢☠", "♠♣♥♦"];

  const keys = [
    ["⚡", "★", "✦", "◆"],
    ["▲", "●", "■", "◎"],
    ["☯", "❖", "☢", "☠"],
    ["♠", "♣", "♥", "♦"],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomKey = keys.flat()[Math.floor(Math.random() * 16)];
      setPulseKey(randomKey);
      setTimeout(() => setPulseKey(null), 300);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleKeyPress = (key: string) => {
    if (code.length < 6) {
      setCode(code + key);
      setGlitchKey(key);
      setTimeout(() => setGlitchKey(null), 200);
    }
  };

  const handleClear = () => {
    setCode("");
  };

  const handleSubmit = () => {
    setIsValidating(true);

    setTimeout(() => {
      if (validCodes.includes(code.toUpperCase())) {
        toast({
          title: "✓ Code Accepted!",
          description: `You've unlocked a ${Math.floor(Math.random() * 20) + 10}% discount!`,
        });
        setCode("");
      } else {
        toast({
          title: "✗ Invalid Code",
          description: "Follow us on Instagram for exclusive codes.",
          variant: "destructive",
        });
      }
      setIsValidating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-charcoal relative overflow-hidden">
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
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={`ring-${i}`}
            className="absolute border-taupe rounded-full opacity-10"
            style={{
              width: `${(i + 1) * 120}px`,
              height: `${(i + 1) * 120}px`,
              borderWidth: `${Math.random() > 0.5 ? '2px' : '1px'}`,
              animation: `spin-${i % 2 === 0 ? 'clockwise' : 'counter'} ${6 + i * 2}s linear infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Pulsating glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${Math.random() * 200 + 150}px`,
              height: `${Math.random() * 200 + 150}px`,
              background: `radial-gradient(circle, hsla(var(--taupe) / ${Math.random() * 0.2 + 0.1}) 0%, transparent 70%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse-orb ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-sm relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 relative"
        >
          {/* Spinning symbols around title */}
          {['⚡', '★', '◆', '●', '☯', '♠'].map((symbol, i) => (
            <motion.span
              key={i}
              className="absolute text-taupe text-2xl opacity-30"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                rotate: 360,
                x: Math.cos((i / 6) * Math.PI * 2) * 80,
                y: Math.sin((i / 6) * Math.PI * 2) * 80,
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                x: { duration: 0 },
                y: { duration: 0 },
              }}
            >
              {symbol}
            </motion.span>
          ))}

          <motion.h1 
            className="text-5xl md:text-6xl font-hero font-bold mb-4 text-cream relative"
            animate={{
              textShadow: [
                "0 0 20px rgba(221, 206, 182, 0.5), 0 0 40px rgba(129, 113, 93, 0.3)",
                "0 0 40px rgba(221, 206, 182, 0.8), 0 0 60px rgba(129, 113, 93, 0.5)",
                "0 0 20px rgba(221, 206, 182, 0.5), 0 0 40px rgba(129, 113, 93, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {'CIPHER PAD'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p 
            className="text-taupe font-body tracking-widest text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ◆ UNLOCK THE VAULT ◆
          </motion.p>
        </motion.div>

        {/* Keypad Container */}
        <motion.div 
          className="bg-gradient-to-br from-charcoal via-charcoal to-taupe/20 rounded-3xl p-6 shadow-2xl border-2 border-taupe/30 relative overflow-hidden backdrop-blur-sm"
          animate={{
            boxShadow: [
              "0 0 30px rgba(129, 113, 93, 0.3), 0 0 60px rgba(129, 113, 93, 0.2)",
              "0 0 60px rgba(129, 113, 93, 0.6), 0 0 100px rgba(129, 113, 93, 0.3)",
              "0 0 30px rgba(129, 113, 93, 0.3), 0 0 60px rgba(129, 113, 93, 0.2)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Animated corner accents */}
          {[0, 1, 2, 3].map((corner) => (
            <motion.div
              key={corner}
              className="absolute w-8 h-8 border-taupe"
              style={{
                borderWidth: corner % 2 === 0 ? '2px 0 0 2px' : '0 2px 2px 0',
                top: corner < 2 ? '0' : 'auto',
                bottom: corner < 2 ? 'auto' : '0',
                left: corner % 2 === 0 ? '0' : 'auto',
                right: corner % 2 === 0 ? 'auto' : '0',
                margin: '1rem',
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: corner * 0.2,
              }}
            />
          ))}

          {/* Display integrated as first key */}
          <div className="mb-4 relative">
            <motion.div 
              className="bg-charcoal/90 rounded-2xl h-28 flex items-center justify-center text-cream font-mono text-4xl tracking-[0.5em] shadow-inner border-2 border-taupe/50 relative overflow-hidden backdrop-blur-sm"
              animate={{
                borderColor: code.length > 0 ? "rgba(221, 206, 182, 0.8)" : "rgba(129, 113, 93, 0.5)",
                boxShadow: code.length > 0 
                  ? "inset 0 0 30px rgba(221, 206, 182, 0.2), 0 0 20px rgba(221, 206, 182, 0.3)"
                  : "inset 0 0 20px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Scanning line effect */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-taupe to-transparent"
                animate={{
                  y: [0, 110, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              {code ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex gap-2"
                >
                  {code.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="text-cream drop-shadow-[0_0_10px_rgba(221,206,182,0.8)]"
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
              ) : (
                <motion.span 
                  className="text-taupe text-base tracking-[0.3em] font-body"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ◆ ENTER SYMBOLS ◆
                </motion.span>
              )}
            </motion.div>
          </div>

          {/* Keypad Grid */}
          <div className="space-y-3 relative z-10">
            {keys.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-4 gap-3">
                {row.map((key) => {
                  const isGlitching = glitchKey === key;
                  const isPulsing = pulseKey === key;
                  
                  return (
                    <motion.div
                      key={key}
                      animate={
                        isGlitching
                          ? {
                              x: [0, -3, 3, -2, 2, 0],
                              y: [0, 2, -2, 3, -3, 0],
                              rotate: [0, -5, 5, -3, 3, 0],
                            }
                          : isPulsing
                          ? {
                              scale: [1, 1.15, 1],
                            }
                          : {}
                      }
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        className="h-16 text-3xl font-bold bg-gradient-to-br from-cream via-taupe to-cream text-charcoal hover:from-taupe hover:via-cream hover:to-taupe rounded-xl shadow-lg border-2 border-taupe/50 transition-all duration-200 hover:scale-110 active:scale-95 hover:shadow-[0_0_40px_rgba(129,113,93,0.8)] relative overflow-hidden group"
                        onClick={() => handleKeyPress(key)}
                        disabled={isValidating}
                      >
                        {/* Shine effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                        <span className="drop-shadow-lg relative z-10">{key}</span>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            ))}

            {/* Wide Action Button */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="h-16 w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-cream hover:from-red-700 hover:via-red-800 hover:to-red-900 rounded-xl shadow-lg font-bold border-2 border-red-500/50 hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-200 relative overflow-hidden group"
                  onClick={handleClear}
                  disabled={isValidating}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-red-300/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  <span className="relative z-10 flex items-center justify-center">
                    <X className="mr-2 h-5 w-5" />
                    CLEAR
                  </span>
                </Button>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="h-16 w-full bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-cream hover:from-green-700 hover:via-green-800 hover:to-green-900 rounded-xl shadow-lg font-bold border-2 border-green-500/50 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  onClick={handleSubmit}
                  disabled={code.length === 0 || isValidating}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-green-300/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  <motion.span 
                    className="relative z-10 flex items-center justify-center"
                    animate={isValidating ? { opacity: [1, 0.5, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <Check className="mr-2 h-5 w-5" />
                    {isValidating ? "◆◆◆" : "SUBMIT"}
                  </motion.span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-8 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.p 
            className="text-sm text-taupe font-body mb-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ◆ SECRET CODES HIDDEN IN OUR ◆
          </motion.p>
          <motion.a 
            href="https://instagram.com"
            className="text-cream font-hero text-lg font-bold underline decoration-taupe decoration-2 underline-offset-4 hover:text-taupe transition-colors inline-flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
          >
            <span>INSTAGRAM VAULT</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
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
      `}</style>
    </div>
  );
};

export default VirtualKeypad;
