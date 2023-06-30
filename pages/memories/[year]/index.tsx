import BasicLayout from "@components/layouts/BasicLayout";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Year: NextPage = () => {
  return (
    <BasicLayout hasYearButton>
      <div>{useRouter().query.year}</div>
    </BasicLayout>
  );
};

export default Year;
