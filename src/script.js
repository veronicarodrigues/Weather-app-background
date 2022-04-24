function displayInfo(response) {
  let celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
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
