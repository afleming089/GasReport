import { Builder } from "./Builder";

class DropdownDirector {
  constructor(builder: Builder) {
    builder.buildPressableHeader;
    builder.buildMenu;
  }
}

export { DropdownDirector };
