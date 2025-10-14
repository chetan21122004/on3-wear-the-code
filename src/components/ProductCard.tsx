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
        <div className="relative overflow-hidden rounded-md md:rounded-lg bg-[#1C1C1C] aspect-square border border-[#81715D]/20 group-hover:border-[#81715D] transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#81715D]/20">
          <img
            src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#191919]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Wishlist and Add to Cart buttons */}
          <div className="absolute top-2 md:top-4 right-2 md:right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <Button
              variant="ghost"
              size="icon"
              className="bg-[#191919]/80 backdrop-blur-sm hover:bg-[#81715D] border border-[#81715D]/30 h-8 w-8 md:h-10 md:w-10"
              onClick={(e) => {
                e.preventDefault();
                // Add to wishlist logic
              }}
            >
              <Heart className="h-4 w-4 md:h-5 md:w-5 text-[#DDCEB6]" />
            </Button>
          </div>

          {/* Available colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 flex gap-1 md:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              {product.colors.slice(0, 3).map((color, idx) => (
                <div
                  key={idx}
                  className="w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-[#DDCEB6]/30"
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
      <div className="mt-3 md:mt-4 space-y-1 md:space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-medium text-[#DDCEB6] group-hover:text-[#81715D] transition-colors uppercase tracking-wide text-xs md:text-sm truncate">
              {product.name}
            </h3>
            <p className="text-[10px] md:text-xs text-[#DDCEB6]/50 mt-0.5 md:mt-1">{product.category}</p>
          </div>
          <p className="font-price font-bold text-sm md:text-lg text-[#81715D] flex-shrink-0">
            ₹{(product.price / 100).toFixed(0)}
          </p>
        </div>
        
        {/* Size availability */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex gap-1 text-[10px] md:text-xs text-[#DDCEB6]/40">
            {product.sizes.slice(0, 4).map((size, idx) => (
              <span key={idx}>{size}{idx < Math.min(product.sizes.length - 1, 3) ? ' / ' : ''}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
