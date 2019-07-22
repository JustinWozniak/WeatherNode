function choseDayName(dayName) {
  const date2 = new Date(dayName * 1000);
  const dayOfWeek_Number = date2.getDay();
  // console.log(dayOfWeek_Number);

  const dayOfWeekNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let finalDayName = dayOfWeekNames[dayOfWeek_Number];
  // console.log(finalDayName);
  return finalDayName;
}

function pickGifImage() {
  let gifPhrase = "";
  // timeOfDay = 26;
  console.log(timeOfDay);
  switch (timeOfDay) {
    case 1:
    case 3:
    case 5:
    case 33:
      gifPhrase = 1; //sunny
      break;
    case 6:
    case 7:
    case 12:
    case 13:
    case 14:
    case 18:
      gifPhrase = 10; //rain
      break;
    case 8:
    case 30:
    case 37:
      gifPhrase = 5; //dreary
      break;
    case 2:
    case 4:
    case 16:
    case 34:
    case 35:
    case 36:
    case 38:
    case 39:
    case 40:
      gifPhrase = 6; //cloudy
      break;
    case 16:
    case 34:
    case 35:
    case 36:
    case 38:
    case 39:
    case 40:
      gifPhrase = 10; //rain
      break;
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
    case 29:
    case 44:
      gifPhrase = 60; //snow
      break;
    case 15:
    case 16:
    case 17:
    case 18:
    case 39:
    case 40:
    case 41:
    case 42:
      console.log(timeOfDay);
      gifPhrase = 70; //thunder/lightning
      break;
    default:
      gifPhrase = 99;
  }
  //choses the gif name, then concats it with.gif.

  // console.log(gifPhrase);

  finalGifString = `${gifPhrase}.gif`;
  // console.log(finalGifString);
  return finalGifString;
}

function choseTimeOfPhrase(daytimeWeatherPhrase, daytimeWeatherPhrase) {
  //choses the day/night icon name, then concats it with.svg.
  let TimeOfPhrase = "";
  let date = new Date().getHours();
  if (date < 18) {
    TimeOfPhrase = daytimeWeatherPhrase;
    document.body.style.backgroundImage = "url('images/day.jpg')";
  } else {
    document.body.style.backgroundImage = "url('images/night.jpg')";
    TimeOfPhrase = daytimeWeatherPhrase;
  }
  let iconCodeString = String(timeOfDay).padStart(2, "0");
  finalIconString = `${iconCodeString}.svg`;
  // console.log(finalIconString);
  // console.log(date);
  console.log(timeOfDay);
  return TimeOfPhrase;
}

function choseDayOrNightIcion(nighttimeIconCode) {
  //choses the day/night icon name, then concats it with.svg.
  let timeOfDay = "";
  // let TimeOfPhrase = "";
  let date = new Date().getHours();
  if (date > 12) {
    timeOfDay = nighttimeIconCode;
    // TimeOfPhrase = nighttimeWeatherPhrase;
  } else {
    timeOfDay = daytimeIconCode;
    // TimeOfPhrase = daytimeWeatherPhrase;
  }

  let iconCodeString = String(timeOfDay).padStart(2, "0");
  finalIconString = `${iconCodeString}.svg`;
  // console.log(finalIconString);
  // console.log(date);
  // console.log(timeOfDay);
  return timeOfDay;
}

{
  /* <--------------------------------------------functions end here---------------------------------------------> */
}

let key1 = "wP5GLRzcTr7X5zzJaxiKN3poepQ5cJQm";
let key2 = "f1Yir8GP8jZo5oY50ubWDUaslWrjJAvF";
let key3 = "p5eumBP6yILniKSREfzT6jWTKG9IBopF";
let weatherURL = "https://dataservice.accuweather.com/currentconditions/v1/";
let cityURL = "https://dataservice.accuweather.com/locations/v1/cities/search";

searchUrl =
  "http://dataservice.accuweather.com/forecasts/v1/daily/5day/49564?apikey=" +
  key2 +
  "&details=true&metric=true";

