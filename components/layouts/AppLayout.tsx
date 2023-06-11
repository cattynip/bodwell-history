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

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          data-hid="twitter:title"
          name="twitter:title"
          property="twitter:title"
          content="Bodwell History"
        />
        <meta
          data-hid="twitter:description"
          name="twitter:description"
          property="twitter:description"
          content="Explore Bodwell High School through historical events!"
        />
        <meta
          data-hid="twitter:image"
          name="twitter:image"
          property="twitter:image"
          content="https://bodwell-history.vercel.app/logo.png"
        />
        <meta
          data-hid="twitter:image:alt"
          name="twitter:image:alt"
          property="twitter:image:alt"
          content="Bodwell History"
        />
        <meta
          data-hid="og:title"
          name="og:title"
          property="og:title"
          content="Bodwell History"
        />
        <meta
          data-hid="og:description"
          name="og:description"
          property="og:description"
          content="Explore Bodwell High School through historical events!"
        />
        <meta
          data-hid="og:image"
          name="og:image"
          property="og:image"
          content="https://bodwell-history.vercel.app/logo.png"
        />
        <meta
          data-hid="og:image:secure_url"
          name="og:image:secure_url"
          property="og:image:secure_url"
          content="https://bodwell-history.vercel.app/logo.png"
        />
        <meta
          data-hid="og:image:alt"
          name="og:image:alt"
          property="og:image:alt"
          content="Bodwell History"
        />
      </Head>

      <div className="mx-auto w-full h-[100vh] text-gray-950">{children}</div>
    </>
  );
};

export default AppLayout;
