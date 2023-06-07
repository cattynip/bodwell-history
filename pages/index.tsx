import StartButton from "@components/StartButton";
import Top from "@components/Top";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-between h-full py-12">
      <Top />
      <StartButton />
    </div>
  );
};

export default Home;
