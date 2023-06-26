import { getRandomNumberBetween } from "@libs/maths";
import { ColorT, MinMaxT } from "./GlowCanvas";
import { coordinatePair } from "@components/StartButton";

class GlowBubble {
  private ctx: CanvasRenderingContext2D;
  private stageWidth: number;
  private stageHeight: number;
  private stageRange: number;
  private radiusLimit: MinMaxT;
  private radius: number;
  private color: ColorT;
  private alpha: number;
  private x: number;
  private y: number;
  private vx: number;
  private vy: number;
  private vr: number;
  private animationStarted: boolean;

  constructor(
    ctx: CanvasRenderingContext2D,
    color: ColorT,
    stageInfo: { width: number; height: number },
    initialRadius: number,
    velocityInfo: { x: number; y: number; r: number },
    radiusLimit: { min: number; max: number }
  ) {
    this.ctx = ctx;
    this.stageWidth = stageInfo.width;
    this.stageHeight = stageInfo.height;
    this.stageRange = 100;

    this.radiusLimit = radiusLimit;
    this.radius = initialRadius;
    this.color = color;
    this.alpha = 0;

    const initialCoor = this.getRandomInitialCoor();
    this.x = initialCoor.x;
    this.y = initialCoor.y;
    this.vx = velocityInfo.x;
    this.vy = velocityInfo.y;
    this.vr = velocityInfo.r;

    this.animationStarted = false;
  }

  public animate() {
    this.drawBubble();
    this.moveConstantly();

    if (!this.animationStarted) {
      this.appearing();
    }
  }

  public resize() {
    console.log("Window has been resized.");
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
    this.ctx.globalAlpha = this.alpha;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();

    // this.helper();

    this.ctx.closePath();
  }

  private helper() {
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 7;
    this.ctx.moveTo(this.stageWidth / 2, this.stageHeight / 2);
    this.ctx.lineTo(this.x, this.y);
    this.ctx.stroke();
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

    if (
      this.radius >= this.radiusLimit.max ||
      this.radius <= this.radiusLimit.min
    ) {
      this.vr *= -1;
    }

    this.x += this.vx;
    this.y += this.vy;
    this.radius += this.vr;
  }

  private appearing() {
    this.alpha += 0.002;

    if (this.alpha > 1) {
      this.animationStarted = true;
    }
  }

  private getRandomInitialCoor(): coordinatePair {
    const xPos = getRandomNumberBetween(0, this.stageWidth);
    const yPos = getRandomNumberBetween(0, this.stageHeight);

    return {
      x: xPos,
      y: yPos
    };
  }
}

export default GlowBubble;
