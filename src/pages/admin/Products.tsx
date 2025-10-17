import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts } from "@/hooks/useProducts";
import { useToast } from "@/hooks/use-toast";

const Products = () => {
  const navigate = useNavigate();
  const { user, userProfile, loading } = useAuth();
  const { data: products, isLoading, error } = useProducts();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products || []);

  useEffect(() => {
    // Only redirect if we're sure the user is not admin
    if (!loading && user && userProfile && userProfile.role !== 'admin') {
      navigate('/login');
    }
  }, [user, userProfile, loading, navigate]);

  useEffect(() => {
    if (products) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.collection_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchTerm]);

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        // TODO: Implement delete product functionality
        toast({
          title: "Product deleted",
          description: "The product has been removed from the catalog",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete product",
          variant: "destructive",
        });
      }
    }
  };

  if (loading || isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 animate-spin rounded-full border-b-2 border-[#81715D] mx-auto mb-4"></div>
            <p className="text-[#DDCEB6]">Loading products...</p>
          </div>
        </div>
      </AdminLayout>
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
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 animate-spin rounded-full border-b-2 border-[#81715D] mx-auto mb-4"></div>
            <p className="text-[#DDCEB6]">Loading...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#DDCEB6]">Products</h1>
            <p className="text-[#DDCEB6]/60">Manage your product catalog</p>
          </div>
          <Button
            onClick={() => navigate('/admin/products/new')}
            className="bg-[#81715D] hover:bg-[#81715D]/90 text-[#191919]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="bg-[#0f0f0f] border-[#81715D]/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#DDCEB6]/60" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#191919] border-[#81715D]/30 text-[#DDCEB6]"
                />
              </div>
              <Button variant="outline" className="border-[#81715D]/30 text-[#DDCEB6]">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        {error ? (
          <Card className="bg-[#0f0f0f] border-[#81715D]/20">
            <CardContent className="p-8 text-center">
              <p className="text-[#DDCEB6]/60">Error loading products. Please try again.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-[#0f0f0f] border-[#81715D]/20 hover:border-[#81715D]/40 transition-colors">
                <CardHeader className="p-4">
                  <div className="aspect-square bg-[#191919] rounded-md mb-3 overflow-hidden">
                    <img
                      src={product.primary_image || '/placeholder.jpg'}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-sm font-medium text-[#DDCEB6] line-clamp-2">
                    {product.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#81715D]">
                        ₹{(product.price / 100).toFixed(2)}
                      </span>
                      {product.featured && (
                        <Badge variant="secondary" className="text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-xs text-[#DDCEB6]/60">
                      <p>Category: {product.category_name || 'N/A'}</p>
                      <p>Collection: {product.collection_name || 'N/A'}</p>
                      <p>Stock: {product.in_stock ? 'In Stock' : 'Out of Stock'}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                        className="flex-1 border-[#81715D]/30 text-[#DDCEB6] hover:bg-[#81715D]/10"
                      >
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !isLoading && !error && (
          <Card className="bg-[#0f0f0f] border-[#81715D]/20">
            <CardContent className="p-8 text-center">
              <p className="text-[#DDCEB6]/60 mb-4">
                {searchTerm ? 'No products found matching your search.' : 'No products found.'}
              </p>
              <Button
                onClick={() => navigate('/admin/products/new')}
                className="bg-[#81715D] hover:bg-[#81715D]/90 text-[#191919]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Product
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default Products;
