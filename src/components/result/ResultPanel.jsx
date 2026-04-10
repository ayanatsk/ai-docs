import { useEffect, useState } from "react"
import { jsPDF } from "jspdf"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { NotoSansRegular } from "@/assets/NotoSans-Regular"

export default function ResultPanel({ resultData, rawText }) {
  const [tab, setTab] = useState("document")
  const [message, setMessage] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState("")
  const [signatureImage, setSignatureImage] = useState(null)
  const [signatureFormat, setSignatureFormat] = useState("PNG")

  const documentTitle = resultData?.documentTitle || ""
  const documentText = resultData?.documentText || rawText || ""
  const nextSteps = resultData?.nextSteps || []
  const warnings = resultData?.warnings || []
  const complianceNotes = resultData?.complianceNotes || []

  const hasResult =
    Boolean(documentText) ||
    nextSteps.length > 0 ||
    warnings.length > 0 ||
    complianceNotes.length > 0

  useEffect(() => {
    setEditedText(documentText)
    setIsEditing(false)
    setMessage("")
  }, [documentText])

  const currentText = isEditing ? editedText : editedText || documentText

  const getSafeFileName = () => {
    return (documentTitle || "document")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .trim()
      .replace(/\s+/g, "_")
  }

  const handleCopy = async () => {
    if (!currentText) {
      setMessage("Нет текста")
      return
    }

    try {
      await navigator.clipboard.writeText(currentText)
      setMessage("Скопировано")
    } catch {
      setMessage("Не удалось скопировать")
    }
  }

  const handleSignatureUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const type = file.type.toLowerCase()
    const isSupported =
      type.includes("png") || type.includes("jpeg") || type.includes("jpg")

    if (!isSupported) {
      setMessage("Загрузи PNG или JPG")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setSignatureImage(reader.result)

      if (type.includes("png")) {
        setSignatureFormat("PNG")
      } else {
        setSignatureFormat("JPEG")
      }

      setMessage("Подпись загружена")
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveSignature = () => {
    setSignatureImage(null)
    setSignatureFormat("PNG")
    setMessage("Подпись удалена")
  }

  const handleDownloadTxt = () => {
    if (!currentText) {
      setMessage("Нет текста для скачивания")
      return
    }

    const blob = new Blob([currentText], {
      type: "text/plain;charset=utf-8",
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${getSafeFileName() || "document"}.txt`
    a.click()
    URL.revokeObjectURL(url)

    setMessage("TXT скачан")
  }

  const handleDownloadPdf = () => {
    if (!currentText) {
      setMessage("Нет текста для PDF")
      return
    }

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      doc.addFileToVFS("NotoSans-Regular.ttf", NotoSansRegular)
      doc.addFont("NotoSans-Regular.ttf", "NotoSans", "normal")
      doc.setFont("NotoSans", "normal")

      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 15
      const maxWidth = pageWidth - margin * 2

      let y = margin

      if (documentTitle) {
        doc.setFont("NotoSans", "normal")
        doc.setFontSize(14)
        const titleLines = doc.splitTextToSize(documentTitle, maxWidth)
        doc.text(titleLines, margin, y)
        y += titleLines.length * 7 + 6
      }

      doc.setFont("NotoSans", "normal")
      doc.setFontSize(11)

      const lines = doc.splitTextToSize(currentText, maxWidth)

      lines.forEach((line) => {
        if (y > pageHeight - 30) {
          doc.addPage()
          doc.setFont("NotoSans", "normal")
          doc.setFontSize(11)
          y = margin
        }

        doc.text(line, margin, y)
        y += 6
      })

      if (signatureImage) {
        if (y > pageHeight - 45) {
          doc.addPage()
          y = margin
        }

        y += 8
        doc.setFont("NotoSans", "normal")
        doc.setFontSize(11)
        doc.text("Подпись:", margin, y)
        y += 4

        doc.addImage(signatureImage, signatureFormat, margin, y, 50, 20)
      }

      doc.save(`${getSafeFileName() || "document"}.pdf`)
      setMessage("PDF скачан")
    } catch (error) {
      console.error(error)
      setMessage("Ошибка при создании PDF")
    }
  }

  const handleStartEditing = () => {
    setEditedText(documentText)
    setIsEditing(true)
    setTab("document")
    setMessage("Режим редактирования включён")
  }

  const handleSaveEditing = () => {
    setIsEditing(false)
    setMessage("Изменения сохранены")
  }

  const handleCancelEditing = () => {
    setEditedText(documentText)
    setIsEditing(false)
    setMessage("Изменения отменены")
  }

  if (!hasResult) {
    return (
      <Card className="rounded-3xl border-slate-200 shadow-md">
        <CardContent className="p-6 text-sm text-slate-500">
          Здесь появится результат после генерации
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-3xl border-slate-200 shadow-lg">
        <CardContent className="space-y-5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs text-slate-500">Результат</div>
              {documentTitle ? (
                <h2 className="text-2xl font-semibold text-slate-900">
                  {documentTitle}
                </h2>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              {!isEditing ? (
                <Button variant="outline" onClick={handleStartEditing}>
                  Редактировать
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={handleSaveEditing}>
                    Сохранить
                  </Button>
                  <Button variant="outline" onClick={handleCancelEditing}>
                    Отмена
                  </Button>
                </>
              )}

              <Button variant="outline" onClick={handleCopy}>
                Копировать
              </Button>
              <Button variant="outline" onClick={handleDownloadTxt}>
                Скачать TXT
              </Button>
              <Button variant="outline" onClick={handleDownloadPdf}>
                Скачать PDF
              </Button>
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm font-medium text-slate-700">
              Подпись для PDF
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleSignatureUpload}
                className="text-sm"
              />

              {signatureImage ? (
                <Button variant="outline" onClick={handleRemoveSignature}>
                  Удалить подпись
                </Button>
              ) : null}
            </div>

            {signatureImage ? (
              <div className="space-y-2">
                <div className="text-xs text-slate-500">Превью подписи</div>
                <div className="inline-flex rounded-xl border bg-white p-3 shadow-sm">
                  <img
                    src={signatureImage}
                    alt="Подпись"
                    className="max-h-20 max-w-[220px] object-contain"
                  />
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400">
                Можно загрузить PNG или JPG, и подпись появится в PDF.
              </div>
            )}
          </div>

          {message ? (
            <div className="text-xs text-green-600">{message}</div>
          ) : null}

          <div className="flex flex-wrap gap-2 border-b pb-2">
            {[
              { key: "document", label: "Документ" },
              { key: "steps", label: "Шаги" },
              { key: "warnings", label: "Риски" },
              { key: "notes", label: "Юр. замечания" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`rounded-lg px-3 py-1 text-sm transition ${
                  tab === item.key
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {tab === "document" ? (
            <Textarea
              value={currentText}
              onChange={(e) => setEditedText(e.target.value)}
              readOnly={!isEditing}
              className="min-h-[350px] rounded-2xl border-slate-200"
            />
          ) : null}

          {tab === "steps" && nextSteps.length > 0 ? (
            <div className="space-y-2">
              {nextSteps.map((step, i) => (
                <div key={i} className="rounded-xl bg-slate-50 p-3 text-sm">
                  {i + 1}. {step}
                </div>
              ))}
            </div>
          ) : null}

          {tab === "warnings" && warnings.length > 0 ? (
            <div className="space-y-2">
              {warnings.map((w, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
                >
                  ⚠ {w}
                </div>
              ))}
            </div>
          ) : null}

          {tab === "notes" && complianceNotes.length > 0 ? (
            <div className="space-y-2">
              {complianceNotes.map((n, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-blue-50 p-3 text-sm text-blue-700"
                >
                  {n}
                </div>
              ))}
            </div>
          ) : null}

          {tab === "steps" && nextSteps.length === 0 ? (
            <div className="text-sm text-slate-400">Нет данных</div>
          ) : null}

          {tab === "warnings" && warnings.length === 0 ? (
            <div className="text-sm text-slate-400">Нет рисков</div>
          ) : null}

          {tab === "notes" && complianceNotes.length === 0 ? (
            <div className="text-sm text-slate-400">Нет замечаний</div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}