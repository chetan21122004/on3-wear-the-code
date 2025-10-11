import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(1); // Start with main logo
  const [hasChanged, setHasChanged] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const logos = ["/simplelogo.png", "/logo.png", "/2ndrylogo.png"];

  const handleLogoHover = () => {
    if (hasChanged) return;
    setCurrentLogo((prev) => (prev + 1) % logos.length);
    setHasChanged(true);
    setIsAnimating(true);
    window.setTimeout(() => setIsAnimating(false), 300);
  };

  const handleLogoLeave = () => {
    setHasChanged(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Keypad", path: "/keypad" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#191919]/95 backdrop-blur-md border-b border-[#81715D]/20 shadow-[0_8px_32px_rgba(129,113,93,0.15)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-20 justify-between relative">
          {/* Animated gradient line at top */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#81715D] to-transparent opacity-50 animate-pulse" />
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center relative group"
            onMouseEnter={handleLogoHover}
            onMouseLeave={handleLogoLeave}
          >
            <div className="relative h-24 w-24 top-4">
              <div className="absolute inset-0 bg-cream rounded-full shadow-[0_0_30px_rgba(221,206,182,0.3)] group-hover:shadow-[0_0_50px_rgba(221,206,182,0.5)] overflow-hidden transition-all duration-300 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#81715D]/20 to-transparent rounded-full" />
              <motion.img
                key={currentLogo}
                src={logos[currentLogo]}
                alt="On3 Logo"
                className="absolute inset-0 h-full w-full object-contain p-2 relative z-10"
                initial={isAnimating ? { opacity: 0, scale: 0.9, rotate: -8 } : { opacity: 1, scale: 1, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                  filter: isAnimating
                    ? 'drop-shadow(0 0 12px hsla(var(--taupe) / 0.4))'
                    : 'drop-shadow(0 0 0 hsla(var(--taupe) / 0))',
                }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-heading font-medium text-[#DDCEB6] hover:text-[#81715D] transition-smooth relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#81715D] after:transition-all after:duration-300 hover:after:w-full group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative">
                  {link.name}
                  <span className="absolute -inset-2 bg-[#81715D]/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
                </span>
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-[#DDCEB6] hover:text-[#81715D] hover:bg-[#81715D]/10 relative group shadow-md hover:shadow-[0_0_20px_rgba(129,113,93,0.3)] transition-all duration-300"
            >
              <Search className="h-5 w-5 relative z-10" />
              <span className="absolute inset-0 bg-[#81715D]/20 rounded-md opacity-0 group-hover:opacity-100 animate-pulse" />
            </Button>
            <Link to="/wishlist">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-[#DDCEB6] hover:text-[#81715D] hover:bg-[#81715D]/10 relative group shadow-md hover:shadow-[0_0_20px_rgba(129,113,93,0.3)] transition-all duration-300"
              >
                <Heart className="h-5 w-5 relative z-10" />
                <span className="absolute inset-0 bg-[#81715D]/20 rounded-md opacity-0 group-hover:opacity-100 animate-pulse" />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-[#DDCEB6] hover:text-[#81715D] hover:bg-[#81715D]/10 relative group shadow-md hover:shadow-[0_0_20px_rgba(129,113,93,0.3)] transition-all duration-300"
            >
              <ShoppingCart className="h-5 w-5 relative z-10" />
              <span className="absolute inset-0 bg-[#81715D]/20 rounded-md opacity-0 group-hover:opacity-100 animate-pulse" />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-[#DDCEB6] hover:text-[#81715D] hover:bg-[#81715D]/10 shadow-md hover:shadow-[0_0_20px_rgba(129,113,93,0.3)] transition-all duration-300"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-card">
                <div className="flex flex-col space-y-6 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-heading font-medium text-foreground hover:text-primary transition-smooth"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
