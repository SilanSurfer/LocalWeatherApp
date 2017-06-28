function printPosition(latitude, longitude) {
  document.getElementById("latitude").innerHTML = "Latitude: " + latitude;
  document.getElementById("longitude").innerHTML = "Longitude: " + longitude;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      printPosition(position.coords.latitude, position.coords.longitude);
    });
  }
  else {
    console.log("Couldn't get geolocation");
  }
}
