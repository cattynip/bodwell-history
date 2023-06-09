import { RGBColourT } from "@components/canvas/GlowCanvas";

const rgbToHex = (red: number, green: number, blue: number): string => {
  const hex = ((red << 16) | (green << 8) | blue).toString(16);
  return "#" + hex.padStart(6, "0").toUpperCase();
};

export const rgbToString = (rgbInfo: RGBColourT, alpha?: number): string => {
  return `rgb${alpha ? "a" : ""}(${rgbInfo.r}, ${rgbInfo.g}, ${rgbInfo.b}${
    alpha ? `, ${alpha}` : ""
  })`;
};

export default rgbToHex;
