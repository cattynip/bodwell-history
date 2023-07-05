import { useEffect, useRef } from "react";
import Texts, {
  ICallback,
  TCanvasShowingStyle,
  defaultWaitingTimes
} from "./Texts";
import userLangInfo from "@components/languageProvider";

interface IComponentProps {
  text: string[];
  canvasShowingStyle: TCanvasShowingStyle;
}

const Description = ({
  text,
  canvasShowingStyle,
  ...props
}: IComponentProps & ICallback) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isLangEng = userLangInfo.userLang === "en";

  useEffect(() => {
    if (isLangEng) {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const parent = parentRef.current;
      if (!canvas || !parent) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const Text = new Texts(canvas, ctx, parent, {
        content: text,
        canvasShowingStyle,
        timeInfo: defaultWaitingTimes,
        callbacks: props
      });

      Text.startAnimation();
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
      ref={parentRef}
    >
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
};

export default Description;
