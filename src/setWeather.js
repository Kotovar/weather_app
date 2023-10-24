const currentTemperature = document.getElementById("currentTemperature");
const currentHumidity = document.getElementById("currentHumidity");
const windDir = document.getElementById("windDir");
const windSpeed = document.getElementById("windSpeed");
const pressure = document.getElementById("pressure");
const airQuality = document.getElementById("airQuality");
const uvIndex = document.getElementById("uvIndex");
const visibilityRange = document.getElementById("visibilityRange");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const chanceRain = document.getElementById("chanceRain");

export default async function getCurrentWeather() {
  try {
    const response = await fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=b6f6a59a427540edb9b104602232010&q=Krasnoyarsk&days=3&aqi=yes&alerts=no",
      { mode: "cors" }
    );
    if (response.ok) {
      const rawData = await response.json();
      console.log(rawData);
      setTemperature(rawData);
      setHumidity(rawData);
      setWind(rawData);
      setPressure(rawData);
      setAirQuality(rawData);
      setUvIndex(rawData);
      setVisibilityRange(rawData);
      setSunrise(rawData);
      setSunset(rawData);
      setChanceRain(rawData);
      return;
    }

    throw new Error(`Something went wrong: ${response.status}`);
  } catch (error) {
    console.error(error);
  }
}

function setTemperature(currentData) {
  const currentDataElements = [
    currentData.current.condition.icon,
    `${currentData.current.temp_c}° C now`,
    `${currentData.current.feelslike_c}° C feels like`,
  ];
  const currentTemperatureChildren = currentTemperature.children;
  currentTemperatureChildren[0].src = currentDataElements[0];
  currentTemperatureChildren[1].textContent = currentDataElements[1];
  currentTemperatureChildren[2].textContent = currentDataElements[2];
}

function setHumidity(currentData) {
  currentHumidity.textContent = `${currentData.current.humidity}%`;
}

function setWind(currentData) {
  let degree;
  const windIcons = {
    337.5: "north",
    295.5: "north_west",
    247.5: "west",
    202.5: "south_west",
    157.5: "south",
    122.5: "south_east",
    67.5: "east",
    22.5: "north_east",
  };
  windSpeed.textContent = `${currentData.current.wind_kph}km/h`;
  for (const key in windIcons) {
    if (currentData.current.wind_degree > key) {
      degree = windIcons[key];
      windDir.textContent = degree;
      return;
    }
  }
}

function setPressure(currentData) {
  pressure.textContent =
    (currentData.current.pressure_in * 25.4).toFixed(1) + " mmHg";
}

function setAirQuality(currentData) {
  airQuality.textContent = currentData.current.air_quality.pm2_5;
}

function setUvIndex(currentData) {
  uvIndex.textContent = currentData.current.uv;
}

function setVisibilityRange(currentData) {
  visibilityRange.textContent = currentData.current.vis_km + " km";
}

function setSunrise(currentData) {
  sunrise.textContent = currentData.forecast.forecastday[0].astro.sunrise;
}

function setSunset(currentData) {
  sunset.textContent = currentData.forecast.forecastday[0].astro.sunset;
}

function setChanceRain(currentData) {
  chanceRain.textContent =
    currentData.forecast.forecastday[0].day.daily_chance_of_rain + " %";
}
