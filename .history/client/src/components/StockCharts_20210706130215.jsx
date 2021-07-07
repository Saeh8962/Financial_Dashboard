import React from "react";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartTooltip,
} from "@progress/kendo-react-charts";
import { getPerformance } from "../services/dataService";
import "hammerjs";
export default function PerformancePanel() {
  const [data, setData] = React.useState<string[]>();
  React.useEffect(() => {
    getPerformance().then((results: string[]) => {
      setData(results);
    })
  }, []);

  return (
    <Chart>
        <ChartTitle text="Stock History" />

        <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={["2014", "2015", "2016", "2017", "2018", "2019", "2020"]} />
        </ChartCategoryAxis>

        <ChartSeries>
            <ChartSeriesItem type="line" data={data} />
        </ChartSeries>
        
        <ChartTooltip render={renderTooltip} />
    </Chart>
  )
}