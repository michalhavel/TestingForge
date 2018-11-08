$(document).ready(function () {	
		
		$('.responsive-tabs-container').find('.responsive-tabs a').each(function(){
			if(($(this).text().split('\n') == 'true')||($(this).text().length >25)){
				$(this).css('min-height', '54px');
				$(this).parent().nextAll('li').find('a').css('min-height', '54px');
			}
		});
		
	    //CLOSE MODAL
	    $('#modal .close').on('click', function (event) {
	  
	    	$('#emailProduct').hide();
	        $('#overlay').hide();
	      $('#modal').hide();
		 $('#modal #myForm')[0].reset(); 
	     $('#errorMsg').html("");
	   	 $('#errorMsg1').html("");
	   	 $('#errorMsg2').html("");
	   	 $('#errorMsg3').html("");
	   	 $('#errorMsg4').html("");
	   	 $('#errorMsg5').html("");
	    });

	    //CLOSE MODAL
	    $('#emailProductLink').on('click', function (event) {    
	     $('#emailProduct').show();
	     $('#overlay').show();
	     $('#modal').show();
		 $('#modal #myForm')[0].reset();
	   	 $('#errorMsg').html("");
		 $('#errorMsg1').html("");
		 $('#errorMsg2').html("");
		 $('#errorMsg3').html("");
		 $('#errorMsg4').html("");
		 $('#errorMsg5').html("");
	     
	    });
	   
	var bodyClassVal =  $('#bodyClass').val() ; 
	
	if(bodyClassVal == 1){
		$("body").addClass("divisionBody");
		$(".headerBGHome").toggleClass("headerBGHome-division");
		$(".greyBar").toggleClass("headerBGHome-division");
		$(".greyBar").css("height","18px");
	}
		
    /* Opacity settings */
    $('.popup_overlay').css({ opacity: 0.5 });
    $('.popup').css({ opacity: 0.9 });
    $('.home-callout').css({ opacity: 0.9 });
    /* ================ */

    $('.image-rotator').featuredContent({
        repeaterTag: 'div',
        speed: 7000
    });

    

    //Flyout specifically for Product
    $('.navigation ul li a#products-tab').hover(function () { $('#product-flyout').show(); },
                                                function () { $('#product-flyout').hide(); });

    $('.navigation ul li a#division-tab').hover(function () { $('#division-flyout').show(); },
	            function () { $('#division-flyout').hide(); });
	$('.navigation ul li a#literature-tab').hover(function () { $('#literature-flyout').show(); },
	            function () { $('#literature-flyout').hide(); });
	$('.navigation ul li a#about_us-tab').hover(function () { $('#about_us-flyout').show(); },
	            function () { $('#about_us-flyout').hide(); });												
	//Keep flyout shown when hovering over flyout
	$('.flyout').hover(function () { $(this).show(); },
	function () { $(this).hide(); });


    //Popups for espots on home pages
    $('.espot.blue').hover(
        function () {
            $('.popup_container.blue').show();
            $('.popup.blue').show().stop().animate({ top: '0' }, 500);
            $('.popup_overlay').fadeIn();
        },
        function () { /* do nothing */ }
    );
    $('.popup.blue').hover(
        function () { /* do nothing */ },
        function () {
            $('.popup.blue').stop().animate(
                { top: '224px' }, 500,
                    function () { $(this).hide(); $('.popup_container.blue').hide(); }
            );
            $('.popup_overlay').fadeOut();
        }
    );
    $('.espot.yellow').hover(
        function () {
            $('.popup_container.yellow').show();
            $('.popup.yellow').show().stop().animate({ top: '0' }, 500);
            $('.popup_overlay').fadeIn();
        },
        function () { /* do nothing */ }
    );
    $('.popup.yellow').hover(
        function () { /* do nothing */ },
        function () {
            $('.popup.yellow').stop().animate(
                { top: '154px' }, 500,
                    function () { $(this).hide(); $('.popup_container.yellow').hide(); }
            );
            $('.popup_overlay').fadeOut();
        }
    );
    $('.espot.green').hover(
        function () {
            $('.popup_container.green').show();
            $('.popup.green').show().stop().animate({ top: '0' }, 500);
            $('.popup_overlay').fadeIn();
        },
        function () { /* do nothing */ }
    );
    $('.popup.green').hover(
        function () { /* do nothing */ },
        function () {
            $('.popup.green').stop().animate(
                { top: '180px' }, 500, function () {
                    $(this).fadeOut(); $('.popup_container.green').hide();
                }
            );
            $('.popup_overlay').fadeOut();
        }
    );

	try {
        $("div.select-language select").msDropDown();
    } catch (e) {
        alert(e.message);
    }    
    
    
    // Input textboxes to clear placeholder
    $('input[class="textbox"]').focus(function () {
        var _this = $(this);
        var attrRel = _this.attr("rel");
        var currentVal = _this.val();
        if (currentVal === attrRel) {
            _this.val("");
        }
    });
    $('input[class="textbox"]').blur(function () {
        var _this = $(this);
        var attrRel = _this.attr("rel");
        var currentVal = _this.val();
        if (currentVal === "") {
            _this.val(attrRel);
        }
    });
    $('input[class="textbox"]').blur(); //fire event to put all textbox placeholders in

    //Toggle filter open and close of filter lists
    $('ul.filter a#headingAnchor').toggle(function () {
        var _this = $(this);
        var li = _this.parent();
        var list = li.find($('ul.inner_list'));
        var sprite = li.find($('span.sprite'));
        var anchor = li.find($('a'));
        if (list.length != 0) {
            list.show();
            sprite.css('background-position', '0 -13px');
            //anchor.css('font-family', 'Arial Bold');
        }
        return false;
    },
    function () {
        var _this = $(this);
        var li = _this.parent();
        var list = li.find($('ul.inner_list'));
        var sprite = li.find($('span.sprite'));
        var anchor = li.find($('a'));
        if (list.length != 0) {
            list.hide();
            sprite.css('background-position', '0 0px');
            //anchor.css('font-family', 'Arial');
        }
        return false;
    });

    //fire event to open all tabs
    $('ul.filter a#headingAnchor').click();

    //Product carousel

    //OVERLAY
    $('#overlay').css({
        'width': $(window).width() + 20,
        'height': 1800,
        'opacity': 0.6
    });

    //MODAL
    var scrollY = $(window).scrollTop();
    var viewportHeight = $(window).height();
    var viewportWidth = $(window).width();
    var outerHeightPx = $('#modal').outerHeight();
    var scrollHeight = scrollY+ 150 ;
    var viewportLeft = (viewportWidth - $('#modal').outerWidth()) / 2;
        $('#modal').css({
        'top': scrollHeight,
        'left': viewportLeft
    });
    /* This needs to be added on click, or when the modal opens up*/
    //$('body').css('overflow', 'hidden');
    
    //RESIZE
    $(window).resize(function () {
        if ($('#modal').is(":visible")) {
            var scrollY = $(window).scrollTop();
            var viewportHeight = $(window).height();
            var viewportWidth = $(window).width();
            var outerHeightPx = $('#modal').outerHeight();
            var scrollHeight = scrollY + (viewportHeight / 2) - (outerHeightPx / 2);
            var viewportLeft = (viewportWidth - $('#modal').outerWidth()) / 2;

            $('#overlay').css({
                'width': $(window).width(),
                'height': 1400
            });
            $('#modal').css({
                'top': '150.5px',
                'left': viewportLeft
            });
        }
    });
  

    
});

