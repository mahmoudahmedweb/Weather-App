const searchInput = document.querySelector(".search-box input");
const searchIcon = document.querySelector(".search-box i");
const weatherIcon = document.querySelector(".weather-info img");
const errorMessage = document.querySelector(".error-message");
const weatherContainer = document.querySelector(".weather");
const tempElement = document.querySelector(".temp");
const cityElement = document.querySelector(".city");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");

const apiKey = "f4e68a54977c73fdf20aada4957e2f85";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (response.status === 404) {
        showError("Invalid city name. Please try again.");
        return;
    }
    
    hideError();
    const data = await response.json();
    updateWeather(data);
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    weatherContainer.style.display = "none";
}

function hideError() {
    errorMessage.style.display = "none";
}

function updateWeather(data) {
    cityElement.textContent = data.name;
    tempElement.textContent = `${Math.ceil(data.main.temp)}°C`;
    humidityElement.textContent = `${data.main.humidity}%`;
    windElement.textContent = `${data.wind.speed} km/h`;

    const weatherType = data.weather[0].main;
    weatherIcon.src = getWeatherIcon(weatherType);

    weatherContainer.classList.remove("animate");
    void weatherContainer.offsetWidth;
    weatherContainer.classList.add("animate");
    weatherContainer.style.display = "block";
}

function getWeatherIcon(type) {
    switch (type) {
        case "Clouds": return "https://a.top4top.io/p_3221jmazo1.png";
        case "Clear": return "https://g.top4top.io/p_3221332k21.png";
        case "Rain": return "https://g.top4top.io/p_32214lrwx1.png";
        case "Drizzle": return "https://j.top4top.io/p_322129tvs4.png";
        case "Mist": return "https://l.top4top.io/p_3221jdmvr1.png";
        default: return "https://a.top4top.io/p_3221jmazo1.png";
    }
}

searchIcon.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (!city) {
        showError("Please enter a city name.");
        return;
    }
    checkWeather(city);
});
