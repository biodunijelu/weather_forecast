// script.js

$(document).ready(function() {
    // Function to fetch weather data based on city name
    function fetchWeatherData(city) {
      const apiKey = '4b1b9458d2a70de78cccfab1ee47d0bd';
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
  
    // Function to update the UI with weather data
    function updateUI(currentData, forecastData) {
      const todaySection = $('#today');
      const forecastSection = $('#forecast');
  
      // Clear previous data
      todaySection.empty();
      forecastSection.empty();
  
      // Update current weather UI
      todaySection.html(`
        <h2>${currentData.name}</h2>
        <p>Date: ${dayjs().format('MMMM D, YYYY')}</p>
        <p>Temperature: ${currentData.main.temp.toFixed(2)}°C</p>
        <p>Humidity: ${currentData.main.humidity}%</p>
        <p>Wind Speed: ${currentData.wind.speed} m/s</p>
      `);
  
      // Update forecast UI
      for (let i = 0; i < forecastData.list.length; i += 8) {
        const forecastItem = forecastData.list[i];
        forecastSection.append(`
          <div class="col-md-2">
            <p>Date: ${dayjs(forecastItem.dt_txt).format('MMMM D, YYYY')}</p>
            <p>Temperature: ${forecastItem.main.temp.toFixed(2)}°C</p>
            <p>Humidity: ${forecastItem.main.humidity}%</p>
          </div>
        `);
      }
    }
  
    // Function to add a searched city to the history
    function addToHistory(city) {
      const historyList = $('#history');
  
      // Append the city to the history list
      historyList.prepend(`<button type="button" class="list-group-item">${city}</button>`);
    }
  
    // Event listener for the search form
    $('#search-form').submit(function(event) {
      event.preventDefault();
      const searchTerm = $('#search-input').val();
  
      if (searchTerm) {
        // Fetch weather data for the entered city
        fetchWeatherData(searchTerm);
  
        // Add the searched city to the history
        addToHistory(searchTerm);
      }
    });
  
    // Event listener for the history list
    $('#history').on('click', '.list-group-item', function() {
      const selectedCity = $(this).text();
      // Fetch weather data for the selected city
      fetchWeatherData(selectedCity);
    });
  });
  