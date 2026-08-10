import { useState, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { PressableHeader } from "./PressableHeader";
import { Menu } from "./Menu";

import { dropdownStyles } from "./DropdownStyles";
import { Link } from "expo-router";

import { twJoin } from "tailwind-merge";

import useFetch from "../../../utility/customHooks/useFetch";

import {
  CustomDropdownProps,
  SelectProps,
  NavigationDropdownProps,
} from "./Props";

// any child element
function CustomDropdown({ title, children, className }: CustomDropdownProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <View className={twJoin("flex", className)}>
      <PressableHeader
        title={title}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />

      {showMenu ? <Menu>{children}</Menu> : null}
    </View>
  );
}

// Select and handle submit dropdown
function Select({
  title,
  className,
  options,
  url,
  fetchConfig,
  ...styles
}: SelectProps) {
  const { text } = dropdownStyles(styles);

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
  const [optionsElements] = useState(
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
  const menu = useMemo(() => <Menu>{optionsElements}</Menu>, [optionsElements]);

  return (
    <View className={twJoin("flex", className)}>
      <PressableHeader
        title={pressableTitle}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />

      {showMenu ? menu : null}
    </View>
  );
}

// For navigation and array of links
function NavigationDropdown({
  title,
  links,
  className,
  ...styles
}: NavigationDropdownProps) {
  const [pressableTitle] = useState<string>(title);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const { text } = dropdownStyles(styles);

  // saved here in order to avoid a double loop when passing it into <Menu />
  // Time of n instead of n^2
  const [linksElements] = useState(
    links.map((link, index) => {
      return (
        <TouchableOpacity key={index} hitSlop={10}>
          <Link href={link.href}>
            <Text className={text()}>{link.linkTitle}</Text>
          </Link>
        </TouchableOpacity>
      );
    }),
  );

  return (
    <View className={twJoin("flex", className)}>
      <PressableHeader
        title={pressableTitle}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />

      {showMenu ? <Menu>{linksElements}</Menu> : null}
    </View>
  );
}

export { CustomDropdown, Select, NavigationDropdown };
