import { tv, VariantProps } from "tailwind-variants";

const dropdown = tv({
  slots: {
    base: "p-2 flex flex-row rounded-sm",
    text: "text-white select-none",
    menu: "mt-2 rounded-sm p-2",
    option: "rounded-sm p-2",
  },

  variants: {
    type: {
      default: {
        base: "bg-lightSlate hover:bg-slate active:bg-slate",
        menu: "bg-lightSlate",
        option: "border border-lightGray hover:bg-slate active:bg-slate",
      },
      misty: {
        base: "bg-slate active:bg-lightGray hover:bg-lightGray text-center flex justify-center border border-misty",
        menu: "bg-slate border border-misty",
        option: "border border-misty active:bg-lightGray hover:bg-lightGray",
        text: "text-misty text-center",
      },
    },
  },
  defaultVariants: {
    type: "default",
  },
});

type DropdownVariants = VariantProps<typeof dropdown>;

export { dropdown, DropdownVariants };
