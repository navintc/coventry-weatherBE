import fetch from 'node-fetch';

export async function handler(event) {
    // Define the range for your random values
    const temperature = Math.floor(Math.random() * (35 - 10 + 1)) + 10;
    const humidity = Math.floor(Math.random() * (90 - 40 + 1)) + 40;
    const airpressure = Math.floor(Math.random() * (1050 - 980 + 1)) + 980;
    const conditions = ['Sunny', 'Rainy', 'Cloudy', 'Misty'];
    const content = conditions[Math.floor(Math.random() * conditions.length)];
  
  // Retrieve environment variables
    const lat = parseFloat(process.env.LATITUDE);
    const lon = parseFloat(process.env.LONGITUDE); 

    const location = process.env.LOCATION;
    const locid = process.env.LOC_ID;
    
    // Construct the data payload
    const data = {
        locid,
        lat,
        lon,
        location,
        humidity,
        temperature,
        airpressure,
        content,
    };
    
    // Define your API endpoint here
    const apiEndpoint = process.env.APIURL;
    
    // Make the POST request to the API
    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const responseJson = await response.json();
        console.log(responseJson);
        
        return {
            statusCode: 200,
            body: JSON.stringify(responseJson),
        };
    } catch (error) {
            console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error sending data', error: error.message }),
        };
    }
};