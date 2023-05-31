import Head from "next/head";

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout = ({ children }: IAppLayout) => {
  return (
    <>
      <Head>
        <title>Bodwell History</title>
        <meta name="author" content="Cattynip <cattynip.cattynip@gmail.com>" />
        <meta name="viewport" content="width=device-width" />
      </Head>

      <div className="max-w-2xl p-3 mx-auto w-full h-[100vh]">{children}</div>
    </>
  );
};

export default AppLayout;
