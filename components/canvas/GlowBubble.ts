import { getRandomNumber, getRandomNumberBetween } from "@libs/maths";
import { ColorT } from "./GlowCanvas";

type RandomValueT = "width" | "height" | "radius" | "velocity";
type MinMaxT<T = number> = { min: T; max: T };

class GlowBubble {
  private stageWidth: number;
  private stageHeight: number;
  private stageRange: number;
  private radius: number;
  private ctx: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private vx: number;
  private vy: number;
  private vr: number;
  private radiusLimit: MinMaxT;
  private color: ColorT;

  constructor(
    stageWidth: number,
    stageHeight: number,
    ctx: CanvasRenderingContext2D,
    color: ColorT
  ) {
    this.ctx = ctx;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.stageRange = 100;

    this.radiusLimit = { min: 400, max: 900 };
    this.radius = this.getRandomValue("radius");
    this.color = color;
    this.x = this.getRandomValue("width");
    this.y = this.getRandomValue("height");
    this.vx = this.getRandomValue("velocity");
    this.vy = this.getRandomValue("velocity");
    this.vr = 0.3;
  }

  public animate() {
    this.moveConstantly();
    this.drawBubble();
  }

  private drawBubble() {
    const gradient = this.ctx.createRadialGradient(
      this.x,
      this.y,
      this.radius * 0.01,
      this.x,
      this.y,
      this.radius
    );

    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, this.color + "00");

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  private getRandomValue(valueType: RandomValueT): number {
    if (valueType === "width") {
      return getRandomNumberBetween(
        -this.stageRange,
        this.stageWidth + this.stageRange,
        true
      );
    } else if (valueType === "height") {
      return getRandomNumberBetween(
        -this.stageRange,
        this.stageWidth + this.stageRange,
        true
      );
    } else if (valueType === "velocity") {
      return getRandomNumberBetween(-0.5, 0.5, false);
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

  private moveConstantly() {
    if (
      this.x > this.stageWidth + this.stageRange ||
      this.x < -this.stageRange
    ) {
      this.vx *= -1;
    }
    if (
      this.y > this.stageHeight + this.stageRange ||
      this.y < -this.stageRange
    ) {
      this.vy *= -1;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  private bounceOff() {}

  private appear() {}

  private disappear() {}

  private changeColorTo() {}

  private startAnimation() {}
}

export default GlowBubble;
