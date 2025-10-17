import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPassword = () => {
  const { toast } = useToast();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(0);
  const logos = ["/simplelogo.png", "/logo.png"];

  // Logo animation
  useEffect(() => {
    const logoInterval = setInterval(() => {
      setCurrentLogo((prev) => (prev + 1) % logos.length);
    }, 3000);
    return () => clearInterval(logoInterval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate form data
    const result = forgotPasswordSchema.safeParse({ email });
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as string] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        toast({
          title: "Reset Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setIsSubmitted(true);
        toast({
          title: "Reset Link Sent! 📧",
          description: "Check your email for password reset instructions.",
        });
      }
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#191919] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Moving diagonal lines */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute bg-gradient-to-r from-transparent via-[#81715D]/10 to-transparent"
            style={{
              height: '1px',
              top: `${Math.random() * 100}%`,
              left: '-100%',
              width: `${Math.random() * 300 + 150}px`,
            }}
            animate={{
              left: ['-100%', '100%'],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear',
            }}
          />
        ))}

        {/* Code-inspired grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(129, 113, 93, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(129, 113, 93, 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#DDCEB6]/5 backdrop-blur-sm border border-[#81715D]/20 rounded-lg p-8 shadow-2xl"
        >
          {/* Back Button */}
          <Link
            to="/login"
            className="inline-flex items-center text-[#81715D] hover:text-[#DDCEB6] transition-colors mb-6 font-body"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>

          {/* Logo and Header */}
          <div className="text-center mb-8">
            <motion.div
              className="relative h-20 w-20 mx-auto mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-[#DDCEB6] rounded-full shadow-lg shadow-[#81715D]/30 overflow-hidden">
                <motion.img
                  key={currentLogo}
                  src={logos[currentLogo]}
                  alt="On3 Logo"
                  className="h-full w-full object-contain p-2"
                  initial={{ opacity: 0, rotate: -10 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-3xl font-hero font-bold text-[#DDCEB6] mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Reset Password
            </motion.h1>
            <motion.p 
              className="text-[#DDCEB6]/60 font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {isSubmitted 
                ? "Check your email for reset instructions"
                : "Enter your email to receive reset instructions"
              }
            </motion.p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-[#DDCEB6] font-heading">
                  Email Address
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#81715D]" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 bg-[#191919]/50 border-[#81715D]/30 text-[#DDCEB6] placeholder:text-[#DDCEB6]/40 focus:border-[#81715D] focus:ring-1 focus:ring-[#81715D]/50 ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#81715D] hover:bg-[#DDCEB6] text-[#191919] font-heading font-semibold transition-all duration-300"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#191919] mr-2"></div>
                    Sending reset link...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Reset Link
                  </div>
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-[#81715D]/20 rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8 text-[#81715D]" />
              </div>
              
              <div className="space-y-2">
                <p className="text-[#DDCEB6] font-body">
                  We've sent a password reset link to:
                </p>
                <p className="text-[#81715D] font-semibold">{email}</p>
              </div>

              <div className="text-sm text-[#DDCEB6]/60 font-body">
                <p>Didn't receive the email? Check your spam folder or</p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail("");
                  }}
                  className="text-[#81715D] hover:text-[#DDCEB6] transition-colors underline"
                >
                  try again
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-[#DDCEB6]/40 font-mono">
              &lt;wear_the_code();&gt;
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
