// import { View } from "react-native";
// import { Text } from "./Text";
// import { tv, VariantProps } from "tailwind-variants";

// // needs to link or update context

// const dropDown = tv({
//   slots: {
//     wrapper: "border border-solid border-black rounded-lg p-5 gap-2",
//     headerGroup: "flex-1 justify-center",
//     childrenStyles: "",
//   },

//   variants: {
//     align: {
//       centered: {
//         headerGroup: "items-center",
//       },
//       left: {
//         headerGroup: "items-left",
//       },
//     },
//     paddingChildren: {
//       padding2: { childrenStyles: "p-2" },
//       paddingNone: { childrenStyles: "p-0" },
//     },
//   },
//   defaultVariants: {
//     align: "left",
//     paddingChildren: "padding2",
//   },
// });

// type CardVariants = VariantProps<typeof card>;

// // return the prop interface
// interface CardProps extends CardVariants {
//   title: string;
//   subTitle?: string | number;
//   children?: React.ReactNode;
// }

// function Dropdown() {
//   return (
//     <View>
//       <Text></Text>
//     </View>
//   );
// }

// export { Dropdown };
