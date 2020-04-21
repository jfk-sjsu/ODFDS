//First is to connect to database

const googleMap = require('./MapApi');

/** Updates delivery end time when order is completed. */
module.exports.updateEndTime = function (orderID, endTime) {
  var sql = 'UPDATE Delivery SET endTime = ? WHERE orderID = ?;';
  var value = [endTime, orderID];
  conn.query(sql, value, function(err, result) {
    if (err) { console.log('Updating order time failed.'); }
    else { console.log('updateEndTime: successful'); }
  });
}

/** Updates driver's Notification setting to ON or OFF. */
module.exports.updateNotification = function (dID, onOff) {
  var sql = 'UPDATE Driver SET Notification = ? WHERE driverID = ?;';
  var value = [onOff, dID];
  conn.query(sql, value, function(err, result) {
    if (err) { console.log('Updating notification failed.'); }
    else { console.log('updateNotifiaction: successful'); }
  });
}

module.exports.trackRoute = function (lat, lng, end) {
  console.log("trackRoute");
  googleMap.mapClient.reverseGeocode({latlng: [lat, lng]
     }, function(err, res) {
        if (!err) {
          var address = res.json.results[0].formatted_address; // Converted address.

          var route = function (distance, duration) {
            io.sockets.emit('trackRoute', { distLeft: distance, timeLeft: duration });
          }
          // Caluclate distance/duration from driver to the destination.
          googleMap.calcRoute(address, end, route);
      }
  });
}

/**
 * Update driver's current location.
 */
module.exports.updateLocation = function(dID, lat, lng) {
  // New location info added to the Location table.
  var sql = 'INSERT into Location (Latitude, Longitude) VALUE(?, ?);';
  var value = [lat, lng];
  conn.query(sql, value, function (err, result) {
    if (err) { console.log("Inserting Failed."); }
    else {
      sql = 'UPDATE Driver SET LocationID = ? WHERE driverID = ?;';
      value = [result.insertId, dID];
      conn.query(sql, value, function (err, res) {
        if (err) { console.log("Updating failed"); }
        else { console.log("Driver's location is updated."); }
      });
    }
  });
}