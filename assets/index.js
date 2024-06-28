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
   .then((res)=> {
    return res.json()
  }).then((data)=> {
    console.log(data);
    const cityNameEl =  document.getElementById('cityName')
    cityNameEl.textContent = data.name
    citySearch.append(cityNameEl)
  })
}

citySearchBtn.addEventListener("click", start)
