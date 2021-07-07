import * as React from "react";
export const MyCommandCell = (props) => {
  const { dataItem } = props;
  
  return (
    <td className="k-command-cell">
      <button
        className="k-button k-grid-remove-command"
        onClick={() =>
  
          props.remove(dataItem)
        }
      >
        Remove
      </button>
    </td>
  );
};