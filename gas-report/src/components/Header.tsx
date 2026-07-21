import { View } from "react-native";
import { Text } from "./common/Common";

// children are the Headers links or anything else that is needed to be place in the header
interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
}

function Header({ title = "Gas-Report", children }: HeaderProps) {
  return (
    <View className="flex flex-wrap gap-4 flex-row items-center border-b border-solid bg-slate p-2">
      <Text className="text-offWhite" fontSize="h1">
        {title}
      </Text>
      {children}
    </View>
  );
}

export { Header };
