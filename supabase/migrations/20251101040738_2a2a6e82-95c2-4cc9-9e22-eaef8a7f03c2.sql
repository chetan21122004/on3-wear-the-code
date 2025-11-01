-- Add razorpay_signature column to orders table if it doesn't exist
ALTER TABLE orders ADD COLUMN IF NOT EXISTS razorpay_signature text;