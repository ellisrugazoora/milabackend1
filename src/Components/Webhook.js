import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

function Webhook(){
    const [webhooks, setWebhooks] = useState(0);
    const [webhookData, setWebhookData] = useState(null);
    useEffect(() => {
        const eventSource = new EventSource("https://nodebackend-smmy.onrender.com/events");
    
        // Listen for messages from the server
        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log("Received webhook data:", data);
          setWebhookData(x => x + data); // Update the state with the new webhook data
        };
    
        // Close the connection when the component is unmounted
        return () => {
          eventSource.close();
        };
      }, []);
    const fetchwebhook = async () => {
        const response = await fetch('https://nodebackend-smmy.onrender.com/webhook');
        const data = await response.json();
        console.log(data);
        setWebhooks(data)
        //alert(JSON.stringify(data, null, 2)); // Show the data in an alert box
    }
    function print(){
        console.log(webhooks)
    }
    return (
        <div>
            <button onClick={fetchwebhook}>Fetch Webhooks</button>
            <p>{JSON.stringify(webhookData)}</p>
            <button onClick={print}>print</button>
            <button onClick={()=>{setWebhookData("null")}}>Reset</button>
        </div>
    )
}

export default Webhook;