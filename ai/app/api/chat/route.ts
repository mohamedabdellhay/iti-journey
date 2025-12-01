import OpenAI from "openai"

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // التحقق من وجود الرسائل
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }

    // تحويل الرسائل للـ OpenAI format
    const chatMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.parts.map((p: any) => p.text).join(""),
    }))

    // طلب الرد من OpenAI
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages,
    })

    const assistantMessage = response.choices[0].message

    // رجع كل الرسائل + الرد
    return new Response(
      JSON.stringify([
        ...messages,
        {
          id: crypto.randomUUID(), // استخدم UUID بدل ID من OpenAI
          role: assistantMessage.role,
          parts: [{ type: "text", text: assistantMessage.content }],
        },
      ]),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (error: any) {
    console.error("OpenAI API Error:", error)
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to process chat request",
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    )
  }
}