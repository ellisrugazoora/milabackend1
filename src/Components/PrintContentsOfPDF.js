import React, { useState } from "react";
import * as pdfjs from "pdfjs-dist/webpack";
import Apicall from "./Apicall";

const PrintContentsOfPDF = () => {
  const [pdfContent, setPdfContent] = useState("");
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
            setPdfContent(current => current + `\n ${file.name} \n ` + text.slice(0, 100));
            document.getElementById("countDisplay").textContent = ++count;
            ///
            let prompto = "Read the content of the following pdf documents and summarize it in the following format; data = [col1:x, col2:y, col3:z, ...] and colDefs=[{field: col1}, {field: col2}, {field: col3}, ...] whereby col are meaningful fields of information that are in all pdf for example min credit (you can pick the columns) and x, y, z are the corresponding value per respective pdf document. Below are the content of the pdfs:  " + pdfContent;
            const response = await fetch(backendUrl, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ prompt : prompto }),
            })
            const data = await response.json();
            console.log(data.message.content);
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


    


  return (
    <div style={{ padding: "20px" }}>
      <h2>Print PDF Contents</h2>
      <input type="file" /* accept="application/pdf"*/ onChange={handleFileChange} multiple />
      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        <h3>PDF Contents:</h3>
        <h1>Count: <span id="countDisplay">0</span></h1>
        <p>{pdfContent}</p>
      </div>
      <Apicall />
    </div>
  );
};

export default PrintContentsOfPDF;
