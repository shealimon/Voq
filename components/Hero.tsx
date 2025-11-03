import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full pt-24 sm:pt-32 pb-12 sm:pb-16 flex flex-col items-center text-center bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-black px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-800 dark:text-blue-300 max-w-2xl leading-tight">
        Empower your Workforce with VOQ
      </h1>
      <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-xl">
        Modern HCM platform for global teams
      </p>
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
        <Link href="/signup" className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-blue-700 text-white font-semibold hover:bg-blue-900 transition shadow text-center">
          Create Free Account
        </Link>
        <Link href="/login" className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full border border-blue-700 text-blue-700 font-semibold hover:bg-blue-700 hover:text-white transition text-center">
          Sign In
        </Link>
      </div>
    </section>
  );
}
