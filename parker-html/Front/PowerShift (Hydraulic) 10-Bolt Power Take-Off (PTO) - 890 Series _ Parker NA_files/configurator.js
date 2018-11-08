/*---------------------------------------------------
 Parker 
 Configurator Modal
 
 Last Updated By: Ryan Perry
 Last Updated: 10/10/2013
---------------------------------------------------*/


//Divide Up function
(function ($) {$.fn.splitUp=function(splitBy,wrapper){$all= $(this).find('>*');var fragment=Math.ceil($all.length/splitBy);for(i=0;i<fragment;i++)$all.slice(splitBy*i,splitBy*(i+1)).wrapAll(wrapper);return $(this);}})(jQuery);

//Selectbox Replacement
(function ($){$.fn.aselect = function (options){var defaults = {};var options = $.extend(defaults, options);return this.each(function (){$(this).not('.jquery-aselect').each(function(){var width = parseInt(options.width) || $(this).outerWidth();$(this).attr('autocomplete', 'off').addClass('jquery-aselect').wrap($(document.createElement('div')).addClass('jquery-aselect-wrap').css({width: width})).before($(document.createElement('span')).addClass('jquery-aselect-selected-text').width(width).css('background-position-x',(width-499)+'px')).css({width: width - 0 + 'px'});}).change(function(){var selectedText = $(this).find(':selected').text();$(this).prev().text(selectedText);}).trigger('change');});};})(jQuery);


