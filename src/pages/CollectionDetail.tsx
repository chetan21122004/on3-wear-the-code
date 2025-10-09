import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { collections } from "@/data/collections";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal, ArrowRight } from "lucide-react";

const CollectionDetail = () => {
  const { slug } = useParams();
  const collection = collections.find((c) => c.slug === slug);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [sortBy, setSortBy] = useState<string>("newest");

  if (!collection) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-cream mb-4">Collection Not Found</h1>
          <Link to="/collections">
            <Button>Back to Collections</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Filter products by collection
  const collectionProducts = products.filter(
    (p) => p.collection === collection.name
  );

  // Apply filters
  const filteredProducts = useMemo(() => {
    let filtered = [...collectionProducts];

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((p) =>
        p.sizes.some((size) => selectedSizes.includes(size))
      );
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) =>
        p.colors.some((color) => selectedColors.includes(color))
      );
    }

    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] * 100 && p.price <= priceRange[1] * 100
    );

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      case "newest":
      default:
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
    }

    return filtered;
  }, [
    collectionProducts,
    selectedCategory,
    selectedSizes,
    selectedColors,
    priceRange,
    sortBy,
  ]);

  const categories = Array.from(new Set(collectionProducts.map((p) => p.category)));
  const allSizes = Array.from(new Set(collectionProducts.flatMap((p) => p.sizes)));
  const allColors = Array.from(new Set(collectionProducts.flatMap((p) => p.colors)));

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-heading text-cream font-bold mb-3 uppercase tracking-wide">
          Category
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`block w-full text-left px-3 py-2 rounded transition-colors ${
              selectedCategory === "all"
                ? "bg-taupe text-charcoal"
                : "text-taupe hover:bg-taupe/10"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                selectedCategory === cat
                  ? "bg-taupe text-charcoal"
                  : "text-taupe hover:bg-taupe/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <h3 className="font-heading text-cream font-bold mb-3 uppercase tracking-wide">
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                setSelectedSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                );
              }}
              className={`px-4 py-2 rounded border transition-colors ${
                selectedSizes.includes(size)
                  ? "bg-taupe text-charcoal border-taupe"
                  : "border-taupe/30 text-taupe hover:border-taupe"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h3 className="font-heading text-cream font-bold mb-3 uppercase tracking-wide">
          Color
        </h3>
        <div className="flex flex-wrap gap-2">
          {allColors.map((color) => (
            <button
              key={color}
              onClick={() => {
                setSelectedColors((prev) =>
                  prev.includes(color)
                    ? prev.filter((c) => c !== color)
                    : [...prev, color]
                );
              }}
              className={`px-4 py-2 rounded border transition-colors text-sm ${
                selectedColors.includes(color)
                  ? "bg-taupe text-charcoal border-taupe"
                  : "border-taupe/30 text-taupe hover:border-taupe"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-heading text-cream font-bold mb-3 uppercase tracking-wide">
          Price Range
        </h3>
        <div className="px-2">
          <Slider
            min={0}
            max={100}
            step={5}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mb-4"
          />
          <div className="flex justify-between text-taupe text-sm">
            <span>₹{priceRange[0] * 100}</span>
            <span>₹{priceRange[1] * 100}</span>
          </div>
        </div>
      </div>

      {/* Reset Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategory("all");
          setSelectedSizes([]);
          setSelectedColors([]);
          setPriceRange([0, 100]);
        }}
      >
        Reset Filters
      </Button>
    </div>
  );

  // Related collections
  const relatedCollections = collections.filter((c) => c.id !== collection.id).slice(0, 2);

  return (
    <main className="min-h-screen bg-charcoal">
      {/* Hero Banner */}
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <img
          src={collection.bannerImage}
          alt={collection.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 pb-12">
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-cream mb-4 glitch uppercase">
            {collection.name}
          </h1>
          <p className="font-body text-taupe text-lg md:text-xl max-w-2xl mb-6">
            {collection.description}
          </p>
          <Button
            onClick={() => {
              document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-taupe text-charcoal hover:bg-taupe/90"
          >
            Shop This Collection
          </Button>
        </div>
      </section>

      {/* Filter & Product Grid */}
      <section id="products" className="container mx-auto px-4 py-16">
        {/* Sort & Filter Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-taupe/20">
          <p className="text-cream">
            <span className="font-bold">{filteredProducts.length}</span> Products
          </p>
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#1C1C1C] text-cream border border-taupe/30 rounded px-4 py-2 focus:outline-none focus:border-taupe"
            >
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-charcoal border-taupe/20">
                <FilterPanel />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-taupe text-lg">No products found matching your filters.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedSizes([]);
                    setSelectedColors([]);
                    setPriceRange([0, 100]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Collections */}
      {relatedCollections.length > 0 && (
        <section className="container mx-auto px-4 py-16 border-t border-taupe/20">
          <h2 className="font-heading text-3xl font-bold text-cream mb-8 uppercase tracking-wide">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedCollections.map((relatedCollection) => (
              <Link
                key={relatedCollection.id}
                to={`/collection/${relatedCollection.slug}`}
                className="group relative h-[300px] rounded-lg overflow-hidden"
              >
                <img
                  src={relatedCollection.bannerImage}
                  alt={relatedCollection.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-2xl font-bold text-cream mb-2 group-hover:text-taupe transition-colors uppercase">
                    {relatedCollection.name}
                  </h3>
                  <p className="text-taupe text-sm mb-4">{relatedCollection.description}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-taupe hover:text-cream group-hover:translate-x-1 transition-transform"
                  >
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default CollectionDetail;
