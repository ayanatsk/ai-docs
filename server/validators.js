function isNonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0
}

function looksLikeIIN(value) {
  return /^\\d{12}$/.test(String(value || ""))
}

function looksLikeBIN(value) {
  return /^\\d{12}$/.test(String(value || ""))
}
export const validateIIN = (iin) => {
  return /^\d{12}$/.test(iin)
}

export const validatePhone = (phone) => {
  return /^\+7\d{10}$/.test(phone.replace(/\s/g, ""))
}
export function validateScenarioInput({ scenario, language, formData }) {
  const errors = []

  if (!isNonEmpty(scenario)) errors.push("Scenario is required")
  if (!["ru", "kz"].includes(language)) errors.push("Language must be ru or kz")
  if (!formData || typeof formData !== "object") errors.push("formData is required")
    
  if (scenario === "ip_registration") {
  if (!isNonEmpty(formData?.fullName)) errors.push("fullName is required")
  if (!String(formData?.iin || "").match(/^\d{12}$/)) errors.push("IIN must contain 12 digits")
  if (!isNonEmpty(formData?.activity)) errors.push("activity is required")
}

  if (scenario === "too_registration") {
    if (!isNonEmpty(formData?.companyName)) errors.push("companyName is required")
    if (!isNonEmpty(formData?.directorName)) errors.push("directorName is required")
    if (!Array.isArray(formData?.founders) || formData.founders.length === 0) {
      errors.push("At least one founder is required")
    }
  }

  if (scenario === "employment_contract") {
    if (!isNonEmpty(formData?.employer)) errors.push("employer is required")
    if (!isNonEmpty(formData?.employee)) errors.push("employee is required")
    if (!isNonEmpty(formData?.position)) errors.push("position is required")
  }

  if (scenario === "power_of_attorney") {
    if (!isNonEmpty(formData?.principal)) errors.push("principal is required")
    if (!isNonEmpty(formData?.agent)) errors.push("agent is required")
    if (!isNonEmpty(formData?.authority)) errors.push("authority is required")
  }

  if (scenario === "vat_registration") {
    if (!isNonEmpty(formData?.businessName)) errors.push("businessName is required")
    if (!looksLikeBIN(formData?.bin) && !looksLikeIIN(formData?.iin)) {
      errors.push("BIN or IIN is required")
    }
  }

  return {
    ok: errors.length === 0,
    errors,
  }
}