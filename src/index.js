"use strict";
import "./style.css";
import setDate from "./date";

setDate();

// https://api.weatherapi.com/v1/current.json?key=b6f6a59a427540edb9b104602232010&q=Krasnoyarsk

async function getCurrentWeather() {
  try {
    const response = await fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=b6f6a59a427540edb9b104602232010&q=Krasnoyarsk&days=3&aqi=yes&alerts=no",
      { mode: "cors" }
    );
    if (response.ok) {
      const rawData = await response.json();
      console.log(rawData);
    } else {
      throw new Error(`Something went wrong: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

getCurrentWeather();
