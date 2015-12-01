// Responsive utilities
// ------------------- -
var responsive = {
	settings : {
		isSmall :  false,
		isMobile : false,
		isTablet : false,
		isMedium : false,
		isLarge : false
	},
	fireEvents : function() {

		responsive.settings.isSmall  = responsive.smallDetect();
		responsive.settings.isMedium = responsive.mediumDetect();
		responsive.settings.isLarge =  responsive.largeDetect();

		if( responsive.settings.isSmall ) {
			console.log("Is a Small screen");
			if( responsive.settings.isMobile ) {
				console.log("Is a Mobile device");
			}
		} else if ( responsive.settings.isMedium ) {
			console.log("Is a Medium screen");
			if ( responsive.settings.isTablet ) {
				console.log("Is a Tablet device");
			}
		} else if ( responsive.settings.isLarge) {
			console.log("Is a Large screen");
			if ( responsive.settings.isTablet ) {
				console.log("Is a Tablet device");
			}
		}
	},
	smallDetect : function() {
		var isSmall = false;

		if ($(".not-small").css("display") === "none" ) {
			isSmall = true;
			if(Modernizr.touch) {
				responsive.settings.isMobile = true;
			}
		}

		return isSmall;
	},
	mediumDetect : function() {
		var isMedium	 = false;

		if ($(".not-large").css("display") !== "none" &&  $(".not-small").css("display") !== "none") {
			isMedium = true;
			if(Modernizr.touch) {
				responsive.settings.isTablet = true;
			}
		}
		return isMedium;
	},
	 largeDetect : function() {
		var isLarge	 = false;

		if ($(".is-large").css("display") !== "none" ) {
			isLarge = true;
			if(Modernizr.touch) {
				responsive.settings.isTablet = true;
			}
		}
		return isLarge;
	}
};

$(window).load( function() {
	$("body").append('<div class="not-small"></div><div class="not-large"></div><div class="is-large"></div>');
	responsive.fireEvents();
});

