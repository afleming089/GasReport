import { tv, VariantProps } from "tailwind-variants";
import { twJoin } from "tailwind-merge";
import { Text as NativeText, TextProps as NativeTextProps } from "react-native";

const text = tv({
  slots: {
    base: "",
    color: "",
    align: "",
  },

  variants: {
    align: {
      center: "text-center",
    },
    color: {
      white: "text-offWhite",
    },
    fontSize: {
      h1: "text-3xl",
      h2: "text-2xl",
      h3: "text-xl",
      h4: "text-lg",
      base: "text-base",
      sm: "text-sm",
    },
  },
  defaultVariants: {
    fontSize: "base",
  },
});

type TextVariants = VariantProps<typeof text>;

interface TextProps extends NativeTextProps, TextVariants {}

function Text({ children, className, ...TextProps }: TextProps) {
  const { base } = text(TextProps);

  return (
    <NativeText className={twJoin(className, base())} {...TextProps}>
      {children}
    </NativeText>
  );
}

export { Text, TextProps, TextVariants };
