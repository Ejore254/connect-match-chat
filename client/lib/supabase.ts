import { createClient } from "@supabase/supabase-js";

// Get environment variables from frontend
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for database
export type User = {
  id: string;
  email: string;
  created_at: string;
};

export type Profile = {
  id: string;
  user_id: string;
  name: string;
  age: number;
  bio: string;
  interests: string[];
  avatar_url?: string;
  gender: string;
  looking_for: string;
  location: string;
  created_at: string;
};

export type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read_at?: string;
};

export type Match = {
  id: string;
  user_id: string;
  matched_user_id: string;
  created_at: string;
};
