"use client"

import Link from "next/link"
import Image from "next/image"

const quickLinks = [
  { href: "/#rreth-nesh", label: "Rreth Nesh" },
  { href: "/#si-funksionon", label: "Si Funksionon" },
  { href: "/#pyetje", label: "Pyetje të Shpeshta" },
]

export function Footer() {
  return (
    <footer className="bg-gradient-to-t from-blue-900 to-indigo-700 text-white mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Top section: logo + quick links */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-lg object-cover"
              />
            </div>
            <span className="text-xl font-bold text-white">ShqipëriFol</span>
          </Link>

          {/* Quick links */}
          <div className="flex flex-wrap gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-blue-200 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom section: copyright */}
        <p className="mt-10 text-center text-xs text-blue-200">
          © {new Date().getFullYear()} ShqipëriFol. Të gjitha të drejtat e rezervuara.
        </p>
      </div>
    </footer>
  )
}