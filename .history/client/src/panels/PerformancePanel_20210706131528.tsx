import React from "react";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartTooltip,
  ChartLegend,
} from "@progress/kendo-react-charts";
import "hammerjs";
import { getHistory } from "../services/dataService";
import { History } from "../data/models";
const url ="http://api.marketstack.com/v1/eod?access_key=5dd6fd84e5ba4e974843da4e6e23db23&symbols=AAP&date_from=2020-07-10&date_to=2021-07-02&limit=500";
const request = require('request');
const categories=['Jun','Jul','Aug','Sept','Oct','Nov','Dec','Jan`21','Feb','Mar','Apr','May','Jun','Jul']

   
    
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
  var history_data = history.map(data=>data.open)
  // console.log(dates,data) 



  return (
    
          <Chart>
            <ChartTitle text="Line Chart" />
            {/* <ChartLegend position="top" orientation="horizontal" display="false" /> */}
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={categories}/>
            </ChartCategoryAxis>
            <ChartSeries>
              <ChartSeriesItem type="verticalLine" data={[1,2,3,4,5,6,7,8,9,10,11,12]}/>
            </ChartSeries>
          </Chart>
        
  );
  }
  else{ 
    return <h2>Performance</h2>
  }
}