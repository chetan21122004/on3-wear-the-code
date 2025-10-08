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
        <div className="relative overflow-hidden rounded-sm bg-card aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm hover:bg-background"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </Link>
      <div className="mt-4 space-y-1">
        <h3 className="font-heading font-medium text-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <p className="font-price font-bold text-lg text-primary">
          ₹{(product.price / 100).toFixed(2)}
        </p>
      </div>
    </div>
  );
};
