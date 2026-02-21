"use client"

import React from "react"
import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, CheckCircle2, XCircle, Search } from "lucide-react"

const statusConfig: Record<
  string,
  {
    label: string
    variant: "default" | "secondary" | "destructive" | "outline"
    icon: React.ElementType
  }
> = {
  "Në pritje": { label: "Në Pritje", variant: "secondary", icon: Clock },
  "Në shqyrtim": { label: "Në Shqyrtim", variant: "outline", icon: Search },
  Zgjidhur: { label: "Zgjidhur", variant: "default", icon: CheckCircle2 },
  Refuzuar: { label: "Refuzuar", variant: "destructive", icon: XCircle },
}

async function fetchComplaints() {
  const supabase = createClient()
  const {
    data: {user}
  }=await supabase.auth.getUser()
  if (!user) return []
  const { data, error } = await supabase
    .from("complaints")
    .select("*")
    .eq("user_id",user.id)

  if (error) throw error
  return data
}

export function MyComplaints({ mutateKey }: { mutateKey?: string }) {
  const { data: complaints, isLoading } = useSWR(
    mutateKey || "my-complaints",
    fetchComplaints,
    { refreshInterval: 10000 }
  )

  if (isLoading) {
    return (
      <Card className="border-blue-100 bg-white/90 backdrop-blur shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            Ankesat e Mia
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-blue-100 bg-white/90 backdrop-blur shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">
          Ankesat e Mia
        </CardTitle>
        <CardDescription className="text-gray-600">
          {complaints?.length
            ? `${complaints.length} ankesa gjithsëj`
            : "Nuk keni paraqitur ende ankesa"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {complaints && complaints.length > 0 ? (
          <div className="flex flex-col gap-3">
            {complaints.map((complaint) => {
              const config =
                statusConfig[complaint.status] || statusConfig["Në pritje"]
              const StatusIcon = config.icon

              return (
                <div
                  key={complaint.id}
                  className="flex flex-col gap-2 rounded-xl border border-blue-100 bg-blue-50/40 p-4 transition hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">
                      {complaint.category}
                    </span>

                    <Badge
                      variant={config.variant}
                      className="flex items-center gap-1"
                    >
                      <StatusIcon className="h-3 w-3" />
                      {config.label}
                    </Badge>
                  </div>

                  <p className="text-xs text-gray-500">{complaint.address}</p>

                  <p className="text-sm text-gray-800 line-clamp-2">
                    {complaint.details}
                  </p>

                  <p className="text-xs text-gray-500">
                    {new Date(complaint.created_at).toLocaleDateString("sq-AL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="py-6 text-center text-sm text-gray-500">
            Nuk keni asnjë ankesë. Paraqisni një ankesë të re më lart.
          </p>
        )}
      </CardContent>
    </Card>
  )
}