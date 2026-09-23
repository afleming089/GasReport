/**
 * Generic Menu for all drop downs
 * @module
 */

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
    <View className="h-[150px]">
      <FlatList
        data={childArray}
        scrollEnabled={true}
        keyExtractor={(_, index) => index.toString()}
        className={menu()}
        contentContainerClassName="gap-1"
        renderItem={({ item }) => <View className={option()}>{item}</View>}
      />
    </View>
  );
}

export { Menu, MenuProps };
