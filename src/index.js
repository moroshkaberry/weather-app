let now = new Date();

let celsiusTemp = null;
let currentDateElement = document.querySelector(".current-date");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

currentDateElement.innerHTML = `${day} ${hours}:${minutes}`;

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  let days = [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  days.forEach(function (day) {
    forecastHTML +=
      `<div class="daysofweek">` +
      `<img src="img/clear-day.svg" alt="sunny" /><br />` +
      `${day}` +
      `<div class="daysofweek-temperatures">` +
      `<strong>+17°</strong> +8°` +
      `</div></div>`;
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let h1 = document.querySelector("h1");
  console.log(response.data);
  h1.innerHTML = `${response.data.name}`;

  let temperature = Math.round(celsiusTemp);
  let h2 = document.querySelector("#temperature");
  h2.innerHTML = `${temperature}`;

  console.log(response.data);
  let currentSky = document.querySelector("#current-sky");
  currentSky.innerHTML = `${response.data.weather[0].main}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  // searchLocation(response.data.coord);
  celsiusTemp = response.data.main.temp;

  getForecast(response.data.coord);

  displayCelsiusTemperature();
}

function getWeatherByCity(city) {
  const apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  getWeatherByCity(city);
}

function searchLocation(position) {
  const apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition((position) => {
    searchLocation({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  });
}

let currentForm = document.querySelector("#current-button");
currentForm.addEventListener("click", getCurrentLocation);

function clearPlaceholder(event) {
  let searchBar = document.querySelector("#search-bar");
  searchBar.placeholder = "";
}

let searchInput = document.querySelector("#search-bar");
searchInput.addEventListener("click", clearPlaceholder);

function displayFahrenheitTemperature() {
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemperature() {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let searchForm = document.querySelector("#search-button");
searchForm.addEventListener("click", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

getWeatherByCity("New York");
