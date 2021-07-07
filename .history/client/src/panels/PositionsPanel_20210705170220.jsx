import React,{Component,ChildComponent} from "react";
import { Grid, GridCellProps, GridColumn } from "@progress/kendo-react-grid";
// import { getPositions } from "../services/dataService";
// import { Position } from "../data/models";
// import "../styles/_panels.scss";
import {withRouter} from "react-router-dom";

class WatchList extends React.Component {
    constructor(props){
        super(props)
        this.state={
            stocks: this.props.stocks
        }
    }


    render(){
        return (
            <div className="fund-detail-list span">
                <h2>Watchlist</h2>
                <Grid
              data={this.state.stocks}
              style={{height:700}}
              >
              <GridColumn title="Symbol" field="Symbol" locked={true} width={100} />
              <GridColumn title="CurrentPrice" field="currentPrice"/>
              {/* <GridColumn title="Name" field="name" />
              <GridColumn title="Change" field="day_change" />
              <GridColumn title="% Change" field="change_pct" />
              <GridColumn title="Volume" field="volume" />
              <GridColumn title="Market Cap" field="market_cap" /> */}
          </Grid>
            </div>
        );
    }
}
export default withRouter(WatchList);
// export default function PositionsPanel() {
//   const [positions, setPositions] = React.useState<Position[]>();
//   React.useEffect(() => {
//     getPositions().then((data: Position[]) => {
//       setPositions(data);
//     });
//   }, []);

//   return (
//       <div className="fund-detail-list span">
//           <h2>Watchlist</h2>
//           <Grid
//         data={positions}
//         style={{height:700}}
//         >
//         <GridColumn title="Symbol" field="symbol" locked={true} width={100} />
//         <GridColumn title="Name" field="name" />
//         <GridColumn title="Change" field="day_change" />
//         <GridColumn title="% Change" field="change_pct" />
//         <GridColumn title="Volume" field="volume" />
//         <GridColumn title="Market Cap" field="market_cap" />
//     </Grid>
//       </div>
      
    
//   );
// }
