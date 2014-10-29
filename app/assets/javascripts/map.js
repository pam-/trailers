var map;
// var geocoder;
// var markerGen;
var mapId = 'pam-.jmeb29bh';
var searchButton = $('button');
var searchBox = $('input');

function mapGen(){

	$('#map').show();
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
		  	// findCoordinates(values);
		  	console.log(values)
      },
    	error: function(){
    		console.log('something is broken')
    	}
		});

		searchBox.val('');
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
  	var theater_name = theater.title;
  	var addressArray = theater.content.split('</p>')[0].split('<p>')[1];
  	var address = addressArray.split(' ').join('+');

  	var url = 'http://api.tiles.mapbox.com/v3/' + mapId + '/geocode/' + address + '.json';
  	$.ajax({
  		type: 'GET',
  		url: url,
  		dataType: 'json',
  		success: function(result){
  			console.log(result.results[0][0].lon)
  			var lng = result.results[0][0].lon
  			var lat = result.results[0][0].lat
  			markerGen(lat, lng, theater_name)
  		}
  	})
  };
}

function markerGen(lat, lng, theater_name) {
	myLayer = L.mapbox.featureLayer().addTo(map);
	var geojson = {
		type: 'FeatureCollection',
		features: [{
			type: 'Feature',
			properties: {
				title: theater_name,
				'marker-color': 'orange',
				'marker-size': 'large',
			},
			geometry: {
				type: 'Point',
				coordinates: [lat, lng]
			}
		}]
	}

	myLayer.setGeoJSON(geojson);

	myLayer.on('mouseover', function(event){
		var marker = event.layer;
		feature = marker.feature;
		popupContent = feature.theater_name;
			event.layer.openPopup(popupContent);
	});
	myLayer.on('mouseout', function(event){
		event.layer.closePopup();
	});

	myLayer.on('click', function(event){
		console.log('clicked on marker');
	})
}