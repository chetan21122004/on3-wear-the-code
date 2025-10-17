import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Edit2, Save, X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, userProfile, updateProfile, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Initialize form data when user profile loads
  useEffect(() => {
    if (userProfile) {
      setFormData({
        full_name: userProfile.full_name || "",
        gender: userProfile.gender || "",
      });
    } else if (user?.user_metadata) {
      setFormData({
        full_name: user.user_metadata.full_name || "",
        gender: user.user_metadata.gender || "",
      });
    }
  }, [userProfile, user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await updateProfile(formData);
      
      if (error) {
        toast({
          title: "Update Failed",
          description: error.message || "Failed to update profile",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
        setIsEditing(false);
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    if (userProfile) {
      setFormData({
        full_name: userProfile.full_name || "",
        gender: userProfile.gender || "",
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#191919] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#81715D]"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-[#191919] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-heading text-[#DDCEB6] mb-4">
            My Profile
          </h1>
          <p className="text-[#DDCEB6]/70 font-body">
            Manage your account settings and personal information
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1"
          >
            <Card className="bg-[#212121] border-[#81715D]/30 text-[#DDCEB6]">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage 
                      src={userProfile?.avatar_url || user.user_metadata?.avatar_url} 
                      alt={formData.full_name || user.email || 'User'} 
                    />
                    <AvatarFallback className="bg-[#81715D] text-[#191919] text-xl">
                      {(formData.full_name || user.email || 'U').charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-[#81715D] border-[#81715D] hover:bg-[#97816B]"
                  >
                    <Camera className="h-4 w-4 text-[#191919]" />
                  </Button>
                </div>
                <CardTitle className="text-[#DDCEB6]">
                  {formData.full_name || 'User'}
                </CardTitle>
                <CardDescription className="text-[#DDCEB6]/60">
                  {user.email}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex items-center justify-center text-sm text-[#DDCEB6]/60 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  Member since {new Date(user.created_at || '').toLocaleDateString()}
                </div>
                <div className="flex items-center justify-center text-sm text-[#DDCEB6]/60">
                  <Mail className="h-4 w-4 mr-2" />
                  {user.email_confirmed_at ? 'Email verified' : 'Email not verified'}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <Card className="bg-[#212121] border-[#81715D]/30 text-[#DDCEB6]">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-[#DDCEB6]">Personal Information</CardTitle>
                  <CardDescription className="text-[#DDCEB6]/60">
                    Update your personal details and preferences
                  </CardDescription>
                </div>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="bg-[#191919] border-[#81715D]/30 text-[#DDCEB6] hover:bg-[#81715D]/10"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      disabled={isSubmitting}
                      className="bg-[#191919] border-[#81715D]/30 text-[#DDCEB6] hover:bg-[#81715D]/10"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      disabled={isSubmitting}
                      className="bg-[#81715D] hover:bg-[#97816B] text-[#191919]"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-[#DDCEB6] font-heading">
                    Full Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="fullName"
                      value={formData.full_name}
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                      className="bg-[#191919] border-[#81715D]/30 text-[#DDCEB6] focus:ring-[#81715D]"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="p-3 bg-[#191919]/50 rounded-md border border-[#81715D]/20">
                      <span className="text-[#DDCEB6]">
                        {formData.full_name || 'Not provided'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Email (Read-only) */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#DDCEB6] font-heading">
                    Email Address
                  </Label>
                  <div className="p-3 bg-[#191919]/30 rounded-md border border-[#81715D]/20">
                    <span className="text-[#DDCEB6]/60">
                      {user.email}
                    </span>
                  </div>
                  <p className="text-xs text-[#DDCEB6]/50">
                    Email cannot be changed. Contact support if needed.
                  </p>
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-[#DDCEB6] font-heading">
                    Gender
                  </Label>
                  {isEditing ? (
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange('gender', value)}
                    >
                      <SelectTrigger className="bg-[#191919] border-[#81715D]/30 text-[#DDCEB6] focus:ring-[#81715D]">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#191919] border-[#81715D]/30">
                        <SelectItem value="male" className="text-[#DDCEB6] focus:bg-[#81715D]/10">
                          Male
                        </SelectItem>
                        <SelectItem value="female" className="text-[#DDCEB6] focus:bg-[#81715D]/10">
                          Female
                        </SelectItem>
                        <SelectItem value="other" className="text-[#DDCEB6] focus:bg-[#81715D]/10">
                          Other
                        </SelectItem>
                        <SelectItem value="prefer-not-to-say" className="text-[#DDCEB6] focus:bg-[#81715D]/10">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="p-3 bg-[#191919]/50 rounded-md border border-[#81715D]/20">
                      <span className="text-[#DDCEB6]">
                        {formData.gender ? 
                          formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1).replace('-', ' ') 
                          : 'Not provided'
                        }
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
