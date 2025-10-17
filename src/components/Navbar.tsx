import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Menu, X, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useCartItemCount } from "@/hooks/useCart";
import { useWishlistItemCount } from "@/hooks/useWishlist";

export const Navbar = () => {
  const { user, userProfile, signOut, forceSignOut, loading } = useAuth();
  const { toast } = useToast();
  const { data: cartCount } = useCartItemCount();
  const { data: wishlistCount } = useWishlistItemCount();
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

  const handleSignOut = async () => {
    try {
      // Set a timeout for the signOut operation
      const signOutPromise = signOut();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Sign out timeout')), 5000)
      );

      const { error } = await Promise.race([signOutPromise, timeoutPromise]) as any;
      
      if (error) {
        console.warn('Regular sign out failed, using force sign out:', error.message);
        // If regular sign out fails, use force sign out
        forceSignOut();
        toast({
          title: "Signed Out",
          description: "You've been successfully signed out.",
        });
      } else {
        toast({
          title: "Signed Out",
          description: "You've been successfully signed out.",
        });
      }
    } catch (error) {
      console.warn('Sign out error, using force sign out:', error);
      // If there's any error or timeout, force sign out
      forceSignOut();
      toast({
        title: "Signed Out",
        description: "You've been successfully signed out.",
      });
    }
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

          {/* Icons and Auth */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-[#DDCEB6] hover:text-[#81715D]">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="text-[#DDCEB6] hover:text-[#81715D] relative">
                <Heart className="h-5 w-5" />
                {wishlistCount && wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#81715D] text-[#191919] text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="text-[#DDCEB6] hover:text-[#81715D] relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#81715D] text-[#191919] text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Authentication */}
            {loading ? (
              <div className="w-8 h-8 animate-spin rounded-full border-b-2 border-[#81715D]"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userProfile?.avatar_url || user.user_metadata?.avatar_url} alt={userProfile?.full_name || user.email} />
                      <AvatarFallback className="bg-[#81715D] text-[#191919]">
                        {(userProfile?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#191919] border-[#81715D]/30" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-[#DDCEB6]">
                        {userProfile?.full_name || user.user_metadata?.full_name || 'User'}
                      </p>
                      <p className="w-[200px] truncate text-sm text-[#DDCEB6]/60">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-[#81715D]/20" />
                  <DropdownMenuItem className="text-[#DDCEB6] focus:bg-[#81715D]/10 focus:text-[#DDCEB6]" asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[#DDCEB6] focus:bg-[#81715D]/10 focus:text-[#DDCEB6]">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    <span>Orders</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#81715D]/20" />
                  <DropdownMenuItem 
                    className="text-[#DDCEB6] focus:bg-[#81715D]/10 focus:text-[#DDCEB6]"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" className="text-[#DDCEB6] hover:text-[#81715D] font-heading">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#81715D] hover:bg-[#DDCEB6] text-[#191919] font-heading">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

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
                  
                  {/* Mobile Auth Links */}
                  {!user && (
                    <div className="flex flex-col space-y-4 pt-6 border-t border-border">
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full font-heading">
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/signup" onClick={() => setIsOpen(false)}>
                        <Button className="w-full font-heading">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                  
                  {user && (
                    <div className="flex flex-col space-y-4 pt-6 border-t border-border">
                      <div className="text-sm text-muted-foreground">
                        Signed in as {userProfile?.full_name || user.email}
                      </div>
                      <Button variant="outline" onClick={handleSignOut} className="w-full font-heading">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
