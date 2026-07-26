import { View } from "react-native";
import { Button, ButtonProps } from "./Button";
import { Text } from "./Text";
import { twJoin } from "tailwind-merge";

interface AlertProps {
  title: string;
  message?: string;
  className?: string;
  buttonsPropsArray?: ButtonProps[];
}
function Alert({ title, message, className, buttonsPropsArray }: AlertProps) {
  return (
    // blur background make a certain size of screen
    <View className="fixed h-inset-0 z-50 flex items-center justify-center bg-black/50">
      <View className={twJoin(className, "bg-white p-6 rounded-lg shadow-xl")}>
        <Text fontSize="h2">{title}</Text>
        {message && <Text>{message}</Text>}
        {/* {buttonsPropsArray && (
        <View>
          {buttonsPropsArray?.map((buttonProp: ButtonProps, index) => {
            <Button key={index} {...buttonProp} />;
          })}
        </View>
      )} */}
      </View>
    </View>
  );
}

export { Alert };
