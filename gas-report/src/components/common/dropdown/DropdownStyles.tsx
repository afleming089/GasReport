import { tv, VariantProps } from "tailwind-variants";

const dropdownStyles = tv({
  slots: {
    base: "bg-lightSlate hover:bg-slate active:bg-slate p-3 flex flex-row rounded-sm",
    text: "text-white text-lg select-none",
  },

  variants: {},
  defaultVariants: {},
});

type DropdownVariants = VariantProps<typeof dropdownStyles>;

export { dropdownStyles, DropdownVariants };
