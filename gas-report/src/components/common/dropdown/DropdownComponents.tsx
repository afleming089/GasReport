/**
 * Dropdowns with generic and specific functionality
 * @module
 */

// ensure {...styles} is added to any Dropdown type so variants apply properly

import { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Menu } from "./components/Menu";
import { PressableHeader } from "./components/PressableHeader";

import { Link } from "expo-router";
import { dropdown } from "./StyleVariants";

import { twJoin } from "tailwind-merge";

import useFetch from "../../../utility/customHooks/useFetch";

import {
  CustomDropdownProps,
  NavigationDropdownProps,
  SelectProps,
} from "./Props";

/// Can place in child element type into the dropdown menu
function CustomDropdown({
  title,
  children,
  className,
  ...styles
}: CustomDropdownProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <View className={twJoin("flex", className)}>
      <PressableHeader
        title={title}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        {...styles}
      />

      {showMenu ? <Menu {...styles}>{children}</Menu> : null}
    </View>
  );
}

/// Select and handle submit dropdown. Similar to HTML select and option
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

    /// add to selectedOption to prams
    if (url && fetchConfig) useFetch(url.concat(selectedOption), fetchConfig);

    setShowMenu(false);
  }

  /// saved here in order to avoid a double loop when passing it into <Menu />
  /// Time of n instead of n^2
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

  /// prevents re render when just the title changes
  const menu = useMemo(
    () => <Menu {...styles}>{optionsElements}</Menu>,
    [optionsElements],
  );

  return (
    <View className={twJoin("flex", className)}>
      <PressableHeader
        title={pressableTitle}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        {...styles}
      />

      {showMenu ? menu : null}
    </View>
  );
}

/// For navigation and array of links
function NavigationDropdown({
  title,
  links,
  className,
  showPressableArrow,
  ...styles
}: NavigationDropdownProps) {
  const [pressableTitle] = useState<string>(title);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const { text } = dropdown(styles);

  // saved here in order to avoid a double loop when passing it into <Menu />
  // Time of n instead of n^2
  const [linksElements] = useState(
    links.map((link, index) => {
      return (
        <TouchableOpacity key={index} hitSlop={10}>
          <Link href={link.href}>
            <Text className={twJoin(text(), link.className)}>{link.title}</Text>
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
        showPressableArrow={showPressableArrow}
        {...styles}
      />

      {showMenu ? <Menu {...styles}>{linksElements}</Menu> : null}
    </View>
  );
}

export { CustomDropdown, NavigationDropdown, Select };
