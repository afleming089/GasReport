import { Dispatch, SetStateAction } from "react";
import { Pressable as NativePressable, Text } from "react-native";
import { twJoin } from "tailwind-merge";
import { tv, VariantProps } from "tailwind-variants";

const pressable = tv({
  slots: {
    base: "bg-lightSlate hover:bg-slate active:bg-slate p-3 flex flex-row rounded-sm",
    text: "text-white text-lg select-none",
  },
});

type PressableVariants = VariantProps<typeof pressable>;

// button for all Dropdown types
interface PressableProps extends PressableVariants {
  title: string;
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

function PressableHeader({
  title,
  showMenu,
  setShowMenu,
  ...styles
}: PressableProps) {
  const { base, text } = pressable(styles);

  return (
    <NativePressable
      onPress={() => {
        showMenu ? setShowMenu(false) : setShowMenu(true);
      }}
      className={twJoin(base())}
      hitSlop={10}>
      <Text className={twJoin(text(), "w-[95%] text-center")}>{title}</Text>
      <Text className={twJoin(text(), "align-self-end w-fit")}>v</Text>
    </NativePressable>
  );
}

export { PressableHeader };
