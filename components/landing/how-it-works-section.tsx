import { UserPlus, FileText, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    icon: UserPlus,
    title: "Krijoni Llogarinë",
    description:
      "Regjistrohuni me email dhe filloni përdorimin e platformës.",
  },
  {
    icon: FileText,
    title: "Paraqisni Ankesën",
    description:
      "Zgjidhni kategorinë dhe përshkruani problemin në detaje.",
  },
  {
    icon: CheckCircle,
    title: "Ndiqni Statusin",
    description:
      "Monitoroni progresin e ankesës tuaj.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="si-funksionon" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">SI FUNKSIONON?</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Card
              key={step.title}
              className="border-blue-100 bg-white/90 backdrop-blur shadow-md hover:shadow-xl transition"
            >
              <CardContent className="text-center py-8">
                <div className="text-blue-600 font-bold mb-2">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100">
                  <step.icon className="h-6 w-6 text-blue-600" />
                </div>

                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}