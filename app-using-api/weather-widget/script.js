const apiKey = 'f28d0c48fe92640ea8341d10c62bb170';

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeather, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

async function fetchWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const weatherWidget = document.getElementById('weather-widget');
    weatherWidget.innerHTML = `
        <div class="flex items-center">
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon" class="w-16 h-16">
            <div class="ml-4">
                <p class="text-xl font-semibold">${data.name}</p>
                <p class="text-gray-600">${data.weather[0].description}</p>
            </div>
        </div>
        <div class="mt-4 flex justify-between items-center">
            <p class="text-4xl font-bold">${data.main.temp}°C</p>
            <div>
                <p class="text-gray-600">Humidity: ${data.main.humidity}%</p>
                <p class="text-gray-600">Wind: ${data.wind.speed} m/s</p>
            </div>
        </div>
    `;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

// Fetch weather data on page load
document.addEventListener('DOMContentLoaded', getLocation());
