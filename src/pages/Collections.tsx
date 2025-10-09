import { Link } from "react-router-dom";
import { collections } from "@/data/collections";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Collections = () => {
  return (
    <main className="min-h-screen bg-charcoal">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/50 to-charcoal z-10" />
        <div className="relative z-20 text-center px-4">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-cream mb-4 glitch">
            Collections
          </h1>
          <p className="font-body text-taupe text-lg max-w-2xl mx-auto">
            Explore our curated collections. Each drop tells a story.
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={`/collection/${collection.slug}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg bg-[#1C1C1C] border border-taupe/20 hover:border-taupe transition-all duration-300 hover:shadow-lg hover:shadow-taupe/20">
                {/* Collection Image */}
                <div className="relative h-[400px] overflow-hidden">
                  <img
                    src={collection.bannerImage}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
                  
                  {/* Badge */}
                  {collection.featured && (
                    <div className="absolute top-4 right-4 bg-taupe text-charcoal px-3 py-1 rounded-full text-xs font-bold">
                      FEATURED
                    </div>
                  )}
                </div>

                {/* Collection Info */}
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-bold text-cream mb-2 group-hover:text-taupe transition-colors uppercase tracking-wide">
                    {collection.name}
                  </h3>
                  <p className="font-body text-taupe/70 text-sm mb-4">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-cream/50">
                      {collection.productCount} Products
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-taupe hover:text-cream group-hover:translate-x-1 transition-transform"
                    >
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Collections;
