import {
  Button as NativeButton,
  ButtonProps as NativeButtonProps,
} from "react-native";
import { tv, VariantProps } from "tailwind-variants";

const button = tv({
  slots: {
    base: "",
  },

  variants: {
    color: {
      primary: "",
      secondary: "",
    },
  },

  defaultVariants: {
    color: "primary",
  },
});

type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps extends NativeButtonProps, ButtonVariants {
  title: string;
}

function Button({ ...ButtonProps }: ButtonProps) {
  const { base } = button(ButtonProps);
  return <NativeButton className={base()} {...ButtonProps} />;
}

export { Button };
