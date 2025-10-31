import Link from "next/link";

const NAV_LINKS = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-md fixed top-0 z-50">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold tracking-tight text-blue-700">VOQ</span>
      </div>
      <div className="hidden md:flex gap-8 items-center">
        {NAV_LINKS.map(link => (
          <Link
            href={link.href}
            key={link.name}
            className="text-gray-700 hover:text-blue-700 font-semibold transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="md:hidden">
        {/* Mobile menu could go here, optional */}
      </div>
    </nav>
  );
}
