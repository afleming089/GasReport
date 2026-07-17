import { NavigationWrapper } from "./NavigationWrapper";
import { Link } from "../common/Common";

function NotAuthenticated() {
  return (
    <NavigationWrapper>
      <Link title="Home" href="/" />
      <Link title="About" href="/about" />
    </NavigationWrapper>
  );
}

export { NotAuthenticated };
