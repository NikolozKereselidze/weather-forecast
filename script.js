async function fetchWeatehr() {
  const response = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=772983b77eef43edb39103859242706&q=London"
  );

  const weatherData = await response.json();
}

function filterWeather(data) {
  console.log(data);
}
