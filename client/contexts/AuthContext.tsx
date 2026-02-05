import React, { createContext, useContext, useEffect, useState } from "react";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: string;
  lookingFor: string;
  location: string;
  bio: string;
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  signUp: (email: string, password: string, profile: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const DEMO_USER = {
  email: "demo@meetheart.com",
  password: "demo123456",
  profile: {
    name: "Alex Johnson",
    age: 28,
    gender: "male",
    lookingFor: "female",
    location: "New York, NY",
    bio: "Adventure seeker and coffee enthusiast. Love hiking and exploring new places!",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount (from localStorage)
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem("meetHeart_user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Failed to restore auth:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signUp = async (email: string, password: string, profile: any) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Create user object
      const newUser: AuthUser = {
        id: `user_${Date.now()}`,
        email,
        name: profile.name,
        age: profile.age,
        gender: profile.gender,
        lookingFor: profile.looking_for || profile.lookingFor,
        location: profile.location,
        bio: profile.bio,
      };

      // Store in localStorage
      localStorage.setItem("meetHeart_user", JSON.stringify(newUser));
      localStorage.setItem("meetHeart_password", password); // Note: This is for demo only - never do this in production!

      setUser(newUser);
    } catch (error: any) {
      throw new Error(error.message || "Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Check demo credentials
      if (email === DEMO_USER.email && password === DEMO_USER.password) {
        const demoUserObj: AuthUser = {
          id: "demo_user_123",
          email: DEMO_USER.email,
          ...DEMO_USER.profile,
        };
        localStorage.setItem("meetHeart_user", JSON.stringify(demoUserObj));
        localStorage.setItem("meetHeart_password", password);
        setUser(demoUserObj);
        return;
      }

      // Check user-created accounts
      const savedUser = localStorage.getItem("meetHeart_user");
      const savedPassword = localStorage.getItem("meetHeart_password");

      if (
        savedUser &&
        JSON.parse(savedUser).email === email &&
        savedPassword === password
      ) {
        setUser(JSON.parse(savedUser));
        return;
      }

      throw new Error("Invalid email or password");
    } catch (error: any) {
      throw new Error(
        error.message || "Failed to sign in. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      localStorage.removeItem("meetHeart_user");
      localStorage.removeItem("meetHeart_password");
      setUser(null);
    } catch (error) {
      throw new Error("Failed to sign out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
