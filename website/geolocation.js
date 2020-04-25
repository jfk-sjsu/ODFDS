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
	var key = 'AIzaSyDBs8vukxkmG8h2ymdTrmQwIxnr9qCHGIo'
	var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + localAddress + "&key=" + key;
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