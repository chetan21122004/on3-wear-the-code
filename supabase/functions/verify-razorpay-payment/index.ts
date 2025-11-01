import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createHmac } from 'https://deno.land/std@0.168.0/node/crypto.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId) {
      throw new Error('Missing required parameters');
    }

    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!razorpayKeySecret) {
      throw new Error('Razorpay secret not configured');
    }

    // Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const hmac = createHmac('sha256', razorpayKeySecret);
    hmac.update(text);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature !== razorpay_signature) {
      throw new Error('Invalid payment signature');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Update order status
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .update({
        status: 'paid',
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
        updated_at: new Date().toISOString(),
      })
      .eq('razorpay_order_id', razorpay_order_id)
      .eq('user_id', userId)
      .select()
      .single();

    if (orderError) {
      console.error('Database error:', orderError);
      throw new Error('Failed to update order status');
    }

    // Clear user's cart after successful payment
    const { error: cartError } = await supabase
      .from('cart')
      .delete()
      .eq('user_id', userId);

    if (cartError) {
      console.error('Error clearing cart:', cartError);
      // Don't throw error here, payment was successful
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderId: order.id,
        message: 'Payment verified successfully',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message, success: false }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
