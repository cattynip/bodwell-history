export interface LanguageFaceinfo {
  englishName: EnglishName;
  code: EnglishCode;
}

export type EnglishName =
  | "english"
  | "korean"
  | "japanese"
  | "mandarin"
  | "cantonese"
  | "spanish"
  | "persian"
  | "french"
  | "kazakh"
  | "russian"
  | "thai"
  | "vietnamese";
export type EnglishCode =
  | "en"
  | "ko"
  | "jp"
  | "ma"
  | "ca"
  | "es"
  | "fa"
  | "fr"
  | "kk"
  | "ru"
  | "th"
  | "vi";

const LanguagesDic: LanguageFaceinfo[] = [
  {
    englishName: "english",
    code: "en"
  },
  {
    englishName: "korean",
    code: "ko"
  },
  {
    englishName: "japanese",
    code: "jp"
  },
  {
    englishName: "mandarin",
    code: "ma"
  },
  {
    englishName: "cantonese",
    code: "ca"
  },
  {
    englishName: "spanish",
    code: "es"
  },
  {
    englishName: "persian",
    code: "fa"
  },
  {
    englishName: "french",
    code: "fr"
  },
  {
    englishName: "kazakh",
    code: "kk"
  },
  {
    englishName: "russian",
    code: "ru"
  },
  {
    englishName: "thai",
    code: "th"
  },
  {
    englishName: "vietnamese",
    code: "vi"
  }
];

export default LanguagesDic;
