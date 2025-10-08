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
  gallery?: string[];
  description: string;
  fullDescription?: string;
  sizes: string[];
  colors: string[];
  featured?: boolean;
  collection?: string;
  rating?: number;
  reviews?: number;
  features?: string[];
  material?: string;
  washCare?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Circuit Tee",
    price: 2499,
    category: "T-Shirts",
    image: tshirtImage,
    secondaryImage: tshirtImage,
    gallery: [tshirtImage, tshirtImage, tshirtImage, tshirtImage],
    description: "Minimalist tech-inspired graphic tee with premium cotton blend. Features subtle circuit board design.",
    fullDescription: "Minimal streetwear meets code culture. This oversized tee is made with soft cotton and features subtle syntax-inspired prints. Designed for comfort and individuality.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal", "White"],
    featured: true,
    collection: "Tech Drop",
    rating: 4.8,
    reviews: 132,
    features: [
      "100% Premium Cotton",
      "Oversized Fit",
      "Available in 3 colors",
      "Unisex Design",
      "Printed with eco-friendly ink"
    ],
    material: "100% Premium Cotton, 220 GSM",
    washCare: "Machine wash cold, tumble dry low, do not bleach"
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
