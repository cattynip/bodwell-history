import Image from "next/image";
import BodwellLogo from "@public/logo.png";
import { AnimatePresence, motion } from "framer-motion";
import SocialLinkAnchor from "@components/SocialLink";
import { useState } from "react";

const TopLogo = () => {
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const [hoverOnImageArea, setHoverOnImageArea] = useState<boolean>(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHoverOnImageArea(true)}
      onMouseLeave={() => setHoverOnImageArea(false)}
    >
      <Image
        src={BodwellLogo}
        alt="Bodwell Logo"
        className={`w-[17rem] h-[17rem] max-w-xs bg-white rounded-full shadow-2xl transition-all ${
          hoverOnImageArea && "blur-xl"
        }`}
        width={720}
        height={720}
        quality={100}
        priority
        onLoadingComplete={() => setStartAnimation(true)}
      />
      <AnimatePresence>
        {hoverOnImageArea && (
          <div className="max-w-md absolute w-full h-full top-0 left-0 grid grid-cols-2 grid-rows-3 gap-4">
            <SocialLinkAnchor name="youtube" delay={1} />
            <SocialLinkAnchor name="instagram" delay={2} />
            <SocialLinkAnchor name="twitter" delay={3} />
            <SocialLinkAnchor name="facebook" delay={4} />
            <SocialLinkAnchor name="linktr" delay={5} />
            <SocialLinkAnchor name="website" delay={6} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopLogo;
