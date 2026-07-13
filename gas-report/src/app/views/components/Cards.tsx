import React from "react";
import { View, Text } from "react-native";

interface CardProps {
  variant: string;
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
}

const cardVariants = {
  small: {
    container: "",
  },
};

function Card({ variant = "small", title, subTitle, children }: CardProps) {
  return (
    <View
      className="border border-black border-solid rounded-sm p-5
">
      <Text className="text-2xl">{title}</Text>
      {subTitle && <Text className="text-xl">{subTitle}</Text>}
      {children && <View className="m-5">{children}</View>}
    </View>
  );
}
export { Card };
