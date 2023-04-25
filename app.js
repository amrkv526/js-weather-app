const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "218caceb03fd1f38cf5c18d1fdeac6b3";

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

  const listItems = list.querySelectorAll(".ajax-section .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";

      if (inputVal.includes(",")) {
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well 😉`;
      form.reset();
      input.focus();
      return;
    }
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(currentWeatherUrl)
  .then(response => response.json())
  .then(data => {
    const { main, name, sys, weather } = data;
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
      weather[0]["icon"]
    }.svg`;

    const li = document.createElement("li");
    li.classList.add("city");
    const markup = `
      <h2 class="city-name" data-name="${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
      </h2>
      <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
      <figure>
        <img class="city-icon" src="${icon}" alt="${
      weather[0]["description"]
    }">
        <figcaption>${weather[0]["description"]}</figcaption>
      </figure>
    `;
      li.innerHTML = markup;
      document.querySelector(".cities").appendChild(li);
      
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
    });

  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      const { city, list } = data;
      const forecastResultsContainer = document.querySelector('.forecast-results');
      forecastResultsContainer.innerHTML = '';

      const forecastDiv = document.createElement("div");
      forecastDiv.classList.add("forecast");

      const forecastTitle = document.createElement("h3");
      forecastTitle.textContent = "5-Day Forecast";
      forecastDiv.appendChild(forecastTitle);


      list.forEach((forecast, index) => {
        if (index % 8 === 0) {
          const forecastDate = new Date(forecast.dt * 1000);
          const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
            forecast.weather[0]["icon"]
          }.svg`;

          const forecastItem = document.createElement("div");
          forecastItem.classList.add("forecast-item");

          const forecastItemMarkup = `
            <div class="forecast-date">${forecastDate.toLocaleDateString()}</div>
            <div class="forecast-temp">${Math.round(forecast.main.temp)}<sup>°C</sup></div>
            <figure>
              <img class="forecast-icon" src="${icon}" alt="${
            forecast.weather[0]["description"]
          }">
              <figcaption>${forecast.weather[0]["description"]}</figcaption>
            </figure>
          `;

          forecastItem.innerHTML = forecastItemMarkup;
          forecastDiv.appendChild(forecastItem);
        }
      });

      const cityListItem = document.querySelector(`[data-name="${city.name},${city.country}"]`);
      cityListItem.parentNode.appendChild(forecastDiv);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});

document.addEventListener('DOMContentLoaded', function() {
  console.log('HTML, CSS, and JavaScript files are connected.');
});
