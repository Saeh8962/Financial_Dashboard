import React from "react";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxisItem,
  ChartValueAxis,
  ChartTitle,
  ChartSeriesLabels,
  ChartTooltip,
  ChartLegend,
} from "@progress/kendo-react-charts";
import "hammerjs";
import { getHistory } from "../services/dataService";
import { History } from "../data/models";
const url ="http://api.marketstack.com/v1/eod?access_key=5dd6fd84e5ba4e974843da4e6e23db23&symbols=AAP&date_from=2020-07-10&date_to=2021-07-02&limit=500";
const request = require('request');
const categories=['Jun','Jul','Aug','Sept','Oct','Nov','Dec','Jan`21','Feb','Mar','Apr','May','Jun','Jul']
const history_date = new Date();
   
function convertHistoryDate(date:string){
  var value = date 
    var newDates ={
      date:value.slice(0,10),
      month: value.slice(5,7),
      day: value.slice(8,10),
      year: value.slice(0,4)
    }
   
  return newDates;
}
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
  
  var history_data = history.map(data=>({data:data.open,date:convertHistoryDate(data.date)}))
  var dates = history_data.map(data => new Date(data.date.date));
  console.log(dates) 



  return (
    
          <Chart>
            <ChartTitle text="Stock Price 1 Year" />
            <ChartTitle text="Line Chart" />
            {/* <ChartLegend position="top" orientation="horizontal" display="false" /> */}
            <ChartValueAxis>
              <ChartValueAxisItem
                title={{
                  text: "Stock Price",
                }}
                min={100}
                max={250}
              />
            </ChartValueAxis>
            <ChartCategoryAxis>
              <ChartCategoryAxisItem 
                title={{
                  text: "Month",
                }}
                maxDivisions={12}
                categories={categories}/>
            </ChartCategoryAxis>
            <ChartSeries>
              <ChartSeriesItem type="line" data={history_data} markers={{ visible: false }} style={'normal'}/>
              <ChartSeriesLabels content={'june'} />
            </ChartSeries>
          </Chart>
        
  );
  }
  else{ 
    return <h2>Performance</h2>
  }
}