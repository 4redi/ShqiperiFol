"use client"

import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Trash2 } from "lucide-react"

interface Complaint {
  id: string
  user_id: string
  category: string
  address: string
  details: string
  status: string
  created_at: string
  profiles: { full_name: string } | null
}

const statusVariants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  "Ne pritje": "secondary",
  "Ne shqyrtim": "outline",
  "Zgjidhur": "default",
  "Refuzuar": "destructive",
}

async function fetchAllComplaints(): Promise<Complaint[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("complaints")
    .select("*, profiles(full_name)")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Complaint[]
}

export function ComplaintsTable() {
  const { data: complaints, isLoading, mutate } = useSWR(
    "admin-complaints",
    fetchAllComplaints
  )

  async function handleStatusChange(id: string, newStatus: string) {
    const supabase = createClient()
    const { error } = await supabase
      .from("complaints")
      .update({ status: newStatus })
      .eq("id", id)

    if (error) {
      toast.error("Gabim gjate ndryshimit te statusit.")
      return
    }
    toast.success("Statusi u ndryshua.")
    mutate()
  }

  async function handleDelete(id: string) {
    const supabase = createClient()
    const { error } = await supabase.from("complaints").delete().eq("id", id)

    if (error) {
      toast.error("Gabim gjatë fshirjes.")
      return
    }
    toast.success("Ankesa u fshi.")
    mutate()
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  if (!complaints || complaints.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Nuk ka ankesa për momentin.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="text-foreground">Emri</TableHead>
            <TableHead className="text-foreground">Kategoria</TableHead>
            <TableHead className="text-foreground">Adresa</TableHead>
            <TableHead className="max-w-[200px] text-foreground">Detajet</TableHead>
            <TableHead className="text-foreground">Statusi</TableHead>
            <TableHead className="text-foreground">Data</TableHead>
            <TableHead className="text-right text-foreground">Veprime</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complaints.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="whitespace-nowrap font-medium text-foreground">
                {c.profiles?.full_name || "N/A"}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{c.category}</Badge>
              </TableCell>
              <TableCell className="max-w-[120px] truncate text-sm">
                {c.address}
              </TableCell>
              <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                {c.details}
              </TableCell>
              <TableCell>
                <Select
                  defaultValue={c.status}
                  onValueChange={(v) => handleStatusChange(c.id, v)}
                >
                  <SelectTrigger className="h-8 w-[130px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusVariants).map(([status, variant]) => (
                      <SelectItem key={status} value={status}>
                        <Badge variant={variant} className="pointer-events-none">
                          {status}
                        </Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                {new Date(c.created_at).toLocaleDateString("sq-AL")}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleDelete(c.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Fshi ankesën</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
