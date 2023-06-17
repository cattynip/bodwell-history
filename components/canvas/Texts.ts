import anime from "animejs";
import LeonSans from "@nindaff/leonsans";

class Texts {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  protected animation?: number;
  private leon: LeonSans;
  private text: string;
  private pixelRatio: number;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    text: string
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.text = text;

    this.pixelRatio = 2;
    canvas.width = 800 * this.pixelRatio;
    canvas.height = 400 * this.pixelRatio;
    canvas.style.width = `800px`;
    canvas.style.height = `400px`;
    ctx.scale(this.pixelRatio, this.pixelRatio);

    this.leon = new LeonSans({
      text: this.text,
      color: ["#FFFFFF"],
      size: 25,
      weight: 300,
      align: "center",
      maxWidth: 30,
    });

    for (let i = 0; i < this.text.length; i++) {
      let letterInfo = {
        prop: 0,
      };

      const delay = i * 5;

      anime({
        targets: letterInfo,
        prop: 1,
        round: 100,
        easing: "easeOutQuart",
        duration: 1000,
        delay,
        update: () => {
          this.increaseProgress(i, letterInfo.prop);
        },
      });
    }

    this.animate();
  }

  private increaseProgress(idx: number, to: number) {
    if (!this.leon.data[idx]) return;

    this.leon.data[idx].drawing.value = to;
  }

  public animate(t?: DOMHighResTimeStamp) {
    this.clear();

    this.leon.position(
      this.canvas.width / (2 * this.pixelRatio) - this.leon.rect.w / 2,
      this.canvas.height / (2 * this.pixelRatio) - this.leon.rect.h / 2
    );
    // this.leon.grid(this.ctx);
    // this.leon.point(this.ctx);
    // this.leon.drawColorful(this.ctx);
    this.leon.draw(this.ctx);
    // this.leon.pattern(this.ctx, 100, 100);
    // this.leon.wave(this.ctx, t ? t : 10);

    requestAnimationFrame(this.animate.bind(this));
  }

  private clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default Texts;
