import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, Users, MessageSquareText } from "lucide-react"

const stats = [
  { icon: ShieldCheck, value: "500+", label: "Ankesa te zgjidhura" },
  { icon: Users, value: "2,000+", label: "Qytetare aktive" },
  { icon: MessageSquareText, value: "24h", label: "Koha mesatare e pergjigjes" },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-teal-50 py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-6xl px-4 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
            <span className="text-xs font-medium text-secondary-foreground">
              PLATFORMË QYTETARE
            </span>
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            Zëri juaj për një komunitet më të mirë
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            Paraqisni ankesat tuaja për problemet në komunitet. Nga urbanistika te mjedisi, çdo zë ka rëndësi për një të ardhme më të mirë.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/auth/sign-up">
                FILLO TANI
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#si-funksionon">MËSONI MË SHUMË</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-xl grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
