import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "expo-router";

import { tv, VariantProps } from "tailwind-variants";
import { twJoin } from "tailwind-merge";

import React, { Dispatch, SetStateAction, useState, useMemo } from "react";

import useFetch from "../../utility/customHooks/useFetch";
import { FetchConfig } from "@/utility/api/FetchConfig";

const dropdown = tv({
  slots: {
    base: "bg-lightSlate hover:bg-slate active:bg-slate p-3 flex flex-row rounded-sm",
    text: "text-white text-lg select-none",
    option:
      "border border-lightGray hover:bg-slate active:bg-slate rounded-sm p-2",
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
      <Text className={twJoin(text(), "w-[95%] text-center")}>{title}</Text>
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

// Select from different options and has option to add a useForm hook if need to make calls to backend
interface SelectProps extends DropdownVariants {
  title: string;
  options: string[];
  className?: string;
  url?: string;
  fetchConfig?: FetchConfig;
  handleSelect?(): void;
}

function Select({
  title,
  className,
  options,
  url,
  fetchConfig,
  ...styles
}: SelectProps) {
  const { text } = dropdown(styles);

  const [pressableTitle, setPressableTitle] = useState<string>(title);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState<string>("");

  function handleSelect(optionValue: string) {
    setSelectedOption(optionValue);
    setPressableTitle(optionValue);

    // add to selectedOption to prams
    if (url && fetchConfig) useFetch(url.concat(selectedOption), fetchConfig);

    setShowMenu(false);
  }

  // saved here in order to avoid a double loop when passing it into <Menu />
  // Time of n instead of n^2
  const [optionsElement] = useState(
    options.map((option, index) => {
      return (
        <TouchableOpacity
          key={index}
          hitSlop={10}
          onPress={() => {
            handleSelect(options[index]);
          }}>
          <Text className={text()}>{option}</Text>
        </TouchableOpacity>
      );
    }),
  );

  // prevents re render when just the title changes
  const menu = useMemo(() => <Menu>{optionsElement}</Menu>, [optionsElement]);

  return (
    <View className={twJoin("flex", className)}>
      <DropdownPressable
        title={pressableTitle}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />

      {showMenu ? menu : null}
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
