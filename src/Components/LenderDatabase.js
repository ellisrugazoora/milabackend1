import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";

function LenderDatabase(props){
    let rowData = [{col1: 1, col2: 2, col3: 3}, {col1: 4, col2: 5, col3: 6}, {col1: 7, col2: 8, col3: 9}];
    let colDefs = [{field: "col1"}, {field: "col2"}, {field: "col3"}];
    const scenarios = props.scenario;
    const summary = props.summary;
    function printSummary(){
        console.log(summary)
    }
    return (
        <div className="ag-theme-quartz" style={{ height: 300, width:'70%', minWidth:300, justifyContent:'center' }}>
            <AgGridReact 
            rowData={rowData}
            columnDefs={colDefs}
            rowSelection="multiple"
            />
            Evaluate the following against table: <p>{JSON.stringify(scenarios)}</p>
            {/* The table data be assigned: {summary} */}
            <button onClick={printSummary}>Print Row Data and </button>
            {/* <button>Set Row Data and Col Defs</button> */}
        </div>
        
    )
}

export default LenderDatabase;