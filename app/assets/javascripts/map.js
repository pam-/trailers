var map;
var searchButton = document.getElementsByTagName('button')[0];
var searchBox = document.getElementsByTagName('input')[0];

function mapGen(){
	L.mapbox.accessToken = 'pk.eyJ1IjoicGFtLSIsImEiOiJNT09NSzgwIn0.AWl1AY_kO1HMnFHwxb9mww';
	L.mapbox.map('map', 'pam-.jmeb29bh');
	console.log('here')

	// put input box where user can look for movie
	searchButton.addEventListener('click', function(){
		console.log('button has been clicked')
		zip = searchBox.value
		console.log('value:', zip)

	url = 'http://www.fandango.com/rss/moviesnearme_' + zip + '.rss';
		$.ajax({
			type: 'GET',
			url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(url),
			dataType: 'json',
			crossDomain: true,
    	success: function (xml){
		  	values = xml.responseData.feed.entries;

        for (var i = 0; i <= 8; i++) {
        	theater = values[i]
        	var paragraph = theater.content.split('</p>')[0].split('<p>')[1]
        	$('#output').append(paragraph + '' + theater.title)
        };
      },
    	error: function(){console.log('merde')}
		  });

		searchBox.value = '';
	});
	// check fandango api to see if the movie is actually playing
	// get theaters depending on fandango results and make markers
	// click on marker and get 

}

// window.onload = mapGen;