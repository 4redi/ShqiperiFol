"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LogOut, Loader2, ShieldAlert, FileText, Users ,FileExclamationPoint,Bot,Bell} from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [dataLoading, setDataLoading] = useState(true)
const [aiInput, setAiInput] = useState("")
const [aiResult, setAiResult] = useState("")
const [aiLoading, setAiLoading] = useState(false)
const [notifyText, setNotifyText] = useState("")
const [notifyLoading, setNotifyLoading] = useState(false)
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

  const priorityKeywords = [
  "gropa",
  "grope",
  "gropat",
  "mbeturina",
  "puset",
  "puseta"
]

const priorityComplaints = complaints.filter((complaint) => {
  const text = Object.values(complaint)
    .join(" ")
    .toLowerCase()

  return priorityKeywords.some((word) =>
    text.includes(word.toLowerCase())
  )
})

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
  async function analyzeWithAI() {
  if (!aiInput.trim()) return

  setAiLoading(true)
  setAiResult("")

  try {
    const res = await fetch("/api/rewrite_admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: aiInput }),
    })

    const data = await res.json()

    if (!res.ok) {
      setAiResult(data.error || "Error")
    } else {
      setAiResult(data.result)
    }
  } catch (error) {
    setAiResult("Server error")
  }

  setAiLoading(false)
}

async function sendNotification() {
  if (!notifyText.trim()) return

  setNotifyLoading(true)

  const res = await fetch("/api/lajmerime", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: notifyText }),
  })

  const data = await res.json()

  if (!res.ok) {
    alert(data.error)
  } else {
    alert("Njoftimi u ruajt me sukses!")
    setNotifyText("")
  }

  setNotifyLoading(false)
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
            <TabsTrigger value="complaints-priority" className="flex items-center gap-2">
              <FileExclamationPoint className="h-4 w-4" />
              Ankesat prioritare
            </TabsTrigger>

            <TabsTrigger value="chat" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Flisni me AI
            </TabsTrigger>

            <TabsTrigger value="notify" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Lajmëroni qytetarët
            </TabsTrigger>
          </TabsList>

          <TabsContent value="complaints">
            {renderTable(complaints)}
          </TabsContent>

          <TabsContent value="users">
  {renderTable(
    users.map((user) => ({
      email: user.email
    }))
  )}
</TabsContent>

          <TabsContent value="complaints-priority">
  {renderTable(priorityComplaints)}
</TabsContent>

          <TabsContent value="chat">
  <div className="space-y-4 max-w-3xl">

    <textarea
      className="w-full border rounded-md p-3 min-h-[120px]"
      placeholder="Shkruani ose vendosni ankesën këtu..."
      value={aiInput}
      onChange={(e) => setAiInput(e.target.value)}
    />

    <Button onClick={analyzeWithAI} disabled={aiLoading}>
      {aiLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Duke analizuar...
        </>
      ) : (
        "Analizo me AI"
      )}
    </Button>

    {aiResult && (
      <div className="border rounded-md p-4 bg-muted whitespace-pre-wrap">
        {aiResult}
      </div>
    )}
  </div>
</TabsContent>

<TabsContent value="notify">
  <div className="space-y-4 max-w-2xl">
    <textarea
      className="w-full border rounded-md p-3 min-h-[120px]"
      placeholder="Shkruani njoftimin për qytetarët..."
      value={notifyText}
      onChange={(e) => setNotifyText(e.target.value)}
    />

    <Button onClick={sendNotification} disabled={notifyLoading}>
      {notifyLoading ? "Duke ruajtur..." : "Publiko njoftimin"}
    </Button>
  </div>
</TabsContent>
        </Tabs>
      </main>
    </div>
  )
}