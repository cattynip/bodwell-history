import Image from "next/image";
import BodwellLogo from "@public/logo.png";

const Home = () => {
  return (
    <>
      <div className="bg-white rounded-full w-80">
        <Image src={BodwellLogo} alt="Bodwell Logo" width={500} height={500} />
      </div>
      <h1>BODWELL</h1>
      {/* TODO: Make this part a component so the content of this tag can be changed. */}
      <p>1991 ~ 2023</p>
      <h2>30 YEARS</h2>
      <p>OF A SCHOOL VISIOn</p>
      {/* Links */}
      <div></div>
      <div className="w-14 h-14 bg-black rounded-full"></div>
    </>
  );
};

export default Home;
