import {
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  Text,
  View,
} from "react-native";

interface TextInputProps extends NativeTextInputProps {
  label?: string;
}

function TextInput({ label, ...TextInputProps }: TextInputProps) {
  return (
    <View>
      <Text className="text-sm">{label}</Text>
      <NativeTextInput className="border rounded-sm p-1" {...TextInputProps} />
    </View>
  );
}

export { TextInput };
