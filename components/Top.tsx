import TopLogo from "./TopLogo";

const Top = () => {
  return (
    <div className="flex flex-col items-center justify-between space-y-10">
      <TopLogo />
      <h1 className="flex items-center justify-between px-3 text-center text-5xl font-bold">
        BODWELL HISTORY
      </h1>
    </div>
  );
};

export default Top;
