import TopLogo from "./TopLogo";

const Top = () => {
  return (
    <div className="flex flex-col items-center justify-between space-y-10">
      <TopLogo />
      <h1 className="font-bold text-5xl flex items-center justify-between text-center px-3">
        BODWELL HISTORY
      </h1>
    </div>
  );
};

export default Top;
