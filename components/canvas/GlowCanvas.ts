import { getRandomNumberBetween } from "@libs/maths";
import GlowBubble from "./GlowBubble";

type RandomValueT = "width" | "height" | "radius" | "velocity";
export type PositionCoor = { x: number; y: number };
export type ColorT = `#${string}`;
export type ThemeT =
  | "dark"
  | "darkBlue"
  | "purple"
  | "blue"
  | "colorful"
  | "cmiscm";
export type MinMaxT<T = number> = { min: T; max: T };

type IColors = {
  [colorSetType in ThemeT]: ColorT[];
};

class GlowCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private theme: ThemeT;
  private glowBubbleList: GlowBubble[];
  private maxGlowBubblesNum: number;
  private stageRange: number;
  public COLORSSET: IColors;
  private animationRequest: number;
  private radiusLimit: MinMaxT;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    mode: ThemeT
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.theme = mode;
    this.stageRange = 100;
    this.glowBubbleList = [];
    this.maxGlowBubblesNum = 15;
    this.animationRequest = 0;
    this.radiusLimit = {
      min: 400,
      max: 900
    };

    this.COLORSSET = {
      dark: ["#000000", "#A00030", "#200202", "#102003", "#010230"],
      darkBlue: ["#261C2C", "#0C4271", "#000000", "#1D1B38", "#0900C3"],
      purple: ["#A020F0", "#F020F0", "#D00FFF"],
      blue: ["#0000FF", "#01A2FF", "#0FADFF", "#0201FF"],
      colorful: ["#FF0000", "#00FF00", "#0000FF"],
      cmiscm: ["#2D4AE3", "#FAFF59", "#FF68F8", "#2CD1FC", "#36E954"]
    };

    this.init();
    this.resize();
    this.animate();

    window.addEventListener("resize", this.resize.bind(this));
  }

  private init() {
    this.ctx.globalCompositeOperation = "saturation";
  }

  private animate(t?: DOMHighResTimeStamp) {
    this.clear();

    this.glowBubbleList.map(value => value.animate(t));

    this.animationRequest = requestAnimationFrame(this.animate.bind(this));
  }

  private clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.init();

    this.glowBubbleList.map(value => value.resize());

    if (this.animationRequest) {
      cancelAnimationFrame(this.animationRequest);
      this.animate();
    }
  }

  public startScene() {
    for (let i = 0; i < this.maxGlowBubblesNum; i++) {
      const newBubble = new GlowBubble(
        this.ctx,
        this.COLORSSET[this.theme][
          getRandomNumberBetween(0, this.COLORSSET[this.theme].length, true)
        ],
        { width: this.canvas.width, height: this.canvas.height },
        this.getRandomValue("radius"),
        {
          x: this.getRandomValue("velocity"),
          y: this.getRandomValue("velocity"),
          r: this.getRandomValue("velocity")
        },
        {
          min: 400,
          max: 900
        }
      );

      this.glowBubbleList[i] = newBubble;
    }
  }

  public changeThemeTo() {}

  private getRandomValue(valueType: RandomValueT): number {
    if (valueType === "width") {
      return getRandomNumberBetween(
        -this.stageRange,
        this.canvas.width + this.stageRange,
        true
      );
    } else if (valueType === "height") {
      return getRandomNumberBetween(
        -this.stageRange,
        this.canvas.width + this.stageRange,
        true
      );
    } else if (valueType === "velocity") {
      return getRandomNumberBetween(-1.2, 1.2, false);
    } else if (valueType === "radius") {
      return getRandomNumberBetween(
        this.radiusLimit.min,
        this.radiusLimit.max,
        true
      );
    } else {
      return 0;
    }
  }
}

export default GlowCanvas;
