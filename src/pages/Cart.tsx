import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, Heart, ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useCartItems, useUpdateCartItemQuantity, useRemoveFromCart, useClearCart, useMoveToWishlist } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { paymentService } from "@/services/paymentService";

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: cartItems, isLoading } = useCartItems();
  const updateQuantityMutation = useUpdateCartItemQuantity();
  const removeFromCartMutation = useRemoveFromCart();
  const clearCartMutation = useClearCart();
  const moveToWishlistMutation = useMoveToWishlist();

  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-[#191919] flex items-center justify-center">
        <Card className="bg-[#212121] border-[#81715D]/30 text-[#DDCEB6] max-w-md mx-auto">
          <CardHeader className="text-center">
            <ShoppingCart className="h-16 w-16 text-[#81715D] mx-auto mb-4" />
            <CardTitle>Sign In Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-[#DDCEB6]/70">Please sign in to view your cart</p>
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

  const handleUpdateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setIsProcessing(cartItemId);
    try {
      await updateQuantityMutation.mutateAsync({ cartItemId, quantity: newQuantity });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update item quantity",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(null);
    }
  };

  const handleRemoveItem = async (cartItemId: string) => {
    setIsProcessing(cartItemId);
    try {
      await removeFromCartMutation.mutateAsync(cartItemId);
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      toast({
        title: "Remove Failed",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(null);
    }
  };

  const handleMoveToWishlist = async (cartItemId: string) => {
    setIsProcessing(cartItemId);
    try {
      await moveToWishlistMutation.mutateAsync(cartItemId);
      toast({
        title: "Moved to Wishlist",
        description: "Item has been moved to your wishlist",
      });
    } catch (error) {
      toast({
        title: "Move Failed",
        description: "Failed to move item to wishlist",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(null);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCartMutation.mutateAsync();
      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart",
      });
    } catch (error) {
      toast({
        title: "Clear Failed",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    }
  };

  const handleCheckout = async () => {
    if (!user || !cartItems || cartItems.length === 0) return;

    setIsCheckingOut(true);

    try {
      // Create Razorpay order
      const orderData = await paymentService.createOrder(total, user.id);

      // Initialize Razorpay checkout
      paymentService.initiateCheckout({
        orderId: orderData.orderId,
        amount: orderData.amount,
        userEmail: user.email || '',
        userName: user.user_metadata?.full_name || 'Customer',
        onSuccess: async (response: any) => {
          try {
            // Verify payment
            const verificationResult = await paymentService.verifyPayment(
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              user.id
            );

            if (verificationResult.success) {
              toast({
                title: "Payment Successful!",
                description: "Your order has been placed successfully.",
              });
              
              // Navigate to order confirmation or profile
              navigate('/profile');
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast({
              title: "Verification Failed",
              description: "Payment verification failed. Please contact support.",
              variant: "destructive",
            });
          } finally {
            setIsCheckingOut(false);
          }
        },
        onFailure: (error: any) => {
          console.error('Payment failed:', error);
          toast({
            title: "Payment Failed",
            description: error.error?.description || "Payment was unsuccessful. Please try again.",
            variant: "destructive",
          });
          setIsCheckingOut(false);
        },
      });
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Failed",
        description: error instanceof Error ? error.message : "Failed to initiate checkout. Please try again.",
        variant: "destructive",
      });
      setIsCheckingOut(false);
    }
  };

  const calculateSubtotal = () => {
    if (!cartItems) return 0;
    return cartItems.reduce((total, item) => {
      const price = item.product_variants?.price || item.products?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 299900 ? 0 : 4900; // Free shipping over ₹2999
  const total = subtotal + shipping;

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
            Shopping Cart
          </h1>
          <p className="text-[#DDCEB6]/70">
            {cartItems?.length || 0} {cartItems?.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        {!cartItems || cartItems.length === 0 ? (
          // Empty Cart
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <ShoppingBag className="h-24 w-24 text-[#81715D]/50 mx-auto mb-6" />
            <h2 className="text-2xl font-heading text-[#DDCEB6] mb-4">
              Your cart is empty
            </h2>
            <p className="text-[#DDCEB6]/70 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Link to="/shop">
              <Button className="bg-[#81715D] hover:bg-[#97816B] text-[#191919] font-heading">
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          // Cart with Items
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-[#212121] border-[#81715D]/30">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Product Image Placeholder */}
                        <div className="w-24 h-24 bg-[#191919] rounded-lg flex items-center justify-center">
                          <ShoppingCart className="h-8 w-8 text-[#81715D]" />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="text-lg font-heading text-[#DDCEB6] mb-2">
                            {item.products?.title || `Product ID: ${item.product_id}`}
                          </h3>
                          {item.product_variants && (
                            <p className="text-sm text-[#DDCEB6]/70 mb-2">
                              Variant: {item.product_variants.size} - {item.product_variants.color}
                            </p>
                          )}
                          <p className="text-xl font-bold text-[#81715D] mb-4">
                            ₹{((item.product_variants?.price || item.products?.price || 0) / 100).toFixed(2)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1 || isProcessing === item.id}
                                className="h-8 w-8 p-0 border-[#81715D]/30 text-[#DDCEB6]"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-12 text-center text-[#DDCEB6] font-semibold">
                                {item.quantity}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                disabled={isProcessing === item.id}
                                className="h-8 w-8 p-0 border-[#81715D]/30 text-[#DDCEB6]"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 ml-auto">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleMoveToWishlist(item.id)}
                                disabled={isProcessing === item.id}
                                className="border-[#81715D]/30 text-[#DDCEB6] hover:bg-[#81715D]/10"
                              >
                                <Heart className="h-4 w-4 mr-1" />
                                Wishlist
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRemoveItem(item.id)}
                                disabled={isProcessing === item.id}
                                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Clear Cart Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  disabled={clearCartMutation.isPending}
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <Card className="bg-[#212121] border-[#81715D]/30 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-[#DDCEB6]">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-[#DDCEB6]">
                    <span>Subtotal</span>
                    <span>₹{(subtotal / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#DDCEB6]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${(shipping / 100).toFixed(2)}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-[#DDCEB6]/60">
                      Free shipping on orders over ₹2,999
                    </p>
                  )}
                  <Separator className="bg-[#81715D]/20" />
                  <div className="flex justify-between text-lg font-bold text-[#DDCEB6]">
                    <span>Total</span>
                    <span>₹{(total / 100).toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-[#81715D] hover:bg-[#97816B] text-[#191919] font-heading mt-6"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                  </Button>

                  <div className="text-center pt-4">
                    <Link to="/shop" className="text-[#81715D] hover:text-[#DDCEB6] text-sm">
                      Continue Shopping
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
