
  let key = "wP5GLRzcTr7X5zzJaxiKN3poepQ5cJQm";
  let weatherURL = "https://dataservice.accuweather.com/currentconditions/v1/";
  let cityURL =
    "https://dataservice.accuweather.com/locations/v1/cities/search";

  searchUrl =
    "http://dataservice.accuweather.com/forecasts/v1/daily/5day/49564?apikey=" +
    key +
    "&metric=true";

  fetch(searchUrl)
    .then(function(responce) {
      return responce.json();
    })
    .then(function(json) {
      const dailyForecastsArray = json.DailyForecasts;

      const daySummaryArray = [];
      for (const day of dailyForecastsArray) {
        const epochDate = day.EpochDate;
        const dayIconCode = day.Day.Icon;
        const dayIconPhrase = day.Day.IconPhrase;
        const nightIconCode = day.Night.Icon;
        const nightIconPhrase = day.Night.IconPhrase;
        const highTemp = day.Temperature.Maximum.Value;
        const lowTemp = day.Temperature.Minimum.Value;

        const daySummary = {
          epochDate,
          dayIconCode,
          dayIconPhrase,
          nightIconCode,
          nightIconPhrase,
          highTemp,
          lowTemp
        };
        console.log(daySummary);

        daySummaryArray.push(daySummary);
      }
      return daySummaryArray;
    });

const fiveDayContainer = document.getElementById("five_day_container2");

