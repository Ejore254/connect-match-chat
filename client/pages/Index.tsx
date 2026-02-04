import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Heart, Zap, Shield, Users, MessageCircle, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Feature = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="text-center space-y-4 p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow">
    <div className="flex justify-center">
      <div className="p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
        {Icon}
      </div>
    </div>
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

export default function Index() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-pink-50 to-purple-50 pt-20 pb-20 md:pt-32 md:pb-32">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl -ml-48 -mb-48" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                The Future of Dating Starts Here
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
              Find Your <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Perfect Connection
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of singles looking for meaningful relationships.
              Smart matching, genuine connections, real love.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/signup">
                <Button className="h-14 px-8 text-base bg-gradient-to-r from-primary to-secondary hover:opacity-90 rounded-full w-full sm:w-auto">
                  Start Matching Now
                  <Heart className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="h-14 px-8 text-base border-primary text-primary hover:bg-primary/5 rounded-full w-full sm:w-auto"
              >
                Learn More
              </Button>
            </div>

            {/* Social Proof */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-muted-foreground">Active Users</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">15K+</div>
                <div className="text-muted-foreground">Matches Weekly</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">98%</div>
                <div className="text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why Choose MeetHeart?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the most advanced dating platform designed for real
              connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature
              icon={<Zap className="w-8 h-8 text-primary" />}
              title="Smart Matching"
              description="Our AI-powered algorithm matches you with compatible people based on interests, values, and personality."
            />
            <Feature
              icon={<Shield className="w-8 h-8 text-secondary" />}
              title="Safe & Secure"
              description="Verified profiles, encrypted messages, and industry-leading security keep you safe."
            />
            <Feature
              icon={<Users className="w-8 h-8 text-accent" />}
              title="Real People"
              description="All profiles are verified. No bots, no fakes. Just genuine people looking for real connections."
            />
            <Feature
              icon={<MessageCircle className="w-8 h-8 text-primary" />}
              title="Chat & Connect"
              description="Message anyone you match with. Share photos, voice messages, and more instantly."
            />
            <Feature
              icon={<Heart className="w-8 h-8 text-secondary" />}
              title="Discovery Made Easy"
              description="Discover new people with advanced filters. Find exactly what you're looking for."
            />
            <Feature
              icon={<Sparkles className="w-8 h-8 text-accent" />}
              title="Premium Features"
              description="Unlock unlimited likes, see who likes you, and get priority matches."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started is simple and fast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create Your Profile",
                description: "Sign up and create a profile with your best photos and bio.",
              },
              {
                step: "2",
                title: "Get Matched",
                description: "Discover compatible people using our smart matching algorithm.",
              },
              {
                step: "3",
                title: "Chat & Meet",
                description: "Connect with matches, chat, and arrange to meet in person.",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-card rounded-xl p-8 border border-border h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-secondary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Find Love?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join MeetHeart today and start your journey to finding meaningful
              connections.
            </p>
            <Link to="/signup">
              <Button className="h-14 px-10 text-base bg-gradient-to-r from-primary to-secondary hover:opacity-90 rounded-full">
                Get Started Free
                <Heart className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
