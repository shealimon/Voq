import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full pt-32 pb-16 flex flex-col items-center text-center bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-black">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 dark:text-blue-300 max-w-2xl leading-tight">
        Empower your Workforce with VOQ
      </h1>
      <p className="mt-5 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-xl">
        Modern HCM platform for global teams
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/signup" className="px-8 py-3 rounded-full bg-blue-700 text-white font-semibold hover:bg-blue-900 transition shadow">
          Create Free Account
        </Link>
        <Link href="/login" className="px-8 py-3 rounded-full border border-blue-700 text-blue-700 font-semibold hover:bg-blue-700 hover:text-white transition">
          Sign In
        </Link>
      </div>
    </section>
  );
}
