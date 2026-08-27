/**
 * Generic Button for for all drop downs
 * @module
 */

import { Dispatch, SetStateAction } from "react";
import { Pressable as NativePressable, Text } from "react-native";
import { twJoin } from "tailwind-merge";
import { dropdown, DropdownVariants } from "../StyleVariants";

// button for all Dropdown types
interface PressableProps extends DropdownVariants {
  title: string;
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  showPressableArrow?: boolean;
}

function PressableHeader({
  title,
  showMenu,
  setShowMenu,
  showPressableArrow = true,
  ...styles
}: PressableProps) {
  const { base, text } = dropdown(styles);

  return (
    <NativePressable
      onPress={() => {
        showMenu ? setShowMenu(false) : setShowMenu(true);
      }}
      className={twJoin(base())}
      hitSlop={10}>
      {showPressableArrow ? (
        <>
          <Text className={twJoin(text(), "w-[95%] text-center")}>{title}</Text>
          <Text className={twJoin(text(), "align-self-end w-fit")}>v</Text>
        </>
      ) : (
        <Text className={twJoin(text(), "w-fit text-center")}>{title}</Text>
      )}
    </NativePressable>
  );
}

export { PressableHeader, PressableProps };
