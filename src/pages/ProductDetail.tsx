import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, ArrowLeft, ChevronRight, Minus, Plus, Instagram, Share2, Copy, Star, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { ProductCard } from "@/components/ProductCard";
import { DeliveryChecker } from "@/components/DeliveryChecker";
import { OffersSection } from "@/components/OffersSection";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button variant="outline">Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select size and color",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Added to cart! 🛒",
      description: `${product.name} - ${selectedSize}, ${selectedColor} (x${quantity})`,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select size and color",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Proceeding to checkout...",
      description: `${product.name} - ${selectedSize}, ${selectedColor}`,
    });
  };

  const handleShare = (platform: string) => {
    if (platform === "copy") {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Product link copied to clipboard",
      });
    } else {
      toast({
        title: `Share on ${platform}`,
        description: "Opening share dialog...",
      });
    }
  };

  const gallery = product.gallery || [product.image, product.secondaryImage || product.image];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-smooth font-price">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-smooth font-price">
                  Shop
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-smooth font-price">
                  {product.category}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground font-price">{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-card rounded-sm overflow-hidden group">
              <img
                src={gallery[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square bg-card rounded-sm overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? "border-primary" : "border-transparent hover:border-muted"
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2 font-price uppercase tracking-wide">{product.category}</p>
              <h1 className="text-4xl font-hero font-bold mb-4 text-foreground">{product.name}</h1>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-sm">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-price font-semibold text-foreground">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground font-price">
                    ({product.reviews} reviews)
                  </span>
                </div>
              )}

              <div className="flex items-baseline gap-3 mb-3">
                <p className="text-3xl font-price font-bold text-primary">
                  ₹{(product.price / 100).toFixed(2)}
                </p>
                <p className="text-lg font-price text-muted-foreground line-through">
                  ₹{((product.price * 1.3) / 100).toFixed(2)}
                </p>
                <Badge variant="secondary" className="font-price">23% OFF</Badge>
              </div>
              
              <p className="text-xs text-muted-foreground font-price mb-4">Inclusive of all taxes</p>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-4">
                <Package2 className="h-5 w-5 text-green-500" />
                <span className="text-sm font-price font-semibold text-green-500">In Stock</span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed font-price">
              {product.fullDescription || product.description}
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="font-heading font-semibold mb-3 text-foreground">Select Size:</h3>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="min-w-[60px] transition-smooth"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-heading font-semibold mb-3 text-foreground">Select Color:</h3>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    onClick={() => setSelectedColor(color)}
                    className="transition-smooth"
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="font-heading font-semibold mb-3 text-foreground">Quantity:</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="transition-smooth"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-price font-semibold text-foreground">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="transition-smooth"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-heading transition-smooth"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="transition-smooth">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <Button
              size="lg"
              variant="secondary"
              className="w-full font-heading transition-smooth"
              onClick={handleBuyNow}
            >
              ⚡ Buy Now
            </Button>

            {/* Delivery & Offers */}
            <div className="space-y-4 pt-6 border-t border-border">
              <DeliveryChecker />
              <OffersSection />
            </div>

            {/* Key Features */}
            {product.features && (
              <div className="border-t border-border pt-6">
                <h3 className="font-heading font-semibold mb-3 text-foreground">Key Features:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground font-price">
                  {product.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Collapsible Sections */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="shipping">
                <AccordionTrigger className="font-heading text-foreground">Shipping & Delivery</AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-price">
                  <p className="mb-2">• Free shipping on orders above ₹2999</p>
                  <p className="mb-2">• Delivery within 5-7 business days</p>
                  <p>• Track your order in real-time</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="returns">
                <AccordionTrigger className="font-heading text-foreground">Return & Exchange Policy</AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-price">
                  <p className="mb-2">• Easy 15-day returns</p>
                  <p className="mb-2">• Free exchange available</p>
                  <p>• Full refund if not satisfied</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="size-guide">
                <AccordionTrigger className="font-heading text-foreground">Size Guide</AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-price">
                  <p className="mb-2">S: Chest 36-38", Length 27"</p>
                  <p className="mb-2">M: Chest 38-40", Length 28"</p>
                  <p className="mb-2">L: Chest 40-42", Length 29"</p>
                  <p className="mb-2">XL: Chest 42-44", Length 30"</p>
                  <p>XXL: Chest 44-46", Length 31"</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Social Sharing */}
            <div className="border-t border-border pt-6">
              <h3 className="font-heading font-semibold mb-3 text-foreground">Share:</h3>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare("Instagram")}
                  className="transition-smooth hover:bg-primary/10"
                >
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare("WhatsApp")}
                  className="transition-smooth hover:bg-primary/10"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare("copy")}
                  className="transition-smooth hover:bg-primary/10"
                >
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16 bg-card p-8 rounded-sm">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b border-border bg-transparent rounded-none h-auto p-0">
              <TabsTrigger 
                value="description" 
                className="font-heading data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="font-heading data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Reviews
              </TabsTrigger>
              <TabsTrigger 
                value="additional" 
                className="font-heading data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Additional Info
              </TabsTrigger>
              <TabsTrigger 
                value="faq" 
                className="font-heading data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                FAQ
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <p className="text-muted-foreground leading-relaxed font-price">
                {product.fullDescription || product.description}
              </p>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {/* Rating Summary */}
                <div className="flex items-start gap-8 pb-6 border-b border-border">
                  <div className="text-center">
                    <div className="text-5xl font-price font-bold text-foreground mb-2">
                      {product.rating || "4.8"}
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground font-price">
                      {product.reviews || 132} Reviews
                    </p>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-sm font-price text-muted-foreground w-8">{star} ★</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary"
                            style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : 10}%` }}
                          />
                        </div>
                        <span className="text-sm font-price text-muted-foreground w-12">
                          {star === 5 ? "70%" : star === 4 ? "20%" : "10%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  <div className="border-b border-border pb-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-heading font-semibold text-foreground">Rahul K.</p>
                        <div className="flex gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground font-price">2 weeks ago</p>
                    </div>
                    <p className="text-muted-foreground font-price leading-relaxed">
                      Amazing quality! The fabric is super soft and the fit is perfect. Definitely worth the price.
                    </p>
                  </div>

                  <div className="border-b border-border pb-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-heading font-semibold text-foreground">Priya M.</p>
                        <div className="flex gap-1 mt-1">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                          <Star className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground font-price">1 month ago</p>
                    </div>
                    <p className="text-muted-foreground font-price leading-relaxed">
                      Love the design! Slightly oversized which I like. Fast delivery too.
                    </p>
                  </div>
                </div>

                <Button variant="outline" className="font-heading">Write a Review</Button>
              </div>
            </TabsContent>
            <TabsContent value="additional" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3 text-muted-foreground font-price">
                  <p><strong className="text-foreground">SKU:</strong> ON3-{product.id}</p>
                  <p><strong className="text-foreground">Category:</strong> {product.category}</p>
                  {product.collection && <p><strong className="text-foreground">Collection:</strong> {product.collection}</p>}
                  <p><strong className="text-foreground">Weight:</strong> 220 GSM</p>
                  <p><strong className="text-foreground">Country of Origin:</strong> India</p>
                </div>
                <div className="space-y-3 text-muted-foreground font-price">
                  {product.material && <p><strong className="text-foreground">Material:</strong> {product.material}</p>}
                  {product.washCare && <p><strong className="text-foreground">Wash Care:</strong> {product.washCare}</p>}
                  <p><strong className="text-foreground">Fit:</strong> Oversized / Relaxed</p>
                  <p><strong className="text-foreground">Occasion:</strong> Casual / Streetwear</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="faq" className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger className="font-heading text-foreground">How is the fit?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-price">
                    Our products have an oversized fit. If you prefer a regular fit, we recommend going one size down.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-2">
                  <AccordionTrigger className="font-heading text-foreground">What is the material quality?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-price">
                    We use 100% premium cotton with 220 GSM weight, ensuring durability and comfort. All fabrics are pre-shrunk.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-3">
                  <AccordionTrigger className="font-heading text-foreground">Do you offer exchanges?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-price">
                    Yes! We offer free exchanges within 15 days of delivery. The product must be unused with tags intact.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-4">
                  <AccordionTrigger className="font-heading text-foreground">How long does delivery take?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-price">
                    Standard delivery takes 5-7 business days. We also offer express delivery in select cities (2-3 days).
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-hero font-bold mb-8 text-foreground">
              You May Also Like<span className="cursor-blink"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
