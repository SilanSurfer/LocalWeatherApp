function printPosition(latitude, longitude) {
  document.getElementById("latitude").innerHTML = "Latitude: " + latitude;
  document.getElementById("longitude").innerHTML = "Longitude: " + longitude;
}

function reverseGeocoding(latitude, longitude) {
  $.ajax({
    url : "https://maps.googleapis.com/maps/api/geocode/json?",
    data : {
      latlng : latitude + "," + longitude,
      key : "AIzaSyCJLV016miHea8D-San-3o_n5y2d0KculI"
    },
    success : function(json) {
      console.log(JSON.stringify(json));
    },
    error : function(status) {
      console.log(status);
    }
  });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      printPosition(latitude, longitude);
      reverseGeocoding(latitude, longitude);
    });
  }
  else {
    console.log("Couldn't get geolocation");
  }
}
