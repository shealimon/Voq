"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();
  const [message, setMessage] = useState("Verifying your email…");

  useEffect(() => {
    const run = async () => {
      try {
        const supabase = supabaseBrowser();

        // Check if this is a password recovery flow
        const urlParams = new URLSearchParams(window.location.search);
        const isRecovery = urlParams.get("type") === "recovery" || 
                          (typeof window !== "undefined" && window.location.hash.includes("type=recovery"));

        if (isRecovery) {
          setMessage("Redirecting to password reset…");
          // Wait for Supabase to process the recovery token
          await new Promise(r => setTimeout(r, 500));
          
          // Redirect to reset password page, preserving the hash fragment with the token
          // Using window.location to preserve the hash fragment
          window.location.href = `/reset-password${window.location.hash}`;
          return;
        }

        // Wait for session to be available (in case of delayed initialization)
        let { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) {
          // Give the SDK a brief moment to hydrate from URL hash if needed
          await new Promise(r => setTimeout(r, 500));
          ({ data: sessionData } = await supabase.auth.getSession());
        }
        const user = sessionData.session?.user;
        if (!user) {
          setMessage("Email verified. You can now sign in.");
          return;
        }

        // Check for existing profile
        const { data: existingProfile } = await supabase
          .from("user_profiles")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();

        if (!existingProfile) {
          // Attempt to create profile via API using metadata captured at signup
          const meta = user.user_metadata || {} as any;
          const firstName = meta.firstName || meta.first_name || "";
          const lastName = meta.lastName || meta.last_name || "";
          const companyName = meta.companyName || meta.company_name || "";

          if (firstName && lastName && companyName) {
            try {
              const profileResp = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id, firstName, lastName, companyName, role: "admin" }),
              });
              
              // Profile creation is best-effort - even if it fails, user can still sign in
              // The error is logged but doesn't block the flow
              if (!profileResp.ok) {
                console.warn("Profile creation failed during email verification:", await profileResp.json().catch(() => ({})));
              }
            } catch (profileError) {
              // Non-blocking error - profile might be created on next login or manually
              console.warn("Error creating profile during callback:", profileError);
            }
          }
        }

        setMessage("Email verified. Redirecting to sign in…");
        setTimeout(() => router.replace("/login"), 1000);
      } catch {
        setMessage("Verification complete. You can now sign in.");
      }
    };
    run();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow p-6 sm:p-8 text-center w-full max-w-md">
        <h1 className="text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-200 mb-2">VOQ</h1>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{message}</p>
        <a href="/login" className="inline-block mt-6 px-6 py-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition text-sm sm:text-base">Go to Sign In</a>
      </div>
    </div>
  );
}
