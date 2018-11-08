var isMobile = {
	Android : function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry : function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS : function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera : function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows : function() {
		return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
	},
	any : function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};
var isTablet = {
	iOS : function() {
		return navigator.userAgent.match(/iPad/i);
	},
	android : function() {
		return navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/Mobile/i);
	},
	any : function() {
		return (isTablet.iOS() || isTablet.android());
	}
};
var win_width = {
	init : function() {
		return $(window).width();
	}
};

var collapse = {
	init : function() {
		if (win_width.init() > 767) {
			// Not a phone nor a tablet
			$(".panel-title a").on('click', function(e) {
			//	e.preventDefault();

			});
			$(".footer_teasers_wrapper .panel-title a").attr("data-toggle", "").attr("data-parent", "");
			$(".footer_teasers_wrapper .panel-collapse").removeClass('collapse');

			$(".plans_section a").attr("data-toggle", "").attr("data-parent", "");
			$(".plans_section .panel-collapse").removeClass('collapse');

		} else {
			$(".footer_teasers_wrapper .panel-title a.footer_mobile").attr("data-toggle", "collapse").attr("data-parent", "#accordion");
			$(".footer_teasers_wrapper .panel-collapse").addClass('collapse');

			$(".plans_section a").attr("data-toggle", "collapse").attr("data-parent", "#accordion1");
			$(".plans_section .panel-collapse").addClass('collapse');

		}
		$('.collapse').on('shown.bs.collapse', function() {
			$(this).prev().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
			if ($('.logo_section').is(':visible')) {
				$(".search_btn").find('span').removeClass('glyphicon-search_icon').addClass('search_white');
			}
		}).on('hidden.bs.collapse', function() {
			$(this).prev().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
			if ($('.logo_section').is(':hidden')) {
				$(".search_btn").find('span').removeClass('search_white').addClass('glyphicon-search_icon');
			}
		});
		$('.bs-search-collapse').on('shown.bs.collapse', function() {
			$('.back_searchdiv').show();
		}).on('hidden.bs.collapse', function() {
			$('.back_searchdiv').hide();
		});

	}
};
var carousel_multi = {
	init : function() {
		$('.carousel[data-type="multi"] .item').each(function() {
			var next = $(this).next();
			if (!next.length) {
				next = $(this).siblings(':first');
			}
			next.children(':first-child').clone().appendTo($(this));

			for (var i = 0; i < 2; i++) {
				next = next.next();
				if (!next.length) {
					next = $(this).siblings(':first');
				}
				next.children(':first-child').clone().appendTo($(this));
			}
		});
	}
};
var search_section_collapse = {
	init : function() {
		if (win_width.init() > 1024) {
			// Not a phone nor a tablet
			$(".bs-search-collapse").removeClass('collapse');
		} else {
			$(".bs-search-collapse").addClass('collapse');
		}
	}
};
var navHamburger = {
	selector : '.navbar-toggle',
	mainContainer : '.wrapper',
	navShow : '.nav_primary',
	navShowClass : 'nav_mob_show',
	setFlag : false,
	contentPushClass : 'content_push',
	init : function() {
		navHamburger.bindClickEvent();
	},
	bindClickEvent : function() {
		$(navHamburger.selector).on('click', function() {
			var $this = $(this);
			navHamburger.toggleHamburger($this);
			if (navHamburger.setFlag === false) {
				$(navHamburger.navShowLiClass).on('click', function() {
					navHamburger.toggleHamburger($(navHamburger.selector));
					navHamburger.setFlag = true;
				});
			}
		});
	},
	toggleHamburger : function($this, s) {
		// Pushed class added to Contaniner & hamburger icon
		$(navHamburger.mainContainer).toggleClass(navHamburger.contentPushClass);
		$(navHamburger.header).toggleClass(navHamburger.contentPushClass);
		// Showing mobile navigation & heading
		$(navHamburger.navShow).toggleClass(navHamburger.navShowClass);
		$(navHamburger.headingMenu).toggleClass(navHamburger.navShowClass);
		$this.toggleClass('closed').toggleClass('opened');
	},
	resize : function() {
		if (win_width.init() > 1024) {
			$(navHamburger.navShow).removeClass(navHamburger.navShowClass);
			$(navHamburger.mainContainer).removeClass(navHamburger.contentPushClass);
		}
		if(typeof SearchBasedNavigationDisplayJS != 'undefined' ){
			productCount_up();
		}
	}
};

var cartFunctionality = {
	promo : '.promo-link',
	promoSection : '.promo-section-visible',
	calculate : '.calculate-btn',
	goBtn : '.go-btn',
	promoBtn : '.go-promo',
	init : function() {
		$(cartFunctionality.promo).on('click', function() {
			$(cartFunctionality.promoSection).show();
		});
		$(cartFunctionality.calculate).on('click', function() {
			$(".calc-zip-code").show();
			$(this).hide();
		});
		$(cartFunctionality.goBtn).on('click', function() {
			$(".zip-code-row, .total-before").hide();
			$(".estimated-tax, .estimated-shipping, .estimated-total, .est-zip-code").show();
		});
		$(cartFunctionality.promoBtn).on('click', function() {
			$(".value-promo-code, .use-different-code").show();
			$(".promo-section-visible, .promo-code-wrap").hide();
		});
	}
};

