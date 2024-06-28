async function fetchWeather() {
  try {
    const response = await fetch(
      "https://api.weatherapi.com/v1/current.json?key=772983b77eef43edb39103859242706&q=Tbilisi"
    );
    const weatherData = await response.json();
    const filteredData = filterWeather(weatherData);
    console.log(filteredData);
  } catch (err) {
    console.error(err);
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

  return {
    location: locationName,
    condition,
    temp_c,
    temp_f,
    feelslike_c,
    feelslike_f,
    wind,
    humidity,
  };
}

fetchWeather();
