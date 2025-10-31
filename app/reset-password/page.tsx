"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Handle password reset token from URL hash
    const handleReset = async () => {
      const supabase = supabaseBrowser();
      
      // Listen for auth state changes (Supabase processes hash fragments asynchronously)
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && session)) {
          setCheckingSession(false);
        }
      });
      
      // Check initial session
      let { data: sessionData } = await supabase.auth.getSession();
      
      // If we already have a session, we're good
      if (sessionData.session) {
        setCheckingSession(false);
        subscription.unsubscribe();
        return;
      }
      
      // Check if recovery token is in URL hash
      if (typeof window !== 'undefined' && window.location.hash) {
        const hash = window.location.hash;
        if (hash.includes('type=recovery') || hash.includes('access_token')) {
          // Give Supabase time to process the hash fragment
          // The onAuthStateChange will handle the session creation
          setTimeout(async () => {
            const { data: newSessionData } = await supabase.auth.getSession();
            if (newSessionData.session) {
              setCheckingSession(false);
            } else {
              // After waiting, if still no session, show error
              setError("Invalid or expired reset link. Please request a new password reset.");
              setCheckingSession(false);
            }
            subscription.unsubscribe();
          }, 2000);
          return;
        }
      }
      
      // No hash found, might be a direct visit - wait a bit then check
      setTimeout(async () => {
        const { data: finalSessionData } = await supabase.auth.getSession();
        if (!finalSessionData.session) {
          setError("Invalid or expired reset link. Please request a new password reset.");
        }
        setCheckingSession(false);
        subscription.unsubscribe();
      }, 1000);
    };

    handleReset();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const supabase = supabaseBrowser();
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) throw updateError;

      setSuccess("Password has been reset successfully. Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/login" className="text-blue-700 hover:underline text-sm font-medium">
            ← Back to Sign In
          </Link>
          <Link href="/" className="text-blue-700 hover:underline text-sm font-medium">
            Home
          </Link>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow p-6 md:p-8">
          <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-2">Reset Password</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            {checkingSession ? "Verifying reset link..." : "Enter your new password below."}
          </p>

          {checkingSession && (
            <div className="text-center py-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Please wait while we verify your reset link...</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="••••••••"
                disabled={loading || checkingSession}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-8 text-sm text-blue-700 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              <div className="mt-2 text-xs text-gray-500">
                Use 8 or more characters with a mix of letters and numbers.
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm New Password
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirm ? "text" : "password"}
                className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="••••••••"
                disabled={loading || checkingSession}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-2 top-8 text-sm text-blue-700 hover:underline"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-700">{success}</p>}

            <button
              disabled={loading || checkingSession}
              type="submit"
              className="w-full rounded-md bg-teal-700 text-white font-semibold py-3 hover:bg-teal-800 transition disabled:opacity-60"
            >
              {loading ? "Resetting..." : checkingSession ? "Verifying..." : "Reset Password"}
            </button>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Remember your password?{" "}
              <Link href="/login" className="text-blue-700 hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