var responsive_tabs = {
	init : function() {
	$('.responsive-tabs').responsiveTabs({});
	$('.tab-content').each(function() {
		$(this).find('.accordion-link').eq(0).addClass('open').find('span').removeClass('glyphicon-add').addClass('glyphicon-minus');
	});
	
	if(window.location.hash){
		$(".nav-tabs > li a[href=" + window.location.hash + "]").click();
		$('html, body').animate({ scrollTop: $(".nav-tabs > li a[href=" + window.location.hash + "]").offset().top},10);
		if($( window ).width() < 1025) {
			$(".tab-content a").removeClass("open");
			$(".tab-content a span").removeClass("glyphicon-minus");
			$(".tab-content a[href=" + window.location.hash + "]").addClass("open");
			$(".tab-content a[href=" + window.location.hash + "] span").addClass("glyphicon-minus");
			$('html, body').animate({ scrollTop: $(".tab-content a[href=" + window.location.hash + "]").offset().top},10);
		}
	}

	setTimeout(function(){
		$('.accordion-link').on('click', function(e) {
			var _this = $(this),
				current_position;

			e.preventDefault();
			if (!_this.hasClass('open')) {
				$('.accordion-link').removeClass('open');
				_this.addClass('open');
				_this.find('span').addClass('glyphicon-minus');
				_this.siblings('.tab-pane').removeClass('active');
				_this.siblings('.accordion-link').find('span').removeClass('glyphicon-minus');
				_this.next().addClass('active');

				// handle the support divisions tab getting readmore functionality when hidden
				if (_this.attr('id') == 'divisions-tab-link') {
					if (win_width.init() < 767) {
						$('.culture-heading.read_more_divisions').readmore({
							moreLink : '<a href="#"><span class="glyphicon glyphicon-plus"></span>View more</a>',
							collapsedHeight : 107,
							speed : 75,
							lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span>View less</a>'
						});
					}
				};
				} else {
					_this.removeClass('open');
					_this.find('span').removeClass('glyphicon-minus');
					_this.next().removeClass('active');
				}
				current_position = _this.offset().top;
				$('html,body').stop().animate({ 
					scrollTop : current_position - 50
				}, 1000);
				return false;
			});
		});
	}
};

var read_more = {
	init : function() {
		var view_more = $("#VIEW_MORE").val();
		var view_less = $("#VIEW_LESS").val();
		
		$('.read_more').readmore({
			moreLink : '<a href="#"><span class="glyphicon glyphicon-plus"></span>View more</a>',
			collapsedHeight : 54,
			speed : 75,
			lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span>View less</a>'
		});
		$('.product-details').readmore({
			moreLink : '<a href="#"><span class="glyphicon glyphicon-plus"></span>'+view_more+'</a>',
			collapsedHeight : 221,
			speed : 75,
			lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span>'+view_less+'</a>'
		});
		$('.tab_view_more_link').readmore({
			moreLink : '<a href="#"><span class="glyphicon glyphicon-plus"></span>View More</a>',
			collapsedHeight : 100,
			speed : 75,
			lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span>View Less</a>'
		});
		$('.caption-viewmore').readmore({
			moreLink : '<a href="#"><span class="glyphicon glyphicon-plus"></span>View More</a>',
			collapsedHeight : 115,
			speed : 75,
			lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span>View Less</a>'
		});
		$('.read_more_plp').readmore({
			moreLink : '<a href="#"><span class="glyphicon glyphicon-plus"></span>View More</a>',
			collapsedHeight : 36,
			speed : 75,
			lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span>View Less</a>'
		});
		$('.tab-content-more').readmore({
			moreLink : '<a href="#" class="rdmor"><span class="glyphicon glyphicon-plus"></span>View More</a>',
			collapsedHeight : 314,
			speed : 75,
			lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span>View Less</a>'
		});
		$('.sevice_readmore').readmore({
			moreLink : '<a href="#" class="rdmor"><span class="glyphicon glyphicon-plus"></span>View More</a>',
			collapsedHeight : 70,
			speed : 75,
			lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span>View Less</a>'
		});
		$('.blog-description').each(function() {
			$(this).readmore({
				moreLink : '<a href="#"> Read more</a>',
				collapsedHeight : 117,
				speed : 75,
				lessLink : '<a href="#"> View less</a>'
			});
		});
		$('.order_viewmore').readmore({
			moreLink : '<a href="#" class="rdmor"><span class="glyphicon glyphicon-plus"></span>'+view_more+'</a>',
			collapsedHeight : 35,
			speed : 75,
			lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span>'+view_less+'</a>'
		});

		if (win_width.init() < 767) {
			$('.tab-content-more').readmore({
				moreLink : '<a href="#" class="rdmor"><span class="glyphicon glyphicon-plus"></span>View More</a>',
				collapsedHeight : 260,
				speed : 75,
				lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span>View Less</a>'
			});
			$('.details-more').readmore({
				moreLink : '<a href="#"><span class="glyphicon glyphicon-plus"></span> View More</a>',
				collapsedHeight : 185,
				speed : 75,
				lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span> View Less</a>'
			});
			$('.service-details-more').readmore({
				moreLink : '<a href="#" class="rdmor"><span class="glyphicon glyphicon-plus"></span>View More</a>',
				collapsedHeight : 35,
				speed : 75,
				lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span>View Less</a>'
			});
			$('.category-section').readmore({
				moreLink : '<a href="#"><span class="glyphicon glyphicon-plus"></span> View More</a>',
				collapsedHeight : 180,
				speed : 75,
				lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span> View Less</a>'
			});
			$('.culture-heading').readmore({
				moreLink : '<a href="#"><span class="glyphicon glyphicon-plus"></span>'+view_more+'</a>',
				collapsedHeight : 50,
				speed : 75,
				lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span>'+view_less+'</a>'
			});
			$('.our_people_rdmore').readmore({
				moreLink : '<a href="#"><span class="glyphicon glyphicon-plus"></span> View More</a>',
				collapsedHeight : 45,
				speed : 75,
				lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span> View Less</a>'
			});
			$('.testimonial').readmore({
				moreLink : '<a href="#"><span class="glyphicon glyphicon-plus"></span> View More</a>',
				collapsedHeight : 38,
				speed : 75,
				lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span> View Less</a>'
			});
			$('.readProduct_services_plan').readmore({
				moreLink : '<a href="#" ><span class="glyphicon glyphicon-plus"></span> View More</a>',
				collapsedHeight : 45,
				speed : 75,
				lessLink : '<a href="#" ><span class="glyphicon glyphicon-minus"></span> View Less</a>'
			});
			$('.readProduct_services_planContainer').readmore({
				moreLink : '<a href="#"><span class="glyphicon glyphicon-plus"></span> View More</a>',
				collapsedHeight : 38,
				speed : 75,
				lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span> View Less</a>'
			});
			$('.read_more_serviceType').readmore({
				moreLink : '<a href="#"><span class="glyphicon glyphicon-plus"></span> View More</a>',
				collapsedHeight : 90,
				speed : 75,
				lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span> View Less</a>'
			});
			$('.caption-viewmore2').readmore({
				moreLink : '<a href="#"><span class="glyphicon glyphicon-plus"></span>View More</a>',
				collapsedHeight : 20,
				speed : 75,
				lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span>View Less</a>'
			});
			$('.viewmore').readmore({
				moreLink : '<a href="#" class="rdmor"><span class="glyphicon glyphicon-plus"></span>View More</a>',
				collapsedHeight : 196,
				speed : 75,
				lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span>View Less</a>'
			});
			$('.caption-viewmore1').readmore({
				moreLink : '<a href="#"><span class="glyphicon glyphicon-plus"></span>View More</a>',
				collapsedHeight : 120,
				speed : 75,
				lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span>View Less</a>'
			});
			$('.readProduct_services').readmore({
				moreLink : '<a href="#" class="orange-view-more"><span class="glyphicon glyphicon-plus"></span> View More</a>',
				collapsedHeight : 38,
				speed : 75,
				lessLink : '<a href="#" class="orange-view-more"><span class="glyphicon glyphicon-minus"></span> View Less</a>'
			});
			$('#service .readMoreService').each(function() {
				$(this).readmore({
					moreLink : '<a href="#"><span class="glyphicon glyphicon-plus"></span>View more</a>',
					collapsedHeight : 100,
					speed : 75,
					lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span>View less</a>'
				});
			});
			/* career category */
			$('.tech-talks').readmore({
				moreLink : '<a href="#"> Learn more</a>',
				collapsedHeight : 38,
				speed : 75,
				lessLink : '<a href="#"> View less</a>'
			});
		}

	}
};

