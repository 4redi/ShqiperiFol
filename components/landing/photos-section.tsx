"use client"

import { Card } from "@/components/ui/card"
import { Building2, TreePine, GraduationCap, HardHat } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner" // optional: for toast notifications

const categories = [
  {
    icon: Building2,
    title: "Urbanistikë",
    description: "Planifikim urban, ndërtesa, rrugë",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: TreePine,
    title: "Mjedisi",
    description: "Mbrojtja e mjedisit, parqe, pastrim",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: GraduationCap,
    title: "Arsimi",
    description: "Shkolla, universitete, infrastrukturë arsimore",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    icon: HardHat,
    title: "Infrastrukturë",
    description: "Rrugë, ura, sisteme ujore",
    color: "bg-orange-100 text-orange-700",
  },
]

export function PhotosSection() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    fetchUser()
  }, [])

  const handleCardClick = () => {
    if (user) {
      router.push("/protected") // redirect to Ankesat e Mia
    } else {
      toast.error("Ju duhet të jeni të kyçur për të parë ankesat tuaja!")
      router.push("/auth/login") // optional: redirect to login
    }
  }

  return (
    <section
      id="rreth-nesh"
      className="bg-gradient-to-b from-blue-50 via-white to-indigo-50 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            KATEGORITË E ANKESAVE
          </h2>
          <p className="mt-3 text-gray-600">
            Zgjidhni fushën që përkon me problemin tuaj për një trajtim më të shpejtë.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Card
              key={cat.title}
              className="group cursor-pointer border-blue-100 bg-white/90 backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-xl"
              onClick={handleCardClick}
            >
              <div className="flex flex-col items-center px-5 py-8 text-center">
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${cat.color}`}
                >
                  <cat.icon className="h-7 w-7" />
                </div>

                <h3 className="mb-1 font-semibold text-gray-900">{cat.title}</h3>
                <p className="text-sm text-gray-600">{cat.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}