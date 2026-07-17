import { NavigationWrapper } from "./NavigationWrapper";
import { Link } from "../common/Common";

function Authenticated() {
  return (
    <NavigationWrapper>
      {/* // make a drop down  with profile settings and log out*/}
      <Link title="Account" href="/account" />
    </NavigationWrapper>
  );
}

export { Authenticated };
