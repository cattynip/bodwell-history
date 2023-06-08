import {
  DragEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  SpringOptions,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRouter } from "next/router";

type coordinatePair<T = number> = { x: T; y: T };

interface IAnimateHoverProps {
  x: number;
  y: number;
  moveXPosFn: (moveTo: number) => void;
  moveYPosFn: (moveTo: number) => void;
  cursorXPos: number;
  cursorYPos: number;
}

const StartButton = () => {
  const router = useRouter();
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const btnLimitRange = 20;
  const [btnLimit, setBtnLimit] = useState<{
    first: coordinatePair;
    second: coordinatePair;
  }>({
    first: { x: 0, y: 0 },
    second: { x: 0, y: 0 },
  });

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const animationConfig: SpringOptions = {
    damping: 300,
    stiffness: 1500,
    mass: 10,
  };
  const cursorXSpring = useSpring(cursorX, animationConfig);
  const cursorYSpring = useSpring(cursorY, animationConfig);

  const goToNextPage = () => {
    router.push("/introduction");
  };

  const calculateHover = useCallback(
    ({
      x,
      y,
      moveXPosFn,
      moveYPosFn,
      cursorXPos,
      cursorYPos,
    }: IAnimateHoverProps) => {
      if (
        x <= btnLimit.first.x ||
        x >= btnLimit.second.x ||
        y <= btnLimit.first.y ||
        y >= btnLimit.second.y
      ) {
        moveXPosFn(0);
        moveYPosFn(0);
      } else {
        if (!(x <= btnLimit.first.x || x >= btnLimit.second.x)) {
          moveXPosFn(cursorXPos);
        }

        if (!(y <= btnLimit.first.y || y >= btnLimit.second.y)) {
          moveYPosFn(cursorYPos);
        }
      }
    },
    [btnLimit]
  );

  const animateBtn = useCallback(
    (event: MouseEvent<HTMLDivElement> | MouseEventInit) => {
      if (!parentRef.current) return;
      if (!event.clientX || !event.clientY) return;

      const cursorXPos = -(
        parentRef.current.offsetLeft +
        parentRef.current.clientWidth / 2 -
        event.clientX
      );
      const cursorYPos = -(
        parentRef.current.offsetTop +
        parentRef.current.clientHeight / 2 -
        event.clientY
      );

      calculateHover({
        x: event.clientX,
        y: event.clientY,
        moveXPosFn(moveTo) {
          cursorX.set(moveTo);
        },
        moveYPosFn(moveTo) {
          cursorY.set(moveTo);
        },
        cursorXPos,
        cursorYPos,
      });
    },
    [calculateHover, cursorX, cursorY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", animateBtn);

    return () => {
      window.removeEventListener("mousemove", animateBtn);
    };
  }, [cursorX, cursorY, calculateHover, animateBtn]);

  useEffect(() => {
    if (!parentRef.current) return;

    const left = parentRef.current.offsetLeft - btnLimitRange;
    const top = parentRef.current.offsetTop - btnLimitRange;
    const right =
      parentRef.current.offsetLeft +
      parentRef.current.clientWidth +
      btnLimitRange;
    const bottom =
      parentRef.current.offsetTop +
      parentRef.current.clientHeight +
      btnLimitRange;

    setBtnLimit({
      first: { x: left, y: top },
      second: { x: right, y: bottom },
    });
  }, []);

  return (
    <AnimatePresence>
      <div
        ref={parentRef}
        className="w-36 h-36 flex items-center justify-center border border-gray-500 rounded-full cursor-pointer"
        onMouseMove={animateBtn}
      >
        <motion.div
          ref={childRef}
          className="w-32 h-32 bg-mbg rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            translateX: cursorXSpring,
            translateY: cursorYSpring,
            scale: btnScaleUp,
          }}
        />
      </div>
    </AnimatePresence>
  );
};

export default StartButton;
