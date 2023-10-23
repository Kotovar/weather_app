"use strict";
import "./style.css";
import setDate from "./date";

setDate();

const currentTemperature = document.getElementById("currentTemperature");

async function getCurrentWeather() {
  try {
    const response = await fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=b6f6a59a427540edb9b104602232010&q=Krasnoyarsk&days=3&aqi=yes&alerts=no",
      { mode: "cors" }
    );
    if (response.ok) {
      const rawData = await response.json();
      console.log(rawData);
      setWeather(rawData);
      return rawData;
    }

    throw new Error(`Something went wrong: ${response.status}`);
  } catch (error) {
    console.error(error);
  }
}

function setWeather(currentData) {
  const currentDataElements = [
    currentData.current.condition.icon,
    `${currentData.current.temp_c}° C`,
    `${currentData.current.feelslike_c}° C`,
  ];
  const currentTemperatureChildren = currentTemperature.children;
  currentTemperatureChildren[0].src = currentDataElements[0];
  currentTemperatureChildren[1].textContent = currentDataElements[1];
  currentTemperatureChildren[2].textContent = currentDataElements[2];
}

getCurrentWeather();
