import { UserPlus, FileText, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    icon: UserPlus,
    title: "Krijoni Llogarinë",
    description:
      "Regjistrohuni me email dhe fjalëkalim për të filluar përdorimin e platformës.",
  },
  {
    icon: FileText,
    title: "Paraqisni Ankesën",
    description:
      "Zgjidhni kategorinë, vendndodhjen dhe përshkruani problemin në detaje.",
  },
  {
    icon: CheckCircle,
    title: "Ndiqni Statusin",
    description:
      "Shikoni statusin e ankesës suaj ndërsa ekipi ynë punon për zgjidhjen.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="si-funksionon" className="bg-background py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground">
            SI FUNKSIONON?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tre hapa të thjeshtë për të paraqitur ankesën tuaj.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Card key={step.title} className="relative border-border bg-card">
              <CardContent className="flex flex-col items-center px-6 py-8 text-center">
                <div className="mb-1 text-xs font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
