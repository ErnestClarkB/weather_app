const apiKey = "27f4cd3b22c4fa25699036323bfd6ba2"; // Replace with your OpenWeatherMap API key
const defaultCity = "Lamitan"; // Set your default city here

// Fetch weather for the default city when the page loads
window.onload = function() {
    getWeather(defaultCity);
};

async function getWeather(city) {
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            
            // Update the date and city
            const date = new Date().toLocaleDateString('en-US', {
                weekday: 'long', 
                month: 'long', 
                day: 'numeric'
            });
            document.getElementById('dayDate').innerText = date;
            document.getElementById('cityName').innerText = `${data.name}, ${data.sys.country}`;

            // Update the weather condition and temperature
            const weatherCondition = data.weather[0].description;
            const temperature = data.main.temp;

            // Update the weather icon
            const iconCode = data.weather[0].icon; // e.g., '01d'
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            document.getElementById('weatherIcon').src = iconUrl;

            // Set weather status and temperature
            document.getElementById('weatherStatus').innerText = weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1);
            document.getElementById('temperature').innerText = `${temperature}°C`;
            
            const windSpeed = data.wind.speed; // Wind speed in m/s
            const windDirection = data.wind.deg; // Wind direction in degrees
            const cloudiness = data.clouds.all; // Cloudiness percentage
            const humidity = data.main.humidity; // Humidity percentage
            const sunsetTime = new Date(data.sys.sunset * 1000);
            let hours = sunsetTime.getHours();
            const minutes = sunsetTime.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with zero if needed
            const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM
            hours = hours % 12; // Convert to 12-hour format
            hours = hours ? hours : 12; // the hour '0' should be '12'
            const formattedSunsetTime = `${hours}:${minutes} ${ampm}`;

            // Set wind speed and direction
            document.getElementById('force').innerText = `${windSpeed} m/s`;
            document.getElementById('direction').innerText = `${windDirection}°`;

            // Set cloudiness
            document.getElementById('cloudiness').innerText = `${cloudiness}%`;

            // Set humidity
            document.getElementById('humidity').innerText = `${humidity}%`;

            // Set sunset time
            document.getElementById('sunset').innerText = formattedSunsetTime;
        } else {
            document.getElementById('weatherInfo').innerHTML = `<p>City not found.</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weatherInfo').innerHTML = `<p>Error fetching weather data.</p>`;
    }
}

document.getElementById('cityInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') { // Check if Enter key is pressed
        const city = cityInput.value.trim(); // Get input value and trim whitespace
        getWeather(city); // Fetch weather for the entered city
    }
});

// Allow fetching weather for a new city when the button is clicked
/*document.querySelector("button").addEventListener("click", function() {
    const city = document.getElementById('cityInput').value;
    getWeather(city);
});*/