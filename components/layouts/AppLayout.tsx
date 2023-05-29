import Head from "next/head";

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout = ({ children }: IAppLayout) => {
  return (
    <>
      <Head>
        <title>Bodwell History</title>
      </Head>

      <div className="max-w-2xl w-full p-3 mx-auto">{children}</div>
    </>
  );
};

export default AppLayout;
