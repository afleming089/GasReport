import { Text, View } from "react-native";

function DefaultLoader() {
  return (
    <View className="flex justify-center align-center w-full h-fit bg-navyBlack p-3 rounded-sm">
      <Text className="text-center text-offWhite">Loading...</Text>
    </View>
  );
}

export { DefaultLoader };
