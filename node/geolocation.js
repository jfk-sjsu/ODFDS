
//var Request = require("request");
var crypto = require('crypto');
const {Client, Status} = require("@googlemaps/google-maps-services-js");

exports.getLatLong = _getLatLong;
var key = 'AIzaSyB4lvECgdIAPYiYvTioiZ360vp_TmsGPsk';
exports.getDistance = _getDistance;

function _getDistance(restaurant, customer, callback) {  //restaurant and customer are json objects {latitude: ; longitude: }
  const client = new Client({});
  console.log("Getting distance: ",restaurant, " and ",customer);
  client
    .distancematrix({
      params: {
        origins: [restaurant],
        destinations: [customer],
        units: "imperial",
        key: key
      },
      timeout: 1000, // milliseconds
    })
    .then((r) => {
      if (r.data.status === Status.OK) {
    //    console.log(r.data.results[0].geometry.location);
        callback(r.data.rows[0].elements[0].distance.value);
      } else {
        console.log("error!");
        console.log(r.data.error_message);
      }
    })
    .catch((e) => {
      console.log(e);
    });/*

  var source = new google.maps.LatLong(restaurant);
  var dest = new google.maps.LatLong(customer);

  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [source],
      destinations: [dest],
      travelMode: 'DRIVING'
    }, callback);
    */
}
function _getLatLong(address,callback) {
  const client = new Client({});

  client
    .geocode({
      params: {
        address: address,
        key: key
      },
      timeout: 1000, // milliseconds
    })
    .then((r) => {
      if (r.data.status === Status.OK) {
        console.log(r.data.results[0].geometry.location);
        callback(r.data.results[0].geometry.location);
      } else {
        console.log("error!");
        console.log(r.data.error_message);
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

function getGeoUrl(key) {
                var mykey = crypto.createDecipher('aes-128-cbc', 'e6672fe025603cde12d0c259cdde8a30908aefcf095ec285849a521b9f072f32df86cb2c307457358de8322de7b8b91d');
                var mystr = mykey.update(key, 'hex', 'utf8')
                mystr += mykey.final('utf8');
                return mystr;
}
//getLatLong("201 n. san thomas aquino rd. 95008", function (results) { console.log(results)});
