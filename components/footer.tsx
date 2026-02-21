import Link from "next/link"
import { Shield } from "lucide-react"

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
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Ankesa</span>
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

        <p className="mt-10 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Ankesa
        </p>
      </div>
    </footer>
  )
}