import Description from "@components/canvas/Description";
import BasicLayout from "@components/layouts/BasicLayout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Introduction: NextPage = () => {
  const router = useRouter();
  const [nextPage, setNextPage] = useState<boolean>(false);

  useEffect(() => {
    if (nextPage) {
      router.push("/memories/1991");
    }
  }, [nextPage, router]);

  return (
    <BasicLayout hasYearButton={false}>
      <Description
        text={[
          "We have been operating for 32 years.",
          "As much as the operating time is long,\nwe have created a lot of memories.",
          "Right now, we have come to share our memories with you."
        ]}
        canvasShowingStyle="quotes"
        whenCompleted={() => {
          setTimeout(() => {
            setNextPage(true);
          }, 3000);
        }}
      />
    </BasicLayout>
  );
};

export default Introduction;
