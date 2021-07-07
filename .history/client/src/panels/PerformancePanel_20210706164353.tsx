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
  ChartSeriesItemTooltip,
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
// const defaultTooltipRender = ({ data }) => (`Default Content ${data}`);
// const nestedTooltipRender = ({ data }) => (
// <span>
//   <p>Series 1 value: {data}</p>
  
//   <p>Series 1 value: {data}</p>
// </span>
// );
function getHistoryData(symbol:string,from:string,to:string,callback: (arg0: History[]) => void){
  var url ={
    address:"http://api.marketstack.com/v1/eod?access_key=5dd6fd84e5ba4e974843da4e6e23db23",
    symbol:"&symbols="+symbol,
    dateFrom:"&date_from="+from,
    dateTo:"&date_to="+to,
    limit:"&limit=500"
  }
  var fullUrl= "http://api.marketstack.com/v1/eod?access_key=5dd6fd84e5ba4e974843da4e6e23db23&symbols=TSLA&date_from=2020-07-10&date_to=2021-07-02&limit=500";

  request(fullUrl, { json: true }, (err: any, res: any, body: any) => {
    if (err) { return console.log(err); }
    return getHistory(body.data).then((results: History[]) => {
      callback(results);
    });
    
  })
}
export default function PerformancePanel(props:any) {
  const [history, setHistory] = React.useState<History[]>();
  React.useEffect(() => {
    getHistoryData("APPL","2020-07-10","2021-07-02",setHistory);
        
      
    
        
    
  }, []);
if(history){
  
  var history_data = history.map(data=>({data:data.open,date:convertHistoryDate(data.date)}))
  var dates = history_data.map(data => new Date(data.date.date));
  var data = history_data.map(value =>value.data)
  console.log(data) 



  return (
    
          <Chart>
            <ChartTooltip shared={true}/>
            <ChartTitle text="1 Year APPL Stock Price" />
            {/* <ChartTitle text="Line Chart" /> */}
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
                categories={dates}/>
            </ChartCategoryAxis>
            <ChartSeries>
              <ChartSeriesItem type="line" data={data} markers={{ visible: false }} style={'normal'}>
              <ChartSeriesItemTooltip background="blue"/>
              </ChartSeriesItem>
              {/* <ChartSeriesLabels content={'june'} /> */}
            </ChartSeries>
          </Chart>
        
  );
  }
  else{ 
    return <h2>Performance</h2>
  }
}