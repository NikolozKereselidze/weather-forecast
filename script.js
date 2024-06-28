const errorSpan = document.querySelector(".error-message");

async function fetchWeather(city) {
  try {
    errorSpan.innerHTML = "";
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=772983b77eef43edb39103859242706&q=${
        city ? city : "tbilisi"
      }`
    );
    const weatherData = await response.json();
    const {
      location,
      condition,
      temp_c,
      temp_f,
      feelslike_c,
      feelslike_f,
      wind,
      humidity,
      locationCountry,
    } = filterWeather(weatherData);
    displayWeather(
      condition,
      location,
      temp_c,
      feelslike_c,
      wind,
      humidity,
      locationCountry
    );
  } catch (err) {
    console.error(err);
    errorSpan.innerHTML = "Location not found";
  }
}

function filterWeather({ current, location }) {
  const {
    condition: { text: condition },
    temp_c,
    temp_f,
    feelslike_c,
    feelslike_f,
    wind_kph: wind,
    humidity,
  } = current;

  const { name: locationName } = location;
  const { country: locationCountry } = location;

  return {
    location: locationName,
    condition,
    temp_c,
    temp_f,
    feelslike_c,
    feelslike_f,
    wind,
    humidity,
    locationCountry,
  };
}
fetchWeather();

document.querySelector("#weather-form").addEventListener("submit", (e) => {
  e.preventDefault();
  fetchWeather(e.target.children[1].value);
});

function displayWeather(condition, city, temp, feels, wind, humidity, country) {
  const connditionEl = document.querySelector(".condition");
  const cityEl = document.querySelector(".city");
  const tempEl = document.querySelector(".temp");
  const feelsEl = document.querySelector(".feels");
  const windEl = document.querySelector(".wind");
  const humidityEl = document.querySelector(".humidity");

  connditionEl.innerHTML = condition;
  cityEl.innerHTML = `${city}, ${country}`;
  tempEl.innerHTML = `${Math.round(temp)}&deg;C `;
  feelsEl.innerHTML = `Feels Like: ${feels}&deg;C`;
  windEl.innerHTML = `Wind: ${wind} KPH`;
  humidityEl.innerHTML = `Humidity: ${humidity}%`;
}
