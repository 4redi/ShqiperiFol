"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function SignUpPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const fullName = formData.get("full_name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!fullName || !email || !password) {
      toast.error("Ju lutem plotësoni të gjitha fushat.")
      return
    }

    if (password.length < 6) {
      toast.error("Fjalekalimi duhet të ketë të paktën 8 karaktere.")
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }

    toast.success("Llogaria u krijua me sukses!")
    router.push("/protected")
    router.refresh()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              Krijoni Llogarinë
            </CardTitle>
            <CardDescription>
              Regjistrohuni për të paraqitur ankesat tuaja
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="full_name">Emri i Plotë</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="Emri Mbiemri"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="emri@email.com"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Fjalekalimi</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Minimumi 8 karaktere"
                  required
                  minLength={8}
                />
              </div>
              <Button type="submit" className="mt-2 w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Duke u regjistruar...
                  </>
                ) : (
                  "Regjistrohu"
                )}
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {"Keni një llogari? "}
              <Link
                href="/auth/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Hyr
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
