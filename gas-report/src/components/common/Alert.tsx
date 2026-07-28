import { Button, ButtonProps, Text, TextInput, TextInputProps } from "./Common";
import { View } from "react-native";
import { twJoin } from "tailwind-merge";
import { Dispatch, SetStateAction } from "react";

interface AlertProps {
  title: string;
  message?: string;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  className?: string;
  buttonsPropsArray?: ButtonProps[];
  textInputArray?: TextInputProps[];
}

function Alert({
  title,
  message,
  className,
  setShowAlert,
  buttonsPropsArray,
  textInputArray,
}: AlertProps) {
  return (
    <View className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <View
        className={twJoin(
          className,
          "fixed h-inset-0 z-50 p-11 flex items-center justify-center bg-white rounded-lg shadow-xl gap-2",
        )}>
        <Button
          className="absolute top-3 right-3"
          onPress={() => setShowAlert(false)}
          title="x"
        />

        <Text fontSize="h2">{title}</Text>
        {message && <Text className="text-left">{message}</Text>}

        {textInputArray && (
          <View>
            {textInputArray.map(
              (textInputProp: TextInputProps, index: number) => (
                <TextInput key={index} {...textInputProp} />
              ),
            )}
          </View>
        )}

        {buttonsPropsArray && (
          <View>
            {buttonsPropsArray.map((buttonProp: ButtonProps, index: number) => (
              <Button key={index} {...buttonProp} />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

export { Alert, AlertProps };
