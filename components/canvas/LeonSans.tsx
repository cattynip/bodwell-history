import { useEffect, useRef, useState } from "react";
import Texts from "./Texts";

interface IComponentProps {
  text: string;
}

const LeonSans = ({ text }: IComponentProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const Text = new Texts(canvas, ctx, text);
  }, []);

  return <canvas ref={canvasRef} className="bg-black rounded-xl z-20" />;
};

export default LeonSans;
