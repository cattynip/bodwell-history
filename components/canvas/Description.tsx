import { useEffect, useRef } from "react";
import Texts, { ICallback, TextInfo } from "./Texts";

interface IComponentProps {
  text: TextInfo[];
}

const Description = ({ text, ...props }: IComponentProps & ICallback) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const Text = new Texts(canvas, ctx, text, props);

    Text.startAnimation();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return <canvas ref={canvasRef} className="z-20 rounded-xl bg-black" />;
};

export default Description;
