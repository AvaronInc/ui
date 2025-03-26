
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/transitions/PageTransition";
import CopyrightFooter from "@/components/common/CopyrightFooter";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md text-center space-y-6 bg-card/80 backdrop-blur-sm border border-border shadow-lg p-8 rounded-xl">
            <div className="space-y-2">
              <h1 className="text-6xl font-bold text-primary">404</h1>
              <p className="text-xl text-foreground">Page not found</p>
            </div>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild className="mt-4">
              <Link to="/">Return to Dashboard</Link>
            </Button>
          </div>
        </div>
        <CopyrightFooter />
      </div>
    </PageTransition>
  );
};

export default NotFound;
