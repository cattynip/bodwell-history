import { useEffect, useRef } from "react";
import Texts from "./Texts";

interface IComponentProps {
  text: string[];
}

const LeonSans = ({ text }: IComponentProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const Text = new Texts(canvas, ctx, [
      {
        text: "Bodwell High is a good place.",
        deleteMethod: "erasing",
        timeInfo: {
          delay: 2000,
          writing: 2000,
          showing: 3000,
          deleting: 2000
        }
      },
      {
        text: "Until Jinwoo Jang exists.",
        deleteMethod: "once",
        timeInfo: {
          delay: 2000,
          writing: 2000,
          showing: 3000,
          deleting: 2000
        }
      },
      {
        text: "Blabla.",
        deleteMethod: "once",
        timeInfo: {
          delay: 1000,
          writing: 200,
          showing: 200,
          deleting: 200
        }
      }
    ]);

    Text.startAnimation();
  }, []);

  return <canvas ref={canvasRef} className="z-20 rounded-xl bg-black" />;
};

export default LeonSans;
