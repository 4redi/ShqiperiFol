import { createAdminClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createAdminClient() 

  const { data: authData, error: usersError } =
    await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 })

  const { data: complaints, error: complaintsError } =
    await supabase.from("complaints").select("*").limit(1000)

  if (usersError || complaintsError) {
    return new Response(
      JSON.stringify({
        usersError: usersError?.message,
        complaintsError: complaintsError?.message,
      }),
      { status: 500 }
    )
  }

  return Response.json({
    users: authData?.users ?? [],
    complaints: complaints ?? [],
  })
}