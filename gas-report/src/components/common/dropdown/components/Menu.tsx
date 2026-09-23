/**
 * Generic Menu for all drop downs
 * @module
 */

import React from "react";
import { DimensionValue, FlatList, View } from "react-native";
import { dropdown, DropdownVariants } from "../StyleVariants";

// menu for all drop down types
interface MenuProps extends DropdownVariants {
  height?: DimensionValue | undefined;
  children: React.ReactNode;
}

function Menu({ height = 180, children, ...styles }: MenuProps) {
  const childArray = React.Children.toArray(children);
  const { menu, option } = dropdown(styles);

  return (
    <View style={{ height: height }}>
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
