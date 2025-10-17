# Supabase Database Setup for VML E-commerce

## 🎉 Database Successfully Configured!

Your Supabase database has been fully set up with a complete e-commerce schema. Here's what has been created:

## 📊 Database Tables

### Core Tables
- **users** - User profiles (extends Supabase auth)
- **categories** - Product categories
- **collections** - Product collections/themes
- **products** - Main product catalog
- **product_images** - Product image gallery
- **product_variants** - Product variations (size, color, etc.)

### User Interaction Tables
- **addresses** - User shipping addresses
- **reviews** - Product reviews and ratings
- **wishlist** - User wishlist items
- **cart** - Shopping cart items

### Order Management
- **orders** - Order records
- **order_items** - Individual items in orders
- **transactions** - Payment transaction records

### Marketing & Content
- **discount_codes** - Promotional discount codes
- **virtual_keypad_codes** - Special keypad-based discount system
- **blogs** - Blog posts and content
- **contact_messages** - Contact form submissions
- **admin_settings** - Application configuration

## 🔐 Security Features

✅ **Row Level Security (RLS)** enabled on all tables
✅ **User-specific data policies** - Users can only access their own data
✅ **Public read access** for catalog data (products, categories, collections)
✅ **Admin-only policies** for management operations
✅ **Secure functions** with proper search_path settings

## 🚀 Getting Started

### 1. Environment Variables

Create a `.env.local` file in your project root with:


### 2. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### 3. Use the Database

Import the configured client and types:

```typescript
import { supabase } from '@/lib/supabase'
import type { Product, User, CartItem } from '@/lib/supabase'

// Example: Fetch products
const { data: products, error } = await supabase
  .from('products')
  .select(`
    *,
    category:categories(*),
    collection:collections(*),
    images:product_images(*),
    variants:product_variants(*)
  `)
  .eq('in_stock', true)

// Example: Add to cart (user must be authenticated)
const { error } = await supabase
  .from('cart')
  .insert({
    user_id: user.id,
    product_id: productId,
    quantity: 1
  })
```

## 📝 Sample Data

The database includes sample data:
- 5 categories (Electronics, Fashion, Home & Garden, Sports, Books)
- 4 collections (Tech Essentials, Summer Collection, Best Sellers, New Arrivals)
- 3 discount codes (WELCOME10, SUMMER20, NEWUSER15)
- Admin settings for homepage configuration

## 🔧 Database Functions

### `calculate_order_total(order_uuid)`
Calculates the total amount for an order based on its items.

### `handle_new_user()`
Automatically creates a user profile when someone signs up via Supabase Auth.

### `update_updated_at_column()`
Automatically updates the `updated_at` timestamp on record changes.

## 🛡️ Row Level Security Policies

### User Data Access
- Users can only view/edit their own profiles, addresses, cart, wishlist, orders
- Users can create reviews for products they've purchased
- Users can view all reviews (public)

### Public Data Access
- Anyone can view products, categories, collections, product images/variants
- Anyone can view blogs and active discount codes
- Anyone can submit contact messages

### Admin Access
- Admins can manage all products, categories, collections
- Admins can view all orders and update order status
- Admins can manage discount codes and admin settings
- Admins can view contact messages

## 📊 Performance Optimizations

✅ **Indexes** created for all foreign keys and frequently queried columns
✅ **Unique constraints** on slugs and codes
✅ **Check constraints** for data validation
✅ **Triggers** for automatic timestamp updates

## 🔄 Next Steps

1. **Set up authentication** in your frontend using Supabase Auth
2. **Create admin user** by updating a user's role to 'admin'
3. **Add products** through your admin interface
4. **Configure Razorpay** for payment processing
5. **Set up file storage** in Supabase for product images

## 📚 Useful Queries

### Get products with full details
```sql
SELECT 
  p.*,
  c.name as category_name,
  col.title as collection_title,
  array_agg(DISTINCT pi.image_url) as images,
  array_agg(DISTINCT pv.color) as colors,
  array_agg(DISTINCT pv.size) as sizes
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN collections col ON p.collection_id = col.id
LEFT JOIN product_images pi ON p.id = pi.product_id
LEFT JOIN product_variants pv ON p.id = pv.product_id
WHERE p.in_stock = true
GROUP BY p.id, c.name, col.title;
```

### Get user's cart with product details
```sql
SELECT 
  c.*,
  p.title,
  p.price,
  pi.image_url,
  pv.color,
  pv.size
FROM cart c
JOIN products p ON c.product_id = p.id
LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
LEFT JOIN product_variants pv ON c.variant_id = pv.id
WHERE c.user_id = $1;
```

Your e-commerce database is now ready for development! 🎉
