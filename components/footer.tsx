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
    <footer className="border-t border-blue-100 bg-gradient-to-b from-white to-blue-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9">
              <Image
                src="/logo.png"
                alt="Logo"
                width={36}
                height={36}
                className="rounded-lg object-cover"
              />
            </div>
            <span className="text-xl font-bold text-red-900">ShqiptarFol</span>
          </Link>

          <div className="flex gap-12">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-blue-500">
          © {new Date().getFullYear()} ShqiptarFol
        </p>
      </div>
    </footer>
  )
}