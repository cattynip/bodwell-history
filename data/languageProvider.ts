import userLangInfo from "@components/languageProvider";
import { TranscriptContent, TranscriptionType } from "./languageReference";

function getContent(parts: TranscriptContent): TranscriptionType {
  const { userLang } = userLangInfo;

  return parts[userLang];
}

export default getContent;
