"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, SendHorizonal } from "lucide-react"

const categories = [
  "Urbanistikë",
  "Mjedisi",
  "Arsimi",
  "Infrastrukturë",
  "Shëndetësi",
  "Siguria Publike",
  "Tjetër",
]

interface ComplaintFormProps {
  userId: string
  onSuccess?: () => void
}

export function ComplaintForm({ userId, onSuccess }: ComplaintFormProps) {
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const address = formData.get("address") as string
    const details = formData.get("details") as string

    if (!category) {
      toast.error("Ju lutem zgjidhni kategorinë.")
      return
    }
    if (!address) {
      toast.error("Ju lutem vendosni adresën.")
      return
    }
    if (!details) {
      toast.error("Ju lutem përshkruani problemin.")
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.from("complaints").insert({
      user_id: userId,
      category,
      address,
      details,
    })

    if (error) {
      toast.error("Gabim gjatë dergimit të ankesës: " + error.message)
      setLoading(false)
      return
    }

    toast.success("Ankesa u dërgua me sukses!")
    setCategory("")
    e.currentTarget.reset()
    setLoading(false)
    onSuccess?.()
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">
          Ankesa e Re
        </CardTitle>
        <CardDescription>
          Plotësoni formularin më poshtë për të paraqitur ankesën tuaj.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Kategoria *</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Zgjidhni kategorine" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="address">Adresa *</Label>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="Vendndodhja e problemit"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="details">Detajet *</Label>
            <Textarea
              id="details"
              name="details"
              placeholder="Pershkruani problemin ne detaje..."
              rows={5}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Duke derguar...
              </>
            ) : (
              <>
                <SendHorizonal className="mr-2 h-4 w-4" />
                Dergo Ankesën
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
