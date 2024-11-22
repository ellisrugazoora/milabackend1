import React from "react";

function Apicall(){
    const backendUrl = "https://nodebackend-smmy.onrender.com/api/openai";
    const sendRequest = async () => {
        try {
            const response = await fetch(backendUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt : "How old is the sun?" }),
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
            <button onClick={sendRequest}>Send request</button>
        </div>
        
    )
}

export default Apicall;