import { NavigationDropdown } from "../../common/Common";
import { View } from "react-native";

function Authenticated() {
  return (
    <View className="absolute top-2 right-2">
      <View className="relative">
        {/* // make a drop down  with profile settings and log out*/}

        <NavigationDropdown
          type="misty"
          title="Account"
          showPressableArrow={false}
          className="p-0"
          links={[
            { title: "Dashboard", href: "/dashboard" },
            { title: "Settings", href: "/account" },
            {
              title: "Logout",
              href: "/",
              className: "text-red-600",
            },
          ]}
        />
      </View>
    </View>
  );
}

export { Authenticated };
