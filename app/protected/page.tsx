"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ComplaintForm } from "@/components/complaint-form"
import { MyComplaints } from "@/components/my-complaints"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { LogOut, Loader2 } from "lucide-react"
import type { User } from "@supabase/supabase-js"
import { useSWRConfig } from "swr"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const municipalities = [
  "Tirana",
  "Durrës",
  "Vlorë",
  "Shkodër",
  "Fier",
  "Berat",
  "Korçë",
  "Elbasan",
  "Dibër",
  "Himare",
  "Sarandë",
  "Pogradec",
  "Kavajë",
  "Lushnjë",
  "Kruja",
  "Laç",
  "Mamurras",
  "Kuçovë",
  "Berr",
  "Peqin",
  "Çorovodë",
  "Tepelenë",
  "Librazhd",
  "Gramsh",
  "Poliçan",
  "Bulqizë",
  "Mirditë",
  "Kurbin",
  "Mat",
  "Krujë",
  "Shijak",
  "Rrogozhinë",
  "Ura Vajgurore",
  "Divjakë",
  "Selenicë",
  "Finiq",
  "Konispol",
  "Dropull",
  "Përmet",
  "Këlcyrë",
  "Devoll",
  "Kolonyë",
  "Pustec",
  "Maliq",
  "Libohovë",
  "Ersekë",
  "Skrapar",
  "Memaliaj",
  "Delvinë",
  "Gjirokastër",
  "Tropojë",
  "Has",
  "Vau i Dejës",
  "Burrel",
  "Klos",
  "Ulëz",
  "Rubik",
  "Rrëshen",
  "Lezhë",
  "Shëngjin",
  "Dajç",
  "Koplik",
  "Fushë-Arrëz",
  "Pukë",
  "Fierzë",
  "Koman",
  "Bajram Curri",
  "Bytyç",
  "Razëm",
  "Fushë-Krujë",
  "Vorë",
  "Patos",
  "Roskovec",
  "Ballsh",
  "Prrenjas",
  "Cërrik",
  "Belsh"
]

export default function ProtectedPage() {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [municipality, setMunicipality] = useState("Tiranë")

  // AI + ComplaintForm state
  const [input, setInput] = useState("")
  const [aiResult, setAIResult] = useState("")
  const [loadingAI, setLoadingAI] = useState(false)

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

  async function handleAI() {
    if (!input) return

    setLoadingAI(true)

    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        alert(data.error || "Gabim gjatë AI")
      } else {
        setAIResult(data.result)
      }
    } catch (err) {
      console.error(err)
      alert("Gabim gjatë AI")
    }

    setLoadingAI(false)
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    )
  }

  const fullName = user?.user_metadata?.full_name || "Përdorues"

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-8 lg:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Përshëndetje, {fullName}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Paraqisni dhe ndiqni ankesat tuaja këtu.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Dil
          </Button>
        </div>

        {/* Municipality selection */}
        <div className="mb-6">
          <Label className="text-sm font-medium">Komuna</Label>
          <Select value={municipality} onValueChange={setMunicipality}>
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Zgjidhni komunën" />
            </SelectTrigger>
            <SelectContent>
              {municipalities.map((mun) => (
                <SelectItem key={mun} value={mun}>
                  {mun}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* AI Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Riformulimi i ankesës me AI</CardTitle>
            <CardDescription>
              Shkruani problemin dhe AI do ta përmirësojë.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Textarea
              rows={5}
              placeholder="Shkruani ankesën tuaj..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              onClick={handleAI}
              disabled={!input || loadingAI}
              className="bg-blue-600"
            >
              {loadingAI ? "Duke përmirësuar..." : "Përmirëso me AI"}
            </Button>

            {aiResult && (
              <div className="p-4 border rounded-lg bg-gray-50">
                <h2 className="font-semibold mb-2">Versioni i përmirësuar:</h2>
                <p>{aiResult}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Complaint Form */}
        <div className="flex flex-col gap-6">
          <ComplaintForm
            userId={user!.id}
            municipality={municipality}
            initialDetails={aiResult}
            onSuccess={() => mutate("my-complaints")}
          />
          <MyComplaints mutateKey="my-complaints" />
        </div>
      </main>

      <Footer />
    </div>
  )
}