const currentTemperature = document.getElementById('currentTemperature');
const currentHumidity = document.getElementById('currentHumidity');
const windDir = document.getElementById('windDir');
const windSpeed = document.getElementById('windSpeed');
const pressure = document.getElementById('pressure');
const airQuality = document.getElementById('airQuality');
const uvIndex = document.getElementById('uvIndex');
const visibilityRange = document.getElementById('visibilityRange');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const chanceRain = document.getElementById('chanceRain');
const firstDay = document.getElementById('firstDay');
const secondDay = document.getElementById('secondDay');
const thirdDay = document.getElementById('thirdDay');
const cityName = document.getElementById('cityName');

export default async function getCurrentWeather(city) {
	if (!city) {
		return;
	}

	try {
		const response = await fetch(
			'https://api.weatherapi.com/v1/forecast.json?key=b6f6a59a427540edb9b104602232010&q=' +
				city +
				'&days=3&aqi=yes&alerts=no',
			{mode: 'cors'},
		);
		if (response.ok) {
			const rawData = await response.json();
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
			setForecast(rawData);
			setCity(rawData);
			return;
		}

		throw new Error(`Something went wrong: ${response.status}`);
	} catch (error) {
		console.error(error);
		cityName.textContent = 'Incorrect city indication';
	}
}

function setTemperature(currentData) {
	const currentDataElements = [
		currentData.current.condition.icon,
		`${currentData.current.temp_c}°C now`,
		`${currentData.current.feelslike_c}°C feels like`,
	];
	console.log(currentDataElements[0]);
	const currentTemperatureChildren = currentTemperature.children;
	currentTemperatureChildren[0].src = 'https:' + currentDataElements[0];
	currentTemperatureChildren[1].textContent = currentDataElements[1];
	currentTemperatureChildren[2].textContent = currentDataElements[2];
}

function setHumidity(currentData) {
	currentHumidity.textContent = `${currentData.current.humidity}%`;
}

function setWind(currentData) {
	let degree;
	const windIcons = {
		337.5: 'north',
		295.5: 'north_west',
		247.5: 'west',
		202.5: 'south_west',
		157.5: 'south',
		122.5: 'south_east',
		67.5: 'east',
		22.5: 'north_east',
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
		(currentData.current.pressure_in * 25.4).toFixed(1) + ' mmHg';
}

function setAirQuality(currentData) {
	airQuality.textContent = currentData.current.air_quality.pm2_5 + ' pm2.5';
}

function setUvIndex(currentData) {
	uvIndex.textContent = currentData.current.uv;
}

function setVisibilityRange(currentData) {
	visibilityRange.textContent = currentData.current.vis_km + ' km';
}

function setSunrise(currentData) {
	sunrise.textContent = currentData.forecast.forecastday[0].astro.sunrise;
}

function setSunset(currentData) {
	sunset.textContent = currentData.forecast.forecastday[0].astro.sunset;
}

function setChanceRain(currentData) {
	chanceRain.textContent =
		currentData.forecast.forecastday[0].day.daily_chance_of_rain + ' %';
}

function setForecast(currentData) {
	const forecastData = [
		currentData.forecast.forecastday[0].date,
		currentData.forecast.forecastday[0].day.avgtemp_c + '°C',
		currentData.forecast.forecastday[0].day.avghumidity + '%',
		currentData.forecast.forecastday[0].day.maxwind_kph + 'km/h',
		currentData.forecast.forecastday[1].date,
		currentData.forecast.forecastday[1].day.avgtemp_c + '°C',
		currentData.forecast.forecastday[1].day.avghumidity + '%',
		currentData.forecast.forecastday[1].day.maxwind_kph + 'km/h',
		currentData.forecast.forecastday[2].date,
		currentData.forecast.forecastday[2].day.avgtemp_c + '°C',
		currentData.forecast.forecastday[2].day.avghumidity + '%',
		currentData.forecast.forecastday[2].day.maxwind_kph + 'km/h',
	];
	const dayChildren = [
		firstDay.children,
		secondDay.children,
		thirdDay.children,
	];
	const dayStart = [0, 4, 8];

	[...dayChildren[0]].reduce((i, elem) => {
		elem.textContent = forecastData[i];
		return i + 1;
	}, dayStart[0]);
	[...dayChildren[1]].reduce((i, elem) => {
		elem.textContent = forecastData[i];
		return i + 1;
	}, dayStart[1]);
	[...dayChildren[2]].reduce((i, elem) => {
		elem.textContent = forecastData[i];
		return i + 1;
	}, dayStart[2]);
}

function setCity(currentData) {
	cityName.textContent =
		currentData.location.name + ', ' + currentData.location.country;
}
