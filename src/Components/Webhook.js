import { useState } from "react";
import { io } from "socket.io-client";

function Webhook(){
    const [webhooks, setWebhooks] = useState(0);
    const fetchwebhook = async () => {
        const response = await fetch('https://nodebackend-smmy.onrender.com/webhook');
        const data = await response.json();
        console.log(data);
        setWebhooks(data)
        //alert(JSON.stringify(data, null, 2)); // Show the data in an alert box
    }
    return (
        <div>
            <button onClick={fetchwebhook}>Fetch Webhooks</button>
            {/* {JSON.stringify(webhooks, null, 2)} */}
        </div>
    )
}

export default Webhook;