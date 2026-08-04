import React, { useState } from "react";
import { ScrollView, View, Pressable, Text } from "react-native";
import { Link } from "expo-router";

import { twJoin } from "tailwind-merge";

import { tv, VariantProps } from "tailwind-variants";

const dropdown = tv({
  slots: {
    base: "bg-lightSlate hover:bg-slate active:bg-slate p-3 flex flex-row rounded-sm",
    text: "text-white text-center",
    menu: "",
    option:
      "border border-lightGray hover:bg-slate active:bg-slate rounded-sm p-1",
  },

  variants: {},
  defaultVariants: {},
});

type DropdownVariants = VariantProps<typeof dropdown>;

interface DropdownProps extends DropdownVariants {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function CustomDropdown({
  title,
  children,
  className,
  ...DropdownVariants
}: DropdownProps) {
  const { base, text, option } = dropdown(DropdownVariants);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  {
    /*TO: DO make a flat list to optimize performance */
  }

  return (
    <View className="flex">
      <Pressable
        onPress={() => {
          showMenu ? setShowMenu(false) : setShowMenu(true);
        }}
        className={twJoin(base(), className)}
        hitSlop={10}>
        <Text className={twJoin(text(), "w-[95%]")}>{title}</Text>
        <Text className={twJoin(text(), "align-self-end w-fit")}>v</Text>
      </Pressable>

      {showMenu ? (
        <ScrollView
          className="mt-2 max-h-[300px] p-2 bg-lightSlate rounded-sm"
          contentContainerClassName={"flex gap-1"}
          showsVerticalScrollIndicator>
          {/* renders each child element in a options view box so they all have an outline */}
          {children &&
            React.Children.map(children, (child: any) => (
              <View className={option()}>{child}</View>
            ))}
        </ScrollView>
      ) : null}
    </View>
  );
}

interface SelectProps extends DropdownProps {
  children: React.ReactElement<typeof Link>;
}

// use context from react-hook-forms for sending data maybe
function Select({
  title,
  children,
  className,
  ...DropdownVariants
}: SelectProps) {
  return (
    <CustomDropdown className={className} title={title} {...DropdownVariants}>
      {children}
    </CustomDropdown>
  );
}

interface NavigationDropdownProps extends DropdownProps {
  children: React.ReactElement<typeof Link>;
}

function NavigationDropdown({
  title,
  children,
  className,
}: NavigationDropdownProps) {
  return (
    <CustomDropdown className={className} title={title}>
      {children}
    </CustomDropdown>
  );
}

export { CustomDropdown, Select, NavigationDropdown };
