import { NavigationWrapper } from "../NavigationWrapper";
import { Link } from "../../common/Common";

function NotAuthenticated() {
  return (
    <NavigationWrapper align="left">
      <Link color="misty" title="Home" href="/" />
      <Link color="misty" title="About" href="/about" />
    </NavigationWrapper>
  );
}

export { NotAuthenticated };
