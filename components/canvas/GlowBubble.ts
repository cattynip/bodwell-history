import { getRandomBoolean, getRandomNumberBetween } from "@libs/maths";
import { ColorT, MinMaxT, PositionCoor } from "./GlowCanvas";

/*
 * TODO: Change its color with animation.
 * TODO: Appear from outside of the canvas into somewhere in the canvas and move constantly.
 */

type QuadrantT = 1 | 2 | 3 | 4;

interface IGetRandomInitialCoor extends PositionCoor {
  direction: QuadrantT;
}

class GlowBubble {
  private ctx: CanvasRenderingContext2D;
  private stageWidth: number;
  private stageHeight: number;
  private stageRange: number;
  private radiusLimit: MinMaxT;
  private radius: number;
  private color: ColorT;
  private x: number;
  private y: number;
  private initVX: number;
  private initVY: number;
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

    const initialCoor = this.getRandomInitialCoor(this.radius);
    this.x = initialCoor.x;
    this.y = initialCoor.y;
    this.vx = velocityInfo.x;
    this.vy = velocityInfo.y;
    this.vr = velocityInfo.r;

    if (initialCoor.direction <= 2) {
      this.initVY = 2;
    } else {
      this.initVY = -2;
    }

    if (initialCoor.direction === 1 || initialCoor.direction === 4) {
      this.initVX = -2;
    } else {
      this.initVX = 2;
    }

    this.animationStarted = false;
  }

  public animate() {
    this.drawBubble();

    if (this.animationStarted) {
      this.moveConstantly();
    } else {
      this.appearing();
    }
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
    this.ctx.closePath();
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
    this.x += this.initVX;
    this.y += this.initVY;

    setTimeout(() => {
      this.animationStarted = true;
    }, 2000);
  }

  private getRandomInitialCoor(r: number): IGetRandomInitialCoor {
    const xPosFirst = getRandomBoolean();

    if (xPosFirst) {
      const xPos = getRandomNumberBetween(-r - 1, this.stageWidth + r - 1);
      const isLeft = xPos < this.stageWidth / 2;
      const isUp = getRandomBoolean();

      return {
        x: xPos,
        y: isUp ? -r : this.stageHeight + r,
        direction:
          !isLeft && isUp ? 1 : isLeft && isUp ? 2 : isLeft && !isUp ? 3 : 4,
      };
    } else {
      const yPos = getRandomNumberBetween(-r - 1, this.stageHeight + r - 1);
      const isUp = yPos < this.stageHeight / 2;
      const isLeft = getRandomBoolean();

      return {
        x: isLeft ? -r : this.stageWidth + r,
        y: yPos,
        direction:
          !isLeft && isUp ? 1 : isLeft && isUp ? 2 : isLeft && !isUp ? 3 : 4,
      };
    }
  }
}

export default GlowBubble;
