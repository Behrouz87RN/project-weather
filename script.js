
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
            document.getElementById('icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.documentElement.className = data.weather[0].main;
        })
        .catch(error => console.error('Error:', error));

    // Fetch forecast data
    fetch(generateApiUrl('forecast'))
        .then(response => response.json())
        .then(data => {
            const forecastList = data.list;
            const forecastContainer = document.getElementById('forecast-list');
            forecastContainer.innerHTML = ''; // Clear previous forecast data

            forecastList.filter(item => item.dt_txt.split(" ")[1].split(":")[0] == 12).forEach(item => {
                const date = new Date(item.dt * 1000);
                const dateString = date.toDateString();
                const minTemp = item.main.temp_min.toFixed(1);
                const maxTemp = item.main.temp_max.toFixed(1);
                const description = item.weather[0].description;

                const listItem = document.createElement('li');
                listItem.innerHTML = `<span>${dateString}</span><span><img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"></span><span>${minTemp}°C --- ${maxTemp}°C</span>`;

                forecastContainer.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error:', error));
});
