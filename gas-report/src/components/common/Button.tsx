import { Button as NativeButton } from "react-native";

interface BtnProps {
  title: string;
}
function Button({ title }: BtnProps) {
  return <NativeButton title={title} />;
}

export { Button };
