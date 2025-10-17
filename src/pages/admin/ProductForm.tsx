import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useProduct } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useCollections } from "@/hooks/useCollections";
import { useToast } from "@/hooks/use-toast";

interface ProductFormData {
  title: string;
  slug: string;
  short_description: string;
  description: string;
  price: number;
  original_price: number;
  category_id: string;
  collection_id: string;
  brand: string;
  featured: boolean;
  in_stock: boolean;
  stock_quantity: number;
}

interface ProductVariant {
  color: string;
  size: string;
  sku: string;
  stock_quantity: number;
  price: number;
}

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, userProfile, loading } = useAuth();
  const { data: product, isLoading: productLoading } = useProduct(id || '');
  const { data: categories } = useCategories();
  const { data: collections } = useCollections();
  const { toast } = useToast();

  const isEditing = !!id;

  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    slug: '',
    short_description: '',
    description: '',
    price: 0,
    original_price: 0,
    category_id: '',
    collection_id: '',
    brand: 'On3',
    featured: false,
    in_stock: true,
    stock_quantity: 0,
  });

  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [images, setImages] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Only redirect if we're sure the user is not admin
    if (!loading && user && userProfile && userProfile.role !== 'admin') {
      navigate('/login');
    }
  }, [user, userProfile, loading, navigate]);

  useEffect(() => {
    if (product && isEditing) {
      setFormData({
        title: product.title,
        slug: product.slug,
        short_description: product.short_description || '',
        description: product.description || '',
        price: product.price,
        original_price: product.original_price || 0,
        category_id: product.category_id || '',
        collection_id: product.collection_id || '',
        brand: product.brand || 'On3',
        featured: product.featured || false,
        in_stock: product.in_stock || true,
        stock_quantity: product.stock_quantity || 0,
      });

      // Set images
      if (product.product_images) {
        setImages(product.product_images.map(img => img.image_url));
      }

      // Set variants
      if (product.product_variants) {
        setVariants(product.product_variants.map(variant => ({
          color: variant.color || '',
          size: variant.size || '',
          sku: variant.sku || '',
          stock_quantity: variant.stock_quantity || 0,
          price: variant.price || product.price,
        })));
      }
    }
  }, [product, isEditing]);

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === 'title') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const addVariant = () => {
    setVariants(prev => [...prev, {
      color: '',
      size: '',
      sku: '',
      stock_quantity: 0,
      price: formData.price,
    }]);
  };

  const updateVariant = (index: number, field: keyof ProductVariant, value: any) => {
    setVariants(prev => prev.map((variant, i) => 
      i === index ? { ...variant, [field]: value } : variant
    ));
  };

  const removeVariant = (index: number) => {
    setVariants(prev => prev.filter((_, i) => i !== index));
  };

  const addImage = () => {
    setImages(prev => [...prev, '']);
  };

  const updateImage = (index: number, value: string) => {
    setImages(prev => prev.map((img, i) => i === index ? value : img));
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement product save functionality
      console.log('Form data:', formData);
      console.log('Variants:', variants);
      console.log('Images:', images);

      toast({
        title: isEditing ? "Product updated" : "Product created",
        description: `${formData.title} has been ${isEditing ? 'updated' : 'created'} successfully`,
      });

      navigate('/admin/products');
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} product`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || (isEditing && productLoading)) {
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
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/admin/products')}
              className="border-[#81715D]/30 text-[#DDCEB6]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-[#DDCEB6]">
                {isEditing ? 'Edit Product' : 'Add New Product'}
              </h1>
              <p className="text-[#DDCEB6]/60">
                {isEditing ? 'Update product information' : 'Create a new product listing'}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-[#0f0f0f] border-[#81715D]/20">
            <CardHeader>
              <CardTitle className="text-[#DDCEB6]">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="text-[#DDCEB6]">Product Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="bg-[#191919] border-[#81715D]/30 text-[#DDCEB6]"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug" className="text-[#DDCEB6]">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    className="bg-[#191919] border-[#81715D]/30 text-[#DDCEB6]"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="short_description" className="text-[#DDCEB6]">Short Description</Label>
                <Textarea
                  id="short_description"
                  value={formData.short_description}
                  onChange={(e) => handleInputChange('short_description', e.target.value)}
                  className="bg-[#191919] border-[#81715D]/30 text-[#DDCEB6]"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-[#DDCEB6]">Full Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="bg-[#191919] border-[#81715D]/30 text-[#DDCEB6]"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Categories */}
          <Card className="bg-[#0f0f0f] border-[#81715D]/20">
            <CardHeader>
              <CardTitle className="text-[#DDCEB6]">Pricing & Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price" className="text-[#DDCEB6]">Price (in paise)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                    className="bg-[#191919] border-[#81715D]/30 text-[#DDCEB6]"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="original_price" className="text-[#DDCEB6]">Original Price (in paise)</Label>
                  <Input
                    id="original_price"
                    type="number"
                    value={formData.original_price}
                    onChange={(e) => handleInputChange('original_price', parseInt(e.target.value) || 0)}
                    className="bg-[#191919] border-[#81715D]/30 text-[#DDCEB6]"
                  />
                </div>
                <div>
                  <Label htmlFor="stock_quantity" className="text-[#DDCEB6]">Stock Quantity</Label>
                  <Input
                    id="stock_quantity"
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) => handleInputChange('stock_quantity', parseInt(e.target.value) || 0)}
                    className="bg-[#191919] border-[#81715D]/30 text-[#DDCEB6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category" className="text-[#DDCEB6]">Category</Label>
                  <Select value={formData.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
                    <SelectTrigger className="bg-[#191919] border-[#81715D]/30 text-[#DDCEB6]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="collection" className="text-[#DDCEB6]">Collection</Label>
                  <Select value={formData.collection_id} onValueChange={(value) => handleInputChange('collection_id', value)}>
                    <SelectTrigger className="bg-[#191919] border-[#81715D]/30 text-[#DDCEB6]">
                      <SelectValue placeholder="Select collection" />
                    </SelectTrigger>
                    <SelectContent>
                      {collections?.map((collection) => (
                        <SelectItem key={collection.id} value={collection.id}>
                          {collection.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="brand" className="text-[#DDCEB6]">Brand</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    className="bg-[#191919] border-[#81715D]/30 text-[#DDCEB6]"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange('featured', checked)}
                  />
                  <Label htmlFor="featured" className="text-[#DDCEB6]">Featured Product</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="in_stock"
                    checked={formData.in_stock}
                    onCheckedChange={(checked) => handleInputChange('in_stock', checked)}
                  />
                  <Label htmlFor="in_stock" className="text-[#DDCEB6]">In Stock</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Images */}
          <Card className="bg-[#0f0f0f] border-[#81715D]/20">
            <CardHeader>
              <CardTitle className="text-[#DDCEB6]">Product Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {images.map((image, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => updateImage(index, e.target.value)}
                    className="bg-[#191919] border-[#81715D]/30 text-[#DDCEB6]"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeImage(index)}
                    className="border-red-500/30 text-red-400"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addImage}
                className="border-[#81715D]/30 text-[#DDCEB6]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Image
              </Button>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/products')}
              className="border-[#81715D]/30 text-[#DDCEB6]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#81715D] hover:bg-[#81715D]/90 text-[#191919]"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 animate-spin rounded-full border-b-2 border-[#191919] mr-2" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {isEditing ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ProductForm;