/* returns page */
var distribution_list_view_more = {
	init : function(){
		$('.accordian h3 a').on('click', function(){
			/*if (win_width.init() < 767) {
				var list_obj = $(this).parents('.accordian');
				if(list_obj.attr('id') != 'topToListItem1'){
					list_obj = list_obj.find('ul');
					setTimeout(function() {
		     			$(list_obj).each(function(){
							$(this).readmore({
								moreLink : '<a href="#" class="rdmor"><span class="glyphicon glyphicon-plus"></span>View More</a>',
								collapsedHeight : 75,
								speed : 75,
								lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span>View Less</a>'
							});
						});
					}, 100);
				}
			}*/
		});
	}
};

var prod_browse_mob_view_more = {
	init : function() {
		if (isMobile.any() || win_width.init() < 768) {
			$('.responsive-tabs-container .accordion-link').last().on('click', function() {
				$('#Divisions .row > div ul').each(function() {
					$(this).readmore({
						moreLink : '<a href="#"><span class="glyphicon glyphicon-plus"></span>View more</a>',
						collapsedHeight : 120,
						speed : 75,
						lessLink : '<a href="#"><span class="glyphicon glyphicon-minus"></span>View less</a>'
					});
				});
			});
		}
	}
};

var radio_btn_header = {
	init : function() {
		$(".radio-btns a").click(function() {
			var ind = $(this).index();
			$('.input-group input').hide();
			$('.input-group input').eq(ind).show();
		});
		if ($('#inlineRadio1').length > 0) {
			if ($('#inlineRadio1').is(':checked')) {
				$('.input-group input').eq(1).hide();
			} else {
				$('.input-group input').eq(0).hide();
			}
			$("#inlineRadio1").on("click", function() {
				$('.input-group input').hide();
				$('#keyWord').show();
			});
			$("#inlineRadio2").on("click", function() {
				$('.input-group input').hide();
				$('#partNumber').show();
			});
		}
	}
};

var back_to_top = {
	init : function() {
		$('.back_top, .career_back_top, .back_top_Service').on('click', function() {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html,body').animate({
						scrollTop : target.offset().top - 50
					}, 1000);
					return false;
				}
			}
		});
	},
	onScroll : function() {
		if ($('#Divisions').length > 0) {
			var win_pos = $(window).scrollTop();
			var Top = win_pos - $('.accordion-link').last().position().top;
			$(".back_top").css("top", Top);
			if (win_pos > $('.accordion-link').last().position().top && win_pos < ($('#Divisions').position().top + $('#Divisions').height() - $('.back_top').height())) {
				$(".back_top").css('visibility', 'visible');
			} else {
				$(".back_top").css('visibility', 'hidden');
			}
		}
	}
};

var back_to_top_sort = {
	onScroll : function() {
		if ($('#sortList').length > 0) {
			var win_pos = $(window).scrollTop();
			var Top = win_pos - $('#topToListItem').position().top;
			//console.log(win_pos + ' '+ Top + ' ' + $('#sortList').height());
			$(".back_top").css("top", Top);
			if (Top > 0 && Top < $('#sortList').height() ) {
				$(".back_top").css('visibility', 'visible');
			} else {
				$(".back_top").css('visibility', 'hidden');
			}
		}
	}
};

var back_to_top_Career = {
	onScroll : function() {
		if ($('#careers').length > 0) {
			var Window_position = $(window).scrollTop();
			var Top_career = $('#careers .container').position().top;
			if (Window_position > Top_career) {
				$('.career_back_top').css("top", Window_position - Top_career);
			} else {
				$('.career_back_top').css("top", Top_career);
			}
		}
	}
};

var back_to_top_Services = {
	onScroll : function() {
		if ($('#service').length > 0) {
			var W_position = $(window).scrollTop();
			var Service_Top = $("#service .container").position().top;
			if (W_position > Service_Top) {
				$('.back_top_Service').css("top", W_position - Service_Top);
			} else {
				$('.back_top_Service').css("top", Service_Top);
			}
		}
	}
};

var product_browse_plp = {
	init : function() {
		if (isMobile.any() || win_width.init() < 768) {
			$('.checkbox-primary').each(function() {
				$(this).appendTo($(this).parents('.panel').find('.heading'));
			});
		}
		else{
			$('.heading').each(function() {
				$(this).find('.checkbox-primary').appendTo($(this).parents('.panel').find('#addToCompare'));
			});
		}
		
		$( "#toggleCollapse" ).click(function(){
			if($("#toggleSign").hasClass("glyphicon-plus")){
				$("#toggleSign").removeClass("glyphicon-plus");
				$("#toggleSign").addClass("glyphicon-minus");
			}
			else{
				$("#toggleSign").removeClass("glyphicon-minus");
				$("#toggleSign").addClass("glyphicon-plus");
			}
		});
	}
};

