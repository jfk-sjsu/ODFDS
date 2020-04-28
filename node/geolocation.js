
var Request = require("request");
var crypto = require('crypto');

exports.getLatLong = _getLatLong; 

function _getLatLong(address,callback) {
        var localAddress = address.split(" ").join("+");
        var ckey = 'e6672fe025603cde12d0c259cdde8a30908aefcf095ec285849a521b9f072f32df86cb2c307457358de8322de7b8b91d'

        var url = getGeoUrl("2bc21ad8cb559eee0baf32fa14bbdd2591c18186043397967b2e45dd29734f95a24388b9ec7b74e431ae0d7ff217d151a51808cc8c7fcb2b54f7ebf5c25a6adac4b367b6467f2e73a45b0085464ff30ad4249592702f1575bed253b2e9129d677377442ad2240f606a0c5031cceccbf7") + localAddress;
        var jsResult= "";
                Request.get(url, (error, response, body) => {
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



