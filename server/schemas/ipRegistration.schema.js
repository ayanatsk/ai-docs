export const ipRegistrationSchema = {
  scenario: "ip_registration",
  labels: {
    ru: "Регистрация ИП",
    kz: "ЖК тіркеу",
  },
  type: "document",
  fields: [
    {
      key: "fullName",
      type: "text",
      required: true,
      labels: {
        ru: "ФИО заявителя",
        kz: "Өтініш берушінің аты-жөні",
      },
      placeholders: {
        ru: "Например: Шарипова Ая",
        kz: "Мысалы: Шарипова Ая",
      },
    },
    {
      key: "iin",
      type: "text",
      required: true,
      labels: {
        ru: "ИИН",
        kz: "ЖСН",
      },
      placeholders: {
        ru: "12 цифр",
        kz: "12 сан",
      },
    },
    {
      key: "address",
      type: "text",
      required: true,
      labels: {
        ru: "Адрес места жительства / деятельности",
        kz: "Тұрғылықты / қызмет мекенжайы",
      },
      placeholders: {
        ru: "Город, улица, дом, квартира",
        kz: "Қала, көше, үй, пәтер",
      },
    },
    {
      key: "phone",
      type: "text",
      required: true,
      labels: {
        ru: "Телефон",
        kz: "Телефон",
      },
      placeholders: {
        ru: "+7 7XX XXX XX XX",
        kz: "+7 7XX XXX XX XX",
      },
    },
    {
      key: "email",
      type: "text",
      required: false,
      labels: {
        ru: "Электронная почта",
        kz: "Электрондық пошта",
      },
      placeholders: {
        ru: "example@mail.com",
        kz: "example@mail.com",
      },
    },
    {
      key: "activity",
      type: "text",
      required: true,
      labels: {
        ru: "Вид деятельности",
        kz: "Қызмет түрі",
      },
      placeholders: {
        ru: "Например: образовательные услуги",
        kz: "Мысалы: білім беру қызметтері",
      },
    },
    {
      key: "oked",
      type: "text",
      required: false,
      labels: {
        ru: "ОКЭД (если известен)",
        kz: "ЭҚЖЖ (егер белгілі болса)",
      },
      placeholders: {
        ru: "Например: 85599",
        kz: "Мысалы: 85599",
      },
    },
    {
      key: "taxRegime",
      type: "select",
      required: false,
      labels: {
        ru: "Предпочитаемый налоговый режим",
        kz: "Қалаулы салық режимі",
      },
      options: [
        {
          value: "patent",
          labels: { ru: "Патент", kz: "Патент" },
        },
        {
          value: "simplified",
          labels: { ru: "Упрощённая декларация", kz: "Оңайлатылған декларация" },
        },
        {
          value: "general",
          labels: { ru: "Общеустановленный режим", kz: "Жалпыға бірдей режим" },
        },
      ],
    },
  ],
}