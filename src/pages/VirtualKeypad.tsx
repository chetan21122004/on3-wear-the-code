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
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0", "A", "B"],
    ["C", "D", "E"],
    ["F", "G", "H"],
    ["I", "J", "K"],
    ["L", "M", "N"],
    ["O", "P", "Q"],
    ["R", "S", "T"],
    ["U", "V", "W"],
    ["X", "Y", "Z"],
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
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-hero font-bold mb-4">
            <span className="glitch">Virtual Keypad</span>
          </h1>
          <p className="text-muted-foreground">
            Enter exclusive codes for special discounts
          </p>
        </motion.div>

        {/* Display */}
        <div className="bg-card rounded-sm p-6 mb-6 border border-border">
          <div className="flex items-center justify-center h-16 bg-background rounded-sm font-mono text-2xl tracking-widest">
            {code || (
              <span className="text-muted-foreground text-base">
                Enter Code
              </span>
            )}
            <span className="cursor-blink ml-1"></span>
          </div>
        </div>

        {/* Keypad */}
        <div className="bg-card rounded-sm p-6 border border-border space-y-2">
          {keys.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2">
              {row.map((key) => (
                <Button
                  key={key}
                  variant="outline"
                  className="flex-1 h-14 text-lg font-mono hover:bg-primary hover:text-primary-foreground transition-smooth"
                  onClick={() => handleKeyPress(key)}
                  disabled={isValidating}
                >
                  {key}
                </Button>
              ))}
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              className="flex-1 h-14"
              onClick={handleClear}
              disabled={isValidating}
            >
              <X className="mr-2 h-5 w-5" />
              Clear
            </Button>
            <Button
              variant="default"
              className="flex-1 h-14 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSubmit}
              disabled={code.length === 0 || isValidating}
            >
              <Check className="mr-2 h-5 w-5" />
              {isValidating ? "Validating..." : "Submit"}
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          💡 Codes are shared exclusively on our{" "}
          <a href="https://instagram.com" className="text-primary underline">
            Instagram
          </a>
        </p>
      </div>
    </div>
  );
};

export default VirtualKeypad;
