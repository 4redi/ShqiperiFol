import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message || message.trim() === "") {
      return Response.json({ error: "Message required" }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { error } = await supabase.from("lajmerime").insert({
      message,
      created_by: user?.id,
    })

    if (error) throw error

    return Response.json({ success: true })
  } catch (error) {
    console.error(error)
    return Response.json({ error: "Server error" }, { status: 500 })
  }
}