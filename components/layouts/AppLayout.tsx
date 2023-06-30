import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setLocalLang } from "@components/languageProvider";
import YearButton from "@components/YearButton";

const Palette = dynamic(() => import("@components/canvas/palette"), {
  ssr: true
});

export interface ILayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: ILayoutProps) => {
  const router = useRouter();
  const [isBackgroundDisplayed, setIsBackgroundDisplayed] =
    useState<boolean>(false);
  const [isIntroductionRoute, setIsIntroductionRoute] = useState<boolean>(
    router.pathname === "/introduction"
  );

  useEffect(() => {
    setIsIntroductionRoute(router.pathname === "/introduction");
    const showingBackground = router.pathname !== "/";

    if (!showingBackground) {
      setIsBackgroundDisplayed(false);
    } else {
      setIsBackgroundDisplayed(true);
    }
  }, [router]);

  useEffect(() => {
    setLocalLang();
  }, []);

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

      <main>
        <div className="mx-auto h-[100vh] w-full text-gray-950">{children}</div>

        {isBackgroundDisplayed && (
          <Palette theme="cmiscm" delay={isIntroductionRoute ? 10000 : 1000} />
        )}
      </main>
    </>
  );
};

export default AppLayout;
