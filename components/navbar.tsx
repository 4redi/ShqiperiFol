"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navLinks = [
  { href: "/#rreth-nesh", label: "Rreth Nesh" },
  { href: "/#si-funksionon", label: "Si Funksionon" },
  { href: "/chat", label: "AI" },
  { href: "/ankesat", label: "Ankesat"}
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isAuthPage =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/protected") ||
    pathname.startsWith("/admin")

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/80 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6"
        style={{ marginTop: 0, marginBottom: 0, padding: 0 }}
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
          <span className="text-xl font-bold tracking-tight text-red-900">
            ShqiptarFol
          </span>
        </Link>

        {!isAuthPage && (
          <>
            <div className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-semibold text-gray-800 tracking-wide transition-colors hover:text-blue-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Hyr</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600"
              >
                <Link href="/auth/sign-up">Regjistrohu</Link>
              </Button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center justify-center rounded-md p-2 text-gray-600 md:hidden"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </>
        )}
      </nav>
    </header>
  )
}