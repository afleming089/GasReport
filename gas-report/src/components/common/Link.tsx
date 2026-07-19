import { Href, Link as NativeLink } from "expo-router";
import { tv, VariantProps } from "tailwind-variants";

const link = tv({
  slots: {
    base: "p-1 hover:bg-gray-300 rounded-sm",
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
      muted: "border-lightGray text-lightGray",
      darkGray: "border-darkGray text-darkGray",
    },
  },
  defaultVariants: {
    border: "bottom",
    fontSize: "base",
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
