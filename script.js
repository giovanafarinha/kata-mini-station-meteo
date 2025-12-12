// A toi de jouer pour cette partie :-) Happy coding !
let cityElement = document.getElementById("city");
let temperatureElement = document.getElementById("temperature");
let cityElementInput = document.getElementById("cityInput");
let detailsElementInput = document.getElementById("details");
let buttonElement = document.getElementById("button");

async function fetchWeather(city) {
  const url = new URL("https://api.shecodes.io/weather/v1/current?&b&");
  url.searchParams.set("units", "metric");
  url.searchParams.set("key", "b2a5adcct04b33178913oc335f405433");
  url.searchParams.set("query", city);

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("API error");
  const data = await response.json();

  if (data.city) {
    cityElement.textContent = data.city;
    detailsElementInput.textContent = "temperature displayed";
  } else {
    cityElement.textContent = "404 city not found ";
    detailsElementInput.textContent = "";
  }

  if (data.temperature.current) {
    temperatureElement.textContent = `${Math.round(
      data.temperature.current
    )} C°`;
  } else {
    temperatureElement.textContent = "";
  }
  return data;
}

function displayCity() {
  let inputCityValue = cityElementInput.value;
  if (inputCityValue) {
    fetchWeather(inputCityValue);
  } else {
    console.log("Por favor, digite o nome de uma cidade.");
  }
  temperatureElement.textContent = "";
  cityElement.textContent = "";
}

buttonElement.addEventListener("click", displayCity);
