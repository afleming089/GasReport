import { LineChart } from "react-native-chart-kit/v2";

const data = [
  { month: "Jan", revenue: 52 },
  { month: "Feb", revenue: 86 },
  { month: "Mar", revenue: 58 },
  { month: "Apr", revenue: 134 },
  { month: "May", revenue: 97 },
  { month: "Jun", revenue: 145 },
  { month: "Jul", revenue: 128 },
  { month: "Aug", revenue: 162 },
  { month: "Sep", revenue: 118 },
  { month: "Oct", revenue: 174 },
  { month: "Nov", revenue: 201 },
  { month: "Dec", revenue: 239 },
  ,
];

// rename to line
function Chart() {
  return (
    <LineChart
      data={data}
      xKey="month"
      yKey="revenue"
      width={410}
      height={240}
    />
  );
}

export { Chart };
