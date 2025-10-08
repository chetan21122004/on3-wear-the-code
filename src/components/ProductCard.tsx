import * as React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden rounded-lg bg-[#1C1C1C] aspect-square border border-[#81715D]/20 group-hover:border-[#81715D] transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#81715D]/20">
          <img
            src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#191919]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Wishlist and Add to Cart buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <Button
              variant="ghost"
              size="icon"
              className="bg-[#191919]/80 backdrop-blur-sm hover:bg-[#81715D] border border-[#81715D]/30"
              onClick={(e) => {
                e.preventDefault();
                // Add to wishlist logic
              }}
            >
              <Heart className="h-5 w-5 text-[#DDCEB6]" />
            </Button>
          </div>

          {/* Available colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              {product.colors.slice(0, 3).map((color, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded-full border-2 border-[#DDCEB6]/30"
                  style={{ 
                    backgroundColor: color.toLowerCase() === 'black' ? '#000' : 
                                   color.toLowerCase() === 'white' ? '#fff' : 
                                   color.toLowerCase() === 'charcoal' ? '#36454F' :
                                   color.toLowerCase() === 'beige' ? '#F5F5DC' :
                                   color.toLowerCase() === 'olive' ? '#808000' : '#81715D'
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
      <div className="mt-4 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-heading font-medium text-[#DDCEB6] group-hover:text-[#81715D] transition-colors uppercase tracking-wide">
              {product.name}
            </h3>
            <p className="text-xs text-[#DDCEB6]/50 mt-1">{product.category}</p>
          </div>
          <p className="font-price font-bold text-lg text-[#81715D]">
            ₹{(product.price / 100).toFixed(2)}
          </p>
        </div>
        
        {/* Size availability */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex gap-1 text-xs text-[#DDCEB6]/40">
            {product.sizes.map((size, idx) => (
              <span key={idx}>{size}{idx < product.sizes.length - 1 ? ' / ' : ''}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
