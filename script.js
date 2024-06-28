async function fetchWeatehr() {
  try {
    const response = await fetch(
      "https://api.weatherapi.com/v1/current.json?key=772983b77eef43edb39103859242706&q=London"
    );
    const weatherData = await response.json();
  } catch (err) {
    console.log(err);
  }
}

function filterWeather(data) {
  console.log(data);
}
