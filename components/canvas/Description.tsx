import { useEffect, useState } from "react";
import Texts, {
  ICallback,
  TCanvasShowingStyle,
  defaultWaitingTimes
} from "./Texts";
import userLangInfo from "@components/languageProvider";
import { debounce } from "lodash";

interface IComponentProps {
  text: string[];
  canvasShowingStyle: TCanvasShowingStyle;
}

const Description = ({
  text,
  canvasShowingStyle,
  ...props
}: IComponentProps & ICallback) => {
  const isLangEng = userLangInfo.userLang === "en";

  useEffect(() => {
    if (isLangEng) {
      const Text = new Texts({
        content: text,
        canvasShowingStyle,
        timeInfo: defaultWaitingTimes,
        callbacks: props
      });

      Text.startAnimation(true);

      const onResize = debounce(() => {
        Text.disattach();

        const NewText = new Texts({
          content: text,
          canvasShowingStyle,
          timeInfo: defaultWaitingTimes,
          callbacks: props
        });

        NewText.startAnimation(true);
      }, 2000);

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }

    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <div
      className={`w-full overflow-hidden rounded-md p-3 text-center text-white shadow-2xl  ${
        canvasShowingStyle === "quotes"
          ? "bg-black"
          : "border-[0.2px] border-gray-600 backdrop-blur-3xl"
      }`}
      id="parent"
    >
      <div id="leonsans">
        <div id="sample">
          {text.map((value, idx) => (
            <p key={idx}>{value}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Description;
