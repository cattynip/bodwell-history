import { SocialLinkType } from "@data/links";
import Anchor from "./Anchor";

import { BsLink45Deg, BsTwitter, BsYoutube } from "react-icons/bs";
import { SiLinktree } from "react-icons/si";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { IconBaseProps } from "react-icons";
import { motion } from "framer-motion";
import { useState } from "react";
// import ExpandableAnchor from "./ExpandableAnchor";

interface ISocialLinkAnchorProps {
  name: SocialLinkType;
  delay: number;
  extraClassname?: string;
}

export const SocialLinkAnchor = ({
  name,
  delay,
  extraClassname,
  ...props
}: ISocialLinkAnchorProps & IconBaseProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const url = TypeToLink(name);
  const color = TypeToColor(name);

  return (
    <motion.div
      initial={{
        y: -20,
        opacity: 0
      }}
      animate={{
        y: 0,
        opacity: 1
      }}
      transition={{
        delay: (delay / 1000) * 100
      }}
      exit={{
        y: 20,
        opacity: 0,
        transition: {
          duration: 0.2
        }
      }}
      className="flex flex-col items-center justify-center"
    >
      <Anchor href={url} target="_blank">
        <div
          className={`mx-auto w-min cursor-pointer rounded-full border-[0.08em] border-black bg-transparent p-3 transition-colors hover:bg-black ${
            extraClassname ? extraClassname : ""
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <TypeToIcon
            socialType={name}
            size={30}
            color={isHovered ? color : "#000000"}
            {...props}
          />
        </div>
        <p className="text-center">{name}</p>
      </Anchor>
    </motion.div>
  );
};

interface ITypeToIconProps {
  socialType: SocialLinkType;
}

export const TypeToIcon = ({
  socialType,
  ...props
}: ITypeToIconProps & IconBaseProps) => {
  const color = TypeToColor(socialType);

  if (socialType === "youtube") {
    return (
      <BsYoutube
        color={color}
        className="translate-x-[1px] translate-y-[1px]"
        {...props}
      />
    );
  } else if (socialType === "linktr") {
    return <SiLinktree color={color} {...props} />;
  } else if (socialType === "instagram") {
    return <AiFillInstagram color={color} {...props} />;
  } else if (socialType === "twitter") {
    return <BsTwitter color={color} {...props} />;
  } else if (socialType === "facebook") {
    return (
      <FaFacebookF color={color} className="-translate-x-[1px]" {...props} />
    );
  } else if (socialType === "website") {
    return <BsLink45Deg color={color} {...props} />;
  } else {
    return <></>;
  }
};

export const TypeToColor = (socialType: SocialLinkType): string => {
  if (socialType === "youtube") {
    return "#FF0000";
  } else if (socialType === "linktr") {
    return "#41DA5C";
  } else if (socialType === "instagram") {
    return "#E03184";
  } else if (socialType === "twitter") {
    return "#1C9BEF";
  } else if (socialType === "facebook") {
    return "#1774EB";
  } else if (socialType === "website") {
    return "#BBBBBB";
  } else {
    return "#00FF00";
  }
};

export const TypeToLink = (socialType: SocialLinkType): string => {
  if (socialType === "youtube") {
    return "https://www.youtube.com/c/BodwellEdu955";
  } else if (socialType === "linktr") {
    return "https://linktr.ee/bodwell";
  } else if (socialType === "instagram") {
    return "https://www.instagram.com/mybodwell/";
  } else if (socialType === "twitter") {
    return "https://twitter.com/mybodwell";
  } else if (socialType === "facebook") {
    return "https://www.facebook.com/bodwellhighschool/";
  } else if (socialType === "website") {
    return "https://bodwell.edu/";
  } else {
    return "https://google.com/";
  }
};

export default SocialLinkAnchor;
