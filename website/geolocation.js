var watchId;
function getPosition(htmlLat, htmlLong, err)
{
	function success (position)
	{

		var lat = position.coords.latitude;
		var longit = position.coords.longitude;
		var inLat = document.getElementById(htmlLat);
		var inLong = document.getElementById(htmlLong);
		inLat.value = lat;
		inLong.value = longit;
		document.getElementById(err).innerHTML = "lat: " + lat + " long: " + longit;

	}
	function error(errm) {
		document.getElementById(err).innerHTML = "error!" + errm.message;
	}

	if(navigator.geolocation)
	{
	  document.getElementById(err).innerHTML = "geolocation enabled";
	  navigator.geolocation.getCurrentPosition(success, error,{enableHighAccuracy: false,
													timeout: 5000,
													maximumAge: 5000,
													});
	}
	else
	  document.getElementById(err).innerHTML = "Your browser does not support Geolocation";

}

function watchPosition(successPosition, failurePosition)
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

function stopWatching()
{
	clearWatch(watchId);
}
