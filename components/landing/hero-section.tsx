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
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-indigo-100 py-20 lg:py-28">
      <div className="relative mx-auto max-w-6xl px-4 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100 px-4 py-1.5">
            <span className="text-xs font-medium text-blue-700">
              PLATFORMË QYTETARE
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
            Zëri juaj për një komunitet më të mirë
          </h1>

          <p className="mt-5 text-lg text-gray-600">
            Paraqisni ankesat tuaja për problemet në komunitet dhe ndiqni
            zgjidhjen e tyre në kohë reale.
          </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600"
          >
            <Link href="/auth/sign-up" className="flex items-center">
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
            <div key={stat.label} className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100">
                <stat.icon className="h-5 w-5 text-blue-600" />
              </div>
              <span className="block text-2xl font-bold text-gray-900">
                {stat.value}
              </span>
              <span className="text-xs text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}