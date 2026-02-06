import React, { createContext, useContext, useEffect, useState } from "react";
import { db, User } from "@/lib/db";

export type AuthUser = User;

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  signUp: (email: string, password: string, profile: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user - pre-loaded for testing
const createDemoUser = (): User => ({
  id: "demo_user_123",
  email: "demo@meetheart.com",
  name: "Alex Johnson",
  age: 28,
  gender: "male",
  lookingFor: "female",
  location: "New York, NY",
  bio: "Adventure seeker and coffee enthusiast. Love hiking and exploring new places!",
  createdAt: new Date().toISOString(),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        const currentUserId = localStorage.getItem("meetheart_currentUserId");
        if (currentUserId) {
          const savedUser = db.getUser(currentUserId);
          if (savedUser) {
            setUser(savedUser);
          }
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
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Check if email already exists
      if (db.getUserByEmail(email)) {
        throw new Error("Email already registered");
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: profile.name,
        age: parseInt(profile.age),
        gender: profile.gender,
        lookingFor: profile.looking_for || profile.lookingFor,
        location: profile.location,
        bio: profile.bio || "",
        createdAt: new Date().toISOString(),
      };

      // Save to database
      db.saveUser(newUser);

      // Store password (hashed in production!)
      localStorage.setItem(`meetheart_pwd_${newUser.id}`, btoa(password));
      localStorage.setItem("meetheart_currentUserId", newUser.id);

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
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Check demo credentials
      if (email === "demo@meetheart.com" && password === "demo123456") {
        let demoUser = db.getUser("demo_user_123");
        if (!demoUser) {
          demoUser = createDemoUser();
          db.saveUser(demoUser);
        }
        localStorage.setItem("meetheart_currentUserId", demoUser.id);
        setUser(demoUser);
        return;
      }

      // Find user in database
      const foundUser = db.getUserByEmail(email);
      if (!foundUser) {
        throw new Error("User not found");
      }

      // Verify password
      const storedPassword = localStorage.getItem(
        `meetheart_pwd_${foundUser.id}`,
      );
      if (!storedPassword || atob(storedPassword) !== password) {
        throw new Error("Invalid password");
      }

      localStorage.setItem("meetheart_currentUserId", foundUser.id);
      setUser(foundUser);
    } catch (error: any) {
      throw new Error(error.message || "Failed to sign in.");
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      localStorage.removeItem("meetheart_currentUserId");
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
