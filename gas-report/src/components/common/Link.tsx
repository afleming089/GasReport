import {
  Href,
  Link as NativeLink,
  LinkProps as NativeLinkProps,
} from "expo-router";
import { tv, VariantProps } from "tailwind-variants";

const link = tv({
  slots: {
    base: "p-1 rounded-sm",
  },

  variants: {
    border: {
      solid: "border",
      bottom: "border-b rounded-b-none ",
    },
    fontSize: {
      base: "text-base",
    },
    color: {
      skyBlue: "border-skyBlue hover:bg-misty text-skyBlue",
      misty: "border-misty hover:bg-lightGray text-misty",
    },
  },
  defaultVariants: {
    border: "bottom",
    fontSize: "base",
    color: "skyBlue",
  },
});

type LinkVariants = VariantProps<typeof link>;

interface LinkProps extends NativeLinkProps, LinkVariants {
  title: string;
  href: Href;
}

function Link({ title, href, className, ...LinkProps }: LinkProps) {
  const { base } = link(LinkProps);
  return (
    <NativeLink
      className={`${className} + ${base()}`}
      href={href}
      {...LinkProps}>
      {title}
    </NativeLink>
  );
}

export { Link };
