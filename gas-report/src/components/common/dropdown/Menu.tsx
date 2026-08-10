import React from "react";
import { FlatList, View } from "react-native";
import { tv, VariantProps } from "tailwind-variants";

const menu = tv({
  slots: {
    option:
      "border border-lightGray hover:bg-slate active:bg-slate rounded-sm p-2",
  },
});

type MenuVariants = VariantProps<typeof menu>;

// menu for all drop down types
interface MenuProps extends MenuVariants {
  children: React.ReactNode;
}

function Menu({ children, ...styles }: MenuProps) {
  const childArray = React.Children.toArray(children);
  const { option } = menu(styles);

  return (
    <FlatList
      data={childArray}
      scrollEnabled={false}
      keyExtractor={(_, index) => index.toString()}
      className="mt-2 rounded-sm bg-lightSlate p-2"
      contentContainerClassName="gap-1"
      renderItem={({ item }) => <View className={option()}>{item}</View>}
    />
  );
}

export { Menu };
