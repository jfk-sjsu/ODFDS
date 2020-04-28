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
