export const tooRegistrationSchema = {
  scenario: "too_registration",
  labels: {
    ru: "Регистрация ТОО",
    kz: "ЖШС тіркеу",
  },
  type: "document",
  fields: [
    {
      key: "companyName",
      type: "text",
      required: true,
      labels: {
        ru: "Наименование ТОО",
        kz: "ЖШС атауы",
      },
      placeholders: {
        ru: "Например: TOO Qazaq Legal Tech",
        kz: "Мысалы: TOO Qazaq Legal Tech",
      },
    },
    {
      key: "legalAddress",
      type: "text",
      required: true,
      labels: {
        ru: "Юридический адрес",
        kz: "Заңды мекенжай",
      },
      placeholders: {
        ru: "Город, улица, дом, офис",
        kz: "Қала, көше, үй, офис",
      },
    },
    {
      key: "directorName",
      type: "text",
      required: true,
      labels: {
        ru: "ФИО директора",
        kz: "Директордың аты-жөні",
      },
      placeholders: {
        ru: "Например: Айманова Алия",
        kz: "Мысалы: Айманова Алия",
      },
    },
    {
      key: "directorIin",
      type: "text",
      required: false,
      labels: {
        ru: "ИИН директора",
        kz: "Директордың ЖСН",
      },
      placeholders: {
        ru: "12 цифр",
        kz: "12 сан",
      },
    },
    {
      key: "founders",
      type: "textarea",
      required: true,
      labels: {
        ru: "Учредители",
        kz: "Құрылтайшылар",
      },
      placeholders: {
        ru: "Укажи учредителей через запятую или с новой строки",
        kz: "Құрылтайшыларды үтірмен немесе жаңа жолмен көрсет",
      },
    },
    {
      key: "charterCapital",
      type: "text",
      required: false,
      labels: {
        ru: "Размер уставного капитала",
        kz: "Жарғылық капитал мөлшері",
      },
      placeholders: {
        ru: "Например: 100000 тенге",
        kz: "Мысалы: 100000 теңге",
      },
    },
    {
      key: "businessActivity",
      type: "text",
      required: true,
      labels: {
        ru: "Основной вид деятельности",
        kz: "Негізгі қызмет түрі",
      },
      placeholders: {
        ru: "Например: IT-консалтинг",
        kz: "Мысалы: IT-консалтинг",
      },
    },
    {
      key: "contactPhone",
      type: "text",
      required: false,
      labels: {
        ru: "Контактный телефон",
        kz: "Байланыс телефоны",
      },
      placeholders: {
        ru: "+7 7XX XXX XX XX",
        kz: "+7 7XX XXX XX XX",
      },
    },
    {
      key: "contactEmail",
      type: "text",
      required: false,
      labels: {
        ru: "Контактный email",
        kz: "Байланыс email",
      },
      placeholders: {
        ru: "example@mail.com",
        kz: "example@mail.com",
      },
    },
  ],
}