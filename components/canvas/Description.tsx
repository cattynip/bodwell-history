import { useEffect } from "react";
import Texts, { ICallback, defaultWaitingTimes } from "./Texts";
import { AnimatePresence } from "framer-motion";
import { LeonSansOptions } from "@nindaff/leonsans";
import userLangInfo from "@components/languageProvider";
import { motion } from "framer-motion";

// type TBackgroundColourType = "black" | "white" | "blurred";
// type TTextColourType = "white" | "black";
type TCanvasShowingStyle = "quotes" | "description";

interface IComponentProps {
  text: string[];
  canvasShowingStyle: TCanvasShowingStyle;
}

const QuoteStyle: LeonSansOptions = {
  color: ["#FFFFFF"],
  size: 25,
  weight: 300,
  align: "center",
  maxWidth: 1
};

const DescriptionStyle: LeonSansOptions = {
  color: ["#DDDDDD"],
  size: 15,
  weight: 300,
  align: "right",
  maxWidth: 600
};

const Description = ({
  text,
  canvasShowingStyle,
  ...props
}: IComponentProps & ICallback) => {
  const isLangEng = userLangInfo.userLang === "en";

  useEffect(() => {
    if (isLangEng) {
      const globalStyle: LeonSansOptions =
        canvasShowingStyle === "quotes" ? QuoteStyle : DescriptionStyle;

      const Text = new Texts({
        content: text,
        globalStyle,
        timeInfo: defaultWaitingTimes,
        callbacks: props
      });

      Text.startAnimation();
    }

    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <div
      className="w-full overflow-hidden rounded-md bg-black p-3 text-center text-white shadow-2xl"
      id="parent"
    >
      <div id="leonsans">
        <div id="sample">
          <AnimatePresence>
            <motion.div
              initial={{
                opacity: 1
              }}
              animate={{
                opacity: 1
              }}
            >
              {text.map((value, idx) => (
                <p key={idx}>{value}</p>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Description;
