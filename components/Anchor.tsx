import { AnchorHTMLAttributes, HTMLAttributeAnchorTarget } from "react";
import Link, { LinkProps } from "next/link";

interface IAnchorProps {
  children: React.ReactNode;
  target: HTMLAttributeAnchorTarget;
}

const Anchor = ({
  children,
  target,
  ...props
}: IAnchorProps & AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps) => {
  return (
    <Link passHref legacyBehavior {...props}>
      <a
        target={target ? target : "_self"}
        className="transition-all focus:outline-none focus:-translate-y-0.5 hover:-translate-y-0.5"
      >
        {children}
      </a>
    </Link>
  );
};

export default Anchor;
