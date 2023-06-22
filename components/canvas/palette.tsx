import { useEffect, useRef } from "react";
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
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [router]);

  return (
    <canvas className="absolute left-0 top-0 -z-50 bg-mbg" ref={canvasRef} />
  );
};

export default Palette;
