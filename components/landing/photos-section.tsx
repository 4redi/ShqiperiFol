import { Card } from "@/components/ui/card"
import { Building2, TreePine, GraduationCap, HardHat } from "lucide-react"

const categories = [
  {
    icon: Building2,
    title: "Urbanistikë",
    description: "Planifikim urban, ndërtesa, rrugë",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: TreePine,
    title: "Mjedisi",
    description: "Mbrojtja e mjedisit, parqe, pastrim",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: GraduationCap,
    title: "Arsimi",
    description: "Shkolla, universitete, infrastrukturë arsimore",
    color: "bg-chart-1/10 text-chart-1",
  },
  {
    icon: HardHat,
    title: "Infrastrukturë",
    description: "Rrugë, ura, sisteme ujore",
    color: "bg-chart-2/10 text-chart-2",
  },
]

export function PhotosSection() {
  return (
    <section id="rreth-nesh" className="bg-card py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground">
            KATEGORITË E ANKESAVE
          </h2>
          <p className="mt-3 text-muted-foreground">
            Zgjidhni fushën që përkon me problemin tuaj për një trajtim me të shpejtë.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Card
              key={cat.title}
              className="group cursor-default border-border transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex flex-col items-center px-5 py-8 text-center">
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${cat.color}`}
                >
                  <cat.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">
                  {cat.title}
                </h3>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
