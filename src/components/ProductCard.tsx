import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group relative">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden rounded-lg bg-[#1C1C1C] aspect-square border border-[#81715D]/20 group-hover:border-[#81715D]/40 transition-all duration-300">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#191919]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#191919]/80 backdrop-blur-sm hover:bg-[#81715D] border border-[#81715D]/30"
          >
            <Heart className="h-5 w-5 text-[#DDCEB6]" />
          </Button>
        </div>
      </Link>
      <div className="mt-4 space-y-1">
        <h3 className="font-heading font-medium text-[#DDCEB6] group-hover:text-[#81715D] transition-colors">{product.name}</h3>
        <p className="text-sm text-[#DDCEB6]/50">{product.category}</p>
        <p className="font-price font-bold text-lg text-[#81715D]">
          ₹{(product.price / 100).toFixed(2)}
        </p>
      </div>
    </div>
  );
};
