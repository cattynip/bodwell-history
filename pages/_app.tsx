import AppLayout from "@components/layouts/AppLayout";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Palette = dynamic(() => import("@components/canvas/palette"), {
  ssr: true
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isBackgroundDisplayed, setIsBackgroundDisplayed] =
    useState<boolean>(false);

  useEffect(() => {
    const showingBackground = router.pathname !== "/";

    if (!showingBackground) {
      setIsBackgroundDisplayed(false);
    } else {
      setIsBackgroundDisplayed(true);
    }
  }, [router]);

  return (
    <AppLayout>
      <Component {...pageProps} />
      {isBackgroundDisplayed && <Palette theme="blue" />}
    </AppLayout>
  );
}
