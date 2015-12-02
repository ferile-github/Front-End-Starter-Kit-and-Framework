function loadcontent(container, href, hash, $link) {
	$('#result').html(" ");
	$('#result').append(container);
	$('#'+hash).load(href);
	$('#PATTERNLIB-navigation a').removeClass('is-current');
	$link.addClass('is-current');
}; 

$(window).ready(function($) {
	var styleguide = {
		location : ""
	};

	styleguide.location = window.location.hash.substr(1);

	if(styleguide.location) {
		var hash 		= styleguide.location,
			container 	= '<div id="'+hash+'" />',
			$link 		= $("[data-hash="+hash+"]"),
			href 		= $link.attr('href');

		loadcontent(container, href, hash, $link);
	}
});

$(document).ready(function($) {

	function rgb2hex(rgb) {
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

		function hex(x) {
			return ("0" + parseInt(x).toString(16)).slice(-2);
		}

		if(rgb !== null) {
			return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		}
	}

	var elements = "#result *";

	$(document).on('mousemove', elements, function(event) {
		var $el = $(this),
			X = event.pageX+10+"px",
			Y = event.pageY+10+"px";

		$( "#cssprops" ).css({
			top: Y,
			left: X
		});

		var text = [],
			styleProps = $el.css(["font-family", "font-size", "font-weight", "font-style", "line-height", "text-transform", "letter-spacing"]),
			color = rgb2hex($el.css("color"));


		text.push("<span class='css-title'>Typography Styles </span>");
		$.each( styleProps, function( prop, value ) {
			text.push( "<strong class='css-label'>" + prop + "</strong> " + "<span class='css-value'>" + value + "</span>" );
		});
		text.push("<strong class='css-label'>color</strong> <span class='css-swatch' style='background:"+color+"'></span>" + "<span class='css-value'>" + color  + "</span><br>");


		text.push("<span class='css-title'>Block Styles </span>");
		var bgcolor 	= rgb2hex($el.css("background-color")),
			bordercolor = rgb2hex($el.css("border-color")),
			borderwidth = $el.css("border-width");

		if (borderwidth !== "0px") {
			text.push("<strong class='css-label'>border-width</strong> " + "<span class='css-value'>" + borderwidth  + "</span>");
		}
		if (bgcolor) {
			text.push("<strong class='css-label'>background-color</strong> <span class='css-swatch' style='background:"+bgcolor+"'></span>" + "<span class='css-value'>" + bgcolor  + "</span>");
		}
		text.push("<strong class='css-label'>border-color</strong> <span class='css-swatch' style='background:"+bordercolor+"'></span>"+ "<span class='css-value'>" + bordercolor+ "</span>");

		$( "#cssprops" ).html(
			text.join( "<br>" )
		);

		event.stopPropagation();
	});


	$(document).on('mouseenter', elements, function(event) {
		var $el = $(this);

		$( "#cssprops" ).show();
		event.stopPropagation();
	});

	$(document).on('mouseleave', elements, function(event) {
		var $el = $(this);

		$( "#cssprops" ).hide();
		event.stopPropagation();

	});


	$('#PATTERNLIB-navigation a').on('click', function(event) {
		var $el = $(this),
			href = $el.attr('href'),
			data = $el.data(),
			hash = data.hash,
			container = '<div id="'+hash+'" />';

		// Update the window URL
		window.location.hash = hash;

		// load in the content
		loadcontent(container, href, hash, $(this));

		event.preventDefault();
	});

});



