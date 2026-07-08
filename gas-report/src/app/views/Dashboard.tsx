import { useContext } from "react";
import { ReportParametersContext } from "../state/ReportParametersContext";
import useFetch from "../utility/customHooks/useFetch";
import { ApiResponse, FetchConfig } from "../utility/api/api";
import { PetroleumData } from "../models/Petroleum/PetroleumData";

//remove
import * as t from "io-ts";
const rest = t.type({
  a: t.string,
});

type rest = t.TypeOf<typeof rest>;

function Dashboard() {
  const reportParameters = useContext(ReportParametersContext);
  const gasReport: ApiResponse<rest> = useFetch<rest>("", { type: rest });

  console.log(gasReport);

  return <>Dashboard</>;
}

export default Dashboard;
