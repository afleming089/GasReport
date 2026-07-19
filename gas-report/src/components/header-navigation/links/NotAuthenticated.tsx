import { NavigationWrapper } from "../NavigationWrapper";
import { Link } from "../../common/Common";

function NotAuthenticated() {
  return (
    <NavigationWrapper align="left">
      <Link color="muted" title="Home" href="/" />
      <Link color="muted" title="About" href="/about" />
    </NavigationWrapper>
  );
}

export { NotAuthenticated };
