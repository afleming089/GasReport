import { useContext } from "react";
import { ReportParametersContext } from "../state/ReportParametersContext";
import useFetch from "../customHooks/useFetch";

function Dashboard() {
  const reportParameters = useContext(ReportParametersContext);

  return <>Dashboard</>;
}
