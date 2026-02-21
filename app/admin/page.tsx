"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LogOut, Loader2, ShieldAlert, FileText, Users } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [dataLoading, setDataLoading] = useState(true)

  const [users, setUsers] = useState<any[]>([])
  const [complaints, setComplaints] = useState<any[]>([])

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/auth/login")
        return
      }

      if (!user.user_metadata?.is_admin) {
        router.push("/protected")
        return
      }

      setLoading(false)
    })
  }, [router])

  useEffect(() => {
    async function fetchData() {
      setDataLoading(true)

      try {
        const res = await fetch("/api/admin/data")
        const json = await res.json()

        setUsers(json.users ?? [])
        setComplaints(json.complaints ?? [])
      } catch (err) {
        console.error("Admin fetch error:", err)
        setUsers([])
        setComplaints([])
      }

      setDataLoading(false)
    }

    fetchData()
  }, [])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  if (loading || dataLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      </div>
    )
  }

  function renderTable(data: any[]) {
    if (!data || data.length === 0) {
      return <p className="text-muted-foreground">Nuk ka të dhëna.</p>
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="border px-2 py-1 text-left">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((val, j) => (
                  <td key={j} className="border px-2 py-1">
                    {val === null ? "-" : String(val)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 lg:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <ShieldAlert className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Paneli i Administrimit
              </h1>
              <p className="text-sm text-muted-foreground">
                Menaxhoni ankesat dhe përdoruesit
              </p>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Dil
          </Button>
        </div>

        <Tabs defaultValue="complaints">
          <TabsList className="mb-6">
            <TabsTrigger value="complaints" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Ankesat
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Përdoruesit
            </TabsTrigger>
          </TabsList>

          <TabsContent value="complaints">
            {renderTable(complaints)}
          </TabsContent>

          <TabsContent value="users">
            {renderTable(users)}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}