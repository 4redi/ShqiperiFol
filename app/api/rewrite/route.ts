import OpenAI from "openai"

export const runtime = "nodejs" 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
})

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message) {
      return Response.json({ error: "No message provided" }, { status: 400 })
    }

    const response = await openai.responses.create({
      model: "gpt-5-nano", 
      input: `Rewrite this complaint professionally and clearly:\n\n${message}. Write the message diretcly, use proffesional grammar. Don't use placeholders, USE JUST THE ALBANIAN LANGUAGE, short simple clean. Remember it should be user friendly, again in albanian`,
      store: true,
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
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}