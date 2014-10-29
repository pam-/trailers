$(document).ready(function() {
	$('.user-show').hide();
	$('.map-input').hide();
	
	$('#usermovies').on('click', function(){
		$('#index').hide();
		userPage();
	});

	$('#comingsoon').on('click', function(){
		comingSoon();
	});

	var url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?page_limit=16&page=1&country=us&apikey=gp8x4h757ztubg36gu2vdxh8';

	getMovies(url, 'Find Theaters!', 'watch')
});