import anime from "animejs";
import LeonSans, { LeonSansOptions } from "@nindaff/leonsans";
import { PositionCoor } from "./GlowCanvas";

type CallbackFnT = () => void;

interface IWaitingTimes<T = number> {
  delay: T;
  writing: T;
  showing: T;
  deleting: T;
}

export const defaultWaitingTimes: IWaitingTimes = {
  delay: 1000,
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
  globalStyle: LeonSansOptions;
  timeInfo: IWaitingTimes;
  callbacks?: ICallback;
}

class Texts {
  private parentElement: HTMLDivElement;
  private mainElement: HTMLDivElement;
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

  constructor({ content, globalStyle, timeInfo, callbacks }: ITextProps) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;
    this.parentElement = document.querySelector(`#parent`)!;
    this.mainElement = this.parentElement.querySelector("#leonsans")!;
    this.content = content;

    this.globalStyle = globalStyle;
    this.timeInfo = timeInfo;

    this.pixelRatio = 2;

    this.canvas.width = this.mainElement.clientWidth * this.pixelRatio;
    this.canvas.height = this.mainElement.clientHeight * this.pixelRatio;
    this.canvas.style.width = `${this.mainElement.clientWidth}px`;
    this.canvas.style.height = `${this.mainElement.clientHeight}px`;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    this.currentContent = this.content[0];
    this.currentLeon = new LeonSans({
      text: this.currentContent,
      ...this.globalStyle
    });

    this.callbacks = callbacks;
    this.position = this.getPosition();

    this.attach();

    this.animate();
  }

  private attach() {
    const exists = this.parentElement.querySelector("canvas");

    if (!exists) {
      this.mainElement.appendChild(this.canvas);
      const sample = this.mainElement.querySelector("#sample");
      sample?.remove();
    }
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

      this.processWriting(this.timeInfo.writing);

      await this.waitFor(this.timeInfo.writing + this.timeInfo.showing);

      const isLast = this.content.length - 1 === i;

      this.callbacks?.everyWriting && this.callbacks.everyWriting();

      if (isLast) return;

      this.processDeleting(this.timeInfo.deleting);

      await this.waitFor(this.timeInfo.deleting);
    }

    this.callbacks?.whenCompleted && this.callbacks.whenCompleted();
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