var placeholder = {
	init : function() {
		$('.form-control').placeholder();
	}
};

var slick_slider = {
	init : function() {

		$('.slider-for').slick({
			slidesToShow : 1,
			slidesToScroll : 1,
			arrows : false,
			fade : true,
			asNavFor : '.slider-nav'
		});
		$('.slider-nav').slick({
			slidesToShow : 3,
			slidesToScroll : 1,
			asNavFor : '.slider-for',
			dots : true,
			centerMode : true,
			focusOnSelect : true
		});
		$('.home_slider').slick({
			slidesToShow : 1,
			slidesToScroll : 1,
			arrows : false,
			fade : true,
			asNavFor : '.home-slider-nav'
		});
		$('.home-slider-nav').slick({
			slidesToShow : 5,
			slidesToScroll : 1,
			asNavFor : '.home_slider',
			arrows : false,
			dots : false,
			centerMode : true,
			focusOnSelect : true
		});
		$('.career-slider').slick({
			slidesToShow : 4,
			slidesToScroll : 1,
			arrows : true,
			slide : 'li',
			responsive : [
			{
				breakpoint : 767,
				settings : {
					slidesToShow : 1,
					slidesToScroll : 1,
					arrows : false,
					centerMode : true,

				}
			},
			{
				breakpoint : 1025,
				settings : {
					slidesToShow : 4,
					slidesToScroll : 1,
					arrows : false
				}
			}
			]
		});
		$('.discipline-slider').slick({
			slidesToShow : 4,
			slidesToScroll : 1,
			arrows : true,
			slide : 'li',
			responsive : [
			{
				breakpoint : 1025,
				settings : {
					slidesToShow : 4,
					slidesToScroll : 1,
					arrows : false
				}
			},
			{
				breakpoint : 767,
				settings : {
					slidesToShow : 1,
					slidesToScroll : 1,
					arrows : false,
					centerMode : true,
				}
			}
			]
		});
		$('.planDetails-slider').slick({
			slidesToShow : 4,
			slidesToScroll : 1,
			arrows : true,
			responsive : [{
				breakpoint : 767,
				settings : {
					slidesToShow : 1,
					slidesToScroll : 1,
					arrows : false,
					centerMode : true,
					variableWidth : true
				}
			}]
		});
		$('.client_slider').slick({
			slidesToShow : 6,
			slidesToScroll : 1,
			arrows : true,
			responsive : [{
				breakpoint : 767,
				settings : {
					slidesToShow : 1,
					slidesToScroll : 1,
					arrows : false,
					centerMode : true,
				}
			}, {
				breakpoint : 769,
				settings : {
					slidesToShow : 6,
					slidesToScroll : 1,
					arrows : false,
					centerMode : true,
				},
			}]
		});
		$('.cart_slider').slick({
			slidesToShow : 7,
			slidesToScroll : 1,
			arrows : true,
			slide : 'li',
			responsive : [{
				breakpoint : 767,
				settings : {
					slidesToShow : 1,
					slidesToScroll : 1,
					arrows : false,
					centerMode : true,
				}
			}]
		});
		$('.cart_empty_slider').slick({
			slidesToShow : 4,
			slidesToScroll : 1,
			arrows : true,
			slide : 'li',
			responsive : [{
				breakpoint : 767,
				settings : {
					slidesToShow : 1,
					slidesToScroll : 1,
					arrows : false,
					centerMode : true,
				}
			}]
		});
		$('.video_slider').slick({
			slidesToShow : 1,
			slidesToScroll : 1,
			arrows : true,
			responsive : [{
				breakpoint : 767,
				settings : {
					slidesToShow : 1,
					slidesToScroll : 1,
					arrows : false,
					centerMode : true,
				}
			}]
		});
		$('.related_slider,.CaseStudies_slider').slick({
			slidesToShow : 4,
			slidesToScroll : 1,
			arrows : true,
			infinite : false,
			responsive : [{
				breakpoint : 767,
				settings : {
					slidesToShow : 1,
					slidesToScroll : 1,
					arrows : false,
					infinite : true,
					centerMode : true,
					variableWidth : true
				}
			}]
		});

		$('.service_slider').slick({
			slidesToShow : 1,
			slidesToScroll : 1,
			arrows : false,
			fade : true,
			asNavFor : '.service-slider-nav'
		});
		$('.service-slider-nav').slick({
			slidesToShow : 5,
			slidesToScroll : 1,
			asNavFor : '.service_slider',
			arrows : false,
			dots : false,
			centerMode : true,
			focusOnSelect : true
		});
	},
	text_slider : function() {
		if ($(window).width() > 767) {
			$('.category_txt').slick({
				slide : 'li',
				slidesToShow : 5,
				slidesToScroll : 1,
				infinite : false,
				variableWidth : true,
				responsive : [{
					breakpoint : 768,
					settings : {
						slidesToShow : 3,
						slidesToScroll : 1,
						arrows : true,
						variableWidth : false
					}
				}]

			});
			$('#careers .career_txt').slick({
				slide : 'li',
				slidesToShow : 7,
				slidesToScroll : 1,
				infinite : false,
				variableWidth : true,
				responsive : [{
					breakpoint : 769,
					settings : {
						slidesToShow : 2,
						slidesToScroll : 1,
						arrows : false,
						variableWidth : true
					}
				}]

			});

			$('#service_type .slideTxt').slick({
				slide : 'li',
				slidesToShow : 5,
				slidesToScroll : 1,
				variableWidth : true,
				infinite : false,
				responsive : [{
					breakpoint : 769,
					settings : {
						slidesToShow : 3,
						slidesToScroll : 1,
						arrows : false,
						variableWidth : true

					}
				}]
			});
			$('#newsroom-home .slideTxt').slick({
				slide : 'li',
				slidesToShow : 6,
				slidesToScroll : 1,
				infinite : false,
				variableWidth : true,
				responsive : [{
					breakpoint : 769,
					settings : {
						slidesToShow : 3,
						slidesToScroll : 1,
						arrows : true,
						variableWidth : false
					}
				}]

			});

		} else {
			$('.slideTxt').slick('unslick');
		}
	},
	set_border : function() {
		if ($('.slideTxt button').length) {
			$(".slideTxt").css({
				'border-left' : '1px solid #C0C0C0',
				'border-right' : '1px solid #C0C0C0'
			});
		} else {
			$(".slideTxt").css({
				'border-left' : '1px solid #4a4a4a',
				'border-right' : 'none'
			});
		}
	}
};
var dev_equalHeight = function(group) {
	var setTime8 = setTimeout(function() {
		//console.log(group);
		var tallest = 0;
		group.height("auto");
		group.each(function() {

			var thisHeight = $(this).height();
			if (thisHeight > tallest) {
				tallest = thisHeight;
			}

			clearTimeout(setTime8);
		});
		group.height(tallest);
	}, 300);
};

