import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Truck, Shield, RotateCcw, Instagram, Sparkles, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import heroBanner from "@/assets/hero-banner.jpg";

const Home = () => {
  const featuredProducts = products.filter((p) => p.featured);
  const newArrivals = products.slice(0, 4);
  const bestSellers = products.filter((p) => p.category === "T-Shirts" || p.category === "Hoodies");

  const categories = [
    { name: "T-Shirts", image: products[0].image, count: "12+ Styles" },
    { name: "Hoodies", image: products[1].image, count: "8+ Styles" },
    { name: "Lowers", image: products[2].image, count: "10+ Styles" },
    { name: "Cordsets", image: products[0].image, count: "6+ Styles" },
  ];

  const features = [
    { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999" },
    { icon: Shield, title: "Secure Payment", desc: "100% secure transactions" },
    { icon: RotateCcw, title: "Easy Returns", desc: "7-day return policy" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBanner}
            alt="Hero Banner"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-hero font-bold text-foreground mb-6"
          >
            <span className="glitch">Wear The Code</span>
            <span className="cursor-blink"></span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8"
          >
            Minimal. Expressive. Streetwear.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/shop">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth font-heading font-semibold"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-card py-12 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="bg-primary/10 p-3 rounded-lg">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-hero font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">Explore our curated collections</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to="/shop">
                <Card className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{category.count}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <h2 className="text-4xl font-hero font-bold">New Arrivals</h2>
                </div>
                <p className="text-muted-foreground">Fresh drops from our latest collection</p>
              </motion.div>
            </div>
            <Link to="/shop">
              <Button variant="outline" className="font-heading">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="relative overflow-hidden bg-primary/5 border-primary/20">
            <CardContent className="p-12 md:p-16 text-center">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-5xl font-hero font-bold mb-4">
                <span className="glitch">Exclusive Drop Alert</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get early access to limited edition collections and exclusive codes.
                Join our community on Instagram.
              </p>
              <Button size="lg" className="font-heading">
                <Instagram className="mr-2 h-5 w-5" />
                Follow on Instagram
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-4xl font-hero font-bold">Best Sellers</h2>
            </div>
            <p className="text-muted-foreground">Most loved by our community</p>
          </motion.div>
          <Link to="/shop">
            <Button variant="outline" className="font-heading">
              Shop All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Values */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-hero font-bold mb-4">Why Choose On3</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're not just about clothing. We're about expressing your identity through minimal, expressive streetwear.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Premium Quality",
                desc: "Every piece is crafted with attention to detail using premium fabrics for lasting comfort and style.",
              },
              {
                title: "Unique Designs",
                desc: "Tech-inspired graphics and code aesthetics that set you apart from the crowd.",
              },
              {
                title: "Community Driven",
                desc: "Exclusive drops, codes, and early access for our loyal Instagram community.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-heading font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Drop Section */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-hero font-bold mb-4">
              <span className="glitch">Next Drop</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Coming Soon: Terminal Collection
            </p>
            <p className="text-muted-foreground mb-8">
              Stay tuned on Instagram for exclusive codes and early access
            </p>
            <Button variant="outline" size="lg" className="font-heading">
              Follow on Instagram
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
