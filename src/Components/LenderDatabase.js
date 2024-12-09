import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";

function LenderDatabase(props){
    let rowData = [{col1: 1, col2: 2, col3: 3}, {col1: 4, col2: 5, col3: 6}, {col1: 7, col2: 8, col3: 9}];
    let colDefs = [{field: "col1"}, {field: "col2"}, {field: "col3"}];
    const [rowDataStateful, setRowDataStateful] = useState(rowData);
    const [colDefsStateful, setColDefsStateful] = useState(colDefs);
    const [content, setContent] = useState({hello: {world: "yup", yay: "yuh"}});
    const scenarios = props.scenarios;
    const summary = props.summary;
    function printSummary(){
        setRowDataStateful(summary.rowData);
        setColDefsStateful(summary.colDefs);
        console.log(summary)
        console.log(summary.rowData);
        console.log(summary.colDefs);
    }
    function getFieldsFromFlatObject(flatObject) {
        return Object.keys(flatObject).map(key => ({ field: key }));
    }
    function flattenObject(obj, parentKey = "", delimiter = "_") {
        const flatObject = {};
    
        // Recursive helper function to flatten
        function recurse(currentObj, currentKey) {
            for (let key in currentObj) {
                if (currentObj.hasOwnProperty(key)) {
                    const newKey = currentKey ? `${currentKey}${delimiter}${key}` : key;
    
                    // If the value is an object, recurse
                    if (
                        currentObj[key] !== null &&
                        typeof currentObj[key] === "object" &&
                        !Array.isArray(currentObj[key])
                    ) {
                        recurse(currentObj[key], newKey);
                    } else {
                        // Otherwise, assign the value
                        flatObject[newKey] = currentObj[key];
                    }
                }
            }
        }
    
        // Start recursion with the initial object
        recurse(obj, parentKey);
    
        return flatObject;
    }
    function setcontent(){
        setContent(summary.rowData[0].Content)
    }
    function printObj(){
        let flatRowData = [flattenObject(content)];
        let flatColDefs = getFieldsFromFlatObject(flattenObject(content))
        console.log(flatRowData);
        console.log(flatColDefs);
        setRowDataStateful(flatRowData);
        setColDefsStateful(flatColDefs);
    }
    
    return (
        <div className="ag-theme-quartz" style={{ height: 300, width:'70%', minWidth:300, justifyContent:'center' }}>
            <AgGridReact 
            rowData={rowDataStateful}
            columnDefs={colDefsStateful}
            rowSelection="multiple"
            />
            Evaluate the following against table: <p>{JSON.stringify(scenarios)}</p>
            {/* The table data be assigned: {summary} */}
            <button onClick={printSummary}>Set row data</button>
            <button onClick={printObj}>Print object</button>
            <button onClick={setcontent}>Set Content</button>
            {/* <button>Set Row Data and Col Defs</button> */}
        </div>
        
    )
}

export default LenderDatabase;