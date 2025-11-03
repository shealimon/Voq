import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { userId, firstName, lastName, companyName, role } = await req.json();

    if (!userId || !firstName || !lastName || !companyName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let supabase;
    try {
      supabase = supabaseServer();
    } catch (envError: any) {
      // Catch environment variable errors and return a helpful error
      console.error("Environment variable error:", envError.message);
      return NextResponse.json(
        { 
          error: "Server configuration error. Please contact support.",
          details: "Missing required environment variables. This is a server configuration issue."
        },
        { status: 500 }
      );
    }

    // Ensure the auth user exists (helps avoid FK violations when email not verified/created yet)
    const { data: userLookup, error: userLookupError } = await supabase.auth.admin.getUserById(userId);
    if (userLookupError || !userLookup?.user) {
      return NextResponse.json({
        error: "User is not ready yet. Please verify the email from your inbox and try again.",
      }, { status: 409 });
    }

    // Create or reuse company by name
    let companyId: string | null = null;
    const { data: existingCompany } = await supabase
      .from("companies")
      .select("id")
      .eq("name", companyName)
      .maybeSingle();

    if (existingCompany?.id) {
      companyId = existingCompany.id;
    } else {
      const { data: company, error: companyError } = await supabase
        .from("companies")
        .insert({ name: companyName })
        .select("id")
        .single();
      if (companyError || !company) {
        return NextResponse.json({ error: companyError?.message || "Failed to create company" }, { status: 500 });
      }
      companyId = company.id;
    }

    // Check if profile already exists (idempotency)
    const { data: existingProfile } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (existingProfile) {
      // Profile already exists, return success (user might be re-verifying email)
      return NextResponse.json({ 
        companyId, 
        profileId: existingProfile.id,
        message: "Profile already exists"
      }, { status: 200 });
    }

    // Create profile
    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .insert({ user_id: userId, company_id: companyId, first_name: firstName, last_name: lastName, role: role || "admin" })
      .select("id")
      .single();

    if (profileError) {
      // Handle duplicate key errors gracefully
      if (profileError.code === "23505" || profileError.message.includes("duplicate") || profileError.message.includes("unique constraint")) {
        // Profile was created in a race condition, fetch it
        const { data: raceProfile } = await supabase
          .from("user_profiles")
          .select("id")
          .eq("user_id", userId)
          .maybeSingle();
        
        if (raceProfile) {
          return NextResponse.json({ 
            companyId, 
            profileId: raceProfile.id,
            message: "Profile already exists"
          }, { status: 200 });
        }
      }
      
      return NextResponse.json({ 
        error: profileError.message || "Failed to create profile",
        details: profileError
      }, { status: 500 });
    }

    if (!profile) {
      return NextResponse.json({ error: "Failed to create profile: No data returned" }, { status: 500 });
    }

    return NextResponse.json({ companyId, profileId: profile.id }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unexpected error" }, { status: 500 });
  }
}
