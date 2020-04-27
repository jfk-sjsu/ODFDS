var watchId;
function getPosition(htmlLat, htmlLong, err)
{


	if(navigator.geolocation)
	{
	  navigator.geolocation.getCurrentPosition(	function (position)
		{
 
			var lat = position.coords.latitude;
			var longit = position.coords.longitude;
			var inLat = document.getElementById(htmlLat); 
			var inLong = document.getElementById(htmlLong); 
			inLat.value = lat; 
			inLong.value = longit;
			

		});
	  
	}
	else
	  document.getElementById(err).innerHTML = "Your browser does not support Geolocation";

}

function watchPosition()
{
	if(navigator.geolocation)
	{
	  watchId = navigator.geolocation.watchPosition(successPosition, failurePosition,
													{enableHighAccuracy: false,
													timeout: 5000,
													maximumAge: 5000,
													});
	}
	else
	  document.getElemetById("result").innerHTML = "Your browser does not support Geolocation"
}
function failurePosition(error)
{
	alert("Error Code: " +error.code + " Error Message: " + error.message);
}
function stopWatching()
{
	clearWatch(watchId);
}
function getLatLong(address)
{
	//var localAddress = encodeURIComponent(address.trim());
	var localAddress = address.split(" ").join("+");
	var xmlhttpAddr = new XMLHttpRequest();
	//Get API key for Google Maps Geocoding API and use it in the place of YOUR-KEY
	var ckey = 'e6672fe025603cde12d0c259cdde8a30908aefcf095ec285849a521b9f072f32df86cb2c307457358de8322de7b8b91d'
	
	var url = getGeoUrl("35673902695f38e33481d2815f831d6341831b0bfd7fa1ca9ebde6236ee2213ad44c0facc847272157c3b8e7fb36ee9b1bfabed46a16cdbdf2306c695b1a32c52355cdf164a73b457414176cd152c56cedd2f96d141521b935ffe8b01e2df0d53acd401cb9f570b421f70f585abed68e") + localaddress;
	console.log(url); 
	xmlhttpAddr.open("GET", url, false);
	xmlhttpAddr.send();
	if (xmlhttpAddr.readyState == 4 && xmlhttpAddr.status == 200)
	{
		var result = xmlhttpAddr.responseText;
		var jsResult = eval("(" + result + ")");
		var lat = jsResult.results[0].geometry.location.lat;
		var longit = jsResult.results[0].geometry.location.lng;
		return {latitude:lat, longitude:longit};
	} else 
	{
		return {latitude:37.00, longitude:-128.00};
		
	}
}
function getGeoUrl(address) { 
	var mykey = crypto.createDecipher('aes-128-cbc', 'e6672fe025603cde12d0c259cdde8a30908aefcf095ec285849a521b9f072f32df86cb2c307457358de8322de7b8b91d');
	var mystr = mykey.update(key, 'hex', 'utf8')
	mystr += mykey.final('utf8');
	return mystr; 
} 

