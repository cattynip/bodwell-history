import { useEffect, useRef, useState } from "react";
import GlowCanvas, { ThemeT } from "./GlowCanvas";
import { useRouter } from "next/router";

interface IPaletteProps {
  theme: ThemeT;
}

const Palette = ({ theme }: IPaletteProps) => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const Glow = new GlowCanvas(canvas, ctx, theme);

    setTimeout(() => {
      Glow.startScene();
    }, 2000);
  }, [router]);

  return (
    <canvas className="absolute top-0 left-0 -z-50 bg-mbg" ref={canvasRef} />
  );
};

export default Palette;
