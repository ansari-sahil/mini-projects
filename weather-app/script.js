document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('getWeatherBtn').addEventListener('click', function () {
        const city = document.getElementById('cityInput').value;
        const apiKey = 'f28d0c48fe92640ea8341d10c62bb170';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            if (data.cod === 200) {
              document.getElementById('weatherInfo').classList.remove('hidden');
              document.getElementById('cityName').textContent = `Weather in ${data.name}, ${data.sys.country}`;
              document.getElementById('weatherDescription').textContent = `Description: ${data.weather[0].description}`;
              document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
              document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
              document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
            } else {
              alert('City not found, please try again.');
            }
          })
          .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data, please try again later.');
          });
      });
      
    });