// Function to generate API URL
function generateApiUrl(cityName, apiKey) {
    // Construct the API URL using provided cityName and apiKey
    return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;
}

// Define API key and city
const apiKey = 'f60b45c3793f30b73bc97da716ed83f1';
const city = 'Stockholm';


    document.getElementById('submit-button').addEventListener('click', function() {
        const cityName = document.getElementById('city-input').value;
        const newApiUrl = generateApiUrl(cityName, apiKey);
    
        fetch(newApiUrl)
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
    });
    