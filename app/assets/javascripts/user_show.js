function userPage(){
	$('.map-input').hide();
	$('.user-show').show();
  $('.trailer').hide();
  var userpage = { ext: 'my_movies' }
  history.pushState( userpage, 'show', 'my_movies')
}