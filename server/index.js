import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import fetch from "node-fetch"
import { buildDocumentPrompt } from "./prompts.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080
const GEMINI_API_KEY = process.env.GEMINI_API_KEY

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY не задан")
}

function cleanMarkdown(text = "") {
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .replace(/^#{1,6}\s?/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .trim()
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

function extractJson(text) {
  // пробуем вытащить JSON если модель вернула мусор
  const match = text.match(/\{[\s\S]*\}/)
  if (!match) return null

  return safeJsonParse(match[0])
}
async function generateWithGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Gemini API error: ${text}`)
  }

  const data = await response.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ""

  return text
}

app.post("/api/generate-document", async (req, res) => {
  try {
    const { scenario, language, formData } = req.body

    if (!scenario || !formData) {
      return res.status(400).json({
        message: "Invalid request",
      })
    }

    const prompt = buildDocumentPrompt({
      scenario,
      language,
      formData,
    })

    const rawText = await generateWithGemini(prompt)


    let parsed = safeJsonParse(rawText)
    if (!parsed) {
      parsed = extractJson(rawText)
    }
    if (!parsed) {
      return res.json({
        result: cleanMarkdown(rawText),
      })
    }

    parsed.documentTitle = cleanMarkdown(parsed.documentTitle || "")
    parsed.documentText = cleanMarkdown(parsed.documentText || "")

    parsed.nextSteps = Array.isArray(parsed.nextSteps)
      ? parsed.nextSteps.map((item) => cleanMarkdown(item))
      : []

    parsed.warnings = Array.isArray(parsed.warnings)
      ? parsed.warnings.map((item) => cleanMarkdown(item))
      : []

    parsed.complianceNotes = Array.isArray(parsed.complianceNotes)
      ? parsed.complianceNotes.map((item) => cleanMarkdown(item))
      : []

    return res.json({
      data: parsed,
    })
  } catch (error) {
    console.error("❌ ERROR:", error)

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    })
  }
})


app.get("/", (req, res) => {
  res.send("AI Docs KZ API is running")
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})