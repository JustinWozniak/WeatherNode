let key = "wP5GLRzcTr7X5zzJaxiKN3poepQ5cJQm";
let weatherURL = "https://dataservice.accuweather.com/currentconditions/v1/";
let cityURL = "https://dataservice.accuweather.com/locations/v1/cities/search";

searchUrl =
  "http://dataservice.accuweather.com/forecasts/v1/daily/5day/49564?apikey=" +
  key +
  "&metric=true";

fetch(searchUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    apiArray = data.list;
  });

  const updateUI = data => {
    // Object Destructuring
    const { cityDetails, weather } = data;
  
    // Update weather details
    details.innerHTML = `
      <h3 class="card-title">${cityDetails.EnglishName}</h3>
      <div class="card-text">
          <h5>${weather.WeatherText}</h5>
          <div class="display-4 my-4">
              <span>${weather.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
          </div>
      </div>
      `;
  }