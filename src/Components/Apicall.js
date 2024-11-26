import React, { useState } from "react";

function Apicall(){
    const [prompt, SetPrompt] = useState("How old is the sun?")
    const backendUrl = "https://nodebackend-smmy.onrender.com/api/openai";
    const sendRequest = async () => {
        console.log(prompt)
        try {
            const response = await fetch(backendUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt : prompt }),
            })
            const data = await response.json();
            console.log(data.message.content);
        } catch (error){
            console.log("Error", error);
        }
    }
    return (
        <div>
            <p>API call</p>
            Prompt: <input type="text" placeholder="Enter prompt" onChange={(e)=>{SetPrompt(e.target.value); console.log(prompt)}}/>
            <button onClick={sendRequest}>Send request</button>
            
        </div>
        
    )
}

export default Apicall;