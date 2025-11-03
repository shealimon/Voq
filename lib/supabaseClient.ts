import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabaseBrowser = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase ENV vars NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabaseServer = () => {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
  if (!supabaseUrl) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL environment variable. " +
      "Please set this in your production environment variables."
    );
  }
  if (!serviceKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY environment variable. " +
      "This is required for server-side operations like user profile creation. " +
      "Please set this in your production environment variables. " +
      "You can find it in your Supabase Dashboard under Settings > API > service_role key (secret)"
    );
  }
  return createClient(supabaseUrl, serviceKey);
};
