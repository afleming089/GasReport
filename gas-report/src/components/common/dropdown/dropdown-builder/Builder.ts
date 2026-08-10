import { Dropdown } from "./Dropdown";

interface Builder {
  buildPressableHeader(): void;
  buildMenu(): void;
  getResult(): Dropdown;
}

export { Builder };
