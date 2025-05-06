document.addEventListener('DOMContentLoaded', () => {
    
    

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim().toLowerCase();
        if (city) {
            fetchWeatherData(city);
        } else {
            alert('Please enter a city name');
        }
    });

    async function fetchWeatherData(city) {
        try {
            const response = await fetch('weatherData.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const weatherData = await response.json();
            
            if (weatherData[city]) {
                cityName.textContent = capitalize(city);
                temperature.textContent = weatherData[city].temperature;
                humidity.textContent = weatherData[city].humidity;
                conditions.textContent = weatherData[city].conditions;
            } else {
                alert('City not found in our database');
                resetWeatherDisplay();
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to fetch weather data');
            resetWeatherDisplay();
        }
    }

    function resetWeatherDisplay() {
        cityName.textContent = '-';
        temperature.textContent = '-';
        humidity.textContent = '-';
        conditions.textContent = '-';
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});
