import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Truck, Shield, RotateCcw, Instagram, Sparkles, Zap, TrendingUp, Code2, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import heroBanner from "@/assets/hero-banner.jpg";
import aboutBanner from "@/assets/about-banner.jpg";
import insta1 from "@/assets/insta-1.jpg";
import insta2 from "@/assets/insta-2.jpg";
import insta3 from "@/assets/insta-3.jpg";
import insta4 from "@/assets/insta-4.jpg";
import insta5 from "@/assets/insta-5.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Home = () => {
  const [displayText, setDisplayText] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 12,
    minutes: 30,
    seconds: 0
  });
  const [email, setEmail] = useState("");

  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const heroSlides = [
    {
      image: heroBanner,
      title: "NEW SEASON",
      subtitle: "Fall/Winter 2025",
      description: "Explore the latest streetwear collection",
      cta: "Shop Collection",
      link: "/shop"
    },
    {
      image: aboutBanner,
      title: "EXCLUSIVE DROP",
      subtitle: "Limited Edition",
      description: "Premium pieces for the bold",
      cta: "View Collection",
      link: "/collections/limited-edition"
    },
    {
      image: insta1,
      title: "TECH WEAR",
      subtitle: "Code & Style",
      description: "Minimal streetwear meets tech culture",
      cta: "Explore Tech Drop",
      link: "/collections/tech-drop"
    }
  ];

  const featuredProducts = products.filter((p) => p.featured);
  const newArrivals = products.slice(0, 4);

  // Typing animation effect
  useEffect(() => {
    const text = "wear_the_code();";
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.substring(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);
    return () => clearInterval(timer);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999" },
    { icon: Shield, title: "Secure Payment", desc: "100% secure transactions" },
    { icon: RotateCcw, title: "Easy Returns", desc: "7-day return policy" },
  ];

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <Carousel
          plugins={[autoplayPlugin.current]}
          className="w-full h-full"
          onMouseEnter={() => autoplayPlugin.current.stop()}
          onMouseLeave={() => autoplayPlugin.current.play()}
        >
          <CarouselContent className="h-screen">
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index} className="relative h-screen">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/30"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-2xl">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-4"
                      >
                        <span className="text-primary font-price text-sm md:text-base tracking-widest uppercase">
                          {slide.subtitle}
                        </span>
                      </motion.div>

                      <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-2xl md:text-4xl lg:text-5xl font-hero font-bold text-foreground mb-6 leading-tight"
                      >
                        {slide.title}
                      </motion.h1>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-foreground/80 mb-8 font-price"
                      >
                        {slide.description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <Link to={slide.link}>
                          <Button
                            size="lg"
                            className="bg-foreground text-background hover:bg-foreground/90 font-heading px-8 h-14 text-base group"
                          >
                            {slide.cta}
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Custom Navigation */}
          <div className="absolute bottom-8 right-8 flex gap-2 z-20">
            <CarouselPrevious className="static translate-y-0 bg-foreground/10 backdrop-blur-sm border-foreground/20 hover:bg-foreground/20 text-foreground" />
            <CarouselNext className="static translate-y-0 bg-foreground/10 backdrop-blur-sm border-foreground/20 hover:bg-foreground/20 text-foreground" />
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {heroSlides.map((_, index) => (
              <div
                key={index}
                className="h-1 w-8 bg-foreground/30 rounded-full overflow-hidden"
              >
                <div className="h-full bg-foreground w-0 animate-progress"></div>
              </div>
            ))}
          </div>
        </Carousel>
      </section>

      {/* Features */}
      <section className="bg-[#1C1C1C] py-12 border-y border-[#81715D]/20">
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
                <div className="bg-[#81715D]/10 p-3 rounded-lg">
                  <feature.icon className="h-6 w-6 text-[#81715D]" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-[#DDCEB6]">{feature.title}</h3>
                  <p className="text-sm text-[#DDCEB6]/60">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-[#81715D]" />
              <h2 className="text-4xl md:text-5xl font-hero font-bold text-[#DDCEB6]">Featured Collection</h2>
            </div>
            <p className="text-[#DDCEB6]/60 mt-2">Top picks from our latest drops</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/shop">
            <Button
              variant="outline"
              size="lg"
              className="border-[#81715D] text-[#DDCEB6] hover:bg-[#81715D]/10 font-heading"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Next Drop / Countdown */}
      <section className="bg-gradient-to-br from-[#1C1C1C] to-[#191919] py-20 border-y border-[#81715D]/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-hero font-bold mb-4 text-[#DDCEB6]">
              Next Drop Incoming<span className="cursor-blink"></span>
            </h2>
            <p className="text-xl text-[#DDCEB6]/70 mb-8">
              Terminal Collection · Limited Edition
            </p>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#191919] border border-[#81715D]/30 rounded-lg p-6"
                >
                  <div className="text-4xl md:text-5xl font-hero font-bold text-[#81715D] mb-2">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-sm text-[#DDCEB6]/60 font-heading uppercase tracking-wider">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-[#81715D] text-[#191919] hover:bg-[#DDCEB6] font-heading font-semibold px-8 py-6"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get Notified
            </Button>

            <p className="text-sm text-[#DDCEB6]/50 mt-6 font-mono">
              // Limited to 100 pieces only
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={heroBanner}
              alt="Brand Story"
              className="rounded-lg shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-hero font-bold text-[#DDCEB6] mb-6">
              Our Philosophy
            </h2>
            <p className="text-lg text-[#DDCEB6]/70 mb-6 leading-relaxed">
              At On3, every piece is designed to express individuality. We merge tech-inspired simplicity with bold streetwear silhouettes.
            </p>
            <p className="text-lg text-[#DDCEB6]/70 mb-8 leading-relaxed">
              From minimalist graphics to code aesthetics, we create clothing that speaks the language of the modern creator.
            </p>
            <Link to="/about">
              <Button
                variant="outline"
                size="lg"
                className="border-[#81715D] text-[#DDCEB6] hover:bg-[#81715D]/10 font-heading"
              >
                Read Our Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Virtual Keypad Teaser */}
      <section className="bg-gradient-to-br from-[#191919] via-[#1C1C1C] to-[#191919] py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-[#81715D]/10 to-[#191919] border-[#81715D]/30 max-w-4xl mx-auto">
              <CardContent className="p-12 md:p-16 text-center">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Lock className="h-16 w-16 text-[#81715D] mx-auto mb-6" />
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl font-hero font-bold mb-4 text-[#DDCEB6]">
                  Unlock The Code<span className="cursor-blink"></span>
                </h2>
                <p className="text-lg text-[#DDCEB6]/70 mb-6 max-w-2xl mx-auto">
                  Enter exclusive symbols and unlock special discounts. Hidden codes are shared only with our Instagram community.
                </p>
                <Link to="/keypad">
                  <Button
                    size="lg"
                    className="bg-[#81715D] text-[#191919] hover:bg-[#DDCEB6] font-heading font-semibold px-8 py-6"
                  >
                    <Code2 className="mr-2 h-5 w-5" />
                    Try the Keypad
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Instagram / Social Proof */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-hero font-bold text-[#DDCEB6] mb-4">
              Join The Community
            </h2>
            <p className="text-[#DDCEB6]/60">Follow us for exclusive drops, codes, and behind-the-scenes</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          {[insta1, insta2, insta3, insta4, insta5].map((img, i) => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden bg-[#1C1C1C] group cursor-pointer">
              <img
                src={img}
                alt={`Instagram post ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white hover:opacity-90 font-heading font-semibold px-8 py-6"
          >
            <Instagram className="mr-2 h-5 w-5" />
            Follow @On3Official
          </Button>
        </motion.div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-[#1C1C1C] py-20 border-y border-[#81715D]/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <Mail className="h-12 w-12 text-[#81715D] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-hero font-bold text-[#DDCEB6] mb-4">
              Join the Code
            </h2>
            <p className="text-[#DDCEB6]/70 mb-8">
              Be the first to know when we drop. Exclusive access, early releases, and special codes.
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-[#191919] border-[#81715D]/30 text-[#DDCEB6] placeholder:text-[#DDCEB6]/40 focus:border-[#81715D]"
              />
              <Button
                type="submit"
                className="bg-[#81715D] text-[#191919] hover:bg-[#DDCEB6] font-heading font-semibold"
              >
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-6 w-6 text-[#81715D]" />
              <h2 className="text-4xl font-hero font-bold text-[#DDCEB6]">New Arrivals</h2>
            </div>
            <p className="text-[#DDCEB6]/60">Fresh drops from our latest collection</p>
          </motion.div>
          <Link to="/shop">
            <Button variant="outline" className="border-[#81715D] text-[#DDCEB6] hover:bg-[#81715D]/10 font-heading">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
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
      </section>

    </div>
  );
};

export default Home;
