function setWeatherBackground(condition) {
  const body = document.querySelector('body');
  // Remove the default background class
  body.classList.remove('default-background');
  
  switch (condition) {
      case 'Clear':
          body.classList.add('clear-sky');
          break;
      case 'Clouds':
          body.classList.add('cloudy');
          break;
      case 'Rain':
      case 'Mist':
          body.classList.add('rainy');
          break;
      case 'Snow':
          body.classList.add('snowy');
          break;
      case 'Thunderstorm':
          body.classList.add('thunderstorm');
          break;
      default:
          // Add the default background class if the condition doesn't match any case
          body.classList.add('default-background');
          break;
  }
}


document.querySelector(".top-banner form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = e.target.querySelector("input");
  const msg = e.target.querySelector(".msg");
  const list = document.querySelector(".ajax-section .cities");
  const apiKey = "api_key";
  let inputValue = input.value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;

  fetch(url)
      .then((response) => response.json())
      .then((data) => {
          const { main, name, sys, weather } = data;
          const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@4x.png`;

          const li = document.createElement("li");
          li.classList.add("city");
          const markup = `
              <h2 class="city-name" data-name="${name},${sys.country}">
                  <span>${name}</span>
                  <sup>${sys.country}</sup>
              </h2>
              <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
              <figure>
                  <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
                  <figcaption>${weather[0]["description"]}</figcaption>
              </figure>
          `;
          li.innerHTML = markup;
          list.appendChild(li);

          updateForecast(inputValue, apiKey);

          setWeatherBackground(weather[0].main);
      })
      .catch(() => {
          msg.textContent = "Please search for a valid city 😩";
      });

  msg.textContent = "";
  input.value = "";
  input.focus();
});

function updateForecast(city, apiKey) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(forecastUrl)
      .then((response) => response.json())
      .then((data) => {
          displayForecast(data);
      })
      .catch((error) => {
          console.error("Error fetching forecast data: ", error);
      });
}

function displayForecast(data) {
  const forecastList = document.querySelector(".forecast-section .forecast-results");

  let filteredData = data.list.filter((item) => {
      return item.dt_txt.includes("12:00:00");
  });

  const html = filteredData
      .map((day) => {
          return `
              <li class="forecast">
                  <h2 class="forecast-date">${new Date(day.dt * 1000).toLocaleDateString()}</h2>
                  <div class="forecast-temp">${Math.round(day.main.temp)}<sup>°C</sup></div>
                  <figure>
                      <img class="forecast-icon" src="https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="${day.weather[0].description}">
                      <figcaption>${day.weather[0].description}</figcaption>
                  </figure>
              </li>
          `;
      })
      .join("");

  forecastList.innerHTML = html;
}
