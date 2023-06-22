import { coordinatePair, rightLeftT } from "@components/StartButton";

export const pythagoras = (x: number, y: number): number => {
  return Math.sqrt(x ** 2 + y ** 2);
};

interface IAnimateHoverProps {
  x: number;
  y: number;
  moveXPosFn?: (moveTo: number) => void;
  moveYPosFn?: (moveTo: number) => void;
  cursorXPos?: number;
  cursorYPos?: number;
  btnLimit: IBtnLimitProps;
}

export interface IBtnLimitProps {
  first: coordinatePair;
  second: coordinatePair;
}

export const calculateHover = ({
  x,
  y,
  moveXPosFn,
  moveYPosFn,
  cursorXPos,
  cursorYPos,
  btnLimit
}: IAnimateHoverProps): void | boolean => {
  if (
    x <= btnLimit.first.x ||
    x >= btnLimit.second.x ||
    y <= btnLimit.first.y ||
    y >= btnLimit.second.y
  ) {
    if (moveXPosFn && moveYPosFn) {
      moveXPosFn(0);
      moveYPosFn(0);
    } else {
      return false;
    }
  } else if (!moveXPosFn && !moveYPosFn && !cursorXPos && !cursorYPos) {
    return true;
  } else {
    if (x > btnLimit.first.x && x < btnLimit.second.x) {
      if (moveXPosFn && cursorXPos) {
        moveXPosFn(cursorXPos);
      }
    }

    if (y > btnLimit.first.y && y < btnLimit.second.y) {
      if (moveYPosFn && cursorYPos) {
        moveYPosFn(cursorYPos);
      }
    }
  }
};

export const calculateFarthest = (
  clickingPos: coordinatePair
): { direction: rightLeftT; distance: number } => {
  if (clickingPos.x < window.innerWidth / 2) {
    return {
      direction: "left",
      distance: pythagoras(window.innerWidth - clickingPos.x, clickingPos.y)
    };
  } else if (clickingPos.x > window.innerWidth / 2) {
    return {
      direction: "right",
      distance: pythagoras(clickingPos.x, clickingPos.y)
    };
  } else {
    return {
      direction: "middle",
      distance: pythagoras(clickingPos.x, clickingPos.y)
    };
  }
};

export const getRandomNumber = (max: number, floor?: boolean): number => {
  return floor ? Math.floor(Math.random() * max) : Math.random() * max;
};

export const getRandomNumberBetween = (
  min: number,
  max: number,
  floor?: boolean
): number => {
  const randomN = floor
    ? Math.floor(Math.random() * (max - min) + min)
    : Math.random() * (max - min) + min;

  return randomN;
};

export const getRandomBoolean = (): boolean => {
  return Math.random() <= 0.5 ? true : false;
};
