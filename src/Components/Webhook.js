import { useState } from "react";

function Webhook(){
    const [webhooks, setWebhooks] = useState(0);
    const fetchwebhook = async () => {
        const response = await fetch('https://nodebackend-smmy.onrender.com/webhook');
        const data = await response.json();
        console.log(data);
        setWebhooks(data)
        alert(JSON.stringify(data, null, 2)); // Show the data in an alert box
    }
    return (
        <div>
            <button onClick={fetchwebhook}>Fetch Webhooks</button>
            {webhooks}
        </div>
    )
}

export default Webhook;