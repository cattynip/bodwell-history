import { useEffect, useRef } from "react";
import Texts, { TextInfo } from "./Texts";

interface IComponentProps {
  text: TextInfo[];
}

const LeonSans = ({ text }: IComponentProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const Text = new Texts(canvas, ctx, text);

    Text.startAnimation();
  }, []);

  return <canvas ref={canvasRef} className="z-20 rounded-xl bg-black" />;
};

export default LeonSans;
