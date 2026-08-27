/**
 * Account view
 * @module
 */

import { useSession } from "@/context/AuthContext";
import { router } from "expo-router";
import {
  Alert,
  AlertProps,
  Button,
  Line,
  Link,
  RouteWrapper,
  Text,
} from "../../components/common/Common";

import { useContext, useState } from "react";

// add proper account context with correct secure auth. REMOVE LATER
import { UserContext } from "../../context/UserContext";

export default function Account() {
  const user = useContext(UserContext);

  const [alertState, setAlertState] = useState<AlertProps | null>(null);

  // add to a drop down button
  const { signOut } = useSession();

  return (
    <RouteWrapper accessibilityLabel="Account Group">
      {alertState ? <Alert {...alertState} /> : null}

      <Text fontSize="h2">Account</Text>
      <Line />
      <Text fontSize="h4">Email: {user.email}</Text>
      <Line />
      <Text fontSize="h2">Settings</Text>
      <Line />
      <Text fontSize="h4">Default Fuel Grade</Text>

      <Text fontSize="h4">Default Region</Text>

      <Button
        title="Save Settings"
        onPress={() => {
          setAlertState({
            title: "Saved settings",
            setAlertState,
          });
        }}
      />

      <Line />

      {/* // add to drop down */}
      <Link
        title="Sign Out"
        color="hazard"
        href={"/"}
        onPress={() => {
          // The guard in `RootNavigator` redirects back to the sign-in screen.
          // ensure it still runs sign-out
          signOut();
          // router.replace("/");
        }}
      />

      <Button
        title="Delete Account"
        bgColor="hazard"
        onPress={() => {
          setAlertState({
            title: "Are you sure?",
            message: "Please confirm account delete",
            buttonsPropsArray: [
              {
                title: "CONFIRM",
                bgColor: "hazard",
                onPress: () => {
                  // TO DO add delate logic here
                  router.replace("/");
                },
              },
            ],
            setAlertState,
          });
        }}
      />
    </RouteWrapper>
  );
}
