import {
  Button as NativeButton,
  ButtonProps as NativeButtonProps,
} from "react-native";

interface ButtonProps extends NativeButtonProps {
  title: string;
}

function Button({ ...ButtonProps }: ButtonProps) {
  return <NativeButton {...ButtonProps} />;
}

export { Button };