jQuery(document).ready(function($) {

/*---------------------------------------------------
 Add in Javascript
---------------------------------------------------*/
var $head = $('head');

//$head.append('<script type="text/javascript" src="utils/viewport.js"></script>');

//modernizr test for nth-child support
Modernizr.testStyles(" #modernizr div:nth-child(3n){width:10px;} ", function(elem, rule){
	var bool = false, divs = elem.getElementsByTagName("div");
	if (divs.length == 7){
		var test = window.getComputedStyle ? function(i){
               return getComputedStyle(divs[i], null)["width"] == "10px";
          } : function(i){
               return divs[i].currentStyle["width"] == "10px";
          };
          bool = !test(0) && !test(1) && test(2) && !test(3) && !test(4) && test(5) && !test(6);
     }
     Modernizr.addTest("nthchildn", bool);
}, 7);


/*-------------------------------------------------*/




/*---------------------------------------------------
 Global variables
---------------------------------------------------*/
var $page = $('#new_container').length !=0 ? $('#new_container') : $('#category_container_div_Id');
if($('#new_container').length ==0 && $('#category_container_div_Id').length ==0 ){
	if($('#product_browse_pdp').length === 0){
        $page = $('.info_section');
	} else {
		$page = $('#product_browse_pdp');
	}
}
var $m_window = $('.m-window');
var $m_overlay = $('.m-overlay');
var $m_header = $('.m-header');
var $m_content = $('.m-content');
var $m_main = $('.m-main');
var $m_aside = $('.m-aside');
var $m_specificationssettings = $('.m-specifications-settings');
var $m_steps = $('.m-specifications-steps');
var $m_stepsShell = $m_steps.find('.m-specifications-steps-shell');
var $m_partGroup = $('.m-header-part-number-group');

var isMobile = false;
var isMobileSetup = false;
var isPartKeySetup = false;
var _version = 'd';
var isTermsAccepted = false;
var hasScroll = false;

var _windowH = $(window).outerHeight();
var _windowW = getWindowWidth();
var _modalW;
var _headerH;
var _headerHeight;
var _pageH;
var _mainH;
var _asideH;
var _configuration = [];

/*-------------------------------------------------*/




/*---------------------------------------------------
 Modernizr Tests
---------------------------------------------------*/
if(!Modernizr.mq('only all')) {
	$('html').addClass('no-mq');

} else {
	$('html').addClass('mq');
}

if(!Modernizr.nthchildn) {
	//$head.append('<script type="text/javascript" src="src="utils/selectivizr.js"></script>');
}

/*-------------------------------------------------*/




$('.m-btn-disabled').on('click', function(e) {
	e.preventDefault();
});

$('.m-header-info-contact > a').on('click', function(e) {
	e.preventDefault();
});




/*---------------------------------------------------
 Part number key build out
---------------------------------------------------*/
$('<span class="m-header-part-number-group-arrow" />').appendTo($m_partGroup);
	$m_partGroup.each(function(idx) {
	var $group = $(this);
	var _key = "";
	var _idx = idx

	while(_idx >= 0) {
        _key = String.fromCharCode(_idx % 26 + 97) + _key;
        _idx = Math.floor(_idx / 26) - 1;
    }
	
	$('<span class="m-part-group-key" />').text(_key).appendTo($group);
	$('<span class="m-part-key-info-symbol" />').text(_key).prependTo($('.m-header-part-key-info').eq(idx));
});

/*-------------------------------------------------*/
	
	/*---------------------------------------------------
	 Open asset video URL
	---------------------------------------------------*/
/*
	$('.Video').on('click', function(e) {
		var divID = '#' + $(this).attr('id') ;
		var videoURL = $(divID).attr('href') ;
		var height = $(window).height();
		var width = $(window).width();
		window.open(videoURL, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,width='+width +',height=' +height);
		e.preventDefault();
	});
		*/
	
	$('.Video').on('click', function(e) {
		$('body').addClass('m-window-is-opened');
		$("html, body").stop().animate({ scrollTop: $page.offset().top }, 800);
			$(".m-header-nav").css({
			     "min-width": "100%",
			     "left": "0px"
			 
			 });
			
	var divID = '#' + $(this).attr('id') ;
	var URL = $(divID).attr( "href" );
	$("#frame").attr("src", URL);
	$("#frame").attr({
			     "height": "100%" 
			 });
			$(".m-content").css({
			     "min-width": "1175px",
			     "left": "-100px",
		         "min-height": "38em",
			     "height": "38em" 
			 });
			$(".m-header-nav").css({
			     "min-width": "1175px",
			     "left": "-100px"
			 });
			fullScreenVideo();
			e.preventDefault();
	});
	
		


/*---------------------------------------------------
 Open configurator
---------------------------------------------------*/
$('.m-open-configurator').on('click', function(e) {
	$('body').addClass('m-window-is-opened');
	$("html, body").stop().animate({ scrollTop: $page.offset().top }, 800);
		$(".m-header-nav").css({
		     "min-width": "100%",
		     "left": "0px",
		 
		 });
var divID = '#' + $(this).attr('id') ;
	modalSetup($(divID).attr( "href" ));
	if($(this).hasClass('external-modal-window')){
		$(".m-content").css({
		     "min-width": "1175px",
		     "left": "-100px",
	         "min-height": "1319px",
		     "height": "1319px" 
		 });
		$(".m-header-nav").css({
		     "min-width": "1175px",
		     "left": "-100px",
		 
		 });
	} else {
		setTimeout(function(){
		$( ".m-window-go-full-screen" ).removeClass( "external-modal-window" );
	}, 3000);
	}
	
	e.preventDefault();
});

$('.external-modal-window').on('click', function(e) {
	setTimeout(function(){
		$( ".m-window-go-full-screen" ).addClass( "external-modal-window" );
	}, 2000);
	e.preventDefault();
});

/*-------------------------------------------------*/




/*---------------------------------------------------
 Closing configurator modal 
---------------------------------------------------*/
$('.m-window-close').on('click', function(e) {
	closeModal();
	e.preventDefault();
});

$('#frameClosePDP').on('click', function(e) {
	$("#frame").attr({
			     "height": "1000px" 
			 });
});

$('.m-overlay').on('click', function() {
	closeModal();
});

function closeModal() {
	$m_window.fadeOut(300, function() {
		$m_overlay.hide();
		$('body').removeClass('m-window-is-opened');
		$m_overlay.removeAttr('style');
		$m_window.removeAttr('style');
		$m_content.removeAttr('style');
		
		if($m_window.hasClass('m-viewing-full-screen')) {
			$m_window.removeClass('m-viewing-full-screen');
		}
		
		if($('.m-header-part').hasClass('m-header-part-number-key-is-opened')) {
			$('.m-header-part').removeClass('m-header-part-number-key-is-opened');	
		}
		
		if($('.m-specifications-step').hasClass('m-specifications-step-opened')) {
			$('.m-specifications-step').removeClass('m-specifications-step-opened');
		}
		
		if($('.m-mobile-header-contact').hasClass('m-mobile-show-contact')) {
			$('.m-mobile-header-contact').removeClass('m-mobile-show-contact');
		}
		
		if($('.m-filter-row').hasClass('m-filter-detail-opened')) {
			$('.m-filter-row').removeClass('m-filter-detail-opened');			
		}
		
		if($('.m-filter-row').hasClass('m-filter-image-is-zoomed')) {
			$('.m-filter-row').removeClass('m-filter-image-is-zoomed');
		}
				
		if($('.m-filter-assembly').hasClass('m-filter-active')) {
			$('.m-filter-assembly').removeClass('m-filter-active');
			$('.m-filter-application').addClass('m-filter-active');
		}
		
		$m_aside.removeAttr('style').removeAttr('data-right-position');
		
		$('.m-filter-detail-toggle').off().text('Detail [ + ]').attr('title', 'Show Detail');
		$('.m-filter-image-zoom-in').off();
		$('.m-filter-image-zoom-out').off();
		
		$('.m-window-go-full-screen').off().html('Full Screen <span class="m-icon-fullscreen"/>');
		$('.m-specifications-step-title').off();
		$('.m-specifications-toggle').off();
		
		$('.m-header-part-info-toggle').off();
		$('.m-mobile-contact-close').off();
		
		$('.m-filter-proceed').off();
		$('.m-specifications-reset').off();
				
	});
	
}

/*-------------------------------------------------*/




/*---------------------------------------------------
 Modal setup
---------------------------------------------------*/
function modalSetup(strUrl) {
	
	selectboxReplacement($('.m-select-replace'));
	thresholdTest();
	if(_version === 'd') {
		
		if(scrollBarTest() === 0) {
			$('.m-specifications-steps-shell').css({'padding-right' : '7px', 'width' : '145px'});
			$('.m-icon-toggle').css({'right' : '7px'});
		} else {
			$('.m-specifications-steps-shell').css({'padding-right' : '0', 'width' : 140 + scrollBarTest() + 'px'});
			hasScroll = true;
		}	
	}	
	
	if(_version != 'm') {
		positionContent();
		positionAsideTop();
	}
	
	//partNumberKey();

	//assemblyForm();
	//assemblySteps();
	
	//$("#frame").attr("src", "http://corpappstest.parker.com/eCommerce/config/econfig.aspx?lang=EN&amp;mod=LTC II - Miniature Liquid Diaphragm Pump&amp;divid=687821&amp;parentCatId=15603&amp;ConfiguratorType");
	$("#frame").attr("src", strUrl);

	fullScreenToggle();
	
}

/*-------------------------------------------------*/
	


	
/*---------------------------------------------------
 Test is a Scrollbar is present
---------------------------------------------------*/
function scrollBarTest() {
    var $inner = jQuery('<div style="width: 100%; height:200px;">test</div>'),
        $outer = jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
        inner = $inner[0],
        outer = $outer[0];
     
    jQuery('body').append(outer);
    var width1 = inner.offsetWidth;
    $outer.css('overflow', 'scroll');
    var width2 = outer.clientWidth;
    $outer.remove();
 
    return (width1 - width2);
}
	
/*-------------------------------------------------*/	
	
		
	

/*---------------------------------------------------
 Window resizing
---------------------------------------------------*/
$(window).resize(function() {
	thresholdTest();
	
	if(_version != 'm') {
		positionContent();
		positionAsideTop();
		$m_aside.css({'right' : positionAsideRight() + 'px'}).attr('data-right-position', positionAsideRight());
	}	
});

/*-------------------------------------------------*/




/*---------------------------------------------------
 Resize threshold 
---------------------------------------------------*/
function thresholdTest() {
	
	if(Modernizr.mq('only all')) {
		if(Modernizr.mq('(max-width: 900px)')) {			
			$m_aside.removeAttr('style');
			$m_content.removeAttr('style');
			_asideH = $m_aside.outerHeight();			
			$m_main.css({'padding-bottom' : _asideH + 20 + 'px'});
			_version = 'm';		
			
			if($('.m-mobile-header-contact').hasClass('m-mobile-show-contact')) {
				$('.m-mobile-header-contact').removeClass('m-mobile-show-contact');
			}
						
			//hide fixed footer when form inputs in focus
			$('.m-filter-input :text, .m-filter-input textarea, .m-filter-input select').focusin(function() {
				if(!$('body').hasClass('m-mobile-form-in-focus')) { 
					$('body').addClass('m-mobile-form-in-focus'); 
				}				
			});
						
			$('.m-filter-input :text, .m-filter-input textarea, .m-filter-input select').focusout(function() {
				if($('body').hasClass('m-mobile-form-in-focus')) { 
					$('body').removeClass('m-mobile-form-in-focus'); 
				}				
			});
			
			$('.m-filter-input select').change(function() {
				if($('body').hasClass('m-mobile-form-in-focus')) { 
					$('body').removeClass('m-mobile-form-in-focus');
				}
			});
						
			if(!isMobileSetup) {
				mobileMods();
				isMobileSetup = true;
			}
			
		} else {
		
			if($('body').hasClass('m-mobile-form-in-focus')) { 
				$('body').removeClass('m-mobile-form-in-focus'); 
			}	
		
			$m_aside.removeAttr('style');
			$m_main.removeAttr('style');
			$m_aside.css({'right' : positionAsideRight() + 'px'}).attr('data-right-position', positionAsideRight());	
			
			positionContent();
			positionAsideTop();
			
			_version = 'd';			
			
			
			//part key info divid up by halfsies
			if(!isPartKeySetup) {
				var divider =  Math.ceil($('.m-header-part-key-info').length / 2);
				
				$('.m-header-part-key').splitUp(divider, '<div class="m-header-part-key-col" />');
				$('.m-header-part-key-col:first-child').addClass('m-desktop-left');
				$('.m-header-part-key-col:last-child').addClass('m-desktop-right');
				
				isPartKeySetup = true;
			}
			
		}
		
	} else {
		//legacy support		
		_version = 'd';
		$m_aside.removeAttr('style');		
		$m_aside.css({'right' : positionAsideRight() + 'px'}).attr('data-right-position', positionAsideRight());	
		positionContent();
		positionAsideTop();
		
		//part key info divid up by halfsies
		if(!isPartKeySetup) {
			var divider =  Math.ceil($('.m-header-part-key-info').length / 2);
				
			$('.m-header-part-key').splitUp(divider, '<div class="m-header-part-key-col" />');
			$('.m-header-part-key-col:first-child').addClass('m-desktop-left');
			$('.m-header-part-key-col:last-child').addClass('m-desktop-right');
				
			isPartKeySetup = true;
		}
	}
	
}
/*-------------------------------------------------*/




/*---------------------------------------------------
 Position 
---------------------------------------------------*/
function positionContent() {
	_headerH = $m_header.outerHeight();
	_windowH = $(window).outerHeight();
	_mainH = $m_main.outerHeight(true);
	_pageH = $page.outerHeight(true);
	
	if(_mainH > (_pageH - _headerH)) {
		$m_content.css({'min-height': _mainH + 2 + 'px', 'top': _headerH + 'px'});	
	} else {
		$m_content.css({'min-height': _pageH - _headerH + 'px', 'top': _headerH + 'px'});
	}
} 

/*-------------------------------------------------*/




/*---------------------------------------------------
 Position Aside top
---------------------------------------------------*/
function positionAsideTop() {
	_headerH = $m_header.outerHeight();
	_windowH = $(window).outerHeight();
	_mainH = $m_main.outerHeight(true);
	_pageH = $page.outerHeight(true);
	
	$m_aside.css({'top' : _headerH + 'px'});

	var _specH = _windowH - ($m_specificationssettings.outerHeight(true) + _headerH);
	
	$m_steps.css({'height' : _specH - 20 + 'px'});
	$m_stepsShell.css({'height' : _specH - 20 + 'px'});		
}

/*-------------------------------------------------*/




/*---------------------------------------------------
 Position Aside right
---------------------------------------------------*/
function positionAsideRight() {
	_windowW = getWindowWidth();
	_modalW = $m_window.width();
	var _rightOffset = 0;
	
	if(window.matchMedia) {
		if(hasScroll) {
			_rightOffset = ((_windowW - _modalW) / 2) - 7;
		} else {
			_rightOffset = ((_windowW - _modalW) / 2);
		}
	} else {
		_rightOffset = ((_windowW - _modalW) / 2) - 7;
	}
	
	return _rightOffset;
}

/*-------------------------------------------------*/




/*---------------------------------------------------
 Selectbox replacement
---------------------------------------------------*/
function selectboxReplacement(slct) {
	$(slct).aselect();
	
	$('<span class="m-select-handle" />').prependTo('.jquery-aselect-wrap');
	
}

/*-------------------------------------------------*/









/*---------------------------------------------------
 Assembly Steps
---------------------------------------------------*/
function assemblySteps() {
	
	//specifications steps toggle
	$('.m-specifications-step-title').on('click', function(e) {
		$(this).closest('.m-specifications-step').toggleClass('m-specifications-step-opened');		
		e.preventDefault();
	});
	
	
	//specifications show more toggle
	$('.m-specifications-toggle').on('click', function(e) {
		var $toggle = $(this);
		$m_aside.toggleClass('m-aside-is-opened');
		
		if($m_aside.hasClass('m-aside-is-opened')) {
			$toggle.text('Show Less [ - ]').attr('title', 'Show Less');
			$m_steps.removeAttr('style');
		} else {
			$toggle.text('Show More [ + ]').attr('title', 'Show More');
			_asideH = $m_specificationssettings.height();
			$m_steps.css({'top':_asideH + 'px'});
		}
		
		e.preventDefault();
	});
	
	
	//specifications reset
	$('.m-specifications-reset').on('click', function(e) {
		if(confirm('Do you really want to reset specifications?')) {
			$('.m-filter-input').find(':checked').removeAttr('checked');
			
			$('.m-filter-input').find('option:selected').removeAttr('selected');
			
			$('.m-filter-input').find('.m-select-replace').each(function() {
				var $select = $(this);
				$select.find('option[value=""]').attr('selected', 'selected');		
				var _selected = $select.find('option[value=""]').text();
				$select.closest('.m-filter-input').find('.jquery-aselect-selected-text').text(_selected);
			});
			
			$('.m-filter-input').find(':text').val('');
			$('.m-filter-input').find('textarea').val('');
			
			$("html, body").stop().animate({ scrollTop: $page.offset().top }, 800);
		}
		e.preventDefault();
	});
}

/*-------------------------------------------------*/




/*---------------------------------------------------
 Mobile/Tablet Settings
---------------------------------------------------*/
function mobileMods() {
	var $selectLanguage = $('.m-header-language');
	var _langW = $selectLanguage.find('.jquery-aselect-wrap').width();
	$selectLanguage.css({'margin-left' : '-' + _langW / 2 + 'px' });
	
	var _contact = {
		link : $('.m-header-info-contact > a').clone(),
		email : $('.m-btn-header-email').clone(),
		chat : $('.m-btn-header-chat').clone(),	
		info: $('.m-header-info-contact').find('.m-contact-info').clone()		
	};	
	
	$('<div class="m-mobile-header-contact m-right" />').appendTo('.m-header-nav');
	var $m_contact = $('.m-mobile-header-contact');
	$(_contact.link).prependTo($m_contact);
	$(_contact.info).addClass('m-mobile-contact-info').appendTo($m_contact);
	$('<ul class="m-mobile-contact-nav" />').insertAfter($m_contact.find('.m-contact-info-top'));
	$('<li class="m-left" />').html(_contact.email).appendTo('.m-mobile-contact-nav');
	$('<li class="m-right" />').html(_contact.chat).appendTo('.m-mobile-contact-nav');
	
	$('<a href="#" title="Close Contact Info" class="m-mobile-contact-close m-right" />').text('Close [ - ]').insertAfter($m_contact.find('.m-contact-wrapper'));
	$m_contact.find('.m-mobile-contact-close').wrap('<div class="m-wrapper" />')
	
	
	closeMobileContact();
	
	$('.m-mobile-header-contact').find('> a').on('click', function(e) {
		$(this).closest('.m-mobile-header-contact').toggleClass('m-mobile-show-contact');
		e.preventDefault();
	});
	
}

/*-------------------------------------------------*/




/*---------------------------------------------------
 Mobile contact close
---------------------------------------------------*/
function closeMobileContact() {
	$('.m-mobile-contact-close').on('click', function(e) {
		$('.m-mobile-header-contact').removeClass('m-mobile-show-contact');
		
		e.preventDefault();	
	});
}

/*-------------------------------------------------*/




/*---------------------------------------------------
 Full screen toggle
---------------------------------------------------*/
function fullScreenToggle() {
	$('.m-window-go-full-screen').on('click', function(e) {
		var $toggle = $(this);
		
		$m_window.toggleClass('m-viewing-full-screen');
		
		if($m_window.hasClass('m-viewing-full-screen')) {
			$m_aside.css({'right':'0px'});		
			$toggle.html('Exit Full Screen <span class="m-icon-fullscreen"/>');
                        if($(this).hasClass('external-modal-window')){
                        	$('.m-header-nav').css({left: 0});
                        	$('.m-content').css({left: 0});
                        }
		} else {	
			var _asideR = $m_aside.data('right-position');
			$m_aside.css({'right': _asideR + 'px'});	
			$toggle.html('Full Screen <span class="m-icon-fullscreen"/>');
                        if($(this).hasClass('external-modal-window')){
                         	$('.m-header-nav').css({left: -100});
                        	$('.m-content').css({left: -100});
                        }
		}
		$('#frame').load(function() {
            this.style.height = this.contentWindow.document.body.offsetHeight + 'px';
        });
		e.preventDefault();	
	});
}

/*-------------------------------------------------*/

/*---------------------------------------------------
Full screen Video 
---------------------------------------------------*/
function fullScreenVideo() {
	$('.m-window-go-full-screen').on('click', function(e) {
		var $toggle = $(this);
		
		$m_window.toggleClass('m-viewing-full-screen');
		
		if($m_window.hasClass('m-viewing-full-screen')) {
			$m_aside.css({'right':'0px'});	
		   	$('.m-header-nav').css({left: 0});
           	$('.m-content').css({left: 0});
        	$('.m-header').css({'width': '100%'});
			$toggle.html('Exit Full Screen <span class="m-icon-fullscreen"/>');
                     
		} else {	
			var _asideR = $m_aside.data('right-position');
			$m_aside.css({'right': _asideR + 'px'});	
			    	$('.m-header-nav').css({left: -100});
               	     $('.m-content').css({left: -100});
               	  $('.m-header').css({'width': '970px'});
			$toggle.html('Full Screen <span class="m-icon-fullscreen"/>');
                   
		}
		$('#frame').load(function() {
           this.style.height = this.contentWindow.document.body.offsetHeight + 'px';
       });
		e.preventDefault();	
	});
}

/*-------------------------------------------------*/


/*---------------------------------------------------
 Browser Window Width
---------------------------------------------------*/
function getWindowWidth() {
	var windowWidth = 0;
	if (typeof(window.innerWidth) === 'number') {
		windowWidth = window.innerWidth;
	} else {
		if (document.documentElement && document.documentElement.clientWidth) {
			windowWidth = document.documentElement.clientWidth;
		} else {
			if (document.body && document.body.clientWidth) {
				windowWidth = document.body.clientWidth;
			}
		}
	}
	return windowWidth;
}

/*-------------------------------------------------*/




// end jQuery
});






