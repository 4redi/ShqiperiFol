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
];

export default function ProtectedPage() {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [municipality, setMunicipality] = useState("Tiranë")

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

        <div className="flex flex-col gap-6">
          <ComplaintForm
            userId={user!.id}
            municipality={municipality}
            onSuccess={() => mutate("my-complaints")}
          />
          <MyComplaints mutateKey="my-complaints" />
        </div>
      </main>

      <Footer />
    </div>
  )
}