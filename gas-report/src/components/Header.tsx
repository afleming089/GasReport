import { View, Text } from "react-native";

// children are the Headers links or anything else that is needed to be place in the header
interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
}

function Header({ title = "Gas-Report", children }: HeaderProps) {
  return (
    <View>
      <Text>{title}</Text>
      <View>{children}</View>
    </View>
  );
}

export { Header };
