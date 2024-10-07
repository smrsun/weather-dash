const citySearchBtn = document.getElementById('submit');
const citySearchInput = document.getElementById('citySearch');
const apiKey = '5fec77def754a40abd372c41b3f77b65';

function start() {
  const userInput = citySearchInput.value.trim();
  if (userInput) {
    runApi(userInput);
    addToSearchHistory(userInput);
  }
}

function runApi(city) {
  Promise.all([
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`),
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
  ])
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(([currentData, forecastData]) => {
      displayCurrentWeather(currentData);
      displayForecast(forecastData);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data. Please try again.');
    });
}

function displayCurrentWeather(data) {
  document.getElementById('cityName').textContent = data.name;
  document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById('date').textContent = new Date(data.dt * 1000).toLocaleDateString();
  document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°F`;
  document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} MPH`;
}

function displayForecast(data) {
  const forecastCards = document.getElementById('forecast-cards');
  forecastCards.innerHTML = '';

  for (let i = 0; i < data.list.length; i += 8) {
    const forecast = data.list[i];
    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `
      <h4>${new Date(forecast.dt * 1000).toLocaleDateString()}</h4>
      <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather icon">
      <p>Temp: ${forecast.main.temp}°F</p>
      <p>Humidity: ${forecast.main.humidity}%</p>
      <p>Wind: ${forecast.wind.speed} MPH</p>
    `;
    forecastCards.appendChild(card);
  }
}

function addToSearchHistory(city) {
  const searchList = document.getElementById('searchList');
  const listItem = document.createElement('li');
  listItem.textContent = city;
  listItem.addEventListener('click', () => runApi(city));
  searchList.prepend(listItem);

  // Limit history to 10 items
  if (searchList.children.length > 10) {
    searchList.removeChild(searchList.lastChild);
  }

  // Save to localStorage
  const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
  history.unshift(city);
  if (history.length > 10) history.pop();
  localStorage.setItem('searchHistory', JSON.stringify(history));
}

function loadSearchHistory() {
  const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
  history.forEach(addToSearchHistory);
}

citySearchBtn.addEventListener('click', start);
citySearchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') start();
});

loadSearchHistory();
