import { Href, Link as NativeLink } from "expo-router";

interface LinkProps {
  //variant?: keyof typeof linkVariants;
  title: string;
  href: Href;
}

// const linkVariants = {
// default:{}
// }

function Link({ title, href }: LinkProps) {
  return <NativeLink href={href}>{title}</NativeLink>;
}

export { Link };
