import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function DynamicForm({
  fields = [],
  language = "ru",
  formData = {},
  onChange,
}) {
  const lang = language === "kz" ? "kz" : "ru"

  const handleFieldChange = (key, value) => {
    if (typeof onChange === "function") {
      onChange(key, value)
    }
  }

  return (
    <div className="space-y-4">
      {fields.map((field) => {
        const label = field.labels?.[lang] || field.labels?.ru || field.key
        const placeholder =
          field.placeholders?.[lang] || field.placeholders?.ru || ""
        const value = formData[field.key] || ""

        if (field.type === "textarea") {
          return (
            <div key={field.key} className="space-y-2">
              <div className="text-sm font-semibold text-slate-800">
                {label} {field.required ? "*" : ""}
              </div>
              <Textarea
                value={value}
                placeholder={placeholder}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                className="min-h-[120px] rounded-2xl border-slate-200 bg-white shadow-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-200"
              />
            </div>
          )
        }

        if (field.type === "select") {
          return (
            <div key={field.key} className="space-y-2">
              <div className="text-sm font-semibold text-slate-800">
                {label} {field.required ? "*" : ""}
              </div>
              <Select
                value={value}
                onValueChange={(selectedValue) =>
                  handleFieldChange(field.key, selectedValue)
                }
              >
                <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-indigo-200">
                  <SelectValue placeholder={placeholder || label} />
                </SelectTrigger>
                <SelectContent>
                  {(field.options || []).map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.labels?.[lang] || option.labels?.ru || option.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )
        }

        return (
          <div key={field.key} className="space-y-2">
            <div className="text-sm font-semibold text-slate-800">
              {label} {field.required ? "*" : ""}
            </div>
            <Input
              value={value}
              placeholder={placeholder}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              className="h-12 rounded-2xl border-slate-200 bg-white shadow-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-200"
            />
          </div>
        )
      })}
    </div>
  )
}