function formatDate(timestamp) {
  let now = new Date(timestamp);
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
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
}

function displayInfo(response) {
  let celsiusTemperature = response.data.main.temp;
  let city = response.data.name;
  let country = response.data.sys.country;
  let dateTime = document.querySelector("#date-time");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#icon");
  dateTime.innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#city-display").innerHTML = `${city}, ${country}`;
  description.innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function defaultInfo() {
  let apiKey = "23a42024d4ea98a857d3b3b4b4f71a2a";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let city = "Stockholm";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayInfo);
}

defaultInfo();

function search(event) {
  event.preventDefault();
  let apiKey = "23a42024d4ea98a857d3b3b4b4f71a2a";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let unit = "metric";
  let cityInput = document.querySelector("#search-city-input");
  let cityClean = cityInput.value.trim();
  let apiUrl = `${apiEndpoint}?q=${cityClean}&appid=${apiKey}&units=${unit}`;
  if (cityClean.length > 0) {
    axios.get(apiUrl).then(displayInfo);
  } else {
    alert(`Please type a city`);
  }
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", search);

function showPosition(position) {
  let apiKey = "23a42024d4ea98a857d3b3b4b4f71a2a";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let unit = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayInfo);
}

function searchCurrent() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", searchCurrent);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let celsiusTemperature = null;
