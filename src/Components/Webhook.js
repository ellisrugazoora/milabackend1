import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

function Webhook(){
    const [webhooks, setWebhooks] = useState(0);
    const [webhookData, setWebhookData] = useState([]);
    const [scenario, setScenario] = useState([])
    useEffect(() => {
        const eventSource = new EventSource("https://nodebackend-smmy.onrender.com/events");
    
        // Listen for messages from the server
        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data);
          const deal_id = data.webhook.meta.entity_id;
          var idSearchableDeal = {};
          data.deals.forEach((deal) => {
            idSearchableDeal[deal.id] = deal;
          });

          //const deals = event.deals ? JSON.parse(event.deals) : "deals placeholder"
        //   let first_name = JSON.parse(event.data.data.first_name);
        //   let type = JSON.parse(event.data.data.);
          console.log("Received webhook data: ", data.webhook);
          console.log("Deals: ", data.deals)
          setWebhookData(x => [...x, data.webhook]); // Update the state with the new webhook data
          setScenario(x => [...x, {deal_id: deal_id, person: idSearchableDeal[deal_id]["person_name"], deal: idSearchableDeal[deal_id]}])
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
    function printWebhooks(){
        console.log(webhooks)
    }
    function printScenarios(){
        console.log(scenario)
    }
    function resetWebhookDisplay(){
        setWebhookData([])
    }
    return (
        <div>
            <button onClick={fetchwebhook}>Fetch Webhooks</button>
            <p>{JSON.stringify(webhookData)}</p>
            <button onClick={printWebhooks}>Print Webhooks</button>
            <button onClick={printScenarios}>Print scenarios</button>
            <button onClick={resetWebhookDisplay}>Reset</button>
        </div>
    )
}

export default Webhook;