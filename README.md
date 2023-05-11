# Weather App

A simple weather app that allows users to search for the current weather and a 5-day forecast of a city. The app uses the OpenWeatherMap API to fetch the weather data.

## Features
Search for a city and get the current weather
Displays a 5-day weather forecast for the searched city
Shows an error message if the city is not found or invalid

## Prerequisites
To use this app, you will need to obtain an API key from OpenWeatherMap. Please visit https://openweathermap.org/appid to create an account and get your API key.

## Setup
1. Clone this repository or download the files.
2. Replace YOUR API KEY HERE in the apiKey variable with your personal OpenWeatherMap API key:
`const apiKey = "YOUR API KEY HERE";`
3. Open `index.html` in your web browser to start using the app.

## Usage
Enter the name of a city in the search input field and press Enter or click the search button.
The current weather for the searched city will be displayed, along with a 5-day weather forecast.
If the city is not found or invalid, an error message will be shown.

## Notes
The app is built using vanilla JavaScript and does not rely on any external libraries or frameworks.
