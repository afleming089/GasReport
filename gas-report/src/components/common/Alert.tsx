import { View } from "react-native";
import { Button, ButtonProps } from "./Button";
import { Text } from "./Text";

interface AlertProps {
  title: string;
  message?: string;
  buttons?: ButtonProps[];
}
function Alert({ title, message, buttons }: AlertProps) {
  return (
    <View>
      <Text fontSize="h2">{title}</Text>
      <Text>{message}</Text>
    </View>
  );
}

export { Alert };
