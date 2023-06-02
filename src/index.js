let now = new Date();
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

function showWeather(response) {
  let h1 = document.querySelector("h1");
  console.log(response.data);
  h1.innerHTML = `${response.data.name}`;

  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("#temperature");
  h2.innerHTML = `${temperature}°C`;

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
  searchLocation(response.data.coord);
}

function searchCity(city) {
  const apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  searchCity(city);
}

function searchLocation(position) {
  const apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-button");
searchForm.addEventListener("click", handleSubmit);

let currentForm = document.querySelector("#current-button");
currentForm.addEventListener("click", getCurrentLocation);

function clearPlaceholder(event) {
  let searchBar = document.querySelector("#search-bar");
  searchBar.placeholder = "";
}

let searchInput = document.querySelector("#search-bar");
searchInput.addEventListener("click", clearPlaceholder);
searchCity("New York");