var light_Case = {
	init : function() {
		$('a[data-rel^=lightcase]').lightcase();
	}
};
var collapsible_slider = {
	init : function() {
		if ($(window).width() > 767) {
			$("#browse").hide();
			$("#collapseExample").collapse('show');
		} else {
			$("#collapseExample").collapse('hide');
			$("#browse").show();
		}
	}
};
var scroll_smooth = {
	init : function() {
		var initialPage = document.URL;
		$(".slideTxt .slick-slide a").click(function(e) {
			e.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop : $(hash).offset().top
			}, 300, function() {
				//window.location.hash = hash;
			});
		});

	},
	scrollToAnchor : function(aid) {
		var aTag = $("a[name='" + aid + "']");
		$('html,body').animate({
			scrollTop : aTag.offset().top
		}, 'slow');
	}
};
var drop_down = {
	init : function() {
		$(".dropdown-menu li a").click(function(e) {
			e.preventDefault();
			var selText = $(this).text();
			$(this).parents('.dropdown').find('.dropdown-toggle').html(selText + ' <span class="arrow-wrapper"><span class="arrow"></span></span>');
		});
	}
};
var tooltip = {
	init : function() {
		$('[data-toggle="tooltip"]').tooltip();
	}
};
var set_background = {
	init : function() {
		$(".home_slider .inner-sDiv img,.service_slider .inner-sDiv img").each(function() {
			$(this).parent().css({
				"background-image" : "url(" + $(this).attr("src") + ")",
				"background-size" : "cover"
			});
		});
	}
};
var set_nabar_fixed = {
	init : function() {
		$('#nav').affix({
			offset : {
				top : $('.slider_section').height() - $('#nav').height(),
				left : 0
			}
		});

		$('body').scrollspy({
			target : '#collapseExample'
		});
	}
};

var toggle_dropDown_arrow = {
	init : function() {
		$("#dLabel").click(function() {
			var aria_expanded = $(".my-account .dropdown #dLabel").attr("aria-expanded");
			if (aria_expanded == "true") {
				$("#dLabel").addClass("collapsed");
			} else {
				$("#dLabel").removeClass("collapsed");
			}
		});

	}
};

var iscroll = {
	init : function() {
		$('.privacyLink').on('click', function() {
			setTimeout(function() {
				$('.scroll-pane').tinyscrollbar();
			}, 500);
		});
	}
};

var add_tap_to_close={
	init:function(){
			$(".navheaderButton").click(function(){
				if($(".wrapper").hasClass("content_push"))
				{
					setTimeout(function(){
						$(".wrapper section").click(function(){
							$(".wrapper").removeClass("content_push");
							$(".nav_primary").removeClass("nav_mob_show");
							$(".navheaderButton").removeClass("opened");
						});
					},100);
				}
				else{
					$(".wrapper section").unbind();
				}
			});
	}
};

var desktop_facet = {
	init:function(){
		if (win_width.init() > 1024) {
			var heightVal = $("#category").find("#productListingServiceAllArea").height();
			var heightValUpdated = heightVal + 67;
			$("#category").find("#filterDiv").css("height", heightValUpdated);
		
			$("#filterDiv").find("#toggleCollapse").removeClass('collapsed').text("Filter Products").removeAttr("data-toggle").attr("href", "javascript:void(0)");
			$("#filterDiv").find("#filter").addClass("product-filter collapse in").attr("aria-expanded","true");
			
			$('#filterDiv #accordion-filter').find('.panel-heading a').attr('data-parent', '');
			
			if($("#category").find("#filterDiv .panel-group").children().is("div")){
				$("#category").find("#filterDiv").addClass('filter');
				$(".category_section_div").find("#content").css('width', '72.7%%');
			}
			else {
				$("#category").find("#filterDiv").removeClass('filter');
				$(".category_section_div").find("#content").css('width', '100%'); 
			}
		}
		
		else if (isMobile.any() || isTablet.any() || win_width.init() < 1024) {
			$("#category").find("#filterDiv").css("height", "auto");
			$("#filterDiv").find("#toggleCollapse").text("click here ").append('<span class="filter-product">'+'to Filter Products'+'</span> <span class="glyphicon glyphicon-plus filter-right" id="toggleSign"></span>').addClass('collapsed').attr("data-toggle", "collapse").attr("href", "#filter").attr("aria-expanded","false");
			$("#filterDiv").find("#filter").removeClass("in").attr("aria-expanded","false");
			
			$('#filterDiv #accordion-filter').find('.panel-heading a').attr('data-parent','#accordion-filter');
		}
	}	
};

var desktop_filter_selection = {
	init:function(){
		if (win_width.init() > 1024) {
			var desktop_filter = $(".category_section_div").find(".filterBreadcrumb_desktop li");
			if (desktop_filter.length == 0){
				desktop_filter.parent('ul').css('padding', '0');
			}
			else {
				desktop_filter.parent('ul').css('padding', '15px 0 15px 40px');

				var heightVal = $("#category").find("#productListingServiceAllArea").height();
				var heightValUpdated = heightVal + 116;
				$("#category").find("#filterDiv").css("height", heightValUpdated);
			}
		}
	}
};

