export const scenarioMap = {
  ip_registration: {
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
    ],
  },

  too_registration: {
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
        key: "founderIin",
        type: "text",
        required: false,
        labels: {
            ru: "ИИН учредителя",
            kz: "Құрылтайшының ЖСН",
        },
        placeholders: {
            ru: "12 цифр",
            kz: "12 сан",
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
  },

  employment_contract: {
    fields: [
      {
        key: "employer",
        type: "text",
        required: true,
        labels: {
          ru: "Работодатель",
          kz: "Жұмыс беруші",
        },
        placeholders: {
          ru: "Название компании",
          kz: "Компания атауы",
        },
      },
      {
        key: "employee",
        type: "text",
        required: true,
        labels: {
          ru: "Сотрудник",
          kz: "Қызметкер",
        },
        placeholders: {
          ru: "ФИО сотрудника",
          kz: "Қызметкердің аты-жөні",
        },
      },
      {
        key: "position",
        type: "text",
        required: true,
        labels: {
          ru: "Должность",
          kz: "Лауазым",
        },
        placeholders: {
          ru: "Например: юрист",
          kz: "Мысалы: заңгер",
        },
      },
      {
        key: "salary",
        type: "text",
        required: false,
        labels: {
          ru: "Оклад",
          kz: "Жалақы",
        },
        placeholders: {
          ru: "Например: 300000 тенге",
          kz: "Мысалы: 300000 теңге",
        },
      },
      {
        key: "startDate",
        type: "text",
        required: false,
        labels: {
          ru: "Дата начала",
          kz: "Басталу күні",
        },
        placeholders: {
          ru: "ДД.ММ.ГГГГ",
          kz: "КК.АА.ЖЖЖЖ",
        },
      },
    ],
  },

  power_of_attorney: {
    fields: [
      {
        key: "principal",
        type: "text",
        required: true,
        labels: {
          ru: "Доверитель",
          kz: "Сенім білдіруші",
        },
        placeholders: {
          ru: "ФИО доверителя",
          kz: "Сенім білдірушінің аты-жөні",
        },
      },
      {
        key: "agent",
        type: "text",
        required: true,
        labels: {
          ru: "Представитель",
          kz: "Өкіл",
        },
        placeholders: {
          ru: "ФИО представителя",
          kz: "Өкілдің аты-жөні",
        },
      },
      {
        key: "authority",
        type: "textarea",
        required: true,
        labels: {
          ru: "Полномочия",
          kz: "Өкілеттіктер",
        },
        placeholders: {
          ru: "Опиши полномочия",
          kz: "Өкілеттіктерді сипатта",
        },
      },
    ],
  },

  vat_registration: {
    fields: [
      {
        key: "businessName",
        type: "text",
        required: true,
        labels: {
          ru: "Название бизнеса",
          kz: "Бизнес атауы",
        },
        placeholders: {
          ru: "Название бизнеса",
          kz: "Бизнес атауы",
        },
      },
      {
        key: "bin",
        type: "text",
        required: false,
        labels: {
          ru: "БИН",
          kz: "БСН",
        },
        placeholders: {
          ru: "12 цифр",
          kz: "12 сан",
        },
      },
      {
        key: "iin",
        type: "text",
        required: false,
        labels: {
          ru: "ИИН",
          kz: "ЖСН",
        },
        placeholders: {
          ru: "Если нет БИН",
          kz: "Егер БСН жоқ болса",
        },
      },
      {
        key: "reason",
        type: "textarea",
        required: false,
        labels: {
          ru: "Основание / комментарий",
          kz: "Негіз / түсіндірме",
        },
        placeholders: {
          ru: "Почему нужна постановка на НДС",
          kz: "Неліктен ҚҚС керек",
        },
      },
    ],
  },
}