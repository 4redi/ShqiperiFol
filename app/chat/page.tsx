"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"

export default function ChatPage() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
  if (!input) return
  setLoading(true)
  setResult("")

  try {
    const res = await fetch("/api/rewrite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    })

    const data = await res.json()

    if (!res.ok || data.error) {
      setResult(data.error || "Dicka shkoi gabim")
    } else {
      setResult(data.result)
    }
  } catch (err) {
    console.error(err)
    setResult("Something went wrong. Check server or quota.")
  }

  setLoading(false)
}

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Riformulimi i ankesës</h1>

        <textarea
          className="w-full border rounded-lg p-3 mb-4"
          rows={5}
          placeholder="Shkruani ankesën tuaj..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSubmit()
            }
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={!input || loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Duke u përmirësuar ..." : "Teksti i përmirësuar"}
        </button>

        {result && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h2 className="font-semibold mb-2">Versioni i  përmirësuar:</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </>
  )
}