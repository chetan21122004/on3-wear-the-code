import { supabase } from '@/lib/supabase';

export interface RazorpayOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
}

export interface PaymentVerificationData {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const paymentService = {
  // Create Razorpay order via edge function
  async createOrder(amount: number, userId: string): Promise<RazorpayOrderResponse> {
    const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
      body: { amount, userId }
    });

    if (error) {
      console.error('Error creating Razorpay order:', error);
      throw new Error(error.message || 'Failed to create payment order');
    }

    return data;
  },

  // Verify payment via edge function
  async verifyPayment(verificationData: PaymentVerificationData, userId: string): Promise<{ success: boolean; orderId?: string }> {
    const { data, error } = await supabase.functions.invoke('verify-razorpay-payment', {
      body: { ...verificationData, userId }
    });

    if (error) {
      console.error('Error verifying payment:', error);
      throw new Error(error.message || 'Payment verification failed');
    }

    return data;
  },

  // Initialize Razorpay checkout
  initiateCheckout(
    options: {
      orderId: string;
      amount: number;
      userEmail: string;
      userName: string;
      onSuccess: (response: any) => void;
      onFailure: (error: any) => void;
    }
  ) {
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!razorpayKey) {
      throw new Error('Razorpay key not configured');
    }

    const razorpayOptions = {
      key: razorpayKey,
      amount: options.amount,
      currency: 'INR',
      name: 'ON3 Streetwear',
      description: 'Order Payment',
      order_id: options.orderId,
      prefill: {
        email: options.userEmail,
        name: options.userName,
      },
      theme: {
        color: '#81715D',
      },
      handler: options.onSuccess,
      modal: {
        ondismiss: () => {
          options.onFailure({ error: 'Payment cancelled by user' });
        },
      },
    };

    const razorpayInstance = new window.Razorpay(razorpayOptions);
    
    razorpayInstance.on('payment.failed', (response: any) => {
      options.onFailure(response);
    });

    razorpayInstance.open();
  },
};
