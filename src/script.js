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
