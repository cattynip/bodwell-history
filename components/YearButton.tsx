import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MinMaxT } from "./canvas/GlowCanvas";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const yearRange: MinMaxT = {
  min: 1991,
  max: 2020
};

const YearButton = () => {
  const router = useRouter();
  const [currentYear, setCurrentYear] = useState<number>(yearRange.min);

  useEffect(() => {
    const yearQuery = router.query.year;

    if (!yearQuery || typeof yearQuery === "object") return;

    if (yearRange.min > currentYear || yearRange.max < currentYear) {
      router.push(`/memories/${yearRange.min}`);
    }

    setCurrentYear(parseInt(yearQuery));
  }, [router, currentYear]);

  const onArrowButtonClick = (goToNext: boolean) => {
    router.push(`/memories/${currentYear + (goToNext ? 1 : -1)}`);
  };

  return (
    <>
      <div className="mx-auto mt-3 flex w-32 items-center justify-between rounded-md bg-gray-800 px-3 py-2 text-center text-white shadow-xl">
        <button onClick={() => onArrowButtonClick(false)}>
          <MdKeyboardArrowLeft
            size={30}
            className="text-gray-500 transition-colors hover:text-white"
          />
        </button>
        <span>{currentYear}</span>
        <button onClick={() => onArrowButtonClick(true)}>
          <MdKeyboardArrowRight
            size={30}
            className="text-gray-500 transition-colors hover:text-white"
          />
        </button>
      </div>
    </>
  );
};

export default YearButton;
