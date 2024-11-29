import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";

function LenderDatabase(){
    let rowData = [{col1: 1, col2: 2, col3: 3}, {col1: 4, col2: 5, col3: 6}, {col1: 7, col2: 8, col3: 9}];
    let colDefs = [{field: "col1"}, {field: "col2"}, {field: "col3"}];
    return (
        <div className="ag-theme-quartz" style={{ height: 300, width:'70%', minWidth:300, justifyContent:'center' }}>
            <AgGridReact 
            rowData={rowData}
            columnDefs={colDefs}
            rowSelection="multiple"
            />
        </div>
        
    )
}

export default LenderDatabase;