//Commented below part as it is no more getting used in new carousel
/*
$(window).load(function () {
    // restrict height to inner content to show one row, set width
    $('.carousel')
			.wrapInner('<div class="carousel-view-row" />')
			.wrapInner('<div class="carousel-view" />')
			.append('<a href="#" class="back">&lt;</a><a href="#" class="forward">&gt;</a>')
			.find('.carousel-view-row')
			.width(($('.carousel-view-row > a').length + 1) * $('.carousel a:eq(0)').outerWidth(true));
    $('.carousel .forward').click(function (e) {
        var first = $('.carousel-view-row a:first').detach();
        first.appendTo('.carousel-view-row');
        return false;
    });

    $('.carousel .back').click(function (e) {
        var last = $('.carousel-view-row a:last').detach();
        last.prependTo('.carousel-view-row');
        return false;
    });
	
	//
	$('.angleImageCarousel')
			.wrapInner('<div class="angleImageCarousel-view-row" />')
			.wrapInner('<div class="angleImageCarousel-view" />')
			.append('<a href="#" class="back">&lt;</a><a href="#" class="forward">&gt;</a>')
			.find('.angleImageCarousel-view-row')
			.width(($('.angleImageCarousel-view-row > a').length + 1) * $('.angleImageCarousel a:eq(0)').outerWidth(true));
	$('.angleImageCarousel .forward').click(function (e) {
			var first = $('.angleImageCarousel-view-row a:first').detach();
			first.appendTo('.angleImageCarousel-view-row');
			return false;
	});

	$('.angleImageCarousel .back').click(function (e) {
			var last = $('.angleImageCarousel-view-row a:last').detach();
			last.prependTo('.angleImageCarousel-view-row');
			return false;
	});
		
    //setTimeout($("#tabs").tabs(),1500);
     
	
});

*/
