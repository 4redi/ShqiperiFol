import Link from "next/link"
import { Shield } from "lucide-react"

const quickLinks = [
  { href: "/#rreth-nesh", label: "Rreth Nesh" },
  { href: "/#si-funksionon", label: "Si Funksionon" },
  { href: "/#pyetje", label: "Pyetje te Shpeshta" },
]

const legalLinks = [
  { href: "/auth/login", label: "Hyr" },
  { href: "/auth/sign-up", label: "Regjistrohu" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Ankesa
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Platforma dixhitale për paraqitjen e ankesave qytetare. Zëri juaj ka rëndësi            
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                Navigimi
              </h3>
              <ul className="flex flex-col gap-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                Llogaria
              </h3>
              <ul className="flex flex-col gap-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            {'© '}
            {new Date().getFullYear()}
            {' Ankesa. Të gjitha të drejtat e rezervuara.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
