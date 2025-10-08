import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, MessageCircle, Keyboard } from "lucide-react";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedCollection, setSelectedCollection] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 6000]);
  const [sortBy, setSortBy] = useState("newest");

  const categories = ["All", "T-Shirts", "Hoodies", "Lowers"];
  const sizes = ["All", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36"];
  const colors = ["All", "Black", "White", "Charcoal", "Beige", "Olive", "Ash Grey", "Navy", "Khaki"];
  const collections = ["All", "Tech Drop", "Classic", "Limited Edition"];

  let filteredProducts = products.filter((p) => {
    const categoryMatch = selectedCategory === "All" || p.category === selectedCategory;
    const sizeMatch = selectedSize === "All" || p.sizes.includes(selectedSize);
    const colorMatch = selectedColor === "All" || p.colors.includes(selectedColor);
    const collectionMatch = selectedCollection === "All" || p.collection === selectedCollection;
    const priceMatch = p.price >= priceRange[0] * 100 && p.price <= priceRange[1] * 100;
    
    return categoryMatch && sizeMatch && colorMatch && collectionMatch && priceMatch;
  });

  // Sorting
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "popular") {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-[#191919] border-b border-[#81715D]/20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(129, 113, 93, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(129, 113, 93, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <h1 className="text-5xl md:text-6xl font-hero font-bold text-[#DDCEB6] mb-4">
            Shop<span className="animate-pulse">_</span>
          </h1>
          <p className="text-[#DDCEB6]/70 text-lg max-w-2xl font-body">
            Explore our curated streetwear pieces designed to express individuality.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters & Sorting Bar */}
        <div className="sticky top-20 z-40 bg-[#DDCEB6]/5 backdrop-blur-md border border-[#81715D]/20 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-[#DDCEB6]/70">
              <span className="font-heading font-semibold">{filteredProducts.length}</span> products
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-background border-[#81715D]/30">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-card border-[#81715D]/30">
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low → High</SelectItem>
                  <SelectItem value="price-high">Price: High → Low</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden border-[#81715D]/30">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-card overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {/* Category */}
                    <div>
                      <h3 className="font-heading font-semibold mb-3">Category</h3>
                      <div className="space-y-2">
                        {categories.map((cat) => (
                          <Button
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => setSelectedCategory(cat)}
                          >
                            {cat}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Size */}
                    <div>
                      <h3 className="font-heading font-semibold mb-3">Size</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {sizes.map((size) => (
                          <Button
                            key={size}
                            variant={selectedSize === size ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedSize(size)}
                          >
                            {size}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Color */}
                    <div>
                      <h3 className="font-heading font-semibold mb-3">Color</h3>
                      <div className="space-y-2">
                        {colors.map((color) => (
                          <Button
                            key={color}
                            variant={selectedColor === color ? "default" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => setSelectedColor(color)}
                          >
                            {color}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Collection */}
                    <div>
                      <h3 className="font-heading font-semibold mb-3">Collection</h3>
                      <div className="space-y-2">
                        {collections.map((coll) => (
                          <Button
                            key={coll}
                            variant={selectedCollection === coll ? "default" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => setSelectedCollection(coll)}
                          >
                            {coll}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <h3 className="font-heading font-semibold mb-3">Price Range</h3>
                      <div className="space-y-4">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          min={0}
                          max={6000}
                          step={100}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>₹{priceRange[0]}</span>
                          <span>₹{priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-32 space-y-6 bg-[#DDCEB6]/5 backdrop-blur-sm border border-[#81715D]/20 rounded-lg p-6">
              {/* Category */}
              <div>
                <h3 className="font-heading font-semibold mb-4 text-lg text-[#DDCEB6]">Category</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="font-heading font-semibold mb-4 text-lg text-[#DDCEB6]">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.slice(0, 9).map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      className="text-xs"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <h3 className="font-heading font-semibold mb-4 text-lg text-[#DDCEB6]">Color</h3>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Collection */}
              <div>
                <h3 className="font-heading font-semibold mb-4 text-lg text-[#DDCEB6]">Collection</h3>
                <div className="space-y-2">
                  {collections.map((coll) => (
                    <Button
                      key={coll}
                      variant={selectedCollection === coll ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCollection(coll)}
                    >
                      {coll}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-heading font-semibold mb-4 text-lg text-[#DDCEB6]">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={6000}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-[#DDCEB6]/70">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 mb-6 relative">
                  <div className="absolute inset-0 border-4 border-[#81715D]/20 rounded-lg animate-pulse" />
                  <div className="absolute inset-2 border-4 border-[#81715D]/40 rounded-lg animate-pulse" style={{ animationDelay: '0.2s' }} />
                </div>
                <h3 className="text-2xl font-heading font-semibold text-[#DDCEB6] mb-2">
                  No results found
                </h3>
                <p className="text-[#DDCEB6]/60 mb-6 max-w-md">
                  Try removing some filters or explore our full collection.
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedSize("All");
                    setSelectedColor("All");
                    setSelectedCollection("All");
                    setPriceRange([0, 6000]);
                  }}
                  className="bg-[#81715D] hover:bg-[#DDCEB6] text-[#191919]"
                >
                  Back to All Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <Link to="/keypad">
        <Button
          size="icon"
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-[#81715D] hover:bg-[#DDCEB6] text-[#191919] shadow-lg z-50"
        >
          <Keyboard className="h-6 w-6" />
        </Button>
      </Link>

      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="icon"
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </a>
    </div>
  );
};

export default Shop;
