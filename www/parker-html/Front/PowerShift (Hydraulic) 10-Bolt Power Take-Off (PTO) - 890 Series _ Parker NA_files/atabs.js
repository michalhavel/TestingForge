/* ATabs by Cameron Wardzala */
var ATabs = function (t,options) {
	var $this = this,
		defaults = {mode:"tabs",defaultTab:1},
		o = dojo.mixin(defaults,options), tcont;
	dojo.query(t).forEach(function (node,i) {
		tcont = node;
		this.methods = {
			tabs: function (elm,href) {
				if (dojo.hasClass(elm,'active') || dojo.hasClass(elm,'disabled')) { return; }
				dojo.query('.open', tcont).addClass('hidden').removeClass('open');
				dojo.query('.active', tcont).removeClass('active');
				dojo.query('#'+href, tcont).removeClass("hidden").addClass('open');
				dojo.addClass(elm, 'active');
			},
			accordion: function (elm,href) {
				if (dojo.hasClass(elm.parentNode,'disabled')) { return; }

				if (dojo.hasClass(elm,'active')) {
					dojo.removeClass(elm,'active');
					dojo.query('#'+href, tcont).removeClass("open").addClass('hidden');
				} else {
					dojo.addClass(elm.parentNode,'active');
					dojo.query('#'+href, tcont).removeClass("hidden").addClass('open');
				}
			},
			Setup: function () {
				// bind click event to triggers
				dojo.query(".trigger", tcont).forEach(function (node,index) {
					if (index === (o.defaultTab-1)) { dojo.addClass(node,'active'); }
					dojo.connect(node, "click", function (e) {
						e.preventDefault();
						var href = node.href.split('#')[1];
						$this.methods[o.mode](node,href);
					});
				});

				// Hide Targets
				dojo.query('.target', tcont).forEach(function (node,i) {
					if (i !== (o.defaultTab-1)) {
						dojo.addClass(node,'hidden');
					} else {
						dojo.addClass(node,'open');
					}
				});
			}
		};
		this.methods.Setup();
	});
};