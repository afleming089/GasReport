/**
 * Expands on TextInput from React Native
 * @module
 */

import {
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  View,
} from "react-native";
import { Text } from "./Text";

interface TextInputProps extends NativeTextInputProps {
  label?: string;
}

function TextInput({ label, ...TextInputProps }: TextInputProps) {
  return (
    <View>
      <Text fontSize="sm">{label}</Text>
      <NativeTextInput className="border rounded-sm p-2" {...TextInputProps} />
    </View>
  );
}

export { TextInput, TextInputProps };
