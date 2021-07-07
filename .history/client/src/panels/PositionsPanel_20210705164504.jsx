import React from "react";
import { Grid, GridCellProps, GridColumn } from "@progress/kendo-react-grid";
import { getPositions } from "../services/dataService";
import { Position } from "../data/models";
import "../styles/_panels.scss"
export default function PositionsPanel() {
  const [positions, setPositions] = React.useState<Position[]>();
  React.useEffect(() => {
    getPositions().then((data: Position[]) => {
      setPositions(data);
    });
  }, []);

  return (
      <div className="fund-detail-list span">
          <h2>Watchlist</h2>
          <Grid
        data={positions}
        style={{height:700}}
        >
        <GridColumn title="Symbol" field="symbol" locked={true} width={100} />
        <GridColumn title="Name" field="name" />
        <GridColumn title="Change" field="day_change" />
        <GridColumn title="% Change" field="change_pct" />
        <GridColumn title="Volume" field="volume" />
        <GridColumn title="Market Cap" field="market_cap" />
    </Grid>
      </div>
      
    
  );
}
