let now = new Date();

let date = document.querySelector(".date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();

date.innerHTML = `${day} ${hours}:${minutes}`;

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastHTML =
    forecastHTML +
    `
    <div class="col-2">
      <div class="card">
        <div class="card-body">
            <h6 class="card-title week-day">Monday</h6>
             <br />
             <p class="emoji-weather-time">🌜</p>
             <br />
             <p class="card-text">20ºC | 13ºC</p>
        </div>
      </div>
    </div>
  `;
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `fcb6db32349eaabbe25a151e1670e953`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  // document.querySelector("#precipitation").innerHTML = response.data;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);

  // if (searchInput.value) {
  //  location.innerHTML = `${searchInput.value}`;
  // } else {
  //  location.innerHTML = null;
  //  alert("Please type in a location");
  // }
}

function searchCity(city) {
  let units = `metric`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiKey = `fcb6db32349eaabbe25a151e1670e953`;
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  let searchInput = document.querySelector("#city-input");
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchGeolocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = `metric`;
  let apiKey = `fcb6db32349eaabbe25a151e1670e953`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function handleGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchGeolocation);
}

let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", handleGeolocation);

searchCity("Porto");
displayForecast();

/* Unit conversion - Fahrenheit / Celsius

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (temperatureElement.innerHTML * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function convertToFahrenheit(event) {
 event.preventDefault();
 let temperatureElement = document.querySelector("#temperature");
 let temperature = temperatureElement.innerHTML;
 temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
*/
