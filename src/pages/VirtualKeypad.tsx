import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";

const VirtualKeypad = () => {
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const validCodes = ["ON3", "CODE", "WEAR", "TECH"];

  const keys = [
    ["1", "2", "3", "A"],
    ["4", "5", "6", "B"],
    ["7", "8", "9", "C"],
    ["0", "D", "E", "F"],
  ];

  const handleKeyPress = (key: string) => {
    if (code.length < 6) {
      setCode(code + key);
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
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#8B7355]">
      <div className="w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-hero font-bold mb-4 text-[#E8DCC8]">
            Virtual Keypad
          </h1>
          <p className="text-[#E8DCC8]/80">
            Enter exclusive codes for special discounts
          </p>
        </motion.div>

        {/* Keypad Container */}
        <div className="bg-[#6B5D4F] rounded-3xl p-6 shadow-2xl">
          {/* Display integrated as first key */}
          <div className="mb-4">
            <div className="bg-[#3D3935] rounded-2xl h-20 flex items-center justify-center text-[#E8DCC8] font-mono text-3xl tracking-wider shadow-inner">
              {code || (
                <span className="text-[#8B7355] text-lg">
                  Enter Code
                </span>
              )}
            </div>
          </div>

          {/* Keypad Grid */}
          <div className="space-y-3">
            {keys.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-4 gap-3">
                {row.map((key) => (
                  <Button
                    key={key}
                    className="h-16 text-xl font-bold bg-[#E8DCC8] text-[#3D3935] hover:bg-[#D4C4A8] rounded-2xl shadow-md border-0 transition-all duration-200 hover:scale-95 active:scale-90"
                    onClick={() => handleKeyPress(key)}
                    disabled={isValidating}
                  >
                    {key}
                  </Button>
                ))}
              </div>
            ))}

            {/* Wide Action Button */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                className="h-14 bg-[#E8DCC8] text-[#3D3935] hover:bg-[#D4C4A8] rounded-2xl shadow-md font-bold transition-all duration-200 hover:scale-95 active:scale-90"
                onClick={handleClear}
                disabled={isValidating}
              >
                <X className="mr-2 h-5 w-5" />
                Clear
              </Button>
              <Button
                className="h-14 bg-[#E8DCC8] text-[#3D3935] hover:bg-[#D4C4A8] rounded-2xl shadow-md font-bold transition-all duration-200 hover:scale-95 active:scale-90"
                onClick={handleSubmit}
                disabled={code.length === 0 || isValidating}
              >
                <Check className="mr-2 h-5 w-5" />
                {isValidating ? "..." : "Enter"}
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-[#E8DCC8]/70 mt-6">
          💡 Codes are shared exclusively on our{" "}
          <a href="https://instagram.com" className="text-[#E8DCC8] underline font-semibold">
            Instagram
          </a>
        </p>
      </div>
    </div>
  );
};

export default VirtualKeypad;
