var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyA1uaPWn7851oKj8qouSiO64mMb1PovYXQ',
});
var inOneHour = Math.round((new Date().getTime() + (60 * 60 * 1000))/1000);

/**
 * Calculate distance and estimated time
 * from location A to B using Google Map API.
 */

module.exports.travel = function (start, end, callback) {
    
  googleMapsClient.directions({
      origin: start,
      destination: end,
      departure_time: inOneHour,
      mode: 'driving',
      traffic_model: 'best_guess'
    }, function(err, results) {
        if (err) {
          console.log("Failed to calculate distance for driver..");
        } else {
          var distance = results.json.routes[0].legs[0].distance.text;
          var duration = results.json.routes[0].legs[0].duration.text;

          var distInFt = distance.split(' ');
          if (distInFt[1] == 'ft') {
             distance = (distInFt[0] * 0.000189394).toFixed(5) + ' mi';
          }
          callback(distance, duration);
        }
    });
}

/**
 * Geocode an address into lat/lng usign Google Map API.
 */

module.exports.geoCode = function (addr, callback) {

  googleMapsClient.geocode({address: addr}, function(err, response) {
    if (err) {
       console.log("geolocation failed...");
    } else {
       const lat = response.json.results[0].geometry.location.lat;
       const lng = response.json.results[0].geometry.location.lng;
       callback(lat, lng);
     }
  });
}

module.exports.mapClient = googleMapsClient;