import {
  AllLanguageCodes,
  AvailableLanguageCodes
} from "@data/languageReference";

interface IUserLangInfoProps {
  userLang: AvailableLanguageCodes;
  userLocalLang: AllLanguageCodes;
  isSeted: boolean;
}

const userLangInfo: IUserLangInfoProps = {
  userLang: "en",
  userLocalLang: "en",
  isSeted: false
};

export const setLocalLang = (): void => {
  const languageCode = navigator.languages[1];
  userLangInfo.userLocalLang = languageCode as AllLanguageCodes;

  if (!userLangInfo.isSeted)
    userLangInfo.userLang = languageCode as AvailableLanguageCodes;
};

export const setUserLangTo = (langTo: AvailableLanguageCodes): void => {
  userLangInfo.userLang = langTo;
  userLangInfo.isSeted = true;
};

export default userLangInfo;
