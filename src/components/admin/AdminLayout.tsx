import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Package, Users, ShoppingCart, BarChart3, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const { user, userProfile, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of the admin panel",
    });
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: BarChart3,
      current: location.pathname === "/admin",
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
      current: location.pathname.startsWith("/admin/products"),
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
      current: location.pathname.startsWith("/admin/orders"),
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
      current: location.pathname.startsWith("/admin/users"),
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      current: location.pathname.startsWith("/admin/settings"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#191919] flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#0f0f0f] border-r border-[#81715D]/20">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-[#81715D]/20">
            <h1 className="text-xl font-bold text-[#DDCEB6]">ON3 Admin</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.current
                      ? "bg-[#81715D] text-[#191919]"
                      : "text-[#DDCEB6] hover:bg-[#81715D]/10 hover:text-[#81715D]"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Sign Out */}
          <div className="px-4 py-4 border-t border-[#81715D]/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#81715D] rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-[#191919]">
                    {userProfile?.full_name?.charAt(0) || user?.email?.charAt(0) || "A"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#DDCEB6] truncate">
                    {userProfile?.full_name || "Admin"}
                  </p>
                  <p className="text-xs text-[#DDCEB6]/60 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-[#DDCEB6] hover:text-[#81715D]"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#0f0f0f] border-b border-[#81715D]/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#DDCEB6]">
              {navigation.find(item => item.current)?.name || "Admin Panel"}
            </h2>
            <div className="text-sm text-[#DDCEB6]/60">
              Welcome back, {userProfile?.full_name || "Admin"}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
