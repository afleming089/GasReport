import { useContext } from "react";
import { ReportParametersContext } from "../state/ReportParametersContext";
import useFetch from "../utility/customHooks/useFetch";
import { ApiResponse, FetchConfig } from "../utility/api/api";
import { PetroleumData } from "../models/Petroleum/PetroleumData";

type rest = {
  a: string;
};

function Dashboard() {
  const reportParameters = useContext(ReportParametersContext);
  const gasReport: ApiResponse<rest> = useFetch<rest>("", {});

  console.log(gasReport);

  return <>Dashboard</>;
}

export default Dashboard;
