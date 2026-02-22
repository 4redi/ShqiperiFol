"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

const navLinks = [
  { href: "/#rreth-nesh", label: "Rreth Nesh" },
  { href: "/#si-funksionon", label: "Si Funksionon" },
  { href: "/protected", label: "Ankesat e Mia"},
  { href: "/ankesat", label: "Votoni" },
  { href: "/njoftimet", label: "Njoftime" }
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false)

  // ✅ Only hide navbar on auth pages
  const isAuthPage =
    pathname === "/auth/login" ||
    pathname === "/auth/sign-up"

  useEffect(() => {
    const supabase = createClient()

    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    const checkUnreadNotifications = async () => {
      const { data } = await supabase
        .from("notifications")
        .select("id")
        .eq("read", false)
        .limit(1)

      if (data && data.length > 0) {
        setHasUnreadNotifications(true)
      }
    }

    getUser()
    checkUnreadNotifications()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 border-b border-blue-700 bg-gradient-to-r from-blue-800 to-indigo-700 text-white backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
          <span className="text-xl font-bold tracking-tight text-white">
            ShqipëriFol
          </span>
        </Link>

        {!isAuthPage && (
          <>
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                if (link.href === "/njoftimet") {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center text-lg font-semibold text-white tracking-wide transition-colors hover:text-blue-200"
                    >
                      {link.label}
                      <Image
                        src={
                          hasUnreadNotifications
                            ? "/notification1.png"
                            : "/notification.png"
                        }
                        alt="Notifications"
                        width={40}
                        height={40}
                        className="ml-1 object-contain"
                      />
                    </Link>
                  )
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-semibold text-white tracking-wide transition-colors hover:text-blue-200"
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            {/* Desktop User Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <Button
                  onClick={handleLogout}
                  className="bg-white/10 backdrop-blur-md border border-red-300/40 
                             text-red-100 hover:bg-red-500 hover:text-white 
                             transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Dil
                </Button>
              ) : (
                <>
                  <Button
                    asChild
                    className="bg-white/10 backdrop-blur-md border border-white/30 
                               text-white hover:bg-white/20 
                               transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <Link href="/auth/login">Hyr</Link>
                  </Button>

                  <Button
                    asChild
                    className="bg-indigo-500 text-white 
                               hover:bg-indigo-600 
                               shadow-md hover:shadow-xl 
                               transition-all duration-300 
                               hover:-translate-y-0.5"
                  >
                    <Link href="/auth/sign-up">Regjistrohu</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center justify-center rounded-md p-2 text-white md:hidden"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu */}
            {mobileOpen && (
              <div className="absolute top-full left-0 w-full bg-blue-900 text-white shadow-lg md:hidden z-40">
                <div className="flex flex-col p-4 gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-semibold tracking-wide hover:text-blue-200"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="flex flex-col gap-2 mt-2">
                    {user ? (
                      <Button
                        onClick={handleLogout}
                        className="bg-white/10 backdrop-blur-md border border-red-300/40 
                                   text-red-100 hover:bg-red-500 hover:text-white 
                                   transition-all duration-300"
                      >
                        Dil
                      </Button>
                    ) : (
                      <>
                        <Button
                          asChild
                          className="bg-white/10 backdrop-blur-md border border-white/30 
                                     text-white hover:bg-white/20 
                                     transition-all duration-300"
                        >
                          <Link href="/auth/login">Hyr</Link>
                        </Button>

                        <Button
                          asChild
                          className="bg-indigo-500 text-white 
                                     hover:bg-indigo-600 
                                     transition-all duration-300"
                        >
                          <Link href="/auth/sign-up">Regjistrohu</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </nav>
    </header>
  )
}