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
      {/* Optimized subtle background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--taupe)) 1px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="w-full max-w-sm relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.h1 
            className="text-5xl font-hero font-bold mb-4 text-cream relative"
            animate={{
              textShadow: [
                "0 0 20px rgba(221, 206, 182, 0.5)",
                "0 0 40px rgba(221, 206, 182, 0.8)",
                "0 0 20px rgba(221, 206, 182, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⚡ CIPHER PAD ⚡
            <motion.span
              className="absolute -top-2 -right-2 text-taupe text-2xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              ◎
            </motion.span>
          </motion.h1>
          <p className="text-taupe font-body tracking-wider">
            🔮 DECODE THE MATRIX 🔮
          </p>
        </motion.div>

        {/* Keypad Container */}
        <motion.div 
          className="bg-gradient-to-br from-charcoal via-charcoal to-taupe/20 rounded-3xl p-6 shadow-2xl border-2 border-taupe/30 relative overflow-hidden"
          animate={{
            boxShadow: [
              "0 0 30px rgba(129, 113, 93, 0.3)",
              "0 0 60px rgba(129, 113, 93, 0.6)",
              "0 0 30px rgba(129, 113, 93, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >

          {/* Display integrated as first key */}
          <div className="mb-4 relative">
            <motion.div 
              className="bg-charcoal/80 rounded-2xl h-24 flex items-center justify-center text-cream font-mono text-4xl tracking-[0.5em] shadow-inner border-2 border-taupe/50 relative overflow-hidden"
              animate={{
                borderColor: code.length > 0 ? "rgba(221, 206, 182, 0.8)" : "rgba(129, 113, 93, 0.5)",
              }}
            >
              {code || (
                <motion.span 
                  className="text-taupe text-lg tracking-widest"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⚡ ENTER CODE ⚡
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
                        className="h-16 text-3xl font-bold bg-gradient-to-br from-cream via-taupe to-cream text-charcoal hover:from-taupe hover:via-cream hover:to-taupe rounded-2xl shadow-lg border-2 border-taupe/50 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(129,113,93,0.6)]"
                        onClick={() => handleKeyPress(key)}
                        disabled={isValidating}
                      >
                        <span className="drop-shadow-lg">{key}</span>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            ))}

            {/* Wide Action Button */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="h-14 w-full bg-gradient-to-r from-red-600 to-red-800 text-cream hover:from-red-700 hover:to-red-900 rounded-2xl shadow-lg font-bold border-2 border-red-500/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all duration-200"
                  onClick={handleClear}
                  disabled={isValidating}
                >
                  <X className="mr-2 h-5 w-5" />
                  <span>✗ CLEAR</span>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="h-14 w-full bg-gradient-to-r from-green-600 to-green-800 text-cream hover:from-green-700 hover:to-green-900 rounded-2xl shadow-lg font-bold border-2 border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-200 disabled:opacity-50"
                  onClick={handleSubmit}
                  disabled={code.length === 0 || isValidating}
                >
                  <Check className="mr-2 h-5 w-5" />
                  <span>
                    {isValidating ? "⚡⚡⚡" : "✓ ENTER"}
                  </span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.p 
          className="text-center text-sm text-taupe mt-6 font-body"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🔮 Codes are hidden in our{" "}
          <a href="https://instagram.com" className="text-cream underline font-semibold hover:text-taupe transition-colors">
            Instagram Matrix
          </a>{" "}
          ⚡
        </motion.p>
      </div>

    </div>
  );
};

export default VirtualKeypad;
