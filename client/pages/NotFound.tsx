import Layout from "@/components/Layout";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-white to-muted/30 px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-2">
            <h1 className="text-6xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              404
            </h1>
            <p className="text-2xl font-bold text-foreground">
              Page Not Found
            </p>
          </div>

          <p className="text-muted-foreground">
            Oops! We couldn't find the page you're looking for. It might have
            been moved or no longer exists.
          </p>

          <Link to="/">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 w-full sm:w-auto">
              <Home className="mr-2 w-5 h-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
