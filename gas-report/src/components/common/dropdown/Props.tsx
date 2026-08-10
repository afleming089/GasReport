import { FetchConfig } from "@/utility/api/FetchConfig";
import { LinkProps } from "expo-router";
import { DropdownVariants } from "./StyleVariants";

interface GenericDropdownProps extends DropdownVariants {
  title: string;
  showPressableArrow?: boolean;
  className?: string;
}

// generic dropdown where you can put any component in
interface CustomDropdownProps extends GenericDropdownProps {
  children: React.ReactNode;
}

// Select from different options and has option to add a useForm hook if need to make calls to backend
interface SelectProps extends GenericDropdownProps {
  options: string[];
  url?: string;
  fetchConfig?: FetchConfig;
  handleSelect?(): void;
}

// Dropdown for navigation. Only accepts of type link
interface Links extends LinkProps {
  title: string;
  className?: string;
}

interface NavigationDropdownProps extends GenericDropdownProps {
  links: Links[];
}

export { CustomDropdownProps, SelectProps, NavigationDropdownProps };
