"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navLinks = [
  { href: "/#rreth-nesh", label: "Rreth Nesh" },
  { href: "/#si-funksionon", label: "Si Funksionon" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isAuthPage =
    pathname.startsWith("/auth") || pathname.startsWith("/protected") || pathname.startsWith("/admin")

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[#629FAD] backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Ankesa
          </span>
        </Link>

        {!isAuthPage && (
          <>
            <div className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Hyr</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/sign-up">Regjistrohu</Link>
              </Button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center justify-center rounded-md p-2 text-muted-foreground md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </>
        )}

        {isAuthPage && (
          <Button variant="ghost" asChild>
            <Link href="/">Kthehu</Link>
          </Button>
        )}
      </nav>

      {mobileOpen && !isAuthPage && (
        <div className="border-t border-border bg-card px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button variant="outline" asChild className="w-full">
                <Link href="/auth/login">Hyr</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/auth/sign-up">Regjistrohu</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
