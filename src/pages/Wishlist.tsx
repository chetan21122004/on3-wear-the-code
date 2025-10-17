import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2, ArrowLeft, HeartOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlistItems, useRemoveFromWishlist, useClearWishlist } from "@/hooks/useWishlist";
import { useAddToCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

const Wishlist = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: wishlistItems, isLoading } = useWishlistItems();
  const removeFromWishlistMutation = useRemoveFromWishlist();
  const clearWishlistMutation = useClearWishlist();
  const addToCartMutation = useAddToCart();

  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-[#191919] flex items-center justify-center">
        <Card className="bg-[#212121] border-[#81715D]/30 text-[#DDCEB6] max-w-md mx-auto">
          <CardHeader className="text-center">
            <Heart className="h-16 w-16 text-[#81715D] mx-auto mb-4" />
            <CardTitle>Sign In Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-[#DDCEB6]/70">Please sign in to view your wishlist</p>
            <div className="flex gap-4">
              <Link to="/login" className="flex-1">
                <Button className="w-full bg-[#81715D] hover:bg-[#97816B] text-[#191919]">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" className="flex-1">
                <Button variant="outline" className="w-full border-[#81715D]/30 text-[#DDCEB6]">
                  Sign Up
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleRemoveFromWishlist = async (productId: string) => {
    setIsProcessing(productId);
    try {
      await removeFromWishlistMutation.mutateAsync(productId);
      toast({
        title: "Removed from Wishlist",
        description: "Item has been removed from your wishlist",
      });
    } catch (error) {
      toast({
        title: "Remove Failed",
        description: "Failed to remove item from wishlist",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(null);
    }
  };

  const handleAddToCart = async (productId: string) => {
    setIsProcessing(productId);
    try {
      await addToCartMutation.mutateAsync({ 
        productId, 
        quantity: 1 
      });
      toast({
        title: "Added to Cart",
        description: "Item has been added to your cart",
      });
    } catch (error) {
      toast({
        title: "Add to Cart Failed",
        description: "Failed to add item to cart. Product may not exist in database.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(null);
    }
  };

  const handleMoveToCart = async (productId: string) => {
    setIsProcessing(productId);
    try {
      // Add to cart first
      await addToCartMutation.mutateAsync({ 
        productId, 
        quantity: 1 
      });
      
      // Then remove from wishlist
      await removeFromWishlistMutation.mutateAsync(productId);
      
      toast({
        title: "Moved to Cart",
        description: "Item has been moved to your cart",
      });
    } catch (error) {
      toast({
        title: "Move Failed",
        description: "Failed to move item to cart",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(null);
    }
  };

  const handleClearWishlist = async () => {
    try {
      await clearWishlistMutation.mutateAsync();
      toast({
        title: "Wishlist Cleared",
        description: "All items have been removed from your wishlist",
      });
    } catch (error) {
      toast({
        title: "Clear Failed",
        description: "Failed to clear wishlist",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#191919] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#81715D]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#191919] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/shop"
            className="inline-flex items-center text-[#81715D] hover:text-[#DDCEB6] transition-colors mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
          <h1 className="text-4xl font-heading text-[#DDCEB6] mb-2">
            My Wishlist
          </h1>
          <p className="text-[#DDCEB6]/70">
            {wishlistItems?.length || 0} {wishlistItems?.length === 1 ? 'item' : 'items'} in your wishlist
          </p>
        </motion.div>

        {!wishlistItems || wishlistItems.length === 0 ? (
          // Empty Wishlist
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <HeartOff className="h-24 w-24 text-[#81715D]/50 mx-auto mb-6" />
            <h2 className="text-2xl font-heading text-[#DDCEB6] mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-[#DDCEB6]/70 mb-8 max-w-md mx-auto">
              Save items you love to your wishlist. They'll be waiting for you here when you're ready to purchase.
            </p>
            <Link to="/shop">
              <Button className="bg-[#81715D] hover:bg-[#97816B] text-[#191919] font-heading">
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          // Wishlist with Items
          <div className="space-y-6">
            {/* Action Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-between items-center"
            >
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={handleClearWishlist}
                  disabled={clearWishlistMutation.isPending}
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Wishlist
                </Button>
              </div>
              <Link to="/cart">
                <Button variant="outline" className="border-[#81715D]/30 text-[#DDCEB6]">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Cart
                </Button>
              </Link>
            </motion.div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-[#212121] border-[#81715D]/30 hover:border-[#81715D]/50 transition-colors">
                    <CardContent className="p-6">
                      {/* Product Image Placeholder */}
                      <div className="w-full h-48 bg-[#191919] rounded-lg flex items-center justify-center mb-4">
                        <Heart className="h-12 w-12 text-[#81715D]" />
                      </div>

                      {/* Product Details */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-heading text-[#DDCEB6]">
                          {item.products?.title || `Product ID: ${item.product_id}`}
                        </h3>
                        
                        {item.products && (
                          <>
                            <p className="text-sm text-[#DDCEB6]/70">
                              {item.products.description || 'No description available'}
                            </p>
                            <p className="text-xl font-bold text-[#81715D]">
                              ₹{(item.products.price / 100).toFixed(2)}
                            </p>
                          </>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-4">
                          <Button
                            onClick={() => handleMoveToCart(item.product_id)}
                            disabled={isProcessing === item.product_id}
                            className="flex-1 bg-[#81715D] hover:bg-[#97816B] text-[#191919] font-heading"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {isProcessing === item.product_id ? 'Moving...' : 'Move to Cart'}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleRemoveFromWishlist(item.product_id)}
                            disabled={isProcessing === item.product_id}
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Alternative: Just Add to Cart (keep in wishlist) */}
                        <Button
                          variant="outline"
                          onClick={() => handleAddToCart(item.product_id)}
                          disabled={isProcessing === item.product_id}
                          className="w-full border-[#81715D]/30 text-[#DDCEB6] hover:bg-[#81715D]/10"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Continue Shopping */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center pt-8"
            >
              <Link to="/shop">
                <Button variant="outline" className="border-[#81715D]/30 text-[#DDCEB6]">
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
