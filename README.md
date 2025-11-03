This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Environment Variables

Before running the application, you need to set up your Supabase environment variables. Create a `.env.local` file in the root directory with the following:

```env
# Supabase Configuration
# Get these values from your Supabase Dashboard: https://app.supabase.com/project/_/settings/api

# Public URL - Required for both client and server
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url

# Anon/Public Key - Required for client-side operations (browser)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Service Role Key - Required for server-side operations (API routes)
# ⚠️ IMPORTANT: This is a secret key. Never expose it in client-side code!
# This key bypasses Row Level Security (RLS) and should only be used server-side.
# Find it in Supabase Dashboard > Settings > API > service_role key (secret)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**For Production:** Make sure to add all three environment variables to your hosting platform (Vercel, Netlify, etc.). The `SUPABASE_SERVICE_ROLE_KEY` is especially important for the signup functionality to work.

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
