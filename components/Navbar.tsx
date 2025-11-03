"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-md fixed top-0 z-50">
      <div className="flex items-center gap-2">
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-blue-700">VOQ</span>
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
      <div className="md:hidden relative">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-700 hover:text-blue-700"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12"/>
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16"/>
            )}
          </svg>
        </button>
        {mobileMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2">
            {NAV_LINKS.map(link => (
              <Link
                href={link.href}
                key={link.name}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:text-blue-700 hover:bg-gray-50 font-semibold transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
