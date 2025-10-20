import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, ArrowLeft, ChevronRight, Minus, Plus, Instagram, Share2, Copy, Star, Package2, Facebook, Twitter, Linkedin, Send, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useProduct } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { DeliveryChecker } from "@/components/DeliveryChecker";
import { OffersSection } from "@/components/OffersSection";
import { useAuth } from "@/contexts/AuthContext";
import { useAddToCart } from "@/hooks/useCart";
import { useAddToWishlist, useIsInWishlist } from "@/hooks/useWishlist";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const { data: product, isLoading, error } = useProduct(id || '');
  
  // Cart and Wishlist hooks
  const addToCartMutation = useAddToCart();
  const addToWishlistMutation = useAddToWishlist();
  const { data: isInWishlist } = useIsInWishlist(id || '');

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 animate-spin rounded-full border-b-2 border-[#81715D] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
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

  // Get available sizes and colors from variants
  const availableSizes = [...new Set(product.product_variants?.map(v => v.size).filter(Boolean) || [])];
  const availableColors = [...new Set(product.product_variants?.map(v => v.color).filter(Boolean) || [])];
  
  // Get product images
  const productImages = product.product_images || [];
  const primaryImage = productImages.find(img => img.is_primary)?.image_url || productImages[0]?.image_url || '/placeholder.jpg';
  const gallery = productImages.map(img => img.image_url);

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to cart",
        variant: "destructive",
      });
      return;
    }

    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select size and color",
        variant: "destructive",
      });
      return;
    }

    try {
      await addToCartMutation.mutateAsync({
        productId: id!,
        quantity: quantity
      });
      
      toast({
        title: "Added to cart! 🛒",
        description: `${product.title} - ${selectedSize}, ${selectedColor} (x${quantity})`,
      });
    } catch (error) {
      toast({
        title: "Failed to add to cart",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to wishlist",
        variant: "destructive",
      });
      return;
    }

    try {
      await addToWishlistMutation.mutateAsync(id!);
      
      toast({
        title: "Added to wishlist! ❤️",
        description: `${product.title} has been added to your wishlist`,
      });
    } catch (error) {
      toast({
        title: "Failed to add to wishlist",
        description: "Please try again later",
        variant: "destructive",
      });
    }
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
      description: `${product.title} - ${selectedSize}, ${selectedColor}`,
    });
  };

  const handleWhatsAppShare = async () => {
    const url = window.location.href;
    
    // Amazon-style WhatsApp message with emojis and formatting
    const whatsappMessage = 
`🔥 *${product.title}*

${product.description || product.short_description}

💰 *Price:* ₹${(product.price / 100).toFixed(2)}
📦 *Category:* ${product.categories?.name || 'Fashion'}
⭐ *Rating:* New/5

🛒 *Shop now on On3:*
${url}

#On3 #WearTheCode #Streetwear`;

    try {
      // Try to share with image using Web Share API (works on mobile)
      if (navigator.share && navigator.canShare) {
        try {
          // Fetch the product image
          const response = await fetch(primaryImage);
          const blob = await response.blob();
          const file = new File([blob], `${product.title.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`, { 
            type: blob.type || 'image/jpeg' 
          });

          const shareData = {
            title: product.title,
            text: whatsappMessage,
            files: [file]
          };

          // Check if we can share files
          if (navigator.canShare(shareData)) {
            await navigator.share(shareData);
            return;
          }
        } catch (error) {
          console.log('Image share failed, falling back to text:', error);
        }
      }

      // Fallback: Open WhatsApp with text only
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Opening WhatsApp! 💬",
        description: "Share this amazing product with your friends",
      });
    } catch (error) {
      console.error('Share failed:', error);
      // Final fallback: just copy to clipboard
      navigator.clipboard.writeText(whatsappMessage + '\n\n' + url);
      toast({
        title: "Copied to clipboard! 📋",
        description: "Paste in WhatsApp to share",
      });
    }
  };

  // Gallery is already defined above from product images

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
                  {product.categories?.name || 'Products'}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground font-price">{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-card rounded-sm overflow-hidden group">
              <img
                src={gallery[selectedImage] || primaryImage}
                alt={product.title}
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
                  <img src={img} alt={`${product.title} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2 font-price uppercase tracking-wide">{product.categories?.name || 'Product'}</p>
              <h1 className="text-4xl font-hero font-bold mb-4 text-foreground">{product.title}</h1>
              
              {/* Rating - Static for now since we don't have reviews in DB yet */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-sm">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-price font-semibold text-foreground">4.8</span>
                </div>
                <span className="text-sm text-muted-foreground font-price">
                  (132 reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-3">
                <p className="text-3xl font-price font-bold text-primary">
                  ₹{(product.price / 100).toFixed(2)}
                </p>
                {product.original_price && (
                  <p className="text-lg font-price text-muted-foreground line-through">
                    ₹{(product.original_price / 100).toFixed(2)}
                  </p>
                )}
                {product.discount_percent && (
                  <Badge variant="secondary" className="font-price">{product.discount_percent.toFixed(0)}% OFF</Badge>
                )}
              </div>
              
              <p className="text-xs text-muted-foreground font-price mb-4">Inclusive of all taxes</p>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-4">
                <Package2 className="h-5 w-5 text-green-500" />
                <span className="text-sm font-price font-semibold text-green-500">
                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed font-price">
              {product.description || product.short_description}
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="font-heading font-semibold mb-3 text-foreground">Select Size:</h3>
              <div className="flex gap-2 flex-wrap">
                {availableSizes.map((size) => (
                  <Button
                    key={size as string}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size as string)}
                    className="min-w-[60px] transition-smooth"
                  >
                    {size as string}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-heading font-semibold mb-3 text-foreground">Select Color:</h3>
              <div className="flex gap-2 flex-wrap">
                {availableColors.map((color) => (
                  <Button
                    key={color as string}
                    variant={selectedColor === color ? "default" : "outline"}
                    onClick={() => setSelectedColor(color as string)}
                    className="transition-smooth"
                  >
                    {color as string}
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
                disabled={addToCartMutation.isPending}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="transition-smooth"
                onClick={handleAddToWishlist}
                disabled={addToWishlistMutation.isPending}
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
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

            {/* WhatsApp Share Button */}
            <Button
              size="lg"
              variant="outline"
              className="w-full font-heading transition-smooth group bg-green-500/10 border-green-500/30 hover:bg-green-500/20"
              onClick={handleWhatsAppShare}
            >
              <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform text-green-500" />
              Share on WhatsApp
            </Button>

            {/* Delivery & Offers */}
            <div className="space-y-4 pt-6 border-t border-border">
              <DeliveryChecker />
              <OffersSection />
            </div>

            {/* Key Features - Hidden until data structure updated */}

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
                  <p className="mb-2">• Easy 7-day returns</p>
                  <p className="mb-2">• Product must be unused, unwashed, and in original condition with tags intact</p>
                  <p className="mb-2">• Free exchange available</p>
                  <p>• Full refund (excluding delivery charges) if not satisfied</p>
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
                {product.description || product.short_description}
              </p>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {/* Rating Summary */}
                <div className="flex items-start gap-8 pb-6 border-b border-border">
                  <div className="text-center">
                    <div className="text-5xl font-price font-bold text-foreground mb-2">
                      4.8
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground font-price">
                      132 Reviews
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
                  <p><strong className="text-foreground">SKU:</strong> ON3-{product.id.slice(-8)}</p>
                  <p><strong className="text-foreground">Category:</strong> {product.categories?.name || 'Fashion'}</p>
                  {product.collections && <p><strong className="text-foreground">Collection:</strong> {product.collections.title}</p>}
                  <p><strong className="text-foreground">Weight:</strong> 220 GSM</p>
                  <p><strong className="text-foreground">Country of Origin:</strong> India</p>
                </div>
                <div className="space-y-3 text-muted-foreground font-price">
                  <p><strong className="text-foreground">Material:</strong> Premium Cotton Blend</p>
                  <p><strong className="text-foreground">Wash Care:</strong> Machine wash cold</p>
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
                    Yes! We offer free exchanges within 7 days of delivery. The product must be unused, unwashed, and in original condition with tags intact.
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

        {/* Related Products - TODO: Implement with database */}
        {/* Will be implemented later with proper database queries */}
      </div>
    </div>
  );
};

export default ProductDetail;
