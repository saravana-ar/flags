document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from REST Countries API
    fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((countries) => {
            // Create cards for each country
            countries.forEach((country) => {
                createCountryCard(country);
            });
        })
        .catch((error) => console.error("Error fetching country data:", error));
});

function createCountryCard(country) {
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-sm-12", "mb-4");
    card.innerHTML = `
        <div class="card">
            <img src="${country.flags.png}" class="card-img-top" alt="${country.name.common}">
            <div class="card-body">
                <h5 class="card-title">${country.capital[0]}</h5>
                <p class="card-text">Region: ${country.region}</p>
                <p class="card-text">Lat/Long: ${country.latlng.join(", ")}</p>
                <p class="card-text">Country: ${country.name.common}</p>
                <p class="card-text">Country Code: ${country.cca2}</p>
                <button class="btn btn-primary" data-country="${country.cca2}">Get Weather</button>
            </div>
        </div>
    `;

    const getWeatherButton = card.querySelector("button");
    getWeatherButton.addEventListener("click", () => {
        
        fetchWeatherData(country.cca2)
            .then((weatherData) => {
                displayWeatherModal(country.name.common, weatherData);
            })
            .catch((error) => console.error("Error fetching weather data:", error));
    });

    document.querySelector(".row").appendChild(card);
}

function fetchWeatherData(countryCode) {
    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryCode}&appid=${apiKey}`;

    return fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            return {
                temperature: data.main.temp,
                weather: data.weather[0].description,
            };
        });
}

function displayWeatherModal(countryName, weatherData) {
    
}
