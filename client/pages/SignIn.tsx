import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, Eye, EyeOff } from "lucide-react";

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      await signIn(formData.email, formData.password);
      navigate("/chat");
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <Heart className="w-8 h-8 fill-primary text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MeetHeart
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome Back
          </h1>
          <p className="text-muted-foreground mt-2">
            Sign in to continue your dating journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full"
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Password</label>
              <a
                href="#"
                className="text-sm text-primary hover:underline font-medium"
              >
                Forgot?
              </a>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 font-semibold"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-muted-foreground">
              New to MeetHeart?
            </span>
          </div>
        </div>

        {/* Sign Up Link */}
        <Link to="/signup">
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 border-primary text-primary hover:bg-primary/5 font-semibold"
          >
            Create Account
          </Button>
        </Link>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 rounded-lg bg-blue-50 border border-blue-200">
          <p className="text-xs font-semibold text-blue-900 mb-2">Demo Account:</p>
          <p className="text-xs text-blue-800">
            Email: <code className="font-mono">demo@meetheart.com</code>
          </p>
          <p className="text-xs text-blue-800">
            Password: <code className="font-mono">demo123456</code>
          </p>
        </div>
      </div>
    </div>
  );
}
