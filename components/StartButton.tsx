import { useEffect, useRef, useState } from "react";
import {
  SpringOptions,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRouter } from "next/router";

type coordinatePair = { x: number; y: number };

const StartButton = () => {
  const router = useRouter();
  const parentRef = useRef<HTMLDivElement>(null);

  const btnLimitRange = 0;
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
    damping: 100,
    stiffness: 1000,
    mass: 10,
  };
  const cursorXSpring = useSpring(cursorX, animationConfig);
  const cursorYSpring = useSpring(cursorY, animationConfig);

  const goToNextPage = () => {
    router.push("/introduction");
  };

  useEffect(() => {
    if (!parentRef.current) return;

    const moveCursor = (event: MouseEventInit) => {
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

      if (
        event.clientX <= btnLimit.first.x ||
        event.clientX >= btnLimit.second.x ||
        event.clientY <= btnLimit.first.y ||
        event.clientY >= btnLimit.second.y
      ) {
        cursorX.set(0);
        cursorY.set(0);
      } else {
        if (
          !(
            event.clientX <= btnLimit.first.x ||
            event.clientX >= btnLimit.second.x
          )
        ) {
          cursorX.set(cursorXPos);
        }

        if (
          !(
            event.clientY <= btnLimit.first.y ||
            event.clientY >= btnLimit.second.y
          )
        ) {
          cursorY.set(cursorYPos);
        }
      }
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY, btnLimit]);

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
    <div
      ref={parentRef}
      className="w-36 h-36 flex items-center justify-center border border-gray-500 rounded-full"
    >
      <motion.div
        className="w-24 h-24 bg-mbg rounded-full"
        style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
      />
    </div>
  );
};

export default StartButton;
