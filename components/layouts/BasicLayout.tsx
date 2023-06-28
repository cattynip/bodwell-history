import { ILayoutProps } from "./AppLayout";

const BasicLayout = ({ children }: ILayoutProps) => {
  return (
    <div className="mx-auto flex h-full items-center justify-center px-2 sm:max-w-2xl md:max-w-3xl">
      {children}
    </div>
  );
};

export default BasicLayout;
