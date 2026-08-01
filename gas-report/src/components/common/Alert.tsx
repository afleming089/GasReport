import { Button, ButtonProps } from "./Button";
import { Text } from "./Text";
import { TextInput, TextInputProps } from "./TextInput";

import { View } from "react-native";
import { twJoin } from "tailwind-merge";
import { Dispatch, SetStateAction } from "react";

interface AlertProps {
  title?: string;
  message?: string;
  status?: number;
  setAlertState: Dispatch<SetStateAction<AlertProps | null>>;
  className?: string;
  buttonsPropsArray?: ButtonProps[];
  textInputArray?: TextInputProps[];
}

function Alert({
  title,
  message,
  status,
  className,
  setAlertState,
  buttonsPropsArray,
  textInputArray,
}: AlertProps) {
  return (
    <View className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 h-[100vh]">
      <View
        className={twJoin(
          className,
          "absolute top-20 z-50 p-11 flex items-center justify-center bg-white rounded-lg shadow-xl gap-2 sm:w-[400px] md:w-[430px]",
        )}>
        <Button
          className="absolute top-3 right-3 p-0 mb-2"
          hitSlop={20}
          onPress={() => setAlertState(null)}
          title="x"
        />

        {status && (
          <Text className="text-center" fontSize="h2">
            {status}
          </Text>
        )}
        {title && (
          <Text className="text-center" fontSize="h2">
            {title}
          </Text>
        )}
        {message && (
          <Text className="text-center" fontSize="sm">
            {message}
          </Text>
        )}

        {textInputArray && (
          <View className="flex gap-2 w-full">
            {textInputArray.map(
              (textInputProp: TextInputProps, index: number) => (
                <TextInput key={index} {...textInputProp} />
              ),
            )}
          </View>
        )}

        {buttonsPropsArray && (
          <View className="flex gap-2 w-full flex-row justify-center mt-2">
            {buttonsPropsArray.map((buttonProp: ButtonProps, index: number) => (
              <Button className="flex-1" key={index} {...buttonProp} />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

export { Alert, AlertProps };
