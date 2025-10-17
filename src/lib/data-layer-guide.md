# VML E-commerce Data Layer Guide

## 🎯 Overview

This guide explains how to use the comprehensive data layer built for your VML e-commerce application. The data layer provides a clean, type-safe interface to interact with your Supabase database.

## 📁 File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx          # Authentication context and hooks
├── services/
│   ├── productService.ts        # Product-related database operations
│   ├── categoryService.ts       # Category management
│   ├── cartService.ts          # Shopping cart operations
│   ├── orderService.ts         # Order management
│   ├── wishlistService.ts      # Wishlist operations
│   ├── addressService.ts       # Address management
│   └── reviewService.ts        # Product reviews
├── hooks/
│   ├── useProducts.ts          # Product data hooks
│   ├── useCart.ts             # Cart management hooks
│   ├── useOrders.ts           # Order management hooks
│   └── useWishlist.ts         # Wishlist hooks
└── lib/
    ├── supabase.ts            # Supabase client configuration
    ├── database.types.ts      # Generated TypeScript types
    └── index.ts              # Main exports
```

## 🚀 Quick Start

### 1. Authentication

```tsx
import { useAuth } from '@/contexts/AuthContext'

function LoginComponent() {
  const { signIn, signUp, user, loading } = useAuth()

  const handleLogin = async (email: string, password: string) => {
    const { error } = await signIn(email, password)
    if (error) {
      console.error('Login failed:', error.message)
    }
  }

  if (loading) return <div>Loading...</div>
  if (user) return <div>Welcome, {user.email}!</div>

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      handleLogin(
        formData.get('email') as string,
        formData.get('password') as string
      )
    }}>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
  )
}
```

### 2. Fetching Products

```tsx
import { useProducts, useFeaturedProducts } from '@/hooks/useProducts'

