import YearButton from "@components/YearButton";
import { ILayoutProps } from "./AppLayout";

interface IBasicLayoutProps extends ILayoutProps {
  hasYearButton: boolean;
}

const BasicLayout = ({ children, hasYearButton }: IBasicLayoutProps) => {
  return (
    <div className="mx-auto flex h-full items-center justify-center px-2 sm:max-w-2xl md:max-w-3xl">
      {hasYearButton && <YearButton />}
      {children}
    </div>
  );
};

export default BasicLayout;
