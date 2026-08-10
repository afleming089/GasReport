import React from "react";
import { FlatList, View } from "react-native";
import { dropdown, DropdownVariants } from "../StyleVariants";

// menu for all drop down types
interface MenuProps extends DropdownVariants {
  children: React.ReactNode;
}

function Menu({ children, ...styles }: MenuProps) {
  const childArray = React.Children.toArray(children);
  const { menu, option } = dropdown(styles);

  return (
    <FlatList
      data={childArray}
      scrollEnabled={false}
      keyExtractor={(_, index) => index.toString()}
      className={menu()}
      contentContainerClassName="gap-1"
      renderItem={({ item }) => <View className={option()}>{item}</View>}
    />
  );
}

export { Menu };