function ProductList() {
  // Get all products with filters
  const { data: products, isLoading, error } = useProducts({
    category_id: 'some-category-id',
    in_stock: true,
    featured: true
  })

  // Get featured products
  const { data: featuredProducts } = useFeaturedProducts(8)

  if (isLoading) return <div>Loading products...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### 3. Cart Management

```tsx
import { useCartItems, useAddToCart, useCartSummary } from '@/hooks/useCart'

function CartComponent() {
  const { data: cartItems } = useCartItems()
  const { data: cartSummary } = useCartSummary()
  const addToCartMutation = useAddToCart()

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCartMutation.mutateAsync({ productId, quantity: 1 })
      // Success feedback
    } catch (error) {
      // Error handling
    }
  }

  return (
    <div>
      <h2>Cart ({cartSummary?.total_items || 0} items)</h2>
      <p>Total: ₹{cartSummary?.total_amount || 0}</p>
      
      {cartItems?.map(item => (
        <div key={item.id}>
          <h3>{item.product?.title}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ₹{item.total_price}</p>
        </div>
      ))}
    </div>
  )
}
```

### 4. Order Management

```tsx
import { useUserOrders, useCreateOrder } from '@/hooks/useOrders'

function OrderHistory() {
  const { data: orders, isLoading } = useUserOrders()
  const createOrderMutation = useCreateOrder()

  const handleCreateOrder = async (orderData: CreateOrderData) => {
    try {
      const order = await createOrderMutation.mutateAsync(orderData)
      // Redirect to payment or success page
    } catch (error) {
      // Handle error
    }
  }

  return (
    <div>
      <h2>Order History</h2>
      {orders?.map(order => (
        <div key={order.id}>
          <h3>Order #{order.id}</h3>
          <p>Status: {order.status}</p>
          <p>Total: ₹{order.total_amount}</p>
          <p>Items: {order.item_count}</p>
        </div>
      ))}
    </div>
  )
}
```

## 🛠️ Available Hooks

### Product Hooks

```tsx
// Get products with filtering and sorting
useProducts(filters?, sortOptions?, limit?, offset?)

// Get single product by ID
useProduct(productId)

// Get product by slug
useProductBySlug(slug)

// Get featured products
useFeaturedProducts(limit?)

// Get related products
useRelatedProducts(productId, categoryId?, limit?)

// Search products
useSearchProducts(searchTerm, limit?)

// Admin: Get product statistics
useProductStats()
```

### Cart Hooks

```tsx
// Get user's cart items
useCartItems()

// Get cart summary with totals
useCartSummary()

// Get cart item count
useCartItemCount()

// Add item to cart
useAddToCart()

// Update cart item quantity
useUpdateCartItemQuantity()

// Remove item from cart
useRemoveFromCart()

// Clear entire cart
useClearCart()
```

### Wishlist Hooks

```tsx
// Get wishlist items
useWishlistItems()

// Get wishlist item count
useWishlistItemCount()

// Check if item is in wishlist
useIsInWishlist(productId)

// Add to wishlist
useAddToWishlist()

// Remove from wishlist
useRemoveFromWishlist()

// Toggle wishlist (add/remove)
useToggleWishlist()
```

### Order Hooks

```tsx
// Get user's orders
useUserOrders(limit?)

// Get single order
useOrder(orderId)

// Create new order
useCreateOrder()

// Update order status
useUpdateOrderStatus()

// Cancel order
useCancelOrder()

// Admin: Get order statistics
useOrderStats()

// Admin: Get all orders
useAllOrders(status?, limit?, offset?)
```

## 🔧 Service Functions

If you need direct access to the database operations without React Query caching:

```tsx
import { productService, cartService } from '@/lib'

// Direct service calls
const products = await productService.getProducts({ featured: true })
const cartItems = await cartService.getCartItems(userId)
```

## 📝 TypeScript Types

All database types are automatically generated and available:

```tsx
import type { 
  Product, 
  CartItem, 
  Order, 
  User,
  ProductWithDetails,
  CartItemWithDetails 
} from '@/lib'

// Use types in your components
interface ProductCardProps {
  product: ProductWithDetails
}
```

## 🎨 Example Components

### Product Card with Full Functionality

```tsx
import { ProductCard } from '@/components/ProductCard'

function ProductGrid() {
  const { data: products } = useProducts()
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### Search with Filters

```tsx
function ProductSearch() {
  const [filters, setFilters] = useState<ProductFilters>({})
  const { data: products } = useProducts(filters)

  return (
    <div>
      <input 
        placeholder="Search products..."
        onChange={(e) => setFilters(prev => ({ 
          ...prev, 
          search: e.target.value 
        }))}
      />
      <select 
        onChange={(e) => setFilters(prev => ({ 
          ...prev, 
          category_id: e.target.value 
        }))}
      >
        <option value="">All Categories</option>
        {/* Category options */}
      </select>
      
      {/* Product results */}
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

## 🔐 Authentication Flow

```tsx
function App() {
  const { user, loading } = useAuth()

  if (loading) return <LoadingSpinner />

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route 
          path="/cart" 
          element={user ? <CartPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/orders" 
          element={user ? <OrdersPage /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  )
}
```

## 🚀 Performance Tips

1. **Use React Query's built-in caching** - Data is automatically cached and revalidated
2. **Optimize with staleTime** - Adjust stale time based on data freshness needs
3. **Use prefetching** for better UX:

```tsx
const queryClient = useQueryClient()

// Prefetch product details on hover
const handleMouseEnter = (productId: string) => {
  queryClient.prefetchQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => productService.getProductById(productId)
  })
}
```

## 🐛 Error Handling

```tsx
function ProductList() {
  const { data: products, error, isError } = useProducts()

  if (isError) {
    return (
      <div className="error-state">
        <h3>Something went wrong</h3>
        <p>{error?.message}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    )
  }

  // ... rest of component
}
```

## 📊 Admin Operations

For admin functionality, use the admin-specific hooks and services:

```tsx
// Admin product management
const createProductMutation = useCreateProduct()
const updateProductMutation = useUpdateProduct()
const deleteProductMutation = useDeleteProduct()

// Admin order management
const { data: orderStats } = useOrderStats()
const { data: allOrders } = useAllOrders('pending')
```

This data layer provides a complete, type-safe, and performant way to interact with your Supabase database. All operations are optimized with React Query for caching, background updates, and error handling.

## 🎯 Next Steps

1. **Add authentication pages** using the `useAuth` hook
2. **Create product pages** using the product hooks
3. **Build cart and checkout flow** with cart and order hooks
4. **Implement admin dashboard** using admin-specific hooks
5. **Add real-time features** with Supabase subscriptions

Your e-commerce application now has a solid foundation for all data operations! 🎉
