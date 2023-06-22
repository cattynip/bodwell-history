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
        className="transition-all hover:-translate-y-0.5 focus:-translate-y-0.5 focus:outline-none"
      >
        {children}
      </a>
    </Link>
  );
};

export default Anchor;
