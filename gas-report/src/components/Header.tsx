import { View, Text } from "react-native";

// children are the Headers links or anything else that is needed to be place in the header
interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
}

function Header({ title = "Gas-Report", children }: HeaderProps) {
  return (
    <View className="flex flex-wrap gap-2 flex-row items-center border-b border-solid border-black p-2 mb-3">
      <Text className="text-3xl">{title}</Text>
      {children}
    </View>
  );
}

export { Header };
