import { dataForm } from "@data/languageReference";

export type etcPart = "introduction" | "about" | "credit";

const EtcTranscriptions: dataForm<etcPart> = {
  introduction: {
    en: [
      "We have been operating for 32 years.",
      "As much as the operating time is long,\nwe have created a lot of memories.",
      "Right now, we have come to share our memories with you."
    ],
    ko: [
      "보드웰은 지난 32년간 운영되었습니다.",
      "저희가 지내온 시간이 만큼 많은 추억들을 쌓았습니다.",
      "바로 지금, 저희는 당신과 그 추억을 공유하기 위해 왔습니다."
    ]
  },
  about: {
    en: [],
    ko: []
  },
  credit: {
    en: [],
    ko: []
  }
};

export default EtcTranscriptions;
