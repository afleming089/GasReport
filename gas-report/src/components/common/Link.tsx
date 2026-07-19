import { Href, Link as NativeLink } from "expo-router";
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

interface LinkProps extends LinkVariants {
  //variant?: keyof typeof linkVariants;
  title: string;
  href: Href;
}

function Link({ title, href, ...LinkProps }: LinkProps) {
  const { base } = link(LinkProps);
  return (
    <NativeLink className={base()} href={href}>
      {title}
    </NativeLink>
  );
}

export { Link };
