import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="text-center px-4">
        <h1 className="mb-4 text-8xl font-hero font-bold">
          <span className="glitch">404</span>
        </h1>
        <p className="mb-2 text-2xl font-heading font-semibold">Page Not Found</p>
        <p className="mb-8 text-muted-foreground">
          This page doesn't exist in our code.
        </p>
        <Link to="/">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading">
            <Home className="mr-2 h-5 w-5" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
