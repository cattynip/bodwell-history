import StartButton from "@components/StartButton";
import Top from "@components/Top";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-between w-full h-full py-12 bg-gradient-to-b from-byd to-byl">
      <Top />
      <StartButton />
    </div>
  );
};

export default Home;
