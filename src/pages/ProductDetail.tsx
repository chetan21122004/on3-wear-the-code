import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, ArrowLeft, ChevronRight, Minus, Plus, Instagram, Share2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { products } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { ProductCard } from "@/components/ProductCard";

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
              <p className="text-sm text-muted-foreground mb-2 font-price">{product.category}</p>
              <h1 className="text-4xl font-hero font-bold mb-4 text-foreground">{product.name}</h1>
              <p className="text-3xl font-price font-bold text-primary mb-2">
                ₹{(product.price / 100).toFixed(2)}
              </p>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary">
                        {i < Math.floor(product.rating!) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <span className="text-muted-foreground font-price">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              )}
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
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <p className="text-muted-foreground leading-relaxed font-price">
                {product.fullDescription || product.description}
              </p>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                <p className="text-muted-foreground font-price">
                  Customer reviews coming soon. Be the first to review this product!
                </p>
                <Button variant="outline" className="font-heading">Write a Review</Button>
              </div>
            </TabsContent>
            <TabsContent value="additional" className="mt-6">
              <div className="space-y-3 text-muted-foreground font-price">
                {product.material && <p><strong className="text-foreground">Material:</strong> {product.material}</p>}
                {product.washCare && <p><strong className="text-foreground">Wash Care:</strong> {product.washCare}</p>}
                <p><strong className="text-foreground">SKU:</strong> ON3-{product.id}</p>
                <p><strong className="text-foreground">Category:</strong> {product.category}</p>
                {product.collection && <p><strong className="text-foreground">Collection:</strong> {product.collection}</p>}
              </div>
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
