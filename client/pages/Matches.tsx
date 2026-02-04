import Layout from "@/components/Layout";
import { Heart } from "lucide-react";

export default function Matches() {
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
            This page will show all your matches. Keep using the app and let us
            know when you'd like us to build out this feature!
          </p>
        </div>
      </div>
    </Layout>
  );
}
