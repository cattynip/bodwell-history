const BodwellInfo: IBodwellInfo = {
  name: "Bodwell High School",
};

interface IBodwellInfo {
  name: string;
}

interface ISocialLinks {
  twitter: string;
  instagram: string;
  facebook: string;
  youtube: string;
  linktr: string;
  website: stirng;
}

export type SocialLinkType = keyof ISocialLinks;

export default BodwellInfo;
