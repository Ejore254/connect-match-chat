import Layout from "@/components/Layout";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Matches() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <p className="text-muted-foreground">Please sign in to view matches.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-white to-muted/30">
        <div className="text-center space-y-4 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Your Matches
          </h1>
          <p className="text-muted-foreground max-w-md">
            You currently have no matches. Keep exploring and liking profiles to find your perfect match!
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            This feature is coming soon. Let us know if you'd like us to prioritize it!
          </p>
        </div>
      </div>
    </Layout>
  );
}
