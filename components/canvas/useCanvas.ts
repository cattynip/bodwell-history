import { useEffect, useRef, useState } from "react";

export interface IUseCanvas {
  globalFn: CanvasHandler;
  onStart: CanvasHandler;
  onClear?: CanvasHandler;
  onAnimate?: CanvasHandler;
  onResize?: CanvasHandler<UIEvent>;
  onMouseMove?: CanvasHandler<MouseEvent>;
  onMouseDown?: CanvasHandler<MouseEvent>;
  onMouseUp?: CanvasHandler<MouseEvent>;
}

export interface ICanvasHandlerProps<E> {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  event?: E;
}

export type CanvasHandler<E = undefined> = ({
  ctx,
  event,
}: ICanvasHandlerProps<E>) => void;

export const useCanvas = ({
  globalFn,
  onStart,
  onClear,
  onAnimate,
  onResize,
  onMouseMove,
  onMouseUp,
  onMouseDown,
}: IUseCanvas) => {
  const [start, setStart] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (onClear) {
      onClear({ ctx, canvas });
    }
  };

  const starter = () => {
    setStart(true);
  };

  useEffect(() => {
    if (!start) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    onStart({ ctx, canvas });
    globalFn({ ctx, canvas });
  }, [onStart, globalFn, start]);

  useEffect(() => {
    const mouseEventHandler = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (event.type === "mousemove" && onMouseMove) {
        onMouseMove({ ctx, canvas, event });
      } else if (event.type === "mousedown" && onMouseDown) {
        onMouseDown({ ctx, canvas, event });
      } else if (event.type === "mouseup" && onMouseUp) {
        onMouseUp({ ctx, canvas, event });
      }

      globalFn({ ctx, canvas });
    };

    const windowResizeHandler = (event: UIEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (onResize) onResize({ canvas, ctx, event });
      globalFn({ ctx, canvas });
    };

    canvasRef.current?.addEventListener("mousemove", mouseEventHandler);
    canvasRef.current?.addEventListener("mousedown", mouseEventHandler);
    canvasRef.current?.addEventListener("mouseup", mouseEventHandler);
    window.addEventListener("resize", windowResizeHandler);

    return () => {
      window.removeEventListener("resize", windowResizeHandler);
      canvasRef.current?.removeEventListener("mousemove", mouseEventHandler);
      canvasRef.current?.removeEventListener("mousedown", mouseEventHandler);
      /* eslint-disable react-hooks/exhaustive-deps */
      canvasRef.current?.removeEventListener("mouseup", mouseEventHandler);
    };
  }, [onMouseMove, onMouseDown, onMouseUp, onResize, globalFn]);

  return {
    canvasRef,
    canvas: canvasRef.current,
    ctx: canvasRef.current?.getContext("2d"),
    clear,
    starter,
  };
};
