
var currentSlide = 0;
var lastSlide = 2;


$(document).ready(function() {
	
	changeSlide();
	resizeSlider();  
	$(window).resize(resizeSlider);
	setInterval(changeSlide,6000);

});



function resizeSlider(){
	if($(window).scrollTop() === 0){
		var heightSlider = heightP2P("header","footer");	
		$("#minSlider").css({"height":heightSlider});
	}
}

function changeSlide(){
	$('#slide'+currentSlide).fadeOut();
	if(currentSlide === lastSlide )
		currentSlide = 1
	else
		currentSlide ++;
	$('#slide'+currentSlide).fadeIn('slow');
	

}


/**
*@omarsty
*height between one point and another point
*INPUT: point1 = id point 1, point2 = id point 2
*return diference bettween point1 - point2
*/
function heightP2P(point1,point2){
	
	var height1 = $("#"+point1).outerHeight();
	var position2 = $("#"+point2).offset();
	return (position2.top - height1);
	
}