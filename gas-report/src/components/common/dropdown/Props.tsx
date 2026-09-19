import { FetchConfig } from "@/utility/api/FetchConfig";
import { LinkProps } from "expo-router";
import { DropdownVariants } from "./StyleVariants";
import { Dispatch, SetStateAction } from "react";

interface GenericDropdownProps extends DropdownVariants {
  title: string;
  showPressableArrow?: boolean;
  className?: string;
}

/// Generic dropdown where you can put any component in
interface CustomDropdownProps extends GenericDropdownProps {
  children: React.ReactNode;
}

/// Select from different options and has option to add a useForm hook if need to make calls to backend
interface SelectProps extends GenericDropdownProps {
  options: readonly string[];
  queryParameterKey: string;
  setQueryParameters: Dispatch<SetStateAction<Record<string, string>>>;
  handleSelect?(): void;
}

/// Dropdown for navigation. Only accepts of type link
interface Links extends LinkProps {
  title: string;
  className?: string;
}

interface NavigationDropdownProps extends GenericDropdownProps {
  links: Links[];
}

export { CustomDropdownProps, NavigationDropdownProps, SelectProps };
