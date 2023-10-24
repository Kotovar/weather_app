"use strict";
import "./style.css";
import setDate from "./date";
import getCurrentWeather from "./setWeather";

const cityInput = document.getElementById("cityInput");

const pushSearchButton = document.getElementById("pushSearchButton");

setDate();
getCurrentWeather("Krasnoyarsk");

function changeCity() {
  pushSearchButton.addEventListener("click", () => {
    if (cityInput.value) {
      getCurrentWeather(cityInput.value);
      cityInput.value = "";
    }
  });

  cityInput.addEventListener("keypress", (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      getCurrentWeather(cityInput.value);
      cityInput.value = "";
    }
  });
}

changeCity();
