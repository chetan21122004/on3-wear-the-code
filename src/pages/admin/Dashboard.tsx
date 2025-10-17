import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts } from "@/hooks/useProducts";
import { useCartItems } from "@/hooks/useCart";
import { AdminDebug } from "@/components/admin/AdminDebug";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, userProfile, loading } = useAuth();
  const { data: products } = useProducts();
  
  useEffect(() => {
    // Only redirect if we're sure the user is not admin
    // Don't redirect while still loading or if profile fetch failed
    if (!loading && user && userProfile && userProfile.role !== 'admin') {
      navigate('/login');
    }
  }, [user, userProfile, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#191919]">
        <div className="text-center">
          <div className="w-8 h-8 animate-spin rounded-full border-b-2 border-[#81715D] mx-auto mb-4"></div>
          <p className="text-[#DDCEB6]">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Show access denied only if we have a user but they're definitely not admin
  if (!loading && user && userProfile && userProfile.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#191919]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#DDCEB6] mb-4">Access Denied</h1>
          <p className="text-[#DDCEB6]/60 mb-4">You don't have permission to access the admin panel.</p>
          <p className="text-[#DDCEB6]/40 text-sm">Current role: {userProfile.role}</p>
        </div>
      </div>
    );
  }

  // Show loading if no user or profile not loaded yet
  if (!user || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#191919]">
        <div className="text-center">
          <div className="w-8 h-8 animate-spin rounded-full border-b-2 border-[#81715D] mx-auto mb-4"></div>
          <p className="text-[#DDCEB6]">Loading admin panel...</p>
          <p className="text-[#DDCEB6]/60 text-sm mt-2">
            {!user ? 'Please sign in' : 'Loading user profile...'}
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Products",
      value: products?.length || 0,
      description: "Active products in catalog",
      icon: Package,
      color: "text-blue-400",
    },
    {
      title: "Total Orders",
      value: "0", // TODO: Implement orders count
      description: "Orders this month",
      icon: ShoppingCart,
      color: "text-green-400",
    },
    {
      title: "Total Users",
      value: "0", // TODO: Implement users count
      description: "Registered users",
      icon: Users,
      color: "text-purple-400",
    },
    {
      title: "Revenue",
      value: "₹0", // TODO: Implement revenue calculation
      description: "This month",
      icon: TrendingUp,
      color: "text-yellow-400",
    },
  ];

  return (
    <AdminLayout>
      <AdminDebug />
      <div className="space-y-6">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-[#81715D]/20 to-[#DDCEB6]/10 rounded-lg p-6 border border-[#81715D]/20">
          <h1 className="text-2xl font-bold text-[#DDCEB6] mb-2">
            Welcome to ON3 Admin Panel
          </h1>
          <p className="text-[#DDCEB6]/70">
            Manage your products, orders, and customers from this dashboard.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="bg-[#0f0f0f] border-[#81715D]/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-[#DDCEB6]">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#DDCEB6]">{stat.value}</div>
                  <p className="text-xs text-[#DDCEB6]/60 mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Products */}
          <Card className="bg-[#0f0f0f] border-[#81715D]/20">
            <CardHeader>
              <CardTitle className="text-[#DDCEB6]">Recent Products</CardTitle>
              <CardDescription className="text-[#DDCEB6]/60">
                Latest products added to catalog
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {products?.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#DDCEB6]">{product.title}</p>
                      <p className="text-xs text-[#DDCEB6]/60">{product.category_name}</p>
                    </div>
                    <div className="text-sm font-medium text-[#81715D]">
                      ₹{(product.price / 100).toFixed(2)}
                    </div>
                  </div>
                ))}
                {(!products || products.length === 0) && (
                  <p className="text-sm text-[#DDCEB6]/60">No products found</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-[#0f0f0f] border-[#81715D]/20">
            <CardHeader>
              <CardTitle className="text-[#DDCEB6]">Quick Actions</CardTitle>
              <CardDescription className="text-[#DDCEB6]/60">
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/admin/products/new')}
                  className="w-full text-left p-3 rounded-md bg-[#81715D]/10 hover:bg-[#81715D]/20 transition-colors"
                >
                  <p className="text-sm font-medium text-[#DDCEB6]">Add New Product</p>
                  <p className="text-xs text-[#DDCEB6]/60">Create a new product listing</p>
                </button>
                <button
                  onClick={() => navigate('/admin/products')}
                  className="w-full text-left p-3 rounded-md bg-[#81715D]/10 hover:bg-[#81715D]/20 transition-colors"
                >
                  <p className="text-sm font-medium text-[#DDCEB6]">Manage Products</p>
                  <p className="text-xs text-[#DDCEB6]/60">Edit existing products</p>
                </button>
                <button
                  onClick={() => navigate('/admin/orders')}
                  className="w-full text-left p-3 rounded-md bg-[#81715D]/10 hover:bg-[#81715D]/20 transition-colors"
                >
                  <p className="text-sm font-medium text-[#DDCEB6]">View Orders</p>
                  <p className="text-xs text-[#DDCEB6]/60">Manage customer orders</p>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
