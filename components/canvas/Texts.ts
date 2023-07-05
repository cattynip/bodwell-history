import anime from "animejs";
import LeonSans, { LeonSansOptions } from "@nindaff/leonsans";
import { PositionCoor } from "./GlowCanvas";

type CallbackFnT = () => void;
export type TCanvasShowingStyle = "quotes" | "description";

interface IWaitingTimes<T = number> {
  delay: T;
  writing: T;
  showing: T;
  deleting: T;
}

export const defaultWaitingTimes: IWaitingTimes = {
  delay: 5000,
  showing: 1000,
  writing: 1000,
  deleting: 1000
};

export interface ICallback {
  whenStarted?: CallbackFnT;
  everyWriting?: CallbackFnT;
  whenCompleted?: CallbackFnT;
}

interface ITextProps {
  content: string[];
  canvasShowingStyle: TCanvasShowingStyle;
  timeInfo: IWaitingTimes;
  callbacks?: ICallback;
}

const QuoteStyle: LeonSansOptions = {
  color: ["#FFFFFF"],
  size: 25,
  weight: 300,
  align: "center",
  breakWord: false
};

const DescriptionStyle: LeonSansOptions = {
  color: ["black"],
  size: 18,
  weight: 500,
  align: "left",
  breakWord: false,
  leading: 1.2,
  amplitude: 20
};

class Texts {
  private parent: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private pixelRatio: number;
  protected animation?: number;
  private content: string[];
  private currentContent: string;
  private currentLeon: LeonSans;
  private globalStyle: LeonSansOptions;
  private timeInfo: IWaitingTimes;
  private callbacks?: ICallback;
  private position: PositionCoor;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    parent: HTMLDivElement,
    { content, canvasShowingStyle, timeInfo, callbacks }: ITextProps
  ) {
    this.parent = parent;
    this.canvas = canvas;
    this.ctx = ctx;
    this.content = content;

    this.globalStyle =
      canvasShowingStyle === "quotes" ? QuoteStyle : DescriptionStyle;
    this.timeInfo = timeInfo;

    this.pixelRatio = 2;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.currentContent = this.content[0];
    this.currentLeon = new LeonSans({
      text: this.currentContent,
      ...this.globalStyle
    });

    this.callbacks = callbacks;

    this.position = this.getPosition();
    this.animate();
  }

  public async startAnimation() {
    this.maintainingTransparent();

    this.callbacks?.whenStarted && this.callbacks.whenStarted();

    for (let i = 0; i < this.content.length; i++) {
      this.currentContent = this.content[i];

      this.currentLeon = new LeonSans({
        text: this.currentContent,
        ...this.globalStyle
      });
      this.maintainingTransparent();

      this.position = this.getPosition();

      await this.waitFor(this.timeInfo.delay);

      this.currentLeon.maxWidth =
        this.canvas.getBoundingClientRect().width * this.pixelRatio;

      this.canvas.width = this.currentLeon.maxWidth;
      this.canvas.height = this.currentLeon.rect.h * this.pixelRatio;

      this.canvas.style.width = `${
        this.canvas.getBoundingClientRect().width
      }px`;
      this.canvas.style.height = `${this.currentLeon.rect.h}px`;

      this.processWriting(this.timeInfo.writing);

      await this.waitFor(this.timeInfo.writing + this.timeInfo.showing);

      const isLast = this.content.length - 1 === i;

      this.callbacks?.everyWriting && this.callbacks.everyWriting();

      if (isLast) {
        this.callbacks?.whenCompleted && this.callbacks.whenCompleted();
        return;
      }

      this.processDeleting(this.timeInfo.deleting);

      await this.waitFor(this.timeInfo.deleting);
    }

    this.currentContent = this.content[this.currentContent.length - 1];

    this.currentLeon = new LeonSans({
      text: this.currentContent,
      ...this.globalStyle
    });
  }

  private async waitFor(t: number) {
    return new Promise(resolve => setTimeout(resolve, t));
  }

  private processWriting(duration: number) {
    for (let i = 0; i < this.currentContent.length; i++) {
      let letterInfo = {
        prop: 0
      };

      const delay = i * 5;

      anime({
        targets: letterInfo,
        prop: 1,
        round: 100,
        easing: "easeOutQuart",
        duration,
        delay,
        update: () => {
          if (!this.currentLeon.data[i]) return;

          // @ts-ignore
          this.currentLeon.data[i].drawing.value = letterInfo.prop;
        }
      });
    }
  }

  private processDeleting(duration: number) {
    for (let i = 0; i < this.currentContent.length; i++) {
      let letterInfo = {
        prop: 1
      };

      const delay = i * 5;

      anime({
        targets: letterInfo,
        prop: 0,
        round: 100,
        easing: "easeOutQuart",
        duration,
        delay,
        update: () => {
          if (!this.currentLeon.data[i]) return;

          // @ts-ignore
          this.currentLeon.data[i].drawing.value = letterInfo.prop;
        }
      });
    }
  }

  private getPosition(): PositionCoor {
    const textAlign = this.globalStyle ? this.globalStyle.align : "center";

    return textAlign === "center"
      ? {
          x: this.canvas.width / 4 - this.currentLeon.rect.w / 2,
          y: this.canvas.height / 4 - this.currentLeon.rect.h / 2
        }
      : textAlign === "right"
      ? { x: 0, y: 0 }
      : { x: 0, y: 0 };
  }

  private maintainingTransparent() {
    if (!this.currentContent) return;

    for (let i = 0; i < this.currentContent.length; i++) {
      if (!this.currentLeon.data[i]) return;

      // @ts-ignore
      this.currentLeon.data[i].drawing.value = 0;
    }
  }

  public animate() {
    this.clear();

    this.currentLeon.position(this.position.x, this.position.y);
    this.currentLeon.draw(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }

  private clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default Texts;
