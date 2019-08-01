const http = require("http");
const fetch = require("node-fetch");
const url = require("url");
const fs = require("fs");

const util = require("util");

const readFilePromisified = util.promisify(fs.readFile);
const existsPromisified = util.promisify(fs.exists);

// const API_KEY = "Ar2LOa5GlS7jSyokXGx3rYr0yv857n9j"; // Emmanuel's
const API_KEY = "f1Yir8GP8jZo5oY50ubWDUaslWrjJAvF"; // Justin's
// const API_KEY = "wP5GLRzcTr7X5zzJaxiKN3poepQ5cJQm"; Justin's #2

const API_URL = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/49564?apikey=${API_KEY}&metric=true`;

let body = "<p>No weather loaded, yet.  Try again soon.</p>";
let weatherJson = {};
let jsonForecastHTML = "<p>No weather loaded, yet. BLAH  Try again soon.</p>";

fetch(API_URL)
  .then(response => response.json())
  .then(json => {
    const accuweatherServiceCode = json.Code;
    if (accuweatherServiceCode === "ServiceUnavailable") {
      // Print the Accuweather reason as to why it's unavailable
      throw new Error("Accuweater Service Unavailable: " + json.Message);
    } else {
      const dailyForecastsArray = json.DailyForecasts;

      const firstDay = dailyForecastsArray[0];

      // extract the values we need from JSON, for today (firstDay)
      const highTemperature = firstDay.Temperature.Maximum.Value;
      const lowTemperature = firstDay.Temperature.Minimum.Value;
      const epochDate = firstDay.EpochDate;
      const iconCode = firstDay.Day.Icon;

      // round the temperatures
      const highTemperatureRounded = Math.round(highTemperature);
      const lowTemperatureRounded = Math.round(lowTemperature);

      // convert epochDate number into day of week e.g. "Tuesday"
      const epochDateMilliseconds = epochDate * 1000;
      const myDate = new Date(epochDateMilliseconds);
      const dayNumber = myDate.getDay();
      let dayName;
      if (dayNumber === 0) {
        dayName = "Sunday";
      } else if (dayNumber === 1) {
        dayName = "Monday";
      } else if (dayNumber === 2) {
        dayName = "Tuesday";
      } else if (dayNumber === 3) {
        dayName = "Wednesday";
      } else if (dayNumber === 4) {
        dayName = "Thursday";
      } else if (dayNumber === 5) {
        dayName = "Friday";
      } else if (dayNumber === 6) {
        dayName = "Saturday";
      }

      // convert iconCode number into icon file name
      // e.g.  2  -> accu_2s.png
      // e.g. 16 -> accu_16s.png
      //const iconFile = 'accu_' + iconCode + 's.png';
      const iconFile = `${iconCode}.svg`;
      console.log(iconFile);

      // Method 2 of writing to DOM
      const forecastHTML = `
      <h1>${dayName}</h1>

      <img src="icons/${iconFile}" />

      <p>high: ${highTemperatureRounded} &deg;C</p>

      <p>low: ${lowTemperatureRounded} &deg;C</p>
      `;

      let forecastObject = {
        dayName: dayName,
        iconFile: iconFile,
        highTemperatureRounded: highTemperatureRounded,
        lowTemperatureRounded: lowTemperatureRounded
      };

      jsonForecastHTML = `
      <h1>${forecastObject.dayName}</h1>

      <img src="icons/${forecastObject.iconFile}" />

      <p>high: ${forecastObject.highTemperatureRounded} &deg;C</p>

      <p>low: ${forecastObject.lowTemperatureRounded} &deg;C</p>
      `;

      weatherJson = JSON.stringify(forecastObject);
      console.log(weatherJson);
      body = forecastHTML;
    }
  })
  .catch(error => {
    console.log(`An error occurred while fetching from the Accuweather API:
        ${error}`);
  });

const process_request = (request, response) => {
  const parsedUrl = url.parse(request.url);
  if (parsedUrl.pathname == "/forecast.json") {
    let content_length = weatherJson.length;
    console.log("hi");
    response.writeHead(200, {
      "Content-Length": content_length,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    }); // HTTP response header
    response.end(weatherJson); // HTTP response body
  } else if (parsedUrl.pathname === "/") {
    // Give the weather forecast HTML
    const content_length = body.length;
    response.writeHead(200, {
      "Content-Length": content_length,
      "Content-Type": "text/html"
    }); // HTTP response header
    response.end(body); // HTTP response body
  } else if (parsedUrl.pathname === "/ourDataServer") {
    // Give the weather forecast HTML
    const content_length = body.length;
    response.writeHead(200, {
      "Content-Length": content_length,
      "Content-Type": "text/html"
    }); // HTTP response header
    response.end(jsonForecastHTML); // HTTP response body
  } else {
    // Give the icon file according the the url
    const localPathname = `.${parsedUrl.pathname}`;

    // The Promise-chain approach
    existsPromisified(localPathname)
      .then(exist => {
        if (!exist) {
          // if the file is not found, return 404
          response.statusCode = 404;
          response.end(`File ${localPathname} not found!`);
          return;
        }

        return readFilePromisified(localPathname);
      })
      .then(data => {
        //console.log("data:" + data);

        // if the file is found, set Content-type and send data
        response.setHeader("Content-type", "image/svg+xml");
        response.end(data);
      })
      .catch(err => {
        response.statusCode = 500;
        response.end(`Error getting the file: ${err}.`);
      });
  }
};

const s = http.createServer(process_request);
s.listen(8080);
