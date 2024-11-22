import { OpenAI } from 'openai'
import { useState } from 'react';

function OpenAi(){
    // const [inputText, setInputText] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const theKey = process.env.REACT_APP_KEY;
    
    function printkey(){
        console.log("theKey")
    }
    const openai = new OpenAI({
        apiKey: theKey,
    });
    const submitQuery = async () => {
        setLoading(true);
        setError(null);
        try{
            const result = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo', // Use the correct model
                messages: [{ role: 'user', content: "What is the height of Everest?" }],
            });
            setResponse(result.choices[0].message.content);
        } catch (error) {
            setError('Error fetching response: ' + error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <p>OpenAi</p>
            <button onClick={printkey}>Print key</button>
            <button onClick={submitQuery}>Submit query</button>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && <p><strong>Response: </strong>{response}</p>}
        </div>
    )
}

export default OpenAi;