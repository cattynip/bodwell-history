import anime from "animejs";
import LeonSans, { LeonSansOptions } from "@nindaff/leonsans";

type DeleteMethodT = "once" | "erasing" | "opacity";

interface IWaitingTimes<T = number> {
  delay: T;
  writing: T;
  showing: T;
  deleting: T;
}

interface TextInfo {
  text: string;
  deleteMethod: DeleteMethodT;
  timeInfo: IWaitingTimes;
  style?: LeonSansOptions;
}

/*
 * TODO: Make it accept just a single paragraphs
 * TODO: Develop the different ways of deleting texts.
 */

class Texts {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private pixelRatio: number;
  protected animation?: number;
  private content: TextInfo[];
  private currentContent: TextInfo;
  private currentLeon: LeonSans;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    content: TextInfo[]
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.content = content;

    this.pixelRatio = 2;
    canvas.width = 800 * this.pixelRatio;
    canvas.height = 400 * this.pixelRatio;
    canvas.style.width = `800px`;
    canvas.style.height = `400px`;
    ctx.scale(this.pixelRatio, this.pixelRatio);

    this.currentContent = this.content[0];
    this.currentLeon = new LeonSans(this.getLeonSansOption());

    this.animate();
  }

  public async startAnimation() {
    this.maintainingTransparent();

    for (let i = 0; i < this.content.length; i++) {
      this.currentContent = this.content[i];
      this.currentLeon = new LeonSans(this.getLeonSansOption());
      this.maintainingTransparent();

      await this.waitFor(this.currentContent.timeInfo.delay);

      this.processWriting();

      await this.waitFor(
        this.currentContent.timeInfo.writing +
          this.currentContent.timeInfo.showing
      );

      this.processDeleting();

      await this.waitFor(this.currentContent.timeInfo.deleting);
    }
  }

  private async waitFor(t: number) {
    return new Promise(resolve => setTimeout(resolve, t));
  }

  private processWriting() {
    for (let i = 0; i < this.currentContent["text"].length; i++) {
      let letterInfo = {
        prop: 0
      };

      const delay = i * 5;

      anime({
        targets: letterInfo,
        prop: 1,
        round: 100,
        easing: "easeOutQuart",
        duration: this.currentContent.timeInfo.writing,
        delay,
        update: () => {
          // @ts-ignore
          this.currentLeon.data[i].drawing.value = letterInfo.prop;
        }
      });
    }
  }

  private processDeleting() {
    for (let i = 0; i < this.currentContent["text"].length; i++) {
      let letterInfo = {
        prop: 1
      };

      const delay = i * 5;

      anime({
        targets: letterInfo,
        prop: 0,
        round: 100,
        easing: "easeOutQuart",
        duration: this.currentContent.timeInfo.deleting,
        delay,
        update: () => {
          if (!this.currentLeon.data[i]) return;

          // @ts-ignore
          this.currentLeon.data[i].drawing.value = letterInfo.prop;
        }
      });
    }
  }

  private maintainingTransparent() {
    if (!this.currentContent) return;

    for (let i = 0; i < this.currentContent["text"].length; i++) {
      // @ts-ignore
      this.currentLeon.data[i].drawing.value = 0;
    }
  }

  private getLeonSansOption(): LeonSansOptions {
    const defaultLeonSansOptions: LeonSansOptions = {
      color: ["#FFFFFF"],
      size: 25,
      weight: 300,
      align: "center",
      maxWidth: 30
    };

    const style: LeonSansOptions = this.currentContent.style
      ? this.currentContent.style
      : defaultLeonSansOptions;

    return {
      text: this.currentContent.text,
      ...style
    };
  }

  public animate() {
    this.clear();

    this.currentLeon.position(
      this.canvas.width / (2 * this.pixelRatio) - this.currentLeon.rect.w / 2,
      this.canvas.height / (2 * this.pixelRatio) - this.currentLeon.rect.h / 2
    );
    this.currentLeon.draw(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }

  private clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default Texts;
