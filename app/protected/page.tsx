"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/navbar"
import { ComplaintForm } from "@/components/complaint-form"
import { MyComplaints } from "@/components/my-complaints"
import { Button } from "@/components/ui/button"
import { LogOut, Loader2 } from "lucide-react"
import type { User } from "@supabase/supabase-js"
import { useSWRConfig } from "swr"

export default function ProtectedPage() {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/auth/login")
        return
      }
      setUser(user)
      setLoading(false)
    })
  }, [router])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      </div>
    )
  }

  const fullName = user?.user_metadata?.full_name || "Perdorues"

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 lg:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Pershendetje, {fullName}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Paraqisni dhe ndiqni ankesat tuaja ketu.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Dil
          </Button>
        </div>

        <div className="flex flex-col gap-6">
          <ComplaintForm
            userId={user!.id}
            onSuccess={() => mutate("my-complaints")}
          />
          <MyComplaints mutateKey="my-complaints" />
        </div>
      </main>
    </div>
  )
}
