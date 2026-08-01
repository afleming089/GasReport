import {
  Href,
  Link as NativeLink,
  LinkProps as NativeLinkProps,
} from "expo-router";
import { Text, Pressable } from "react-native";
import { twJoin } from "tailwind-merge";
import { tv, VariantProps } from "tailwind-variants";

const link = tv({
  slots: {
    base: "rounded-sm p-1",
    text: "text-center",
  },

  variants: {
    border: {
      solid: { base: "border" },
      bottom: { base: "border-b rounded-b-none" },
    },
    fontSize: {
      lg: { text: "text-lg" },
      base: { text: "text-base" },
    },
    color: {
      skyBlue: {
        base: "border-skyBlue active:bg-misty hover:bg-misty",
        text: "text-skyBlue",
      },
      misty: {
        base: "border-misty active:bg-lightGray hover:bg-lightGray",
        text: "text-misty",
      },
      hazard: {
        base: "border-hazard active:bg-lightHazard hover:bg-lightHazard",
        text: "text-hazard",
      },
    },
  },
  defaultVariants: {
    border: "solid",
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
  const { base, text } = link(LinkProps);
  return (
    <NativeLink href={href} {...LinkProps} asChild>
      <Pressable className={twJoin(base(), className)}>
        <Text className={text()}>{title}</Text>
      </Pressable>
    </NativeLink>
  );
}

export { Link, LinkProps };
