import { FetchConfig } from "@/utility/api/FetchConfig";
import { LinkProps } from "expo-router";
import { DropdownVariants } from "./DropdownStyles";

// generic dropdown where you can put any component in
interface CustomDropdownProps extends DropdownVariants {
  title: string;
  children: React.ReactNode;
  className?: string;
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

// Dropdown for navigation. Only accepts of type link
interface Links extends LinkProps {
  linkTitle: string;
}

interface NavigationDropdownProps extends CustomDropdownProps {
  title: string;
  links: Links[];
}

export { CustomDropdownProps, SelectProps, NavigationDropdownProps };
