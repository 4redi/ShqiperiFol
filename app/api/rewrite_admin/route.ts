import OpenAI from "openai"

export const runtime = "nodejs"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message || message.trim() === "") {
      return Response.json(
        { error: "No message provided" },
        { status: 400 }
      )
    }

    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: `
Je asistent profesional për administratë publike.

Analizo ankesën më poshtë dhe jep:

1. Përmbledhje të shkurtër të problemit
2. Hapat konkret për zgjidhje
3. Departamenti përgjegjës
4. Niveli i prioritetit (LOW / MEDIUM / HIGH)
5. Koha e rekomanduar për zgjidhje

Ankesa:
"${message}"

Përdor gjuhë zyrtare, të qartë, me pika të shkurtra.
Mos shto shpjegime të panevojshme.
`,
    })

    const output = response.output_text || "No output from AI"

    return Response.json({ result: output })

  } catch (error: any) {
    console.error("OpenAI API error:", error)

    if (error.code === "insufficient_quota") {
      return Response.json(
        { error: "OpenAI quota exceeded. Please add credits or try later." },
        { status: 429 }
      )
    }

    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}