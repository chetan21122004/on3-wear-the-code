import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log("Starting auth callback process...");
        
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        console.log("URL params:", { code: code ? 'present' : 'missing', error });

        // Handle OAuth error
        if (error) {
          console.error("OAuth error:", error);
          toast({
            title: "Authentication Error",
            description: error,
            variant: "destructive",
          });
          setIsProcessing(false);
          navigate("/login");
          return;
        }

        // If no code, redirect to login
        if (!code) {
          console.warn("No authorization code found");
          setIsProcessing(false);
          navigate("/login");
          return;
        }

        console.log("Authorization code found, waiting for session...");

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log("Auth state change:", event, session ? 'session present' : 'no session');
          
          if (event === 'SIGNED_IN' && session) {
            console.log("Successfully signed in!");
            subscription.unsubscribe();
            setIsProcessing(false);
            toast({
              title: "Welcome to On3! 🎉",
              description: "You've successfully signed in.",
            });
            navigate("/");
          } else if (event === 'SIGNED_OUT' || (event === 'TOKEN_REFRESHED' && !session)) {
            console.warn("Sign in failed or session lost");
            subscription.unsubscribe();
            setIsProcessing(false);
            navigate("/login");
          }
        });

        // Set a timeout to prevent infinite loading
        const timeout = setTimeout(() => {
          console.warn("Auth callback timeout");
          subscription.unsubscribe();
          setIsProcessing(false);
          toast({
            title: "Authentication Timeout",
            description: "Authentication took too long. Please try again.",
            variant: "destructive",
          });
          navigate("/login");
        }, 10000); // 10 second timeout

        // Check if we already have a session
        const { data, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          clearTimeout(timeout);
          subscription.unsubscribe();
          setIsProcessing(false);
          toast({
            title: "Authentication Error",
            description: sessionError.message,
            variant: "destructive",
          });
          navigate("/login");
          return;
        }

        if (data.session) {
          console.log("Session already exists!");
          clearTimeout(timeout);
          subscription.unsubscribe();
          setIsProcessing(false);
          toast({
            title: "Welcome to On3! 🎉",
            description: "You've successfully signed in.",
          });
          navigate("/");
        }

        // Cleanup function
        return () => {
          clearTimeout(timeout);
          subscription.unsubscribe();
        };

      } catch (error) {
        console.error("Unexpected error during auth callback:", error);
        setIsProcessing(false);
        toast({
          title: "Authentication Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
        navigate("/login");
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-[#191919] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#81715D] mx-auto mb-4"></div>
        <p className="text-[#DDCEB6] font-body mb-2">
          {isProcessing ? "Completing authentication..." : "Redirecting..."}
        </p>
        <p className="text-[#DDCEB6]/60 text-sm">
          This should only take a few seconds
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
