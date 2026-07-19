import { NavigationWrapper } from "../NavigationWrapper";
import { Link } from "../../common/Common";

function Authenticated() {
  return (
    <NavigationWrapper align="right">
      {/* // make a drop down  with profile settings and log out*/}
      <Link border="solid" title="Account" href="/account" />
    </NavigationWrapper>
  );
}

export { Authenticated };
