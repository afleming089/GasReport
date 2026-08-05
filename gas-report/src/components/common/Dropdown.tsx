import { Link } from "expo-router";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  FlatList,
  GestureResponderEvent,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { twJoin } from "tailwind-merge";
import { tv, VariantProps } from "tailwind-variants";

const dropdown = tv({
  slots: {
    base: "bg-lightSlate hover:bg-slate active:bg-slate p-3 flex flex-row rounded-sm",
    text: "text-white text-center",
    option:
      "border border-lightGray hover:bg-slate active:bg-slate rounded-sm p-1",
  },

  variants: {},
  defaultVariants: {},
});

type DropdownVariants = VariantProps<typeof dropdown>;

// button for all Dropdown types
interface DropdownPressable extends DropdownVariants {
  title: string;
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

function DropdownPressable({
  title,
  showMenu,
  setShowMenu,
  ...styles
}: DropdownPressable) {
  const { base, text } = dropdown(styles);

  return (
    <Pressable
      onPress={() => {
        showMenu ? setShowMenu(false) : setShowMenu(true);
      }}
      className={twJoin(base())}
      hitSlop={10}>
      <Text className={twJoin(text(), "w-[95%]")}>{title}</Text>
      <Text className={twJoin(text(), "align-self-end w-fit")}>v</Text>
    </Pressable>
  );
}

// menu for all drop down types
interface MenuProps extends DropdownVariants {
  children: React.ReactNode;
}

function Menu({ children, ...styles }: MenuProps) {
  const childArray = React.Children.toArray(children);
  const { option } = dropdown(styles);

  return (
    <FlatList
      data={childArray}
      keyExtractor={(_, index) => index.toString()}
      style={{ maxHeight: 300 }}
      className="mt-2 rounded-sm bg-lightSlate p-2"
      contentContainerClassName="gap-1"
      showsVerticalScrollIndicator
      renderItem={({ item }) => <View className={option()}>{item}</View>}
    />
  );
}

// generic dropdown where you can put any component in
interface DropdownProps extends DropdownVariants {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function CustomDropdown({ title, children, className }: DropdownProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <View className={twJoin("flex", className)}>
      <DropdownPressable
        title={title}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />

      {showMenu ? <Menu>{children}</Menu> : null}
    </View>
  );
}

// Select dropdown type where you can only put text in. Handles form submits and updates the title on change.
interface SelectProps extends DropdownVariants {
  title: string;
  options: string[];
  className?: string;
}

// use Controller from react-hook-forms for sending data maybe
function Select({ title, className, options }: SelectProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const onSubmit = (data: any) => console.log(data);

  function handleSubmit(e: GestureResponderEvent) {
    console.log(e);
  }

  const [optionsMap, setOptionsMap] = useState(
    options.map((option) => {
      return (
        <Pressable
          onPress={(e) => {
            handleSubmit(e);
          }}>
          <TextInput value={option} />
        </Pressable>
      );
    }),
  );

  return (
    <View className={twJoin("flex", className)}>
      <DropdownPressable
        title={title}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />

      {showMenu ? <Menu>{optionsMap}</Menu> : null}
    </View>
  );
}

// Dropdown for navigation. Only accepts of type link
interface NavigationDropdownProps extends DropdownProps {
  children: React.ReactElement<typeof Link>[];
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

export { CustomDropdown, NavigationDropdown, Select };
