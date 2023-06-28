import EtcTranscriptions, { etcPart } from "./transcriptions/etc";
import ImagesTranscriptions, { imagesPart } from "./transcriptions/images";

export type AvailableLanguageCodes = "en" | "ko";
export type AllLanguageCodes = "en" | "ko" | "jp" | "zh";
export type TranscriptionType = string[];
export type TranscripParts = "etc" | "images";

interface TranscriptionShape {
  etc: dataForm<etcPart>;
  images: dataForm<imagesPart>;
}

export type dataForm<T extends string | number> = {
  [Property in T]: TranscriptContent;
};

export type TranscriptContent = {
  [Property in AvailableLanguageCodes]: TranscriptionType;
};

const Transcriptions: TranscriptionShape = {
  etc: EtcTranscriptions,
  images: ImagesTranscriptions
};
export type TTranscriptionPart = keyof typeof Transcriptions;

export default Transcriptions;
