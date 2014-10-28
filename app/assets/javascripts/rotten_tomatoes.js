function getMovies() {
	console.log('tomato')

	$.ajax({
		type: 'GET',
		url: 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?page_limit=16&page=1&country=us&apikey=gp8x4h757ztubg36gu2vdxh8',
		dataType: 'jsonp',
		success: function(result){
			var movies = result.movies
			console.log(movies)
			displayMovies(movies)
		}
	})
}

function displayMovies(movies){
	var posters = '';
	var trailers = ''
	for(var i = 0; i < movies.length; i++){

		var title = movies[i].title;
		var thumbnail = movies[i].posters.original;
		var poster = thumbnail.replace(/tmb/, "320");
		posters += '<div><img data-title="' + title + '" src="' + poster + '"></div>';
	}
	$('aside').html(posters)
	$('img').on('click', function(){
		movieTitle = $(this).data('title');
		youtubeUrl = 'http://gdata.youtube.com/feeds/api/videos?v=2&alt=json&max-results=1&q=%20' +movieTitle + '%20trailer&format=5&prettyprint=true';
		

		$.ajax({
			type: 'GET',
			url: youtubeUrl,
			dataType: 'jsonp',
			success: function(results) {
				videoLink = results.feed.entry[0].content.src
				
				console.log('in the success')
				console.log(videoLink)
				trailer = '<embed type="application/x-shockwave-flash" src="' + videoLink + '">'
				$('.trailer').html(trailer);
			}		
		})
	})
}

$(document).ready(getMovies)