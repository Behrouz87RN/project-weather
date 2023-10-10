const apiKey = 'YOUR_API_KEY';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${apiKey}`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const city = data.name;
        const temperature = data.main.temp.toFixed(1);
        const description = data.weather[0].description;

        document.getElementById('city').textContent = `City: ${city}`;
        document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
        document.getElementById('description').textContent = `Description: ${description}`;
    })
    .catch(error => console.error('Error:', error));