var desktop_facet_toggle = {
	init:function(){
		if (win_width.init() > 1024) {
			$('#filterDiv #accordion-filter').find('.panel-heading').each(function(linkIndex, objLink){
					
					var jFilterToggleHeight = $(this).siblings().height();

				$(this).on('click', function(event, wasTriggered){

					var jFilterIdHeight = $(this).parents("#filter").height();
					var jFilterSearchArea1 = $(this).parents(".category_container_div").find(".category").height();
					var jFilterSearchArea2 = $(this).parents(".category_container_div").find(".category").height();
			
			//      var x = jFilterIdHeight + 500;
					var x = jFilterIdHeight + jFilterToggleHeight;

					var jSearchAreaPadBottom =  parseInt($(this).parents(".category_container_div").find(".category").css('padding-bottom').replace("px", ""));

					if(x > jFilterSearchArea1 && ($(this).find("span").hasClass("glyphicon-plus"))){
					//		jSearchAreaPadBottom += 400;
							jSearchAreaPadBottom += jFilterToggleHeight;
							$(this).parents(".category_container_div").find(".category").css('padding-bottom', jSearchAreaPadBottom + "px");

							var jModifiedSearchAreaHeight = $(this).parents(".category_container_div").find(".category").innerHeight() + 1;
							$(this).parents("#filterDiv").css("height", jModifiedSearchAreaHeight);
					}

					if(jFilterIdHeight > jFilterSearchArea2 && ($(this).find("span").hasClass("glyphicon-minus"))){
					//		jSearchAreaPadBottom -= 400;
							jSearchAreaPadBottom -= jFilterToggleHeight;
							$(this).parents(".category_container_div").find(".category").css('padding-bottom', jSearchAreaPadBottom + "px");

							var jModifiedSearchAreaHeight = $(this).parents(".category_container_div").find(".category").innerHeight();
							$(this).parents("#filterDiv").css("height", jModifiedSearchAreaHeight);
					}
				});
			});
		}
		
		else if (isMobile.any() || isTablet.any() || win_width.init() < 1024) {
			$(this).parents(".category_container_div").find(".category").css('padding-bottom', "32px");
			$(this).parents("#filterDiv").css("height", "auto");
		}
	}
};

var services_header_facet_toggle = {
	init:function(){
		$('#productsFacets').find('fieldset').each(function(linkIndex1, objLink1) {
		
			$(this).find('.header.bottom_border').on('click', function() {
			
				var jHeaderElem = $(this).parents('fieldset');
				
				if (jHeaderElem.find('.section_list.bottom_border').is(':hidden') && (jHeaderElem.find('.section_list.bottom_border').css('display') == 'none')) {				
					$(this).find('.header_title').css("color", "#fff");
					
					if (win_width.init() > 1024) {
						$(this).css("background-color", "#3e3e3e");
						jHeaderElem.css("background-color", "#3e3e3e");
					}
					
					else if (isMobile.any() || isTablet.any() || win_width.init() < 1024) {
						$(this).css("background-color", "#a7a396");
						jHeaderElem.css("background-color", "#a7a396");
					}
				}
				
				if (jHeaderElem.find('.section_list.bottom_border').is(':visible') && (jHeaderElem.find('.section_list.bottom_border').css('display') == 'block')) {
					$(this).css("background-color", "#fff");
					jHeaderElem.css("background-color", "#fff");
					$(this).find('.header_title').css("color", "#000");
				}
			});
		});
	}
};

var category_facet_checkbox_selection = {
	init:function(){
		if (win_width.init() > 1024) {
		
		$("#services_category_section_div").find("#clear_all_filter").on('click', function() {
			$(this).parents("#category_container_div_Id").find("#productsFacets").find(".section_list.bottom_border").css("display", "none");
			$(this).parents("#category_container_div_Id").find("#productsFacets").find(".header.bottom_border span").removeClass("expand_icon_open");
			$(this).parents("#category_container_div_Id").find("#productsFacets").find(".header.bottom_border span").addClass("expand_icon_close");
			$(this).parents("#category_container_div_Id").find("#productsFacets fieldset").css("background-color", "#fff");
			$(this).parents("#category_container_div_Id").find("#productsFacets").find(".header.bottom_border").css("background-color", "#fff");
			$(this).parents("#category_container_div_Id").find("#productsFacets").find(".header.bottom_border .header_title").css("color", "#000");
		});
	}
	
		else if (isMobile.any() || isTablet.any() || win_width.init() < 1024) {
			//console.log("mobile only");
		}
	}
};

