"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Prevent multiple simultaneous requests
    if (loading) {
      return;
    }

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const supabase = supabaseBrowser();
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;

      const userId = signInData?.user?.id;
      if (!userId) throw new Error("Login succeeded but no user id returned.");

      // User is authenticated - allow login
      // Profile check is not needed here as it can cause RLS recursion issues
      // Profile will be created/verified separately if needed

      if (remember) {
        // Supabase persists sessions in local storage by default in the browser
      }

      router.replace("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 items-stretch px-4 py-8 md:py-12">
        <div className="hidden md:flex items-center justify-center">
          <div className="w-full h-[420px] flex items-center justify-center">
            <div className="p-10 rounded-3xl bg-blue-50 dark:bg-blue-950 shadow-inner text-center">
              <img src="/login.svg" className="w-400 h-120 mb-2" />              
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] md:min-h-auto">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow p-4 sm:p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <Link href="/" className="text-blue-700 hover:underline text-sm font-medium">
                ← Back to Home
              </Link>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-blue-200 mb-6">Sign In</h1>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="you@company.com" />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                <input
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-2 top-8 text-sm text-blue-700 hover:underline">
                  {showPassword ? "Hide" : "Show"}
                </button>
                <div className="mt-2 text-sm">
                  <Link href="/forgot-password" className="text-blue-700 hover:underline">Forgot password</Link>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input id="remember" type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                <label htmlFor="remember" className="text-sm text-gray-700 dark:text-gray-300">Remember this device</label>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button disabled={loading} type="submit" className="w-full rounded-md bg-teal-700 text-white font-semibold py-3 hover:bg-teal-800 transition disabled:opacity-60">
                {loading ? "Signing in..." : "Continue"}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200 dark:border-zinc-700" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white dark:bg-zinc-900 px-3 text-sm text-gray-500">or</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button type="button" className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 dark:border-zinc-700 px-3 sm:px-4 py-2 hover:bg-gray-50 dark:hover:bg-zinc-800 text-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10 0 19-7.3 19-20 0-1.3-.1-2.7-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.2 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 15.5 4 8.2 9 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.3 36 26.8 36.9 24 36c-5.2 0-9.6-3.5-11.2-8.2l-6.6 5.1C8.1 39.2 15.4 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.8-4.8 6.5-9.3 6.5-5.2 0-9.6-3.5-11.2-8.2l-6.6 5.1C8.1 39.2 15.4 44 24 44c10 0 19-7.3 19-20 0-1.3-.1-2.7-.4-3.5z"/></svg>
                  <span className="text-xs sm:text-sm font-medium truncate">Sign in with Google</span>
                </button>
                <button type="button" className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 dark:border-zinc-700 px-3 sm:px-4 py-2 hover:bg-gray-50 dark:hover:bg-zinc-800 text-sm">
                  <span className="text-xs sm:text-sm font-medium truncate">Sign in with Intuit</span>
                </button>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                New to VOQ? <Link href="/signup" className="text-blue-700 hover:underline">Get Started</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
