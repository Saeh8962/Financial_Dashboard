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
  // var data = history.map(data=>data.open)
  // console.log(dates,data) 



  return (
    <>
    <div className="row mb-3">
      <div className="col-6">
        <div className="k-card">
          <Chart
            style={{
              height: 350,
            }}
          >
            <ChartTitle text="Line Chart" />
            <ChartLegend position="top" orientation="horizontal" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={dates}/>
            </ChartCategoryAxis>
            <ChartSeries>
              {history.map(data => (
                <ChartSeriesItem
                  key={data.symbol}
                  type="line"
                  tooltip={{
                    visible: true,
                  }}
                  data={data.data}
                  name={data.symbol}
                />
              ))}
            </ChartSeries>
          </Chart>
        </div>
      </div>
    </div>
    <div className="row">
      
      
    </div>
  </>
  )
  }
  else{ 
    return <h2>Performance</h2>
  }
}