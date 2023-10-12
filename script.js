
document.getElementById('submit-button').addEventListener('click', function() {
    const cityName = document.getElementById('city-input').value;
    const apiKey = 'f60b45c3793f30b73bc97da716ed83f1';

    // Function to generate API URLs
    function generateApiUrl(type) {
        return `https://api.openweathermap.org/data/2.5/${type}?q=${cityName}&units=metric&APPID=${apiKey}`;
    }

    // Fetch current weather data
    fetch(generateApiUrl('weather'))
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

    // Fetch forecast data
    fetch(generateApiUrl('forecast'))
        .then(response => response.json())
        .then(data => {
            const forecastList = data.list;
            const forecastContainer = document.getElementById('forecast-list');
            forecastContainer.innerHTML = ''; // Clear previous forecast data

            forecastList.forEach(item => {
                const date = new Date(item.dt * 1000);
                const dateString = date.toDateString();
                const minTemp = item.main.temp_min.toFixed(1);
                const maxTemp = item.main.temp_max.toFixed(1);
                const description = item.weather[0].description;

                const listItem = document.createElement('li');
                listItem.textContent = `${dateString}: Min Temp: ${minTemp}°C, Max Temp: ${maxTemp}°C, Description: ${description}`;

                forecastContainer.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error:', error));
});
