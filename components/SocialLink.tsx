import { SocialLinkType } from "@libs/dataManager";
import Anchor from "./Anchor";

import { BsTwitter, BsYoutube } from "react-icons/bs";
import { SiLinktree } from "react-icons/si";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { IconBaseProps } from "react-icons";
import { useState } from "react";

interface ISocialLinkAnchor {
  name: SocialLinkType;
}

export const SocialLinkAnchor = ({ name }: ISocialLinkAnchor) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const url = TypeToLink(name);
  const color = TypeToColor(name);

  return (
    <Anchor href={url} target="_blank">
      <div
        className={`border-[0.08em] border-black p-1.5 rounded-full transition-colors bg-transparent hover:bg-black`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <TypeToIcon
          socialType={name}
          size={20}
          color={isHovered ? color : "#000000"}
        />
      </div>
    </Anchor>
  );
};

interface ITypeToIcon {
  socialType: SocialLinkType;
}

export const TypeToIcon = ({
  socialType,
  ...props
}: ITypeToIcon & IconBaseProps) => {
  const color = TypeToColor(socialType);

  if (socialType === "youtube") {
    return <BsYoutube color={color} {...props} />;
  } else if (socialType === "linktr") {
    return <SiLinktree color={color} {...props} />;
  } else if (socialType === "instagram") {
    return <AiFillInstagram color={color} {...props} />;
  } else if (socialType === "twitter") {
    return <BsTwitter color={color} {...props} />;
  } else if (socialType === "facebook") {
    return <FaFacebookF color={color} {...props} />;
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
    return "#D72579";
  } else if (socialType === "twitter") {
    return "#1C9BEF";
  } else if (socialType === "facebook") {
    return "#1774EB";
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
  } else {
    return "https://google.com/";
  }
};

export default SocialLinkAnchor;
