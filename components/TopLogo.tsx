import Image from "next/image";
import BodwellLogo from "@public/logo.png";
import { AnimatePresence, motion } from "framer-motion";
import SocialLinkAnchor from "@components/SocialLink";
import { useState } from "react";

const TopLogo = () => {
  const [hoverOnImageArea, setHoverOnImageArea] = useState<boolean>(false);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: [0, -15],
        transition: {
          y: {
            duration: 0.8,
            repeat: 5,
            repeatType: "reverse",
            ease: "easeOut",
          },
          delay: 1,
          duration: 0.5,
        },
      }}
      className="relative"
      onMouseEnter={() => setHoverOnImageArea(true)}
      onMouseLeave={() => setHoverOnImageArea(false)}
    >
      <Image
        src={BodwellLogo}
        alt="Bodwell Logo"
        className={`w-72 h-72 max-w-xs bg-white rounded-full shadow-2xl transition-all ${
          hoverOnImageArea && "blur-xl"
        }`}
        width={720}
        height={720}
        quality={100}
        priority
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
    </motion.div>
  );
};

export default TopLogo;
