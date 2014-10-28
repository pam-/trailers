function getMovies() {
	console.log('tomato')
	var url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?page_limit=16&page=1&country=us&apikey=gp8x4h757ztubg36gu2vdxh8';

	$.ajax({
		type: 'GET',
		url: url,
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

	for(var i = 0; i < movies.length; i++){
		var title = movies[i].title;
		var thumbnail = movies[i].posters.original;
		var id = movies[i].id;
		var poster = thumbnail.replace(/tmb/, "320");

		posters += '<div data-title="' + title + '" data-id="' + id + '"><img src="' + poster + '"> <button class="watch-trailer"> Watch Trailer</button> <button class="save-movie">save</button> </div>';
	}

	$('aside').html(posters);

	$('.watch-trailer').on('click', function(){
		movieTitle = $(this).parent().data('title');
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

	$('.save-movie').on('click', function(){
		console.log('about to save', $(this).parent().data('title'))
		var id = $(this).parent().data('id');
		var detailUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movies/' + id + '.json?apikey=gp8x4h757ztubg36gu2vdxh8';

		$.ajax({
			type: 'GET',
			url: detailUrl,
			dataType: 'jsonp',
			success: function(result){
				$.ajax({
					type: 'POST',
					url: '/movies',
					data: { movie: {
						name: result.title,
						release_date: result.release_dates.theater,
						synopsis: result.synopsis
					}},
					success: function(){
						console.log('done!')
					}
				})
			}
		})
	})
}

$(document).ready(getMovies)