var category_facet_mobile_filter_display = {
	init:function(){
		if (win_width.init() > 1024) {
			$("#category_container_div_Id").find(".content_section.bottom_border_5px #search_facet_category_heading").css("background-color", "#ffb91d");
		}
	
		else if (isMobile.any() || isTablet.any() || win_width.init() < 1024) {
					
			$("#CategoriesDisplayPage").find("#filterDiv .mobile_facet_filter").on('click', function() {
				$("#widget_left_nav").css("min-height",$(window).height()-50);
				
				$(this).parents("#CategoriesDisplayPage").find(".wrapper").addClass("hideContainer");
				$(this).parents("#CategoriesDisplayPage").find(".greyBar.headerBGHome-division").addClass("hideContainer");
				$(this).parents("#CategoriesDisplayPage").find(".page-header").addClass("hideContainer");
				$(this).parents("#CategoriesDisplayPage").find(".info_section.contact").addClass("hideContainer");
				$(this).parents("#CategoriesDisplayPage").find(".footer_wrapper_position").addClass("hideContainer");
				$(this).parents("#CategoriesDisplayPage").find("#services_category_section_div").addClass("hideContainer");
				$(this).parents("#CategoriesDisplayPage").find("#filterDiv .mobile_sort_by_filter").addClass("hideContainer");
				
				
				$(this).parents("#CategoriesDisplayPage").find("#category_container_div_Id #widget_left_nav").addClass("showContainer");
				$(this).addClass("mobile_facet_show_Wrapper");
				$(this).find("a.clear_all_btn").addClass("showContainer");
				$(this).find("a.done_btn").addClass("showContainer");
				$(this).parents("#category_container_div_Id").find(".clearAllWrapper_mobile").removeClass("hideContainer");
				$(this).parents(".container").addClass("resizeContainer");
				$(this).parents("#category_container_div_Id").find(".content_section.bottom_border_5px #search_facet_category_heading").css("background-color", "#a7a396");
				$(this).parents("#category_container_div_Id").find(".content_section.bottom_border_5px #search_facet_category_heading").css("color", "#fff");
				$(this).parents("#category_container_div_Id").find(".content_section.bottom_border_5px #search_facet_category_heading").find("#prod_cat_expand_icon").removeClass("expand_icon_open").addClass("expand_icon_close");
				$(this).parents("#category_container_div_Id").find(".content_section.bottom_border_5px #search_facet_category").css("display", "block");
				$(this).parents("#category_container_div_Id").find(".content_section.bottom_border_5px").css("margin-bottom", "-9px");
			        setIconHeight();
			});
		
			$("#CategoriesDisplayPage").find(".mobile_facet_filter .clear_all_btn").on('click', function(event) {
				event.stopPropagation();
				$(this).parents("#CategoriesDisplayPage").find(".wrapper").removeClass("hideContainer");
				$(this).parents("#CategoriesDisplayPage").find(".greyBar.headerBGHome-division").removeClass("hideContainer");
				$(this).parents("#CategoriesDisplayPage").find(".page-header").removeClass("hideContainer");
				$(this).parents("#CategoriesDisplayPage").find(".info_section.contact").removeClass("hideContainer");
				$(this).parents("#CategoriesDisplayPage").find(".footer_wrapper_position").removeClass("hideContainer");
				$(this).parents("#CategoriesDisplayPage").find("#services_category_section_div").removeClass("hideContainer");
				$(this).parents("#CategoriesDisplayPage").find("#filterDiv .mobile_sort_by_filter").removeClass("hideContainer");
							
				$(this).parents("#CategoriesDisplayPage").find("#category_container_div_Id #widget_left_nav").removeClass("showContainer");
				$(this).parent().removeClass("mobile_facet_show_Wrapper");
				$(this).removeClass("showContainer");
				$(this).siblings(".done_btn").removeClass("showContainer");
				$(this).parents("#category_container_div_Id").find(".clearAllWrapper_mobile").addClass("hideContainer");
				$(this).parents(".container").removeClass("resizeContainer");
				$(this).parents("#CategoriesDisplayPage").find("#services_category_section_div .clear_all_facet").addClass("hideContainer");
				$(this).parents("#CategoriesDisplayPage").find("#services_category_section_div #facetFilterListWrapper").html("");
				$(this).siblings("#facet_open_bracket").css("display", "none");
				$(this).siblings("#facet_close_bracket").css("display", "none");
				$(this).siblings("#selectedFacetCount").html("");
				
				$(this).parents("#CategoriesDisplayPage").find("#productsFacets fieldset").css("background-color", "#fff");
				$(this).parents("#CategoriesDisplayPage").find("#productsFacets .header.bottom_border").css("background-color", "#fff");
				$(this).parents("#CategoriesDisplayPage").find("#productsFacets .header.bottom_border").find("span").removeClass("expand_icon_open").addClass("expand_icon_close");
				$(this).parents("#CategoriesDisplayPage").find("#productsFacets .header_title").css("color", "#000000");
				$(this).parents("#CategoriesDisplayPage").find("#productsFacets fieldset").find(".section_list.bottom_border").css("display", "none");
				$(this).parents("#CategoriesDisplayPage").find("#productsFacets #displaycat").css("display", "none");
				$(this).parents("#CategoriesDisplayPage").find("#productsFacets #displaycat").html("");
			});

			$("#search_facet_category_heading").on('click', function() {
				var cat_expand_icon = $(this).find("span#prod_cat_expand_icon");
				
				if(cat_expand_icon.hasClass("expand_icon_open")) {
					cat_expand_icon.removeClass("expand_icon_open")
					cat_expand_icon.addClass("expand_icon_close");
					$(this).css("background-color", "#a7a396");
					$(this).find(".header_title").css("color", "#fff");
					$(this).find(".facet_cat_current_title_name").css("color", "#fff");
					$(this).siblings("#search_facet_category").css("display", "block");
					$(this).siblings("#search_facet_category").css("margin-bottom", "-9px");
				}
				
				else if(cat_expand_icon.hasClass("expand_icon_close")) {
					cat_expand_icon.removeClass("expand_icon_close")
					cat_expand_icon.addClass("expand_icon_open");
					$(this).siblings("#search_facet_category").css("display", "none");
					$(this).css("background-color", "#fff1cd");
					$(this).find(".header_title").css("color", "#000");
					$(this).find(".facet_cat_current_title_name").css("color", "#000"); 
					$(this).siblings("#search_facet_category").css("margin-bottom", "0");
				}
			});
		}
	}
};

$(document).ready(function() {
	services_header_facet_toggle.init();
	category_facet_checkbox_selection.init();
	category_facet_mobile_filter_display.init();
	desktop_facet.init();
	desktop_filter_selection.init();
	desktop_facet_toggle.init();
	collapse.init();
	search_section_collapse.init();
	navHamburger.init();
	cartFunctionality.init();
	responsive_tabs.init();
	read_more.init();
	distribution_list_view_more.init();
	radio_btn_header.init();
	prod_browse_mob_view_more.init();
	/* back to top */
	back_to_top.init();
	back_to_top.onScroll();
	back_to_top_sort.onScroll();
	back_to_top_Career.onScroll();
	back_to_top_Services.onScroll();
	product_browse_plp.init();
	placeholder.init();
	iscroll.init();
	add_tap_to_close.init();
	if ($('.slider_section').length) {
		set_background.init();
		slick_slider.init();
		slick_slider.text_slider();
		light_Case.init();
	}
	slick_slider.set_border();
	collapsible_slider.init();
	scroll_smooth.init();
	drop_down.init();
	tooltip.init();
	set_nabar_fixed.init();
	var p = $(".discipline-slider li");
	dev_equalHeight((p));
	toggle_dropDown_arrow.init();
	product_browse_pdp.init();
});

