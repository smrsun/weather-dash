const citySearchBtn = document.getElementById('submit')
const apiKey = '5fec77def754a40abd372c41b3f77b65' 
const citySearch = document.getElementById('preSearch')

function start() {
    // capture the value of the input box
    const userInput = document.getElementById('citySearch').value;

    runApi(userInput);
    // localStorage.
}

function runApi(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
   .then((res) => {
    return res.json()
  }).then((data) => {
    console.log(data);
  
    let iconEl = document.getElementById('icon');
      iconEl.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

    let dateObj = new Date(data.dt * 1000);
    let dateEl = document.getElementById('date');
      dateEl.textContent = dateObj;

    const cityNameEl =  document.getElementById('cityName')
      cityNameEl.textContent = data.name
  
  });
  

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
    .then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data);
  
      
    
   });
  };


citySearchBtn.addEventListener("click", start)

