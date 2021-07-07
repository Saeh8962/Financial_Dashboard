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
      return getHistory(body).then((results: History[]) => {
        setHistory(results);
      });
      
    })
        
    
  }, []);
  var x = JSON.stringify(history);
console.log(history[0]);
  return (
    <h2>Performance Panel</h2>
  )
}
