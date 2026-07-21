import { tv, VariantProps } from "tailwind-variants";
import { Text as NativeText, TextProps as NativeTextProps } from "react-native";
import { align } from "@expo/ui/jetpack-compose/modifiers";

const text = tv({
  slots: {
    base: "",
  },

  variants: {
    fontSize: {
      h1: "text-3xl",
      h2: "text-2xl",
      h3: "text-xl",
      h4: "text-lg",
      base: "text-base",
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
    <NativeText className={`${className} + ${base()}`} {...TextProps}>
      {children}
    </NativeText>
  );
}

export { Text };
