//these are the details of DB tables
const TEXT_TABLE = {
  name: "text_table",
  atrr: {
    id: "id",
    text_in_english: "text_in_english",
  },
};

const TRANSLATION_TABLE = {
  name: "translation_table",
  attr: {
    id: "id",
    lang: "lang",
    translation: "translation",
  },
};

export { TEXT_TABLE, TRANSLATION_TABLE };
