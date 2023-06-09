import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const IntervalServerErorr: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return <></>;
};

export default IntervalServerErorr;
