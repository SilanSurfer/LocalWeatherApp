var weatherIconToImageDict = {
  "clear-day" : "https://image.flaticon.com/icons/svg/136/136581.svg",
  "clear-night" : "https://image.flaticon.com/icons/svg/414/414891.svg",
  "rain" : "https://image.flaticon.com/icons/svg/131/131041.svg",
  "snow" : "https://image.flaticon.com/icons/svg/110/110315.svg",
  "sleet" : "https://image.flaticon.com/icons/svg/1/1756.svg",
  "wind" : "https://image.flaticon.com/icons/svg/439/439471.svg",
  "fog" : "https://image.flaticon.com/icons/svg/182/182264.svg",
  "cloudy" : "https://image.flaticon.com/icons/svg/131/131043.svg",
  "partly-cloudy-day" : "https://image.flaticon.com/icons/svg/474/474807.svg",
  "partly-cloudy-night" : "https://image.flaticon.com/icons/svg/15/15781.svg"
};

function setButtonText(units) {
  if (units === "si") {
    document.getElementById("tempUnitButton").innerText = "°C";
  }
  else if(units === "us") {
    document.getElementById("tempUnitButton").innerText = "F";
  }
}

function changeTempUnits() {
  if (document.getElementById("tempUnitButton").innerText === "F") {
    getLocation("eng", "si");
  }
  else {
    getLocation("eng", "us");
  }
}

function setBackgroundImage(weatherType) {
    var weatherImageUrl = weatherIconToImageDict[weatherType];
    document.getElementById("weather_icon").setAttribute("src", weatherImageUrl);
}

function getAddressFromResponse(json) {
  return json.results[0].formatted_address;
}

function getAddressFromPosition(latitude, longitude, lang = "en") {
  $.ajax({
    url : "https://maps.googleapis.com/maps/api/geocode/json?",
    data : {
      latlng : latitude + "," + longitude,
      key : "AIzaSyCJLV016miHea8D-San-3o_n5y2d0KculI",
      language : lang
    },
    success : function(json) {
      document.getElementById("address").innerHTML = getAddressFromResponse(json);
    },
    error : function(status) {
      document.getElementById("address").innerHTML = "Couldn't get location!";
      console.log(status);
    }
  });
}

function getAndInsertWeatherData(json) {
  document.getElementById("summary").innerHTML = json.currently.summary;
  document.getElementById("current_temp").innerHTML = json.currently.temperature;
}

function getWeatherForecast(latitude, longitude, units = "us", lang = "en") {
  if(units !== "us" && units !== "si") {
    units = "us";
  }
  if (lang !== "en" && lang !== "pl") {
    lang = "en";
  }
  var requestedUnits = "units=" + units;
  var language = "lang=" + lang;
  var key = "e927a55a30254634ab211512c50acda7";
  var exclude = "exclude=minutely,hourly,daily,alerts";
  $.get("https://api.darksky.net/forecast/" + 
          key + "/" + 
          latitude + "," + longitude + 
          "?" + exclude +
          "&" + requestedUnits +
          "&" + language,
    function(data) {
      getAndInsertWeatherData(data);
      setBackgroundImage(data.currently.icon);
    },
    "jsonp");
}

function getLocation(lang = "eng", units = "us") {
  setButtonText(units);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      getAddressFromPosition(latitude, longitude, lang);
      getWeatherForecast(latitude, longitude, units, lang);
    });
  }
  else {
    console.log("Couldn't get geolocation");
  }
}
$(document).ready(function () {
  getLocation("eng", "us");
});
