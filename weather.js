let key = "wP5GLRzcTr7X5zzJaxiKN3poepQ5cJQm";
let weatherURL = "https://dataservice.accuweather.com/currentconditions/v1/";
let cityURL = "https://dataservice.accuweather.com/locations/v1/cities/search";

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

    const fiveDayArray = [];
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

      fiveDayArray.push(daySummary);
    }

    // for each day, render to html
    const fiveDayContainer = document.getElementById("five_day_container");
    for (const dayCardData of fiveDayArray) {
      const dayName = dayCardData.dayName;
      const daytimeIconCode = dayCardData.dayIconCode;
      const nighttimeIconCode = dayCardData.nightIconCode;
      const highTemp = dayCardData.highTemp;
      const lowTemp = dayCardData.lowTemp;



      //choses the day/night icon name, then concats it with.svg.
      let timeOfDay = "";
      let date = new Date().getHours();
      if (date > 12) {
        timeOfDay = nighttimeIconCode;
      } else {
        timeOfDay = daytimeIconCode;
      }

      let iconCodeString = String(timeOfDay).padStart(2, "0");
      finalIconString = `${iconCodeString}.svg`;
      console.log(finalIconString);
      console.log(date);
      console.log(timeOfDay);

      const dayCardHTML = `<div class="day_card">
                <h2>${dayName}</h2>

                <img class="weather_icon" src="icons/${finalIconString}" />

                <p>hi: ${highTemp}°C</p>
                <p>lo: ${lowTemp}°C</p>
            </div>`;

      fiveDayContainer.innerHTML += dayCardHTML;
    }
  });
