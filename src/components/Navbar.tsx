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
  const logos = ["/simplelogo.png", "/logo.png"];

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
    <nav className="sticky top-0 z-50 bg-[#191919] backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-20 justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center relative group"
            onMouseEnter={handleLogoHover}
            onMouseLeave={handleLogoLeave}
          >
            <div className="relative h-24 w-24 top-4">
              <div className="absolute inset-0 bg-cream rounded-full shadow-lg shadow-taupe/30 overflow-hidden" />
              <motion.img
                key={currentLogo}
                src={logos[currentLogo]}
                alt="On3 Logo"
                className="absolute inset-0 h-full w-full object-contain p-2"
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
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-heading font-medium text-[#DDCEB6] hover:text-[#81715D] transition-smooth relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#81715D] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-[#DDCEB6] hover:text-[#81715D]">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="text-[#DDCEB6] hover:text-[#81715D]">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="text-[#DDCEB6] hover:text-[#81715D]">
              <ShoppingCart className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
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
