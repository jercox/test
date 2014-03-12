
var carouselWidth = 0;
var maxMargin = 0;
$(document).ready(function(){
      
     carouselWidth = $(".carousel").width(); 
     maxMargin = parseInt($(".carousel li.itemCarousel").size()) * carouselWidth;

    // Set the interval to be 5 seconds
    t = setInterval(function(){
        	carousel_next()
    },5000);
});

function carousel_next()
{
	var marginLeft =  parseInt($(".carousel").css("margin-left").replace("px",""));
	var negMaxMargin = maxMargin * (-1);
	
    if(marginLeft > negMaxMargin )
	$(".carousel").animate({marginLeft: marginLeft-carouselWidth},1000,function(){
    	$(this).find("li:last").after($(this).find("li:first"));
    	$(this).css({marginLeft:0});
    })
}

function carousel_prev()
{	
	var marginLeft =  parseInt($(".carousel").css("margin-left").replace("px",""));
	if(marginLeft < 0)
	$(".carousel").animate({marginLeft: marginLeft + carouselWidth},1000,function(){
    	//$(this).find("li:first").before($(this).find("li:last"));
    	//$(this).css({marginRight:0});
    })
}
