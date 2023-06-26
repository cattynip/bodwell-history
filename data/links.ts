interface ISocialLinks {
  twitter: string;
  instagram: string;
  facebook: string;
  youtube: string;
  linktr: string;
  website: string;
}

export type SocialLinkType = keyof ISocialLinks;

export default ISocialLinks;
