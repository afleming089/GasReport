/**
 * (app) hold authenticated views
 *
 * app holds unauthenticated views
 * @module
 */

import { RouteWrapper, Text } from "@/components/common/Common";
import { DefaultLoader } from "@/components/common/Loaders";
import { useSession } from "../context/AuthContext";
import "../../global.css";
import { useEffect } from "react";

export default function index() {
  const { signIn } = useSession();

  useEffect(() => {
    setTimeout(() => {}, 3000);
  }, []);

  return (
    <RouteWrapper accessibilityLabel="Home Group">
      <Text fontSize="h2">Validating User</Text>
      <DefaultLoader />
    </RouteWrapper>
  );
}
