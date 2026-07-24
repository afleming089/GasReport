import { View } from "react-native";
import { Text } from "./common/Common";

// so header is not behind the camera or phone bezel
import { useSafeAreaInsets } from "react-native-safe-area-context";

// children are the Headers links or anything else that is needed to be place in the header
interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
}

function Header({ title = "Gas-Report", children }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      <View className="flex flex-wrap gap-4 flex-row items-center border-b border-solid bg-slate p-2">
        <Text className="text-offWhite" fontSize="h1">
          {title}
        </Text>
        {children}
      </View>
    </View>
  );
}

export { Header };
