const errorSpan = document.querySelector(".error-message");
let filteredWeatherData = null;

async function fetchWeather(city, lat = null, lng = null) {
  try {
    errorSpan.innerHTML = "";
    let query = city ? city : "zugdidi";
    if (lat !== null && lng !== null) {
      query = `${lat},${lng}`;
    }

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=772983b77eef43edb39103859242706&q=${query}`
    );
    const weatherData = await response.json();
    filteredWeatherData = filterWeather(weatherData);
    displayWeather(filteredWeatherData);
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

document.querySelector("#weather-form").addEventListener("submit", (e) => {
  e.preventDefault();
  fetchWeather(e.target.children[1].value);
  e.target.children[1].value = "";
});

function displayWeather(filteredWeatherData) {
  const {
    condition,
    location: city,
    temp_c,
    temp_f,
    feelslike_c,
    feelslike_f,
    wind,
    humidity,
    locationCountry: country,
  } = filteredWeatherData;

  const connditionEl = document.querySelector(".condition");
  const cityEl = document.querySelector(".city");
  const tempEl = document.querySelector(".temp");
  const feelsEl = document.querySelector(".feels");
  const windEl = document.querySelector(".wind");
  const humidityEl = document.querySelector(".humidity");
  const toggleButton = document.querySelector(".toggle-button");

  connditionEl.innerHTML = condition;
  cityEl.innerHTML = `${city}, ${country}`;

  if (toggleButton.classList.contains("fa-toggle-off")) {
    tempEl.innerHTML = `${Math.round(temp_c)}&deg;C `;
    feelsEl.innerHTML = `Feels Like: ${feelslike_c}&deg;C`;
  } else if (toggleButton.classList.contains("fa-toggle-on")) {
    tempEl.innerHTML = `${Math.round(temp_f)}&deg;F `;
    feelsEl.innerHTML = `Feels Like: ${feelslike_f}&deg;F`;
  }
  windEl.innerHTML = `Wind: ${wind} KPH`;
  humidityEl.innerHTML = `Humidity: ${humidity}%`;
}

function toggleTemperature() {
  const toggleOn = document.querySelector(".fa-toggle-on");
  const toggleOff = document.querySelector(".fa-toggle-off");
  if (toggleOn) {
    toggleOn.classList = `fa-solid fa-toggle-off toggle-button`;
  } else if (toggleOff) {
    toggleOff.classList = `fa-solid fa-toggle-on toggle-button`;
  }

  if (filteredWeatherData) {
    displayWeather(filteredWeatherData);
  }
}

const toggleButton = document.querySelector(".toggle-button");
toggleButton.addEventListener("click", toggleTemperature);

navigator.geolocation.getCurrentPosition(
  (position) => {
    fetchWeather(null, position.coords.latitude, position.coords.longitude);
  },
  () => {
    fetchWeather();
  }
);
