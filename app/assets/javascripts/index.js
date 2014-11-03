$(document).ready(function() {
	$('.user-show').hide();
	$('.map-input').hide();

	var menu = $('header li')

	menu.on('click', function(){
		$('li').removeClass('active')
		$(this).addClass('active');
	})

	$('#comingsoon').on('click', function(){
		comingSoon();
	});

	var url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?page_limit=16&page=1&country=us&apikey=gp8x4h757ztubg36gu2vdxh8';

	getMovies(url, 'Find Theaters!', 'watch')

	$('#outnow').on('click', function(){
		$('.user-show').hide();
		$('#index').show();
		getMovies(url, 'Find Theaters!', 'watch');
	})

	$('#usermovies').on('click', function(){
		$('#index').hide();
		userPage();
	});
});