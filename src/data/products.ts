import tshirtImage from "@/assets/product-tshirt.jpg";
import hoodieImage from "@/assets/product-hoodie.jpg";
import cargoImage from "@/assets/product-cargo.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  secondaryImage?: string;
  description: string;
  sizes: string[];
  colors: string[];
  featured?: boolean;
  collection?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Circuit Tee",
    price: 2499,
    category: "T-Shirts",
    image: tshirtImage,
    secondaryImage: tshirtImage,
    description: "Minimalist tech-inspired graphic tee with premium cotton blend. Features subtle circuit board design.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal", "White"],
    featured: true,
    collection: "Tech Drop",
  },
  {
    id: "2",
    name: "Code Hoodie",
    price: 4999,
    category: "Hoodies",
    image: hoodieImage,
    secondaryImage: hoodieImage,
    description: "Premium heavyweight hoodie with embossed code typography. Perfect for urban comfort.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Ash Grey", "Navy"],
    featured: true,
    collection: "Tech Drop",
  },
  {
    id: "3",
    name: "Tech Cargo",
    price: 5499,
    category: "Lowers",
    image: cargoImage,
    secondaryImage: cargoImage,
    description: "Functional cargo pants with modern cut. Multiple utility pockets meet streetwear aesthetics.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Beige", "Black", "Olive"],
    featured: true,
    collection: "Classic",
  },
  {
    id: "4",
    name: "Binary Tee",
    price: 2299,
    category: "T-Shirts",
    image: tshirtImage,
    secondaryImage: tshirtImage,
    description: "Oversized fit with binary code print. Comfortable cotton blend for everyday wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White"],
    featured: false,
    collection: "Classic",
  },
  {
    id: "5",
    name: "Terminal Hoodie",
    price: 4799,
    category: "Hoodies",
    image: hoodieImage,
    secondaryImage: hoodieImage,
    description: "Heavyweight pullover with terminal-inspired graphics. Warm and stylish.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Grey"],
    featured: false,
    collection: "Limited Edition",
  },
  {
    id: "6",
    name: "Urban Cargo",
    price: 5299,
    category: "Lowers",
    image: cargoImage,
    secondaryImage: cargoImage,
    description: "Tapered cargo pants with adjustable cuffs. Modern streetwear essential.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Khaki", "Black"],
    featured: false,
    collection: "Classic",
  },
];
