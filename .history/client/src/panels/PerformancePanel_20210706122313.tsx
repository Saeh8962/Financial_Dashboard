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
import { getHistory } from "../services/dataService";
import { History } from "../data/models";
const url ="http://api.marketstack.com/v1/eod?access_key=5dd6fd84e5ba4e974843da4e6e23db23&symbols=AAP&date_from=2020-07-10&date_to=2021-07-02&limit=500";
const request = require('request');


   
    
export default function PerformancePanel() {
  const [history, setHistory] = React.useState<History[]>();
  React.useEffect(() => {
    request(url, { json: true }, (err: any, res: any, body: any) => {
      if (err) { return console.log(err); }
      return getHistory(body.data).then((results: History[]) => {
        setHistory(results);
      });
      
    })
        
    
  }, []);
if(history){
  var dates = history.map(data => data.date.slice(0,10));
  var data = history.map(data=>data.open)
  // console.log(dates,data) 
}
 
// console.log(history);
  return (
    <Chart>
  <ChartTitle text="Fund Performance" />
  <ChartCategoryAxis>
    <ChartCategoryAxisItem categories={dates} />
  </ChartCategoryAxis>
  <ChartSeries>
    <ChartSeriesItem type="line" data={data} />
  </ChartSeries>
  <ChartTooltip render={renderTooltip} />
</Chart>
  )
}
