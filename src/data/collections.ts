import heroBanner from "@/assets/hero-banner.jpg";

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  bannerImage: string;
  productCount: number;
  featured?: boolean;
}

export const collections: Collection[] = [
  {
    id: "1",
    name: "Tech Drop",
    slug: "tech-drop",
    description: "Minimal streetwear meets code culture. Oversized fits with tech-inspired graphics.",
    bannerImage: heroBanner,
    productCount: 12,
    featured: true,
  },
  {
    id: "2",
    name: "Classic",
    slug: "classic",
    description: "Timeless essentials for everyday wear. Clean designs, premium quality.",
    bannerImage: heroBanner,
    productCount: 8,
    featured: true,
  },
  {
    id: "3",
    name: "Limited Edition",
    slug: "limited-edition",
    description: "Exclusive drops. Once they're gone, they're gone forever.",
    bannerImage: heroBanner,
    productCount: 5,
    featured: false,
  },
];
