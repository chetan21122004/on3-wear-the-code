import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-[#191919] border-t border-[#81715D]/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center bg-[#DDCEB6] w-fit rounded-full shadow  shadow-white ">
             <img src="/logo.png" alt="" className="h-24 w-24 object-contain" />
            </Link>
            <p className="text-sm text-[#DDCEB6]/60">
              Wear The Code. Minimal, expressive streetwear inspired by tech culture.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DDCEB6]/60 hover:text-[#81715D] transition-smooth"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@on3wear.com"
                className="text-[#DDCEB6]/60 hover:text-[#81715D] transition-smooth"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-[#DDCEB6]">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-sm text-[#DDCEB6]/60 hover:text-[#81715D] transition-smooth">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-sm text-[#DDCEB6]/60 hover:text-[#81715D] transition-smooth">
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-sm text-[#DDCEB6]/60 hover:text-[#81715D] transition-smooth">
                  Hoodies
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-sm text-[#DDCEB6]/60 hover:text-[#81715D] transition-smooth">
                  Lowers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-[#DDCEB6]">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-[#DDCEB6]/60 hover:text-[#81715D] transition-smooth">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-[#DDCEB6]/60 hover:text-[#81715D] transition-smooth">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-[#DDCEB6]/60 hover:text-[#81715D] transition-smooth">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-[#DDCEB6]/60 hover:text-[#81715D] transition-smooth">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-[#DDCEB6]">Stay Updated</h4>
            <p className="text-sm text-[#DDCEB6]/60 mb-4">
              Subscribe for exclusive drops and codes.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter email"
                className="bg-[#1C1C1C] border-[#81715D]/30 text-[#DDCEB6] placeholder:text-[#DDCEB6]/40"
              />
              <Button className="bg-[#81715D] text-[#191919] hover:bg-[#DDCEB6]">
                Join
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#81715D]/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#DDCEB6]/50">
              © 2025 On3. All rights reserved.
            </p>
            <p className="text-sm text-[#DDCEB6]/50 font-mono">
              &lt;wear_the_code();&gt;
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
