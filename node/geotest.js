// nodegeo test page
var geo = require('./geolocation')
geo.getLatLong("235 rose ct 95008", function (results) {
  console.log (results.results[0].geometry.location);
  });