fetch(searchUrl)
  .then(function(responce) {
    return responce.json();
  })
  .then(function(json) {
    const dailyForecastsArray = json.DailyForecasts;
    console.log(dailyForecastsArray);
    const fiveDayArray = [];
    for (const day of dailyForecastsArray) {
      const epochDate = day.EpochDate;
      const dayIconCode = day.Day.Icon;
      const dayIconPhrase = day.Day.IconPhrase;
      const nightIconCode = day.Night.Icon;
      const nightIconPhrase = day.Night.IconPhrase;
      const highTemp = day.Temperature.Maximum.Value;
      const lowTemp = day.Temperature.Minimum.Value;
      const realFeelHigh = day.RealFeelTemperature.Maximum.Value;
      const sunRise = day.Sun.Rise;
      const sunSet = day.Sun.Set;
      const longPhrase = day.Day.LongPhrase;
      const chanceOfRain = day.Day.PrecipitationProbability;
      const amountOfRain = day.Day.Rain.Value;
      const airQuality = day.AirAndPollen[0].Category
      const uvIndex = day.AirAndPollen[5].Category;
      const hoursOfSun = day.HoursOfSun;
      console.log(hoursOfSun);

      const daySummary = {
        epochDate,
        dayIconCode,
        dayIconPhrase,
        nightIconCode,
        nightIconPhrase,
        highTemp,
        lowTemp,
        realFeelHigh,
        sunRise,
        sunSet,
        longPhrase,
        chanceOfRain,
        airQuality,
        amountOfRain,
        uvIndex,
        hoursOfSun,
        
      };
      // console.log(daySummary);

      fiveDayArray.push(daySummary);
    }

    // for each day, render to html
    const fiveDayContainer = document.getElementById("five_day_container");
    for (const dayCardData of fiveDayArray) {
      const dayName = dayCardData.epochDate;
      const daytimeIconCode = dayCardData.dayIconCode;
      const daytimeWeatherPhrase = dayCardData.dayIconPhrase;
      const nighttimeWeatherPhrase = dayCardData.nightIconPhrase;
      const nighttimeIconCode = dayCardData.nightIconCode;
      const highTemp = Math.round(dayCardData.highTemp);
      const realFeelHighTemp = Math.round(dayCardData.realFeelHigh);
      const lowTemp = Math.round(dayCardData.lowTemp);
      let sunRiseTime = dayCardData.sunRise;
      const shortHandRiseTime = sunRiseTime.split("T0");
      let sunSetTime = dayCardData.sunSet;
      const shortHandSetTime = sunSetTime.split("T");
      console.log(shortHandSetTime);
      sunRiseTime = shortHandRiseTime[1];
      sunSetTime = shortHandSetTime[1];
      let longPhrase = dayCardData.longPhrase;
      let chanceOfRain = dayCardData.chanceOfRain;
      const airQuality = dayCardData.airQuality;
      const amountOfRain = dayCardData.amountOfRain;
      const uvIndex = dayCardData.uvIndex;
      const hoursOfSun = dayCardData.hoursOfSun;

      timeOfDay = choseDayOrNightIcion(daytimeIconCode, nighttimeIconCode);

      TimeOfPhrase = choseTimeOfPhrase(
        daytimeWeatherPhrase,
        nighttimeWeatherPhrase
      );

      finalGifString = pickGifImage();

      finalDayName = choseDayName(dayName);

      const dayCardHTML = `<div class="day_card">
                <h1>${finalDayName}</h1>
                <img class="weather_icon" src="icons/${finalIconString}" />
                <h2>${longPhrase} </h2>
                <h2>${TimeOfPhrase} </h2>
                <h3>High: ${highTemp}°C</h3>
                <h5>Really feels like: ${realFeelHighTemp}</h5>
                <h3>low: ${lowTemp}°C</h3>
                <h3 class="rainText">Chance of Rain ${chanceOfRain}%   Expecting ${amountOfRain}mm today </h3>
                <img src="gifs/${finalGifString}" class='gifs' />
                <h3>Air Quality Today: ${airQuality}</h3>
                <h3>UVIndex: ${uvIndex}</h3>
                <h3 class="sunlightBlue">Hours of Sunlight today: ${hoursOfSun}</h3>
                <h3>Sunrise: ${sunRiseTime}</h3>
                <h3>Sunset: ${sunSetTime}</h3>
                <hr />
            </div>`;

      fiveDayContainer.innerHTML += dayCardHTML;
    }
  });
