import React, { useState } from "react";
import * as pdfjs from "pdfjs-dist/webpack";
import Apicall from "./Apicall";
import LenderDatabase from "./LenderDatabase";

const PrintContentsOfPDF = (props) => {
  let scenarioPassOn = props.scenario;
  const [pdfContent, setPdfContent] = useState("");
  const [summary, setSummary] = useState("Summary placeholder")
  const [separationtext, setSeparationText] = useState("Lender Guideline Document titled")
  const [model, setModel] = useState("gpt-3.5-turbo")
  const backendUrl = "https://nodebackend-smmy.onrender.com/api/openai";
  var count = 0;
  const handleFileChange = (event) => {
    const files = event.target.files;
    let fileArray = Object.entries(files);
    fileArray.forEach((filePair)=>{
      let file = filePair[1];
      // console.log(file.name)
      if (file && file.type === "application/pdf") {
        const reader = new FileReader();

        reader.onload = async (e) => {
          const typedArray = new Uint8Array(e.target.result);
          try {
            const pdf = await pdfjs.getDocument(typedArray).promise;
            let text = "";
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              text += textContent.items.map((item) => item.str).join(" ") + "\n";
            }
            console.log(`${file.name}: \n \n \n ${text}`);
            setPdfContent(current => current + `\n ${separationtext} ${file.name}: \n ` + text);
            document.getElementById("countDisplay").textContent = ++count;
            ///
          } catch (error) {
            console.error("Error reading PDF:", error);
            setPdfContent("Error reading PDF.");
            document.getElementById("countDisplay").textContent = ++count;
          }
        };

        reader.readAsArrayBuffer(file);
      } else {
        setPdfContent(current => current + "\n Please upload a valid PDF file. \n");
        document.getElementById("countDisplay").textContent = ++count;
      }
    
    }) 
  };
  const [first, setFirst] = useState("Summarize the following text in 50 words: ")
  const sendRequest = async () => {
    let textprompt = first + pdfContent;
    console.log("Prompt sent...")
    try {
        const response = await fetch(backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt : textprompt, model: model }),
        })
        const data = await response.json();
        console.log(data.message.content);
        let parsedResultantObject = JSON.parse(data.message.content);
        console.log("Below is the object: ");
        console.log(parsedResultantObject);
        setSummary(parsedResultantObject);
    } catch (error){
        console.log("Error", error);
    }
}
function changeModel(e){
  let newModel = e.target.value;
  console.log(newModel);
  setModel(newModel);
}
  return (
    <div style={{ padding: "20px" }}>
      <h2>Print PDF Contents</h2>
      <input type="file" /* accept="application/pdf"*/ onChange={handleFileChange} multiple /> <br/>
      Model: <select placeholder="gpt-3.5-turbo" width="200px" onChange={changeModel}>
        <option value={"gpt-4o-mini"}>gpt-4o-mini</option>
        <option value={"gpt-4o"}>gpt-4o</option>
        <option value={"gpt-4"}>gpt-4</option>
        <option value={"gpt-3.5-turbo"}>gpt-3.5-turbo</option>
      </select>
      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        <h3>PDF Contents:</h3>
        Prompt: <input type="text" placeholder="Enter prompt" onChange={(e)=>{setFirst(e.target.value); console.log(first)}}/>
        <button onClick={sendRequest}>Summarize</button>
        <input type="text" placeholder="Enter separation text" onChange={(e)=>{setSeparationText(e.target.value); console.log(separationtext)}}/>
        <h1>Count: <span id="countDisplay">0</span></h1>
        <p>{pdfContent}</p>
        {/* <p>{summary}</p> */}
      </div>
      <LenderDatabase scenarios={scenarioPassOn} summary={summary}/>
    </div>
  );
};

export default PrintContentsOfPDF;
