import {
  MouseEvent,
  MouseEvent as MouseEventI,
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
import { IBtnLimitProps, calculateFarthest, calculateHover } from "@libs/maths";

export type coordinatePair<T = number> = { x: T; y: T };
export type sizePair<T = number> = { width: T; height: T };
export type pointT = "leftTop" | "leftBottom" | "rightTop" | "rightBottom";
export type rightLeftT = "right" | "left" | "middle";

// 1. Button 과 Window 모두에 Event Listener 를 붙여 마우스의 움직임을 감지하고 애니메이션을 추가함
// 2. Button 에서는 onMouseMove 함수추가하고, Window 에 Event Listener 를 붙여 "
// 3. Window 에만 Event Listener 붙여 감지 및 움직임을 만듦.

// 1. Framer motion 에서 제공해주는 drag method 와 함께 애니메이션을 만들기에는 불충분하여, onMouseDown 과 onClick method 들로 대체하여 퍼포먼스를 높임
// 2. mouseUp 이벤트에 대한 문제가 발생
//     항상 Start Button 내부에서 mouse up 이벤트를 detect 하였기 때문임 -> window 로 이벤트를 옮김으로써 문제해결
// 3. 언제 Start Button 이 Screen 을 꽉 채어넣어서 다음 페이지로 route replace 할지를 모르는 문제 발생
//     Window Screen 과 Start Button 의 비율을 따저 문제해결을 하려고 하였지만, Start Button 이 원이라는 점과 항상 중간에서부터 커지지 않는다는 점 때문에, 계산 불가
//     Screen 이 유동하다는 점을 고려하여, Start Button 이 커지기 시작했었던 마우스 클릭 위치와 그곳으로부터 가장 먼 쪽과 Start Button 의 반지름(가로 또는 세로의 2로 나눈 값. 왜냐하면 원은 항상 똑바른 원이기 때문) 를 비교해 이 원이 Screen 을 모두 꽉 채웠는지 확인

// 1. Start Button 이 window size 가 바뀔때마다 작동이 잘 되지 않는 문제가 있었음
// 2. Window 에 Resize 라는 Event Listener 를 붙여 Hover Liimt 를 계속 window size 가 바뀔때마다 업데이토록 고침으로써 해결

const StartButton = () => {
  const router = useRouter();
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const btnLimitRange = 15;
  const [btnLimit, setBtnLimit] = useState<IBtnLimitProps>({
    first: { x: 0, y: 0 },
    second: { x: 0, y: 0 },
  });

  const btnScaleUp = useMotionValue(1);
  const btnScaleUpSpringConfig: SpringOptions = {
    damping: 100,
    bounce: 5,
    stiffness: 800,
  };
  const btnScaleUpSpring = useSpring(btnScaleUp, btnScaleUpSpringConfig);
  const btnScaleUpRatio = 5;
  const [pressingInfo, setPressingInfo] = useState<{
    pressed: boolean;
    coor: coordinatePair | false;
    farthest:
      | {
          direction: rightLeftT;
          distance: number;
        }
      | false;
  }>({
    pressed: false,
    farthest: false,
    coor: {
      x: 0,
      y: 0,
    },
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
  const [isNextPage, setIsNextPage] = useState<{
    dragging: boolean;
    mouseUp: boolean;
  }>({
    dragging: false,
    mouseUp: false,
  });

  const goToNextPage = () => {
    router.push("/introduction");
  };

  const getIsNextPage = useCallback(() => {
    if (isNextPage.dragging && isNextPage.mouseUp) {
      return true;
    } else {
      return false;
    }
  }, [isNextPage]);

  const animateBtn = useCallback(
    (clickingPosX: number, clickingPosY: number) => {
      if (!parentRef.current) return;
      if (getIsNextPage()) return;

      const cursorXPos = -(
        parentRef.current.offsetLeft +
        parentRef.current.clientWidth / 2 -
        clickingPosX
      );

      const cursorYPos = -(
        parentRef.current.offsetTop +
        parentRef.current.clientHeight / 2 -
        clickingPosY
      );

      calculateHover({
        x: clickingPosX,
        y: clickingPosY,
        moveXPosFn(moveTo) {
          cursorX.set(moveTo);
        },
        moveYPosFn(moveTo) {
          cursorY.set(moveTo);
        },
        cursorXPos,
        cursorYPos,
        btnLimit,
      });
    },
    [cursorX, cursorY, getIsNextPage, btnLimit]
  );

  const animateBtnWithEvent = useCallback(
    (event: MouseEventI<HTMLDivElement> | MouseEventInit) => {
      if (!event.clientX || !event.clientY) return;
      if (pressingInfo.pressed) return;

      animateBtn(event.clientX, event.clientY);
    },
    [animateBtn, pressingInfo]
  );

  const onBtnDragged = (event: MouseEvent<HTMLDivElement>) => {
    if (getIsNextPage()) return;
    if (!childRef.current) return;
    if (pressingInfo.pressed && pressingInfo.coor && pressingInfo.farthest) {
      const newY = pressingInfo.coor.y - event.clientY;

      if (newY >= 0 && newY <= 10) {
        btnScaleUp.set(1);
      } else if (newY < 0) {
        if (btnScaleUp.get() <= 1) {
          btnScaleUp.jump(1);
        }
        btnScaleUp.set(btnScaleUp.getPrevious() - 1);
      } else {
        btnScaleUp.set(newY / btnScaleUpRatio);
      }

      const isFillingOut =
        childRef.current.getBoundingClientRect().width / 2 >=
        pressingInfo.farthest.distance;

      if (isFillingOut) {
        btnScaleUp.set(200);
      }

      setIsNextPage((prev) => ({
        ...prev,
        dragging: isFillingOut,
      }));
    }
  };

  const onBtnMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (getIsNextPage()) return;
    if (!childRef.current) return;

    // Get the farthest;
    const farthest = calculateFarthest({
      x: event.clientX,
      y: event.clientY,
    });

    setPressingInfo({
      pressed: true,
      farthest,
      coor: {
        x: event.clientX,
        y: event.clientY,
      },
    });

    setIsNextPage((prev) => ({
      ...prev,
      mouseUp: false,
    }));
  };

  const onBtnMouseUp = useCallback(
    (_event: MouseEvent<HTMLDivElement> | UIEvent) => {
      btnScaleUp.set(1);
      setPressingInfo({
        pressed: false,
        farthest: false,
        coor: false,
      });
      if (isNextPage.dragging) {
        setIsNextPage((prev) => ({
          ...prev,
          mouseUp: true,
        }));
      }
    },
    [btnScaleUp, isNextPage]
  );

  const setLimit = useCallback(() => {
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

  useEffect(() => {
    window.addEventListener("mousemove", animateBtnWithEvent);
    window.addEventListener("mouseup", onBtnMouseUp);
    window.addEventListener("resize", setLimit);

    return () => {
      window.removeEventListener("mousemove", animateBtnWithEvent);
      window.removeEventListener("mouseup", onBtnMouseUp);
      window.removeEventListener("resize", setLimit);
    };
  }, [
    cursorX,
    cursorY,
    animateBtn,
    animateBtnWithEvent,
    onBtnMouseUp,
    setLimit,
  ]);

  useEffect(() => {
    setLimit();
  }, [setLimit]);

  useEffect(() => {
    if (getIsNextPage()) {
      goToNextPage();
    }

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isNextPage]);

  return (
    <AnimatePresence>
      <div
        ref={parentRef}
        className="w-28 h-28 flex items-center justify-center border border-gray-500 rounded-full cursor-pointer"
      >
        <motion.div
          ref={childRef}
          className="w-24 h-24 bg-mbg rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onMouseDown={onBtnMouseDown}
          onMouseUp={onBtnMouseUp}
          onMouseMove={onBtnDragged}
          style={{
            translateX: cursorXSpring,
            translateY: cursorYSpring,
            scale: btnScaleUpSpring,
          }}
        />
      </div>
    </AnimatePresence>
  );
};

export default StartButton;
