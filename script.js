const apiKey = 'cfd29a885d960dc257b536ac3548e0db';

const weatherApp = {
  fetchWeather: function(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found. Please enter a valid city name.');
        }
        return response.json();
      })
      .then(data => this.displayWeather(data))
      .catch(error => this.displayError(error.message));
  },

  displayWeather: function(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector('.city').innerText = `Weather in ${name}`;
    document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = `${temp}°C`;
    document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
    document.querySelector('.wind').innerText = `Wind speed: ${speed} km/h`;
    document.querySelector('.weather').classList.remove('loading');

    // Set background based on weather description
    this.setWeatherBackground(description.toLowerCase());
  },

  displayError: function(message) {
    alert(message); // Display alert message
  },

  setWeatherBackground: function(weatherDescription) {
    document.body.className = ''; // Clear existing classes
    if (weatherDescription.includes('clear')) {
      document.body.classList.add('weather-clear');
    } else if (weatherDescription.includes('cloud')) {
      document.body.classList.add('weather-clouds');
    } else if (weatherDescription.includes('rain')) {
      document.body.classList.add('weather-rain');
    } else if (weatherDescription.includes('snow')) {
      document.body.classList.add('weather-snow');
    } else if (weatherDescription.includes('thunderstorm')) {
      document.body.classList.add('weather-thunderstorm');
    } else if (weatherDescription.includes('mist')) {
      document.body.classList.add('weather-mist');
    }
  },

  search: function() {
    const city = document.querySelector('.search-bar').value;
    if (city) {
      this.fetchWeather(city);
    } else {
      this.displayError('Please enter a city name.');
    }
  }
};

document.querySelector('.search button').addEventListener('click', () => weatherApp.search());

document.querySelector('.search-bar').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    weatherApp.search();
  }
});

weatherApp.fetchWeather('Chandigarh');
