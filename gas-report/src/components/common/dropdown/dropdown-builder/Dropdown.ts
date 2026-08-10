import { PressableHeader } from "../PressableHeader";
import { Menu } from "../Menu";
import { JSX, ReactElement, createElement } from "react";
import { View } from "react-native";
import { twJoin } from "tailwind-merge";

class Dropdown {
  private pressableHeader: JSX.Element;
  private menu: JSX.Element;

  public setPressable(pressable: typeof PressableHeader): void {
    this.pressableHeader = pressable;
  }

  public setMenu(menu: typeof Menu): void {
    this.menu = menu;
  }

  public render(className?: string): ReactElement {
    return createElement(
      View,
      {
        className: twJoin("flex", className),
      },
      createElement(PressableHeader, this.pressableHeader),
      createElement(Menu, this.menu),
    );
  }
}

export { Dropdown };
