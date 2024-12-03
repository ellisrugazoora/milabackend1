import React, { useState } from "react";
import * as pdfjs from "pdfjs-dist/webpack";
import Apicall from "./Apicall";
import LenderDatabase from "./LenderDatabase";

const PrintContentsOfPDF = (props) => {
  let scenarioPassOn = props.scenario;
  const [pdfContent, setPdfContent] = useState("");
  const [summary, setSummary] = useState("Summary placeholder")
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
            setPdfContent(current => current + `\n ${file.name} \n ` + text);
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
    console.log(prompt)
    try {
        const response = await fetch(backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt : textprompt }),
        })
        const data = await response.json();
        console.log(data.message.content);
        setSummary(data.message.content)
    } catch (error){
        console.log("Error", error);
    }
}
  return (
    <div style={{ padding: "20px" }}>
      <h2>Print PDF Contents</h2>
      <input type="file" /* accept="application/pdf"*/ onChange={handleFileChange} multiple />
      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        <h3>PDF Contents:</h3>
        Prompt: <input type="text" placeholder="Enter prompt" onChange={(e)=>{setFirst(e.target.value); console.log(first)}}/>
        <button onClick={sendRequest}>Summarize</button>
        <h1>Count: <span id="countDisplay">0</span></h1>
        <p>{pdfContent}</p>
        {/* <p>{summary}</p> */}
      </div>
      <LenderDatabase scenarios={scenarioPassOn} summary={summary}/>
    </div>
  );
};

export default PrintContentsOfPDF;
