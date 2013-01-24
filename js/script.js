/* Author:

*/

$(document).ready(function() {
	$('#about').click(function() {
		$('.description-content').slideToggle('fast');
		if($(this).hasClass('expanded')) {
			$(this).removeClass('expanded');
		}
		else {
			$(this).addClass('expanded');
		}
		return false;
	});
	
	$(".close").click(function() {
		$(".description-content").slideUp("fast");
		return false;
	});
});





