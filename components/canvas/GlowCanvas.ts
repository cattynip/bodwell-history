import Canvas from "./Canvas";
import GlowBubble from "./GlowBubble";

type PositionCoor = { x: number; y: number };
export type ColorT = `#${string}`;
type ThemeT = "dark" | "purple" | "blue" | "colorful" | "cmiscm";

type IColors = {
  [colorSetType in ThemeT]: ColorT[];
};

class GlowCanvas extends Canvas {
  private theme: ThemeT;
  private glowBubbleList: GlowBubble[];
  private maxGlowBubblesNum: number;
  protected mouseCoor: PositionCoor;
  public COLORSSET: IColors;
  private animationRequest: number;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    mode: ThemeT
  ) {
    super(canvas, ctx);

    this.theme = mode;
    this.glowBubbleList = [];
    this.maxGlowBubblesNum = 15;
    this.animationRequest = 0;
    this.mouseCoor = { x: 0, y: 0 };

    this.COLORSSET = {
      dark: ["#000000", "#303030", "#200202", "#102003", "#010230"],
      purple: ["#A020F0", "#F020F0", "#D00FFF"],
      blue: ["#0000FF", "#01A2FF", "#0FADFF"],
      colorful: ["#FF0000", "#00FF00", "#0000FF"],
      cmiscm: ["#2D4AE3", "#FAFF59", "#FF68F8", "#2CD1FC", "#36E954"],
    };

    this.init();
    this.animate();

    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("resize", this.resize.bind(this));
  }

  private init() {
    this.ctx.globalCompositeOperation = "saturation";

    for (let i = 0; i < this.maxGlowBubblesNum; i++) {
      const newBubble = new GlowBubble(
        this.canvas.width,
        this.canvas.height,
        this.ctx,
        this.COLORSSET["cmiscm"][
          this.getRandomValueBetween(this.COLORSSET["dark"].length - 2)
        ]
      );

      this.glowBubbleList[i] = newBubble;
    }
  }

  private getRandomValueBetween(n: number): number {
    return Math.floor(Math.random() * n);
  }

  private onMouseMove(event: MouseEvent) {
    this.mouseCoor = { x: event.clientX, y: event.clientY };
  }

  protected resize() {
    super.resize();
    this.glowBubbleList = [];
    this.init();

    if (this.animationRequest) {
      cancelAnimationFrame(this.animationRequest);
      this.animate();
    }
  }

  public animate() {
    this.clear();

    this.glowBubbleList.map((value) => value.animate());

    this.animationRequest = requestAnimationFrame(this.animate.bind(this));
  }

  public startScene() {}

  public changeThemeTo() {}

  public createGlowBubbles() {}

  public removeGlowBubbles() {}
}

export default GlowCanvas;
