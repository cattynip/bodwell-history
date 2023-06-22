import StartButton from "@components/StartButton";
import Top from "@components/Top";

const Home = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between bg-gradient-to-b from-byd to-byl py-12">
      <Top />
      <StartButton />
    </div>
  );
};

export default Home;
