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
        base: "bg-navyBlack hover:bg-lightGray active:bg-lightGray",
        menu: "bg-navyBlack",
        option:
          "border border-lightGray hover:bg-lightGray active:bg-lightGray",
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
