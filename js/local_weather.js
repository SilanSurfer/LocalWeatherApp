var weatherIconToImageDict = {
  "clear-day" : "../assets/clear-day.jpg",
  "clear-night" : "../assets/clear-sky-night.jpg",
  "rain" : "../assets/rain.jpg",
  "snow" : "../assets/snow.jpg",
  "sleet" : "../assets/sleet.jpg",
  "wind" : "../assets/wind.jpg",
  "fog" : "../assets/fog.jpg",
  "cloudy" : "../assets/cloudy.jpg",
  "partly-cloudy-day" : "../assets/partly-cloudy-day.jpg",
  "partly-cloudy-night" : "../assets/partly-cloudy-night.jpg"
};

function setBackgroundImage(weatherType) {
    var weatherImageUrl = "url(" + weatherIconToImageDict[weatherType] + ")";
    $('body').css('background-image', weatherImageUrl);
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
  //document.getElementById("icon").innerHTML = json.currently.icon;
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
      console.log(JSON.stringify(data));
      getAndInsertWeatherData(data);
      setBackgroundImage(data.currently.icon);
    },
    "jsonp");
}

function getLocation(lang = "eng") {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      getAddressFromPosition(latitude, longitude, lang);
      getWeatherForecast(latitude, longitude, "si", lang);
    });
  }
  else {
    console.log("Couldn't get geolocation");
  }
}

$(document).ready(function () {
  getLocation();
});
