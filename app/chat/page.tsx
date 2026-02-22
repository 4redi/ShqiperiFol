"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { ComplaintForm } from "@/components/complaint-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function ProtectedPage({ userId }) {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [loadingAI, setLoadingAI] = useState(false)

  const municipality = "Tirane" // you can make it dynamic

  // For AI → complaint field
  const [details, setDetails] = useState("")

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
        toast.error(data.error || "Gabim gjatë AI")
      } else {
        setResult(data.result)
        setDetails(data.result) // fills complaint form
      }
    } catch (err) {
      console.error(err)
      toast.error("AI error")
    }

    setLoadingAI(false)
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen p-8 max-w-2xl mx-auto flex flex-col gap-8">

        {/* AI Section */}
        <Card>
          <CardHeader>
            <CardTitle>Riformulimi i ankesës me AI</CardTitle>
            <CardDescription>Shkruani problemin dhe AI do ta përmirësojë.</CardDescription>
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

            {result && (
              <div className="p-4 border rounded-lg bg-gray-50">
                <h2 className="font-semibold mb-2">Versioni i përmirësuar:</h2>
                <p>{result}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Complaint Form */}
        <ComplaintForm
          userId={userId}
          municipality={municipality}
          initialDetails={details} // AI text goes here
        />

      </div>
    </>
  )
}