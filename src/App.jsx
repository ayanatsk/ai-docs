import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { NotoSansRegular } from "@/assets/NotoSans-Regular"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import DynamicForm from "@/components/scenario/DynamicForm"
import ResultPanel from "@/components/result/ResultPanel"
import { scenarioMap } from "@/config/scenarios"

const SCENARIOS = [
  { value: "ip_registration", label: "Регистрация ИП" },
  { value: "too_registration", label: "Регистрация ТОО" },
  { value: "employment_contract", label: "Трудовой договор" },
  { value: "power_of_attorney", label: "Доверенность" },
  { value: "vat_registration", label: "Постановка на НДС" },
]

const INITIAL_FORM_DATA = {
  fullName: "",
  iin: "",
  address: "",
  phone: "",
  email: "",
  activity: "",
  oked: "",
  founderIin: "",

  companyName: "",
  legalAddress: "",
  directorName: "",
  directorIin: "",
  founders: "",
  charterCapital: "",
  businessActivity: "",
  contactPhone: "",
  contactEmail: "",

  employer: "",
  employee: "",
  position: "",
  salary: "",
  startDate: "",

  principal: "",
  agent: "",
  authority: "",

  businessName: "",
  bin: "",
  reason: "",
}

export default function App() {
  const [scenario, setScenario] = useState("ip_registration")
  const [language, setLanguage] = useState("ru")
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [resultData, setResultData] = useState(null)
  const [rawResult, setRawResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const currentSchema = useMemo(() => {
    return scenarioMap[scenario] || { fields: [] }
  }, [scenario])

  useEffect(() => {
    setFormData(INITIAL_FORM_DATA)
    setResultData(null)
    setRawResult("")
    setError("")
  }, [scenario])

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const validateForm = () => {
    const fields = currentSchema.fields || []

    for (const field of fields) {
      if (!field.required) continue

      const value = formData[field.key]

      if (typeof value === "string" && value.trim() === "") {
        const label = field.labels?.[language] || field.labels?.ru || field.key
        return `Заполните обязательное поле: ${label}`
      }
    }

    if (scenario === "ip_registration" && formData.iin) {
      if (!/^\d{12}$/.test(formData.iin.trim())) {
        return language === "kz"
          ? "ЖСН 12 саннан тұруы керек"
          : "ИИН должен содержать 12 цифр"
      }
    }
    
    if (scenario === "too_registration") {
      return {
    scenario,
    language,
    formData: {
      companyName: formData.companyName,
      legalAddress: formData.legalAddress,
      directorName: formData.directorName,
      directorIin: formData.directorIin,
      founders: formData.founders
        .split(/\n|,/)
        .map((item) => item.trim())
        .filter(Boolean),
      founderIin: formData.founderIin,
      charterCapital: formData.charterCapital,
      businessActivity: formData.businessActivity,
      contactPhone: formData.contactPhone,
      contactEmail: formData.contactEmail,
    },
  }
}

    if (scenario === "vat_registration") {
      const hasBin = formData.bin && /^\d{12}$/.test(formData.bin.trim())
      const hasIin = formData.iin && /^\d{12}$/.test(formData.iin.trim())

      if (!hasBin && !hasIin) {
        return language === "kz"
          ? "ҚҚС сценарийі үшін БСН немесе ЖСН енгізіңіз"
          : "Для сценария НДС укажите корректный БИН или ИИН"
      }
    }

    return ""
  }

  const buildPayload = () => {
    if (scenario === "ip_registration") {
      return {
        scenario,
        language,
        formData: {
          fullName: formData.fullName,
          iin: formData.iin,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          activity: formData.activity,
          oked: formData.oked,
        },
      }
    }

    if (scenario === "too_registration") {
      return {
        scenario,
        language,
        formData: {
          companyName: formData.companyName,
          legalAddress: formData.legalAddress,
          directorName: formData.directorName,
          directorIin: formData.directorIin,
          founders: formData.founders
            .split(/\n|,/)
            .map((item) => item.trim())
            .filter(Boolean),
          charterCapital: formData.charterCapital,
          businessActivity: formData.businessActivity,
          contactPhone: formData.contactPhone,
          contactEmail: formData.contactEmail,
        },
      }
    }

    if (scenario === "employment_contract") {
      return {
        scenario,
        language,
        formData: {
          employer: formData.employer,
          employee: formData.employee,
          position: formData.position,
          salary: formData.salary,
          startDate: formData.startDate,
        },
      }
    }

    if (scenario === "power_of_attorney") {
      return {
        scenario,
        language,
        formData: {
          principal: formData.principal,
          agent: formData.agent,
          authority: formData.authority,
        },
      }
    }

    if (scenario === "vat_registration") {
      return {
        scenario,
        language,
        formData: {
          businessName: formData.businessName,
          bin: formData.bin,
          iin: formData.iin,
          reason: formData.reason,
        },
      }
    }

    return {
      scenario,
      language,
      formData: {},
    }
  }

  const handleGenerate = async () => {
    const validationError = validateForm()

    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError("")
    setResultData(null)
    setRawResult("")

    try {
      const response = await fetch("http://localhost:8080/api/generate-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildPayload()),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.errors?.join(", ") || data.message || "Ошибка запроса")
      }

      if (data?.data) {
        setResultData(data.data)
        setRawResult("")
      } else if (data?.result) {
        setRawResult(data.result)
        setResultData(null)
      } else {
        setResultData(null)
        setRawResult("")
      }
    } catch (err) {
      setError(err.message || "Произошла ошибка")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.10),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.10),_transparent_30%),linear-gradient(to_bottom,_#f8fafc,_#eef2ff_45%,_#f8fafc)]">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full border border-indigo-200 bg-white/80 px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur">
            Kazakhstan Legal AI Workspace
          </div>

          <div className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                AI Docs KZ
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600 md:text-xl">
                Генерация юридических документов, чеклистов и следующих шагов
                для ИП, ТОО, трудовых договоров, доверенностей и НДС в
                контексте Казахстана.
              </p>

              <div className="flex flex-wrap gap-2">
                <div className="rounded-full bg-slate-950 px-4 py-1.5 text-xs font-semibold text-white shadow-sm">
                  Документы
                </div>
                <div className="rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
                  RU / KZ
                </div>
                <div className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm">
                  AI + Structured Output
                </div>
              </div>
            </div>

            <Card className="overflow-hidden rounded-3xl border-white/60 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur">
              <CardContent className="p-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-100 bg-gradient-to-b from-slate-50 to-white p-4 shadow-sm">
                    <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Сценарии
                    </div>
                    <div className="mt-2 text-3xl font-bold text-slate-900">5</div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-gradient-to-b from-slate-50 to-white p-4 shadow-sm">
                    <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Языки
                    </div>
                    <div className="mt-2 text-3xl font-bold text-slate-900">2</div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-gradient-to-b from-indigo-50 to-white p-4 shadow-sm">
                    <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Формат
                    </div>
                    <div className="mt-2 text-base font-bold leading-6 text-slate-900">
                      Draft + Next Steps
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[440px_minmax(0,1fr)]">
          <Card className="h-fit rounded-3xl border-white/70 bg-white/85 shadow-[0_16px_50px_rgba(15,23,42,0.08)] backdrop-blur">
            <CardContent className="space-y-6 p-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-slate-900">
                  Конструктор документа
                </h2>
                <p className="text-sm leading-6 text-slate-500">
                  Выбери сценарий, язык и заполни необходимые поля.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-slate-700">
                    Тип документа
                  </div>
                  <Select value={scenario} onValueChange={setScenario}>
                    <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-indigo-200">
                      <SelectValue placeholder="Выберите сценарий" />
                    </SelectTrigger>
                    <SelectContent>
                      {SCENARIOS.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-semibold text-slate-700">
                    Язык
                  </div>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-indigo-200">
                      <SelectValue placeholder="Выберите язык" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ru">Русский</SelectItem>
                      <SelectItem value="kz">Қазақша</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-b from-slate-50 to-white p-4 shadow-inner">
                <DynamicForm
                  fields={currentSchema.fields || []}
                  language={language}
                  formData={formData}
                  onChange={handleChange}
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={loading}
                className="h-12 w-full rounded-2xl bg-slate-950 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700"
              >
                {loading ? "Генерация..." : "Сгенерировать через Gemini"}
              </Button>

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              ) : null}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <ResultPanel resultData={resultData} rawText={rawResult} />
          </div>
        </div>
      </div>
    </div>
  )
}