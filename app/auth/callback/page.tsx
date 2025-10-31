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
            await fetch("/api/signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId: user.id, firstName, lastName, companyName, role: "admin" }),
            });
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
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow p-8 text-center">
        <h1 className="text-xl font-semibold text-blue-900 dark:text-blue-200 mb-2">VOQ</h1>
        <p className="text-gray-700 dark:text-gray-300">{message}</p>
        <a href="/login" className="inline-block mt-6 px-6 py-2 rounded-full bg-blue-700 text-white">Go to Sign In</a>
      </div>
    </div>
  );
}
