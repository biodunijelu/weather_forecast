// script.js

$(document).ready(function() {
    // Function to fetch weather data based on city name
    function fetchWeatherData(city) {
      const apiKey = 'YOUR_API_KEY';
      const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
      const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  
      // Make API request for current weather
      $.ajax({
        url: weatherApiUrl,
        method: 'GET',
        data: {
          q: city,
          appid: apiKey,
          units: 'metric', // Use metric units for Celsius
        },
        success: function(currentData) {
          // Make API request for 5-day forecast
          $.ajax({
            url: forecastApiUrl,
            method: 'GET',
            data: {
              q: city,
              appid: apiKey,
              units: 'metric',
            },
            success: function(forecastData) {
              // Update the UI with both current and forecast data
              updateUI(currentData, forecastData);
            },
            error: function(error) {
              console.error('Error fetching forecast data:', error);
            },
          });
        },
        error: function(error) {
          console.error('Error fetching current weather data:', error);
        },
      });
    }


});