$(window).on("resize", function() {
	services_header_facet_toggle.init();
	category_facet_checkbox_selection.init();
	category_facet_mobile_filter_display.init();
	desktop_facet.init();
	desktop_filter_selection.init();
	desktop_facet_toggle.init();
	collapse.init();
	search_section_collapse.init();
	navHamburger.resize();
	product_browse_plp.init();
	read_more.init();
	collapsible_slider.init();
	var p = $(".discipline-slider li");
	dev_equalHeight((p));
	
	if (win_width.init() > 1024) {
		$("#category_container_div_Id").find(".content_section.bottom_border_5px #search_facet_category_heading").css("background-color", "#ffb91d");
	}
	
	else if (isMobile.any() || isTablet.any() || win_width.init() < 1024) {
		$("#category_container_div_Id").find(".content_section.bottom_border_5px #search_facet_category_heading").css("background-color", "#a7a396");
	$("#widget_left_nav").css("min-height",$(window).height()-50);
	}
});

$(window).scroll(function() {
	back_to_top.onScroll();
	back_to_top_sort.onScroll();
	back_to_top_Career.onScroll();
	back_to_top_Services.onScroll();
});
var product_browse_pdp = {
	init : function() {
		if($("#div1").length==0){
			$("#productMainImage").parents(".col-xs-5").addClass("img-size");
		}
		else{
			$("#productMainImage").parents(".col-xs-5").removeClass("img-size");
		}
	}
};
$(window).load(function(){
$("#biStateDropdown").click(function(e) {
	//alert("dropdown click");
	drop_down.init();
});
/*if (isMobile.any() || win_width.init() < 768) {
mobile_compare();
}*/
//blackBgContainer();
if (win_width.init() > 1024) {
    setIconHeight();
}
});

//custom uploads
$('document').ready(function(){

	$('#show-hide-upload-section').click(function(){
        $('.submit-request-for-quote .upload-section').show();
        $('.submit-request-for-quote .upload').show();
        $('#show-hide-upload-section').hide();
        
    });

	$('#quote-upload-btn-1').change(function() {
		$('#quote-upload-file-1').val($(this).val().replace(/.*(\/|\\)/, ''));
		$('#file-container-remove-class-two').removeClass('notactive');;
	});

	$('#quote-upload-btn-2').change(function() {
		$('#quote-upload-file-2').val($(this).val().replace(/.*(\/|\\)/, ''));
		$('#file-container-remove-class-three').removeClass('notactive');
	});

	$('#quote-upload-btn-3').change(function() {
		$('#quote-upload-file-3').val($(this).val().replace(/.*(\/|\\)/, ''));
	});
	
	$('.toggle-more-details').click(function(){
		var $this = $(this);
       if($this.attr('aria-expanded') == 'false') {
			$this.children('span.OrderInformationMoreDetailsShow').hide();
			$this.children('span.OrderInformationMoreDetailsHide').show();
	   }
	   else	{
			if($this.attr('aria-expanded') == 'true') {
				$this.children('span.OrderInformationMoreDetailsShow').show();
				$this.children('span.OrderInformationMoreDetailsHide').hide();
			}
	   }       
    });

});

var getItemPrice = function(qtyObj){
	
	var qty	=	(qtyObj !=null && qtyObj !='undefined') ? qtyObj.value : 1;
	var price;
	var currency = "";
	
	$( ".price.bold" ).each(function( index ) {
		
		if(index == 0){
			price	=	$.trim(this.innerHTML);
		}
		else{
			
			var priceRange	=	$.trim(this.innerHTML).split(":");
			var qtyRange	=	priceRange[0].split("-");
			if(qty >= parseInt($.trim(qtyRange[0]))){
				price	=	$.trim(priceRange[1]);
			}
		}
		if($("#price1_1").length > 0){
			if(this.id == 'price'){
				this.style.display = "none";
			}
		}
	});
	if(price !=null){
		currency	=	price.substring(0,1);
		price		=	(price.substring(1,price.length)*qty).toFixed(2);
	}
	$( "#price_box" ).html(currency+price);
};

/******************Start:Facet Attribute Display***************/
var delAttribute=function(del_Attr){
	$(del_Attr).remove();
}
var selectedSearchFilter =function(element, id, section){
	var displayAttribute;
	var facetLabel="#"+"facetLabel_";
	var facetLabelID=facetLabel+id;
	var facetAttributeName=$(facetLabelID).html();
	if(element.checked) {
	   displayAttribute= $(facetLabelID).parents(".content_section").find("#displaycat").html();
		if(displayAttribute==""){
			displayAttribute= "<span id=dis_Cat_"+id+">"+facetAttributeName+"</span>"; 
			$(facetLabelID).parents(".content_section").find("#displaycat").html(displayAttribute); 
		}
	else{
		displayAttribute += "<span id=dis_Cat_"+id+">"+',&nbsp;'+facetAttributeName+"</span>";
		$(facetLabelID).parents(".content_section").find("#displaycat").html(displayAttribute);
		}
	}
	else{
		var del_id="#dis_Cat_"+id;
		delAttribute(del_id);
	}
}
/***********************END:Facet Attribute Dispaly**********/
/****************Start:Compare button Alignmnet**************/

/*var mobile_compare =function(){
//console.log("i am called");
$(".product .product_info").each(function(item,value){
var h=$(this).find(".product_name").height();
$(this).siblings(".button_configure").find(".addToComp").css({"top":h});
});
}*/
/****************Start:Compare button Alignmnet************/

var blackBgContainer=function(){
	//console.log("blackBgContainer called");
	var bContainer=$("#buttonRow").html();
	$("#buttonRow").remove();
	var bContainerHtml= "<div id='buttonRow' class='black-bg black-bg-bottom'>"+bContainer+"</div>";
	//console.log(bContainerHtml);
	$(".add-bottom-black").after(bContainerHtml);
	$("#buttonRow").show();	
}
var setIconHeight=function(){
	$("#productsFacets .content_section").each(function() {
	var title_Height=$(this).find(".bottom_border").innerHeight();
	$(this).find(".expand_icon_close").height(title_Height);
	});	
}