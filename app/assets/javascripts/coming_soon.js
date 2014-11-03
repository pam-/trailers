function comingSoon(){
	$('.user-show').hide();
	$('#index').show();	
	var url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?page_limit=16&page=1&country=us&apikey=gp8x4h757ztubg36gu2vdxh8';
	getMovies(url, 'save', 'save');
}

function getMovies(url, buttonValue, buttonClass){
	$.ajax({
		type: 'GET',
		url: url,
		dataType: 'jsonp',
		success: function(result){
			var movies = result.movies
			displayMovies(movies, buttonValue, buttonClass)
		}
	})
}

function displayMovies(movies, buttonValue, buttonClass){
	var posters = '';

	for(var i = 0; i < movies.length; i++){
		var title = movies[i].title;
		var thumbnail = movies[i].posters.original;
		var id = movies[i].id;
		var poster = thumbnail.replace(/tmb/, '320');
		var releaseDate = movies[i].release_dates.theater;
		var formattedDate = releaseDate.replace(/-/gi, '');

		console.log(movies[i]);

		posters += '<div data-title="' + title + '" data-id="' + id + '"><img src="' + poster + '"> <button class="watch-trailer"> Watch Trailer</button> <button class="' + buttonClass + '">' + buttonValue + '</button> <button> <a href="https://www.google.com/calendar/render?action=TEMPLATE&text=' + title + '&dates='+ formattedDate +'T230807Z/'+ formattedDate +'T003807Z&details=&location=&sprop=&sprop=name:#f">Save to Calendar</a> </button> </div>';
	}

	$('aside').html(posters);

	$('.watch-trailer').on('click', function(){
		watchTrailer($(this))
	})

	$('.save').on('click', function(){
		var id = $(this).parent().data('id');
		saveMovie(id)
	})

	$('.watch').on('click', function(){
		var id = $(this).parent().data('id');
		mapGen();
	})
}

function saveMovie(id){
	var detailUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movies/' + id + '.json?apikey=gp8x4h757ztubg36gu2vdxh8';

	$.ajax({
		type: 'GET',
		url: detailUrl,
		dataType: 'jsonp',
		success: function(result){
			save(result);
		}
	})
}

function save(result){
	var title = result.title;
	var release_date = result.release_dates.theater;
	var formatted_date = release_date.replace(/-/gi, '');
	var synopsis = result.synopsis;
	var poster = result.posters.original.replace(/tmb/, '320');

	var googleUrl = 'https://www.google.com/calendar/render?action=TEMPLATE&text=' + title + '&dates=' + formatted_date + 'T230807Z/' + formatted_date + 'T003807Z&details=&location=&sprop=&sprop=name:#f';

	$('#user-movies').append(
	'<div data-title="' + title + '" class="user-show">'+
	'<img src="' + poster + '">'+
	'<button class="watch-trailer">Trailer</button>'+
	'<a href="'+ googleUrl +'"> Add to Google Calendar </a>'+
	'</div>');


	$.ajax({
		type: 'POST',
		url: '/movies',
		data: { movie: {
			title: title,
			release_date: releaseDate,
			formatted_date: formattedDate,
			synopsis: synopsis,
			poster: poster,
			status: 'coming soon'
		}},
		success: function(){
			$('.success').slideDown(200).slideUp('slow');
		}
	})

	$('.watch-trailer').on('click', function(){
		watchTrailer($(this));
	})
}

function watchTrailer(element){
	$('.map-input').hide();
	$('.trailer').show();
	movieTitle = element.parent().data('title');
	youtubeUrl = 'https://gdata.youtube.com/feeds/api/videos?v=2&alt=json&max-results=1&q=%20' +movieTitle + '%20trailer&format=5&prettyprint=true';
	
	$.ajax({
		type: 'GET',
		url: youtubeUrl,
		dataType: 'jsonp',
		success: function(results) {
			videoLink = results.feed.entry[0].content.src
			trailer = '<embed type="application/x-shockwave-flash" src="' + videoLink + '">'
			$('.trailer').html(trailer);
		}		
	})	
}