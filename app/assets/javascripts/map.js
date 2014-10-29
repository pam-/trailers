var map;
var geocoder;
var mapId = 'pam-.jmeb29bh';
var searchButton = $('button');
var searchBox = $('input');

function mapGen(){

	$('#map').show()
	L.mapbox.accessToken = 'pk.eyJ1IjoicGFtLSIsImEiOiJNT09NSzgwIn0.AWl1AY_kO1HMnFHwxb9mww';
	geocoder = L.mapbox.geocoder('mapbox.places-v1');
	map = L.mapbox.map('map', mapId);
	console.log(geocoder)
	searchButton.on('click', function(){
		var zip = searchBox.val();
		var url = 'http://www.fandango.com/rss/moviesnearme_' + zip + '.rss';
		var parsedUrl = document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(url);
		zoom(zip)

		$.ajax({
			type: 'GET',
			url: parsedUrl,
			dataType: 'json',
    	success: function (xml){
		  	values = xml.responseData.feed.entries;
		  	findCoordinates(values)
      },
    	error: function(){console.log('merde')}
		  });

		searchBox.value = '';
	});
}

function zoom(zip){
	geocoder.query(zip, showMap);

	function showMap(err, data){
		if (data.lbounds) {
			map.fitBounds(data.lbounds);
		} else if (data.latlng) {
			map.setView([data.latlng[0], data.latlng[1]], 15)
		}
	}
}

function findCoordinates(values){
  for (var i = 0; i <= 8; i++) {
  	theater = values[i];
  	var addressArray = theater.content.split('</p>')[0].split('<p>')[1]
  	var address = addressArray.split(' ').join('+')

  	var url = 'http://api.tiles.mapbox.com/v3/' + mapId + '/geocode/' + address + '.json'
  	$.ajax({
  		type: 'GET',
  		url: url,
  		dataType: 'json',
  		success: function(result){
  			console.log(result.results[0][0].lon)
  		}
  	})
  };
}