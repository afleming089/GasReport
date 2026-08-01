import { NavigationWrapper } from "../NavigationWrapper";
import { Link } from "../../common/Common";

function NotAuthenticated() {
  return (
    <NavigationWrapper align="left">
      <Link color="misty" border="bottom" title="Home" href="/" />
      <Link color="misty" border="bottom" title="About" href="/about" />
    </NavigationWrapper>
  );
}

export { NotAuthenticated };
