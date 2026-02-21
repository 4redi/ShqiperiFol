"use client"

import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
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
import { Trash2 } from "lucide-react"

interface Profile {
  id: string
  full_name: string
  created_at: string
}

async function fetchProfiles(): Promise<Profile[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Profile[]
}

export function UsersTable() {
  const { data: profiles, isLoading, mutate } = useSWR(
    "admin-users",
    fetchProfiles
  )

  async function handleDelete(id: string) {
    const supabase = createClient()
    const { error } = await supabase.from("profiles").delete().eq("id", id)

    if (error) {
      toast.error("Gabim gjate fshirjes se perdoruesit: " + error.message)
      return
    }
    toast.success("Profili u fshi.")
    mutate()
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  if (!profiles || profiles.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Nuk ka perdorues te regjistruar.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="text-foreground">Emri i Plote</TableHead>
            <TableHead className="text-foreground">ID</TableHead>
            <TableHead className="text-foreground">Data e Regjistrimit</TableHead>
            <TableHead className="text-right text-foreground">Veprime</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((profile) => (
            <TableRow key={profile.id}>
              <TableCell className="font-medium text-foreground">
                {profile.full_name}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {profile.id.slice(0, 8)}...
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(profile.created_at).toLocaleDateString("sq-AL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleDelete(profile.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Fshi perdoruesin</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
