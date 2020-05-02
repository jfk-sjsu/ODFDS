
var Request = require("request");
var crypto = require('crypto');

exports.getLatLong = _getLatLong;

function _getDistance(rest, cust, callback) {
  var origin;
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
  {
    origins: [origin1, origin2],
    destinations: [destinationA, destinationB],
    travelMode: 'DRIVING',
    transitOptions: TransitOptions,
    drivingOptions: DrivingOptions,
    unitSystem: UnitSystem,
    avoidHighways: Boolean,
    avoidTolls: Boolean,
  }, callback);

function callback(response, status) {
  // See Parsing the Results for
  // the basics of a callback function.
}
}
function _getLatLong(address,callback) {
        var localAddress = address.split(" ").join("+");
        var key = 'AIzaSyB4lvECgdIAPYiYvTioiZ360vp_TmsGPsk'

        var url = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + key + '&address=' + localAddress;
        var jsResult= "";
                Request.get(url, (error, response, body) => {
                        if(error) {
                          console.log("geo error", error.message);
                          callback({latitude:0.0,longitude:0.0})
                        }
                        jsResult = eval("(" + body + ")");
                        var lat = jsResult.results[0].geometry.location.lat;
                        var longit = jsResult.results[0].geometry.location.lng;
//                      console.log("latitude: " + lat + " longitude: " + longit);
                        callback({latitude: lat, longitude: longit});
                });
}

function getGeoUrl(key) {
                var mykey = crypto.createDecipher('aes-128-cbc', 'e6672fe025603cde12d0c259cdde8a30908aefcf095ec285849a521b9f072f32df86cb2c307457358de8322de7b8b91d');
                var mystr = mykey.update(key, 'hex', 'utf8')
                mystr += mykey.final('utf8');
                return mystr;
}
//getLatLong("201 n. san thomas aquino rd. 95008", function (results) { console.log(results)});
