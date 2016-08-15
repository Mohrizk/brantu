/*!
 * Bootstrap v3.2.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.2.0",d.prototype.close=function(b){function c(){f.detach().trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",c).emulateTransitionEnd(150):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.2.0",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),d[e](null==f[b]?this.options[b]:f[b]),setTimeout(a.proxy(function(){"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b).on("keydown.bs.carousel",a.proxy(this.keydown,this)),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.2.0",c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},c.prototype.keydown=function(a){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.to=function(b){var c=this,d=this.getItemIndex(this.$active=this.$element.find(".item.active"));return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}if(e.hasClass("active"))return this.sliding=!1;var j=e[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:g});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,f&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(e)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:g});return a.support.transition&&this.$element.hasClass("slide")?(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one("bsTransitionEnd",function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(1e3*d.css("transition-duration").slice(0,-1))):(d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger(m)),f&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b);!e&&f.toggle&&"show"==b&&(b=!b),e||d.data("bs.collapse",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};c.VERSION="3.2.0",c.DEFAULTS={toggle:!0},c.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},c.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var c=a.Event("show.bs.collapse");if(this.$element.trigger(c),!c.isDefaultPrevented()){var d=this.$parent&&this.$parent.find("> .panel > .in");if(d&&d.length){var e=d.data("bs.collapse");if(e&&e.transitioning)return;b.call(d,"hide"),e||d.data("bs.collapse",null)}var f=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[f](0),this.transitioning=1;var g=function(){this.$element.removeClass("collapsing").addClass("collapse in")[f](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return g.call(this);var h=a.camelCase(["scroll",f].join("-"));this.$element.one("bsTransitionEnd",a.proxy(g,this)).emulateTransitionEnd(350)[f](this.$element[0][h])}}},c.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(d,this)).emulateTransitionEnd(350):d.call(this)}}},c.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var d=a.fn.collapse;a.fn.collapse=b,a.fn.collapse.Constructor=c,a.fn.collapse.noConflict=function(){return a.fn.collapse=d,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(c){var d,e=a(this),f=e.attr("data-target")||c.preventDefault()||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),g=a(f),h=g.data("bs.collapse"),i=h?"toggle":e.data(),j=e.attr("data-parent"),k=j&&a(j);h&&h.transitioning||(k&&k.find('[data-toggle="collapse"][data-parent="'+j+'"]').not(e).addClass("collapsed"),e[g.hasClass("in")?"addClass":"removeClass"]("collapsed")),b.call(g,i)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=c(a(this)),e={relatedTarget:this};d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown",e)),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown",e))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.2.0",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.divider):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(i.filter(":focus"));38==b.keyCode&&j>0&&j--,40==b.keyCode&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f+', [role="menu"], [role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.2.0",c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.$body.addClass("modal-open"),this.setScrollbar(),this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(c.$body),c.$element.show().scrollTop(0),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one("bsTransitionEnd",function(){c.$element.trigger("focus").trigger(e)}).emulateTransitionEnd(300):c.$element.trigger("focus").trigger(e)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.$body.removeClass("modal-open"),this.resetScrollbar(),this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var c=this,d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var e=a.support.transition&&d;if(this.$backdrop=a('<div class="modal-backdrop '+d+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),e&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;e?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(150):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var f=function(){c.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",f).emulateTransitionEnd(150):f()}else b&&b()},c.prototype.checkScrollbar=function(){document.body.clientWidth>=window.innerWidth||(this.scrollbarWidth=this.scrollbarWidth||this.measureScrollbar())},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.scrollbarWidth&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.2.0",c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show()},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var c=a.contains(document.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!c)return;var d=this,e=this.tip(),f=this.getUID(this.type);this.setContent(),e.attr("id",f),this.$element.attr("aria-describedby",f),this.options.animation&&e.addClass("fade");var g="function"==typeof this.options.placement?this.options.placement.call(this,e[0],this.$element[0]):this.options.placement,h=/\s?auto?\s?/i,i=h.test(g);i&&(g=g.replace(h,"")||"top"),e.detach().css({top:0,left:0,display:"block"}).addClass(g).data("bs."+this.type,this),this.options.container?e.appendTo(this.options.container):e.insertAfter(this.$element);var j=this.getPosition(),k=e[0].offsetWidth,l=e[0].offsetHeight;if(i){var m=g,n=this.$element.parent(),o=this.getPosition(n);g="bottom"==g&&j.top+j.height+l-o.scroll>o.height?"top":"top"==g&&j.top-o.scroll-l<0?"bottom":"right"==g&&j.right+k>o.width?"left":"left"==g&&j.left-k<o.left?"right":g,e.removeClass(m).addClass(g)}var p=this.getCalculatedOffset(g,j,k,l);this.applyPlacement(p,g);var q=function(){d.$element.trigger("shown.bs."+d.type),d.hoverState=null};a.support.transition&&this.$tip.hasClass("fade")?e.one("bsTransitionEnd",q).emulateTransitionEnd(150):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=k.left?2*k.left-e+i:2*k.top-f+j,m=k.left?"left":"top",n=k.left?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(l,d[0][n],m)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach(),c.$element.trigger("hidden.bs."+c.type)}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.removeAttr("aria-describedby"),this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one("bsTransitionEnd",b).emulateTransitionEnd(150):b(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName;return a.extend({},"function"==typeof c.getBoundingClientRect?c.getBoundingClientRect():null,{scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop(),width:d?a(window).width():b.outerWidth(),height:d?a(window).height():b.outerHeight()},d?{top:0,left:0}:b.offset())},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.2.0",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").empty()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},c.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){var e=a.proxy(this.process,this);this.$body=a("body"),this.$scrollElement=a(a(c).is("body")?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",e),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.2.0",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b="offset",c=0;a.isWindow(this.$scrollElement[0])||(b="position",c=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var d=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+c,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){d.offsets.push(this[0]),d.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<=e[0])return g!=(a=f[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.2.0",c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.closest("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},c.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one("bsTransitionEnd",e).emulateTransitionEnd(150):e(),f.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(c){c.preventDefault(),b.call(a(this),"show")})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.2.0",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=a(document).height(),d=this.$target.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top(this.$element)),"function"==typeof h&&(h=f.bottom(this.$element));var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=b-h?"bottom":null!=g&&g>=d?"top":!1;if(this.affixed!==i){null!=this.unpin&&this.$element.css("top","");var j="affix"+(i?"-"+i:""),k=a.Event(j+".bs.affix");this.$element.trigger(k),k.isDefaultPrevented()||(this.affixed=i,this.unpin="bottom"==i?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(j).trigger(a.Event(j.replace("affix","affixed"))),"bottom"==i&&this.$element.offset({top:b-this.$element.height()-h}))}}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},d.offsetBottom&&(d.offset.bottom=d.offsetBottom),d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
/*!

 handlebars v4.0.5

Copyright (C) 2011-2015 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Handlebars"] = factory();
	else
		root["Handlebars"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _handlebarsRuntime = __webpack_require__(2);

	var _handlebarsRuntime2 = _interopRequireDefault(_handlebarsRuntime);

	// Compiler imports

	var _handlebarsCompilerAst = __webpack_require__(21);

	var _handlebarsCompilerAst2 = _interopRequireDefault(_handlebarsCompilerAst);

	var _handlebarsCompilerBase = __webpack_require__(22);

	var _handlebarsCompilerCompiler = __webpack_require__(27);

	var _handlebarsCompilerJavascriptCompiler = __webpack_require__(28);

	var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(_handlebarsCompilerJavascriptCompiler);

	var _handlebarsCompilerVisitor = __webpack_require__(25);

	var _handlebarsCompilerVisitor2 = _interopRequireDefault(_handlebarsCompilerVisitor);

	var _handlebarsNoConflict = __webpack_require__(20);

	var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

	var _create = _handlebarsRuntime2['default'].create;
	function create() {
	  var hb = _create();

	  hb.compile = function (input, options) {
	    return _handlebarsCompilerCompiler.compile(input, options, hb);
	  };
	  hb.precompile = function (input, options) {
	    return _handlebarsCompilerCompiler.precompile(input, options, hb);
	  };

	  hb.AST = _handlebarsCompilerAst2['default'];
	  hb.Compiler = _handlebarsCompilerCompiler.Compiler;
	  hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2['default'];
	  hb.Parser = _handlebarsCompilerBase.parser;
	  hb.parse = _handlebarsCompilerBase.parse;

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_handlebarsNoConflict2['default'](inst);

	inst.Visitor = _handlebarsCompilerVisitor2['default'];

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(3)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _handlebarsBase = __webpack_require__(4);

	var base = _interopRequireWildcard(_handlebarsBase);

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)

	var _handlebarsSafeString = __webpack_require__(18);

	var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

	var _handlebarsException = __webpack_require__(6);

	var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

	var _handlebarsUtils = __webpack_require__(5);

	var Utils = _interopRequireWildcard(_handlebarsUtils);

	var _handlebarsRuntime = __webpack_require__(19);

	var runtime = _interopRequireWildcard(_handlebarsRuntime);

	var _handlebarsNoConflict = __webpack_require__(20);

	var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	function create() {
	  var hb = new base.HandlebarsEnvironment();

	  Utils.extend(hb, base);
	  hb.SafeString = _handlebarsSafeString2['default'];
	  hb.Exception = _handlebarsException2['default'];
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;

	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);
	  };

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_handlebarsNoConflict2['default'](inst);

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};

	    if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }

	    newObj["default"] = obj;
	    return newObj;
	  }
	};

	exports.__esModule = true;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.HandlebarsEnvironment = HandlebarsEnvironment;

	var _utils = __webpack_require__(5);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _helpers = __webpack_require__(7);

	var _decorators = __webpack_require__(15);

	var _logger = __webpack_require__(17);

	var _logger2 = _interopRequireDefault(_logger);

	var VERSION = '4.0.5';
	exports.VERSION = VERSION;
	var COMPILER_REVISION = 7;

	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1',
	  7: '>= 4.0.0'
	};

	exports.REVISION_CHANGES = REVISION_CHANGES;
	var objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials, decorators) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};
	  this.decorators = decorators || {};

	  _helpers.registerDefaultHelpers(this);
	  _decorators.registerDefaultDecorators(this);
	}

	HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: _logger2['default'],
	  log: _logger2['default'].log,

	  registerHelper: function registerHelper(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple helpers');
	      }
	      _utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },

	  registerPartial: function registerPartial(name, partial) {
	    if (_utils.toString.call(name) === objectType) {
	      _utils.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  },

	  registerDecorator: function registerDecorator(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple decorators');
	      }
	      _utils.extend(this.decorators, name);
	    } else {
	      this.decorators[name] = fn;
	    }
	  },
	  unregisterDecorator: function unregisterDecorator(name) {
	    delete this.decorators[name];
	  }
	};

	var log = _logger2['default'].log;

	exports.log = log;
	exports.createFrame = _utils.createFrame;
	exports.logger = _logger2['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.extend = extend;
	exports.indexOf = indexOf;
	exports.escapeExpression = escapeExpression;
	exports.isEmpty = isEmpty;
	exports.createFrame = createFrame;
	exports.blockParams = blockParams;
	exports.appendContextPath = appendContextPath;
	var escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '`': '&#x60;',
	  '=': '&#x3D;'
	};

	var badChars = /[&<>"'`=]/g,
	    possible = /[&<>"'`=]/;

	function escapeChar(chr) {
	  return escape[chr];
	}

	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }

	  return obj;
	}

	var toString = Object.prototype.toString;

	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/* eslint-disable func-style */
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  exports.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	exports.isFunction = isFunction;

	/* eslint-enable func-style */

	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
	};

	exports.isArray = isArray;
	// Older IE versions do not directly support indexOf so we must implement our own, sadly.

	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
	}

	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } else if (string == null) {
	      return '';
	    } else if (!string) {
	      return string + '';
	    }

	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;
	  }

	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
	}

	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function createFrame(object) {
	  var frame = extend({}, object);
	  frame._parent = object;
	  return frame;
	}

	function blockParams(params, ids) {
	  params.path = ids;
	  return params;
	}

	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

	function Exception(message, node) {
	  var loc = node && node.loc,
	      line = undefined,
	      column = undefined;
	  if (loc) {
	    line = loc.start.line;
	    column = loc.start.column;

	    message += ' - ' + line + ':' + column;
	  }

	  var tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  /* istanbul ignore else */
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);
	  }

	  if (loc) {
	    this.lineNumber = line;
	    this.column = column;
	  }
	}

	Exception.prototype = new Error();

	exports['default'] = Exception;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.registerDefaultHelpers = registerDefaultHelpers;

	var _helpersBlockHelperMissing = __webpack_require__(8);

	var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

	var _helpersEach = __webpack_require__(9);

	var _helpersEach2 = _interopRequireDefault(_helpersEach);

	var _helpersHelperMissing = __webpack_require__(10);

	var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

	var _helpersIf = __webpack_require__(11);

	var _helpersIf2 = _interopRequireDefault(_helpersIf);

	var _helpersLog = __webpack_require__(12);

	var _helpersLog2 = _interopRequireDefault(_helpersLog);

	var _helpersLookup = __webpack_require__(13);

	var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

	var _helpersWith = __webpack_require__(14);

	var _helpersWith2 = _interopRequireDefault(_helpersWith);

	function registerDefaultHelpers(instance) {
	  _helpersBlockHelperMissing2['default'](instance);
	  _helpersEach2['default'](instance);
	  _helpersHelperMissing2['default'](instance);
	  _helpersIf2['default'](instance);
	  _helpersLog2['default'](instance);
	  _helpersLookup2['default'](instance);
	  _helpersWith2['default'](instance);
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	exports['default'] = function (instance) {
	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse,
	        fn = options.fn;

	    if (context === true) {
	      return fn(this);
	    } else if (context === false || context == null) {
	      return inverse(this);
	    } else if (_utils.isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }

	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      if (options.data && options.ids) {
	        var data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data: data };
	      }

	      return fn(context, options);
	    }
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _exception2['default']('Must pass iterator to #each');
	    }

	    var fn = options.fn,
	        inverse = options.inverse,
	        i = 0,
	        ret = '',
	        data = undefined,
	        contextPath = undefined;

	    if (options.data && options.ids) {
	      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
	    }

	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    if (options.data) {
	      data = _utils.createFrame(options.data);
	    }

	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;

	        if (contextPath) {
	          data.contextPath = contextPath + field;
	        }
	      }

	      ret = ret + fn(context[field], {
	        data: data,
	        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
	      });
	    }

	    if (context && typeof context === 'object') {
	      if (_utils.isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          if (i in context) {
	            execIteration(i, i, i === context.length - 1);
	          }
	        }
	      } else {
	        var priorKey = undefined;

	        for (var key in context) {
	          if (context.hasOwnProperty(key)) {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey !== undefined) {
	              execIteration(priorKey, i - 1);
	            }
	            priorKey = key;
	            i++;
	          }
	        }
	        if (priorKey !== undefined) {
	          execIteration(priorKey, i - 1, true);
	        }
	      }
	    }

	    if (i === 0) {
	      ret = inverse(this);
	    }

	    return ret;
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('helperMissing', function () /* [args, ]options */{
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} construct.
	      return undefined;
	    } else {
	      // Someone is actually trying to call something, blow up.
	      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
	    }
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	exports['default'] = function (instance) {
	  instance.registerHelper('if', function (conditional, options) {
	    if (_utils.isFunction(conditional)) {
	      conditional = conditional.call(this);
	    }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  instance.registerHelper('unless', function (conditional, options) {
	    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('log', function () /* message, options */{
	    var args = [undefined],
	        options = arguments[arguments.length - 1];
	    for (var i = 0; i < arguments.length - 1; i++) {
	      args.push(arguments[i]);
	    }

	    var level = 1;
	    if (options.hash.level != null) {
	      level = options.hash.level;
	    } else if (options.data && options.data.level != null) {
	      level = options.data.level;
	    }
	    args[0] = level;

	    instance.log.apply(instance, args);
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('lookup', function (obj, field) {
	    return obj && obj[field];
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	exports['default'] = function (instance) {
	  instance.registerHelper('with', function (context, options) {
	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    var fn = options.fn;

	    if (!_utils.isEmpty(context)) {
	      var data = options.data;
	      if (options.data && options.ids) {
	        data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
	      }

	      return fn(context, {
	        data: data,
	        blockParams: _utils.blockParams([context], [data && data.contextPath])
	      });
	    } else {
	      return options.inverse(this);
	    }
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.registerDefaultDecorators = registerDefaultDecorators;

	var _decoratorsInline = __webpack_require__(16);

	var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

	function registerDefaultDecorators(instance) {
	  _decoratorsInline2['default'](instance);
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	exports['default'] = function (instance) {
	  instance.registerDecorator('inline', function (fn, props, container, options) {
	    var ret = fn;
	    if (!props.partials) {
	      props.partials = {};
	      ret = function (context, options) {
	        // Create a new partials stack frame prior to exec.
	        var original = container.partials;
	        container.partials = _utils.extend({}, original, props.partials);
	        var ret = fn(context, options);
	        container.partials = original;
	        return ret;
	      };
	    }

	    props.partials[options.args[0]] = options.fn;

	    return ret;
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	var logger = {
	  methodMap: ['debug', 'info', 'warn', 'error'],
	  level: 'info',

	  // Maps a given level value to the `methodMap` indexes above.
	  lookupLevel: function lookupLevel(level) {
	    if (typeof level === 'string') {
	      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
	      if (levelMap >= 0) {
	        level = levelMap;
	      } else {
	        level = parseInt(level, 10);
	      }
	    }

	    return level;
	  },

	  // Can be overridden in the host environment
	  log: function log(level) {
	    level = logger.lookupLevel(level);

	    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
	      var method = logger.methodMap[level];
	      if (!console[method]) {
	        // eslint-disable-line no-console
	        method = 'log';
	      }

	      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        message[_key - 1] = arguments[_key];
	      }

	      console[method].apply(console, message); // eslint-disable-line no-console
	    }
	  }
	};

	exports['default'] = logger;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports) {

	// Build out our basic SafeString type
	'use strict';

	exports.__esModule = true;
	function SafeString(string) {
	  this.string = string;
	}

	SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return '' + this.string;
	};

	exports['default'] = SafeString;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(3)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.checkRevision = checkRevision;
	exports.template = template;
	exports.wrapProgram = wrapProgram;
	exports.resolvePartial = resolvePartial;
	exports.invokePartial = invokePartial;
	exports.noop = noop;

	var _utils = __webpack_require__(5);

	var Utils = _interopRequireWildcard(_utils);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _base = __webpack_require__(4);

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = _base.COMPILER_REVISION;

	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
	          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
	      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
	    }
	  }
	}

	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _exception2['default']('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
	  }

	  templateSpec.main.decorator = templateSpec.main_d;

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);

	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	      if (options.ids) {
	        options.ids[0] = true;
	      }
	    }

	    partial = env.VM.resolvePartial.call(this, partial, context, options);
	    var result = env.VM.invokePartial.call(this, partial, context, options);

	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, options);
	    }
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }

	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
	    }
	  }

	  // Just add water
	  var container = {
	    strict: function strict(obj, name) {
	      if (!(name in obj)) {
	        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
	      }
	      return obj[name];
	    },
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        if (depths[i] && depths[i][name] != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },

	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,

	    fn: function fn(i) {
	      var ret = templateSpec[i];
	      ret.decorator = templateSpec[i + '_d'];
	      return ret;
	    },

	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },

	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    merge: function merge(param, common) {
	      var obj = param || common;

	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }

	      return obj;
	    },

	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };

	  function ret(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var data = options.data;

	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths = undefined,
	        blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      if (options.depths) {
	        depths = context !== options.depths[0] ? [context].concat(options.depths) : options.depths;
	      } else {
	        depths = [context];
	      }
	    }

	    function main(context /*, options*/) {
	      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
	    }
	    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
	    return main(context, options);
	  }
	  ret.isTop = true;

	  ret._setup = function (options) {
	    if (!options.partial) {
	      container.helpers = container.merge(options.helpers, env.helpers);

	      if (templateSpec.usePartial) {
	        container.partials = container.merge(options.partials, env.partials);
	      }
	      if (templateSpec.usePartial || templateSpec.useDecorators) {
	        container.decorators = container.merge(options.decorators, env.decorators);
	      }
	    } else {
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	      container.decorators = options.decorators;
	    }
	  };

	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _exception2['default']('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _exception2['default']('must pass parent depths');
	    }

	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
	}

	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var currentDepths = depths;
	    if (depths && context !== depths[0]) {
	      currentDepths = [context].concat(depths);
	    }

	    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
	  }

	  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
	}

	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    if (options.name === '@partial-block') {
	      partial = options.data['partial-block'];
	    } else {
	      partial = options.partials[options.name];
	    }
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
	}

	function invokePartial(partial, context, options) {
	  options.partial = true;
	  if (options.ids) {
	    options.data.contextPath = options.ids[0] || options.data.contextPath;
	  }

	  var partialBlock = undefined;
	  if (options.fn && options.fn !== noop) {
	    options.data = _base.createFrame(options.data);
	    partialBlock = options.data['partial-block'] = options.fn;

	    if (partialBlock.partials) {
	      options.partials = Utils.extend({}, options.partials, partialBlock.partials);
	    }
	  }

	  if (partial === undefined && partialBlock) {
	    partial = partialBlock;
	  }

	  if (partial === undefined) {
	    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	function noop() {
	  return '';
	}

	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _base.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}

	function executeDecorators(fn, prog, container, depths, data, blockParams) {
	  if (fn.decorator) {
	    var props = {};
	    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
	    Utils.extend(prog, props);
	  }
	  return prog;
	}

/***/ },
/* 20 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';

	exports.__esModule = true;

	exports['default'] = function (Handlebars) {
	  /* istanbul ignore next */
	  var root = typeof global !== 'undefined' ? global : window,
	      $Handlebars = root.Handlebars;
	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (root.Handlebars === Handlebars) {
	      root.Handlebars = $Handlebars;
	    }
	    return Handlebars;
	  };
	};

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var AST = {
	  // Public API used to evaluate derived attributes regarding AST nodes
	  helpers: {
	    // a mustache is definitely a helper if:
	    // * it is an eligible helper, and
	    // * it has at least one parameter or hash segment
	    helperExpression: function helperExpression(node) {
	      return node.type === 'SubExpression' || (node.type === 'MustacheStatement' || node.type === 'BlockStatement') && !!(node.params && node.params.length || node.hash);
	    },

	    scopedId: function scopedId(path) {
	      return (/^\.|this\b/.test(path.original)
	      );
	    },

	    // an ID is simple if it only has one part, and that part is not
	    // `..` or `this`.
	    simpleId: function simpleId(path) {
	      return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth;
	    }
	  }
	};

	// Must be exported as an object rather than the root of the module as the jison lexer
	// must modify the object to operate properly.
	exports['default'] = AST;
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	var _interopRequireWildcard = __webpack_require__(3)['default'];

	exports.__esModule = true;
	exports.parse = parse;

	var _parser = __webpack_require__(23);

	var _parser2 = _interopRequireDefault(_parser);

	var _whitespaceControl = __webpack_require__(24);

	var _whitespaceControl2 = _interopRequireDefault(_whitespaceControl);

	var _helpers = __webpack_require__(26);

	var Helpers = _interopRequireWildcard(_helpers);

	var _utils = __webpack_require__(5);

	exports.parser = _parser2['default'];

	var yy = {};
	_utils.extend(yy, Helpers);

	function parse(input, options) {
	  // Just return if an already-compiled AST was passed in.
	  if (input.type === 'Program') {
	    return input;
	  }

	  _parser2['default'].yy = yy;

	  // Altering the shared object here, but this is ok as parser is a sync operation
	  yy.locInfo = function (locInfo) {
	    return new yy.SourceLocation(options && options.srcName, locInfo);
	  };

	  var strip = new _whitespaceControl2['default'](options);
	  return strip.accept(_parser2['default'].parse(input));
	}

/***/ },
/* 23 */
/***/ function(module, exports) {

	/* istanbul ignore next */
	/* Jison generated parser */
	"use strict";

	var handlebars = (function () {
	    var parser = { trace: function trace() {},
	        yy: {},
	        symbols_: { "error": 2, "root": 3, "program": 4, "EOF": 5, "program_repetition0": 6, "statement": 7, "mustache": 8, "block": 9, "rawBlock": 10, "partial": 11, "partialBlock": 12, "content": 13, "COMMENT": 14, "CONTENT": 15, "openRawBlock": 16, "rawBlock_repetition_plus0": 17, "END_RAW_BLOCK": 18, "OPEN_RAW_BLOCK": 19, "helperName": 20, "openRawBlock_repetition0": 21, "openRawBlock_option0": 22, "CLOSE_RAW_BLOCK": 23, "openBlock": 24, "block_option0": 25, "closeBlock": 26, "openInverse": 27, "block_option1": 28, "OPEN_BLOCK": 29, "openBlock_repetition0": 30, "openBlock_option0": 31, "openBlock_option1": 32, "CLOSE": 33, "OPEN_INVERSE": 34, "openInverse_repetition0": 35, "openInverse_option0": 36, "openInverse_option1": 37, "openInverseChain": 38, "OPEN_INVERSE_CHAIN": 39, "openInverseChain_repetition0": 40, "openInverseChain_option0": 41, "openInverseChain_option1": 42, "inverseAndProgram": 43, "INVERSE": 44, "inverseChain": 45, "inverseChain_option0": 46, "OPEN_ENDBLOCK": 47, "OPEN": 48, "mustache_repetition0": 49, "mustache_option0": 50, "OPEN_UNESCAPED": 51, "mustache_repetition1": 52, "mustache_option1": 53, "CLOSE_UNESCAPED": 54, "OPEN_PARTIAL": 55, "partialName": 56, "partial_repetition0": 57, "partial_option0": 58, "openPartialBlock": 59, "OPEN_PARTIAL_BLOCK": 60, "openPartialBlock_repetition0": 61, "openPartialBlock_option0": 62, "param": 63, "sexpr": 64, "OPEN_SEXPR": 65, "sexpr_repetition0": 66, "sexpr_option0": 67, "CLOSE_SEXPR": 68, "hash": 69, "hash_repetition_plus0": 70, "hashSegment": 71, "ID": 72, "EQUALS": 73, "blockParams": 74, "OPEN_BLOCK_PARAMS": 75, "blockParams_repetition_plus0": 76, "CLOSE_BLOCK_PARAMS": 77, "path": 78, "dataName": 79, "STRING": 80, "NUMBER": 81, "BOOLEAN": 82, "UNDEFINED": 83, "NULL": 84, "DATA": 85, "pathSegments": 86, "SEP": 87, "$accept": 0, "$end": 1 },
	        terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" },
	        productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 1], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
	        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$
	        /**/) {

	            var $0 = $$.length - 1;
	            switch (yystate) {
	                case 1:
	                    return $$[$0 - 1];
	                    break;
	                case 2:
	                    this.$ = yy.prepareProgram($$[$0]);
	                    break;
	                case 3:
	                    this.$ = $$[$0];
	                    break;
	                case 4:
	                    this.$ = $$[$0];
	                    break;
	                case 5:
	                    this.$ = $$[$0];
	                    break;
	                case 6:
	                    this.$ = $$[$0];
	                    break;
	                case 7:
	                    this.$ = $$[$0];
	                    break;
	                case 8:
	                    this.$ = $$[$0];
	                    break;
	                case 9:
	                    this.$ = {
	                        type: 'CommentStatement',
	                        value: yy.stripComment($$[$0]),
	                        strip: yy.stripFlags($$[$0], $$[$0]),
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 10:
	                    this.$ = {
	                        type: 'ContentStatement',
	                        original: $$[$0],
	                        value: $$[$0],
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 11:
	                    this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
	                    break;
	                case 12:
	                    this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1] };
	                    break;
	                case 13:
	                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
	                    break;
	                case 14:
	                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
	                    break;
	                case 15:
	                    this.$ = { open: $$[$0 - 5], path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
	                    break;
	                case 16:
	                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
	                    break;
	                case 17:
	                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
	                    break;
	                case 18:
	                    this.$ = { strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]), program: $$[$0] };
	                    break;
	                case 19:
	                    var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$),
	                        program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
	                    program.chained = true;

	                    this.$ = { strip: $$[$0 - 2].strip, program: program, chain: true };

	                    break;
	                case 20:
	                    this.$ = $$[$0];
	                    break;
	                case 21:
	                    this.$ = { path: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 2], $$[$0]) };
	                    break;
	                case 22:
	                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
	                    break;
	                case 23:
	                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
	                    break;
	                case 24:
	                    this.$ = {
	                        type: 'PartialStatement',
	                        name: $$[$0 - 3],
	                        params: $$[$0 - 2],
	                        hash: $$[$0 - 1],
	                        indent: '',
	                        strip: yy.stripFlags($$[$0 - 4], $$[$0]),
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 25:
	                    this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
	                    break;
	                case 26:
	                    this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 4], $$[$0]) };
	                    break;
	                case 27:
	                    this.$ = $$[$0];
	                    break;
	                case 28:
	                    this.$ = $$[$0];
	                    break;
	                case 29:
	                    this.$ = {
	                        type: 'SubExpression',
	                        path: $$[$0 - 3],
	                        params: $$[$0 - 2],
	                        hash: $$[$0 - 1],
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 30:
	                    this.$ = { type: 'Hash', pairs: $$[$0], loc: yy.locInfo(this._$) };
	                    break;
	                case 31:
	                    this.$ = { type: 'HashPair', key: yy.id($$[$0 - 2]), value: $$[$0], loc: yy.locInfo(this._$) };
	                    break;
	                case 32:
	                    this.$ = yy.id($$[$0 - 1]);
	                    break;
	                case 33:
	                    this.$ = $$[$0];
	                    break;
	                case 34:
	                    this.$ = $$[$0];
	                    break;
	                case 35:
	                    this.$ = { type: 'StringLiteral', value: $$[$0], original: $$[$0], loc: yy.locInfo(this._$) };
	                    break;
	                case 36:
	                    this.$ = { type: 'NumberLiteral', value: Number($$[$0]), original: Number($$[$0]), loc: yy.locInfo(this._$) };
	                    break;
	                case 37:
	                    this.$ = { type: 'BooleanLiteral', value: $$[$0] === 'true', original: $$[$0] === 'true', loc: yy.locInfo(this._$) };
	                    break;
	                case 38:
	                    this.$ = { type: 'UndefinedLiteral', original: undefined, value: undefined, loc: yy.locInfo(this._$) };
	                    break;
	                case 39:
	                    this.$ = { type: 'NullLiteral', original: null, value: null, loc: yy.locInfo(this._$) };
	                    break;
	                case 40:
	                    this.$ = $$[$0];
	                    break;
	                case 41:
	                    this.$ = $$[$0];
	                    break;
	                case 42:
	                    this.$ = yy.preparePath(true, $$[$0], this._$);
	                    break;
	                case 43:
	                    this.$ = yy.preparePath(false, $$[$0], this._$);
	                    break;
	                case 44:
	                    $$[$0 - 2].push({ part: yy.id($$[$0]), original: $$[$0], separator: $$[$0 - 1] });this.$ = $$[$0 - 2];
	                    break;
	                case 45:
	                    this.$ = [{ part: yy.id($$[$0]), original: $$[$0] }];
	                    break;
	                case 46:
	                    this.$ = [];
	                    break;
	                case 47:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 48:
	                    this.$ = [$$[$0]];
	                    break;
	                case 49:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 50:
	                    this.$ = [];
	                    break;
	                case 51:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 58:
	                    this.$ = [];
	                    break;
	                case 59:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 64:
	                    this.$ = [];
	                    break;
	                case 65:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 70:
	                    this.$ = [];
	                    break;
	                case 71:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 78:
	                    this.$ = [];
	                    break;
	                case 79:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 82:
	                    this.$ = [];
	                    break;
	                case 83:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 86:
	                    this.$ = [];
	                    break;
	                case 87:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 90:
	                    this.$ = [];
	                    break;
	                case 91:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 94:
	                    this.$ = [];
	                    break;
	                case 95:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 98:
	                    this.$ = [$$[$0]];
	                    break;
	                case 99:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 100:
	                    this.$ = [$$[$0]];
	                    break;
	                case 101:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	            }
	        },
	        table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 13: 40, 15: [1, 20], 17: 39 }, { 20: 42, 56: 41, 64: 43, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 45, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 48, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 42, 56: 49, 64: 43, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 50, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 51] }, { 72: [1, 35], 86: 52 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 53, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 54, 38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 55, 47: [2, 54] }, { 28: 60, 43: 61, 44: [1, 59], 47: [2, 56] }, { 13: 63, 15: [1, 20], 18: [1, 62] }, { 15: [2, 48], 18: [2, 48] }, { 33: [2, 86], 57: 64, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 65, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 66, 47: [1, 67] }, { 30: 68, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 69, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 70, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 71, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 75, 33: [2, 80], 50: 72, 63: 73, 64: 76, 65: [1, 44], 69: 74, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 80] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 51] }, { 20: 75, 53: 81, 54: [2, 84], 63: 82, 64: 76, 65: [1, 44], 69: 83, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 84, 47: [1, 67] }, { 47: [2, 55] }, { 4: 85, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 86, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 87, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 88, 47: [1, 67] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 75, 33: [2, 88], 58: 89, 63: 90, 64: 76, 65: [1, 44], 69: 91, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 92, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 93, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 31: 94, 33: [2, 60], 63: 95, 64: 76, 65: [1, 44], 69: 96, 70: 77, 71: 78, 72: [1, 79], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 33: [2, 66], 36: 97, 63: 98, 64: 76, 65: [1, 44], 69: 99, 70: 77, 71: 78, 72: [1, 79], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 22: 100, 23: [2, 52], 63: 101, 64: 76, 65: [1, 44], 69: 102, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 33: [2, 92], 62: 103, 63: 104, 64: 76, 65: [1, 44], 69: 105, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 106] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 107, 72: [1, 108], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 109], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 110] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 112, 46: 111, 47: [2, 76] }, { 33: [2, 70], 40: 113, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 114] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 75, 63: 116, 64: 76, 65: [1, 44], 67: 115, 68: [2, 96], 69: 117, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 118] }, { 32: 119, 33: [2, 62], 74: 120, 75: [1, 121] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 122, 74: 123, 75: [1, 121] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 124] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 125] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 109] }, { 20: 75, 63: 126, 64: 76, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 75, 33: [2, 72], 41: 127, 63: 128, 64: 76, 65: [1, 44], 69: 129, 70: 77, 71: 78, 72: [1, 79], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 130] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 131] }, { 33: [2, 63] }, { 72: [1, 133], 76: 132 }, { 33: [1, 134] }, { 33: [2, 69] }, { 15: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 135, 74: 136, 75: [1, 121] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 138], 77: [1, 137] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 139] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
	        defaultActions: { 4: [2, 1], 55: [2, 55], 57: [2, 20], 61: [2, 57], 74: [2, 81], 83: [2, 85], 87: [2, 18], 91: [2, 89], 102: [2, 53], 105: [2, 93], 111: [2, 19], 112: [2, 77], 117: [2, 97], 120: [2, 63], 123: [2, 69], 124: [2, 12], 136: [2, 75], 137: [2, 32] },
	        parseError: function parseError(str, hash) {
	            throw new Error(str);
	        },
	        parse: function parse(input) {
	            var self = this,
	                stack = [0],
	                vstack = [null],
	                lstack = [],
	                table = this.table,
	                yytext = "",
	                yylineno = 0,
	                yyleng = 0,
	                recovering = 0,
	                TERROR = 2,
	                EOF = 1;
	            this.lexer.setInput(input);
	            this.lexer.yy = this.yy;
	            this.yy.lexer = this.lexer;
	            this.yy.parser = this;
	            if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
	            var yyloc = this.lexer.yylloc;
	            lstack.push(yyloc);
	            var ranges = this.lexer.options && this.lexer.options.ranges;
	            if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
	            function popStack(n) {
	                stack.length = stack.length - 2 * n;
	                vstack.length = vstack.length - n;
	                lstack.length = lstack.length - n;
	            }
	            function lex() {
	                var token;
	                token = self.lexer.lex() || 1;
	                if (typeof token !== "number") {
	                    token = self.symbols_[token] || token;
	                }
	                return token;
	            }
	            var symbol,
	                preErrorSymbol,
	                state,
	                action,
	                a,
	                r,
	                yyval = {},
	                p,
	                len,
	                newState,
	                expected;
	            while (true) {
	                state = stack[stack.length - 1];
	                if (this.defaultActions[state]) {
	                    action = this.defaultActions[state];
	                } else {
	                    if (symbol === null || typeof symbol == "undefined") {
	                        symbol = lex();
	                    }
	                    action = table[state] && table[state][symbol];
	                }
	                if (typeof action === "undefined" || !action.length || !action[0]) {
	                    var errStr = "";
	                    if (!recovering) {
	                        expected = [];
	                        for (p in table[state]) if (this.terminals_[p] && p > 2) {
	                            expected.push("'" + this.terminals_[p] + "'");
	                        }
	                        if (this.lexer.showPosition) {
	                            errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
	                        } else {
	                            errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
	                        }
	                        this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected });
	                    }
	                }
	                if (action[0] instanceof Array && action.length > 1) {
	                    throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
	                }
	                switch (action[0]) {
	                    case 1:
	                        stack.push(symbol);
	                        vstack.push(this.lexer.yytext);
	                        lstack.push(this.lexer.yylloc);
	                        stack.push(action[1]);
	                        symbol = null;
	                        if (!preErrorSymbol) {
	                            yyleng = this.lexer.yyleng;
	                            yytext = this.lexer.yytext;
	                            yylineno = this.lexer.yylineno;
	                            yyloc = this.lexer.yylloc;
	                            if (recovering > 0) recovering--;
	                        } else {
	                            symbol = preErrorSymbol;
	                            preErrorSymbol = null;
	                        }
	                        break;
	                    case 2:
	                        len = this.productions_[action[1]][1];
	                        yyval.$ = vstack[vstack.length - len];
	                        yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
	                        if (ranges) {
	                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
	                        }
	                        r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
	                        if (typeof r !== "undefined") {
	                            return r;
	                        }
	                        if (len) {
	                            stack = stack.slice(0, -1 * len * 2);
	                            vstack = vstack.slice(0, -1 * len);
	                            lstack = lstack.slice(0, -1 * len);
	                        }
	                        stack.push(this.productions_[action[1]][0]);
	                        vstack.push(yyval.$);
	                        lstack.push(yyval._$);
	                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
	                        stack.push(newState);
	                        break;
	                    case 3:
	                        return true;
	                }
	            }
	            return true;
	        }
	    };
	    /* Jison generated lexer */
	    var lexer = (function () {
	        var lexer = { EOF: 1,
	            parseError: function parseError(str, hash) {
	                if (this.yy.parser) {
	                    this.yy.parser.parseError(str, hash);
	                } else {
	                    throw new Error(str);
	                }
	            },
	            setInput: function setInput(input) {
	                this._input = input;
	                this._more = this._less = this.done = false;
	                this.yylineno = this.yyleng = 0;
	                this.yytext = this.matched = this.match = '';
	                this.conditionStack = ['INITIAL'];
	                this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
	                if (this.options.ranges) this.yylloc.range = [0, 0];
	                this.offset = 0;
	                return this;
	            },
	            input: function input() {
	                var ch = this._input[0];
	                this.yytext += ch;
	                this.yyleng++;
	                this.offset++;
	                this.match += ch;
	                this.matched += ch;
	                var lines = ch.match(/(?:\r\n?|\n).*/g);
	                if (lines) {
	                    this.yylineno++;
	                    this.yylloc.last_line++;
	                } else {
	                    this.yylloc.last_column++;
	                }
	                if (this.options.ranges) this.yylloc.range[1]++;

	                this._input = this._input.slice(1);
	                return ch;
	            },
	            unput: function unput(ch) {
	                var len = ch.length;
	                var lines = ch.split(/(?:\r\n?|\n)/g);

	                this._input = ch + this._input;
	                this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
	                //this.yyleng -= len;
	                this.offset -= len;
	                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
	                this.match = this.match.substr(0, this.match.length - 1);
	                this.matched = this.matched.substr(0, this.matched.length - 1);

	                if (lines.length - 1) this.yylineno -= lines.length - 1;
	                var r = this.yylloc.range;

	                this.yylloc = { first_line: this.yylloc.first_line,
	                    last_line: this.yylineno + 1,
	                    first_column: this.yylloc.first_column,
	                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
	                };

	                if (this.options.ranges) {
	                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
	                }
	                return this;
	            },
	            more: function more() {
	                this._more = true;
	                return this;
	            },
	            less: function less(n) {
	                this.unput(this.match.slice(n));
	            },
	            pastInput: function pastInput() {
	                var past = this.matched.substr(0, this.matched.length - this.match.length);
	                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
	            },
	            upcomingInput: function upcomingInput() {
	                var next = this.match;
	                if (next.length < 20) {
	                    next += this._input.substr(0, 20 - next.length);
	                }
	                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
	            },
	            showPosition: function showPosition() {
	                var pre = this.pastInput();
	                var c = new Array(pre.length + 1).join("-");
	                return pre + this.upcomingInput() + "\n" + c + "^";
	            },
	            next: function next() {
	                if (this.done) {
	                    return this.EOF;
	                }
	                if (!this._input) this.done = true;

	                var token, match, tempMatch, index, col, lines;
	                if (!this._more) {
	                    this.yytext = '';
	                    this.match = '';
	                }
	                var rules = this._currentRules();
	                for (var i = 0; i < rules.length; i++) {
	                    tempMatch = this._input.match(this.rules[rules[i]]);
	                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
	                        match = tempMatch;
	                        index = i;
	                        if (!this.options.flex) break;
	                    }
	                }
	                if (match) {
	                    lines = match[0].match(/(?:\r\n?|\n).*/g);
	                    if (lines) this.yylineno += lines.length;
	                    this.yylloc = { first_line: this.yylloc.last_line,
	                        last_line: this.yylineno + 1,
	                        first_column: this.yylloc.last_column,
	                        last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length };
	                    this.yytext += match[0];
	                    this.match += match[0];
	                    this.matches = match;
	                    this.yyleng = this.yytext.length;
	                    if (this.options.ranges) {
	                        this.yylloc.range = [this.offset, this.offset += this.yyleng];
	                    }
	                    this._more = false;
	                    this._input = this._input.slice(match[0].length);
	                    this.matched += match[0];
	                    token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
	                    if (this.done && this._input) this.done = false;
	                    if (token) return token;else return;
	                }
	                if (this._input === "") {
	                    return this.EOF;
	                } else {
	                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), { text: "", token: null, line: this.yylineno });
	                }
	            },
	            lex: function lex() {
	                var r = this.next();
	                if (typeof r !== 'undefined') {
	                    return r;
	                } else {
	                    return this.lex();
	                }
	            },
	            begin: function begin(condition) {
	                this.conditionStack.push(condition);
	            },
	            popState: function popState() {
	                return this.conditionStack.pop();
	            },
	            _currentRules: function _currentRules() {
	                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
	            },
	            topState: function topState() {
	                return this.conditionStack[this.conditionStack.length - 2];
	            },
	            pushState: function begin(condition) {
	                this.begin(condition);
	            } };
	        lexer.options = {};
	        lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START
	        /**/) {

	            function strip(start, end) {
	                return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng - end);
	            }

	            var YYSTATE = YY_START;
	            switch ($avoiding_name_collisions) {
	                case 0:
	                    if (yy_.yytext.slice(-2) === "\\\\") {
	                        strip(0, 1);
	                        this.begin("mu");
	                    } else if (yy_.yytext.slice(-1) === "\\") {
	                        strip(0, 1);
	                        this.begin("emu");
	                    } else {
	                        this.begin("mu");
	                    }
	                    if (yy_.yytext) return 15;

	                    break;
	                case 1:
	                    return 15;
	                    break;
	                case 2:
	                    this.popState();
	                    return 15;

	                    break;
	                case 3:
	                    this.begin('raw');return 15;
	                    break;
	                case 4:
	                    this.popState();
	                    // Should be using `this.topState()` below, but it currently
	                    // returns the second top instead of the first top. Opened an
	                    // issue about it at https://github.com/zaach/jison/issues/291
	                    if (this.conditionStack[this.conditionStack.length - 1] === 'raw') {
	                        return 15;
	                    } else {
	                        yy_.yytext = yy_.yytext.substr(5, yy_.yyleng - 9);
	                        return 'END_RAW_BLOCK';
	                    }

	                    break;
	                case 5:
	                    return 15;
	                    break;
	                case 6:
	                    this.popState();
	                    return 14;

	                    break;
	                case 7:
	                    return 65;
	                    break;
	                case 8:
	                    return 68;
	                    break;
	                case 9:
	                    return 19;
	                    break;
	                case 10:
	                    this.popState();
	                    this.begin('raw');
	                    return 23;

	                    break;
	                case 11:
	                    return 55;
	                    break;
	                case 12:
	                    return 60;
	                    break;
	                case 13:
	                    return 29;
	                    break;
	                case 14:
	                    return 47;
	                    break;
	                case 15:
	                    this.popState();return 44;
	                    break;
	                case 16:
	                    this.popState();return 44;
	                    break;
	                case 17:
	                    return 34;
	                    break;
	                case 18:
	                    return 39;
	                    break;
	                case 19:
	                    return 51;
	                    break;
	                case 20:
	                    return 48;
	                    break;
	                case 21:
	                    this.unput(yy_.yytext);
	                    this.popState();
	                    this.begin('com');

	                    break;
	                case 22:
	                    this.popState();
	                    return 14;

	                    break;
	                case 23:
	                    return 48;
	                    break;
	                case 24:
	                    return 73;
	                    break;
	                case 25:
	                    return 72;
	                    break;
	                case 26:
	                    return 72;
	                    break;
	                case 27:
	                    return 87;
	                    break;
	                case 28:
	                    // ignore whitespace
	                    break;
	                case 29:
	                    this.popState();return 54;
	                    break;
	                case 30:
	                    this.popState();return 33;
	                    break;
	                case 31:
	                    yy_.yytext = strip(1, 2).replace(/\\"/g, '"');return 80;
	                    break;
	                case 32:
	                    yy_.yytext = strip(1, 2).replace(/\\'/g, "'");return 80;
	                    break;
	                case 33:
	                    return 85;
	                    break;
	                case 34:
	                    return 82;
	                    break;
	                case 35:
	                    return 82;
	                    break;
	                case 36:
	                    return 83;
	                    break;
	                case 37:
	                    return 84;
	                    break;
	                case 38:
	                    return 81;
	                    break;
	                case 39:
	                    return 75;
	                    break;
	                case 40:
	                    return 77;
	                    break;
	                case 41:
	                    return 72;
	                    break;
	                case 42:
	                    yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, '$1');return 72;
	                    break;
	                case 43:
	                    return 'INVALID';
	                    break;
	                case 44:
	                    return 5;
	                    break;
	            }
	        };
	        lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
	        lexer.conditions = { "mu": { "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], "inclusive": false }, "emu": { "rules": [2], "inclusive": false }, "com": { "rules": [6], "inclusive": false }, "raw": { "rules": [3, 4, 5], "inclusive": false }, "INITIAL": { "rules": [0, 1, 44], "inclusive": true } };
	        return lexer;
	    })();
	    parser.lexer = lexer;
	    function Parser() {
	        this.yy = {};
	    }Parser.prototype = parser;parser.Parser = Parser;
	    return new Parser();
	})();exports.__esModule = true;
	exports['default'] = handlebars;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _visitor = __webpack_require__(25);

	var _visitor2 = _interopRequireDefault(_visitor);

	function WhitespaceControl() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  this.options = options;
	}
	WhitespaceControl.prototype = new _visitor2['default']();

	WhitespaceControl.prototype.Program = function (program) {
	  var doStandalone = !this.options.ignoreStandalone;

	  var isRoot = !this.isRootSeen;
	  this.isRootSeen = true;

	  var body = program.body;
	  for (var i = 0, l = body.length; i < l; i++) {
	    var current = body[i],
	        strip = this.accept(current);

	    if (!strip) {
	      continue;
	    }

	    var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
	        _isNextWhitespace = isNextWhitespace(body, i, isRoot),
	        openStandalone = strip.openStandalone && _isPrevWhitespace,
	        closeStandalone = strip.closeStandalone && _isNextWhitespace,
	        inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;

	    if (strip.close) {
	      omitRight(body, i, true);
	    }
	    if (strip.open) {
	      omitLeft(body, i, true);
	    }

	    if (doStandalone && inlineStandalone) {
	      omitRight(body, i);

	      if (omitLeft(body, i)) {
	        // If we are on a standalone node, save the indent info for partials
	        if (current.type === 'PartialStatement') {
	          // Pull out the whitespace from the final line
	          current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
	        }
	      }
	    }
	    if (doStandalone && openStandalone) {
	      omitRight((current.program || current.inverse).body);

	      // Strip out the previous content node if it's whitespace only
	      omitLeft(body, i);
	    }
	    if (doStandalone && closeStandalone) {
	      // Always strip the next node
	      omitRight(body, i);

	      omitLeft((current.inverse || current.program).body);
	    }
	  }

	  return program;
	};

	WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function (block) {
	  this.accept(block.program);
	  this.accept(block.inverse);

	  // Find the inverse program that is involed with whitespace stripping.
	  var program = block.program || block.inverse,
	      inverse = block.program && block.inverse,
	      firstInverse = inverse,
	      lastInverse = inverse;

	  if (inverse && inverse.chained) {
	    firstInverse = inverse.body[0].program;

	    // Walk the inverse chain to find the last inverse that is actually in the chain.
	    while (lastInverse.chained) {
	      lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
	    }
	  }

	  var strip = {
	    open: block.openStrip.open,
	    close: block.closeStrip.close,

	    // Determine the standalone candiacy. Basically flag our content as being possibly standalone
	    // so our parent can determine if we actually are standalone
	    openStandalone: isNextWhitespace(program.body),
	    closeStandalone: isPrevWhitespace((firstInverse || program).body)
	  };

	  if (block.openStrip.close) {
	    omitRight(program.body, null, true);
	  }

	  if (inverse) {
	    var inverseStrip = block.inverseStrip;

	    if (inverseStrip.open) {
	      omitLeft(program.body, null, true);
	    }

	    if (inverseStrip.close) {
	      omitRight(firstInverse.body, null, true);
	    }
	    if (block.closeStrip.open) {
	      omitLeft(lastInverse.body, null, true);
	    }

	    // Find standalone else statments
	    if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
	      omitLeft(program.body);
	      omitRight(firstInverse.body);
	    }
	  } else if (block.closeStrip.open) {
	    omitLeft(program.body, null, true);
	  }

	  return strip;
	};

	WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function (mustache) {
	  return mustache.strip;
	};

	WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function (node) {
	  /* istanbul ignore next */
	  var strip = node.strip || {};
	  return {
	    inlineStandalone: true,
	    open: strip.open,
	    close: strip.close
	  };
	};

	function isPrevWhitespace(body, i, isRoot) {
	  if (i === undefined) {
	    i = body.length;
	  }

	  // Nodes that end with newlines are considered whitespace (but are special
	  // cased for strip operations)
	  var prev = body[i - 1],
	      sibling = body[i - 2];
	  if (!prev) {
	    return isRoot;
	  }

	  if (prev.type === 'ContentStatement') {
	    return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
	  }
	}
	function isNextWhitespace(body, i, isRoot) {
	  if (i === undefined) {
	    i = -1;
	  }

	  var next = body[i + 1],
	      sibling = body[i + 2];
	  if (!next) {
	    return isRoot;
	  }

	  if (next.type === 'ContentStatement') {
	    return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
	  }
	}

	// Marks the node to the right of the position as omitted.
	// I.e. {{foo}}' ' will mark the ' ' node as omitted.
	//
	// If i is undefined, then the first child will be marked as such.
	//
	// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
	// content is met.
	function omitRight(body, i, multiple) {
	  var current = body[i == null ? 0 : i + 1];
	  if (!current || current.type !== 'ContentStatement' || !multiple && current.rightStripped) {
	    return;
	  }

	  var original = current.value;
	  current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, '');
	  current.rightStripped = current.value !== original;
	}

	// Marks the node to the left of the position as omitted.
	// I.e. ' '{{foo}} will mark the ' ' node as omitted.
	//
	// If i is undefined then the last child will be marked as such.
	//
	// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
	// content is met.
	function omitLeft(body, i, multiple) {
	  var current = body[i == null ? body.length - 1 : i - 1];
	  if (!current || current.type !== 'ContentStatement' || !multiple && current.leftStripped) {
	    return;
	  }

	  // We omit the last node if it's whitespace only and not preceeded by a non-content node.
	  var original = current.value;
	  current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, '');
	  current.leftStripped = current.value !== original;
	  return current.leftStripped;
	}

	exports['default'] = WhitespaceControl;
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	function Visitor() {
	  this.parents = [];
	}

	Visitor.prototype = {
	  constructor: Visitor,
	  mutating: false,

	  // Visits a given value. If mutating, will replace the value if necessary.
	  acceptKey: function acceptKey(node, name) {
	    var value = this.accept(node[name]);
	    if (this.mutating) {
	      // Hacky sanity check: This may have a few false positives for type for the helper
	      // methods but will generally do the right thing without a lot of overhead.
	      if (value && !Visitor.prototype[value.type]) {
	        throw new _exception2['default']('Unexpected node type "' + value.type + '" found when accepting ' + name + ' on ' + node.type);
	      }
	      node[name] = value;
	    }
	  },

	  // Performs an accept operation with added sanity check to ensure
	  // required keys are not removed.
	  acceptRequired: function acceptRequired(node, name) {
	    this.acceptKey(node, name);

	    if (!node[name]) {
	      throw new _exception2['default'](node.type + ' requires ' + name);
	    }
	  },

	  // Traverses a given array. If mutating, empty respnses will be removed
	  // for child elements.
	  acceptArray: function acceptArray(array) {
	    for (var i = 0, l = array.length; i < l; i++) {
	      this.acceptKey(array, i);

	      if (!array[i]) {
	        array.splice(i, 1);
	        i--;
	        l--;
	      }
	    }
	  },

	  accept: function accept(object) {
	    if (!object) {
	      return;
	    }

	    /* istanbul ignore next: Sanity code */
	    if (!this[object.type]) {
	      throw new _exception2['default']('Unknown type: ' + object.type, object);
	    }

	    if (this.current) {
	      this.parents.unshift(this.current);
	    }
	    this.current = object;

	    var ret = this[object.type](object);

	    this.current = this.parents.shift();

	    if (!this.mutating || ret) {
	      return ret;
	    } else if (ret !== false) {
	      return object;
	    }
	  },

	  Program: function Program(program) {
	    this.acceptArray(program.body);
	  },

	  MustacheStatement: visitSubExpression,
	  Decorator: visitSubExpression,

	  BlockStatement: visitBlock,
	  DecoratorBlock: visitBlock,

	  PartialStatement: visitPartial,
	  PartialBlockStatement: function PartialBlockStatement(partial) {
	    visitPartial.call(this, partial);

	    this.acceptKey(partial, 'program');
	  },

	  ContentStatement: function ContentStatement() /* content */{},
	  CommentStatement: function CommentStatement() /* comment */{},

	  SubExpression: visitSubExpression,

	  PathExpression: function PathExpression() /* path */{},

	  StringLiteral: function StringLiteral() /* string */{},
	  NumberLiteral: function NumberLiteral() /* number */{},
	  BooleanLiteral: function BooleanLiteral() /* bool */{},
	  UndefinedLiteral: function UndefinedLiteral() /* literal */{},
	  NullLiteral: function NullLiteral() /* literal */{},

	  Hash: function Hash(hash) {
	    this.acceptArray(hash.pairs);
	  },
	  HashPair: function HashPair(pair) {
	    this.acceptRequired(pair, 'value');
	  }
	};

	function visitSubExpression(mustache) {
	  this.acceptRequired(mustache, 'path');
	  this.acceptArray(mustache.params);
	  this.acceptKey(mustache, 'hash');
	}
	function visitBlock(block) {
	  visitSubExpression.call(this, block);

	  this.acceptKey(block, 'program');
	  this.acceptKey(block, 'inverse');
	}
	function visitPartial(partial) {
	  this.acceptRequired(partial, 'name');
	  this.acceptArray(partial.params);
	  this.acceptKey(partial, 'hash');
	}

	exports['default'] = Visitor;
	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.SourceLocation = SourceLocation;
	exports.id = id;
	exports.stripFlags = stripFlags;
	exports.stripComment = stripComment;
	exports.preparePath = preparePath;
	exports.prepareMustache = prepareMustache;
	exports.prepareRawBlock = prepareRawBlock;
	exports.prepareBlock = prepareBlock;
	exports.prepareProgram = prepareProgram;
	exports.preparePartialBlock = preparePartialBlock;

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	function validateClose(open, close) {
	  close = close.path ? close.path.original : close;

	  if (open.path.original !== close) {
	    var errorNode = { loc: open.path.loc };

	    throw new _exception2['default'](open.path.original + " doesn't match " + close, errorNode);
	  }
	}

	function SourceLocation(source, locInfo) {
	  this.source = source;
	  this.start = {
	    line: locInfo.first_line,
	    column: locInfo.first_column
	  };
	  this.end = {
	    line: locInfo.last_line,
	    column: locInfo.last_column
	  };
	}

	function id(token) {
	  if (/^\[.*\]$/.test(token)) {
	    return token.substr(1, token.length - 2);
	  } else {
	    return token;
	  }
	}

	function stripFlags(open, close) {
	  return {
	    open: open.charAt(2) === '~',
	    close: close.charAt(close.length - 3) === '~'
	  };
	}

	function stripComment(comment) {
	  return comment.replace(/^\{\{~?\!-?-?/, '').replace(/-?-?~?\}\}$/, '');
	}

	function preparePath(data, parts, loc) {
	  loc = this.locInfo(loc);

	  var original = data ? '@' : '',
	      dig = [],
	      depth = 0,
	      depthString = '';

	  for (var i = 0, l = parts.length; i < l; i++) {
	    var part = parts[i].part,

	    // If we have [] syntax then we do not treat path references as operators,
	    // i.e. foo.[this] resolves to approximately context.foo['this']
	    isLiteral = parts[i].original !== part;
	    original += (parts[i].separator || '') + part;

	    if (!isLiteral && (part === '..' || part === '.' || part === 'this')) {
	      if (dig.length > 0) {
	        throw new _exception2['default']('Invalid path: ' + original, { loc: loc });
	      } else if (part === '..') {
	        depth++;
	        depthString += '../';
	      }
	    } else {
	      dig.push(part);
	    }
	  }

	  return {
	    type: 'PathExpression',
	    data: data,
	    depth: depth,
	    parts: dig,
	    original: original,
	    loc: loc
	  };
	}

	function prepareMustache(path, params, hash, open, strip, locInfo) {
	  // Must use charAt to support IE pre-10
	  var escapeFlag = open.charAt(3) || open.charAt(2),
	      escaped = escapeFlag !== '{' && escapeFlag !== '&';

	  var decorator = /\*/.test(open);
	  return {
	    type: decorator ? 'Decorator' : 'MustacheStatement',
	    path: path,
	    params: params,
	    hash: hash,
	    escaped: escaped,
	    strip: strip,
	    loc: this.locInfo(locInfo)
	  };
	}

	function prepareRawBlock(openRawBlock, contents, close, locInfo) {
	  validateClose(openRawBlock, close);

	  locInfo = this.locInfo(locInfo);
	  var program = {
	    type: 'Program',
	    body: contents,
	    strip: {},
	    loc: locInfo
	  };

	  return {
	    type: 'BlockStatement',
	    path: openRawBlock.path,
	    params: openRawBlock.params,
	    hash: openRawBlock.hash,
	    program: program,
	    openStrip: {},
	    inverseStrip: {},
	    closeStrip: {},
	    loc: locInfo
	  };
	}

	function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
	  if (close && close.path) {
	    validateClose(openBlock, close);
	  }

	  var decorator = /\*/.test(openBlock.open);

	  program.blockParams = openBlock.blockParams;

	  var inverse = undefined,
	      inverseStrip = undefined;

	  if (inverseAndProgram) {
	    if (decorator) {
	      throw new _exception2['default']('Unexpected inverse block on decorator', inverseAndProgram);
	    }

	    if (inverseAndProgram.chain) {
	      inverseAndProgram.program.body[0].closeStrip = close.strip;
	    }

	    inverseStrip = inverseAndProgram.strip;
	    inverse = inverseAndProgram.program;
	  }

	  if (inverted) {
	    inverted = inverse;
	    inverse = program;
	    program = inverted;
	  }

	  return {
	    type: decorator ? 'DecoratorBlock' : 'BlockStatement',
	    path: openBlock.path,
	    params: openBlock.params,
	    hash: openBlock.hash,
	    program: program,
	    inverse: inverse,
	    openStrip: openBlock.strip,
	    inverseStrip: inverseStrip,
	    closeStrip: close && close.strip,
	    loc: this.locInfo(locInfo)
	  };
	}

	function prepareProgram(statements, loc) {
	  if (!loc && statements.length) {
	    var firstLoc = statements[0].loc,
	        lastLoc = statements[statements.length - 1].loc;

	    /* istanbul ignore else */
	    if (firstLoc && lastLoc) {
	      loc = {
	        source: firstLoc.source,
	        start: {
	          line: firstLoc.start.line,
	          column: firstLoc.start.column
	        },
	        end: {
	          line: lastLoc.end.line,
	          column: lastLoc.end.column
	        }
	      };
	    }
	  }

	  return {
	    type: 'Program',
	    body: statements,
	    strip: {},
	    loc: loc
	  };
	}

	function preparePartialBlock(open, program, close, locInfo) {
	  validateClose(open, close);

	  return {
	    type: 'PartialBlockStatement',
	    name: open.path,
	    params: open.params,
	    hash: open.hash,
	    program: program,
	    openStrip: open.strip,
	    closeStrip: close && close.strip,
	    loc: this.locInfo(locInfo)
	  };
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint-disable new-cap */

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.Compiler = Compiler;
	exports.precompile = precompile;
	exports.compile = compile;

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _utils = __webpack_require__(5);

	var _ast = __webpack_require__(21);

	var _ast2 = _interopRequireDefault(_ast);

	var slice = [].slice;

	function Compiler() {}

	// the foundHelper register will disambiguate helper lookup from finding a
	// function in a context. This is necessary for mustache compatibility, which
	// requires that context functions in blocks are evaluated by blockHelperMissing,
	// and then proceed as if the resulting value was provided to blockHelperMissing.

	Compiler.prototype = {
	  compiler: Compiler,

	  equals: function equals(other) {
	    var len = this.opcodes.length;
	    if (other.opcodes.length !== len) {
	      return false;
	    }

	    for (var i = 0; i < len; i++) {
	      var opcode = this.opcodes[i],
	          otherOpcode = other.opcodes[i];
	      if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
	        return false;
	      }
	    }

	    // We know that length is the same between the two arrays because they are directly tied
	    // to the opcode behavior above.
	    len = this.children.length;
	    for (var i = 0; i < len; i++) {
	      if (!this.children[i].equals(other.children[i])) {
	        return false;
	      }
	    }

	    return true;
	  },

	  guid: 0,

	  compile: function compile(program, options) {
	    this.sourceNode = [];
	    this.opcodes = [];
	    this.children = [];
	    this.options = options;
	    this.stringParams = options.stringParams;
	    this.trackIds = options.trackIds;

	    options.blockParams = options.blockParams || [];

	    // These changes will propagate to the other compiler components
	    var knownHelpers = options.knownHelpers;
	    options.knownHelpers = {
	      'helperMissing': true,
	      'blockHelperMissing': true,
	      'each': true,
	      'if': true,
	      'unless': true,
	      'with': true,
	      'log': true,
	      'lookup': true
	    };
	    if (knownHelpers) {
	      for (var _name in knownHelpers) {
	        /* istanbul ignore else */
	        if (_name in knownHelpers) {
	          options.knownHelpers[_name] = knownHelpers[_name];
	        }
	      }
	    }

	    return this.accept(program);
	  },

	  compileProgram: function compileProgram(program) {
	    var childCompiler = new this.compiler(),
	        // eslint-disable-line new-cap
	    result = childCompiler.compile(program, this.options),
	        guid = this.guid++;

	    this.usePartial = this.usePartial || result.usePartial;

	    this.children[guid] = result;
	    this.useDepths = this.useDepths || result.useDepths;

	    return guid;
	  },

	  accept: function accept(node) {
	    /* istanbul ignore next: Sanity code */
	    if (!this[node.type]) {
	      throw new _exception2['default']('Unknown type: ' + node.type, node);
	    }

	    this.sourceNode.unshift(node);
	    var ret = this[node.type](node);
	    this.sourceNode.shift();
	    return ret;
	  },

	  Program: function Program(program) {
	    this.options.blockParams.unshift(program.blockParams);

	    var body = program.body,
	        bodyLength = body.length;
	    for (var i = 0; i < bodyLength; i++) {
	      this.accept(body[i]);
	    }

	    this.options.blockParams.shift();

	    this.isSimple = bodyLength === 1;
	    this.blockParams = program.blockParams ? program.blockParams.length : 0;

	    return this;
	  },

	  BlockStatement: function BlockStatement(block) {
	    transformLiteralToPath(block);

	    var program = block.program,
	        inverse = block.inverse;

	    program = program && this.compileProgram(program);
	    inverse = inverse && this.compileProgram(inverse);

	    var type = this.classifySexpr(block);

	    if (type === 'helper') {
	      this.helperSexpr(block, program, inverse);
	    } else if (type === 'simple') {
	      this.simpleSexpr(block);

	      // now that the simple mustache is resolved, we need to
	      // evaluate it by executing `blockHelperMissing`
	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);
	      this.opcode('emptyHash');
	      this.opcode('blockValue', block.path.original);
	    } else {
	      this.ambiguousSexpr(block, program, inverse);

	      // now that the simple mustache is resolved, we need to
	      // evaluate it by executing `blockHelperMissing`
	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);
	      this.opcode('emptyHash');
	      this.opcode('ambiguousBlockValue');
	    }

	    this.opcode('append');
	  },

	  DecoratorBlock: function DecoratorBlock(decorator) {
	    var program = decorator.program && this.compileProgram(decorator.program);
	    var params = this.setupFullMustacheParams(decorator, program, undefined),
	        path = decorator.path;

	    this.useDecorators = true;
	    this.opcode('registerDecorator', params.length, path.original);
	  },

	  PartialStatement: function PartialStatement(partial) {
	    this.usePartial = true;

	    var program = partial.program;
	    if (program) {
	      program = this.compileProgram(partial.program);
	    }

	    var params = partial.params;
	    if (params.length > 1) {
	      throw new _exception2['default']('Unsupported number of partial arguments: ' + params.length, partial);
	    } else if (!params.length) {
	      if (this.options.explicitPartialContext) {
	        this.opcode('pushLiteral', 'undefined');
	      } else {
	        params.push({ type: 'PathExpression', parts: [], depth: 0 });
	      }
	    }

	    var partialName = partial.name.original,
	        isDynamic = partial.name.type === 'SubExpression';
	    if (isDynamic) {
	      this.accept(partial.name);
	    }

	    this.setupFullMustacheParams(partial, program, undefined, true);

	    var indent = partial.indent || '';
	    if (this.options.preventIndent && indent) {
	      this.opcode('appendContent', indent);
	      indent = '';
	    }

	    this.opcode('invokePartial', isDynamic, partialName, indent);
	    this.opcode('append');
	  },
	  PartialBlockStatement: function PartialBlockStatement(partialBlock) {
	    this.PartialStatement(partialBlock);
	  },

	  MustacheStatement: function MustacheStatement(mustache) {
	    this.SubExpression(mustache);

	    if (mustache.escaped && !this.options.noEscape) {
	      this.opcode('appendEscaped');
	    } else {
	      this.opcode('append');
	    }
	  },
	  Decorator: function Decorator(decorator) {
	    this.DecoratorBlock(decorator);
	  },

	  ContentStatement: function ContentStatement(content) {
	    if (content.value) {
	      this.opcode('appendContent', content.value);
	    }
	  },

	  CommentStatement: function CommentStatement() {},

	  SubExpression: function SubExpression(sexpr) {
	    transformLiteralToPath(sexpr);
	    var type = this.classifySexpr(sexpr);

	    if (type === 'simple') {
	      this.simpleSexpr(sexpr);
	    } else if (type === 'helper') {
	      this.helperSexpr(sexpr);
	    } else {
	      this.ambiguousSexpr(sexpr);
	    }
	  },
	  ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
	    var path = sexpr.path,
	        name = path.parts[0],
	        isBlock = program != null || inverse != null;

	    this.opcode('getContext', path.depth);

	    this.opcode('pushProgram', program);
	    this.opcode('pushProgram', inverse);

	    path.strict = true;
	    this.accept(path);

	    this.opcode('invokeAmbiguous', name, isBlock);
	  },

	  simpleSexpr: function simpleSexpr(sexpr) {
	    var path = sexpr.path;
	    path.strict = true;
	    this.accept(path);
	    this.opcode('resolvePossibleLambda');
	  },

	  helperSexpr: function helperSexpr(sexpr, program, inverse) {
	    var params = this.setupFullMustacheParams(sexpr, program, inverse),
	        path = sexpr.path,
	        name = path.parts[0];

	    if (this.options.knownHelpers[name]) {
	      this.opcode('invokeKnownHelper', params.length, name);
	    } else if (this.options.knownHelpersOnly) {
	      throw new _exception2['default']('You specified knownHelpersOnly, but used the unknown helper ' + name, sexpr);
	    } else {
	      path.strict = true;
	      path.falsy = true;

	      this.accept(path);
	      this.opcode('invokeHelper', params.length, path.original, _ast2['default'].helpers.simpleId(path));
	    }
	  },

	  PathExpression: function PathExpression(path) {
	    this.addDepth(path.depth);
	    this.opcode('getContext', path.depth);

	    var name = path.parts[0],
	        scoped = _ast2['default'].helpers.scopedId(path),
	        blockParamId = !path.depth && !scoped && this.blockParamIndex(name);

	    if (blockParamId) {
	      this.opcode('lookupBlockParam', blockParamId, path.parts);
	    } else if (!name) {
	      // Context reference, i.e. `{{foo .}}` or `{{foo ..}}`
	      this.opcode('pushContext');
	    } else if (path.data) {
	      this.options.data = true;
	      this.opcode('lookupData', path.depth, path.parts, path.strict);
	    } else {
	      this.opcode('lookupOnContext', path.parts, path.falsy, path.strict, scoped);
	    }
	  },

	  StringLiteral: function StringLiteral(string) {
	    this.opcode('pushString', string.value);
	  },

	  NumberLiteral: function NumberLiteral(number) {
	    this.opcode('pushLiteral', number.value);
	  },

	  BooleanLiteral: function BooleanLiteral(bool) {
	    this.opcode('pushLiteral', bool.value);
	  },

	  UndefinedLiteral: function UndefinedLiteral() {
	    this.opcode('pushLiteral', 'undefined');
	  },

	  NullLiteral: function NullLiteral() {
	    this.opcode('pushLiteral', 'null');
	  },

	  Hash: function Hash(hash) {
	    var pairs = hash.pairs,
	        i = 0,
	        l = pairs.length;

	    this.opcode('pushHash');

	    for (; i < l; i++) {
	      this.pushParam(pairs[i].value);
	    }
	    while (i--) {
	      this.opcode('assignToHash', pairs[i].key);
	    }
	    this.opcode('popHash');
	  },

	  // HELPERS
	  opcode: function opcode(name) {
	    this.opcodes.push({ opcode: name, args: slice.call(arguments, 1), loc: this.sourceNode[0].loc });
	  },

	  addDepth: function addDepth(depth) {
	    if (!depth) {
	      return;
	    }

	    this.useDepths = true;
	  },

	  classifySexpr: function classifySexpr(sexpr) {
	    var isSimple = _ast2['default'].helpers.simpleId(sexpr.path);

	    var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);

	    // a mustache is an eligible helper if:
	    // * its id is simple (a single part, not `this` or `..`)
	    var isHelper = !isBlockParam && _ast2['default'].helpers.helperExpression(sexpr);

	    // if a mustache is an eligible helper but not a definite
	    // helper, it is ambiguous, and will be resolved in a later
	    // pass or at runtime.
	    var isEligible = !isBlockParam && (isHelper || isSimple);

	    // if ambiguous, we can possibly resolve the ambiguity now
	    // An eligible helper is one that does not have a complex path, i.e. `this.foo`, `../foo` etc.
	    if (isEligible && !isHelper) {
	      var _name2 = sexpr.path.parts[0],
	          options = this.options;

	      if (options.knownHelpers[_name2]) {
	        isHelper = true;
	      } else if (options.knownHelpersOnly) {
	        isEligible = false;
	      }
	    }

	    if (isHelper) {
	      return 'helper';
	    } else if (isEligible) {
	      return 'ambiguous';
	    } else {
	      return 'simple';
	    }
	  },

	  pushParams: function pushParams(params) {
	    for (var i = 0, l = params.length; i < l; i++) {
	      this.pushParam(params[i]);
	    }
	  },

	  pushParam: function pushParam(val) {
	    var value = val.value != null ? val.value : val.original || '';

	    if (this.stringParams) {
	      if (value.replace) {
	        value = value.replace(/^(\.?\.\/)*/g, '').replace(/\//g, '.');
	      }

	      if (val.depth) {
	        this.addDepth(val.depth);
	      }
	      this.opcode('getContext', val.depth || 0);
	      this.opcode('pushStringParam', value, val.type);

	      if (val.type === 'SubExpression') {
	        // SubExpressions get evaluated and passed in
	        // in string params mode.
	        this.accept(val);
	      }
	    } else {
	      if (this.trackIds) {
	        var blockParamIndex = undefined;
	        if (val.parts && !_ast2['default'].helpers.scopedId(val) && !val.depth) {
	          blockParamIndex = this.blockParamIndex(val.parts[0]);
	        }
	        if (blockParamIndex) {
	          var blockParamChild = val.parts.slice(1).join('.');
	          this.opcode('pushId', 'BlockParam', blockParamIndex, blockParamChild);
	        } else {
	          value = val.original || value;
	          if (value.replace) {
	            value = value.replace(/^this(?:\.|$)/, '').replace(/^\.\//, '').replace(/^\.$/, '');
	          }

	          this.opcode('pushId', val.type, value);
	        }
	      }
	      this.accept(val);
	    }
	  },

	  setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
	    var params = sexpr.params;
	    this.pushParams(params);

	    this.opcode('pushProgram', program);
	    this.opcode('pushProgram', inverse);

	    if (sexpr.hash) {
	      this.accept(sexpr.hash);
	    } else {
	      this.opcode('emptyHash', omitEmpty);
	    }

	    return params;
	  },

	  blockParamIndex: function blockParamIndex(name) {
	    for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
	      var blockParams = this.options.blockParams[depth],
	          param = blockParams && _utils.indexOf(blockParams, name);
	      if (blockParams && param >= 0) {
	        return [depth, param];
	      }
	    }
	  }
	};

	function precompile(input, options, env) {
	  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
	    throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.precompile. You passed ' + input);
	  }

	  options = options || {};
	  if (!('data' in options)) {
	    options.data = true;
	  }
	  if (options.compat) {
	    options.useDepths = true;
	  }

	  var ast = env.parse(input, options),
	      environment = new env.Compiler().compile(ast, options);
	  return new env.JavaScriptCompiler().compile(environment, options);
	}

	function compile(input, options, env) {
	  if (options === undefined) options = {};

	  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
	    throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.compile. You passed ' + input);
	  }

	  if (!('data' in options)) {
	    options.data = true;
	  }
	  if (options.compat) {
	    options.useDepths = true;
	  }

	  var compiled = undefined;

	  function compileInput() {
	    var ast = env.parse(input, options),
	        environment = new env.Compiler().compile(ast, options),
	        templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
	    return env.template(templateSpec);
	  }

	  // Template is only compiled on first use and cached after that point.
	  function ret(context, execOptions) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled.call(this, context, execOptions);
	  }
	  ret._setup = function (setupOptions) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled._setup(setupOptions);
	  };
	  ret._child = function (i, data, blockParams, depths) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled._child(i, data, blockParams, depths);
	  };
	  return ret;
	}

	function argEquals(a, b) {
	  if (a === b) {
	    return true;
	  }

	  if (_utils.isArray(a) && _utils.isArray(b) && a.length === b.length) {
	    for (var i = 0; i < a.length; i++) {
	      if (!argEquals(a[i], b[i])) {
	        return false;
	      }
	    }
	    return true;
	  }
	}

	function transformLiteralToPath(sexpr) {
	  if (!sexpr.path.parts) {
	    var literal = sexpr.path;
	    // Casting to string here to make false and 0 literal values play nicely with the rest
	    // of the system.
	    sexpr.path = {
	      type: 'PathExpression',
	      data: false,
	      depth: 0,
	      parts: [literal.original + ''],
	      original: literal.original + '',
	      loc: literal.loc
	    };
	  }
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _base = __webpack_require__(4);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _utils = __webpack_require__(5);

	var _codeGen = __webpack_require__(29);

	var _codeGen2 = _interopRequireDefault(_codeGen);

	function Literal(value) {
	  this.value = value;
	}

	function JavaScriptCompiler() {}

	JavaScriptCompiler.prototype = {
	  // PUBLIC API: You can override these methods in a subclass to provide
	  // alternative compiled forms for name lookup and buffering semantics
	  nameLookup: function nameLookup(parent, name /* , type*/) {
	    if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
	      return [parent, '.', name];
	    } else {
	      return [parent, '[', JSON.stringify(name), ']'];
	    }
	  },
	  depthedLookup: function depthedLookup(name) {
	    return [this.aliasable('container.lookup'), '(depths, "', name, '")'];
	  },

	  compilerInfo: function compilerInfo() {
	    var revision = _base.COMPILER_REVISION,
	        versions = _base.REVISION_CHANGES[revision];
	    return [revision, versions];
	  },

	  appendToBuffer: function appendToBuffer(source, location, explicit) {
	    // Force a source as this simplifies the merge logic.
	    if (!_utils.isArray(source)) {
	      source = [source];
	    }
	    source = this.source.wrap(source, location);

	    if (this.environment.isSimple) {
	      return ['return ', source, ';'];
	    } else if (explicit) {
	      // This is a case where the buffer operation occurs as a child of another
	      // construct, generally braces. We have to explicitly output these buffer
	      // operations to ensure that the emitted code goes in the correct location.
	      return ['buffer += ', source, ';'];
	    } else {
	      source.appendToBuffer = true;
	      return source;
	    }
	  },

	  initializeBuffer: function initializeBuffer() {
	    return this.quotedString('');
	  },
	  // END PUBLIC API

	  compile: function compile(environment, options, context, asObject) {
	    this.environment = environment;
	    this.options = options;
	    this.stringParams = this.options.stringParams;
	    this.trackIds = this.options.trackIds;
	    this.precompile = !asObject;

	    this.name = this.environment.name;
	    this.isChild = !!context;
	    this.context = context || {
	      decorators: [],
	      programs: [],
	      environments: []
	    };

	    this.preamble();

	    this.stackSlot = 0;
	    this.stackVars = [];
	    this.aliases = {};
	    this.registers = { list: [] };
	    this.hashes = [];
	    this.compileStack = [];
	    this.inlineStack = [];
	    this.blockParams = [];

	    this.compileChildren(environment, options);

	    this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
	    this.useBlockParams = this.useBlockParams || environment.useBlockParams;

	    var opcodes = environment.opcodes,
	        opcode = undefined,
	        firstLoc = undefined,
	        i = undefined,
	        l = undefined;

	    for (i = 0, l = opcodes.length; i < l; i++) {
	      opcode = opcodes[i];

	      this.source.currentLocation = opcode.loc;
	      firstLoc = firstLoc || opcode.loc;
	      this[opcode.opcode].apply(this, opcode.args);
	    }

	    // Flush any trailing content that might be pending.
	    this.source.currentLocation = firstLoc;
	    this.pushSource('');

	    /* istanbul ignore next */
	    if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
	      throw new _exception2['default']('Compile completed with content left on stack');
	    }

	    if (!this.decorators.isEmpty()) {
	      this.useDecorators = true;

	      this.decorators.prepend('var decorators = container.decorators;\n');
	      this.decorators.push('return fn;');

	      if (asObject) {
	        this.decorators = Function.apply(this, ['fn', 'props', 'container', 'depth0', 'data', 'blockParams', 'depths', this.decorators.merge()]);
	      } else {
	        this.decorators.prepend('function(fn, props, container, depth0, data, blockParams, depths) {\n');
	        this.decorators.push('}\n');
	        this.decorators = this.decorators.merge();
	      }
	    } else {
	      this.decorators = undefined;
	    }

	    var fn = this.createFunctionContext(asObject);
	    if (!this.isChild) {
	      var ret = {
	        compiler: this.compilerInfo(),
	        main: fn
	      };

	      if (this.decorators) {
	        ret.main_d = this.decorators; // eslint-disable-line camelcase
	        ret.useDecorators = true;
	      }

	      var _context = this.context;
	      var programs = _context.programs;
	      var decorators = _context.decorators;

	      for (i = 0, l = programs.length; i < l; i++) {
	        if (programs[i]) {
	          ret[i] = programs[i];
	          if (decorators[i]) {
	            ret[i + '_d'] = decorators[i];
	            ret.useDecorators = true;
	          }
	        }
	      }

	      if (this.environment.usePartial) {
	        ret.usePartial = true;
	      }
	      if (this.options.data) {
	        ret.useData = true;
	      }
	      if (this.useDepths) {
	        ret.useDepths = true;
	      }
	      if (this.useBlockParams) {
	        ret.useBlockParams = true;
	      }
	      if (this.options.compat) {
	        ret.compat = true;
	      }

	      if (!asObject) {
	        ret.compiler = JSON.stringify(ret.compiler);

	        this.source.currentLocation = { start: { line: 1, column: 0 } };
	        ret = this.objectLiteral(ret);

	        if (options.srcName) {
	          ret = ret.toStringWithSourceMap({ file: options.destName });
	          ret.map = ret.map && ret.map.toString();
	        } else {
	          ret = ret.toString();
	        }
	      } else {
	        ret.compilerOptions = this.options;
	      }

	      return ret;
	    } else {
	      return fn;
	    }
	  },

	  preamble: function preamble() {
	    // track the last context pushed into place to allow skipping the
	    // getContext opcode when it would be a noop
	    this.lastContext = 0;
	    this.source = new _codeGen2['default'](this.options.srcName);
	    this.decorators = new _codeGen2['default'](this.options.srcName);
	  },

	  createFunctionContext: function createFunctionContext(asObject) {
	    var varDeclarations = '';

	    var locals = this.stackVars.concat(this.registers.list);
	    if (locals.length > 0) {
	      varDeclarations += ', ' + locals.join(', ');
	    }

	    // Generate minimizer alias mappings
	    //
	    // When using true SourceNodes, this will update all references to the given alias
	    // as the source nodes are reused in situ. For the non-source node compilation mode,
	    // aliases will not be used, but this case is already being run on the client and
	    // we aren't concern about minimizing the template size.
	    var aliasCount = 0;
	    for (var alias in this.aliases) {
	      // eslint-disable-line guard-for-in
	      var node = this.aliases[alias];

	      if (this.aliases.hasOwnProperty(alias) && node.children && node.referenceCount > 1) {
	        varDeclarations += ', alias' + ++aliasCount + '=' + alias;
	        node.children[0] = 'alias' + aliasCount;
	      }
	    }

	    var params = ['container', 'depth0', 'helpers', 'partials', 'data'];

	    if (this.useBlockParams || this.useDepths) {
	      params.push('blockParams');
	    }
	    if (this.useDepths) {
	      params.push('depths');
	    }

	    // Perform a second pass over the output to merge content when possible
	    var source = this.mergeSource(varDeclarations);

	    if (asObject) {
	      params.push(source);

	      return Function.apply(this, params);
	    } else {
	      return this.source.wrap(['function(', params.join(','), ') {\n  ', source, '}']);
	    }
	  },
	  mergeSource: function mergeSource(varDeclarations) {
	    var isSimple = this.environment.isSimple,
	        appendOnly = !this.forceBuffer,
	        appendFirst = undefined,
	        sourceSeen = undefined,
	        bufferStart = undefined,
	        bufferEnd = undefined;
	    this.source.each(function (line) {
	      if (line.appendToBuffer) {
	        if (bufferStart) {
	          line.prepend('  + ');
	        } else {
	          bufferStart = line;
	        }
	        bufferEnd = line;
	      } else {
	        if (bufferStart) {
	          if (!sourceSeen) {
	            appendFirst = true;
	          } else {
	            bufferStart.prepend('buffer += ');
	          }
	          bufferEnd.add(';');
	          bufferStart = bufferEnd = undefined;
	        }

	        sourceSeen = true;
	        if (!isSimple) {
	          appendOnly = false;
	        }
	      }
	    });

	    if (appendOnly) {
	      if (bufferStart) {
	        bufferStart.prepend('return ');
	        bufferEnd.add(';');
	      } else if (!sourceSeen) {
	        this.source.push('return "";');
	      }
	    } else {
	      varDeclarations += ', buffer = ' + (appendFirst ? '' : this.initializeBuffer());

	      if (bufferStart) {
	        bufferStart.prepend('return buffer + ');
	        bufferEnd.add(';');
	      } else {
	        this.source.push('return buffer;');
	      }
	    }

	    if (varDeclarations) {
	      this.source.prepend('var ' + varDeclarations.substring(2) + (appendFirst ? '' : ';\n'));
	    }

	    return this.source.merge();
	  },

	  // [blockValue]
	  //
	  // On stack, before: hash, inverse, program, value
	  // On stack, after: return value of blockHelperMissing
	  //
	  // The purpose of this opcode is to take a block of the form
	  // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
	  // replace it on the stack with the result of properly
	  // invoking blockHelperMissing.
	  blockValue: function blockValue(name) {
	    var blockHelperMissing = this.aliasable('helpers.blockHelperMissing'),
	        params = [this.contextName(0)];
	    this.setupHelperArgs(name, 0, params);

	    var blockName = this.popStack();
	    params.splice(1, 0, blockName);

	    this.push(this.source.functionCall(blockHelperMissing, 'call', params));
	  },

	  // [ambiguousBlockValue]
	  //
	  // On stack, before: hash, inverse, program, value
	  // Compiler value, before: lastHelper=value of last found helper, if any
	  // On stack, after, if no lastHelper: same as [blockValue]
	  // On stack, after, if lastHelper: value
	  ambiguousBlockValue: function ambiguousBlockValue() {
	    // We're being a bit cheeky and reusing the options value from the prior exec
	    var blockHelperMissing = this.aliasable('helpers.blockHelperMissing'),
	        params = [this.contextName(0)];
	    this.setupHelperArgs('', 0, params, true);

	    this.flushInline();

	    var current = this.topStack();
	    params.splice(1, 0, current);

	    this.pushSource(['if (!', this.lastHelper, ') { ', current, ' = ', this.source.functionCall(blockHelperMissing, 'call', params), '}']);
	  },

	  // [appendContent]
	  //
	  // On stack, before: ...
	  // On stack, after: ...
	  //
	  // Appends the string value of `content` to the current buffer
	  appendContent: function appendContent(content) {
	    if (this.pendingContent) {
	      content = this.pendingContent + content;
	    } else {
	      this.pendingLocation = this.source.currentLocation;
	    }

	    this.pendingContent = content;
	  },

	  // [append]
	  //
	  // On stack, before: value, ...
	  // On stack, after: ...
	  //
	  // Coerces `value` to a String and appends it to the current buffer.
	  //
	  // If `value` is truthy, or 0, it is coerced into a string and appended
	  // Otherwise, the empty string is appended
	  append: function append() {
	    if (this.isInline()) {
	      this.replaceStack(function (current) {
	        return [' != null ? ', current, ' : ""'];
	      });

	      this.pushSource(this.appendToBuffer(this.popStack()));
	    } else {
	      var local = this.popStack();
	      this.pushSource(['if (', local, ' != null) { ', this.appendToBuffer(local, undefined, true), ' }']);
	      if (this.environment.isSimple) {
	        this.pushSource(['else { ', this.appendToBuffer("''", undefined, true), ' }']);
	      }
	    }
	  },

	  // [appendEscaped]
	  //
	  // On stack, before: value, ...
	  // On stack, after: ...
	  //
	  // Escape `value` and append it to the buffer
	  appendEscaped: function appendEscaped() {
	    this.pushSource(this.appendToBuffer([this.aliasable('container.escapeExpression'), '(', this.popStack(), ')']));
	  },

	  // [getContext]
	  //
	  // On stack, before: ...
	  // On stack, after: ...
	  // Compiler value, after: lastContext=depth
	  //
	  // Set the value of the `lastContext` compiler value to the depth
	  getContext: function getContext(depth) {
	    this.lastContext = depth;
	  },

	  // [pushContext]
	  //
	  // On stack, before: ...
	  // On stack, after: currentContext, ...
	  //
	  // Pushes the value of the current context onto the stack.
	  pushContext: function pushContext() {
	    this.pushStackLiteral(this.contextName(this.lastContext));
	  },

	  // [lookupOnContext]
	  //
	  // On stack, before: ...
	  // On stack, after: currentContext[name], ...
	  //
	  // Looks up the value of `name` on the current context and pushes
	  // it onto the stack.
	  lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
	    var i = 0;

	    if (!scoped && this.options.compat && !this.lastContext) {
	      // The depthed query is expected to handle the undefined logic for the root level that
	      // is implemented below, so we evaluate that directly in compat mode
	      this.push(this.depthedLookup(parts[i++]));
	    } else {
	      this.pushContext();
	    }

	    this.resolvePath('context', parts, i, falsy, strict);
	  },

	  // [lookupBlockParam]
	  //
	  // On stack, before: ...
	  // On stack, after: blockParam[name], ...
	  //
	  // Looks up the value of `parts` on the given block param and pushes
	  // it onto the stack.
	  lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
	    this.useBlockParams = true;

	    this.push(['blockParams[', blockParamId[0], '][', blockParamId[1], ']']);
	    this.resolvePath('context', parts, 1);
	  },

	  // [lookupData]
	  //
	  // On stack, before: ...
	  // On stack, after: data, ...
	  //
	  // Push the data lookup operator
	  lookupData: function lookupData(depth, parts, strict) {
	    if (!depth) {
	      this.pushStackLiteral('data');
	    } else {
	      this.pushStackLiteral('container.data(data, ' + depth + ')');
	    }

	    this.resolvePath('data', parts, 0, true, strict);
	  },

	  resolvePath: function resolvePath(type, parts, i, falsy, strict) {
	    // istanbul ignore next

	    var _this = this;

	    if (this.options.strict || this.options.assumeObjects) {
	      this.push(strictLookup(this.options.strict && strict, this, parts, type));
	      return;
	    }

	    var len = parts.length;
	    for (; i < len; i++) {
	      /* eslint-disable no-loop-func */
	      this.replaceStack(function (current) {
	        var lookup = _this.nameLookup(current, parts[i], type);
	        // We want to ensure that zero and false are handled properly if the context (falsy flag)
	        // needs to have the special handling for these values.
	        if (!falsy) {
	          return [' != null ? ', lookup, ' : ', current];
	        } else {
	          // Otherwise we can use generic falsy handling
	          return [' && ', lookup];
	        }
	      });
	      /* eslint-enable no-loop-func */
	    }
	  },

	  // [resolvePossibleLambda]
	  //
	  // On stack, before: value, ...
	  // On stack, after: resolved value, ...
	  //
	  // If the `value` is a lambda, replace it on the stack by
	  // the return value of the lambda
	  resolvePossibleLambda: function resolvePossibleLambda() {
	    this.push([this.aliasable('container.lambda'), '(', this.popStack(), ', ', this.contextName(0), ')']);
	  },

	  // [pushStringParam]
	  //
	  // On stack, before: ...
	  // On stack, after: string, currentContext, ...
	  //
	  // This opcode is designed for use in string mode, which
	  // provides the string value of a parameter along with its
	  // depth rather than resolving it immediately.
	  pushStringParam: function pushStringParam(string, type) {
	    this.pushContext();
	    this.pushString(type);

	    // If it's a subexpression, the string result
	    // will be pushed after this opcode.
	    if (type !== 'SubExpression') {
	      if (typeof string === 'string') {
	        this.pushString(string);
	      } else {
	        this.pushStackLiteral(string);
	      }
	    }
	  },

	  emptyHash: function emptyHash(omitEmpty) {
	    if (this.trackIds) {
	      this.push('{}'); // hashIds
	    }
	    if (this.stringParams) {
	      this.push('{}'); // hashContexts
	      this.push('{}'); // hashTypes
	    }
	    this.pushStackLiteral(omitEmpty ? 'undefined' : '{}');
	  },
	  pushHash: function pushHash() {
	    if (this.hash) {
	      this.hashes.push(this.hash);
	    }
	    this.hash = { values: [], types: [], contexts: [], ids: [] };
	  },
	  popHash: function popHash() {
	    var hash = this.hash;
	    this.hash = this.hashes.pop();

	    if (this.trackIds) {
	      this.push(this.objectLiteral(hash.ids));
	    }
	    if (this.stringParams) {
	      this.push(this.objectLiteral(hash.contexts));
	      this.push(this.objectLiteral(hash.types));
	    }

	    this.push(this.objectLiteral(hash.values));
	  },

	  // [pushString]
	  //
	  // On stack, before: ...
	  // On stack, after: quotedString(string), ...
	  //
	  // Push a quoted version of `string` onto the stack
	  pushString: function pushString(string) {
	    this.pushStackLiteral(this.quotedString(string));
	  },

	  // [pushLiteral]
	  //
	  // On stack, before: ...
	  // On stack, after: value, ...
	  //
	  // Pushes a value onto the stack. This operation prevents
	  // the compiler from creating a temporary variable to hold
	  // it.
	  pushLiteral: function pushLiteral(value) {
	    this.pushStackLiteral(value);
	  },

	  // [pushProgram]
	  //
	  // On stack, before: ...
	  // On stack, after: program(guid), ...
	  //
	  // Push a program expression onto the stack. This takes
	  // a compile-time guid and converts it into a runtime-accessible
	  // expression.
	  pushProgram: function pushProgram(guid) {
	    if (guid != null) {
	      this.pushStackLiteral(this.programExpression(guid));
	    } else {
	      this.pushStackLiteral(null);
	    }
	  },

	  // [registerDecorator]
	  //
	  // On stack, before: hash, program, params..., ...
	  // On stack, after: ...
	  //
	  // Pops off the decorator's parameters, invokes the decorator,
	  // and inserts the decorator into the decorators list.
	  registerDecorator: function registerDecorator(paramSize, name) {
	    var foundDecorator = this.nameLookup('decorators', name, 'decorator'),
	        options = this.setupHelperArgs(name, paramSize);

	    this.decorators.push(['fn = ', this.decorators.functionCall(foundDecorator, '', ['fn', 'props', 'container', options]), ' || fn;']);
	  },

	  // [invokeHelper]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of helper invocation
	  //
	  // Pops off the helper's parameters, invokes the helper,
	  // and pushes the helper's return value onto the stack.
	  //
	  // If the helper is not found, `helperMissing` is called.
	  invokeHelper: function invokeHelper(paramSize, name, isSimple) {
	    var nonHelper = this.popStack(),
	        helper = this.setupHelper(paramSize, name),
	        simple = isSimple ? [helper.name, ' || '] : '';

	    var lookup = ['('].concat(simple, nonHelper);
	    if (!this.options.strict) {
	      lookup.push(' || ', this.aliasable('helpers.helperMissing'));
	    }
	    lookup.push(')');

	    this.push(this.source.functionCall(lookup, 'call', helper.callParams));
	  },

	  // [invokeKnownHelper]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of helper invocation
	  //
	  // This operation is used when the helper is known to exist,
	  // so a `helperMissing` fallback is not required.
	  invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
	    var helper = this.setupHelper(paramSize, name);
	    this.push(this.source.functionCall(helper.name, 'call', helper.callParams));
	  },

	  // [invokeAmbiguous]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of disambiguation
	  //
	  // This operation is used when an expression like `{{foo}}`
	  // is provided, but we don't know at compile-time whether it
	  // is a helper or a path.
	  //
	  // This operation emits more code than the other options,
	  // and can be avoided by passing the `knownHelpers` and
	  // `knownHelpersOnly` flags at compile-time.
	  invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
	    this.useRegister('helper');

	    var nonHelper = this.popStack();

	    this.emptyHash();
	    var helper = this.setupHelper(0, name, helperCall);

	    var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

	    var lookup = ['(', '(helper = ', helperName, ' || ', nonHelper, ')'];
	    if (!this.options.strict) {
	      lookup[0] = '(helper = ';
	      lookup.push(' != null ? helper : ', this.aliasable('helpers.helperMissing'));
	    }

	    this.push(['(', lookup, helper.paramsInit ? ['),(', helper.paramsInit] : [], '),', '(typeof helper === ', this.aliasable('"function"'), ' ? ', this.source.functionCall('helper', 'call', helper.callParams), ' : helper))']);
	  },

	  // [invokePartial]
	  //
	  // On stack, before: context, ...
	  // On stack after: result of partial invocation
	  //
	  // This operation pops off a context, invokes a partial with that context,
	  // and pushes the result of the invocation back.
	  invokePartial: function invokePartial(isDynamic, name, indent) {
	    var params = [],
	        options = this.setupParams(name, 1, params);

	    if (isDynamic) {
	      name = this.popStack();
	      delete options.name;
	    }

	    if (indent) {
	      options.indent = JSON.stringify(indent);
	    }
	    options.helpers = 'helpers';
	    options.partials = 'partials';
	    options.decorators = 'container.decorators';

	    if (!isDynamic) {
	      params.unshift(this.nameLookup('partials', name, 'partial'));
	    } else {
	      params.unshift(name);
	    }

	    if (this.options.compat) {
	      options.depths = 'depths';
	    }
	    options = this.objectLiteral(options);
	    params.push(options);

	    this.push(this.source.functionCall('container.invokePartial', '', params));
	  },

	  // [assignToHash]
	  //
	  // On stack, before: value, ..., hash, ...
	  // On stack, after: ..., hash, ...
	  //
	  // Pops a value off the stack and assigns it to the current hash
	  assignToHash: function assignToHash(key) {
	    var value = this.popStack(),
	        context = undefined,
	        type = undefined,
	        id = undefined;

	    if (this.trackIds) {
	      id = this.popStack();
	    }
	    if (this.stringParams) {
	      type = this.popStack();
	      context = this.popStack();
	    }

	    var hash = this.hash;
	    if (context) {
	      hash.contexts[key] = context;
	    }
	    if (type) {
	      hash.types[key] = type;
	    }
	    if (id) {
	      hash.ids[key] = id;
	    }
	    hash.values[key] = value;
	  },

	  pushId: function pushId(type, name, child) {
	    if (type === 'BlockParam') {
	      this.pushStackLiteral('blockParams[' + name[0] + '].path[' + name[1] + ']' + (child ? ' + ' + JSON.stringify('.' + child) : ''));
	    } else if (type === 'PathExpression') {
	      this.pushString(name);
	    } else if (type === 'SubExpression') {
	      this.pushStackLiteral('true');
	    } else {
	      this.pushStackLiteral('null');
	    }
	  },

	  // HELPERS

	  compiler: JavaScriptCompiler,

	  compileChildren: function compileChildren(environment, options) {
	    var children = environment.children,
	        child = undefined,
	        compiler = undefined;

	    for (var i = 0, l = children.length; i < l; i++) {
	      child = children[i];
	      compiler = new this.compiler(); // eslint-disable-line new-cap

	      var index = this.matchExistingProgram(child);

	      if (index == null) {
	        this.context.programs.push(''); // Placeholder to prevent name conflicts for nested children
	        index = this.context.programs.length;
	        child.index = index;
	        child.name = 'program' + index;
	        this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
	        this.context.decorators[index] = compiler.decorators;
	        this.context.environments[index] = child;

	        this.useDepths = this.useDepths || compiler.useDepths;
	        this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
	      } else {
	        child.index = index;
	        child.name = 'program' + index;

	        this.useDepths = this.useDepths || child.useDepths;
	        this.useBlockParams = this.useBlockParams || child.useBlockParams;
	      }
	    }
	  },
	  matchExistingProgram: function matchExistingProgram(child) {
	    for (var i = 0, len = this.context.environments.length; i < len; i++) {
	      var environment = this.context.environments[i];
	      if (environment && environment.equals(child)) {
	        return i;
	      }
	    }
	  },

	  programExpression: function programExpression(guid) {
	    var child = this.environment.children[guid],
	        programParams = [child.index, 'data', child.blockParams];

	    if (this.useBlockParams || this.useDepths) {
	      programParams.push('blockParams');
	    }
	    if (this.useDepths) {
	      programParams.push('depths');
	    }

	    return 'container.program(' + programParams.join(', ') + ')';
	  },

	  useRegister: function useRegister(name) {
	    if (!this.registers[name]) {
	      this.registers[name] = true;
	      this.registers.list.push(name);
	    }
	  },

	  push: function push(expr) {
	    if (!(expr instanceof Literal)) {
	      expr = this.source.wrap(expr);
	    }

	    this.inlineStack.push(expr);
	    return expr;
	  },

	  pushStackLiteral: function pushStackLiteral(item) {
	    this.push(new Literal(item));
	  },

	  pushSource: function pushSource(source) {
	    if (this.pendingContent) {
	      this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
	      this.pendingContent = undefined;
	    }

	    if (source) {
	      this.source.push(source);
	    }
	  },

	  replaceStack: function replaceStack(callback) {
	    var prefix = ['('],
	        stack = undefined,
	        createdStack = undefined,
	        usedLiteral = undefined;

	    /* istanbul ignore next */
	    if (!this.isInline()) {
	      throw new _exception2['default']('replaceStack on non-inline');
	    }

	    // We want to merge the inline statement into the replacement statement via ','
	    var top = this.popStack(true);

	    if (top instanceof Literal) {
	      // Literals do not need to be inlined
	      stack = [top.value];
	      prefix = ['(', stack];
	      usedLiteral = true;
	    } else {
	      // Get or create the current stack name for use by the inline
	      createdStack = true;
	      var _name = this.incrStack();

	      prefix = ['((', this.push(_name), ' = ', top, ')'];
	      stack = this.topStack();
	    }

	    var item = callback.call(this, stack);

	    if (!usedLiteral) {
	      this.popStack();
	    }
	    if (createdStack) {
	      this.stackSlot--;
	    }
	    this.push(prefix.concat(item, ')'));
	  },

	  incrStack: function incrStack() {
	    this.stackSlot++;
	    if (this.stackSlot > this.stackVars.length) {
	      this.stackVars.push('stack' + this.stackSlot);
	    }
	    return this.topStackName();
	  },
	  topStackName: function topStackName() {
	    return 'stack' + this.stackSlot;
	  },
	  flushInline: function flushInline() {
	    var inlineStack = this.inlineStack;
	    this.inlineStack = [];
	    for (var i = 0, len = inlineStack.length; i < len; i++) {
	      var entry = inlineStack[i];
	      /* istanbul ignore if */
	      if (entry instanceof Literal) {
	        this.compileStack.push(entry);
	      } else {
	        var stack = this.incrStack();
	        this.pushSource([stack, ' = ', entry, ';']);
	        this.compileStack.push(stack);
	      }
	    }
	  },
	  isInline: function isInline() {
	    return this.inlineStack.length;
	  },

	  popStack: function popStack(wrapped) {
	    var inline = this.isInline(),
	        item = (inline ? this.inlineStack : this.compileStack).pop();

	    if (!wrapped && item instanceof Literal) {
	      return item.value;
	    } else {
	      if (!inline) {
	        /* istanbul ignore next */
	        if (!this.stackSlot) {
	          throw new _exception2['default']('Invalid stack pop');
	        }
	        this.stackSlot--;
	      }
	      return item;
	    }
	  },

	  topStack: function topStack() {
	    var stack = this.isInline() ? this.inlineStack : this.compileStack,
	        item = stack[stack.length - 1];

	    /* istanbul ignore if */
	    if (item instanceof Literal) {
	      return item.value;
	    } else {
	      return item;
	    }
	  },

	  contextName: function contextName(context) {
	    if (this.useDepths && context) {
	      return 'depths[' + context + ']';
	    } else {
	      return 'depth' + context;
	    }
	  },

	  quotedString: function quotedString(str) {
	    return this.source.quotedString(str);
	  },

	  objectLiteral: function objectLiteral(obj) {
	    return this.source.objectLiteral(obj);
	  },

	  aliasable: function aliasable(name) {
	    var ret = this.aliases[name];
	    if (ret) {
	      ret.referenceCount++;
	      return ret;
	    }

	    ret = this.aliases[name] = this.source.wrap(name);
	    ret.aliasable = true;
	    ret.referenceCount = 1;

	    return ret;
	  },

	  setupHelper: function setupHelper(paramSize, name, blockHelper) {
	    var params = [],
	        paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
	    var foundHelper = this.nameLookup('helpers', name, 'helper'),
	        callContext = this.aliasable(this.contextName(0) + ' != null ? ' + this.contextName(0) + ' : {}');

	    return {
	      params: params,
	      paramsInit: paramsInit,
	      name: foundHelper,
	      callParams: [callContext].concat(params)
	    };
	  },

	  setupParams: function setupParams(helper, paramSize, params) {
	    var options = {},
	        contexts = [],
	        types = [],
	        ids = [],
	        objectArgs = !params,
	        param = undefined;

	    if (objectArgs) {
	      params = [];
	    }

	    options.name = this.quotedString(helper);
	    options.hash = this.popStack();

	    if (this.trackIds) {
	      options.hashIds = this.popStack();
	    }
	    if (this.stringParams) {
	      options.hashTypes = this.popStack();
	      options.hashContexts = this.popStack();
	    }

	    var inverse = this.popStack(),
	        program = this.popStack();

	    // Avoid setting fn and inverse if neither are set. This allows
	    // helpers to do a check for `if (options.fn)`
	    if (program || inverse) {
	      options.fn = program || 'container.noop';
	      options.inverse = inverse || 'container.noop';
	    }

	    // The parameters go on to the stack in order (making sure that they are evaluated in order)
	    // so we need to pop them off the stack in reverse order
	    var i = paramSize;
	    while (i--) {
	      param = this.popStack();
	      params[i] = param;

	      if (this.trackIds) {
	        ids[i] = this.popStack();
	      }
	      if (this.stringParams) {
	        types[i] = this.popStack();
	        contexts[i] = this.popStack();
	      }
	    }

	    if (objectArgs) {
	      options.args = this.source.generateArray(params);
	    }

	    if (this.trackIds) {
	      options.ids = this.source.generateArray(ids);
	    }
	    if (this.stringParams) {
	      options.types = this.source.generateArray(types);
	      options.contexts = this.source.generateArray(contexts);
	    }

	    if (this.options.data) {
	      options.data = 'data';
	    }
	    if (this.useBlockParams) {
	      options.blockParams = 'blockParams';
	    }
	    return options;
	  },

	  setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
	    var options = this.setupParams(helper, paramSize, params);
	    options = this.objectLiteral(options);
	    if (useRegister) {
	      this.useRegister('options');
	      params.push('options');
	      return ['options=', options];
	    } else if (params) {
	      params.push(options);
	      return '';
	    } else {
	      return options;
	    }
	  }
	};

	(function () {
	  var reservedWords = ('break else new var' + ' case finally return void' + ' catch for switch while' + ' continue function this with' + ' default if throw' + ' delete in try' + ' do instanceof typeof' + ' abstract enum int short' + ' boolean export interface static' + ' byte extends long super' + ' char final native synchronized' + ' class float package throws' + ' const goto private transient' + ' debugger implements protected volatile' + ' double import public let yield await' + ' null true false').split(' ');

	  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

	  for (var i = 0, l = reservedWords.length; i < l; i++) {
	    compilerWords[reservedWords[i]] = true;
	  }
	})();

	JavaScriptCompiler.isValidJavaScriptVariableName = function (name) {
	  return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
	};

	function strictLookup(requireTerminal, compiler, parts, type) {
	  var stack = compiler.popStack(),
	      i = 0,
	      len = parts.length;
	  if (requireTerminal) {
	    len--;
	  }

	  for (; i < len; i++) {
	    stack = compiler.nameLookup(stack, parts[i], type);
	  }

	  if (requireTerminal) {
	    return [compiler.aliasable('container.strict'), '(', stack, ', ', compiler.quotedString(parts[i]), ')'];
	  } else {
	    return stack;
	  }
	}

	exports['default'] = JavaScriptCompiler;
	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* global define */
	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	var SourceNode = undefined;

	try {
	  /* istanbul ignore next */
	  if (false) {
	    // We don't support this in AMD environments. For these environments, we asusme that
	    // they are running on the browser and thus have no need for the source-map library.
	    var SourceMap = require('source-map');
	    SourceNode = SourceMap.SourceNode;
	  }
	} catch (err) {}
	/* NOP */

	/* istanbul ignore if: tested but not covered in istanbul due to dist build  */
	if (!SourceNode) {
	  SourceNode = function (line, column, srcFile, chunks) {
	    this.src = '';
	    if (chunks) {
	      this.add(chunks);
	    }
	  };
	  /* istanbul ignore next */
	  SourceNode.prototype = {
	    add: function add(chunks) {
	      if (_utils.isArray(chunks)) {
	        chunks = chunks.join('');
	      }
	      this.src += chunks;
	    },
	    prepend: function prepend(chunks) {
	      if (_utils.isArray(chunks)) {
	        chunks = chunks.join('');
	      }
	      this.src = chunks + this.src;
	    },
	    toStringWithSourceMap: function toStringWithSourceMap() {
	      return { code: this.toString() };
	    },
	    toString: function toString() {
	      return this.src;
	    }
	  };
	}

	function castChunk(chunk, codeGen, loc) {
	  if (_utils.isArray(chunk)) {
	    var ret = [];

	    for (var i = 0, len = chunk.length; i < len; i++) {
	      ret.push(codeGen.wrap(chunk[i], loc));
	    }
	    return ret;
	  } else if (typeof chunk === 'boolean' || typeof chunk === 'number') {
	    // Handle primitives that the SourceNode will throw up on
	    return chunk + '';
	  }
	  return chunk;
	}

	function CodeGen(srcFile) {
	  this.srcFile = srcFile;
	  this.source = [];
	}

	CodeGen.prototype = {
	  isEmpty: function isEmpty() {
	    return !this.source.length;
	  },
	  prepend: function prepend(source, loc) {
	    this.source.unshift(this.wrap(source, loc));
	  },
	  push: function push(source, loc) {
	    this.source.push(this.wrap(source, loc));
	  },

	  merge: function merge() {
	    var source = this.empty();
	    this.each(function (line) {
	      source.add(['  ', line, '\n']);
	    });
	    return source;
	  },

	  each: function each(iter) {
	    for (var i = 0, len = this.source.length; i < len; i++) {
	      iter(this.source[i]);
	    }
	  },

	  empty: function empty() {
	    var loc = this.currentLocation || { start: {} };
	    return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
	  },
	  wrap: function wrap(chunk) {
	    var loc = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || { start: {} } : arguments[1];

	    if (chunk instanceof SourceNode) {
	      return chunk;
	    }

	    chunk = castChunk(chunk, this, loc);

	    return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
	  },

	  functionCall: function functionCall(fn, type, params) {
	    params = this.generateList(params);
	    return this.wrap([fn, type ? '.' + type + '(' : '(', params, ')']);
	  },

	  quotedString: function quotedString(str) {
	    return '"' + (str + '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028') // Per Ecma-262 7.3 + 7.8.4
	    .replace(/\u2029/g, '\\u2029') + '"';
	  },

	  objectLiteral: function objectLiteral(obj) {
	    var pairs = [];

	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        var value = castChunk(obj[key], this);
	        if (value !== 'undefined') {
	          pairs.push([this.quotedString(key), ':', value]);
	        }
	      }
	    }

	    var ret = this.generateList(pairs);
	    ret.prepend('{');
	    ret.add('}');
	    return ret;
	  },

	  generateList: function generateList(entries) {
	    var ret = this.empty();

	    for (var i = 0, len = entries.length; i < len; i++) {
	      if (i) {
	        ret.add(',');
	      }

	      ret.add(castChunk(entries[i], this));
	    }

	    return ret;
	  },

	  generateArray: function generateArray(entries) {
	    var ret = this.generateList(entries);
	    ret.prepend('[');
	    ret.add(']');

	    return ret;
	  }
	};

	exports['default'] = CodeGen;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.algoliasearchHelper=e()}}(function(){return function e(t,r,n){function i(s,o){if(!r[s]){if(!t[s]){var c="function"==typeof require&&require;if(!o&&c)return c(s,!0);if(a)return a(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var f=r[s]={exports:{}};t[s][0].call(f.exports,function(e){var r=t[s][1][e];return i(r?r:e)},f,f.exports,e,t,r,n)}return r[s].exports}for(var a="function"==typeof require&&require,s=0;s<n.length;s++)i(n[s]);return i}({1:[function(e,t,r){"use strict";function n(e,t,r){return new i(e,t,r)}var i=e("./src/algoliasearch.helper"),a=e("./src/SearchParameters"),s=e("./src/SearchResults");n.version=e("./src/version.js"),n.AlgoliaSearchHelper=i,n.SearchParameters=a,n.SearchResults=s,n.url=e("./src/url"),t.exports=n},{"./src/SearchParameters":261,"./src/SearchResults":264,"./src/algoliasearch.helper":265,"./src/url":270,"./src/version.js":271}],2:[function(e,t,r){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function i(e){return"function"==typeof e}function a(e){return"number"==typeof e}function s(e){return"object"==typeof e&&null!==e}function o(e){return void 0===e}t.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(e){if(!a(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},n.prototype.emit=function(e){var t,r,n,a,c,u;if(this._events||(this._events={}),"error"===e&&(!this._events.error||s(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;var f=new Error('Uncaught, unspecified "error" event. ('+t+")");throw f.context=t,f}if(r=this._events[e],o(r))return!1;if(i(r))switch(arguments.length){case 1:r.call(this);break;case 2:r.call(this,arguments[1]);break;case 3:r.call(this,arguments[1],arguments[2]);break;default:a=Array.prototype.slice.call(arguments,1),r.apply(this,a)}else if(s(r))for(a=Array.prototype.slice.call(arguments,1),u=r.slice(),n=u.length,c=0;c<n;c++)u[c].apply(this,a);return!0},n.prototype.addListener=function(e,t){var r;if(!i(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,i(t.listener)?t.listener:t),this._events[e]?s(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,s(this._events[e])&&!this._events[e].warned&&(r=o(this._maxListeners)?n.defaultMaxListeners:this._maxListeners,r&&r>0&&this._events[e].length>r&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(e,t){function r(){this.removeListener(e,r),n||(n=!0,t.apply(this,arguments))}if(!i(t))throw TypeError("listener must be a function");var n=!1;return r.listener=t,this.on(e,r),this},n.prototype.removeListener=function(e,t){var r,n,a,o;if(!i(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(r=this._events[e],a=r.length,n=-1,r===t||i(r.listener)&&r.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(s(r)){for(o=a;o-- >0;)if(r[o]===t||r[o].listener&&r[o].listener===t){n=o;break}if(n<0)return this;1===r.length?(r.length=0,delete this._events[e]):r.splice(n,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},n.prototype.removeAllListeners=function(e){var t,r;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(r=this._events[e],i(r))this.removeListener(e,r);else if(r)for(;r.length;)this.removeListener(e,r[r.length-1]);return delete this._events[e],this},n.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?i(this._events[e])?[this._events[e]]:this._events[e].slice():[]},n.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(i(t))return 1;if(t)return t.length}return 0},n.listenerCount=function(e,t){return e.listenerCount(t)}},{}],3:[function(e,t,r){var n=e("./_getNative"),i=e("./_root"),a=n(i,"DataView");t.exports=a},{"./_getNative":124,"./_root":170}],4:[function(e,t,r){function n(e){var t=-1,r=e?e.length:0;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}var i=e("./_hashClear"),a=e("./_hashDelete"),s=e("./_hashGet"),o=e("./_hashHas"),c=e("./_hashSet");n.prototype.clear=i,n.prototype.delete=a,n.prototype.get=s,n.prototype.has=o,n.prototype.set=c,t.exports=n},{"./_hashClear":131,"./_hashDelete":132,"./_hashGet":133,"./_hashHas":134,"./_hashSet":135}],5:[function(e,t,r){function n(e){this.__wrapped__=e,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=s,this.__views__=[]}var i=e("./_baseCreate"),a=e("./_baseLodash"),s=4294967295;n.prototype=i(a.prototype),n.prototype.constructor=n,t.exports=n},{"./_baseCreate":35,"./_baseLodash":57}],6:[function(e,t,r){function n(e){var t=-1,r=e?e.length:0;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}var i=e("./_listCacheClear"),a=e("./_listCacheDelete"),s=e("./_listCacheGet"),o=e("./_listCacheHas"),c=e("./_listCacheSet");n.prototype.clear=i,n.prototype.delete=a,n.prototype.get=s,n.prototype.has=o,n.prototype.set=c,t.exports=n},{"./_listCacheClear":152,"./_listCacheDelete":153,"./_listCacheGet":154,"./_listCacheHas":155,"./_listCacheSet":156}],7:[function(e,t,r){function n(e,t){this.__wrapped__=e,this.__actions__=[],this.__chain__=!!t,this.__index__=0,this.__values__=void 0}var i=e("./_baseCreate"),a=e("./_baseLodash");n.prototype=i(a.prototype),n.prototype.constructor=n,t.exports=n},{"./_baseCreate":35,"./_baseLodash":57}],8:[function(e,t,r){var n=e("./_getNative"),i=e("./_root"),a=n(i,"Map");t.exports=a},{"./_getNative":124,"./_root":170}],9:[function(e,t,r){function n(e){var t=-1,r=e?e.length:0;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}var i=e("./_mapCacheClear"),a=e("./_mapCacheDelete"),s=e("./_mapCacheGet"),o=e("./_mapCacheHas"),c=e("./_mapCacheSet");n.prototype.clear=i,n.prototype.delete=a,n.prototype.get=s,n.prototype.has=o,n.prototype.set=c,t.exports=n},{"./_mapCacheClear":157,"./_mapCacheDelete":158,"./_mapCacheGet":159,"./_mapCacheHas":160,"./_mapCacheSet":161}],10:[function(e,t,r){var n=e("./_getNative"),i=e("./_root"),a=n(i,"Promise");t.exports=a},{"./_getNative":124,"./_root":170}],11:[function(e,t,r){var n=e("./_root"),i=n.Reflect;t.exports=i},{"./_root":170}],12:[function(e,t,r){var n=e("./_getNative"),i=e("./_root"),a=n(i,"Set");t.exports=a},{"./_getNative":124,"./_root":170}],13:[function(e,t,r){function n(e){var t=-1,r=e?e.length:0;for(this.__data__=new i;++t<r;)this.add(e[t])}var i=e("./_MapCache"),a=e("./_setCacheAdd"),s=e("./_setCacheHas");n.prototype.add=n.prototype.push=a,n.prototype.has=s,t.exports=n},{"./_MapCache":9,"./_setCacheAdd":171,"./_setCacheHas":172}],14:[function(e,t,r){function n(e){this.__data__=new i(e)}var i=e("./_ListCache"),a=e("./_stackClear"),s=e("./_stackDelete"),o=e("./_stackGet"),c=e("./_stackHas"),u=e("./_stackSet");n.prototype.clear=a,n.prototype.delete=s,n.prototype.get=o,n.prototype.has=c,n.prototype.set=u,t.exports=n},{"./_ListCache":6,"./_stackClear":175,"./_stackDelete":176,"./_stackGet":177,"./_stackHas":178,"./_stackSet":179}],15:[function(e,t,r){var n=e("./_root"),i=n.Symbol;t.exports=i},{"./_root":170}],16:[function(e,t,r){var n=e("./_root"),i=n.Uint8Array;t.exports=i},{"./_root":170}],17:[function(e,t,r){var n=e("./_getNative"),i=e("./_root"),a=n(i,"WeakMap");t.exports=a},{"./_getNative":124,"./_root":170}],18:[function(e,t,r){function n(e,t){return e.set(t[0],t[1]),e}t.exports=n},{}],19:[function(e,t,r){function n(e,t){return e.add(t),e}t.exports=n},{}],20:[function(e,t,r){function n(e,t,r){var n=r.length;switch(n){case 0:return e.call(t);case 1:return e.call(t,r[0]);case 2:return e.call(t,r[0],r[1]);case 3:return e.call(t,r[0],r[1],r[2])}return e.apply(t,r)}t.exports=n},{}],21:[function(e,t,r){function n(e,t){for(var r=-1,n=e?e.length:0;++r<n&&t(e[r],r,e)!==!1;);return e}t.exports=n},{}],22:[function(e,t,r){function n(e,t){for(var r=-1,n=e?e.length:0,i=0,a=[];++r<n;){var s=e[r];t(s,r,e)&&(a[i++]=s)}return a}t.exports=n},{}],23:[function(e,t,r){function n(e,t){var r=e?e.length:0;return!!r&&i(e,t,0)>-1}var i=e("./_baseIndexOf");t.exports=n},{"./_baseIndexOf":47}],24:[function(e,t,r){function n(e,t,r){for(var n=-1,i=e?e.length:0;++n<i;)if(r(t,e[n]))return!0;return!1}t.exports=n},{}],25:[function(e,t,r){function n(e,t){for(var r=-1,n=e?e.length:0,i=Array(n);++r<n;)i[r]=t(e[r],r,e);return i}t.exports=n},{}],26:[function(e,t,r){function n(e,t){for(var r=-1,n=t.length,i=e.length;++r<n;)e[i+r]=t[r];return e}t.exports=n},{}],27:[function(e,t,r){function n(e,t,r,n){var i=-1,a=e?e.length:0;for(n&&a&&(r=e[++i]);++i<a;)r=t(r,e[i],i,e);return r}t.exports=n},{}],28:[function(e,t,r){function n(e,t){for(var r=-1,n=e?e.length:0;++r<n;)if(t(e[r],r,e))return!0;return!1}t.exports=n},{}],29:[function(e,t,r){function n(e,t,r,n){return void 0===e||i(e,a[r])&&!s.call(n,r)?t:e}var i=e("./eq"),a=Object.prototype,s=a.hasOwnProperty;t.exports=n},{"./eq":190}],30:[function(e,t,r){function n(e,t,r){(void 0===r||i(e[t],r))&&("number"!=typeof t||void 0!==r||t in e)||(e[t]=r)}var i=e("./eq");t.exports=n},{"./eq":190}],31:[function(e,t,r){function n(e,t,r){var n=e[t];s.call(e,t)&&i(n,r)&&(void 0!==r||t in e)||(e[t]=r)}var i=e("./eq"),a=Object.prototype,s=a.hasOwnProperty;t.exports=n},{"./eq":190}],32:[function(e,t,r){function n(e,t){for(var r=e.length;r--;)if(i(e[r][0],t))return r;return-1}var i=e("./eq");t.exports=n},{"./eq":190}],33:[function(e,t,r){function n(e,t){return e&&i(t,a(t),e)}var i=e("./_copyObject"),a=e("./keys");t.exports=n},{"./_copyObject":97,"./keys":221}],34:[function(e,t,r){function n(e,t,r,j,R,F,O){var S;if(j&&(S=F?j(e,R,F,O):j(e)),void 0!==S)return S;if(!m(e))return e;var P=v(e);if(P){if(S=p(e),!t)return u(e,S)}else{var I=h(e),T=I==w||I==A;if(y(e))return c(e,t);if(I==E||I==x||T&&!F){if(g(e))return F?e:{};if(S=_(T?{}:e),!t)return f(e,o(S,e))}else{if(!V[I])return F?e:{};S=d(e,I,n,t)}}O||(O=new i);var C=O.get(e);if(C)return C;if(O.set(e,S),!P)var L=r?l(e):b(e);return a(L||e,function(i,a){L&&(a=i,i=e[a]),s(S,a,n(i,t,r,j,a,e,O))}),S}var i=e("./_Stack"),a=e("./_arrayEach"),s=e("./_assignValue"),o=e("./_baseAssign"),c=e("./_cloneBuffer"),u=e("./_copyArray"),f=e("./_copySymbols"),l=e("./_getAllKeys"),h=e("./_getTag"),p=e("./_initCloneArray"),d=e("./_initCloneByTag"),_=e("./_initCloneObject"),v=e("./isArray"),y=e("./isBuffer"),g=e("./_isHostObject"),m=e("./isObject"),b=e("./keys"),x="[object Arguments]",j="[object Array]",R="[object Boolean]",F="[object Date]",O="[object Error]",w="[object Function]",A="[object GeneratorFunction]",S="[object Map]",P="[object Number]",E="[object Object]",I="[object RegExp]",T="[object Set]",C="[object String]",L="[object Symbol]",k="[object WeakMap]",H="[object ArrayBuffer]",D="[object DataView]",N="[object Float32Array]",M="[object Float64Array]",B="[object Int8Array]",W="[object Int16Array]",Q="[object Int32Array]",q="[object Uint8Array]",U="[object Uint8ClampedArray]",z="[object Uint16Array]",K="[object Uint32Array]",V={};V[x]=V[j]=V[H]=V[D]=V[R]=V[F]=V[N]=V[M]=V[B]=V[W]=V[Q]=V[S]=V[P]=V[E]=V[I]=V[T]=V[C]=V[L]=V[q]=V[U]=V[z]=V[K]=!0,V[O]=V[w]=V[k]=!1,t.exports=n},{"./_Stack":14,"./_arrayEach":21,"./_assignValue":31,"./_baseAssign":33,"./_cloneBuffer":85,"./_copyArray":96,"./_copySymbols":98,"./_getAllKeys":116,"./_getTag":128,"./_initCloneArray":138,"./_initCloneByTag":139,"./_initCloneObject":140,"./_isHostObject":142,"./isArray":204,"./isBuffer":207,"./isObject":214,"./keys":221}],35:[function(e,t,r){function n(e){return i(e)?a(e):{}}var i=e("./isObject"),a=Object.create;t.exports=n},{"./isObject":214}],36:[function(e,t,r){function n(e,t,r,n){var l=-1,h=a,p=!0,d=e.length,_=[],v=t.length;if(!d)return _;r&&(t=o(t,c(r))),n?(h=s,p=!1):t.length>=f&&(h=u,p=!1,t=new i(t));e:for(;++l<d;){var y=e[l],g=r?r(y):y;if(y=n||0!==y?y:0,p&&g===g){for(var m=v;m--;)if(t[m]===g)continue e;_.push(y)}else h(t,g,n)||_.push(y)}return _}var i=e("./_SetCache"),a=e("./_arrayIncludes"),s=e("./_arrayIncludesWith"),o=e("./_arrayMap"),c=e("./_baseUnary"),u=e("./_cacheHas"),f=200;t.exports=n},{"./_SetCache":13,"./_arrayIncludes":23,"./_arrayIncludesWith":24,"./_arrayMap":25,"./_baseUnary":75,"./_cacheHas":77}],37:[function(e,t,r){var n=e("./_baseForOwn"),i=e("./_createBaseEach"),a=i(n);t.exports=a},{"./_baseForOwn":42,"./_createBaseEach":102}],38:[function(e,t,r){function n(e,t){var r=[];return i(e,function(e,n,i){t(e,n,i)&&r.push(e)}),r}var i=e("./_baseEach");t.exports=n},{"./_baseEach":37}],39:[function(e,t,r){function n(e,t,r,n){for(var i=e.length,a=r+(n?1:-1);n?a--:++a<i;)if(t(e[a],a,e))return a;return-1}t.exports=n},{}],40:[function(e,t,r){function n(e,t,r,s,o){var c=-1,u=e.length;for(r||(r=a),o||(o=[]);++c<u;){var f=e[c];t>0&&r(f)?t>1?n(f,t-1,r,s,o):i(o,f):s||(o[o.length]=f)}return o}var i=e("./_arrayPush"),a=e("./_isFlattenable");t.exports=n},{"./_arrayPush":26,"./_isFlattenable":141}],41:[function(e,t,r){var n=e("./_createBaseFor"),i=n();t.exports=i},{"./_createBaseFor":103}],42:[function(e,t,r){function n(e,t){return e&&i(e,t,a)}var i=e("./_baseFor"),a=e("./keys");t.exports=n},{"./_baseFor":41,"./keys":221}],43:[function(e,t,r){function n(e,t){t=a(t,e)?[t]:i(t);for(var r=0,n=t.length;null!=e&&r<n;)e=e[s(t[r++])];return r&&r==n?e:void 0}var i=e("./_castPath"),a=e("./_isKey"),s=e("./_toKey");t.exports=n},{"./_castPath":79,"./_isKey":145,"./_toKey":182}],44:[function(e,t,r){function n(e,t,r){var n=t(e);return a(e)?n:i(n,r(e))}var i=e("./_arrayPush"),a=e("./isArray");t.exports=n},{"./_arrayPush":26,"./isArray":204}],45:[function(e,t,r){function n(e,t){return null!=e&&(s.call(e,t)||"object"==typeof e&&t in e&&null===i(e))}var i=e("./_getPrototype"),a=Object.prototype,s=a.hasOwnProperty;t.exports=n},{"./_getPrototype":125}],46:[function(e,t,r){function n(e,t){return null!=e&&t in Object(e)}t.exports=n},{}],47:[function(e,t,r){function n(e,t,r){if(t!==t)return i(e,r);for(var n=r-1,a=e.length;++n<a;)if(e[n]===t)return n;return-1}var i=e("./_indexOfNaN");t.exports=n},{"./_indexOfNaN":137}],48:[function(e,t,r){function n(e,t,r){for(var n=r?s:a,l=e[0].length,h=e.length,p=h,d=Array(h),_=1/0,v=[];p--;){var y=e[p];p&&t&&(y=o(y,c(t))),_=f(y.length,_),d[p]=!r&&(t||l>=120&&y.length>=120)?new i(p&&y):void 0}y=e[0];var g=-1,m=d[0];e:for(;++g<l&&v.length<_;){var b=y[g],x=t?t(b):b;if(b=r||0!==b?b:0,!(m?u(m,x):n(v,x,r))){for(p=h;--p;){var j=d[p];if(!(j?u(j,x):n(e[p],x,r)))continue e}m&&m.push(x),v.push(b)}}return v}var i=e("./_SetCache"),a=e("./_arrayIncludes"),s=e("./_arrayIncludesWith"),o=e("./_arrayMap"),c=e("./_baseUnary"),u=e("./_cacheHas"),f=Math.min;t.exports=n},{"./_SetCache":13,"./_arrayIncludes":23,"./_arrayIncludesWith":24,"./_arrayMap":25,"./_baseUnary":75,"./_cacheHas":77}],49:[function(e,t,r){function n(e,t,r,n){return i(e,function(e,i,a){t(n,r(e),i,a)}),n}var i=e("./_baseForOwn");t.exports=n},{"./_baseForOwn":42}],50:[function(e,t,r){function n(e,t,r,o,c){return e===t||(null==e||null==t||!a(e)&&!s(t)?e!==e&&t!==t:i(e,t,n,r,o,c))}var i=e("./_baseIsEqualDeep"),a=e("./isObject"),s=e("./isObjectLike");t.exports=n},{"./_baseIsEqualDeep":51,"./isObject":214,"./isObjectLike":215}],51:[function(e,t,r){function n(e,t,r,n,v,g){var m=u(e),b=u(t),x=d,j=d;m||(x=c(e),x=x==p?_:x),b||(j=c(t),j=j==p?_:j);var R=x==_&&!f(e),F=j==_&&!f(t),O=x==j;if(O&&!R)return g||(g=new i),m||l(e)?a(e,t,r,n,v,g):s(e,t,x,r,n,v,g);if(!(v&h)){var w=R&&y.call(e,"__wrapped__"),A=F&&y.call(t,"__wrapped__");if(w||A){var S=w?e.value():e,P=A?t.value():t;return g||(g=new i),r(S,P,n,v,g)}}return!!O&&(g||(g=new i),o(e,t,r,n,v,g))}var i=e("./_Stack"),a=e("./_equalArrays"),s=e("./_equalByTag"),o=e("./_equalObjects"),c=e("./_getTag"),u=e("./isArray"),f=e("./_isHostObject"),l=e("./isTypedArray"),h=2,p="[object Arguments]",d="[object Array]",_="[object Object]",v=Object.prototype,y=v.hasOwnProperty;t.exports=n},{"./_Stack":14,"./_equalArrays":113,"./_equalByTag":114,"./_equalObjects":115,"./_getTag":128,"./_isHostObject":142,"./isArray":204,"./isTypedArray":219}],52:[function(e,t,r){function n(e,t,r,n){var c=r.length,u=c,f=!n;if(null==e)return!u;for(e=Object(e);c--;){var l=r[c];if(f&&l[2]?l[1]!==e[l[0]]:!(l[0]in e))return!1}for(;++c<u;){l=r[c];var h=l[0],p=e[h],d=l[1];if(f&&l[2]){if(void 0===p&&!(h in e))return!1}else{var _=new i;if(n)var v=n(p,d,h,e,t,_);if(!(void 0===v?a(d,p,n,s|o,_):v))return!1}}return!0}var i=e("./_Stack"),a=e("./_baseIsEqual"),s=1,o=2;t.exports=n},{"./_Stack":14,"./_baseIsEqual":50}],53:[function(e,t,r){function n(e){if(!o(e)||s(e))return!1;var t=i(e)||a(e)?d:f;return t.test(c(e))}var i=e("./isFunction"),a=e("./_isHostObject"),s=e("./_isMasked"),o=e("./isObject"),c=e("./_toSource"),u=/[\\^$.*+?()[\]{}|]/g,f=/^\[object .+?Constructor\]$/,l=Object.prototype,h=Function.prototype.toString,p=l.hasOwnProperty,d=RegExp("^"+h.call(p).replace(u,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");t.exports=n},{"./_isHostObject":142,"./_isMasked":148,"./_toSource":183,"./isFunction":210,"./isObject":214}],54:[function(e,t,r){function n(e){return"function"==typeof e?e:null==e?s:"object"==typeof e?o(e)?a(e[0],e[1]):i(e):c(e)}var i=e("./_baseMatches"),a=e("./_baseMatchesProperty"),s=e("./identity"),o=e("./isArray"),c=e("./property");t.exports=n},{"./_baseMatches":59,"./_baseMatchesProperty":60,"./identity":198,"./isArray":204,"./property":237}],55:[function(e,t,r){function n(e){return i(Object(e))}var i=Object.keys;t.exports=n},{}],56:[function(e,t,r){function n(e){e=null==e?e:Object(e);var t=[];for(var r in e)t.push(r);return t}var i=e("./_Reflect"),a=e("./_iteratorToArray"),s=Object.prototype,o=i?i.enumerate:void 0,c=s.propertyIsEnumerable;o&&!c.call({valueOf:1},"valueOf")&&(n=function(e){return a(o(e))}),t.exports=n},{"./_Reflect":11,"./_iteratorToArray":151}],57:[function(e,t,r){function n(){}t.exports=n},{}],58:[function(e,t,r){function n(e,t){var r=-1,n=a(e)?Array(e.length):[];return i(e,function(e,i,a){n[++r]=t(e,i,a)}),n}var i=e("./_baseEach"),a=e("./isArrayLike");t.exports=n},{"./_baseEach":37,"./isArrayLike":205}],59:[function(e,t,r){function n(e){var t=a(e);return 1==t.length&&t[0][2]?s(t[0][0],t[0][1]):function(r){return r===e||i(r,e,t)}}var i=e("./_baseIsMatch"),a=e("./_getMatchData"),s=e("./_matchesStrictComparable");t.exports=n},{"./_baseIsMatch":52,"./_getMatchData":123,"./_matchesStrictComparable":163}],60:[function(e,t,r){function n(e,t){return o(e)&&c(t)?u(f(e),t):function(r){var n=a(r,e);return void 0===n&&n===t?s(r,e):i(t,n,void 0,l|h)}}var i=e("./_baseIsEqual"),a=e("./get"),s=e("./hasIn"),o=e("./_isKey"),c=e("./_isStrictComparable"),u=e("./_matchesStrictComparable"),f=e("./_toKey"),l=1,h=2;t.exports=n},{"./_baseIsEqual":50,"./_isKey":145,"./_isStrictComparable":150,"./_matchesStrictComparable":163,"./_toKey":182,"./get":196,"./hasIn":197}],61:[function(e,t,r){function n(e,t,r,h,p){if(e!==t){if(!c(t)&&!f(t))var d=l(t);a(d||t,function(a,c){if(d&&(c=a,a=t[c]),u(a))p||(p=new i),o(e,t,c,r,n,h,p);else{var f=h?h(e[c],a,c+"",e,t,p):void 0;void 0===f&&(f=a),s(e,c,f)}})}}var i=e("./_Stack"),a=e("./_arrayEach"),s=e("./_assignMergeValue"),o=e("./_baseMergeDeep"),c=e("./isArray"),u=e("./isObject"),f=e("./isTypedArray"),l=e("./keysIn");t.exports=n},{"./_Stack":14,"./_arrayEach":21,"./_assignMergeValue":30,"./_baseMergeDeep":62,"./isArray":204,"./isObject":214,"./isTypedArray":219,"./keysIn":222}],62:[function(e,t,r){function n(e,t,r,n,_,v,y){var g=e[r],m=t[r],b=y.get(m);if(b)return void i(e,r,b);var x=v?v(g,m,r+"",e,t,y):void 0,j=void 0===x;j&&(x=m,c(m)||p(m)?c(g)?x=g:u(g)?x=s(g):(j=!1,x=a(m,!0)):h(m)||o(m)?o(g)?x=d(g):!l(g)||n&&f(g)?(j=!1,x=a(m,!0)):x=g:j=!1),y.set(m,x),j&&_(x,m,n,v,y),y.delete(m),i(e,r,x)}var i=e("./_assignMergeValue"),a=e("./_baseClone"),s=e("./_copyArray"),o=e("./isArguments"),c=e("./isArray"),u=e("./isArrayLikeObject"),f=e("./isFunction"),l=e("./isObject"),h=e("./isPlainObject"),p=e("./isTypedArray"),d=e("./toPlainObject");t.exports=n},{"./_assignMergeValue":30,"./_baseClone":34,"./_copyArray":96,"./isArguments":203,"./isArray":204,"./isArrayLikeObject":206,"./isFunction":210,"./isObject":214,"./isPlainObject":216,"./isTypedArray":219,"./toPlainObject":246}],63:[function(e,t,r){function n(e,t,r){var n=-1;t=i(t.length?t:[f],c(a));var l=s(e,function(e,r,a){var s=i(t,function(t){return t(e)});return{criteria:s,index:++n,value:e}});return o(l,function(e,t){return u(e,t,r)})}var i=e("./_arrayMap"),a=e("./_baseIteratee"),s=e("./_baseMap"),o=e("./_baseSortBy"),c=e("./_baseUnary"),u=e("./_compareMultiple"),f=e("./identity");t.exports=n},{"./_arrayMap":25,"./_baseIteratee":54,"./_baseMap":58,"./_baseSortBy":71,"./_baseUnary":75,"./_compareMultiple":93,"./identity":198}],64:[function(e,t,r){function n(e,t){return e=Object(e),i(t,function(t,r){return r in e&&(t[r]=e[r]),t},{})}var i=e("./_arrayReduce");t.exports=n},{"./_arrayReduce":27}],65:[function(e,t,r){function n(e,t){for(var r=-1,n=i(e),a=n.length,s={};++r<a;){var o=n[r],c=e[o];t(c,o)&&(s[o]=c)}return s}var i=e("./_getAllKeysIn");t.exports=n},{"./_getAllKeysIn":117}],66:[function(e,t,r){function n(e){return function(t){return null==t?void 0:t[e]}}t.exports=n},{}],67:[function(e,t,r){function n(e){return function(t){return i(t,e)}}var i=e("./_baseGet");t.exports=n},{"./_baseGet":43}],68:[function(e,t,r){function n(e,t,r,n,i){return i(e,function(e,i,a){r=n?(n=!1,e):t(r,e,i,a)}),r}t.exports=n},{}],69:[function(e,t,r){var n=e("./identity"),i=e("./_metaMap"),a=i?function(e,t){return i.set(e,t),e}:n;t.exports=a},{"./_metaMap":165,"./identity":198}],70:[function(e,t,r){function n(e,t,r){var n=-1,i=e.length;t<0&&(t=-t>i?0:i+t),r=r>i?i:r,r<0&&(r+=i),i=t>r?0:r-t>>>0,t>>>=0;for(var a=Array(i);++n<i;)a[n]=e[n+t];return a}t.exports=n},{}],71:[function(e,t,r){function n(e,t){var r=e.length;for(e.sort(t);r--;)e[r]=e[r].value;return e}t.exports=n},{}],72:[function(e,t,r){function n(e,t){for(var r,n=-1,i=e.length;++n<i;){var a=t(e[n]);void 0!==a&&(r=void 0===r?a:r+a)}return r}t.exports=n},{}],73:[function(e,t,r){function n(e,t){for(var r=-1,n=Array(e);++r<e;)n[r]=t(r);return n}t.exports=n},{}],74:[function(e,t,r){function n(e){if("string"==typeof e)return e;if(a(e))return c?c.call(e):"";var t=e+"";return"0"==t&&1/e==-s?"-0":t}var i=e("./_Symbol"),a=e("./isSymbol"),s=1/0,o=i?i.prototype:void 0,c=o?o.toString:void 0;t.exports=n},{"./_Symbol":15,"./isSymbol":218}],75:[function(e,t,r){function n(e){return function(t){return e(t)}}t.exports=n},{}],76:[function(e,t,r){function n(e,t){return i(t,function(t){return e[t]})}var i=e("./_arrayMap");t.exports=n},{"./_arrayMap":25}],77:[function(e,t,r){function n(e,t){return e.has(t)}t.exports=n},{}],78:[function(e,t,r){function n(e){return i(e)?e:[]}var i=e("./isArrayLikeObject");t.exports=n},{"./isArrayLikeObject":206}],79:[function(e,t,r){function n(e){return i(e)?e:a(e)}var i=e("./isArray"),a=e("./_stringToPath");t.exports=n},{"./_stringToPath":181,"./isArray":204}],80:[function(e,t,r){function n(e,t,r){var n=e.length;return r=void 0===r?n:r,!t&&r>=n?e:i(e,t,r)}var i=e("./_baseSlice");t.exports=n},{"./_baseSlice":70}],81:[function(e,t,r){function n(e,t){for(var r=e.length;r--&&i(t,e[r],0)>-1;);return r}var i=e("./_baseIndexOf");t.exports=n},{"./_baseIndexOf":47}],82:[function(e,t,r){function n(e,t){for(var r=-1,n=e.length;++r<n&&i(t,e[r],0)>-1;);return r}var i=e("./_baseIndexOf");t.exports=n},{"./_baseIndexOf":47}],83:[function(e,t,r){function n(e){return e&&e.Object===Object?e:null}t.exports=n},{}],84:[function(e,t,r){function n(e){var t=new e.constructor(e.byteLength);return new i(t).set(new i(e)),t}var i=e("./_Uint8Array");t.exports=n},{"./_Uint8Array":16}],85:[function(e,t,r){function n(e,t){if(t)return e.slice();var r=new e.constructor(e.length);return e.copy(r),r}t.exports=n},{}],86:[function(e,t,r){function n(e,t){var r=t?i(e.buffer):e.buffer;return new e.constructor(r,e.byteOffset,e.byteLength)}var i=e("./_cloneArrayBuffer");t.exports=n},{"./_cloneArrayBuffer":84}],87:[function(e,t,r){function n(e,t,r){var n=t?r(s(e),!0):s(e);return a(n,i,new e.constructor)}var i=e("./_addMapEntry"),a=e("./_arrayReduce"),s=e("./_mapToArray");t.exports=n},{"./_addMapEntry":18,"./_arrayReduce":27,"./_mapToArray":162}],88:[function(e,t,r){function n(e){var t=new e.constructor(e.source,i.exec(e));return t.lastIndex=e.lastIndex,t}var i=/\w*$/;t.exports=n},{}],89:[function(e,t,r){function n(e,t,r){var n=t?r(s(e),!0):s(e);return a(n,i,new e.constructor)}var i=e("./_addSetEntry"),a=e("./_arrayReduce"),s=e("./_setToArray");t.exports=n},{"./_addSetEntry":19,"./_arrayReduce":27,"./_setToArray":174}],90:[function(e,t,r){function n(e){return s?Object(s.call(e)):{}}var i=e("./_Symbol"),a=i?i.prototype:void 0,s=a?a.valueOf:void 0;t.exports=n},{"./_Symbol":15}],91:[function(e,t,r){function n(e,t){var r=t?i(e.buffer):e.buffer;return new e.constructor(r,e.byteOffset,e.length)}var i=e("./_cloneArrayBuffer");t.exports=n},{"./_cloneArrayBuffer":84}],92:[function(e,t,r){function n(e,t){if(e!==t){var r=void 0!==e,n=null===e,a=e===e,s=i(e),o=void 0!==t,c=null===t,u=t===t,f=i(t);if(!c&&!f&&!s&&e>t||s&&o&&u&&!c&&!f||n&&o&&u||!r&&u||!a)return 1;if(!n&&!s&&!f&&e<t||f&&r&&a&&!n&&!s||c&&r&&a||!o&&a||!u)return-1}return 0}var i=e("./isSymbol");t.exports=n},{"./isSymbol":218}],93:[function(e,t,r){function n(e,t,r){for(var n=-1,a=e.criteria,s=t.criteria,o=a.length,c=r.length;++n<o;){var u=i(a[n],s[n]);if(u){if(n>=c)return u;var f=r[n];return u*("desc"==f?-1:1)}}return e.index-t.index}var i=e("./_compareAscending");t.exports=n},{"./_compareAscending":92}],94:[function(e,t,r){function n(e,t,r,n){for(var a=-1,s=e.length,o=r.length,c=-1,u=t.length,f=i(s-o,0),l=Array(u+f),h=!n;++c<u;)l[c]=t[c];for(;++a<o;)(h||a<s)&&(l[r[a]]=e[a]);for(;f--;)l[c++]=e[a++];return l}var i=Math.max;t.exports=n},{}],95:[function(e,t,r){function n(e,t,r,n){for(var a=-1,s=e.length,o=-1,c=r.length,u=-1,f=t.length,l=i(s-c,0),h=Array(l+f),p=!n;++a<l;)h[a]=e[a];for(var d=a;++u<f;)h[d+u]=t[u];for(;++o<c;)(p||a<s)&&(h[d+r[o]]=e[a++]);return h}var i=Math.max;t.exports=n},{}],96:[function(e,t,r){function n(e,t){var r=-1,n=e.length;for(t||(t=Array(n));++r<n;)t[r]=e[r];return t}t.exports=n},{}],97:[function(e,t,r){function n(e,t,r,n){r||(r={});for(var a=-1,s=t.length;++a<s;){var o=t[a],c=n?n(r[o],e[o],o,r,e):e[o];i(r,o,c)}return r}var i=e("./_assignValue");t.exports=n},{"./_assignValue":31}],98:[function(e,t,r){function n(e,t){return i(e,a(e),t)}var i=e("./_copyObject"),a=e("./_getSymbols");t.exports=n},{"./_copyObject":97,"./_getSymbols":126}],99:[function(e,t,r){var n=e("./_root"),i=n["__core-js_shared__"];t.exports=i},{"./_root":170}],100:[function(e,t,r){function n(e,t){for(var r=e.length,n=0;r--;)e[r]===t&&n++;return n}t.exports=n},{}],101:[function(e,t,r){function n(e){return a(function(t,r){var n=-1,a=r.length,s=a>1?r[a-1]:void 0,o=a>2?r[2]:void 0;for(s=e.length>3&&"function"==typeof s?(a--,s):void 0,o&&i(r[0],r[1],o)&&(s=a<3?void 0:s,a=1),t=Object(t);++n<a;){var c=r[n];c&&e(t,c,n,s)}return t})}var i=e("./_isIterateeCall"),a=e("./rest");t.exports=n},{"./_isIterateeCall":144,"./rest":239}],102:[function(e,t,r){function n(e,t){return function(r,n){if(null==r)return r;if(!i(r))return e(r,n);for(var a=r.length,s=t?a:-1,o=Object(r);(t?s--:++s<a)&&n(o[s],s,o)!==!1;);return r}}var i=e("./isArrayLike");t.exports=n},{"./isArrayLike":205}],103:[function(e,t,r){function n(e){return function(t,r,n){for(var i=-1,a=Object(t),s=n(t),o=s.length;o--;){var c=s[e?o:++i];if(r(a[c],c,a)===!1)break}return t}}t.exports=n},{}],104:[function(e,t,r){function n(e,t,r){function n(){var t=this&&this!==a&&this instanceof n?c:e;return t.apply(o?r:this,arguments)}var o=t&s,c=i(e);return n}var i=e("./_createCtorWrapper"),a=e("./_root"),s=1;t.exports=n},{"./_createCtorWrapper":105,"./_root":170}],105:[function(e,t,r){function n(e){return function(){var t=arguments;switch(t.length){case 0:return new e;case 1:return new e(t[0]);case 2:return new e(t[0],t[1]);case 3:return new e(t[0],t[1],t[2]);case 4:return new e(t[0],t[1],t[2],t[3]);case 5:return new e(t[0],t[1],t[2],t[3],t[4]);case 6:return new e(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new e(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var r=i(e.prototype),n=e.apply(r,t);return a(n)?n:r}}var i=e("./_baseCreate"),a=e("./isObject");t.exports=n},{"./_baseCreate":35,"./isObject":214}],106:[function(e,t,r){function n(e,t,r){function n(){for(var a=arguments.length,h=Array(a),p=a,d=c(n);p--;)h[p]=arguments[p];var _=a<3&&h[0]!==d&&h[a-1]!==d?[]:u(h,d);if(a-=_.length,a<r)return o(e,t,s,n.placeholder,void 0,h,_,void 0,void 0,r-a);var v=this&&this!==f&&this instanceof n?l:e;return i(v,this,h)}var l=a(e);return n}var i=e("./_apply"),a=e("./_createCtorWrapper"),s=e("./_createHybridWrapper"),o=e("./_createRecurryWrapper"),c=e("./_getHolder"),u=e("./_replaceHolders"),f=e("./_root");t.exports=n},{"./_apply":20,"./_createCtorWrapper":105,"./_createHybridWrapper":108,"./_createRecurryWrapper":111,"./_getHolder":120,"./_replaceHolders":169,"./_root":170}],107:[function(e,t,r){function n(e){return function(t,r,n){var o=Object(t);if(r=i(r,3),!a(t))var c=s(t);var u=e(c||t,function(e,t){return c&&(t=e,e=o[t]),r(e,t,o)},n);return u>-1?t[c?c[u]:u]:void 0}}var i=e("./_baseIteratee"),a=e("./isArrayLike"),s=e("./keys");t.exports=n},{"./_baseIteratee":54,"./isArrayLike":205,"./keys":221}],108:[function(e,t,r){function n(e,t,r,m,b,x,j,R,F,O){function w(){for(var p=arguments.length,d=Array(p),_=p;_--;)d[_]=arguments[_];if(E)var v=u(w),y=s(d,v);if(m&&(d=i(d,m,b,E)),x&&(d=a(d,x,j,E)),p-=y,E&&p<O){var g=l(d,v);return c(e,t,n,w.placeholder,r,d,g,R,F,O-p)}var C=S?r:this,L=P?C[e]:e;return p=d.length,R?d=f(d,R):I&&p>1&&d.reverse(),A&&F<p&&(d.length=F),this&&this!==h&&this instanceof w&&(L=T||o(L)),L.apply(C,d)}var A=t&y,S=t&p,P=t&d,E=t&(_|v),I=t&g,T=P?void 0:o(e);return w}var i=e("./_composeArgs"),a=e("./_composeArgsRight"),s=e("./_countHolders"),o=e("./_createCtorWrapper"),c=e("./_createRecurryWrapper"),u=e("./_getHolder"),f=e("./_reorder"),l=e("./_replaceHolders"),h=e("./_root"),p=1,d=2,_=8,v=16,y=128,g=512;t.exports=n},{"./_composeArgs":94,"./_composeArgsRight":95,"./_countHolders":100,"./_createCtorWrapper":105,"./_createRecurryWrapper":111,"./_getHolder":120,"./_reorder":168,"./_replaceHolders":169,"./_root":170}],109:[function(e,t,r){function n(e,t){return function(r,n){return i(r,e,t(n),{})}}var i=e("./_baseInverter");t.exports=n},{"./_baseInverter":49}],110:[function(e,t,r){function n(e,t,r,n){function c(){for(var t=-1,a=arguments.length,o=-1,l=n.length,h=Array(l+a),p=this&&this!==s&&this instanceof c?f:e;++o<l;)h[o]=n[o];for(;a--;)h[o++]=arguments[++t];return i(p,u?r:this,h)}var u=t&o,f=a(e);return c}var i=e("./_apply"),a=e("./_createCtorWrapper"),s=e("./_root"),o=1;t.exports=n},{"./_apply":20,"./_createCtorWrapper":105,"./_root":170}],111:[function(e,t,r){function n(e,t,r,n,h,p,d,_,v,y){var g=t&u,m=g?d:void 0,b=g?void 0:d,x=g?p:void 0,j=g?void 0:p;t|=g?f:l,t&=~(g?l:f),t&c||(t&=~(s|o));var R=[e,t,h,x,m,j,b,_,v,y],F=r.apply(void 0,R);return i(e)&&a(F,R),F.placeholder=n,F}var i=e("./_isLaziable"),a=e("./_setData"),s=1,o=2,c=4,u=8,f=32,l=64;t.exports=n},{"./_isLaziable":147,"./_setData":173}],112:[function(e,t,r){function n(e,t,r,n,x,j,R,F){var O=t&_;if(!O&&"function"!=typeof e)throw new TypeError(p);
var w=n?n.length:0;if(w||(t&=~(g|m),n=x=void 0),R=void 0===R?R:b(h(R),0),F=void 0===F?F:h(F),w-=x?x.length:0,t&m){var A=n,S=x;n=x=void 0}var P=O?void 0:u(e),E=[e,t,r,n,x,A,S,j,R,F];if(P&&f(E,P),e=E[0],t=E[1],r=E[2],n=E[3],x=E[4],F=E[9]=null==E[9]?O?0:e.length:b(E[9]-w,0),!F&&t&(v|y)&&(t&=~(v|y)),t&&t!=d)I=t==v||t==y?s(e,t,F):t!=g&&t!=(d|g)||x.length?o.apply(void 0,E):c(e,t,r,n);else var I=a(e,t,r);var T=P?i:l;return T(I,E)}var i=e("./_baseSetData"),a=e("./_createBaseWrapper"),s=e("./_createCurryWrapper"),o=e("./_createHybridWrapper"),c=e("./_createPartialWrapper"),u=e("./_getData"),f=e("./_mergeData"),l=e("./_setData"),h=e("./toInteger"),p="Expected a function",d=1,_=2,v=8,y=16,g=32,m=64,b=Math.max;t.exports=n},{"./_baseSetData":69,"./_createBaseWrapper":104,"./_createCurryWrapper":106,"./_createHybridWrapper":108,"./_createPartialWrapper":110,"./_getData":118,"./_mergeData":164,"./_setData":173,"./toInteger":244}],113:[function(e,t,r){function n(e,t,r,n,c,u){var f=c&o,l=e.length,h=t.length;if(l!=h&&!(f&&h>l))return!1;var p=u.get(e);if(p)return p==t;var d=-1,_=!0,v=c&s?new i:void 0;for(u.set(e,t);++d<l;){var y=e[d],g=t[d];if(n)var m=f?n(g,y,d,t,e,u):n(y,g,d,e,t,u);if(void 0!==m){if(m)continue;_=!1;break}if(v){if(!a(t,function(e,t){if(!v.has(t)&&(y===e||r(y,e,n,c,u)))return v.add(t)})){_=!1;break}}else if(y!==g&&!r(y,g,n,c,u)){_=!1;break}}return u.delete(e),_}var i=e("./_SetCache"),a=e("./_arraySome"),s=1,o=2;t.exports=n},{"./_SetCache":13,"./_arraySome":28}],114:[function(e,t,r){function n(e,t,r,n,i,j,F){switch(r){case x:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case b:return!(e.byteLength!=t.byteLength||!n(new a(e),new a(t)));case l:case h:return+e==+t;case p:return e.name==t.name&&e.message==t.message;case _:return e!=+e?t!=+t:e==+t;case v:case g:return e==t+"";case d:var O=o;case y:var w=j&f;if(O||(O=c),e.size!=t.size&&!w)return!1;var A=F.get(e);return A?A==t:(j|=u,F.set(e,t),s(O(e),O(t),n,i,j,F));case m:if(R)return R.call(e)==R.call(t)}return!1}var i=e("./_Symbol"),a=e("./_Uint8Array"),s=e("./_equalArrays"),o=e("./_mapToArray"),c=e("./_setToArray"),u=1,f=2,l="[object Boolean]",h="[object Date]",p="[object Error]",d="[object Map]",_="[object Number]",v="[object RegExp]",y="[object Set]",g="[object String]",m="[object Symbol]",b="[object ArrayBuffer]",x="[object DataView]",j=i?i.prototype:void 0,R=j?j.valueOf:void 0;t.exports=n},{"./_Symbol":15,"./_Uint8Array":16,"./_equalArrays":113,"./_mapToArray":162,"./_setToArray":174}],115:[function(e,t,r){function n(e,t,r,n,o,c){var u=o&s,f=a(e),l=f.length,h=a(t),p=h.length;if(l!=p&&!u)return!1;for(var d=l;d--;){var _=f[d];if(!(u?_ in t:i(t,_)))return!1}var v=c.get(e);if(v)return v==t;var y=!0;c.set(e,t);for(var g=u;++d<l;){_=f[d];var m=e[_],b=t[_];if(n)var x=u?n(b,m,_,t,e,c):n(m,b,_,e,t,c);if(!(void 0===x?m===b||r(m,b,n,o,c):x)){y=!1;break}g||(g="constructor"==_)}if(y&&!g){var j=e.constructor,R=t.constructor;j!=R&&"constructor"in e&&"constructor"in t&&!("function"==typeof j&&j instanceof j&&"function"==typeof R&&R instanceof R)&&(y=!1)}return c.delete(e),y}var i=e("./_baseHas"),a=e("./keys"),s=2;t.exports=n},{"./_baseHas":45,"./keys":221}],116:[function(e,t,r){function n(e){return i(e,s,a)}var i=e("./_baseGetAllKeys"),a=e("./_getSymbols"),s=e("./keys");t.exports=n},{"./_baseGetAllKeys":44,"./_getSymbols":126,"./keys":221}],117:[function(e,t,r){function n(e){return i(e,s,a)}var i=e("./_baseGetAllKeys"),a=e("./_getSymbolsIn"),s=e("./keysIn");t.exports=n},{"./_baseGetAllKeys":44,"./_getSymbolsIn":127,"./keysIn":222}],118:[function(e,t,r){var n=e("./_metaMap"),i=e("./noop"),a=n?function(e){return n.get(e)}:i;t.exports=a},{"./_metaMap":165,"./noop":229}],119:[function(e,t,r){function n(e){for(var t=e.name+"",r=i[t],n=s.call(i,t)?r.length:0;n--;){var a=r[n],o=a.func;if(null==o||o==e)return a.name}return t}var i=e("./_realNames"),a=Object.prototype,s=a.hasOwnProperty;t.exports=n},{"./_realNames":167}],120:[function(e,t,r){function n(e){var t=e;return t.placeholder}t.exports=n},{}],121:[function(e,t,r){var n=e("./_baseProperty"),i=n("length");t.exports=i},{"./_baseProperty":66}],122:[function(e,t,r){function n(e,t){var r=e.__data__;return i(t)?r["string"==typeof t?"string":"hash"]:r.map}var i=e("./_isKeyable");t.exports=n},{"./_isKeyable":146}],123:[function(e,t,r){function n(e){for(var t=a(e),r=t.length;r--;){var n=t[r],s=e[n];t[r]=[n,s,i(s)]}return t}var i=e("./_isStrictComparable"),a=e("./keys");t.exports=n},{"./_isStrictComparable":150,"./keys":221}],124:[function(e,t,r){function n(e,t){var r=a(e,t);return i(r)?r:void 0}var i=e("./_baseIsNative"),a=e("./_getValue");t.exports=n},{"./_baseIsNative":53,"./_getValue":129}],125:[function(e,t,r){function n(e){return i(Object(e))}var i=Object.getPrototypeOf;t.exports=n},{}],126:[function(e,t,r){function n(e){return a(Object(e))}var i=e("./stubArray"),a=Object.getOwnPropertySymbols;a||(n=i),t.exports=n},{"./stubArray":240}],127:[function(e,t,r){var n=e("./_arrayPush"),i=e("./_getPrototype"),a=e("./_getSymbols"),s=Object.getOwnPropertySymbols,o=s?function(e){for(var t=[];e;)n(t,a(e)),e=i(e);return t}:a;t.exports=o},{"./_arrayPush":26,"./_getPrototype":125,"./_getSymbols":126}],128:[function(e,t,r){function n(e){return y.call(e)}var i=e("./_DataView"),a=e("./_Map"),s=e("./_Promise"),o=e("./_Set"),c=e("./_WeakMap"),u=e("./_toSource"),f="[object Map]",l="[object Object]",h="[object Promise]",p="[object Set]",d="[object WeakMap]",_="[object DataView]",v=Object.prototype,y=v.toString,g=u(i),m=u(a),b=u(s),x=u(o),j=u(c);(i&&n(new i(new ArrayBuffer(1)))!=_||a&&n(new a)!=f||s&&n(s.resolve())!=h||o&&n(new o)!=p||c&&n(new c)!=d)&&(n=function(e){var t=y.call(e),r=t==l?e.constructor:void 0,n=r?u(r):void 0;if(n)switch(n){case g:return _;case m:return f;case b:return h;case x:return p;case j:return d}return t}),t.exports=n},{"./_DataView":3,"./_Map":8,"./_Promise":10,"./_Set":12,"./_WeakMap":17,"./_toSource":183}],129:[function(e,t,r){function n(e,t){return null==e?void 0:e[t]}t.exports=n},{}],130:[function(e,t,r){function n(e,t,r){t=c(t,e)?[t]:i(t);for(var n,h=-1,p=t.length;++h<p;){var d=l(t[h]);if(!(n=null!=e&&r(e,d)))break;e=e[d]}if(n)return n;var p=e?e.length:0;return!!p&&u(p)&&o(d,p)&&(s(e)||f(e)||a(e))}var i=e("./_castPath"),a=e("./isArguments"),s=e("./isArray"),o=e("./_isIndex"),c=e("./_isKey"),u=e("./isLength"),f=e("./isString"),l=e("./_toKey");t.exports=n},{"./_castPath":79,"./_isIndex":143,"./_isKey":145,"./_toKey":182,"./isArguments":203,"./isArray":204,"./isLength":211,"./isString":217}],131:[function(e,t,r){function n(){this.__data__=i?i(null):{}}var i=e("./_nativeCreate");t.exports=n},{"./_nativeCreate":166}],132:[function(e,t,r){function n(e){return this.has(e)&&delete this.__data__[e]}t.exports=n},{}],133:[function(e,t,r){function n(e){var t=this.__data__;if(i){var r=t[e];return r===a?void 0:r}return o.call(t,e)?t[e]:void 0}var i=e("./_nativeCreate"),a="__lodash_hash_undefined__",s=Object.prototype,o=s.hasOwnProperty;t.exports=n},{"./_nativeCreate":166}],134:[function(e,t,r){function n(e){var t=this.__data__;return i?void 0!==t[e]:s.call(t,e)}var i=e("./_nativeCreate"),a=Object.prototype,s=a.hasOwnProperty;t.exports=n},{"./_nativeCreate":166}],135:[function(e,t,r){function n(e,t){var r=this.__data__;return r[e]=i&&void 0===t?a:t,this}var i=e("./_nativeCreate"),a="__lodash_hash_undefined__";t.exports=n},{"./_nativeCreate":166}],136:[function(e,t,r){function n(e){var t=e?e.length:void 0;return o(t)&&(s(e)||c(e)||a(e))?i(t,String):null}var i=e("./_baseTimes"),a=e("./isArguments"),s=e("./isArray"),o=e("./isLength"),c=e("./isString");t.exports=n},{"./_baseTimes":73,"./isArguments":203,"./isArray":204,"./isLength":211,"./isString":217}],137:[function(e,t,r){function n(e,t,r){for(var n=e.length,i=t+(r?1:-1);r?i--:++i<n;){var a=e[i];if(a!==a)return i}return-1}t.exports=n},{}],138:[function(e,t,r){function n(e){var t=e.length,r=e.constructor(t);return t&&"string"==typeof e[0]&&a.call(e,"index")&&(r.index=e.index,r.input=e.input),r}var i=Object.prototype,a=i.hasOwnProperty;t.exports=n},{}],139:[function(e,t,r){function n(e,t,r,n){var E=e.constructor;switch(t){case m:return i(e);case l:case h:return new E((+e));case b:return a(e,n);case x:case j:case R:case F:case O:case w:case A:case S:case P:return f(e,n);case p:return s(e,n,r);case d:case y:return new E(e);case _:return o(e);case v:return c(e,n,r);case g:return u(e)}}var i=e("./_cloneArrayBuffer"),a=e("./_cloneDataView"),s=e("./_cloneMap"),o=e("./_cloneRegExp"),c=e("./_cloneSet"),u=e("./_cloneSymbol"),f=e("./_cloneTypedArray"),l="[object Boolean]",h="[object Date]",p="[object Map]",d="[object Number]",_="[object RegExp]",v="[object Set]",y="[object String]",g="[object Symbol]",m="[object ArrayBuffer]",b="[object DataView]",x="[object Float32Array]",j="[object Float64Array]",R="[object Int8Array]",F="[object Int16Array]",O="[object Int32Array]",w="[object Uint8Array]",A="[object Uint8ClampedArray]",S="[object Uint16Array]",P="[object Uint32Array]";t.exports=n},{"./_cloneArrayBuffer":84,"./_cloneDataView":86,"./_cloneMap":87,"./_cloneRegExp":88,"./_cloneSet":89,"./_cloneSymbol":90,"./_cloneTypedArray":91}],140:[function(e,t,r){function n(e){return"function"!=typeof e.constructor||s(e)?{}:i(a(e))}var i=e("./_baseCreate"),a=e("./_getPrototype"),s=e("./_isPrototype");t.exports=n},{"./_baseCreate":35,"./_getPrototype":125,"./_isPrototype":149}],141:[function(e,t,r){function n(e){return a(e)||i(e)}var i=e("./isArguments"),a=e("./isArray");t.exports=n},{"./isArguments":203,"./isArray":204}],142:[function(e,t,r){function n(e){var t=!1;if(null!=e&&"function"!=typeof e.toString)try{t=!!(e+"")}catch(e){}return t}t.exports=n},{}],143:[function(e,t,r){function n(e,t){return t=null==t?i:t,!!t&&("number"==typeof e||a.test(e))&&e>-1&&e%1==0&&e<t}var i=9007199254740991,a=/^(?:0|[1-9]\d*)$/;t.exports=n},{}],144:[function(e,t,r){function n(e,t,r){if(!o(r))return!1;var n=typeof t;return!!("number"==n?a(r)&&s(t,r.length):"string"==n&&t in r)&&i(r[t],e)}var i=e("./eq"),a=e("./isArrayLike"),s=e("./_isIndex"),o=e("./isObject");t.exports=n},{"./_isIndex":143,"./eq":190,"./isArrayLike":205,"./isObject":214}],145:[function(e,t,r){function n(e,t){if(i(e))return!1;var r=typeof e;return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=e&&!a(e))||(o.test(e)||!s.test(e)||null!=t&&e in Object(t))}var i=e("./isArray"),a=e("./isSymbol"),s=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,o=/^\w*$/;t.exports=n},{"./isArray":204,"./isSymbol":218}],146:[function(e,t,r){function n(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e}t.exports=n},{}],147:[function(e,t,r){function n(e){var t=s(e),r=o[t];if("function"!=typeof r||!(t in i.prototype))return!1;if(e===r)return!0;var n=a(r);return!!n&&e===n[0]}var i=e("./_LazyWrapper"),a=e("./_getData"),s=e("./_getFuncName"),o=e("./wrapperLodash");t.exports=n},{"./_LazyWrapper":5,"./_getData":118,"./_getFuncName":119,"./wrapperLodash":250}],148:[function(e,t,r){function n(e){return!!a&&a in e}var i=e("./_coreJsData"),a=function(){var e=/[^.]+$/.exec(i&&i.keys&&i.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();t.exports=n},{"./_coreJsData":99}],149:[function(e,t,r){function n(e){var t=e&&e.constructor,r="function"==typeof t&&t.prototype||i;return e===r}var i=Object.prototype;t.exports=n},{}],150:[function(e,t,r){function n(e){return e===e&&!i(e)}var i=e("./isObject");t.exports=n},{"./isObject":214}],151:[function(e,t,r){function n(e){for(var t,r=[];!(t=e.next()).done;)r.push(t.value);return r}t.exports=n},{}],152:[function(e,t,r){function n(){this.__data__=[]}t.exports=n},{}],153:[function(e,t,r){function n(e){var t=this.__data__,r=i(t,e);if(r<0)return!1;var n=t.length-1;return r==n?t.pop():s.call(t,r,1),!0}var i=e("./_assocIndexOf"),a=Array.prototype,s=a.splice;t.exports=n},{"./_assocIndexOf":32}],154:[function(e,t,r){function n(e){var t=this.__data__,r=i(t,e);return r<0?void 0:t[r][1]}var i=e("./_assocIndexOf");t.exports=n},{"./_assocIndexOf":32}],155:[function(e,t,r){function n(e){return i(this.__data__,e)>-1}var i=e("./_assocIndexOf");t.exports=n},{"./_assocIndexOf":32}],156:[function(e,t,r){function n(e,t){var r=this.__data__,n=i(r,e);return n<0?r.push([e,t]):r[n][1]=t,this}var i=e("./_assocIndexOf");t.exports=n},{"./_assocIndexOf":32}],157:[function(e,t,r){function n(){this.__data__={hash:new i,map:new(s||a),string:new i}}var i=e("./_Hash"),a=e("./_ListCache"),s=e("./_Map");t.exports=n},{"./_Hash":4,"./_ListCache":6,"./_Map":8}],158:[function(e,t,r){function n(e){return i(this,e).delete(e)}var i=e("./_getMapData");t.exports=n},{"./_getMapData":122}],159:[function(e,t,r){function n(e){return i(this,e).get(e)}var i=e("./_getMapData");t.exports=n},{"./_getMapData":122}],160:[function(e,t,r){function n(e){return i(this,e).has(e)}var i=e("./_getMapData");t.exports=n},{"./_getMapData":122}],161:[function(e,t,r){function n(e,t){return i(this,e).set(e,t),this}var i=e("./_getMapData");t.exports=n},{"./_getMapData":122}],162:[function(e,t,r){function n(e){var t=-1,r=Array(e.size);return e.forEach(function(e,n){r[++t]=[n,e]}),r}t.exports=n},{}],163:[function(e,t,r){function n(e,t){return function(r){return null!=r&&(r[e]===t&&(void 0!==t||e in Object(r)))}}t.exports=n},{}],164:[function(e,t,r){function n(e,t){var r=e[1],n=t[1],_=r|n,v=_<(c|u|h),y=n==h&&r==l||n==h&&r==p&&e[7].length<=t[8]||n==(h|p)&&t[7].length<=t[8]&&r==l;if(!v&&!y)return e;n&c&&(e[2]=t[2],_|=r&c?0:f);var g=t[3];if(g){var m=e[3];e[3]=m?i(m,g,t[4]):g,e[4]=m?s(e[3],o):t[4]}return g=t[5],g&&(m=e[5],e[5]=m?a(m,g,t[6]):g,e[6]=m?s(e[5],o):t[6]),g=t[7],g&&(e[7]=g),n&h&&(e[8]=null==e[8]?t[8]:d(e[8],t[8])),null==e[9]&&(e[9]=t[9]),e[0]=t[0],e[1]=_,e}var i=e("./_composeArgs"),a=e("./_composeArgsRight"),s=e("./_replaceHolders"),o="__lodash_placeholder__",c=1,u=2,f=4,l=8,h=128,p=256,d=Math.min;t.exports=n},{"./_composeArgs":94,"./_composeArgsRight":95,"./_replaceHolders":169}],165:[function(e,t,r){var n=e("./_WeakMap"),i=n&&new n;t.exports=i},{"./_WeakMap":17}],166:[function(e,t,r){var n=e("./_getNative"),i=n(Object,"create");t.exports=i},{"./_getNative":124}],167:[function(e,t,r){var n={};t.exports=n},{}],168:[function(e,t,r){function n(e,t){for(var r=e.length,n=s(t.length,r),o=i(e);n--;){var c=t[n];e[n]=a(c,r)?o[c]:void 0}return e}var i=e("./_copyArray"),a=e("./_isIndex"),s=Math.min;t.exports=n},{"./_copyArray":96,"./_isIndex":143}],169:[function(e,t,r){function n(e,t){for(var r=-1,n=e.length,a=0,s=[];++r<n;){var o=e[r];o!==t&&o!==i||(e[r]=i,s[a++]=r)}return s}var i="__lodash_placeholder__";t.exports=n},{}],170:[function(e,t,r){(function(r){var n=e("./_checkGlobal"),i=n("object"==typeof r&&r),a=n("object"==typeof self&&self),s=n("object"==typeof this&&this),o=i||a||s||Function("return this")();t.exports=o}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./_checkGlobal":83}],171:[function(e,t,r){function n(e){return this.__data__.set(e,i),this}var i="__lodash_hash_undefined__";t.exports=n},{}],172:[function(e,t,r){function n(e){return this.__data__.has(e)}t.exports=n},{}],173:[function(e,t,r){var n=e("./_baseSetData"),i=e("./now"),a=150,s=16,o=function(){var e=0,t=0;return function(r,o){var c=i(),u=s-(c-t);if(t=c,u>0){if(++e>=a)return r}else e=0;return n(r,o)}}();t.exports=o},{"./_baseSetData":69,"./now":230}],174:[function(e,t,r){function n(e){var t=-1,r=Array(e.size);return e.forEach(function(e){r[++t]=e}),r}t.exports=n},{}],175:[function(e,t,r){function n(){this.__data__=new i}var i=e("./_ListCache");t.exports=n},{"./_ListCache":6}],176:[function(e,t,r){function n(e){return this.__data__.delete(e)}t.exports=n},{}],177:[function(e,t,r){function n(e){return this.__data__.get(e)}t.exports=n},{}],178:[function(e,t,r){function n(e){return this.__data__.has(e)}t.exports=n},{}],179:[function(e,t,r){function n(e,t){var r=this.__data__;return r instanceof i&&r.__data__.length==s&&(r=this.__data__=new a(r.__data__)),r.set(e,t),this}var i=e("./_ListCache"),a=e("./_MapCache"),s=200;t.exports=n},{"./_ListCache":6,"./_MapCache":9}],180:[function(e,t,r){function n(e){return e.match(x)}var i="\\ud800-\\udfff",a="\\u0300-\\u036f\\ufe20-\\ufe23",s="\\u20d0-\\u20f0",o="\\ufe0e\\ufe0f",c="["+i+"]",u="["+a+s+"]",f="\\ud83c[\\udffb-\\udfff]",l="(?:"+u+"|"+f+")",h="[^"+i+"]",p="(?:\\ud83c[\\udde6-\\uddff]){2}",d="[\\ud800-\\udbff][\\udc00-\\udfff]",_="\\u200d",v=l+"?",y="["+o+"]?",g="(?:"+_+"(?:"+[h,p,d].join("|")+")"+y+v+")*",m=y+v+g,b="(?:"+[h+u+"?",u,p,d,c].join("|")+")",x=RegExp(f+"(?="+f+")|"+b+m,"g");t.exports=n},{}],181:[function(e,t,r){var n=e("./memoize"),i=e("./toString"),a=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g,s=/\\(\\)?/g,o=n(function(e){var t=[];return i(e).replace(a,function(e,r,n,i){t.push(n?i.replace(s,"$1"):r||e)}),t});t.exports=o},{"./memoize":227,"./toString":247}],182:[function(e,t,r){function n(e){if("string"==typeof e||i(e))return e;var t=e+"";return"0"==t&&1/e==-a?"-0":t}var i=e("./isSymbol"),a=1/0;t.exports=n},{"./isSymbol":218}],183:[function(e,t,r){function n(e){if(null!=e){try{return i.call(e)}catch(e){}try{return e+""}catch(e){}}return""}var i=Function.prototype.toString;t.exports=n},{}],184:[function(e,t,r){function n(e){if(e instanceof i)return e.clone();var t=new a(e.__wrapped__,e.__chain__);return t.__actions__=s(e.__actions__),t.__index__=e.__index__,t.__values__=e.__values__,t}var i=e("./_LazyWrapper"),a=e("./_LodashWrapper"),s=e("./_copyArray");t.exports=n},{"./_LazyWrapper":5,"./_LodashWrapper":7,"./_copyArray":96}],185:[function(e,t,r){var n=e("./_copyObject"),i=e("./_createAssigner"),a=e("./keysIn"),s=i(function(e,t,r,i){n(t,a(t),e,i)});t.exports=s},{"./_copyObject":97,"./_createAssigner":101,"./keysIn":222}],186:[function(e,t,r){var n=e("./_createWrapper"),i=e("./_getHolder"),a=e("./_replaceHolders"),s=e("./rest"),o=1,c=32,u=s(function(e,t,r){var s=o;if(r.length){var f=a(r,i(u));s|=c}return n(e,s,t,r,f)});u.placeholder={},t.exports=u},{"./_createWrapper":112,"./_getHolder":120,"./_replaceHolders":169,"./rest":239}],187:[function(e,t,r){function n(e){for(var t=-1,r=e?e.length:0,n=0,i=[];++t<r;){var a=e[t];a&&(i[n++]=a)}return i}t.exports=n},{}],188:[function(e,t,r){function n(e){return function(){return e}}t.exports=n},{}],189:[function(e,t,r){var n=e("./_apply"),i=e("./_assignInDefaults"),a=e("./assignInWith"),s=e("./rest"),o=s(function(e){return e.push(void 0,i),n(a,void 0,e)});t.exports=o},{"./_apply":20,"./_assignInDefaults":29,"./assignInWith":185,"./rest":239}],190:[function(e,t,r){function n(e,t){return e===t||e!==e&&t!==t}t.exports=n},{}],191:[function(e,t,r){function n(e,t){var r=o(e)?i:a;return r(e,s(t,3))}var i=e("./_arrayFilter"),a=e("./_baseFilter"),s=e("./_baseIteratee"),o=e("./isArray");t.exports=n},{"./_arrayFilter":22,"./_baseFilter":38,"./_baseIteratee":54,"./isArray":204}],192:[function(e,t,r){var n=e("./_createFind"),i=e("./findIndex"),a=n(i);t.exports=a},{"./_createFind":107,"./findIndex":193}],193:[function(e,t,r){function n(e,t,r){var n=e?e.length:0;if(!n)return-1;var c=null==r?0:s(r);return c<0&&(c=o(n+c,0)),i(e,a(t,3),c)}var i=e("./_baseFindIndex"),a=e("./_baseIteratee"),s=e("./toInteger"),o=Math.max;t.exports=n},{"./_baseFindIndex":39,"./_baseIteratee":54,"./toInteger":244}],194:[function(e,t,r){function n(e,t){var r=o(e)?i:a;return r(e,s(t,3))}var i=e("./_arrayEach"),a=e("./_baseEach"),s=e("./_baseIteratee"),o=e("./isArray");t.exports=n},{"./_arrayEach":21,"./_baseEach":37,"./_baseIteratee":54,"./isArray":204}],195:[function(e,t,r){function n(e,t){return e&&i(e,a(t,3))}var i=e("./_baseForOwn"),a=e("./_baseIteratee");t.exports=n},{"./_baseForOwn":42,"./_baseIteratee":54}],196:[function(e,t,r){function n(e,t,r){var n=null==e?void 0:i(e,t);return void 0===n?r:n}var i=e("./_baseGet");t.exports=n},{"./_baseGet":43}],197:[function(e,t,r){function n(e,t){return null!=e&&a(e,t,i)}var i=e("./_baseHasIn"),a=e("./_hasPath");t.exports=n},{"./_baseHasIn":46,"./_hasPath":130}],198:[function(e,t,r){function n(e){return e}t.exports=n},{}],199:[function(e,t,r){function n(e,t,r,n){e=a(e)?e:c(e),r=r&&!n?o(r):0;var f=e.length;return r<0&&(r=u(f+r,0)),s(e)?r<=f&&e.indexOf(t,r)>-1:!!f&&i(e,t,r)>-1}var i=e("./_baseIndexOf"),a=e("./isArrayLike"),s=e("./isString"),o=e("./toInteger"),c=e("./values"),u=Math.max;t.exports=n},{"./_baseIndexOf":47,"./isArrayLike":205,"./isString":217,"./toInteger":244,"./values":249}],200:[function(e,t,r){function n(e,t,r){var n=e?e.length:0;if(!n)return-1;var o=null==r?0:a(r);return o<0&&(o=s(n+o,0)),i(e,t,o)}var i=e("./_baseIndexOf"),a=e("./toInteger"),s=Math.max;t.exports=n},{"./_baseIndexOf":47,"./toInteger":244}],201:[function(e,t,r){var n=e("./_arrayMap"),i=e("./_baseIntersection"),a=e("./_castArrayLikeObject"),s=e("./rest"),o=s(function(e){var t=n(e,a);return t.length&&t[0]===e[0]?i(t):[]});t.exports=o},{"./_arrayMap":25,"./_baseIntersection":48,"./_castArrayLikeObject":78,"./rest":239}],202:[function(e,t,r){var n=e("./constant"),i=e("./_createInverter"),a=e("./identity"),s=i(function(e,t,r){e[t]=r},n(a));t.exports=s},{"./_createInverter":109,"./constant":188,"./identity":198}],203:[function(e,t,r){function n(e){return i(e)&&o.call(e,"callee")&&(!u.call(e,"callee")||c.call(e)==a)}var i=e("./isArrayLikeObject"),a="[object Arguments]",s=Object.prototype,o=s.hasOwnProperty,c=s.toString,u=s.propertyIsEnumerable;t.exports=n},{"./isArrayLikeObject":206}],204:[function(e,t,r){var n=Array.isArray;t.exports=n},{}],205:[function(e,t,r){function n(e){return null!=e&&s(i(e))&&!a(e)}var i=e("./_getLength"),a=e("./isFunction"),s=e("./isLength");t.exports=n},{"./_getLength":121,"./isFunction":210,"./isLength":211}],206:[function(e,t,r){function n(e){return a(e)&&i(e)}var i=e("./isArrayLike"),a=e("./isObjectLike");t.exports=n},{"./isArrayLike":205,"./isObjectLike":215}],207:[function(e,t,r){var n=e("./_root"),i=e("./stubFalse"),a="object"==typeof r&&r,s=a&&"object"==typeof t&&t,o=s&&s.exports===a,c=o?n.Buffer:void 0,u=c?function(e){return e instanceof c}:i;t.exports=u},{"./_root":170,"./stubFalse":241}],208:[function(e,t,r){function n(e){if(o(e)&&(s(e)||l(e)||u(e.splice)||a(e)||c(e)))return!e.length;if(f(e)){var t=i(e);if(t==p||t==d)return!e.size}for(var r in e)if(v.call(e,r))return!1;return!(g&&h(e).length)}var i=e("./_getTag"),a=e("./isArguments"),s=e("./isArray"),o=e("./isArrayLike"),c=e("./isBuffer"),u=e("./isFunction"),f=e("./isObjectLike"),l=e("./isString"),h=e("./keys"),p="[object Map]",d="[object Set]",_=Object.prototype,v=_.hasOwnProperty,y=_.propertyIsEnumerable,g=!y.call({valueOf:1},"valueOf");t.exports=n},{"./_getTag":128,"./isArguments":203,"./isArray":204,"./isArrayLike":205,"./isBuffer":207,"./isFunction":210,"./isObjectLike":215,"./isString":217,"./keys":221}],209:[function(e,t,r){function n(e,t){return i(e,t)}var i=e("./_baseIsEqual");t.exports=n},{"./_baseIsEqual":50}],210:[function(e,t,r){function n(e){var t=i(e)?c.call(e):"";return t==a||t==s}var i=e("./isObject"),a="[object Function]",s="[object GeneratorFunction]",o=Object.prototype,c=o.toString;t.exports=n},{"./isObject":214}],211:[function(e,t,r){function n(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=i}var i=9007199254740991;t.exports=n},{}],212:[function(e,t,r){function n(e){return i(e)&&e!=+e}var i=e("./isNumber");t.exports=n},{"./isNumber":213}],213:[function(e,t,r){function n(e){return"number"==typeof e||i(e)&&o.call(e)==a}var i=e("./isObjectLike"),a="[object Number]",s=Object.prototype,o=s.toString;t.exports=n},{"./isObjectLike":215}],214:[function(e,t,r){function n(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}t.exports=n},{}],215:[function(e,t,r){function n(e){return!!e&&"object"==typeof e}t.exports=n},{}],216:[function(e,t,r){function n(e){if(!s(e)||h.call(e)!=o||a(e))return!1;var t=i(e);if(null===t)return!0;var r=f.call(t,"constructor")&&t.constructor;return"function"==typeof r&&r instanceof r&&u.call(r)==l}var i=e("./_getPrototype"),a=e("./_isHostObject"),s=e("./isObjectLike"),o="[object Object]",c=Object.prototype,u=Function.prototype.toString,f=c.hasOwnProperty,l=u.call(Object),h=c.toString;t.exports=n},{"./_getPrototype":125,"./_isHostObject":142,"./isObjectLike":215}],217:[function(e,t,r){function n(e){return"string"==typeof e||!i(e)&&a(e)&&c.call(e)==s}var i=e("./isArray"),a=e("./isObjectLike"),s="[object String]",o=Object.prototype,c=o.toString;t.exports=n},{"./isArray":204,"./isObjectLike":215}],218:[function(e,t,r){function n(e){return"symbol"==typeof e||i(e)&&o.call(e)==a}var i=e("./isObjectLike"),a="[object Symbol]",s=Object.prototype,o=s.toString;t.exports=n},{"./isObjectLike":215}],219:[function(e,t,r){function n(e){return a(e)&&i(e.length)&&!!E[T.call(e)]}var i=e("./isLength"),a=e("./isObjectLike"),s="[object Arguments]",o="[object Array]",c="[object Boolean]",u="[object Date]",f="[object Error]",l="[object Function]",h="[object Map]",p="[object Number]",d="[object Object]",_="[object RegExp]",v="[object Set]",y="[object String]",g="[object WeakMap]",m="[object ArrayBuffer]",b="[object DataView]",x="[object Float32Array]",j="[object Float64Array]",R="[object Int8Array]",F="[object Int16Array]",O="[object Int32Array]",w="[object Uint8Array]",A="[object Uint8ClampedArray]",S="[object Uint16Array]",P="[object Uint32Array]",E={};E[x]=E[j]=E[R]=E[F]=E[O]=E[w]=E[A]=E[S]=E[P]=!0,E[s]=E[o]=E[m]=E[c]=E[b]=E[u]=E[f]=E[l]=E[h]=E[p]=E[d]=E[_]=E[v]=E[y]=E[g]=!1;var I=Object.prototype,T=I.toString;t.exports=n},{"./isLength":211,"./isObjectLike":215}],220:[function(e,t,r){function n(e){return void 0===e}t.exports=n},{}],221:[function(e,t,r){function n(e){var t=u(e);if(!t&&!o(e))return a(e);var r=s(e),n=!!r,f=r||[],l=f.length;for(var h in e)!i(e,h)||n&&("length"==h||c(h,l))||t&&"constructor"==h||f.push(h);return f}var i=e("./_baseHas"),a=e("./_baseKeys"),s=e("./_indexKeys"),o=e("./isArrayLike"),c=e("./_isIndex"),u=e("./_isPrototype");t.exports=n},{"./_baseHas":45,"./_baseKeys":55,"./_indexKeys":136,"./_isIndex":143,"./_isPrototype":149,"./isArrayLike":205}],222:[function(e,t,r){function n(e){for(var t=-1,r=o(e),n=i(e),c=n.length,f=a(e),l=!!f,h=f||[],p=h.length;++t<c;){var d=n[t];l&&("length"==d||s(d,p))||"constructor"==d&&(r||!u.call(e,d))||h.push(d)}return h}var i=e("./_baseKeysIn"),a=e("./_indexKeys"),s=e("./_isIndex"),o=e("./_isPrototype"),c=Object.prototype,u=c.hasOwnProperty;t.exports=n},{"./_baseKeysIn":56,"./_indexKeys":136,"./_isIndex":143,"./_isPrototype":149}],223:[function(e,t,r){function n(e){var t=e?e.length:0;return t?e[t-1]:void 0}t.exports=n},{}],224:[function(e,t,r){function n(e,t){var r=o(e)?i:s;return r(e,a(t,3))}var i=e("./_arrayMap"),a=e("./_baseIteratee"),s=e("./_baseMap"),o=e("./isArray");t.exports=n},{"./_arrayMap":25,"./_baseIteratee":54,"./_baseMap":58,"./isArray":204}],225:[function(e,t,r){function n(e,t){var r={};return t=a(t,3),i(e,function(e,n,i){r[t(e,n,i)]=e}),r}var i=e("./_baseForOwn"),a=e("./_baseIteratee");t.exports=n},{"./_baseForOwn":42,"./_baseIteratee":54}],226:[function(e,t,r){function n(e,t){var r={};return t=a(t,3),i(e,function(e,n,i){r[n]=t(e,n,i)}),r}var i=e("./_baseForOwn"),a=e("./_baseIteratee");t.exports=n},{"./_baseForOwn":42,"./_baseIteratee":54}],227:[function(e,t,r){function n(e,t){if("function"!=typeof e||t&&"function"!=typeof t)throw new TypeError(a);var r=function(){var n=arguments,i=t?t.apply(this,n):n[0],a=r.cache;if(a.has(i))return a.get(i);var s=e.apply(this,n);return r.cache=a.set(i,s),s};return r.cache=new(n.Cache||i),r}var i=e("./_MapCache"),a="Expected a function";n.Cache=i,t.exports=n},{"./_MapCache":9}],228:[function(e,t,r){var n=e("./_baseMerge"),i=e("./_createAssigner"),a=i(function(e,t,r){n(e,t,r)});t.exports=a},{"./_baseMerge":61,"./_createAssigner":101}],229:[function(e,t,r){function n(){}t.exports=n},{}],230:[function(e,t,r){function n(){return Date.now()}t.exports=n},{}],231:[function(e,t,r){var n=e("./_arrayMap"),i=e("./_baseDifference"),a=e("./_baseFlatten"),s=e("./_basePick"),o=e("./_getAllKeysIn"),c=e("./rest"),u=e("./_toKey"),f=c(function(e,t){return null==e?{}:(t=n(a(t,1),u),s(e,i(o(e),t)))});t.exports=f},{"./_arrayMap":25,"./_baseDifference":36,"./_baseFlatten":40,"./_basePick":64,"./_getAllKeysIn":117,"./_toKey":182,"./rest":239}],232:[function(e,t,r){function n(e,t,r,n){return null==e?[]:(a(t)||(t=null==t?[]:[t]),r=n?void 0:r,a(r)||(r=null==r?[]:[r]),i(e,t,r))}var i=e("./_baseOrderBy"),a=e("./isArray");t.exports=n},{"./_baseOrderBy":63,"./isArray":204}],233:[function(e,t,r){var n=e("./_createWrapper"),i=e("./_getHolder"),a=e("./_replaceHolders"),s=e("./rest"),o=32,c=s(function(e,t){var r=a(t,i(c));return n(e,o,void 0,t,r)});c.placeholder={},t.exports=c},{"./_createWrapper":112,"./_getHolder":120,"./_replaceHolders":169,"./rest":239}],234:[function(e,t,r){var n=e("./_createWrapper"),i=e("./_getHolder"),a=e("./_replaceHolders"),s=e("./rest"),o=64,c=s(function(e,t){var r=a(t,i(c));return n(e,o,void 0,t,r)});c.placeholder={},t.exports=c},{"./_createWrapper":112,"./_getHolder":120,"./_replaceHolders":169,"./rest":239}],235:[function(e,t,r){var n=e("./_arrayMap"),i=e("./_baseFlatten"),a=e("./_basePick"),s=e("./rest"),o=e("./_toKey"),c=s(function(e,t){return null==e?{}:a(e,n(i(t,1),o))});t.exports=c},{"./_arrayMap":25,"./_baseFlatten":40,"./_basePick":64,"./_toKey":182,"./rest":239}],236:[function(e,t,r){function n(e,t){return null==e?{}:a(e,i(t))}var i=e("./_baseIteratee"),a=e("./_basePickBy");t.exports=n},{"./_baseIteratee":54,"./_basePickBy":65}],237:[function(e,t,r){function n(e){return s(e)?i(o(e)):a(e)}var i=e("./_baseProperty"),a=e("./_basePropertyDeep"),s=e("./_isKey"),o=e("./_toKey");t.exports=n},{"./_baseProperty":66,"./_basePropertyDeep":67,"./_isKey":145,"./_toKey":182}],238:[function(e,t,r){function n(e,t,r){var n=c(e)?i:o,u=arguments.length<3;return n(e,s(t,4),r,u,a)}var i=e("./_arrayReduce"),a=e("./_baseEach"),s=e("./_baseIteratee"),o=e("./_baseReduce"),c=e("./isArray");t.exports=n},{"./_arrayReduce":27,"./_baseEach":37,"./_baseIteratee":54,"./_baseReduce":68,"./isArray":204}],239:[function(e,t,r){function n(e,t){if("function"!=typeof e)throw new TypeError(s);return t=o(void 0===t?e.length-1:a(t),0),function(){for(var r=arguments,n=-1,a=o(r.length-t,0),s=Array(a);++n<a;)s[n]=r[t+n];switch(t){case 0:return e.call(this,s);case 1:return e.call(this,r[0],s);case 2:return e.call(this,r[0],r[1],s)}var c=Array(t+1);for(n=-1;++n<t;)c[n]=r[n];return c[t]=s,i(e,this,c)}}var i=e("./_apply"),a=e("./toInteger"),s="Expected a function",o=Math.max;t.exports=n},{"./_apply":20,"./toInteger":244}],240:[function(e,t,r){function n(){return[]}t.exports=n},{}],241:[function(e,t,r){function n(){return!1}t.exports=n},{}],242:[function(e,t,r){function n(e,t){return e&&e.length?a(e,i(t)):0}var i=e("./_baseIteratee"),a=e("./_baseSum");t.exports=n},{"./_baseIteratee":54,"./_baseSum":72}],243:[function(e,t,r){function n(e){if(!e)return 0===e?e:0;if(e=i(e),e===a||e===-a){var t=e<0?-1:1;return t*s}return e===e?e:0}var i=e("./toNumber"),a=1/0,s=1.7976931348623157e308;t.exports=n},{"./toNumber":245}],244:[function(e,t,r){function n(e){var t=i(e),r=t%1;return t===t?r?t-r:t:0}var i=e("./toFinite");t.exports=n},{"./toFinite":243}],245:[function(e,t,r){function n(e){if("number"==typeof e)return e;if(s(e))return o;if(a(e)){var t=i(e.valueOf)?e.valueOf():e;e=a(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(c,"");var r=f.test(e);return r||l.test(e)?h(e.slice(2),r?2:8):u.test(e)?o:+e}var i=e("./isFunction"),a=e("./isObject"),s=e("./isSymbol"),o=NaN,c=/^\s+|\s+$/g,u=/^[-+]0x[0-9a-f]+$/i,f=/^0b[01]+$/i,l=/^0o[0-7]+$/i,h=parseInt;t.exports=n},{"./isFunction":210,"./isObject":214,"./isSymbol":218}],246:[function(e,t,r){function n(e){return i(e,a(e))}var i=e("./_copyObject"),a=e("./keysIn");t.exports=n},{"./_copyObject":97,"./keysIn":222}],247:[function(e,t,r){function n(e){return null==e?"":i(e)}var i=e("./_baseToString");t.exports=n},{"./_baseToString":74}],248:[function(e,t,r){function n(e,t,r){if(e=u(e),e&&(r||void 0===t))return e.replace(f,"");if(!e||!(t=i(t)))return e;var n=c(e),l=c(t),h=o(n,l),p=s(n,l)+1;
return a(n,h,p).join("")}var i=e("./_baseToString"),a=e("./_castSlice"),s=e("./_charsEndIndex"),o=e("./_charsStartIndex"),c=e("./_stringToArray"),u=e("./toString"),f=/^\s+|\s+$/g;t.exports=n},{"./_baseToString":74,"./_castSlice":80,"./_charsEndIndex":81,"./_charsStartIndex":82,"./_stringToArray":180,"./toString":247}],249:[function(e,t,r){function n(e){return e?i(e,a(e)):[]}var i=e("./_baseValues"),a=e("./keys");t.exports=n},{"./_baseValues":76,"./keys":221}],250:[function(e,t,r){function n(e){if(c(e)&&!o(e)&&!(e instanceof i)){if(e instanceof a)return e;if(l.call(e,"__wrapped__"))return u(e)}return new a(e)}var i=e("./_LazyWrapper"),a=e("./_LodashWrapper"),s=e("./_baseLodash"),o=e("./isArray"),c=e("./isObjectLike"),u=e("./_wrapperClone"),f=Object.prototype,l=f.hasOwnProperty;n.prototype=s.prototype,n.prototype.constructor=n,t.exports=n},{"./_LazyWrapper":5,"./_LodashWrapper":7,"./_baseLodash":57,"./_wrapperClone":184,"./isArray":204,"./isObjectLike":215}],251:[function(e,t,r){function n(){h&&f&&(h=!1,f.length?l=f.concat(l):p=-1,l.length&&i())}function i(){if(!h){var e=o(n);h=!0;for(var t=l.length;t;){for(f=l,l=[];++p<t;)f&&f[p].run();p=-1,t=l.length}f=null,h=!1,c(e)}}function a(e,t){this.fun=e,this.array=t}function s(){}var o,c,u=t.exports={};!function(){try{o=setTimeout}catch(e){o=function(){throw new Error("setTimeout is not defined")}}try{c=clearTimeout}catch(e){c=function(){throw new Error("clearTimeout is not defined")}}}();var f,l=[],h=!1,p=-1;u.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];l.push(new a(e,t)),1!==l.length||h||o(i,0)},a.prototype.run=function(){this.fun.apply(null,this.array)},u.title="browser",u.browser=!0,u.env={},u.argv=[],u.version="",u.versions={},u.on=s,u.addListener=s,u.once=s,u.off=s,u.removeListener=s,u.removeAllListeners=s,u.emit=s,u.binding=function(e){throw new Error("process.binding is not supported")},u.cwd=function(){return"/"},u.chdir=function(e){throw new Error("process.chdir is not supported")},u.umask=function(){return 0}},{}],252:[function(e,t,r){var n=e("./stringify"),i=e("./parse");t.exports={stringify:n,parse:i}},{"./parse":253,"./stringify":254}],253:[function(e,t,r){var n=e("./utils"),i={delimiter:"&",depth:5,arrayLimit:20,parameterLimit:1e3,strictNullHandling:!1,plainObjects:!1,allowPrototypes:!1,allowDots:!1};i.parseValues=function(e,t){for(var r={},i=e.split(t.delimiter,t.parameterLimit===1/0?void 0:t.parameterLimit),a=0,s=i.length;a<s;++a){var o=i[a],c=o.indexOf("]=")===-1?o.indexOf("="):o.indexOf("]=")+1;if(c===-1)r[n.decode(o)]="",t.strictNullHandling&&(r[n.decode(o)]=null);else{var u=n.decode(o.slice(0,c)),f=n.decode(o.slice(c+1));Object.prototype.hasOwnProperty.call(r,u)?r[u]=[].concat(r[u]).concat(f):r[u]=f}}return r},i.parseObject=function(e,t,r){if(!e.length)return t;var n,a=e.shift();if("[]"===a)n=[],n=n.concat(i.parseObject(e,t,r));else{n=r.plainObjects?Object.create(null):{};var s="["===a[0]&&"]"===a[a.length-1]?a.slice(1,a.length-1):a,o=parseInt(s,10),c=""+o;!isNaN(o)&&a!==s&&c===s&&o>=0&&r.parseArrays&&o<=r.arrayLimit?(n=[],n[o]=i.parseObject(e,t,r)):n[s]=i.parseObject(e,t,r)}return n},i.parseKeys=function(e,t,r){if(e){r.allowDots&&(e=e.replace(/\.([^\.\[]+)/g,"[$1]"));var n=/^([^\[\]]*)/,a=/(\[[^\[\]]*\])/g,s=n.exec(e),o=[];if(s[1]){if(!r.plainObjects&&Object.prototype.hasOwnProperty(s[1])&&!r.allowPrototypes)return;o.push(s[1])}for(var c=0;null!==(s=a.exec(e))&&c<r.depth;)++c,(r.plainObjects||!Object.prototype.hasOwnProperty(s[1].replace(/\[|\]/g,""))||r.allowPrototypes)&&o.push(s[1]);return s&&o.push("["+e.slice(s.index)+"]"),i.parseObject(o,t,r)}},t.exports=function(e,t){if(t=t||{},t.delimiter="string"==typeof t.delimiter||n.isRegExp(t.delimiter)?t.delimiter:i.delimiter,t.depth="number"==typeof t.depth?t.depth:i.depth,t.arrayLimit="number"==typeof t.arrayLimit?t.arrayLimit:i.arrayLimit,t.parseArrays=t.parseArrays!==!1,t.allowDots="boolean"==typeof t.allowDots?t.allowDots:i.allowDots,t.plainObjects="boolean"==typeof t.plainObjects?t.plainObjects:i.plainObjects,t.allowPrototypes="boolean"==typeof t.allowPrototypes?t.allowPrototypes:i.allowPrototypes,t.parameterLimit="number"==typeof t.parameterLimit?t.parameterLimit:i.parameterLimit,t.strictNullHandling="boolean"==typeof t.strictNullHandling?t.strictNullHandling:i.strictNullHandling,""===e||null===e||"undefined"==typeof e)return t.plainObjects?Object.create(null):{};for(var r="string"==typeof e?i.parseValues(e,t):e,a=t.plainObjects?Object.create(null):{},s=Object.keys(r),o=0,c=s.length;o<c;++o){var u=s[o],f=i.parseKeys(u,r[u],t);a=n.merge(a,f,t)}return n.compact(a)}},{"./utils":255}],254:[function(e,t,r){var n=e("./utils"),i={delimiter:"&",arrayPrefixGenerators:{brackets:function(e,t){return e+"[]"},indices:function(e,t){return e+"["+t+"]"},repeat:function(e,t){return e}},strictNullHandling:!1,skipNulls:!1,encode:!0};i.stringify=function(e,t,r,a,s,o,c,u){if("function"==typeof c)e=c(t,e);else if(n.isBuffer(e))e=e.toString();else if(e instanceof Date)e=e.toISOString();else if(null===e){if(a)return o?n.encode(t):t;e=""}if("string"==typeof e||"number"==typeof e||"boolean"==typeof e)return o?[n.encode(t)+"="+n.encode(e)]:[t+"="+e];var f=[];if("undefined"==typeof e)return f;var l;if(Array.isArray(c))l=c;else{var h=Object.keys(e);l=u?h.sort(u):h}for(var p=0,d=l.length;p<d;++p){var _=l[p];s&&null===e[_]||(f=Array.isArray(e)?f.concat(i.stringify(e[_],r(t,_),r,a,s,o,c)):f.concat(i.stringify(e[_],t+"["+_+"]",r,a,s,o,c)))}return f},t.exports=function(e,t){t=t||{};var r,n,a="undefined"==typeof t.delimiter?i.delimiter:t.delimiter,s="boolean"==typeof t.strictNullHandling?t.strictNullHandling:i.strictNullHandling,o="boolean"==typeof t.skipNulls?t.skipNulls:i.skipNulls,c="boolean"==typeof t.encode?t.encode:i.encode,u="function"==typeof t.sort?t.sort:null;"function"==typeof t.filter?(n=t.filter,e=n("",e)):Array.isArray(t.filter)&&(r=n=t.filter);var f=[];if("object"!=typeof e||null===e)return"";var l;l=t.arrayFormat in i.arrayPrefixGenerators?t.arrayFormat:"indices"in t?t.indices?"indices":"repeat":"indices";var h=i.arrayPrefixGenerators[l];r||(r=Object.keys(e)),u&&r.sort(u);for(var p=0,d=r.length;p<d;++p){var _=r[p];o&&null===e[_]||(f=f.concat(i.stringify(e[_],_,h,s,o,c,n,u)))}return f.join(a)}},{"./utils":255}],255:[function(e,t,r){var n={};n.hexTable=new Array(256);for(var i=0;i<256;++i)n.hexTable[i]="%"+((i<16?"0":"")+i.toString(16)).toUpperCase();r.arrayToObject=function(e,t){for(var r=t.plainObjects?Object.create(null):{},n=0,i=e.length;n<i;++n)"undefined"!=typeof e[n]&&(r[n]=e[n]);return r},r.merge=function(e,t,n){if(!t)return e;if("object"!=typeof t)return Array.isArray(e)?e.push(t):"object"==typeof e?e[t]=!0:e=[e,t],e;if("object"!=typeof e)return e=[e].concat(t);Array.isArray(e)&&!Array.isArray(t)&&(e=r.arrayToObject(e,n));for(var i=Object.keys(t),a=0,s=i.length;a<s;++a){var o=i[a],c=t[o];Object.prototype.hasOwnProperty.call(e,o)?e[o]=r.merge(e[o],c,n):e[o]=c}return e},r.decode=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}},r.encode=function(e){if(0===e.length)return e;"string"!=typeof e&&(e=""+e);for(var t="",r=0,i=e.length;r<i;++r){var a=e.charCodeAt(r);45===a||46===a||95===a||126===a||a>=48&&a<=57||a>=65&&a<=90||a>=97&&a<=122?t+=e[r]:a<128?t+=n.hexTable[a]:a<2048?t+=n.hexTable[192|a>>6]+n.hexTable[128|63&a]:a<55296||a>=57344?t+=n.hexTable[224|a>>12]+n.hexTable[128|a>>6&63]+n.hexTable[128|63&a]:(++r,a=65536+((1023&a)<<10|1023&e.charCodeAt(r)),t+=n.hexTable[240|a>>18]+n.hexTable[128|a>>12&63]+n.hexTable[128|a>>6&63]+n.hexTable[128|63&a])}return t},r.compact=function(e,t){if("object"!=typeof e||null===e)return e;t=t||[];var n=t.indexOf(e);if(n!==-1)return t[n];if(t.push(e),Array.isArray(e)){for(var i=[],a=0,s=e.length;a<s;++a)"undefined"!=typeof e[a]&&i.push(e[a]);return i}var o=Object.keys(e);for(a=0,s=o.length;a<s;++a){var c=o[a];e[c]=r.compact(e[c],t)}return e},r.isRegExp=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},r.isBuffer=function(e){return null!==e&&"undefined"!=typeof e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))}},{}],256:[function(e,t,r){"function"==typeof Object.create?t.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(e,t){e.super_=t;var r=function(){};r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e}},{}],257:[function(e,t,r){t.exports=function(e){return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8}},{}],258:[function(e,t,r){(function(t,n){function i(e,t){var n={seen:[],stylize:s};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),_(t)?n.showHidden=t:t&&r._extend(n,t),x(n.showHidden)&&(n.showHidden=!1),x(n.depth)&&(n.depth=2),x(n.colors)&&(n.colors=!1),x(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=a),c(n,e,n.depth)}function a(e,t){var r=i.styles[t];return r?"["+i.colors[r][0]+"m"+e+"["+i.colors[r][1]+"m":e}function s(e,t){return e}function o(e){var t={};return e.forEach(function(e,r){t[e]=!0}),t}function c(e,t,n){if(e.customInspect&&t&&w(t.inspect)&&t.inspect!==r.inspect&&(!t.constructor||t.constructor.prototype!==t)){var i=t.inspect(n,e);return m(i)||(i=c(e,i,n)),i}var a=u(e,t);if(a)return a;var s=Object.keys(t),_=o(s);if(e.showHidden&&(s=Object.getOwnPropertyNames(t)),O(t)&&(s.indexOf("message")>=0||s.indexOf("description")>=0))return f(t);if(0===s.length){if(w(t)){var v=t.name?": "+t.name:"";return e.stylize("[Function"+v+"]","special")}if(j(t))return e.stylize(RegExp.prototype.toString.call(t),"regexp");if(F(t))return e.stylize(Date.prototype.toString.call(t),"date");if(O(t))return f(t)}var y="",g=!1,b=["{","}"];if(d(t)&&(g=!0,b=["[","]"]),w(t)){var x=t.name?": "+t.name:"";y=" [Function"+x+"]"}if(j(t)&&(y=" "+RegExp.prototype.toString.call(t)),F(t)&&(y=" "+Date.prototype.toUTCString.call(t)),O(t)&&(y=" "+f(t)),0===s.length&&(!g||0==t.length))return b[0]+y+b[1];if(n<0)return j(t)?e.stylize(RegExp.prototype.toString.call(t),"regexp"):e.stylize("[Object]","special");e.seen.push(t);var R;return R=g?l(e,t,n,_,s):s.map(function(r){return h(e,t,n,_,r,g)}),e.seen.pop(),p(R,y,b)}function u(e,t){if(x(t))return e.stylize("undefined","undefined");if(m(t)){var r="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(r,"string")}return g(t)?e.stylize(""+t,"number"):_(t)?e.stylize(""+t,"boolean"):v(t)?e.stylize("null","null"):void 0}function f(e){return"["+Error.prototype.toString.call(e)+"]"}function l(e,t,r,n,i){for(var a=[],s=0,o=t.length;s<o;++s)I(t,String(s))?a.push(h(e,t,r,n,String(s),!0)):a.push("");return i.forEach(function(i){i.match(/^\d+$/)||a.push(h(e,t,r,n,i,!0))}),a}function h(e,t,r,n,i,a){var s,o,u;if(u=Object.getOwnPropertyDescriptor(t,i)||{value:t[i]},u.get?o=u.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):u.set&&(o=e.stylize("[Setter]","special")),I(n,i)||(s="["+i+"]"),o||(e.seen.indexOf(u.value)<0?(o=v(r)?c(e,u.value,null):c(e,u.value,r-1),o.indexOf("\n")>-1&&(o=a?o.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+o.split("\n").map(function(e){return"   "+e}).join("\n"))):o=e.stylize("[Circular]","special")),x(s)){if(a&&i.match(/^\d+$/))return o;s=JSON.stringify(""+i),s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=e.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=e.stylize(s,"string"))}return s+": "+o}function p(e,t,r){var n=0,i=e.reduce(function(e,t){return n++,t.indexOf("\n")>=0&&n++,e+t.replace(/\u001b\[\d\d?m/g,"").length+1},0);return i>60?r[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+r[1]:r[0]+t+" "+e.join(", ")+" "+r[1]}function d(e){return Array.isArray(e)}function _(e){return"boolean"==typeof e}function v(e){return null===e}function y(e){return null==e}function g(e){return"number"==typeof e}function m(e){return"string"==typeof e}function b(e){return"symbol"==typeof e}function x(e){return void 0===e}function j(e){return R(e)&&"[object RegExp]"===S(e)}function R(e){return"object"==typeof e&&null!==e}function F(e){return R(e)&&"[object Date]"===S(e)}function O(e){return R(e)&&("[object Error]"===S(e)||e instanceof Error)}function w(e){return"function"==typeof e}function A(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||"undefined"==typeof e}function S(e){return Object.prototype.toString.call(e)}function P(e){return e<10?"0"+e.toString(10):e.toString(10)}function E(){var e=new Date,t=[P(e.getHours()),P(e.getMinutes()),P(e.getSeconds())].join(":");return[e.getDate(),k[e.getMonth()],t].join(" ")}function I(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var T=/%[sdj%]/g;r.format=function(e){if(!m(e)){for(var t=[],r=0;r<arguments.length;r++)t.push(i(arguments[r]));return t.join(" ")}for(var r=1,n=arguments,a=n.length,s=String(e).replace(T,function(e){if("%%"===e)return"%";if(r>=a)return e;switch(e){case"%s":return String(n[r++]);case"%d":return Number(n[r++]);case"%j":try{return JSON.stringify(n[r++])}catch(e){return"[Circular]"}default:return e}}),o=n[r];r<a;o=n[++r])s+=v(o)||!R(o)?" "+o:" "+i(o);return s},r.deprecate=function(e,i){function a(){if(!s){if(t.throwDeprecation)throw new Error(i);t.traceDeprecation?console.trace(i):console.error(i),s=!0}return e.apply(this,arguments)}if(x(n.process))return function(){return r.deprecate(e,i).apply(this,arguments)};if(t.noDeprecation===!0)return e;var s=!1;return a};var C,L={};r.debuglog=function(e){if(x(C)&&(C=t.env.NODE_DEBUG||""),e=e.toUpperCase(),!L[e])if(new RegExp("\\b"+e+"\\b","i").test(C)){var n=t.pid;L[e]=function(){var t=r.format.apply(r,arguments);console.error("%s %d: %s",e,n,t)}}else L[e]=function(){};return L[e]},r.inspect=i,i.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},i.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},r.isArray=d,r.isBoolean=_,r.isNull=v,r.isNullOrUndefined=y,r.isNumber=g,r.isString=m,r.isSymbol=b,r.isUndefined=x,r.isRegExp=j,r.isObject=R,r.isDate=F,r.isError=O,r.isFunction=w,r.isPrimitive=A,r.isBuffer=e("./support/isBuffer");var k=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];r.log=function(){console.log("%s - %s",E(),r.format.apply(r,arguments))},r.inherits=e("inherits"),r._extend=function(e,t){if(!t||!R(t))return e;for(var r=Object.keys(t),n=r.length;n--;)e[r[n]]=t[r[n]];return e}}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./support/isBuffer":257,_process:251,inherits:256}],259:[function(e,t,r){"use strict";var n=e("lodash/isUndefined"),i=e("lodash/isString"),a=e("lodash/isFunction"),s=e("lodash/isEmpty"),o=e("lodash/defaults"),c=e("lodash/reduce"),u=e("lodash/filter"),f=e("lodash/omit"),l={addRefinement:function(e,t,r){if(l.isRefined(e,t,r))return e;var n=""+r,i=e[t]?e[t].concat(n):[n],a={};return a[t]=i,o({},a,e)},removeRefinement:function(e,t,r){if(n(r))return l.clearRefinement(e,t);var i=""+r;return l.clearRefinement(e,function(e,r){return t===r&&i===e})},toggleRefinement:function(e,t,r){if(n(r))throw new Error("toggleRefinement should be used with a value");return l.isRefined(e,t,r)?l.removeRefinement(e,t,r):l.addRefinement(e,t,r)},clearRefinement:function(e,t,r){return n(t)?{}:i(t)?f(e,t):a(t)?c(e,function(e,n,i){var a=u(n,function(e){return!t(e,i,r)});return s(a)||(e[i]=a),e},{}):void 0},isRefined:function(t,r,i){var a=e("lodash/indexOf"),s=!!t[r]&&t[r].length>0;if(n(i)||!s)return s;var o=""+i;return a(t[r],o)!==-1}};t.exports=l},{"lodash/defaults":189,"lodash/filter":191,"lodash/indexOf":200,"lodash/isEmpty":208,"lodash/isFunction":210,"lodash/isString":217,"lodash/isUndefined":220,"lodash/omit":231,"lodash/reduce":238}],260:[function(e,t,r){"use strict";function n(e,t){var r={},n=a(t,function(e){return e.indexOf("attribute:")!==-1}),u=s(n,function(e){return e.split(":")[1]});c(u,"*")===-1?i(u,function(t){e.isConjunctiveFacet(t)&&e.isFacetRefined(t)&&(r.facetsRefinements||(r.facetsRefinements={}),r.facetsRefinements[t]=e.facetsRefinements[t]),e.isDisjunctiveFacet(t)&&e.isDisjunctiveFacetRefined(t)&&(r.disjunctiveFacetsRefinements||(r.disjunctiveFacetsRefinements={}),r.disjunctiveFacetsRefinements[t]=e.disjunctiveFacetsRefinements[t]),e.isHierarchicalFacet(t)&&e.isHierarchicalFacetRefined(t)&&(r.hierarchicalFacetsRefinements||(r.hierarchicalFacetsRefinements={}),r.hierarchicalFacetsRefinements[t]=e.hierarchicalFacetsRefinements[t]);var n=e.getNumericRefinements(t);o(n)||(r.numericRefinements||(r.numericRefinements={}),r.numericRefinements[t]=e.numericRefinements[t])}):(o(e.numericRefinements)||(r.numericRefinements=e.numericRefinements),o(e.facetsRefinements)||(r.facetsRefinements=e.facetsRefinements),o(e.disjunctiveFacetsRefinements)||(r.disjunctiveFacetsRefinements=e.disjunctiveFacetsRefinements),o(e.hierarchicalFacetsRefinements)||(r.hierarchicalFacetsRefinements=e.hierarchicalFacetsRefinements));var f=a(t,function(e){return e.indexOf("attribute:")===-1});return i(f,function(t){r[t]=e[t]}),r}var i=e("lodash/forEach"),a=e("lodash/filter"),s=e("lodash/map"),o=e("lodash/isEmpty"),c=e("lodash/indexOf");t.exports=n},{"lodash/filter":191,"lodash/forEach":194,"lodash/indexOf":200,"lodash/isEmpty":208,"lodash/map":224}],261:[function(e,t,r){"use strict";function n(e,t){return x(e,function(e){return y(e,t)})}function i(e){var t=e?i._parseNumbers(e):{};this.index=t.index||"",this.query=t.query||"",this.facets=t.facets||[],this.disjunctiveFacets=t.disjunctiveFacets||[],this.hierarchicalFacets=t.hierarchicalFacets||[],this.facetsRefinements=t.facetsRefinements||{},this.facetsExcludes=t.facetsExcludes||{},this.disjunctiveFacetsRefinements=t.disjunctiveFacetsRefinements||{},this.numericRefinements=t.numericRefinements||{},this.tagRefinements=t.tagRefinements||[],this.hierarchicalFacetsRefinements=t.hierarchicalFacetsRefinements||{},this.numericFilters=t.numericFilters,this.tagFilters=t.tagFilters,this.optionalTagFilters=t.optionalTagFilters,this.optionalFacetFilters=t.optionalFacetFilters,this.hitsPerPage=t.hitsPerPage,this.maxValuesPerFacet=t.maxValuesPerFacet,this.page=t.page||0,this.queryType=t.queryType,this.typoTolerance=t.typoTolerance,this.minWordSizefor1Typo=t.minWordSizefor1Typo,this.minWordSizefor2Typos=t.minWordSizefor2Typos,this.minProximity=t.minProximity,this.allowTyposOnNumericTokens=t.allowTyposOnNumericTokens,this.ignorePlurals=t.ignorePlurals,this.restrictSearchableAttributes=t.restrictSearchableAttributes,this.advancedSyntax=t.advancedSyntax,this.analytics=t.analytics,this.analyticsTags=t.analyticsTags,this.synonyms=t.synonyms,this.replaceSynonymsInHighlight=t.replaceSynonymsInHighlight,this.optionalWords=t.optionalWords,this.removeWordsIfNoResults=t.removeWordsIfNoResults,this.attributesToRetrieve=t.attributesToRetrieve,this.attributesToHighlight=t.attributesToHighlight,this.highlightPreTag=t.highlightPreTag,this.highlightPostTag=t.highlightPostTag,this.attributesToSnippet=t.attributesToSnippet,this.getRankingInfo=t.getRankingInfo,this.distinct=t.distinct,this.aroundLatLng=t.aroundLatLng,this.aroundLatLngViaIP=t.aroundLatLngViaIP,this.aroundRadius=t.aroundRadius,this.minimumAroundRadius=t.minimumAroundRadius,this.aroundPrecision=t.aroundPrecision,this.insideBoundingBox=t.insideBoundingBox,this.insidePolygon=t.insidePolygon,this.snippetEllipsisText=t.snippetEllipsisText,this.disableExactOnAttributes=t.disableExactOnAttributes,this.enableExactOnSingleWordQuery=t.enableExactOnSingleWordQuery,this.offset=t.offset,this.length=t.length;var r=this;o(t,function(e,t){if(i.PARAMETERS.indexOf(t)===-1){r[t]=e;var n="Unknown SearchParameter: `"+t+"` (this might raise an error in the Algolia API)";F(n)}})}var a=e("lodash/keys"),s=e("lodash/intersection"),o=e("lodash/forOwn"),c=e("lodash/forEach"),u=e("lodash/filter"),f=e("lodash/map"),l=e("lodash/reduce"),h=e("lodash/omit"),p=e("lodash/indexOf"),d=e("lodash/isNaN"),_=e("lodash/isArray"),v=e("lodash/isEmpty"),y=e("lodash/isEqual"),g=e("lodash/isUndefined"),m=e("lodash/isString"),b=e("lodash/isFunction"),x=e("lodash/find"),j=e("lodash/defaults"),R=e("lodash/merge"),F=e("../functions/warnOnce"),O=e("../functions/valToNumber"),w=e("./filterState"),A=e("./RefinementList");i.PARAMETERS=a(new i),i._parseNumbers=function(e){if(e instanceof i)return e;var t={},r=["aroundPrecision","aroundRadius","getRankingInfo","minWordSizefor2Typos","minWordSizefor1Typo","page","maxValuesPerFacet","distinct","minimumAroundRadius","hitsPerPage","minProximity"];if(c(r,function(r){var n=e[r];if(m(n)){var i=parseFloat(n);t[r]=d(i)?n:i}}),e.numericRefinements){var n={};c(e.numericRefinements,function(e,t){n[t]={},c(e,function(e,r){var i=f(e,function(e){return _(e)?f(e,function(e){return m(e)?parseFloat(e):e}):m(e)?parseFloat(e):e});n[t][r]=i})}),t.numericRefinements=n}return R({},e,t)},i.make=function(e){var t=new i(e);return c(e.hierarchicalFacets,function(e){if(e.rootPath){var r=t.getHierarchicalRefinement(e.name);r.length>0&&0!==r[0].indexOf(e.rootPath)&&(t=t.clearRefinements(e.name)),r=t.getHierarchicalRefinement(e.name),0===r.length&&(t=t.toggleHierarchicalFacetRefinement(e.name,e.rootPath))}}),t},i.validate=function(e,t){var r=t||{},n=a(r),s=u(n,function(e){return i.PARAMETERS.indexOf(e)===-1});return 1===s.length?F("Unknown parameter "+s[0]+" (this might rise an error in the Algolia API)"):s.length>1&&F("Unknown parameters "+s.join(", ")+" (this might raise an error in the Algolia API)"),e.tagFilters&&r.tagRefinements&&r.tagRefinements.length>0?new Error("[Tags] Cannot switch from the managed tag API to the advanced API. It is probably an error, if it is really what you want, you should first clear the tags with clearTags method."):e.tagRefinements.length>0&&r.tagFilters?new Error("[Tags] Cannot switch from the advanced tag API to the managed API. It is probably an error, if it is not, you should first clear the tags with clearTags method."):e.numericFilters&&r.numericRefinements&&!v(r.numericRefinements)?new Error("[Numeric filters] Can't switch from the advanced to the managed API. It is probably an error, if this is really what you want, you have to first clear the numeric filters."):!v(e.numericRefinements)&&r.numericFilters?new Error("[Numeric filters] Can't switch from the managed API to the advanced. It is probably an error, if this is really what you want, you have to first clear the numeric filters."):null},i.prototype={constructor:i,clearRefinements:function(e){var t=A.clearRefinement;return this.setQueryParameters({page:0,numericRefinements:this._clearNumericRefinements(e),facetsRefinements:t(this.facetsRefinements,e,"conjunctiveFacet"),facetsExcludes:t(this.facetsExcludes,e,"exclude"),disjunctiveFacetsRefinements:t(this.disjunctiveFacetsRefinements,e,"disjunctiveFacet"),hierarchicalFacetsRefinements:t(this.hierarchicalFacetsRefinements,e,"hierarchicalFacet")})},clearTags:function(){return void 0===this.tagFilters&&0===this.tagRefinements.length?this:this.setQueryParameters({page:0,tagFilters:void 0,tagRefinements:[]})},setIndex:function(e){return e===this.index?this:this.setQueryParameters({index:e,page:0})},setQuery:function(e){return e===this.query?this:this.setQueryParameters({query:e,page:0})},setPage:function(e){return e===this.page?this:this.setQueryParameters({page:e})},setFacets:function(e){return this.setQueryParameters({facets:e})},setDisjunctiveFacets:function(e){return this.setQueryParameters({disjunctiveFacets:e})},setHitsPerPage:function(e){return this.hitsPerPage===e?this:this.setQueryParameters({hitsPerPage:e,page:0})},setTypoTolerance:function(e){return this.typoTolerance===e?this:this.setQueryParameters({typoTolerance:e,page:0})},addNumericRefinement:function(e,t,r){var n=O(r);if(this.isNumericRefined(e,t,n))return this;var i=R({},this.numericRefinements);return i[e]=R({},i[e]),i[e][t]?(i[e][t]=i[e][t].slice(),i[e][t].push(n)):i[e][t]=[n],this.setQueryParameters({page:0,numericRefinements:i})},getConjunctiveRefinements:function(e){if(!this.isConjunctiveFacet(e))throw new Error(e+" is not defined in the facets attribute of the helper configuration");return this.facetsRefinements[e]||[]},getDisjunctiveRefinements:function(e){if(!this.isDisjunctiveFacet(e))throw new Error(e+" is not defined in the disjunctiveFacets attribute of the helper configuration");return this.disjunctiveFacetsRefinements[e]||[]},getHierarchicalRefinement:function(e){return this.hierarchicalFacetsRefinements[e]||[]},getExcludeRefinements:function(e){if(!this.isConjunctiveFacet(e))throw new Error(e+" is not defined in the facets attribute of the helper configuration");return this.facetsExcludes[e]||[]},removeNumericRefinement:function(e,t,r){if(void 0!==r){var n=O(r);return this.isNumericRefined(e,t,n)?this.setQueryParameters({page:0,numericRefinements:this._clearNumericRefinements(function(r,i){return i===e&&r.op===t&&y(r.val,n)})}):this}return void 0!==t?this.isNumericRefined(e,t)?this.setQueryParameters({page:0,numericRefinements:this._clearNumericRefinements(function(r,n){return n===e&&r.op===t})}):this:this.isNumericRefined(e)?this.setQueryParameters({page:0,numericRefinements:this._clearNumericRefinements(function(t,r){return r===e})}):this},getNumericRefinements:function(e){return this.numericRefinements[e]||{}},getNumericRefinement:function(e,t){return this.numericRefinements[e]&&this.numericRefinements[e][t]},_clearNumericRefinements:function(e){return g(e)?{}:m(e)?h(this.numericRefinements,e):b(e)?l(this.numericRefinements,function(t,r,n){var i={};return c(r,function(t,r){var a=[];c(t,function(t){var i=e({val:t,op:r},n,"numeric");i||a.push(t)}),v(a)||(i[r]=a)}),v(i)||(t[n]=i),t},{}):void 0},addFacetRefinement:function(e,t){if(!this.isConjunctiveFacet(e))throw new Error(e+" is not defined in the facets attribute of the helper configuration");return A.isRefined(this.facetsRefinements,e,t)?this:this.setQueryParameters({page:0,facetsRefinements:A.addRefinement(this.facetsRefinements,e,t)})},addExcludeRefinement:function(e,t){if(!this.isConjunctiveFacet(e))throw new Error(e+" is not defined in the facets attribute of the helper configuration");return A.isRefined(this.facetsExcludes,e,t)?this:this.setQueryParameters({page:0,facetsExcludes:A.addRefinement(this.facetsExcludes,e,t)})},addDisjunctiveFacetRefinement:function(e,t){if(!this.isDisjunctiveFacet(e))throw new Error(e+" is not defined in the disjunctiveFacets attribute of the helper configuration");return A.isRefined(this.disjunctiveFacetsRefinements,e,t)?this:this.setQueryParameters({page:0,disjunctiveFacetsRefinements:A.addRefinement(this.disjunctiveFacetsRefinements,e,t)})},addTagRefinement:function(e){if(this.isTagRefined(e))return this;var t={page:0,tagRefinements:this.tagRefinements.concat(e)};return this.setQueryParameters(t)},removeFacetRefinement:function(e,t){if(!this.isConjunctiveFacet(e))throw new Error(e+" is not defined in the facets attribute of the helper configuration");return A.isRefined(this.facetsRefinements,e,t)?this.setQueryParameters({page:0,facetsRefinements:A.removeRefinement(this.facetsRefinements,e,t)}):this},removeExcludeRefinement:function(e,t){if(!this.isConjunctiveFacet(e))throw new Error(e+" is not defined in the facets attribute of the helper configuration");return A.isRefined(this.facetsExcludes,e,t)?this.setQueryParameters({page:0,facetsExcludes:A.removeRefinement(this.facetsExcludes,e,t)}):this},removeDisjunctiveFacetRefinement:function(e,t){if(!this.isDisjunctiveFacet(e))throw new Error(e+" is not defined in the disjunctiveFacets attribute of the helper configuration");return A.isRefined(this.disjunctiveFacetsRefinements,e,t)?this.setQueryParameters({page:0,disjunctiveFacetsRefinements:A.removeRefinement(this.disjunctiveFacetsRefinements,e,t)}):this},removeTagRefinement:function(e){if(!this.isTagRefined(e))return this;var t={page:0,tagRefinements:u(this.tagRefinements,function(t){return t!==e})};return this.setQueryParameters(t)},toggleRefinement:function(e,t){if(this.isHierarchicalFacet(e))return this.toggleHierarchicalFacetRefinement(e,t);if(this.isConjunctiveFacet(e))return this.toggleFacetRefinement(e,t);if(this.isDisjunctiveFacet(e))return this.toggleDisjunctiveFacetRefinement(e,t);throw new Error("Cannot refine the undeclared facet "+e+"; it should be added to the helper options facets, disjunctiveFacets or hierarchicalFacets")},toggleFacetRefinement:function(e,t){if(!this.isConjunctiveFacet(e))throw new Error(e+" is not defined in the facets attribute of the helper configuration");return this.setQueryParameters({page:0,facetsRefinements:A.toggleRefinement(this.facetsRefinements,e,t)})},toggleExcludeFacetRefinement:function(e,t){if(!this.isConjunctiveFacet(e))throw new Error(e+" is not defined in the facets attribute of the helper configuration");return this.setQueryParameters({page:0,facetsExcludes:A.toggleRefinement(this.facetsExcludes,e,t)})},toggleDisjunctiveFacetRefinement:function(e,t){if(!this.isDisjunctiveFacet(e))throw new Error(e+" is not defined in the disjunctiveFacets attribute of the helper configuration");return this.setQueryParameters({page:0,disjunctiveFacetsRefinements:A.toggleRefinement(this.disjunctiveFacetsRefinements,e,t)})},toggleHierarchicalFacetRefinement:function(e,t){if(!this.isHierarchicalFacet(e))throw new Error(e+" is not defined in the hierarchicalFacets attribute of the helper configuration");var r=this._getHierarchicalFacetSeparator(this.getHierarchicalFacetByName(e)),n={},i=void 0!==this.hierarchicalFacetsRefinements[e]&&this.hierarchicalFacetsRefinements[e].length>0&&(this.hierarchicalFacetsRefinements[e][0]===t||0===this.hierarchicalFacetsRefinements[e][0].indexOf(t+r));return i?t.indexOf(r)===-1?n[e]=[]:n[e]=[t.slice(0,t.lastIndexOf(r))]:n[e]=[t],this.setQueryParameters({page:0,hierarchicalFacetsRefinements:j({},n,this.hierarchicalFacetsRefinements)})},toggleTagRefinement:function(e){return this.isTagRefined(e)?this.removeTagRefinement(e):this.addTagRefinement(e)},isDisjunctiveFacet:function(e){return p(this.disjunctiveFacets,e)>-1},isHierarchicalFacet:function(e){return void 0!==this.getHierarchicalFacetByName(e)},isConjunctiveFacet:function(e){return p(this.facets,e)>-1},isFacetRefined:function(e,t){if(!this.isConjunctiveFacet(e))throw new Error(e+" is not defined in the facets attribute of the helper configuration");return A.isRefined(this.facetsRefinements,e,t)},isExcludeRefined:function(e,t){if(!this.isConjunctiveFacet(e))throw new Error(e+" is not defined in the facets attribute of the helper configuration");return A.isRefined(this.facetsExcludes,e,t)},isDisjunctiveFacetRefined:function(e,t){if(!this.isDisjunctiveFacet(e))throw new Error(e+" is not defined in the disjunctiveFacets attribute of the helper configuration");return A.isRefined(this.disjunctiveFacetsRefinements,e,t)},isHierarchicalFacetRefined:function(e,t){if(!this.isHierarchicalFacet(e))throw new Error(e+" is not defined in the hierarchicalFacets attribute of the helper configuration");var r=this.getHierarchicalRefinement(e);return t?p(r,t)!==-1:r.length>0},isNumericRefined:function(e,t,r){if(g(r)&&g(t))return!!this.numericRefinements[e];var i=this.numericRefinements[e]&&!g(this.numericRefinements[e][t]);if(g(r)||!i)return i;var a=O(r),s=!g(n(this.numericRefinements[e][t],a));return i&&s},isTagRefined:function(e){return p(this.tagRefinements,e)!==-1},getRefinedDisjunctiveFacets:function(){var e=s(a(this.numericRefinements),this.disjunctiveFacets);return a(this.disjunctiveFacetsRefinements).concat(e).concat(this.getRefinedHierarchicalFacets())},getRefinedHierarchicalFacets:function(){return s(f(this.hierarchicalFacets,"name"),a(this.hierarchicalFacetsRefinements));
},getUnrefinedDisjunctiveFacets:function(){var e=this.getRefinedDisjunctiveFacets();return u(this.disjunctiveFacets,function(t){return p(e,t)===-1})},managedParameters:["index","facets","disjunctiveFacets","facetsRefinements","facetsExcludes","disjunctiveFacetsRefinements","numericRefinements","tagRefinements","hierarchicalFacets","hierarchicalFacetsRefinements"],getQueryParams:function(){var e=this.managedParameters,t={};return o(this,function(r,n){p(e,n)===-1&&void 0!==r&&(t[n]=r)}),t},getQueryParameter:function(e){if(!this.hasOwnProperty(e))throw new Error("Parameter '"+e+"' is not an attribute of SearchParameters (http://algolia.github.io/algoliasearch-helper-js/docs/SearchParameters.html)");return this[e]},setQueryParameter:function(e,t){if(this[e]===t)return this;var r={};return r[e]=t,this.setQueryParameters(r)},setQueryParameters:function(e){var t=i.validate(this,e);if(t)throw t;var r=i._parseNumbers(e);return this.mutateMe(function(t){var n=a(e);return c(n,function(e){t[e]=r[e]}),t})},filter:function(e){return w(this,e)},mutateMe:function(e){var t=new this.constructor(this);return e(t,this),t},_getHierarchicalFacetSortBy:function(e){return e.sortBy||["isRefined:desc","name:asc"]},_getHierarchicalFacetSeparator:function(e){return e.separator||" > "},_getHierarchicalRootPath:function(e){return e.rootPath||null},_getHierarchicalShowParentLevel:function(e){return"boolean"!=typeof e.showParentLevel||e.showParentLevel},getHierarchicalFacetByName:function(e){return x(this.hierarchicalFacets,{name:e})}},t.exports=i},{"../functions/valToNumber":267,"../functions/warnOnce":268,"./RefinementList":259,"./filterState":260,"lodash/defaults":189,"lodash/filter":191,"lodash/find":192,"lodash/forEach":194,"lodash/forOwn":195,"lodash/indexOf":200,"lodash/intersection":201,"lodash/isArray":204,"lodash/isEmpty":208,"lodash/isEqual":209,"lodash/isFunction":210,"lodash/isNaN":212,"lodash/isString":217,"lodash/isUndefined":220,"lodash/keys":221,"lodash/map":224,"lodash/merge":228,"lodash/omit":231,"lodash/reduce":238}],262:[function(e,t,r){"use strict";var n=e("lodash/invert"),i=e("lodash/keys"),a={advancedSyntax:"aS",allowTyposOnNumericTokens:"aTONT",analyticsTags:"aT",analytics:"a",aroundLatLngViaIP:"aLLVIP",aroundLatLng:"aLL",aroundPrecision:"aP",aroundRadius:"aR",attributesToHighlight:"aTH",attributesToRetrieve:"aTR",attributesToSnippet:"aTS",disjunctiveFacetsRefinements:"dFR",disjunctiveFacets:"dF",distinct:"d",facetsExcludes:"fE",facetsRefinements:"fR",facets:"f",getRankingInfo:"gRI",hierarchicalFacetsRefinements:"hFR",hierarchicalFacets:"hF",highlightPostTag:"hPoT",highlightPreTag:"hPrT",hitsPerPage:"hPP",ignorePlurals:"iP",index:"idx",insideBoundingBox:"iBB",insidePolygon:"iPg",length:"l",maxValuesPerFacet:"mVPF",minimumAroundRadius:"mAR",minProximity:"mP",minWordSizefor1Typo:"mWS1T",minWordSizefor2Typos:"mWS2T",numericFilters:"nF",numericRefinements:"nR",offset:"o",optionalWords:"oW",page:"p",queryType:"qT",query:"q",removeWordsIfNoResults:"rWINR",replaceSynonymsInHighlight:"rSIH",restrictSearchableAttributes:"rSA",synonyms:"s",tagFilters:"tF",tagRefinements:"tR",typoTolerance:"tT",optionalTagFilters:"oTF",optionalFacetFilters:"oFF",snippetEllipsisText:"sET",disableExactOnAttributes:"dEOA",enableExactOnSingleWordQuery:"eEOSWQ"},s=n(a);t.exports={ENCODED_PARAMETERS:i(s),decode:function(e){return s[e]},encode:function(e){return a[e]}}},{"lodash/invert":202,"lodash/keys":221}],263:[function(e,t,r){"use strict";function n(e){return function(t,r){var n=e.hierarchicalFacets[r],a=e.hierarchicalFacetsRefinements[n.name]&&e.hierarchicalFacetsRefinements[n.name][0]||"",s=e._getHierarchicalFacetSeparator(n),o=e._getHierarchicalRootPath(n),c=e._getHierarchicalShowParentLevel(n),f=d(e._getHierarchicalFacetSortBy(n)),l=i(f,s,o,c,a),h=t;return o&&(h=t.slice(o.split(s).length)),u(h,l,{name:e.hierarchicalFacets[r].name,count:null,isRefined:!0,path:null,data:null})}}function i(e,t,r,n,i){return function(o,u,l){var d=o;if(l>0){var _=0;for(d=o;_<l;)d=d&&h(d.data,{isRefined:!0}),_++}if(d){var v=a(d.path||r,i,t,r,n);d.data=f(c(p(u.data,v),s(t,i)),e[0],e[1])}return o}}function a(e,t,r,n,i){return function(a,s){return(!n||0===s.indexOf(n)&&n!==s)&&(!n&&s.indexOf(r)===-1||n&&s.split(r).length-n.split(r).length===1||s.indexOf(r)===-1&&t.indexOf(r)===-1||0===t.indexOf(s)||0===s.indexOf(e+r)&&(i||0===s.indexOf(t)))}}function s(e,t){return function(r,n){return{name:l(o(n.split(e))),path:n,count:r,isRefined:t===n||0===t.indexOf(n+e),data:null}}}t.exports=n;var o=e("lodash/last"),c=e("lodash/map"),u=e("lodash/reduce"),f=e("lodash/orderBy"),l=e("lodash/trim"),h=e("lodash/find"),p=e("lodash/pickBy"),d=e("../functions/formatSort")},{"../functions/formatSort":266,"lodash/find":192,"lodash/last":223,"lodash/map":224,"lodash/orderBy":232,"lodash/pickBy":236,"lodash/reduce":238,"lodash/trim":248}],264:[function(e,t,r){"use strict";function n(e){var t={};return l(e,function(e,r){t[e]=r}),t}function i(e,t,r){t&&t[r]&&(e.stats=t[r])}function a(e,t){return v(e,function(e){return y(e.attributes,t)})}function s(e,t){var r=t.results[0];this.query=r.query,this.parsedQuery=r.parsedQuery,this.hits=r.hits,this.index=r.index,this.hitsPerPage=r.hitsPerPage,this.nbHits=r.nbHits,this.nbPages=r.nbPages,this.page=r.page,this.processingTimeMS=_(t.results,"processingTimeMS"),this.aroundLatLng=r.aroundLatLng,this.automaticRadius=r.automaticRadius,this.serverUsed=r.serverUsed,this.timeoutCounts=r.timeoutCounts,this.timeoutHits=r.timeoutHits,this.disjunctiveFacets=[],this.hierarchicalFacets=g(e.hierarchicalFacets,function(){return[]}),this.facets=[];var s=e.getRefinedDisjunctiveFacets(),o=n(e.facets),c=n(e.disjunctiveFacets),u=1,f=this;l(r.facets,function(t,n){var s=a(e.hierarchicalFacets,n);if(s){var u=s.attributes.indexOf(n),l=d(e.hierarchicalFacets,{name:s.name});f.hierarchicalFacets[l][u]={attribute:n,data:t,exhaustive:r.exhaustiveFacetsCount}}else{var h,_=p(e.disjunctiveFacets,n)!==-1,v=p(e.facets,n)!==-1;_&&(h=c[n],f.disjunctiveFacets[h]={name:n,data:t,exhaustive:r.exhaustiveFacetsCount},i(f.disjunctiveFacets[h],r.facets_stats,n)),v&&(h=o[n],f.facets[h]={name:n,data:t,exhaustive:r.exhaustiveFacetsCount},i(f.facets[h],r.facets_stats,n))}}),this.hierarchicalFacets=h(this.hierarchicalFacets),l(s,function(n){var a=t.results[u],s=e.getHierarchicalFacetByName(n);l(a.facets,function(t,n){var o;if(s){o=d(e.hierarchicalFacets,{name:s.name});var u=d(f.hierarchicalFacets[o],{attribute:n});if(u===-1)return;f.hierarchicalFacets[o][u].data=x({},f.hierarchicalFacets[o][u].data,t)}else{o=c[n];var h=r.facets&&r.facets[n]||{};f.disjunctiveFacets[o]={name:n,data:b({},t,h),exhaustive:a.exhaustiveFacetsCount},i(f.disjunctiveFacets[o],a.facets_stats,n),e.disjunctiveFacetsRefinements[n]&&l(e.disjunctiveFacetsRefinements[n],function(t){!f.disjunctiveFacets[o].data[t]&&p(e.disjunctiveFacetsRefinements[n],t)>-1&&(f.disjunctiveFacets[o].data[t]=0)})}}),u++}),l(e.getRefinedHierarchicalFacets(),function(r){var n=e.getHierarchicalFacetByName(r),i=e._getHierarchicalFacetSeparator(n),a=e.getHierarchicalRefinement(r);if(!(0===a.length||a[0].split(i).length<2)){var s=t.results[u];l(s.facets,function(t,r){var s=d(e.hierarchicalFacets,{name:n.name}),o=d(f.hierarchicalFacets[s],{attribute:r});if(o!==-1){var c={};if(a.length>0){var u=a[0].split(i)[0];c[u]=f.hierarchicalFacets[s][o].data[u]}f.hierarchicalFacets[s][o].data=b(c,t,f.hierarchicalFacets[s][o].data)}}),u++}}),l(e.facetsExcludes,function(e,t){var n=o[t];f.facets[n]={name:t,data:r.facets[t],exhaustive:r.exhaustiveFacetsCount},l(e,function(e){f.facets[n]=f.facets[n]||{name:t},f.facets[n].data=f.facets[n].data||{},f.facets[n].data[e]=0})}),this.hierarchicalFacets=g(this.hierarchicalFacets,A(e)),this.facets=h(this.facets),this.disjunctiveFacets=h(this.disjunctiveFacets),this._state=e}function o(e,t){var r={name:t};if(e._state.isConjunctiveFacet(t)){var n=v(e.facets,r);return n?g(n.data,function(r,n){return{name:n,count:r,isRefined:e._state.isFacetRefined(t,n)}}):[]}if(e._state.isDisjunctiveFacet(t)){var i=v(e.disjunctiveFacets,r);return i?g(i.data,function(r,n){return{name:n,count:r,isRefined:e._state.isDisjunctiveFacetRefined(t,n)}}):[]}if(e._state.isHierarchicalFacet(t))return v(e.hierarchicalFacets,r)}function c(e,t){if(!t.data||0===t.data.length)return t;var r=g(t.data,F(c,e)),n=e(r),i=x({},t,{data:n});return i}function u(e,t){return t.sort(e)}function f(e,t){var r=v(e,{name:t});return r&&r.stats}var l=e("lodash/forEach"),h=e("lodash/compact"),p=e("lodash/indexOf"),d=e("lodash/findIndex"),_=e("lodash/sumBy"),v=e("lodash/find"),y=e("lodash/includes"),g=e("lodash/map"),m=e("lodash/orderBy"),b=e("lodash/defaults"),x=e("lodash/merge"),j=e("lodash/isArray"),R=e("lodash/isFunction"),F=e("lodash/partial"),O=e("lodash/partialRight"),w=e("../functions/formatSort"),A=e("./generate-hierarchical-tree");s.prototype.getFacetByName=function(e){var t={name:e};return v(this.facets,t)||v(this.disjunctiveFacets,t)||v(this.hierarchicalFacets,t)},s.DEFAULT_SORT=["isRefined:desc","count:desc","name:asc"],s.prototype.getFacetValues=function(e,t){var r=o(this,e);if(!r)throw new Error(e+" is not a retrieved facet.");var n=b({},t,{sortBy:s.DEFAULT_SORT});if(j(n.sortBy)){var i=w(n.sortBy);return j(r)?m(r,i[0],i[1]):c(O(m,i[0],i[1]),r)}if(R(n.sortBy))return j(r)?r.sort(n.sortBy):c(F(u,n.sortBy),r);throw new Error("options.sortBy is optional but if defined it must be either an array of string (predicates) or a sorting function")},s.prototype.getFacetStats=function(e){if(this._state.isConjunctiveFacet(e))return f(this.facets,e);if(this._state.isDisjunctiveFacet(e))return f(this.disjunctiveFacets,e);throw new Error(e+" is not present in `facets` or `disjunctiveFacets`")},t.exports=s},{"../functions/formatSort":266,"./generate-hierarchical-tree":263,"lodash/compact":187,"lodash/defaults":189,"lodash/find":192,"lodash/findIndex":193,"lodash/forEach":194,"lodash/includes":199,"lodash/indexOf":200,"lodash/isArray":204,"lodash/isFunction":210,"lodash/map":224,"lodash/merge":228,"lodash/orderBy":232,"lodash/partial":233,"lodash/partialRight":234,"lodash/sumBy":242}],265:[function(e,t,r){"use strict";function n(e,t,r){this.client=e;var n=r||{};n.index=t,this.state=s.make(n),this.lastResults=null,this._queryId=0,this._lastQueryIdReceived=-1}function i(e){if(e<0)throw new Error("Page requested below 0.");return this.state=this.state.setPage(e),this._change(),this}function a(){return this.state.page}var s=e("./SearchParameters"),o=e("./SearchResults"),c=e("./requestBuilder"),u=e("util"),f=e("events"),l=e("lodash/forEach"),h=e("lodash/map"),p=e("lodash/bind"),d=e("lodash/isEmpty"),_=e("lodash/trim"),v=e("./url");u.inherits(n,f.EventEmitter),n.prototype.search=function(){return this._search(),this},n.prototype.searchOnce=function(e,t){var r=this.state.setQueryParameters(e),n=c._getQueries(r.index,r);return t?this.client.search(n,function(e,n){t(e,new o(r,n),r)}):this.client.search(n).then(function(e){return{content:new o(r,e),state:r}})},n.prototype.setQuery=function(e){return this.state=this.state.setQuery(e),this._change(),this},n.prototype.clearRefinements=function(e){return this.state=this.state.clearRefinements(e),this._change(),this},n.prototype.clearTags=function(){return this.state=this.state.clearTags(),this._change(),this},n.prototype.addDisjunctiveFacetRefinement=function(e,t){return this.state=this.state.addDisjunctiveFacetRefinement(e,t),this._change(),this},n.prototype.addDisjunctiveRefine=function(){return this.addDisjunctiveFacetRefinement.apply(this,arguments)},n.prototype.addNumericRefinement=function(e,t,r){return this.state=this.state.addNumericRefinement(e,t,r),this._change(),this},n.prototype.addFacetRefinement=function(e,t){return this.state=this.state.addFacetRefinement(e,t),this._change(),this},n.prototype.addRefine=function(){return this.addFacetRefinement.apply(this,arguments)},n.prototype.addFacetExclusion=function(e,t){return this.state=this.state.addExcludeRefinement(e,t),this._change(),this},n.prototype.addExclude=function(){return this.addFacetExclusion.apply(this,arguments)},n.prototype.addTag=function(e){return this.state=this.state.addTagRefinement(e),this._change(),this},n.prototype.removeNumericRefinement=function(e,t,r){return this.state=this.state.removeNumericRefinement(e,t,r),this._change(),this},n.prototype.removeDisjunctiveFacetRefinement=function(e,t){return this.state=this.state.removeDisjunctiveFacetRefinement(e,t),this._change(),this},n.prototype.removeDisjunctiveRefine=function(){return this.removeDisjunctiveFacetRefinement.apply(this,arguments)},n.prototype.removeFacetRefinement=function(e,t){return this.state=this.state.removeFacetRefinement(e,t),this._change(),this},n.prototype.removeRefine=function(){return this.removeFacetRefinement.apply(this,arguments)},n.prototype.removeFacetExclusion=function(e,t){return this.state=this.state.removeExcludeRefinement(e,t),this._change(),this},n.prototype.removeExclude=function(){return this.removeFacetExclusion.apply(this,arguments)},n.prototype.removeTag=function(e){return this.state=this.state.removeTagRefinement(e),this._change(),this},n.prototype.toggleFacetExclusion=function(e,t){return this.state=this.state.toggleExcludeFacetRefinement(e,t),this._change(),this},n.prototype.toggleExclude=function(){return this.toggleFacetExclusion.apply(this,arguments)},n.prototype.toggleRefinement=function(e,t){return this.state=this.state.toggleRefinement(e,t),this._change(),this},n.prototype.toggleRefine=function(){return this.toggleRefinement.apply(this,arguments)},n.prototype.toggleTag=function(e){return this.state=this.state.toggleTagRefinement(e),this._change(),this},n.prototype.nextPage=function(){return this.setPage(this.state.page+1)},n.prototype.previousPage=function(){return this.setPage(this.state.page-1)},n.prototype.setCurrentPage=i,n.prototype.setPage=i,n.prototype.setIndex=function(e){return this.state=this.state.setIndex(e),this._change(),this},n.prototype.setQueryParameter=function(e,t){var r=this.state.setQueryParameter(e,t);return this.state===r?this:(this.state=r,this._change(),this)},n.prototype.setState=function(e){return this.state=new s(e),this._change(),this},n.prototype.getState=function(e){return void 0===e?this.state:this.state.filter(e)},n.prototype.getStateAsQueryString=function(e){var t=e&&e.filters||["query","attribute:*"],r=this.getState(t);return v.getQueryStringFromState(r,e)},n.getConfigurationFromQueryString=v.getStateFromQueryString,n.getForeignConfigurationInQueryString=v.getUnrecognizedParametersInQueryString,n.prototype.setStateFromQueryString=function(e,t){var r=t&&t.triggerChange||!1,n=v.getStateFromQueryString(e,t),i=this.state.setQueryParameters(n);r?this.setState(i):this.overrideStateWithoutTriggeringChangeEvent(i)},n.prototype.overrideStateWithoutTriggeringChangeEvent=function(e){return this.state=new s(e),this},n.prototype.isRefined=function(e,t){if(this.state.isConjunctiveFacet(e))return this.state.isFacetRefined(e,t);if(this.state.isDisjunctiveFacet(e))return this.state.isDisjunctiveFacetRefined(e,t);throw new Error(e+" is not properly defined in this helper configuration(use the facets or disjunctiveFacets keys to configure it)")},n.prototype.hasRefinements=function(e){return!d(this.state.getNumericRefinements(e))||(this.state.isConjunctiveFacet(e)?this.state.isFacetRefined(e):this.state.isDisjunctiveFacet(e)?this.state.isDisjunctiveFacetRefined(e):!!this.state.isHierarchicalFacet(e)&&this.state.isHierarchicalFacetRefined(e))},n.prototype.isExcluded=function(e,t){return this.state.isExcludeRefined(e,t)},n.prototype.isDisjunctiveRefined=function(e,t){return this.state.isDisjunctiveFacetRefined(e,t)},n.prototype.hasTag=function(e){return this.state.isTagRefined(e)},n.prototype.isTagRefined=function(){return this.hasTagRefinements.apply(this,arguments)},n.prototype.getIndex=function(){return this.state.index},n.prototype.getCurrentPage=a,n.prototype.getPage=a,n.prototype.getTags=function(){return this.state.tagRefinements},n.prototype.getQueryParameter=function(e){return this.state.getQueryParameter(e)},n.prototype.getRefinements=function(e){var t=[];if(this.state.isConjunctiveFacet(e)){var r=this.state.getConjunctiveRefinements(e);l(r,function(e){t.push({value:e,type:"conjunctive"})});var n=this.state.getExcludeRefinements(e);l(n,function(e){t.push({value:e,type:"exclude"})})}else if(this.state.isDisjunctiveFacet(e)){var i=this.state.getDisjunctiveRefinements(e);l(i,function(e){t.push({value:e,type:"disjunctive"})})}var a=this.state.getNumericRefinements(e);return l(a,function(e,r){t.push({value:e,operator:r,type:"numeric"})}),t},n.prototype.getNumericRefinement=function(e,t){return this.state.getNumericRefinement(e,t)},n.prototype.getHierarchicalFacetBreadcrumb=function(e){return h(this.state.getHierarchicalRefinement(e)[0].split(this.state._getHierarchicalFacetSeparator(this.state.getHierarchicalFacetByName(e))),function(e){return _(e)})},n.prototype._search=function(){var e=this.state,t=c._getQueries(e.index,e);this.emit("search",e,this.lastResults),this.client.search(t,p(this._handleResponse,this,e,this._queryId++))},n.prototype._handleResponse=function(e,t,r,n){if(!(t<this._lastQueryIdReceived)){if(this._lastQueryIdReceived=t,r)return void this.emit("error",r);var i=this.lastResults=new o(e,n);this.emit("result",i,e)}},n.prototype.containsRefinement=function(e,t,r,n){return e||0!==t.length||0!==r.length||0!==n.length},n.prototype._hasDisjunctiveRefinements=function(e){return this.state.disjunctiveRefinements[e]&&this.state.disjunctiveRefinements[e].length>0},n.prototype._change=function(){this.emit("change",this.state,this.lastResults)},t.exports=n},{"./SearchParameters":261,"./SearchResults":264,"./requestBuilder":269,"./url":270,events:2,"lodash/bind":186,"lodash/forEach":194,"lodash/isEmpty":208,"lodash/map":224,"lodash/trim":248,util:258}],266:[function(e,t,r){"use strict";var n=e("lodash/reduce");t.exports=function(e){return n(e,function(e,t){var r=t.split(":");return e[0].push(r[0]),e[1].push(r[1]),e},[[],[]])}},{"lodash/reduce":238}],267:[function(e,t,r){"use strict";function n(e){if(s(e))return e;if(o(e))return parseFloat(e);if(a(e))return i(e,n);throw new Error("The value should be a number, a parseable string or an array of those.")}var i=e("lodash/map"),a=e("lodash/isArray"),s=e("lodash/isNumber"),o=e("lodash/isString");t.exports=n},{"lodash/isArray":204,"lodash/isNumber":213,"lodash/isString":217,"lodash/map":224}],268:[function(e,t,r){"use strict";var n=e("lodash/bind");try{var i;i="undefined"!=typeof window?window.console&&n(window.console.warn,console):n(console.warn,console);var a=function(e){var t=[];return function(r){t.indexOf(r)===-1&&(e(r),t.push(r))}}(i);t.exports=a}catch(e){t.exports=function(){}}},{"lodash/bind":186}],269:[function(e,t,r){"use strict";var n=e("lodash/forEach"),i=e("lodash/map"),a=e("lodash/reduce"),s=e("lodash/merge"),o=e("lodash/isArray"),c={_getQueries:function(e,t){var r=[];return r.push({indexName:e,params:c._getHitsSearchParams(t)}),n(t.getRefinedDisjunctiveFacets(),function(n){r.push({indexName:e,params:c._getDisjunctiveFacetSearchParams(t,n)})}),n(t.getRefinedHierarchicalFacets(),function(n){var i=t.getHierarchicalFacetByName(n),a=t.getHierarchicalRefinement(n),s=t._getHierarchicalFacetSeparator(i);a.length>0&&a[0].split(s).length>1&&r.push({indexName:e,params:c._getDisjunctiveFacetSearchParams(t,n,!0)})}),r},_getHitsSearchParams:function(e){var t=e.facets.concat(e.disjunctiveFacets).concat(c._getHitsHierarchicalFacetsAttributes(e)),r=c._getFacetFilters(e),n=c._getNumericFilters(e),i=c._getTagFilters(e),a={facets:t,tagFilters:i};return r.length>0&&(a.facetFilters=r),n.length>0&&(a.numericFilters=n),s(e.getQueryParams(),a)},_getDisjunctiveFacetSearchParams:function(e,t,r){var n=c._getFacetFilters(e,t,r),i=c._getNumericFilters(e,t),a=c._getTagFilters(e),o={hitsPerPage:1,page:0,attributesToRetrieve:[],attributesToHighlight:[],attributesToSnippet:[],tagFilters:a},u=e.getHierarchicalFacetByName(t);return u?o.facets=c._getDisjunctiveHierarchicalFacetAttribute(e,u,r):o.facets=t,i.length>0&&(o.numericFilters=i),n.length>0&&(o.facetFilters=n),s(e.getQueryParams(),o)},_getNumericFilters:function(e,t){if(e.numericFilters)return e.numericFilters;var r=[];return n(e.numericRefinements,function(e,a){n(e,function(e,s){t!==a&&n(e,function(e){if(o(e)){var t=i(e,function(e){return a+s+e});r.push(t)}else r.push(a+s+e)})})}),r},_getTagFilters:function(e){return e.tagFilters?e.tagFilters:e.tagRefinements.join(",")},_getFacetFilters:function(e,t,r){var i=[];return n(e.facetsRefinements,function(e,t){n(e,function(e){i.push(t+":"+e)})}),n(e.facetsExcludes,function(e,t){n(e,function(e){i.push(t+":-"+e)})}),n(e.disjunctiveFacetsRefinements,function(e,r){if(r!==t&&e&&0!==e.length){var a=[];n(e,function(e){a.push(r+":"+e)}),i.push(a)}}),n(e.hierarchicalFacetsRefinements,function(n,a){var s=n[0];if(void 0!==s){var o,c,u=e.getHierarchicalFacetByName(a),f=e._getHierarchicalFacetSeparator(u),l=e._getHierarchicalRootPath(u);if(t===a){if(s.indexOf(f)===-1||!l&&r===!0||l&&l.split(f).length===s.split(f).length)return;l?(c=l.split(f).length-1,s=l):(c=s.split(f).length-2,s=s.slice(0,s.lastIndexOf(f))),o=u.attributes[c]}else c=s.split(f).length-1,o=u.attributes[c];o&&i.push([o+":"+s])}}),i},_getHitsHierarchicalFacetsAttributes:function(e){var t=[];return a(e.hierarchicalFacets,function(t,r){var n=e.getHierarchicalRefinement(r.name)[0];if(!n)return t.push(r.attributes[0]),t;var i=e._getHierarchicalFacetSeparator(r),a=n.split(i).length,s=r.attributes.slice(0,a+1);return t.concat(s)},t)},_getDisjunctiveHierarchicalFacetAttribute:function(e,t,r){var n=e._getHierarchicalFacetSeparator(t);if(r===!0){var i=e._getHierarchicalRootPath(t),a=0;return i&&(a=i.split(n).length),[t.attributes[a]]}var s=e.getHierarchicalRefinement(t.name)[0]||"",o=s.split(n).length-1;return t.attributes.slice(0,o+1)}};t.exports=c},{"lodash/forEach":194,"lodash/isArray":204,"lodash/map":224,"lodash/merge":228,"lodash/reduce":238}],270:[function(e,t,r){"use strict";function n(e){return _(e)?p(e,n):v(e)?l(e,n):d(e)?g(e):e}function i(e,t,r,n){if(null!==e&&(r=r.replace(e,""),n=n.replace(e,"")),r=t[r]||r,n=t[n]||n,b.indexOf(r)!==-1||b.indexOf(n)!==-1){if("q"===r)return-1;if("q"===n)return 1;var i=m.indexOf(r)!==-1,a=m.indexOf(n)!==-1;if(i&&!a)return 1;if(a&&!i)return-1}return r.localeCompare(n)}var a=e("./SearchParameters/shortener"),s=e("./SearchParameters"),o=e("qs"),c=e("lodash/bind"),u=e("lodash/forEach"),f=e("lodash/pick"),l=e("lodash/map"),h=e("lodash/mapKeys"),p=e("lodash/mapValues"),d=e("lodash/isString"),_=e("lodash/isPlainObject"),v=e("lodash/isArray"),y=e("lodash/invert"),g=e("qs/lib/utils").encode,m=["dFR","fR","nR","hFR","tR"],b=a.ENCODED_PARAMETERS;r.getStateFromQueryString=function(e,t){var r=t&&t.prefix||"",n=t&&t.mapping||{},i=y(n),c=o.parse(e),u=new RegExp("^"+r),l=h(c,function(e,t){var n=r&&u.test(t),s=n?t.replace(u,""):t,o=a.decode(i[s]||s);return o||s}),p=s._parseNumbers(l);return f(p,s.PARAMETERS)},r.getUnrecognizedParametersInQueryString=function(e,t){var r=t&&t.prefix,n=t&&t.mapping||{},i=y(n),s={},c=o.parse(e);if(r){var f=new RegExp("^"+r);u(c,function(e,t){f.test(t)||(s[t]=e)})}else u(c,function(e,t){a.decode(i[t]||t)||(s[t]=e)});return s},r.getQueryStringFromState=function(e,t){var r=t&&t.moreAttributes,s=t&&t.prefix||"",u=t&&t.mapping||{},f=t&&t.safe||!1,l=y(u),p=f?e:n(e),d=h(p,function(e,t){var r=a.encode(t);return s+(u[r]||r)}),_=""===s?null:new RegExp("^"+s),v=c(i,null,_,l);if(r){var g=o.stringify(d,{encode:f,sort:v}),m=o.stringify(r,{encode:f});return g?g+"&"+m:m}return o.stringify(d,{encode:f,sort:v})}},{"./SearchParameters":261,"./SearchParameters/shortener":262,"lodash/bind":186,"lodash/forEach":194,"lodash/invert":202,"lodash/isArray":204,"lodash/isPlainObject":216,"lodash/isString":217,"lodash/map":224,"lodash/mapKeys":225,"lodash/mapValues":226,"lodash/pick":235,qs:252,"qs/lib/utils":255}],271:[function(e,t,r){"use strict";t.exports="2.12.0"},{}]},{},[1])(1)});

/*! algoliasearch 3.18.0 | © 2014, 2015 Algolia SAS | github.com/algolia/algoliasearch-client-js */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.algoliasearch=e()}}(function(){var e;return function t(e,o,n){function r(s,a){if(!o[s]){if(!e[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(i)return i(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var l=o[s]={exports:{}};e[s][0].call(l.exports,function(t){var o=e[s][1][t];return r(o?o:t)},l,l.exports,t,e,o,n)}return o[s].exports}for(var i="function"==typeof require&&require,s=0;s<n.length;s++)r(n[s]);return r}({1:[function(e,t,o){function n(e){if(e=""+e,!(e.length>1e4)){var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(t){var o=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return o*p;case"days":case"day":case"d":return o*l;case"hours":case"hour":case"hrs":case"hr":case"h":return o*c;case"minutes":case"minute":case"mins":case"min":case"m":return o*u;case"seconds":case"second":case"secs":case"sec":case"s":return o*a;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return o}}}}function r(e){return e>=l?Math.round(e/l)+"d":e>=c?Math.round(e/c)+"h":e>=u?Math.round(e/u)+"m":e>=a?Math.round(e/a)+"s":e+"ms"}function i(e){return s(e,l,"day")||s(e,c,"hour")||s(e,u,"minute")||s(e,a,"second")||e+" ms"}function s(e,t,o){if(!(e<t))return e<1.5*t?Math.floor(e/t)+" "+o:Math.ceil(e/t)+" "+o+"s"}var a=1e3,u=60*a,c=60*u,l=24*c,p=365.25*l;t.exports=function(e,t){return t=t||{},"string"==typeof e?n(e):t["long"]?i(e):r(e)}},{}],2:[function(e,t,o){function n(){f&&l&&(f=!1,l.length?p=l.concat(p):h=-1,p.length&&r())}function r(){if(!f){var e=a(n);f=!0;for(var t=p.length;t;){for(l=p,p=[];++h<t;)l&&l[h].run();h=-1,t=p.length}l=null,f=!1,u(e)}}function i(e,t){this.fun=e,this.array=t}function s(){}var a,u,c=t.exports={};!function(){try{a=setTimeout}catch(e){a=function(){throw new Error("setTimeout is not defined")}}try{u=clearTimeout}catch(e){u=function(){throw new Error("clearTimeout is not defined")}}}();var l,p=[],f=!1,h=-1;c.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var o=1;o<arguments.length;o++)t[o-1]=arguments[o];p.push(new i(e,t)),1!==p.length||f||a(r,0)},i.prototype.run=function(){this.fun.apply(null,this.array)},c.title="browser",c.browser=!0,c.env={},c.argv=[],c.version="",c.versions={},c.on=s,c.addListener=s,c.once=s,c.off=s,c.removeListener=s,c.removeAllListeners=s,c.emit=s,c.binding=function(e){throw new Error("process.binding is not supported")},c.cwd=function(){return"/"},c.chdir=function(e){throw new Error("process.chdir is not supported")},c.umask=function(){return 0}},{}],3:[function(e,t,o){function n(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function r(){var e=arguments,t=this.useColors;if(e[0]=(t?"%c":"")+this.namespace+(t?" %c":" ")+e[0]+(t?"%c ":" ")+"+"+o.humanize(this.diff),!t)return e;var n="color: "+this.color;e=[e[0],n,"color: inherit"].concat(Array.prototype.slice.call(e,1));var r=0,i=0;return e[0].replace(/%[a-z%]/g,function(e){"%%"!==e&&(r++,"%c"===e&&(i=r))}),e.splice(i,0,n),e}function i(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function s(e){try{null==e?o.storage.removeItem("debug"):o.storage.debug=e}catch(t){}}function a(){var e;try{e=o.storage.debug}catch(t){}return e}function u(){try{return window.localStorage}catch(e){}}o=t.exports=e(4),o.log=i,o.formatArgs=r,o.save=s,o.load=a,o.useColors=n,o.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:u(),o.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],o.formatters.j=function(e){return JSON.stringify(e)},o.enable(a())},{4:4}],4:[function(e,t,o){function n(){return o.colors[l++%o.colors.length]}function r(e){function t(){}function r(){var e=r,t=+new Date,i=t-(c||t);e.diff=i,e.prev=c,e.curr=t,c=t,null==e.useColors&&(e.useColors=o.useColors()),null==e.color&&e.useColors&&(e.color=n());var s=Array.prototype.slice.call(arguments);s[0]=o.coerce(s[0]),"string"!=typeof s[0]&&(s=["%o"].concat(s));var a=0;s[0]=s[0].replace(/%([a-z%])/g,function(t,n){if("%%"===t)return t;a++;var r=o.formatters[n];if("function"==typeof r){var i=s[a];t=r.call(e,i),s.splice(a,1),a--}return t}),"function"==typeof o.formatArgs&&(s=o.formatArgs.apply(e,s));var u=r.log||o.log||console.log.bind(console);u.apply(e,s)}t.enabled=!1,r.enabled=!0;var i=o.enabled(e)?r:t;return i.namespace=e,i}function i(e){o.save(e);for(var t=(e||"").split(/[\s,]+/),n=t.length,r=0;r<n;r++)t[r]&&(e=t[r].replace(/\*/g,".*?"),"-"===e[0]?o.skips.push(new RegExp("^"+e.substr(1)+"$")):o.names.push(new RegExp("^"+e+"$")))}function s(){o.enable("")}function a(e){var t,n;for(t=0,n=o.skips.length;t<n;t++)if(o.skips[t].test(e))return!1;for(t=0,n=o.names.length;t<n;t++)if(o.names[t].test(e))return!0;return!1}function u(e){return e instanceof Error?e.stack||e.message:e}o=t.exports=r,o.coerce=u,o.disable=s,o.enable=i,o.enabled=a,o.humanize=e(1),o.names=[],o.skips=[],o.formatters={};var c,l=0},{1:1}],5:[function(t,o,n){(function(n,r){(function(){"use strict";function i(e){return"function"==typeof e||"object"==typeof e&&null!==e}function s(e){return"function"==typeof e}function a(e){V=e}function u(e){Z=e}function c(){return function(){n.nextTick(d)}}function l(){return function(){z(d)}}function p(){var e=0,t=new oe(d),o=document.createTextNode("");return t.observe(o,{characterData:!0}),function(){o.data=e=++e%2}}function f(){var e=new MessageChannel;return e.port1.onmessage=d,function(){e.port2.postMessage(0)}}function h(){return function(){setTimeout(d,1)}}function d(){for(var e=0;e<W;e+=2){var t=ie[e],o=ie[e+1];t(o),ie[e]=void 0,ie[e+1]=void 0}W=0}function y(){try{var e=t,o=e("vertx");return z=o.runOnLoop||o.runOnContext,l()}catch(n){return h()}}function m(e,t){var o=this,n=new this.constructor(g);void 0===n[ue]&&J(n);var r=o._state;if(r){var i=arguments[r-1];Z(function(){I(r,n,i,o._result)})}else C(o,n,e,t);return n}function v(e){var t=this;if(e&&"object"==typeof e&&e.constructor===t)return e;var o=new t(g);return O(o,e),o}function g(){}function b(){return new TypeError("You cannot resolve a promise with itself")}function w(){return new TypeError("A promises callback cannot return that same promise.")}function _(e){try{return e.then}catch(t){return fe.error=t,fe}}function x(e,t,o,n){try{e.call(t,o,n)}catch(r){return r}}function S(e,t,o){Z(function(e){var n=!1,r=x(o,t,function(o){n||(n=!0,t!==o?O(e,o):A(e,o))},function(t){n||(n=!0,q(e,t))},"Settle: "+(e._label||" unknown promise"));!n&&r&&(n=!0,q(e,r))},e)}function T(e,t){t._state===le?A(e,t._result):t._state===pe?q(e,t._result):C(t,void 0,function(t){O(e,t)},function(t){q(e,t)})}function j(e,t,o){t.constructor===e.constructor&&o===se&&constructor.resolve===ae?T(e,t):o===fe?q(e,fe.error):void 0===o?A(e,t):s(o)?S(e,t,o):A(e,t)}function O(e,t){e===t?q(e,b()):i(t)?j(e,t,_(t)):A(e,t)}function k(e){e._onerror&&e._onerror(e._result),E(e)}function A(e,t){e._state===ce&&(e._result=t,e._state=le,0!==e._subscribers.length&&Z(E,e))}function q(e,t){e._state===ce&&(e._state=pe,e._result=t,Z(k,e))}function C(e,t,o,n){var r=e._subscribers,i=r.length;e._onerror=null,r[i]=t,r[i+le]=o,r[i+pe]=n,0===i&&e._state&&Z(E,e)}function E(e){var t=e._subscribers,o=e._state;if(0!==t.length){for(var n,r,i=e._result,s=0;s<t.length;s+=3)n=t[s],r=t[s+o],n?I(o,n,r,i):r(i);e._subscribers.length=0}}function R(){this.error=null}function N(e,t){try{return e(t)}catch(o){return he.error=o,he}}function I(e,t,o,n){var r,i,a,u,c=s(o);if(c){if(r=N(o,n),r===he?(u=!0,i=r.error,r=null):a=!0,t===r)return void q(t,w())}else r=n,a=!0;t._state!==ce||(c&&a?O(t,r):u?q(t,i):e===le?A(t,r):e===pe&&q(t,r))}function P(e,t){try{t(function(t){O(e,t)},function(t){q(e,t)})}catch(o){q(e,o)}}function U(){return de++}function J(e){e[ue]=de++,e._state=void 0,e._result=void 0,e._subscribers=[]}function D(e){return new be(this,e).promise}function M(e){var t=this;return new t(Q(e)?function(o,n){for(var r=e.length,i=0;i<r;i++)t.resolve(e[i]).then(o,n)}:function(e,t){t(new TypeError("You must pass an array to race."))})}function H(e){var t=this,o=new t(g);return q(o,e),o}function L(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function F(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function X(e){this[ue]=U(),this._result=this._state=void 0,this._subscribers=[],g!==e&&("function"!=typeof e&&L(),this instanceof X?P(this,e):F())}function B(e,t){this._instanceConstructor=e,this.promise=new e(g),this.promise[ue]||J(this.promise),Q(t)?(this._input=t,this.length=t.length,this._remaining=t.length,this._result=new Array(this.length),0===this.length?A(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&A(this.promise,this._result))):q(this.promise,K())}function K(){return new Error("Array Methods must be provided an Array")}function G(){var e;if("undefined"!=typeof r)e=r;else if("undefined"!=typeof self)e=self;else try{e=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var o=e.Promise;o&&"[object Promise]"===Object.prototype.toString.call(o.resolve())&&!o.cast||(e.Promise=ge)}var $;$=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)};var z,V,Y,Q=$,W=0,Z=function(e,t){ie[W]=e,ie[W+1]=t,W+=2,2===W&&(V?V(d):Y())},ee="undefined"!=typeof window?window:void 0,te=ee||{},oe=te.MutationObserver||te.WebKitMutationObserver,ne="undefined"==typeof self&&"undefined"!=typeof n&&"[object process]"==={}.toString.call(n),re="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,ie=new Array(1e3);Y=ne?c():oe?p():re?f():void 0===ee&&"function"==typeof t?y():h();var se=m,ae=v,ue=Math.random().toString(36).substring(16),ce=void 0,le=1,pe=2,fe=new R,he=new R,de=0,ye=D,me=M,ve=H,ge=X;X.all=ye,X.race=me,X.resolve=ae,X.reject=ve,X._setScheduler=a,X._setAsap=u,X._asap=Z,X.prototype={constructor:X,then:se,"catch":function(e){return this.then(null,e)}};var be=B;B.prototype._enumerate=function(){for(var e=this.length,t=this._input,o=0;this._state===ce&&o<e;o++)this._eachEntry(t[o],o)},B.prototype._eachEntry=function(e,t){var o=this._instanceConstructor,n=o.resolve;if(n===ae){var r=_(e);if(r===se&&e._state!==ce)this._settledAt(e._state,t,e._result);else if("function"!=typeof r)this._remaining--,this._result[t]=e;else if(o===ge){var i=new o(g);j(i,e,r),this._willSettleAt(i,t)}else this._willSettleAt(new o(function(t){t(e)}),t)}else this._willSettleAt(n(e),t)},B.prototype._settledAt=function(e,t,o){var n=this.promise;n._state===ce&&(this._remaining--,e===pe?q(n,o):this._result[t]=o),0===this._remaining&&A(n,this._result)},B.prototype._willSettleAt=function(e,t){var o=this;C(e,void 0,function(e){o._settledAt(le,t,e)},function(e){o._settledAt(pe,t,e)})};var we=G,_e={Promise:ge,polyfill:we};"function"==typeof e&&e.amd?e(function(){return _e}):"undefined"!=typeof o&&o.exports?o.exports=_e:"undefined"!=typeof this&&(this.ES6Promise=_e),we()}).call(this)}).call(this,t(2),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{2:2}],6:[function(e,t,o){var n=Object.prototype.hasOwnProperty,r=Object.prototype.toString;t.exports=function(e,t,o){if("[object Function]"!==r.call(t))throw new TypeError("iterator must be a function");var i=e.length;if(i===+i)for(var s=0;s<i;s++)t.call(o,e[s],s,e);else for(var a in e)n.call(e,a)&&t.call(o,e[a],a,e)}},{}],7:[function(e,t,o){(function(e){"undefined"!=typeof window?t.exports=window:"undefined"!=typeof e?t.exports=e:"undefined"!=typeof self?t.exports=self:t.exports={}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],8:[function(e,t,o){"function"==typeof Object.create?t.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(e,t){e.super_=t;var o=function(){};o.prototype=t.prototype,e.prototype=new o,e.prototype.constructor=e}},{}],9:[function(e,t,o){var n={}.toString;t.exports=Array.isArray||function(e){return"[object Array]"==n.call(e)}},{}],10:[function(e,t,o){"use strict";function n(e,t){if(e.map)return e.map(t);for(var o=[],n=0;n<e.length;n++)o.push(t(e[n],n));return o}var r=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};t.exports=function(e,t,o,a){return t=t||"&",o=o||"=",null===e&&(e=void 0),"object"==typeof e?n(s(e),function(s){var a=encodeURIComponent(r(s))+o;return i(e[s])?n(e[s],function(e){return a+encodeURIComponent(r(e))}).join(t):a+encodeURIComponent(r(e[s]))}).join(t):a?encodeURIComponent(r(a))+o+encodeURIComponent(r(e)):""};var i=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},s=Object.keys||function(e){var t=[];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.push(o);return t}},{}],11:[function(e,t,o){function n(t,o,n){var i=e(3)("algoliasearch"),a=e(19),c=e(9),l=e(22),p="Usage: algoliasearch(applicationID, apiKey, opts)";if(n._allowEmptyCredentials!==!0&&!t)throw new u.AlgoliaSearchError("Please provide an application ID. "+p);if(n._allowEmptyCredentials!==!0&&!o)throw new u.AlgoliaSearchError("Please provide an API key. "+p);this.applicationID=t,this.apiKey=o;var f=s([this.applicationID+"-1.algolianet.com",this.applicationID+"-2.algolianet.com",this.applicationID+"-3.algolianet.com"]);this.hosts={read:[],write:[]},this.hostIndex={read:0,write:0},n=n||{};var h=n.protocol||"https:",d=void 0===n.timeout?2e3:n.timeout;if(/:$/.test(h)||(h+=":"),"http:"!==n.protocol&&"https:"!==n.protocol)throw new u.AlgoliaSearchError("protocol must be `http:` or `https:` (was `"+n.protocol+"`)");n.hosts?c(n.hosts)?(this.hosts.read=a(n.hosts),this.hosts.write=a(n.hosts)):(this.hosts.read=a(n.hosts.read),this.hosts.write=a(n.hosts.write)):(this.hosts.read=[this.applicationID+"-dsn.algolia.net"].concat(f),this.hosts.write=[this.applicationID+".algolia.net"].concat(f)),this.hosts.read=l(this.hosts.read,r(h)),this.hosts.write=l(this.hosts.write,r(h)),this.requestTimeout=d,this.extraHeaders=[],this.cache=n._cache||{},this._ua=n._ua,this._useCache=!(void 0!==n._useCache&&!n._cache)||n._useCache,this._useFallback=void 0===n.useFallback||n.useFallback,this._setTimeout=n._setTimeout,i("init done, %j",this)}function r(e){return function(t){return e+"//"+t.toLowerCase()}}function i(e){if(void 0===Array.prototype.toJSON)return JSON.stringify(e);var t=Array.prototype.toJSON;delete Array.prototype.toJSON;var o=JSON.stringify(e);return Array.prototype.toJSON=t,o}function s(e){for(var t,o,n=e.length;0!==n;)o=Math.floor(Math.random()*n),n-=1,t=e[n],e[n]=e[o],e[o]=t;return e}function a(e){var t={};for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var n;n="x-algolia-api-key"===o||"x-algolia-application-id"===o?"**hidden for security purposes**":e[o],t[o]=n}return t}t.exports=n;var u=e(20),c=e(21),l=e(12),p=500;n.prototype.initIndex=function(e){return new l(this,e)},n.prototype.setExtraHeader=function(e,t){this.extraHeaders.push({name:e.toLowerCase(),value:t})},n.prototype.addAlgoliaAgent=function(e){this._ua+=";"+e},n.prototype._jsonRequest=function(t){function o(e,c){function p(e){var t=e&&e.body&&e.body.message&&e.body.status||e.statusCode||e&&e.body&&200;s("received response: statusCode: %s, computed statusCode: %d, headers: %j",e.statusCode,t,e.headers);var o=2===Math.floor(t/100),i=new Date;if(m.push({currentHost:x,headers:a(r),content:n||null,contentLength:void 0!==n?n.length:null,method:c.method,timeout:c.timeout,url:c.url,startTime:_,endTime:i,duration:i-_,statusCode:t}),o)return f._useCache&&l&&(l[w]=e.responseText),e.body;var p=4!==Math.floor(t/100);if(p)return h+=1,g();s("unrecoverable error");var d=new u.AlgoliaSearchError(e.body&&e.body.message,{debugData:m,statusCode:t});return f._promise.reject(d)}function v(e){s("error: %s, stack: %s",e.message,e.stack);var o=new Date;return m.push({currentHost:x,headers:a(r),content:n||null,contentLength:void 0!==n?n.length:null,method:c.method,timeout:c.timeout,url:c.url,startTime:_,endTime:o,duration:o-_}),e instanceof u.AlgoliaSearchError||(e=new u.Unknown(e&&e.message,e)),h+=1,e instanceof u.Unknown||e instanceof u.UnparsableJSON||h>=f.hosts[t.hostType].length&&(d||!y)?(e.debugData=m,f._promise.reject(e)):e instanceof u.RequestTimeout?b():g()}function g(){return s("retrying request"),f.hostIndex[t.hostType]=(f.hostIndex[t.hostType]+1)%f.hosts[t.hostType].length,o(e,c)}function b(){return s("retrying request with higher timeout"),f.hostIndex[t.hostType]=(f.hostIndex[t.hostType]+1)%f.hosts[t.hostType].length,c.timeout=f.requestTimeout*(h+1),o(e,c)}var w,_=new Date;if(f._useCache&&(w=t.url),f._useCache&&n&&(w+="_body_"+c.body),f._useCache&&l&&void 0!==l[w])return s("serving response from cache"),f._promise.resolve(JSON.parse(l[w]));if(h>=f.hosts[t.hostType].length)return!y||d?(s("could not get any response"),f._promise.reject(new u.AlgoliaSearchError("Cannot connect to the AlgoliaSearch API. Send an email to support@algolia.com to report and resolve the issue. Application id was: "+f.applicationID,{debugData:m}))):(s("switching to fallback"),h=0,c.method=t.fallback.method,c.url=t.fallback.url,c.jsonBody=t.fallback.body,c.jsonBody&&(c.body=i(c.jsonBody)),r=f._computeRequestHeaders(),c.timeout=f.requestTimeout*(h+1),f.hostIndex[t.hostType]=0,d=!0,o(f._request.fallback,c));var x=f.hosts[t.hostType][f.hostIndex[t.hostType]],S=x+c.url,T={body:c.body,jsonBody:c.jsonBody,method:c.method,headers:r,timeout:c.timeout,debug:s};return s("method: %s, url: %s, headers: %j, timeout: %d",T.method,S,T.headers,T.timeout),e===f._request.fallback&&s("using fallback"),e.call(f,S,T).then(p,v)}var n,r,s=e(3)("algoliasearch:"+t.url),l=t.cache,f=this,h=0,d=!1,y=f._useFallback&&f._request.fallback&&t.fallback;this.apiKey.length>p&&void 0!==t.body&&void 0!==t.body.params?(t.body.apiKey=this.apiKey,r=this._computeRequestHeaders(!1)):r=this._computeRequestHeaders(),void 0!==t.body&&(n=i(t.body)),s("request start");var m=[],v=o(f._request,{url:t.url,method:t.method,body:n,jsonBody:t.body,timeout:f.requestTimeout*(h+1)});return t.callback?void v.then(function(e){c(function(){t.callback(null,e)},f._setTimeout||setTimeout)},function(e){c(function(){t.callback(e)},f._setTimeout||setTimeout)}):v},n.prototype._getSearchParams=function(e,t){if(void 0===e||null===e)return t;for(var o in e)null!==o&&void 0!==e[o]&&e.hasOwnProperty(o)&&(t+=""===t?"":"&",t+=o+"="+encodeURIComponent("[object Array]"===Object.prototype.toString.call(e[o])?i(e[o]):e[o]));return t},n.prototype._computeRequestHeaders=function(t){var o=e(6),n={"x-algolia-agent":this._ua,"x-algolia-application-id":this.applicationID};return t!==!1&&(n["x-algolia-api-key"]=this.apiKey),this.userToken&&(n["x-algolia-usertoken"]=this.userToken),this.securityTags&&(n["x-algolia-tagfilters"]=this.securityTags),this.extraHeaders&&o(this.extraHeaders,function(e){n[e.name]=e.value}),n},n.prototype.search=function(t,o,n){var r=e(9),i=e(22),s="Usage: client.search(arrayOfQueries[, callback])";if(!r(t))throw new Error(s);"function"==typeof o?(n=o,o={}):void 0===o&&(o={});var a=this,u={requests:i(t,function(e){var t="";return void 0!==e.query&&(t+="query="+encodeURIComponent(e.query)),{indexName:e.indexName,params:a._getSearchParams(e.params,t)}})},c=i(u.requests,function(e,t){return t+"="+encodeURIComponent("/1/indexes/"+encodeURIComponent(e.indexName)+"?"+e.params)}).join("&"),l="/1/indexes/*/queries";return void 0!==o.strategy&&(l+="?strategy="+o.strategy),this._jsonRequest({cache:this.cache,method:"POST",url:l,body:u,hostType:"read",fallback:{method:"GET",url:"/1/indexes/*",body:{params:c}},callback:n})},n.prototype.setSecurityTags=function(e){if("[object Array]"===Object.prototype.toString.call(e)){for(var t=[],o=0;o<e.length;++o)if("[object Array]"===Object.prototype.toString.call(e[o])){for(var n=[],r=0;r<e[o].length;++r)n.push(e[o][r]);t.push("("+n.join(",")+")")}else t.push(e[o]);e=t.join(",")}this.securityTags=e},n.prototype.setUserToken=function(e){this.userToken=e},n.prototype.clearCache=function(){this.cache={}},n.prototype.setRequestTimeout=function(e){e&&(this.requestTimeout=parseInt(e,10))}},{12:12,19:19,20:20,21:21,22:22,3:3,6:6,9:9}],12:[function(e,t,o){function n(e,t){this.indexName=t,this.as=e,this.typeAheadArgs=null,this.typeAheadValueOption=null,this.cache={}}var r=e(18);t.exports=n,n.prototype.clearCache=function(){this.cache={}},n.prototype.search=r("query"),n.prototype.similarSearch=r("similarQuery"),n.prototype.browse=function(t,o,n){var r,i,s=e(23),a=this;0===arguments.length||1===arguments.length&&"function"==typeof arguments[0]?(r=0,n=arguments[0],t=void 0):"number"==typeof arguments[0]?(r=arguments[0],"number"==typeof arguments[1]?i=arguments[1]:"function"==typeof arguments[1]&&(n=arguments[1],i=void 0),t=void 0,o=void 0):"object"==typeof arguments[0]?("function"==typeof arguments[1]&&(n=arguments[1]),o=arguments[0],t=void 0):"string"==typeof arguments[0]&&"function"==typeof arguments[1]&&(n=arguments[1],o=void 0),o=s({},o||{},{page:r,hitsPerPage:i,query:t});var u=this.as._getSearchParams(o,"");return this.as._jsonRequest({method:"GET",url:"/1/indexes/"+encodeURIComponent(a.indexName)+"/browse?"+u,hostType:"read",callback:n})},n.prototype.browseFrom=function(e,t){return this.as._jsonRequest({method:"GET",url:"/1/indexes/"+encodeURIComponent(this.indexName)+"/browse?cursor="+encodeURIComponent(e),hostType:"read",callback:t})},n.prototype._search=function(e,t,o){return this.as._jsonRequest({cache:this.cache,method:"POST",url:t||"/1/indexes/"+encodeURIComponent(this.indexName)+"/query",body:{params:e},hostType:"read",fallback:{method:"GET",url:"/1/indexes/"+encodeURIComponent(this.indexName),body:{params:e}},callback:o})},n.prototype.getObject=function(e,t,o){var n=this;1!==arguments.length&&"function"!=typeof t||(o=t,t=void 0);var r="";if(void 0!==t){r="?attributes=";for(var i=0;i<t.length;++i)0!==i&&(r+=","),r+=t[i]}return this.as._jsonRequest({method:"GET",url:"/1/indexes/"+encodeURIComponent(n.indexName)+"/"+encodeURIComponent(e)+r,hostType:"read",callback:o})},n.prototype.getObjects=function(t,o,n){var r=e(9),i=e(22),s="Usage: index.getObjects(arrayOfObjectIDs[, callback])";if(!r(t))throw new Error(s);var a=this;1!==arguments.length&&"function"!=typeof o||(n=o,o=void 0);var u={requests:i(t,function(e){var t={indexName:a.indexName,objectID:e};return o&&(t.attributesToRetrieve=o.join(",")),t})};return this.as._jsonRequest({method:"POST",url:"/1/indexes/*/objects",hostType:"read",body:u,callback:n})},n.prototype.as=null,n.prototype.indexName=null,n.prototype.typeAheadArgs=null,n.prototype.typeAheadValueOption=null},{18:18,22:22,23:23,9:9}],13:[function(e,t,o){"use strict";var n=e(11),r=e(14);t.exports=r(n,"(lite) ")},{11:11,14:14}],14:[function(e,t,o){(function(o){"use strict";var n=e(7),r=n.Promise||e(5).Promise;t.exports=function(t,i){function s(t,o,n){var r=e(19),i=e(15);return n=r(n||{}),void 0===n.protocol&&(n.protocol=i()),n._ua=n._ua||s.ua,new a(t,o,n)}function a(){t.apply(this,arguments)}var u=e(8),c=e(20),l=e(16),p=e(17),f=e(24);i=i||"","debug"===o.env.NODE_ENV&&e(3).enable("algoliasearch*"),s.version=e(25),s.ua="Algolia for vanilla JavaScript "+i+s.version,s.initPlaces=f(s),n.__algolia={debug:e(3),algoliasearch:s};var h={hasXMLHttpRequest:"XMLHttpRequest"in n,hasXDomainRequest:"XDomainRequest"in n};return h.hasXMLHttpRequest&&(h.cors="withCredentials"in new XMLHttpRequest,h.timeout="timeout"in new XMLHttpRequest),u(a,t),a.prototype._request=function(e,t){return new r(function(o,n){function r(){if(!u){h.timeout||clearTimeout(a);var e;try{e={body:JSON.parse(f.responseText),responseText:f.responseText,statusCode:f.status,headers:f.getAllResponseHeaders&&f.getAllResponseHeaders()||{}}}catch(t){e=new c.UnparsableJSON({more:f.responseText})}e instanceof c.UnparsableJSON?n(e):o(e)}}function i(e){u||(h.timeout||clearTimeout(a),n(new c.Network({more:e})))}function s(){h.timeout||(u=!0,f.abort()),n(new c.RequestTimeout)}if(!h.cors&&!h.hasXDomainRequest)return void n(new c.Network("CORS not supported"));e=l(e,t.headers);var a,u,p=t.body,f=h.cors?new XMLHttpRequest:new XDomainRequest;f instanceof XMLHttpRequest?f.open(t.method,e,!0):f.open(t.method,e),h.cors&&(p&&("POST"===t.method?f.setRequestHeader("content-type","application/x-www-form-urlencoded"):f.setRequestHeader("content-type","application/json")),f.setRequestHeader("accept","application/json")),f.onprogress=function(){},f.onload=r,f.onerror=i,h.timeout?(f.timeout=t.timeout,f.ontimeout=s):a=setTimeout(s,t.timeout),f.send(p)})},a.prototype._request.fallback=function(e,t){return e=l(e,t.headers),new r(function(o,n){p(e,t,function(e,t){return e?void n(e):void o(t)})})},a.prototype._promise={reject:function(e){return r.reject(e)},resolve:function(e){return r.resolve(e)},delay:function(e){return new r(function(t){setTimeout(t,e)})}},s}}).call(this,e(2))},{15:15,16:16,17:17,19:19,2:2,20:20,24:24,25:25,3:3,5:5,7:7,8:8}],15:[function(e,t,o){"use strict";function n(){var e=window.document.location.protocol;return"http:"!==e&&"https:"!==e&&(e="http:"),e}t.exports=n},{}],16:[function(e,t,o){"use strict";function n(e,t){return e+=/\?/.test(e)?"&":"?",e+r(t)}t.exports=n;var r=e(10)},{10:10}],17:[function(e,t,o){"use strict";function n(e,t,o){function n(){t.debug("JSONP: success"),m||f||(m=!0,p||(t.debug("JSONP: Fail. Script loaded but did not call the callback"),a(),o(new r.JSONPScriptFail)))}function s(){"loaded"!==this.readyState&&"complete"!==this.readyState||n()}function a(){clearTimeout(v),d.onload=null,d.onreadystatechange=null,d.onerror=null,h.removeChild(d)}function u(){try{delete window[y],delete window[y+"_loaded"]}catch(e){window[y]=window[y+"_loaded"]=void 0}}function c(){t.debug("JSONP: Script timeout"),f=!0,a(),o(new r.RequestTimeout)}function l(){t.debug("JSONP: Script error"),m||f||(a(),o(new r.JSONPScriptError))}if("GET"!==t.method)return void o(new Error("Method "+t.method+" "+e+" is not supported by JSONP."));t.debug("JSONP: start");var p=!1,f=!1;i+=1;var h=document.getElementsByTagName("head")[0],d=document.createElement("script"),y="algoliaJSONP_"+i,m=!1;window[y]=function(e){return u(),f?void t.debug("JSONP: Late answer, ignoring"):(p=!0,a(),void o(null,{body:e}))},e+="&callback="+y,t.jsonBody&&t.jsonBody.params&&(e+="&"+t.jsonBody.params);var v=setTimeout(c,t.timeout);d.onreadystatechange=s,d.onload=n,d.onerror=l,d.async=!0,d.defer=!0,d.src=e,h.appendChild(d)}t.exports=n;var r=e(20),i=0},{20:20}],18:[function(e,t,o){function n(e,t){return function(o,n,i){if("function"==typeof o&&"object"==typeof n||"object"==typeof i)throw new r.AlgoliaSearchError("index.search usage is index.search(query, params, cb)");0===arguments.length||"function"==typeof o?(i=o,o=""):1!==arguments.length&&"function"!=typeof n||(i=n,n=void 0),"object"==typeof o&&null!==o?(n=o,o=void 0):void 0!==o&&null!==o||(o="");var s="";return void 0!==o&&(s+=e+"="+encodeURIComponent(o)),void 0!==n&&(s=this.as._getSearchParams(n,s)),this._search(s,t,i)}}t.exports=n;var r=e(20)},{20:20}],19:[function(e,t,o){t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],20:[function(e,t,o){"use strict";function n(t,o){var n=e(6),r=this;"function"==typeof Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):r.stack=(new Error).stack||"Cannot get a stacktrace, browser is too old",this.name="AlgoliaSearchError",this.message=t||"Unknown error",o&&n(o,function(e,t){r[t]=e})}function r(e,t){function o(){var o=Array.prototype.slice.call(arguments,0);"string"!=typeof o[0]&&o.unshift(t),n.apply(this,o),this.name="AlgoliaSearch"+e+"Error"}return i(o,n),o}var i=e(8);i(n,Error),t.exports={AlgoliaSearchError:n,UnparsableJSON:r("UnparsableJSON","Could not parse the incoming response as JSON, see err.more for details"),RequestTimeout:r("RequestTimeout","Request timedout before getting a response"),Network:r("Network","Network issue, see err.more for details"),JSONPScriptFail:r("JSONPScriptFail","<script> was loaded but did not call our provided callback"),JSONPScriptError:r("JSONPScriptError","<script> unable to load due to an `error` event on it"),Unknown:r("Unknown","Unknown error occured")}},{6:6,8:8}],21:[function(e,t,o){t.exports=function(e,t){t(e,0)}},{}],22:[function(e,t,o){var n=e(6);t.exports=function(e,t){var o=[];return n(e,function(n,r){o.push(t(n,r,e))}),o}},{6:6}],23:[function(e,t,o){var n=e(6);t.exports=function r(e){var t=Array.prototype.slice.call(arguments);return n(t,function(t){for(var o in t)t.hasOwnProperty(o)&&("object"==typeof e[o]&&"object"==typeof t[o]?e[o]=r({},e[o],t[o]):void 0!==t[o]&&(e[o]=t[o]))}),e}},{6:6}],24:[function(e,t,o){function n(t){return function(o,n,i){var s=e(19);i=i&&s(i)||{},i.hosts=i.hosts||["places-dsn.algolia.net","places-1.algolianet.com","places-2.algolianet.com","places-3.algolianet.com"],0!==arguments.length&&"object"!=typeof o&&void 0!==o||(o="",n="",i._allowEmptyCredentials=!0);var a=t(o,n,i),u=a.initIndex("places");return u.search=r("query","/1/places/query"),u}}t.exports=n;var r=e(18)},{18:18,19:19}],25:[function(e,t,o){"use strict";t.exports="3.18.0"},{}]},{},[13])(13)});
/*!
 * autocomplete.js 0.21.3
 * https://github.com/algolia/autocomplete.js
 * Copyright 2016 Algolia, Inc. and other contributors; Licensed MIT
 */
!function(a,b){"object"==typeof exports&&"object"==typeof module?module.exports=b():"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?exports.autocomplete=b():a.autocomplete=b()}(this,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={exports:{},id:d,loaded:!1};return a[d].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c={};return b.m=a,b.c=c,b.p="",b(0)}([function(a,b,c){"use strict";a.exports=c(1)},function(a,b,c){"use strict";function d(a,b,c,d){c=h.isArray(c)?c:[].slice.call(arguments,2);var e=f(a).each(function(a,e){var g=f(e),h=new k({el:g}),l=d||new j({input:g,eventBus:h,dropdownMenuContainer:b.dropdownMenuContainer,hint:void 0===b.hint?!0:!!b.hint,minLength:b.minLength,autoselect:b.autoselect,openOnFocus:b.openOnFocus,templates:b.templates,debug:b.debug,cssClasses:b.cssClasses,datasets:c,keyboardShortcuts:b.keyboardShortcuts});g.data(i,l)});return e.autocomplete={},h.each(["open","close","getVal","setVal","destroy"],function(a){e.autocomplete[a]=function(){var b,c=arguments;return e.each(function(d,e){var g=f(e).data(i);b=g[a].apply(g,c)}),b}}),e}var e=window.$;c(2);var f=window.Zepto;window.$=e;var g=c(3);g.element=f;var h=c(4);h.isArray=f.isArray,h.isFunction=f.isFunction,h.isObject=f.isPlainObject,h.bind=f.proxy,h.each=function(a,b){function c(a,c){return b(c,a)}f.each(a,c)},h.map=f.map,h.mixin=f.extend,h.Event=f.Event;var i="aaAutocomplete",j=c(5),k=c(6);d.sources=j.sources,a.exports=d},function(a,b,c){var d;!function(e,f){d=function(){return f(e)}.call(b,c,b,a),!(void 0!==d&&(a.exports=d))}(window,function(a){var b=function(){function b(a){return null==a?String(a):X[Y.call(a)]||"object"}function c(a){return"function"==b(a)}function d(a){return null!=a&&a==a.window}function e(a){return null!=a&&a.nodeType==a.DOCUMENT_NODE}function f(a){return"object"==b(a)}function g(a){return f(a)&&!d(a)&&Object.getPrototypeOf(a)==Object.prototype}function h(a){var b=!!a&&"length"in a&&a.length,c=z.type(a);return"function"!=c&&!d(a)&&("array"==c||0===b||"number"==typeof b&&b>0&&b-1 in a)}function i(a){return F.call(a,function(a){return null!=a})}function j(a){return a.length>0?z.fn.concat.apply([],a):a}function k(a){return a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function l(a){return a in J?J[a]:J[a]=new RegExp("(^|\\s)"+a+"(\\s|$)")}function m(a,b){return"number"!=typeof b||K[k(a)]?b:b+"px"}function n(a){var b,c;return I[a]||(b=H.createElement(a),H.body.appendChild(b),c=getComputedStyle(b,"").getPropertyValue("display"),b.parentNode.removeChild(b),"none"==c&&(c="block"),I[a]=c),I[a]}function o(a){return"children"in a?G.call(a.children):z.map(a.childNodes,function(a){return 1==a.nodeType?a:void 0})}function p(a,b){var c,d=a?a.length:0;for(c=0;d>c;c++)this[c]=a[c];this.length=d,this.selector=b||""}function q(a,b,c){for(y in b)c&&(g(b[y])||aa(b[y]))?(g(b[y])&&!g(a[y])&&(a[y]={}),aa(b[y])&&!aa(a[y])&&(a[y]=[]),q(a[y],b[y],c)):b[y]!==x&&(a[y]=b[y])}function r(a,b){return null==b?z(a):z(a).filter(b)}function s(a,b,d,e){return c(b)?b.call(a,d,e):b}function t(a,b,c){null==c?a.removeAttribute(b):a.setAttribute(b,c)}function u(a,b){var c=a.className||"",d=c&&c.baseVal!==x;return b===x?d?c.baseVal:c:void(d?c.baseVal=b:a.className=b)}function v(a){try{return a?"true"==a||("false"==a?!1:"null"==a?null:+a+""==a?+a:/^[\[\{]/.test(a)?z.parseJSON(a):a):a}catch(b){return a}}function w(a,b){b(a);for(var c=0,d=a.childNodes.length;d>c;c++)w(a.childNodes[c],b)}var x,y,z,A,B,C,D=[],E=D.concat,F=D.filter,G=D.slice,H=a.document,I={},J={},K={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},L=/^\s*<(\w+|!)[^>]*>/,M=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,N=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,O=/^(?:body|html)$/i,P=/([A-Z])/g,Q=["val","css","html","text","data","width","height","offset"],R=["after","prepend","before","append"],S=H.createElement("table"),T=H.createElement("tr"),U={tr:H.createElement("tbody"),tbody:S,thead:S,tfoot:S,td:T,th:T,"*":H.createElement("div")},V=/complete|loaded|interactive/,W=/^[\w-]*$/,X={},Y=X.toString,Z={},$=H.createElement("div"),_={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},aa=Array.isArray||function(a){return a instanceof Array};return Z.matches=function(a,b){if(!b||!a||1!==a.nodeType)return!1;var c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.matchesSelector;if(c)return c.call(a,b);var d,e=a.parentNode,f=!e;return f&&(e=$).appendChild(a),d=~Z.qsa(e,b).indexOf(a),f&&$.removeChild(a),d},B=function(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():""})},C=function(a){return F.call(a,function(b,c){return a.indexOf(b)==c})},Z.fragment=function(a,b,c){var d,e,f;return M.test(a)&&(d=z(H.createElement(RegExp.$1))),d||(a.replace&&(a=a.replace(N,"<$1></$2>")),b===x&&(b=L.test(a)&&RegExp.$1),b in U||(b="*"),f=U[b],f.innerHTML=""+a,d=z.each(G.call(f.childNodes),function(){f.removeChild(this)})),g(c)&&(e=z(d),z.each(c,function(a,b){Q.indexOf(a)>-1?e[a](b):e.attr(a,b)})),d},Z.Z=function(a,b){return new p(a,b)},Z.isZ=function(a){return a instanceof Z.Z},Z.init=function(a,b){var d;if(!a)return Z.Z();if("string"==typeof a)if(a=a.trim(),"<"==a[0]&&L.test(a))d=Z.fragment(a,RegExp.$1,b),a=null;else{if(b!==x)return z(b).find(a);d=Z.qsa(H,a)}else{if(c(a))return z(H).ready(a);if(Z.isZ(a))return a;if(aa(a))d=i(a);else if(f(a))d=[a],a=null;else if(L.test(a))d=Z.fragment(a.trim(),RegExp.$1,b),a=null;else{if(b!==x)return z(b).find(a);d=Z.qsa(H,a)}}return Z.Z(d,a)},z=function(a,b){return Z.init(a,b)},z.extend=function(a){var b,c=G.call(arguments,1);return"boolean"==typeof a&&(b=a,a=c.shift()),c.forEach(function(c){q(a,c,b)}),a},Z.qsa=function(a,b){var c,d="#"==b[0],e=!d&&"."==b[0],f=d||e?b.slice(1):b,g=W.test(f);return a.getElementById&&g&&d?(c=a.getElementById(f))?[c]:[]:1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType?[]:G.call(g&&!d&&a.getElementsByClassName?e?a.getElementsByClassName(f):a.getElementsByTagName(b):a.querySelectorAll(b))},z.contains=H.documentElement.contains?function(a,b){return a!==b&&a.contains(b)}:function(a,b){for(;b&&(b=b.parentNode);)if(b===a)return!0;return!1},z.type=b,z.isFunction=c,z.isWindow=d,z.isArray=aa,z.isPlainObject=g,z.isEmptyObject=function(a){var b;for(b in a)return!1;return!0},z.isNumeric=function(a){var b=Number(a),c=typeof a;return null!=a&&"boolean"!=c&&("string"!=c||a.length)&&!isNaN(b)&&isFinite(b)||!1},z.inArray=function(a,b,c){return D.indexOf.call(b,a,c)},z.camelCase=B,z.trim=function(a){return null==a?"":String.prototype.trim.call(a)},z.uuid=0,z.support={},z.expr={},z.noop=function(){},z.map=function(a,b){var c,d,e,f=[];if(h(a))for(d=0;d<a.length;d++)c=b(a[d],d),null!=c&&f.push(c);else for(e in a)c=b(a[e],e),null!=c&&f.push(c);return j(f)},z.each=function(a,b){var c,d;if(h(a)){for(c=0;c<a.length;c++)if(b.call(a[c],c,a[c])===!1)return a}else for(d in a)if(b.call(a[d],d,a[d])===!1)return a;return a},z.grep=function(a,b){return F.call(a,b)},a.JSON&&(z.parseJSON=JSON.parse),z.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){X["[object "+b+"]"]=b.toLowerCase()}),z.fn={constructor:Z.Z,length:0,forEach:D.forEach,reduce:D.reduce,push:D.push,sort:D.sort,splice:D.splice,indexOf:D.indexOf,concat:function(){var a,b,c=[];for(a=0;a<arguments.length;a++)b=arguments[a],c[a]=Z.isZ(b)?b.toArray():b;return E.apply(Z.isZ(this)?this.toArray():this,c)},map:function(a){return z(z.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return z(G.apply(this,arguments))},ready:function(a){return V.test(H.readyState)&&H.body?a(z):H.addEventListener("DOMContentLoaded",function(){a(z)},!1),this},get:function(a){return a===x?G.call(this):this[a>=0?a:a+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(a){return D.every.call(this,function(b,c){return a.call(b,c,b)!==!1}),this},filter:function(a){return c(a)?this.not(this.not(a)):z(F.call(this,function(b){return Z.matches(b,a)}))},add:function(a,b){return z(C(this.concat(z(a,b))))},is:function(a){return this.length>0&&Z.matches(this[0],a)},not:function(a){var b=[];if(c(a)&&a.call!==x)this.each(function(c){a.call(this,c)||b.push(this)});else{var d="string"==typeof a?this.filter(a):h(a)&&c(a.item)?G.call(a):z(a);this.forEach(function(a){d.indexOf(a)<0&&b.push(a)})}return z(b)},has:function(a){return this.filter(function(){return f(a)?z.contains(this,a):z(this).find(a).size()})},eq:function(a){return-1===a?this.slice(a):this.slice(a,+a+1)},first:function(){var a=this[0];return a&&!f(a)?a:z(a)},last:function(){var a=this[this.length-1];return a&&!f(a)?a:z(a)},find:function(a){var b,c=this;return b=a?"object"==typeof a?z(a).filter(function(){var a=this;return D.some.call(c,function(b){return z.contains(b,a)})}):1==this.length?z(Z.qsa(this[0],a)):this.map(function(){return Z.qsa(this,a)}):z()},closest:function(a,b){var c=[],d="object"==typeof a&&z(a);return this.each(function(f,g){for(;g&&!(d?d.indexOf(g)>=0:Z.matches(g,a));)g=g!==b&&!e(g)&&g.parentNode;g&&c.indexOf(g)<0&&c.push(g)}),z(c)},parents:function(a){for(var b=[],c=this;c.length>0;)c=z.map(c,function(a){return(a=a.parentNode)&&!e(a)&&b.indexOf(a)<0?(b.push(a),a):void 0});return r(b,a)},parent:function(a){return r(C(this.pluck("parentNode")),a)},children:function(a){return r(this.map(function(){return o(this)}),a)},contents:function(){return this.map(function(){return this.contentDocument||G.call(this.childNodes)})},siblings:function(a){return r(this.map(function(a,b){return F.call(o(b.parentNode),function(a){return a!==b})}),a)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(a){return z.map(this,function(b){return b[a]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=n(this.nodeName))})},replaceWith:function(a){return this.before(a).remove()},wrap:function(a){var b=c(a);if(this[0]&&!b)var d=z(a).get(0),e=d.parentNode||this.length>1;return this.each(function(c){z(this).wrapAll(b?a.call(this,c):e?d.cloneNode(!0):d)})},wrapAll:function(a){if(this[0]){z(this[0]).before(a=z(a));for(var b;(b=a.children()).length;)a=b.first();z(a).append(this)}return this},wrapInner:function(a){var b=c(a);return this.each(function(c){var d=z(this),e=d.contents(),f=b?a.call(this,c):a;e.length?e.wrapAll(f):d.append(f)})},unwrap:function(){return this.parent().each(function(){z(this).replaceWith(z(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(a){return this.each(function(){var b=z(this);(a===x?"none"==b.css("display"):a)?b.show():b.hide()})},prev:function(a){return z(this.pluck("previousElementSibling")).filter(a||"*")},next:function(a){return z(this.pluck("nextElementSibling")).filter(a||"*")},html:function(a){return 0 in arguments?this.each(function(b){var c=this.innerHTML;z(this).empty().append(s(this,a,b,c))}):0 in this?this[0].innerHTML:null},text:function(a){return 0 in arguments?this.each(function(b){var c=s(this,a,b,this.textContent);this.textContent=null==c?"":""+c}):0 in this?this.pluck("textContent").join(""):null},attr:function(a,b){var c;return"string"!=typeof a||1 in arguments?this.each(function(c){if(1===this.nodeType)if(f(a))for(y in a)t(this,y,a[y]);else t(this,a,s(this,b,c,this.getAttribute(a)))}):0 in this&&1==this[0].nodeType&&null!=(c=this[0].getAttribute(a))?c:x},removeAttr:function(a){return this.each(function(){1===this.nodeType&&a.split(" ").forEach(function(a){t(this,a)},this)})},prop:function(a,b){return a=_[a]||a,1 in arguments?this.each(function(c){this[a]=s(this,b,c,this[a])}):this[0]&&this[0][a]},removeProp:function(a){return a=_[a]||a,this.each(function(){delete this[a]})},data:function(a,b){var c="data-"+a.replace(P,"-$1").toLowerCase(),d=1 in arguments?this.attr(c,b):this.attr(c);return null!==d?v(d):x},val:function(a){return 0 in arguments?(null==a&&(a=""),this.each(function(b){this.value=s(this,a,b,this.value)})):this[0]&&(this[0].multiple?z(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(b){if(b)return this.each(function(a){var c=z(this),d=s(this,b,a,c.offset()),e=c.offsetParent().offset(),f={top:d.top-e.top,left:d.left-e.left};"static"==c.css("position")&&(f.position="relative"),c.css(f)});if(!this.length)return null;if(H.documentElement!==this[0]&&!z.contains(H.documentElement,this[0]))return{top:0,left:0};var c=this[0].getBoundingClientRect();return{left:c.left+a.pageXOffset,top:c.top+a.pageYOffset,width:Math.round(c.width),height:Math.round(c.height)}},css:function(a,c){if(arguments.length<2){var d=this[0];if("string"==typeof a){if(!d)return;return d.style[B(a)]||getComputedStyle(d,"").getPropertyValue(a)}if(aa(a)){if(!d)return;var e={},f=getComputedStyle(d,"");return z.each(a,function(a,b){e[b]=d.style[B(b)]||f.getPropertyValue(b)}),e}}var g="";if("string"==b(a))c||0===c?g=k(a)+":"+m(a,c):this.each(function(){this.style.removeProperty(k(a))});else for(y in a)a[y]||0===a[y]?g+=k(y)+":"+m(y,a[y])+";":this.each(function(){this.style.removeProperty(k(y))});return this.each(function(){this.style.cssText+=";"+g})},index:function(a){return a?this.indexOf(z(a)[0]):this.parent().children().indexOf(this[0])},hasClass:function(a){return a?D.some.call(this,function(a){return this.test(u(a))},l(a)):!1},addClass:function(a){return a?this.each(function(b){if("className"in this){A=[];var c=u(this),d=s(this,a,b,c);d.split(/\s+/g).forEach(function(a){z(this).hasClass(a)||A.push(a)},this),A.length&&u(this,c+(c?" ":"")+A.join(" "))}}):this},removeClass:function(a){return this.each(function(b){if("className"in this){if(a===x)return u(this,"");A=u(this),s(this,a,b,A).split(/\s+/g).forEach(function(a){A=A.replace(l(a)," ")}),u(this,A.trim())}})},toggleClass:function(a,b){return a?this.each(function(c){var d=z(this),e=s(this,a,c,u(this));e.split(/\s+/g).forEach(function(a){(b===x?!d.hasClass(a):b)?d.addClass(a):d.removeClass(a)})}):this},scrollTop:function(a){if(this.length){var b="scrollTop"in this[0];return a===x?b?this[0].scrollTop:this[0].pageYOffset:this.each(b?function(){this.scrollTop=a}:function(){this.scrollTo(this.scrollX,a)})}},scrollLeft:function(a){if(this.length){var b="scrollLeft"in this[0];return a===x?b?this[0].scrollLeft:this[0].pageXOffset:this.each(b?function(){this.scrollLeft=a}:function(){this.scrollTo(a,this.scrollY)})}},position:function(){if(this.length){var a=this[0],b=this.offsetParent(),c=this.offset(),d=O.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat(z(a).css("margin-top"))||0,c.left-=parseFloat(z(a).css("margin-left"))||0,d.top+=parseFloat(z(b[0]).css("border-top-width"))||0,d.left+=parseFloat(z(b[0]).css("border-left-width"))||0,{top:c.top-d.top,left:c.left-d.left}}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||H.body;a&&!O.test(a.nodeName)&&"static"==z(a).css("position");)a=a.offsetParent;return a})}},z.fn.detach=z.fn.remove,["width","height"].forEach(function(a){var b=a.replace(/./,function(a){return a[0].toUpperCase()});z.fn[a]=function(c){var f,g=this[0];return c===x?d(g)?g["inner"+b]:e(g)?g.documentElement["scroll"+b]:(f=this.offset())&&f[a]:this.each(function(b){g=z(this),g.css(a,s(this,c,b,g[a]()))})}}),R.forEach(function(c,d){var e=d%2;z.fn[c]=function(){var c,f,g=z.map(arguments,function(a){var d=[];return c=b(a),"array"==c?(a.forEach(function(a){return a.nodeType!==x?d.push(a):z.zepto.isZ(a)?d=d.concat(a.get()):void(d=d.concat(Z.fragment(a)))}),d):"object"==c||null==a?a:Z.fragment(a)}),h=this.length>1;return g.length<1?this:this.each(function(b,c){f=e?c:c.parentNode,c=0==d?c.nextSibling:1==d?c.firstChild:2==d?c:null;var i=z.contains(H.documentElement,f);g.forEach(function(b){if(h)b=b.cloneNode(!0);else if(!f)return z(b).remove();f.insertBefore(b,c),i&&w(b,function(b){if(!(null==b.nodeName||"SCRIPT"!==b.nodeName.toUpperCase()||b.type&&"text/javascript"!==b.type||b.src)){var c=b.ownerDocument?b.ownerDocument.defaultView:a;c.eval.call(c,b.innerHTML)}})})})},z.fn[e?c+"To":"insert"+(d?"Before":"After")]=function(a){return z(a)[c](this),this}}),Z.Z.prototype=p.prototype=z.fn,Z.uniq=C,Z.deserializeValue=v,z.zepto=Z,z}();return a.Zepto=b,void 0===a.$&&(a.$=b),function(b){function c(a){return a._zid||(a._zid=n++)}function d(a,b,d,g){if(b=e(b),b.ns)var h=f(b.ns);return(r[c(a)]||[]).filter(function(a){return a&&(!b.e||a.e==b.e)&&(!b.ns||h.test(a.ns))&&(!d||c(a.fn)===c(d))&&(!g||a.sel==g)})}function e(a){var b=(""+a).split(".");return{e:b[0],ns:b.slice(1).sort().join(" ")}}function f(a){return new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)")}function g(a,b){return a.del&&!t&&a.e in u||!!b}function h(a){return v[a]||t&&u[a]||a}function i(a,d,f,i,j,l,n){var o=c(a),p=r[o]||(r[o]=[]);d.split(/\s/).forEach(function(c){if("ready"==c)return b(document).ready(f);var d=e(c);d.fn=f,d.sel=j,d.e in v&&(f=function(a){var c=a.relatedTarget;return!c||c!==this&&!b.contains(this,c)?d.fn.apply(this,arguments):void 0}),d.del=l;var o=l||f;d.proxy=function(b){if(b=k(b),!b.isImmediatePropagationStopped()){b.data=i;var c=o.apply(a,b._args==m?[b]:[b].concat(b._args));return c===!1&&(b.preventDefault(),b.stopPropagation()),c}},d.i=p.length,p.push(d),"addEventListener"in a&&a.addEventListener(h(d.e),d.proxy,g(d,n))})}function j(a,b,e,f,i){var j=c(a);(b||"").split(/\s/).forEach(function(b){d(a,b,e,f).forEach(function(b){delete r[j][b.i],"removeEventListener"in a&&a.removeEventListener(h(b.e),b.proxy,g(b,i))})})}function k(a,c){return!c&&a.isDefaultPrevented||(c||(c=a),b.each(z,function(b,d){var e=c[b];a[b]=function(){return this[d]=w,e&&e.apply(c,arguments)},a[d]=x}),a.timeStamp||(a.timeStamp=Date.now()),(c.defaultPrevented!==m?c.defaultPrevented:"returnValue"in c?c.returnValue===!1:c.getPreventDefault&&c.getPreventDefault())&&(a.isDefaultPrevented=w)),a}function l(a){var b,c={originalEvent:a};for(b in a)y.test(b)||a[b]===m||(c[b]=a[b]);return k(c,a)}var m,n=1,o=Array.prototype.slice,p=b.isFunction,q=function(a){return"string"==typeof a},r={},s={},t="onfocusin"in a,u={focus:"focusin",blur:"focusout"},v={mouseenter:"mouseover",mouseleave:"mouseout"};s.click=s.mousedown=s.mouseup=s.mousemove="MouseEvents",b.event={add:i,remove:j},b.proxy=function(a,d){var e=2 in arguments&&o.call(arguments,2);if(p(a)){var f=function(){return a.apply(d,e?e.concat(o.call(arguments)):arguments)};return f._zid=c(a),f}if(q(d))return e?(e.unshift(a[d],a),b.proxy.apply(null,e)):b.proxy(a[d],a);throw new TypeError("expected function")},b.fn.bind=function(a,b,c){return this.on(a,b,c)},b.fn.unbind=function(a,b){return this.off(a,b)},b.fn.one=function(a,b,c,d){return this.on(a,b,c,d,1)};var w=function(){return!0},x=function(){return!1},y=/^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,z={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};b.fn.delegate=function(a,b,c){return this.on(b,a,c)},b.fn.undelegate=function(a,b,c){return this.off(b,a,c)},b.fn.live=function(a,c){return b(document.body).delegate(this.selector,a,c),this},b.fn.die=function(a,c){return b(document.body).undelegate(this.selector,a,c),this},b.fn.on=function(a,c,d,e,f){var g,h,k=this;return a&&!q(a)?(b.each(a,function(a,b){k.on(a,c,d,b,f)}),k):(q(c)||p(e)||e===!1||(e=d,d=c,c=m),e!==m&&d!==!1||(e=d,d=m),e===!1&&(e=x),k.each(function(k,m){f&&(g=function(a){return j(m,a.type,e),e.apply(this,arguments)}),c&&(h=function(a){var d,f=b(a.target).closest(c,m).get(0);return f&&f!==m?(d=b.extend(l(a),{currentTarget:f,liveFired:m}),(g||e).apply(f,[d].concat(o.call(arguments,1)))):void 0}),i(m,a,e,d,c,h||g)}))},b.fn.off=function(a,c,d){var e=this;return a&&!q(a)?(b.each(a,function(a,b){e.off(a,c,b)}),e):(q(c)||p(d)||d===!1||(d=c,c=m),d===!1&&(d=x),e.each(function(){j(this,a,d,c)}))},b.fn.trigger=function(a,c){return a=q(a)||b.isPlainObject(a)?b.Event(a):k(a),a._args=c,this.each(function(){a.type in u&&"function"==typeof this[a.type]?this[a.type]():"dispatchEvent"in this?this.dispatchEvent(a):b(this).triggerHandler(a,c)})},b.fn.triggerHandler=function(a,c){var e,f;return this.each(function(g,h){e=l(q(a)?b.Event(a):a),e._args=c,e.target=h,b.each(d(h,a.type||a),function(a,b){return f=b.proxy(e),e.isImmediatePropagationStopped()?!1:void 0})}),f},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(a){b.fn[a]=function(b){return 0 in arguments?this.bind(a,b):this.trigger(a)}}),b.Event=function(a,b){q(a)||(b=a,a=b.type);var c=document.createEvent(s[a]||"Events"),d=!0;if(b)for(var e in b)"bubbles"==e?d=!!b[e]:c[e]=b[e];return c.initEvent(a,d,!0),k(c)}}(b),function(a){var b,c=[];a.fn.remove=function(){return this.each(function(){this.parentNode&&("IMG"===this.tagName&&(c.push(this),this.src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",b&&clearTimeout(b),b=setTimeout(function(){c=[]},6e4)),this.parentNode.removeChild(this))})}}(b),function(a){function b(b,d){var i=b[h],j=i&&e[i];if(void 0===d)return j||c(b);if(j){if(d in j)return j[d];var k=g(d);if(k in j)return j[k]}return f.call(a(b),d)}function c(b,c,f){var i=b[h]||(b[h]=++a.uuid),j=e[i]||(e[i]=d(b));return void 0!==c&&(j[g(c)]=f),j}function d(b){var c={};return a.each(b.attributes||i,function(b,d){0==d.name.indexOf("data-")&&(c[g(d.name.replace("data-",""))]=a.zepto.deserializeValue(d.value))}),c}var e={},f=a.fn.data,g=a.camelCase,h=a.expando="Zepto"+ +new Date,i=[];a.fn.data=function(d,e){return void 0===e?a.isPlainObject(d)?this.each(function(b,e){a.each(d,function(a,b){c(e,a,b)})}):0 in this?b(this[0],d):void 0:this.each(function(){c(this,d,e)})},a.data=function(b,c,d){return a(b).data(c,d)},a.hasData=function(b){var c=b[h],d=c&&e[c];return d?!a.isEmptyObject(d):!1},a.fn.removeData=function(b){return"string"==typeof b&&(b=b.split(/\s+/)),this.each(function(){var c=this[h],d=c&&e[c];d&&a.each(b||d,function(a){delete d[b?g(this):a]})})},["remove","empty"].forEach(function(b){var c=a.fn[b];a.fn[b]=function(){var a=this.find("*");return"remove"===b&&(a=a.add(this)),a.removeData(),c.call(this)}})}(b),b})},function(a,b){"use strict";a.exports={element:null}},function(a,b,c){"use strict";var d=c(3);a.exports={isArray:null,isFunction:null,isObject:null,bind:null,each:null,map:null,mixin:null,isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:!1},escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isNumber:function(a){return"number"==typeof a},toStr:function(a){return void 0===a||null===a?"":a+""},cloneDeep:function(a){var b=this.mixin({},a),c=this;return this.each(b,function(a,d){a&&(c.isArray(a)?b[d]=[].concat(a):c.isObject(a)&&(b[d]=c.cloneDeep(a)))}),b},error:function(a){throw new Error(a)},every:function(a,b){var c=!0;return a?(this.each(a,function(d,e){return c=b.call(null,d,e,a),c?void 0:!1}),!!c):c},getUniqueId:function(){var a=0;return function(){return a++}}(),templatify:function(a){if(this.isFunction(a))return a;var b=d.element(a);return"SCRIPT"===b.prop("tagName")?function(){return b.text()}:function(){return String(a)}},defer:function(a){setTimeout(a,0)},noop:function(){},className:function(a,b,c){return(c?"":".")+a+"-"+b}}},function(a,b,c){"use strict";function d(a){var b,c,f;a=a||{},a.input||i.error("missing input"),this.isActivated=!1,this.debug=!!a.debug,this.autoselect=!!a.autoselect,this.openOnFocus=!!a.openOnFocus,this.minLength=i.isNumber(a.minLength)?a.minLength:1,this.cssClasses=a.cssClasses=i.mixin({},o.defaultClasses,a.cssClasses||{}),this.$node=e(a),b=this.$node.find(i.className(this.cssClasses.prefix,this.cssClasses.dropdownMenu)),c=this.$node.find(i.className(this.cssClasses.prefix,this.cssClasses.input)),f=this.$node.find(i.className(this.cssClasses.prefix,this.cssClasses.hint)),a.dropdownMenuContainer&&j.element(a.dropdownMenuContainer).css("position","relative").append(b.css("top","0")),c.on("blur.aa",function(a){var d=document.activeElement;i.isMsie()&&(b.is(d)||b.has(d).length>0)&&(a.preventDefault(),a.stopImmediatePropagation(),i.defer(function(){c.focus()}))}),b.on("mousedown.aa",function(a){a.preventDefault()}),this.eventBus=a.eventBus||new k({el:c}),this.dropdown=new d.Dropdown({menu:b,datasets:a.datasets,templates:a.templates,cssClasses:this.cssClasses,minLength:this.minLength}).onSync("suggestionClicked",this._onSuggestionClicked,this).onSync("cursorMoved",this._onCursorMoved,this).onSync("cursorRemoved",this._onCursorRemoved,this).onSync("opened",this._onOpened,this).onSync("closed",this._onClosed,this).onSync("shown",this._onShown,this).onSync("empty",this._onEmpty,this).onAsync("datasetRendered",this._onDatasetRendered,this),this.input=new d.Input({input:c,hint:f}).onSync("focused",this._onFocused,this).onSync("blurred",this._onBlurred,this).onSync("enterKeyed",this._onEnterKeyed,this).onSync("tabKeyed",this._onTabKeyed,this).onSync("escKeyed",this._onEscKeyed,this).onSync("upKeyed",this._onUpKeyed,this).onSync("downKeyed",this._onDownKeyed,this).onSync("leftKeyed",this._onLeftKeyed,this).onSync("rightKeyed",this._onRightKeyed,this).onSync("queryChanged",this._onQueryChanged,this).onSync("whitespaceChanged",this._onWhitespaceChanged,this),this._bindKeyboardShortcuts(c,a),this._setLanguageDirection()}function e(a){var b,c,d,e;b=j.element(a.input),c=j.element(n.wrapper.replace("%ROOT%",a.cssClasses.root)).css(o.wrapper),"block"===b.css("display")&&"table"===b.parent().css("display")&&c.css("display","table-cell");var g=n.dropdown.replace("%PREFIX%",a.cssClasses.prefix).replace("%DROPDOWN_MENU%",a.cssClasses.dropdownMenu);d=j.element(g).css(o.dropdown),a.templates&&a.templates.dropdownMenu&&d.html(i.templatify(a.templates.dropdownMenu)()),e=b.clone().css(o.hint).css(f(b)),e.val("").addClass(i.className(a.cssClasses.prefix,a.cssClasses.hint,!0)).removeAttr("id name placeholder required").prop("readonly",!0).attr({autocomplete:"off",spellcheck:"false",tabindex:-1}),e.removeData&&e.removeData(),b.data(h,{dir:b.attr("dir"),autocomplete:b.attr("autocomplete"),spellcheck:b.attr("spellcheck"),style:b.attr("style")}),b.addClass(i.className(a.cssClasses.prefix,a.cssClasses.input,!0)).attr({autocomplete:"off",spellcheck:!1}).css(a.hint?o.input:o.inputWithNoHint);try{b.attr("dir")||b.attr("dir","auto")}catch(k){}return b.wrap(c).parent().prepend(a.hint?e:null).append(d)}function f(a){return{backgroundAttachment:a.css("background-attachment"),backgroundClip:a.css("background-clip"),backgroundColor:a.css("background-color"),backgroundImage:a.css("background-image"),backgroundOrigin:a.css("background-origin"),backgroundPosition:a.css("background-position"),backgroundRepeat:a.css("background-repeat"),backgroundSize:a.css("background-size")}}function g(a,b){var c=a.find(i.className(b.prefix,b.input));i.each(c.data(h),function(a,b){void 0===a?c.removeAttr(b):c.attr(b,a)}),c.detach().removeClass(i.className(b.prefix,b.input,!0)).insertAfter(a),c.removeData&&c.removeData(h),a.remove()}var h="aaAttrs",i=c(4),j=c(3),k=c(6),l=c(7),m=c(11),n=c(13),o=c(14);i.mixin(d.prototype,{_bindKeyboardShortcuts:function(a,b){if(b.keyboardShortcuts){var c=[];i.each(b.keyboardShortcuts,function(a){"string"==typeof a&&(a=a.toUpperCase().charCodeAt(0)),c.push(a)}),j.element(document).keydown(function(b){var d=b.target||b.srcElement,e=d.tagName;if(!d.isContentEditable&&"INPUT"!==e&&"SELECT"!==e&&"TEXTAREA"!==e){var f=b.which||b.keyCode;-1!==c.indexOf(f)&&(a.focus(),b.stopPropagation(),b.preventDefault())}})}},_onSuggestionClicked:function(a,b){var c;(c=this.dropdown.getDatumForSuggestion(b))&&this._select(c)},_onCursorMoved:function(a,b){var c=this.dropdown.getDatumForCursor();b&&this.input.setInputValue(c.value,!0),this.eventBus.trigger("cursorchanged",c.raw,c.datasetName)},_onCursorRemoved:function(){this.input.resetInputValue(),this._updateHint()},_onDatasetRendered:function(){this._updateHint(),this.eventBus.trigger("updated")},_onOpened:function(){this._updateHint(),this.eventBus.trigger("opened")},_onEmpty:function(){this.eventBus.trigger("empty")},_onShown:function(){this.eventBus.trigger("shown")},_onClosed:function(){this.input.clearHint(),this.eventBus.trigger("closed")},_onFocused:function(){if(this.isActivated=!0,this.openOnFocus){var a=this.input.getQuery();a.length>=this.minLength?this.dropdown.update(a):this.dropdown.empty(),this.dropdown.open()}},_onBlurred:function(){this.debug||(this.isActivated=!1,this.dropdown.empty(),this.dropdown.close())},_onEnterKeyed:function(a,b){var c,d;c=this.dropdown.getDatumForCursor(),d=this.dropdown.getDatumForTopSuggestion(),c?(this._select(c),b.preventDefault()):this.autoselect&&d&&(this._select(d),b.preventDefault())},_onTabKeyed:function(a,b){var c;(c=this.dropdown.getDatumForCursor())?(this._select(c),b.preventDefault()):this._autocomplete(!0)},_onEscKeyed:function(){this.dropdown.close(),this.input.resetInputValue()},_onUpKeyed:function(){var a=this.input.getQuery();this.dropdown.isEmpty&&a.length>=this.minLength?this.dropdown.update(a):this.dropdown.moveCursorUp(),this.dropdown.open()},_onDownKeyed:function(){var a=this.input.getQuery();this.dropdown.isEmpty&&a.length>=this.minLength?this.dropdown.update(a):this.dropdown.moveCursorDown(),this.dropdown.open()},_onLeftKeyed:function(){"rtl"===this.dir&&this._autocomplete()},_onRightKeyed:function(){"ltr"===this.dir&&this._autocomplete()},_onQueryChanged:function(a,b){this.input.clearHintIfInvalid(),b.length>=this.minLength?this.dropdown.update(b):this.dropdown.empty(),this.dropdown.open(),this._setLanguageDirection()},_onWhitespaceChanged:function(){this._updateHint(),this.dropdown.open()},_setLanguageDirection:function(){var a=this.input.getLanguageDirection();this.dir!==a&&(this.dir=a,this.$node.css("direction",a),this.dropdown.setLanguageDirection(a))},_updateHint:function(){var a,b,c,d,e,f;a=this.dropdown.getDatumForTopSuggestion(),a&&this.dropdown.isVisible()&&!this.input.hasOverflow()?(b=this.input.getInputValue(),c=l.normalizeQuery(b),d=i.escapeRegExChars(c),e=new RegExp("^(?:"+d+")(.+$)","i"),f=e.exec(a.value),f?this.input.setHint(b+f[1]):this.input.clearHint()):this.input.clearHint()},_autocomplete:function(a){var b,c,d,e;b=this.input.getHint(),c=this.input.getQuery(),d=a||this.input.isCursorAtEnd(),b&&c!==b&&d&&(e=this.dropdown.getDatumForTopSuggestion(),e&&this.input.setInputValue(e.value),this.eventBus.trigger("autocompleted",e.raw,e.datasetName))},_select:function(a){"undefined"!=typeof a.value&&this.input.setQuery(a.value),this.input.setInputValue(a.value,!0),this._setLanguageDirection();var b=this.eventBus.trigger("selected",a.raw,a.datasetName);b.isDefaultPrevented()===!1&&(this.dropdown.close(),i.defer(i.bind(this.dropdown.empty,this.dropdown)))},open:function(){if(!this.isActivated){var a=this.input.getInputValue();a.length>=this.minLength?this.dropdown.update(a):this.dropdown.empty()}this.dropdown.open()},close:function(){this.dropdown.close()},setVal:function(a){a=i.toStr(a),this.isActivated?this.input.setInputValue(a):(this.input.setQuery(a),this.input.setInputValue(a,!0)),this._setLanguageDirection()},getVal:function(){return this.input.getQuery()},destroy:function(){this.input.destroy(),this.dropdown.destroy(),g(this.$node,this.cssClasses),this.$node=null}}),d.Dropdown=m,d.Input=l,d.sources=c(15),a.exports=d},function(a,b,c){"use strict";
function d(a){a&&a.el||f.error("EventBus initialized without el"),this.$el=g.element(a.el)}var e="autocomplete:",f=c(4),g=c(3);f.mixin(d.prototype,{trigger:function(a){var b=[].slice.call(arguments,1),c=f.Event(e+a);return this.$el.trigger(c,b),c}}),a.exports=d},function(a,b,c){"use strict";function d(a){var b,c,d,f,g=this;a=a||{},a.input||i.error("input is missing"),b=i.bind(this._onBlur,this),c=i.bind(this._onFocus,this),d=i.bind(this._onKeydown,this),f=i.bind(this._onInput,this),this.$hint=j.element(a.hint),this.$input=j.element(a.input).on("blur.aa",b).on("focus.aa",c).on("keydown.aa",d),0===this.$hint.length&&(this.setHint=this.getHint=this.clearHint=this.clearHintIfInvalid=i.noop),i.isMsie()?this.$input.on("keydown.aa keypress.aa cut.aa paste.aa",function(a){h[a.which||a.keyCode]||i.defer(i.bind(g._onInput,g,a))}):this.$input.on("input.aa",f),this.query=this.$input.val(),this.$overflowHelper=e(this.$input)}function e(a){return j.element('<pre aria-hidden="true"></pre>').css({position:"absolute",visibility:"hidden",whiteSpace:"pre",fontFamily:a.css("font-family"),fontSize:a.css("font-size"),fontStyle:a.css("font-style"),fontVariant:a.css("font-variant"),fontWeight:a.css("font-weight"),wordSpacing:a.css("word-spacing"),letterSpacing:a.css("letter-spacing"),textIndent:a.css("text-indent"),textRendering:a.css("text-rendering"),textTransform:a.css("text-transform")}).insertAfter(a)}function f(a,b){return d.normalizeQuery(a)===d.normalizeQuery(b)}function g(a){return a.altKey||a.ctrlKey||a.metaKey||a.shiftKey}var h;h={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"};var i=c(4),j=c(3),k=c(8);d.normalizeQuery=function(a){return(a||"").replace(/^\s*/g,"").replace(/\s{2,}/g," ")},i.mixin(d.prototype,k,{_onBlur:function(){this.resetInputValue(),this.trigger("blurred")},_onFocus:function(){this.trigger("focused")},_onKeydown:function(a){var b=h[a.which||a.keyCode];this._managePreventDefault(b,a),b&&this._shouldTrigger(b,a)&&this.trigger(b+"Keyed",a)},_onInput:function(){this._checkInputValue()},_managePreventDefault:function(a,b){var c,d,e;switch(a){case"tab":d=this.getHint(),e=this.getInputValue(),c=d&&d!==e&&!g(b);break;case"up":case"down":c=!g(b);break;default:c=!1}c&&b.preventDefault()},_shouldTrigger:function(a,b){var c;switch(a){case"tab":c=!g(b);break;default:c=!0}return c},_checkInputValue:function(){var a,b,c;a=this.getInputValue(),b=f(a,this.query),c=b&&this.query?this.query.length!==a.length:!1,this.query=a,b?c&&this.trigger("whitespaceChanged",this.query):this.trigger("queryChanged",this.query)},focus:function(){this.$input.focus()},blur:function(){this.$input.blur()},getQuery:function(){return this.query},setQuery:function(a){this.query=a},getInputValue:function(){return this.$input.val()},setInputValue:function(a,b){"undefined"==typeof a&&(a=this.query),this.$input.val(a),b?this.clearHint():this._checkInputValue()},resetInputValue:function(){this.setInputValue(this.query,!0)},getHint:function(){return this.$hint.val()},setHint:function(a){this.$hint.val(a)},clearHint:function(){this.setHint("")},clearHintIfInvalid:function(){var a,b,c,d;a=this.getInputValue(),b=this.getHint(),c=a!==b&&0===b.indexOf(a),d=""!==a&&c&&!this.hasOverflow(),d||this.clearHint()},getLanguageDirection:function(){return(this.$input.css("direction")||"ltr").toLowerCase()},hasOverflow:function(){var a=this.$input.width()-2;return this.$overflowHelper.text(this.getInputValue()),this.$overflowHelper.width()>=a},isCursorAtEnd:function(){var a,b,c;return a=this.$input.val().length,b=this.$input[0].selectionStart,i.isNumber(b)?b===a:document.selection?(c=document.selection.createRange(),c.moveStart("character",-a),a===c.text.length):!0},destroy:function(){this.$hint.off(".aa"),this.$input.off(".aa"),this.$hint=this.$input=this.$overflowHelper=null}}),a.exports=d},function(a,b,c){(function(b){"use strict";function c(a,b,c,d){var e;if(!c)return this;for(b=b.split(k),c=d?j(c,d):c,this._callbacks=this._callbacks||{};e=b.shift();)this._callbacks[e]=this._callbacks[e]||{sync:[],async:[]},this._callbacks[e][a].push(c);return this}function d(a,b,d){return c.call(this,"async",a,b,d)}function e(a,b,d){return c.call(this,"sync",a,b,d)}function f(a){var b;if(!this._callbacks)return this;for(a=a.split(k);b=a.shift();)delete this._callbacks[b];return this}function g(a){var b,c,d,e,f;if(!this._callbacks)return this;for(a=a.split(k),d=[].slice.call(arguments,1);(b=a.shift())&&(c=this._callbacks[b]);)e=h(c.sync,this,[b].concat(d)),f=h(c.async,this,[b].concat(d)),e()&&l(f);return this}function h(a,b,c){function d(){for(var d,e=0,f=a.length;!d&&f>e;e+=1)d=a[e].apply(b,c)===!1;return!d}return d}function i(){var a;return a=window.setImmediate?function(a){b(function(){a()})}:function(a){setTimeout(function(){a()},0)}}function j(a,b){return a.bind?a.bind(b):function(){a.apply(b,[].slice.call(arguments,0))}}var k=/\s+/,l=i();a.exports={onSync:e,onAsync:d,off:f,trigger:g}}).call(b,c(9).setImmediate)},function(a,b,c){(function(a,d){function e(a,b){this._id=a,this._clearFn=b}var f=c(10).nextTick,g=Function.prototype.apply,h=Array.prototype.slice,i={},j=0;b.setTimeout=function(){return new e(g.call(setTimeout,window,arguments),clearTimeout)},b.setInterval=function(){return new e(g.call(setInterval,window,arguments),clearInterval)},b.clearTimeout=b.clearInterval=function(a){a.close()},e.prototype.unref=e.prototype.ref=function(){},e.prototype.close=function(){this._clearFn.call(window,this._id)},b.enroll=function(a,b){clearTimeout(a._idleTimeoutId),a._idleTimeout=b},b.unenroll=function(a){clearTimeout(a._idleTimeoutId),a._idleTimeout=-1},b._unrefActive=b.active=function(a){clearTimeout(a._idleTimeoutId);var b=a._idleTimeout;b>=0&&(a._idleTimeoutId=setTimeout(function(){a._onTimeout&&a._onTimeout()},b))},b.setImmediate="function"==typeof a?a:function(a){var c=j++,d=arguments.length<2?!1:h.call(arguments,1);return i[c]=!0,f(function(){i[c]&&(d?a.apply(null,d):a.call(null),b.clearImmediate(c))}),c},b.clearImmediate="function"==typeof d?d:function(a){delete i[a]}}).call(b,c(9).setImmediate,c(9).clearImmediate)},function(a,b){function c(){j=!1,g.length?i=g.concat(i):k=-1,i.length&&d()}function d(){if(!j){var a=setTimeout(c);j=!0;for(var b=i.length;b;){for(g=i,i=[];++k<b;)g&&g[k].run();k=-1,b=i.length}g=null,j=!1,clearTimeout(a)}}function e(a,b){this.fun=a,this.array=b}function f(){}var g,h=a.exports={},i=[],j=!1,k=-1;h.nextTick=function(a){var b=new Array(arguments.length-1);if(arguments.length>1)for(var c=1;c<arguments.length;c++)b[c-1]=arguments[c];i.push(new e(a,b)),1!==i.length||j||setTimeout(d,0)},e.prototype.run=function(){this.fun.apply(null,this.array)},h.title="browser",h.browser=!0,h.env={},h.argv=[],h.version="",h.versions={},h.on=f,h.addListener=f,h.once=f,h.off=f,h.removeListener=f,h.removeAllListeners=f,h.emit=f,h.binding=function(a){throw new Error("process.binding is not supported")},h.cwd=function(){return"/"},h.chdir=function(a){throw new Error("process.chdir is not supported")},h.umask=function(){return 0}},function(a,b,c){"use strict";function d(a){var b,c,d,h=this;a=a||{},a.menu||f.error("menu is required"),f.isArray(a.datasets)||f.isObject(a.datasets)||f.error("1 or more datasets required"),a.datasets||f.error("datasets is required"),this.isOpen=!1,this.isEmpty=!0,this.minLength=a.minLength||0,this.cssClasses=f.mixin({},j.defaultClasses,a.cssClasses||{}),this.templates={},b=f.bind(this._onSuggestionClick,this),c=f.bind(this._onSuggestionMouseEnter,this),d=f.bind(this._onSuggestionMouseLeave,this);var i=f.className(this.cssClasses.prefix,this.cssClasses.suggestion);this.$menu=g.element(a.menu).on("click.aa",i,b).on("mouseenter.aa",i,c).on("mouseleave.aa",i,d),a.templates&&a.templates.header&&(this.templates.header=f.templatify(a.templates.header),this.$menu.prepend(this.templates.header())),this.datasets=f.map(a.datasets,function(b){return e(h.$menu,b,a.cssClasses)}),f.each(this.datasets,function(a){var b=a.getRoot();b&&0===b.parent().length&&h.$menu.append(b),a.onSync("rendered",h._onRendered,h)}),a.templates&&a.templates.footer&&(this.templates.footer=f.templatify(a.templates.footer),this.$menu.append(this.templates.footer())),a.templates&&a.templates.empty&&(this.templates.empty=f.templatify(a.templates.empty),this.$empty=g.element('<div class="'+f.className(this.cssClasses.prefix,this.cssClasses.empty,!0)+'"></div>'),this.$menu.append(this.$empty))}function e(a,b,c){return new d.Dataset(f.mixin({$menu:a,cssClasses:c},b))}var f=c(4),g=c(3),h=c(8),i=c(12),j=c(14);f.mixin(d.prototype,h,{_onSuggestionClick:function(a){this.trigger("suggestionClicked",g.element(a.currentTarget))},_onSuggestionMouseEnter:function(a){var b=g.element(a.currentTarget);b.hasClass(f.className(this.cssClasses.prefix,this.cssClasses.cursor,!0))||(this._removeCursor(),this._setCursor(b,!1))},_onSuggestionMouseLeave:function(a){if(a.relatedTarget){var b=g.element(a.relatedTarget);if(b.closest("."+f.className(this.cssClasses.prefix,this.cssClasses.cursor,!0)).length>0)return}this._removeCursor(),this.trigger("cursorRemoved")},_onRendered:function(a,b){function c(a){return a.isEmpty()}if(this.isEmpty=f.every(this.datasets,c),this.isEmpty)if(b.length>=this.minLength&&this.trigger("empty"),this.$empty)if(b.length<this.minLength)this._hide();else{var d=this.templates.empty({query:this.datasets[0]&&this.datasets[0].query});this.$empty.html(d),this._show()}else this._hide();else this.isOpen&&(this.$empty&&this.$empty.empty(),b.length>=this.minLength?this._show():this._hide());this.trigger("datasetRendered")},_hide:function(){this.$menu.hide()},_show:function(){this.$menu.css("display","block"),this.trigger("shown")},_getSuggestions:function(){return this.$menu.find(f.className(this.cssClasses.prefix,this.cssClasses.suggestion))},_getCursor:function(){return this.$menu.find(f.className(this.cssClasses.prefix,this.cssClasses.cursor)).first()},_setCursor:function(a,b){a.first().addClass(f.className(this.cssClasses.prefix,this.cssClasses.cursor,!0)),this.trigger("cursorMoved",b)},_removeCursor:function(){this._getCursor().removeClass(f.className(this.cssClasses.prefix,this.cssClasses.cursor,!0))},_moveCursor:function(a){var b,c,d,e;if(this.isOpen){if(c=this._getCursor(),b=this._getSuggestions(),this._removeCursor(),d=b.index(c)+a,d=(d+1)%(b.length+1)-1,-1===d)return void this.trigger("cursorRemoved");-1>d&&(d=b.length-1),this._setCursor(e=b.eq(d),!0),this._ensureVisible(e)}},_ensureVisible:function(a){var b,c,d,e;b=a.position().top,c=b+a.height()+parseInt(a.css("margin-top"),10)+parseInt(a.css("margin-bottom"),10),d=this.$menu.scrollTop(),e=this.$menu.height()+parseInt(this.$menu.css("paddingTop"),10)+parseInt(this.$menu.css("paddingBottom"),10),0>b?this.$menu.scrollTop(d+b):c>e&&this.$menu.scrollTop(d+(c-e))},close:function(){this.isOpen&&(this.isOpen=!1,this._removeCursor(),this._hide(),this.trigger("closed"))},open:function(){this.isOpen||(this.isOpen=!0,this.isEmpty||this._show(),this.trigger("opened"))},setLanguageDirection:function(a){this.$menu.css("ltr"===a?j.ltr:j.rtl)},moveCursorUp:function(){this._moveCursor(-1)},moveCursorDown:function(){this._moveCursor(1)},getDatumForSuggestion:function(a){var b=null;return a.length&&(b={raw:i.extractDatum(a),value:i.extractValue(a),datasetName:i.extractDatasetName(a)}),b},getDatumForCursor:function(){return this.getDatumForSuggestion(this._getCursor().first())},getDatumForTopSuggestion:function(){return this.getDatumForSuggestion(this._getSuggestions().first())},update:function(a){function b(b){b.update(a)}f.each(this.datasets,b)},empty:function(){function a(a){a.clear()}f.each(this.datasets,a),this.isEmpty=!0},isVisible:function(){return this.isOpen&&!this.isEmpty},destroy:function(){function a(a){a.destroy()}this.$menu.off(".aa"),this.$menu=null,f.each(this.datasets,a)}}),d.Dataset=i,a.exports=d},function(a,b,c){"use strict";function d(a){a=a||{},a.templates=a.templates||{},a.source||k.error("missing source"),a.name&&!g(a.name)&&k.error("invalid dataset name: "+a.name),this.query=null,this._isEmpty=!0,this.highlight=!!a.highlight,this.name="undefined"==typeof a.name||null===a.name?k.getUniqueId():a.name,this.source=a.source,this.displayFn=e(a.display||a.displayKey),this.templates=f(a.templates,this.displayFn),this.cssClasses=k.mixin({},n.defaultClasses,a.cssClasses||{});var b=k.className(this.cssClasses.prefix,this.cssClasses.dataset);this.$el=a.$menu&&a.$menu.find(b+"-"+this.name).length>0?l.element(a.$menu.find(b+"-"+this.name)[0]):l.element(m.dataset.replace("%CLASS%",this.name).replace("%PREFIX%",this.cssClasses.prefix).replace("%DATASET%",this.cssClasses.dataset)),this.$menu=a.$menu}function e(a){function b(b){return b[a]}return a=a||"value",k.isFunction(a)?a:b}function f(a,b){function c(a){return"<p>"+b(a)+"</p>"}return{empty:a.empty&&k.templatify(a.empty),header:a.header&&k.templatify(a.header),footer:a.footer&&k.templatify(a.footer),suggestion:a.suggestion||c}}function g(a){return/^[_a-zA-Z0-9-]+$/.test(a)}var h="aaDataset",i="aaValue",j="aaDatum",k=c(4),l=c(3),m=c(13),n=c(14),o=c(8);d.extractDatasetName=function(a){return l.element(a).data(h)},d.extractValue=function(a){return l.element(a).data(i)},d.extractDatum=function(a){var b=l.element(a).data(j);return"string"==typeof b&&(b=JSON.parse(b)),b},k.mixin(d.prototype,o,{_render:function(a,b){function c(){var b=[].slice.call(arguments,0);return b=[{query:a,isEmpty:!0}].concat(b),o.templates.empty.apply(this,b)}function d(){function a(a){var b,c=m.suggestion.replace("%PREFIX%",f.cssClasses.prefix).replace("%SUGGESTION%",f.cssClasses.suggestion);return b=l.element(c).append(o.templates.suggestion.apply(this,[a].concat(e))),b.data(h,o.name),b.data(i,o.displayFn(a)||void 0),b.data(j,JSON.stringify(a)),b.children().each(function(){l.element(this).css(n.suggestionChild)}),b}var c,d,e=[].slice.call(arguments,0),f=this,g=m.suggestions.replace("%PREFIX%",this.cssClasses.prefix).replace("%SUGGESTIONS%",this.cssClasses.suggestions);return c=l.element(g).css(n.suggestions),d=k.map(b,a),c.append.apply(c,d),c}function e(){var b=[].slice.call(arguments,0);return b=[{query:a,isEmpty:!g}].concat(b),o.templates.header.apply(this,b)}function f(){var b=[].slice.call(arguments,0);return b=[{query:a,isEmpty:!g}].concat(b),o.templates.footer.apply(this,b)}if(this.$el){var g,o=this,p=[].slice.call(arguments,2);this.$el.empty(),g=b&&b.length,this._isEmpty=!g,!g&&this.templates.empty?this.$el.html(c.apply(this,p)).prepend(o.templates.header?e.apply(this,p):null).append(o.templates.footer?f.apply(this,p):null):g&&this.$el.html(d.apply(this,p)).prepend(o.templates.header?e.apply(this,p):null).append(o.templates.footer?f.apply(this,p):null),this.$menu&&this.$menu.addClass(this.cssClasses.prefix+"-"+(g?"with":"without")+"-"+this.name).removeClass(this.cssClasses.prefix+"-"+(g?"without":"with")+"-"+this.name),this.trigger("rendered",a)}},getRoot:function(){return this.$el},update:function(a){function b(b){if(!c.canceled&&a===c.query){var d=[].slice.call(arguments,1);d=[a,b].concat(d),c._render.apply(c,d)}}var c=this;this.query=a,this.canceled=!1,this.source(a,b)},cancel:function(){this.canceled=!0},clear:function(){this.cancel(),this.$el.empty(),this.trigger("rendered","")},isEmpty:function(){return this._isEmpty},destroy:function(){this.$el=null}}),a.exports=d},function(a,b){"use strict";a.exports={wrapper:'<span class="%ROOT%"></span>',dropdown:'<span class="%PREFIX%-%DROPDOWN_MENU%"></span>',dataset:'<div class="%PREFIX%-%DATASET%-%CLASS%"></div>',suggestions:'<span class="%PREFIX%-%SUGGESTIONS%"></span>',suggestion:'<div class="%PREFIX%-%SUGGESTION%"></div>'}},function(a,b,c){"use strict";var d=c(4),e={wrapper:{position:"relative",display:"inline-block"},hint:{position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none",opacity:"1"},input:{position:"relative",verticalAlign:"top",backgroundColor:"transparent"},inputWithNoHint:{position:"relative",verticalAlign:"top"},dropdown:{position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"},suggestions:{display:"block"},suggestion:{whiteSpace:"nowrap",cursor:"pointer"},suggestionChild:{whiteSpace:"normal"},ltr:{left:"0",right:"auto"},rtl:{left:"auto",right:"0"},defaultClasses:{root:"algolia-autocomplete",prefix:"aa",dropdownMenu:"dropdown-menu",input:"input",hint:"hint",suggestions:"suggestions",suggestion:"suggestion",cursor:"cursor",dataset:"dataset",empty:"empty"}};d.isMsie()&&d.mixin(e.input,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"}),d.isMsie()&&d.isMsie()<=7&&d.mixin(e.input,{marginTop:"-1px"}),a.exports=e},function(a,b,c){"use strict";a.exports={hits:c(16),popularIn:c(17)}},function(a,b,c){"use strict";var d=c(4);a.exports=function(a,b){function c(c,e){a.search(c,b,function(a,b){return a?void d.error(a.message):void e(b.hits,b)})}return c}},function(a,b,c){"use strict";var d=c(4);a.exports=function(a,b,c,e){function f(f,i){a.search(f,b,function(a,b){if(a)return void d.error(a.message);if(b.hits.length>0){var f=b.hits[0],j=d.mixin({hitsPerPage:0},c);return delete j.source,delete j.index,void h.search(g(f),j,function(a,c){if(a)return void d.error(a.message);var g=[];if(e.includeAll){var h=e.allTitle||"All departments";g.push(d.mixin({facet:{value:h,count:c.nbHits}},d.cloneDeep(f)))}d.each(c.facets,function(a,b){d.each(a,function(a,c){g.push(d.mixin({facet:{facet:b,value:c,count:a}},d.cloneDeep(f)))})});for(var j=1;j<b.hits.length;++j)g.push(b.hits[j]);i(g,b)})}i([])})}if(!c.source)return d.error("Missing 'source' key");var g=d.isFunction(c.source)?c.source:function(a){return a[c.source]};if(!c.index)return d.error("Missing 'index' key");var h=c.index;return e=e||{},f}}])});
// Ion.RangeSlider | version 2.1.3 | https://github.com/IonDen/ion.rangeSlider
;(function(g){"function"===typeof define&&define.amd?define(["jquery"],g(jQuery,document,window,navigator)):g(jQuery,document,window,navigator)})(function(g,r,h,t,v){var u=0,p=function(){var a=t.userAgent,b=/msie\s\d+/i;return 0<a.search(b)&&(a=b.exec(a).toString(),a=a.split(" ")[1],9>a)?(g("html").addClass("lt-ie9"),!0):!1}();Function.prototype.bind||(Function.prototype.bind=function(a){var b=this,d=[].slice;if("function"!=typeof b)throw new TypeError;var c=d.call(arguments,1),e=function(){if(this instanceof
e){var f=function(){};f.prototype=b.prototype;var f=new f,l=b.apply(f,c.concat(d.call(arguments)));return Object(l)===l?l:f}return b.apply(a,c.concat(d.call(arguments)))};return e});Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){var d;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),e=c.length>>>0;if(0===e)return-1;d=+b||0;Infinity===Math.abs(d)&&(d=0);if(d>=e)return-1;for(d=Math.max(0<=d?d:e-Math.abs(d),0);d<e;){if(d in c&&c[d]===a)return d;d++}return-1});
var q=function(a,b,d){this.VERSION="2.1.3";this.input=a;this.plugin_count=d;this.old_to=this.old_from=this.update_tm=this.calc_count=this.current_plugin=0;this.raf_id=this.old_min_interval=null;this.is_update=this.is_key=this.no_diapason=this.force_redraw=this.dragging=!1;this.is_start=!0;this.is_click=this.is_resize=this.is_active=this.is_finish=!1;this.$cache={win:g(h),body:g(r.body),input:g(a),cont:null,rs:null,min:null,max:null,from:null,to:null,single:null,bar:null,line:null,s_single:null,s_from:null,
s_to:null,shad_single:null,shad_from:null,shad_to:null,edge:null,grid:null,grid_labels:[]};this.coords={x_gap:0,x_pointer:0,w_rs:0,w_rs_old:0,w_handle:0,p_gap:0,p_gap_left:0,p_gap_right:0,p_step:0,p_pointer:0,p_handle:0,p_single_fake:0,p_single_real:0,p_from_fake:0,p_from_real:0,p_to_fake:0,p_to_real:0,p_bar_x:0,p_bar_w:0,grid_gap:0,big_num:0,big:[],big_w:[],big_p:[],big_x:[]};this.labels={w_min:0,w_max:0,w_from:0,w_to:0,w_single:0,p_min:0,p_max:0,p_from_fake:0,p_from_left:0,p_to_fake:0,p_to_left:0,
p_single_fake:0,p_single_left:0};var c=this.$cache.input;a=c.prop("value");var e;d={type:"single",min:10,max:100,from:null,to:null,step:1,min_interval:0,max_interval:0,drag_interval:!1,values:[],p_values:[],from_fixed:!1,from_min:null,from_max:null,from_shadow:!1,to_fixed:!1,to_min:null,to_max:null,to_shadow:!1,prettify_enabled:!0,prettify_separator:" ",prettify:null,force_edges:!1,keyboard:!1,keyboard_step:5,grid:!1,grid_margin:!0,grid_num:4,grid_snap:!1,hide_min_max:!1,hide_from_to:!1,prefix:"",
postfix:"",max_postfix:"",decorate_both:!0,values_separator:" \u2014 ",input_values_separator:";",disable:!1,onStart:null,onChange:null,onFinish:null,onUpdate:null};c={type:c.data("type"),min:c.data("min"),max:c.data("max"),from:c.data("from"),to:c.data("to"),step:c.data("step"),min_interval:c.data("minInterval"),max_interval:c.data("maxInterval"),drag_interval:c.data("dragInterval"),values:c.data("values"),from_fixed:c.data("fromFixed"),from_min:c.data("fromMin"),from_max:c.data("fromMax"),from_shadow:c.data("fromShadow"),
to_fixed:c.data("toFixed"),to_min:c.data("toMin"),to_max:c.data("toMax"),to_shadow:c.data("toShadow"),prettify_enabled:c.data("prettifyEnabled"),prettify_separator:c.data("prettifySeparator"),force_edges:c.data("forceEdges"),keyboard:c.data("keyboard"),keyboard_step:c.data("keyboardStep"),grid:c.data("grid"),grid_margin:c.data("gridMargin"),grid_num:c.data("gridNum"),grid_snap:c.data("gridSnap"),hide_min_max:c.data("hideMinMax"),hide_from_to:c.data("hideFromTo"),prefix:c.data("prefix"),postfix:c.data("postfix"),
max_postfix:c.data("maxPostfix"),decorate_both:c.data("decorateBoth"),values_separator:c.data("valuesSeparator"),input_values_separator:c.data("inputValuesSeparator"),disable:c.data("disable")};c.values=c.values&&c.values.split(",");for(e in c)c.hasOwnProperty(e)&&(c[e]||0===c[e]||delete c[e]);a&&(a=a.split(c.input_values_separator||b.input_values_separator||";"),a[0]&&a[0]==+a[0]&&(a[0]=+a[0]),a[1]&&a[1]==+a[1]&&(a[1]=+a[1]),b&&b.values&&b.values.length?(d.from=a[0]&&b.values.indexOf(a[0]),d.to=
a[1]&&b.values.indexOf(a[1])):(d.from=a[0]&&+a[0],d.to=a[1]&&+a[1]));g.extend(d,b);g.extend(d,c);this.options=d;this.validate();this.result={input:this.$cache.input,slider:null,min:this.options.min,max:this.options.max,from:this.options.from,from_percent:0,from_value:null,to:this.options.to,to_percent:0,to_value:null};this.init()};q.prototype={init:function(a){this.no_diapason=!1;this.coords.p_step=this.convertToPercent(this.options.step,!0);this.target="base";this.toggleInput();this.append();this.setMinMax();
a?(this.force_redraw=!0,this.calc(!0),this.callOnUpdate()):(this.force_redraw=!0,this.calc(!0),this.callOnStart());this.updateScene()},append:function(){this.$cache.input.before('<span class="irs js-irs-'+this.plugin_count+'"></span>');this.$cache.input.prop("readonly",!0);this.$cache.cont=this.$cache.input.prev();this.result.slider=this.$cache.cont;this.$cache.cont.html('<span class="irs"><span class="irs-line" tabindex="-1"><span class="irs-line-left"></span><span class="irs-line-mid"></span><span class="irs-line-right"></span></span><span class="irs-min">0</span><span class="irs-max">1</span><span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span></span><span class="irs-grid"></span><span class="irs-bar"></span>');
this.$cache.rs=this.$cache.cont.find(".irs");this.$cache.min=this.$cache.cont.find(".irs-min");this.$cache.max=this.$cache.cont.find(".irs-max");this.$cache.from=this.$cache.cont.find(".irs-from");this.$cache.to=this.$cache.cont.find(".irs-to");this.$cache.single=this.$cache.cont.find(".irs-single");this.$cache.bar=this.$cache.cont.find(".irs-bar");this.$cache.line=this.$cache.cont.find(".irs-line");this.$cache.grid=this.$cache.cont.find(".irs-grid");"single"===this.options.type?(this.$cache.cont.append('<span class="irs-bar-edge"></span><span class="irs-shadow shadow-single"></span><span class="irs-slider single"></span>'),
this.$cache.edge=this.$cache.cont.find(".irs-bar-edge"),this.$cache.s_single=this.$cache.cont.find(".single"),this.$cache.from[0].style.visibility="hidden",this.$cache.to[0].style.visibility="hidden",this.$cache.shad_single=this.$cache.cont.find(".shadow-single")):(this.$cache.cont.append('<span class="irs-shadow shadow-from"></span><span class="irs-shadow shadow-to"></span><span class="irs-slider from"></span><span class="irs-slider to"></span>'),this.$cache.s_from=this.$cache.cont.find(".from"),
this.$cache.s_to=this.$cache.cont.find(".to"),this.$cache.shad_from=this.$cache.cont.find(".shadow-from"),this.$cache.shad_to=this.$cache.cont.find(".shadow-to"),this.setTopHandler());this.options.hide_from_to&&(this.$cache.from[0].style.display="none",this.$cache.to[0].style.display="none",this.$cache.single[0].style.display="none");this.appendGrid();this.options.disable?(this.appendDisableMask(),this.$cache.input[0].disabled=!0):(this.$cache.cont.removeClass("irs-disabled"),this.$cache.input[0].disabled=
!1,this.bindEvents());this.options.drag_interval&&(this.$cache.bar[0].style.cursor="ew-resize")},setTopHandler:function(){var a=this.options.max,b=this.options.to;this.options.from>this.options.min&&b===a?this.$cache.s_from.addClass("type_last"):b<a&&this.$cache.s_to.addClass("type_last")},changeLevel:function(a){switch(a){case "single":this.coords.p_gap=this.toFixed(this.coords.p_pointer-this.coords.p_single_fake);break;case "from":this.coords.p_gap=this.toFixed(this.coords.p_pointer-this.coords.p_from_fake);
this.$cache.s_from.addClass("state_hover");this.$cache.s_from.addClass("type_last");this.$cache.s_to.removeClass("type_last");break;case "to":this.coords.p_gap=this.toFixed(this.coords.p_pointer-this.coords.p_to_fake);this.$cache.s_to.addClass("state_hover");this.$cache.s_to.addClass("type_last");this.$cache.s_from.removeClass("type_last");break;case "both":this.coords.p_gap_left=this.toFixed(this.coords.p_pointer-this.coords.p_from_fake),this.coords.p_gap_right=this.toFixed(this.coords.p_to_fake-
this.coords.p_pointer),this.$cache.s_to.removeClass("type_last"),this.$cache.s_from.removeClass("type_last")}},appendDisableMask:function(){this.$cache.cont.append('<span class="irs-disable-mask"></span>');this.$cache.cont.addClass("irs-disabled")},remove:function(){this.$cache.cont.remove();this.$cache.cont=null;this.$cache.line.off("keydown.irs_"+this.plugin_count);this.$cache.body.off("touchmove.irs_"+this.plugin_count);this.$cache.body.off("mousemove.irs_"+this.plugin_count);this.$cache.win.off("touchend.irs_"+
this.plugin_count);this.$cache.win.off("mouseup.irs_"+this.plugin_count);p&&(this.$cache.body.off("mouseup.irs_"+this.plugin_count),this.$cache.body.off("mouseleave.irs_"+this.plugin_count));this.$cache.grid_labels=[];this.coords.big=[];this.coords.big_w=[];this.coords.big_p=[];this.coords.big_x=[];cancelAnimationFrame(this.raf_id)},bindEvents:function(){if(!this.no_diapason){this.$cache.body.on("touchmove.irs_"+this.plugin_count,this.pointerMove.bind(this));this.$cache.body.on("mousemove.irs_"+this.plugin_count,
this.pointerMove.bind(this));this.$cache.win.on("touchend.irs_"+this.plugin_count,this.pointerUp.bind(this));this.$cache.win.on("mouseup.irs_"+this.plugin_count,this.pointerUp.bind(this));this.$cache.line.on("touchstart.irs_"+this.plugin_count,this.pointerClick.bind(this,"click"));this.$cache.line.on("mousedown.irs_"+this.plugin_count,this.pointerClick.bind(this,"click"));this.options.drag_interval&&"double"===this.options.type?(this.$cache.bar.on("touchstart.irs_"+this.plugin_count,this.pointerDown.bind(this,
"both")),this.$cache.bar.on("mousedown.irs_"+this.plugin_count,this.pointerDown.bind(this,"both"))):(this.$cache.bar.on("touchstart.irs_"+this.plugin_count,this.pointerClick.bind(this,"click")),this.$cache.bar.on("mousedown.irs_"+this.plugin_count,this.pointerClick.bind(this,"click")));"single"===this.options.type?(this.$cache.single.on("touchstart.irs_"+this.plugin_count,this.pointerDown.bind(this,"single")),this.$cache.s_single.on("touchstart.irs_"+this.plugin_count,this.pointerDown.bind(this,"single")),
this.$cache.shad_single.on("touchstart.irs_"+this.plugin_count,this.pointerClick.bind(this,"click")),this.$cache.single.on("mousedown.irs_"+this.plugin_count,this.pointerDown.bind(this,"single")),this.$cache.s_single.on("mousedown.irs_"+this.plugin_count,this.pointerDown.bind(this,"single")),this.$cache.edge.on("mousedown.irs_"+this.plugin_count,this.pointerClick.bind(this,"click")),this.$cache.shad_single.on("mousedown.irs_"+this.plugin_count,this.pointerClick.bind(this,"click"))):(this.$cache.single.on("touchstart.irs_"+
this.plugin_count,this.pointerDown.bind(this,null)),this.$cache.single.on("mousedown.irs_"+this.plugin_count,this.pointerDown.bind(this,null)),this.$cache.from.on("touchstart.irs_"+this.plugin_count,this.pointerDown.bind(this,"from")),this.$cache.s_from.on("touchstart.irs_"+this.plugin_count,this.pointerDown.bind(this,"from")),this.$cache.to.on("touchstart.irs_"+this.plugin_count,this.pointerDown.bind(this,"to")),this.$cache.s_to.on("touchstart.irs_"+this.plugin_count,this.pointerDown.bind(this,"to")),
this.$cache.shad_from.on("touchstart.irs_"+this.plugin_count,this.pointerClick.bind(this,"click")),this.$cache.shad_to.on("touchstart.irs_"+this.plugin_count,this.pointerClick.bind(this,"click")),this.$cache.from.on("mousedown.irs_"+this.plugin_count,this.pointerDown.bind(this,"from")),this.$cache.s_from.on("mousedown.irs_"+this.plugin_count,this.pointerDown.bind(this,"from")),this.$cache.to.on("mousedown.irs_"+this.plugin_count,this.pointerDown.bind(this,"to")),this.$cache.s_to.on("mousedown.irs_"+
this.plugin_count,this.pointerDown.bind(this,"to")),this.$cache.shad_from.on("mousedown.irs_"+this.plugin_count,this.pointerClick.bind(this,"click")),this.$cache.shad_to.on("mousedown.irs_"+this.plugin_count,this.pointerClick.bind(this,"click")));if(this.options.keyboard)this.$cache.line.on("keydown.irs_"+this.plugin_count,this.key.bind(this,"keyboard"));p&&(this.$cache.body.on("mouseup.irs_"+this.plugin_count,this.pointerUp.bind(this)),this.$cache.body.on("mouseleave.irs_"+this.plugin_count,this.pointerUp.bind(this)))}},
pointerMove:function(a){this.dragging&&(this.coords.x_pointer=(a.pageX||a.originalEvent.touches&&a.originalEvent.touches[0].pageX)-this.coords.x_gap,this.calc())},pointerUp:function(a){if(this.current_plugin===this.plugin_count&&this.is_active){this.is_active=!1;this.$cache.cont.find(".state_hover").removeClass("state_hover");this.force_redraw=!0;p&&g("*").prop("unselectable",!1);this.updateScene();this.restoreOriginalMinInterval();if(g.contains(this.$cache.cont[0],a.target)||this.dragging)this.is_finish=
!0,this.callOnFinish();this.dragging=!1}},pointerDown:function(a,b){b.preventDefault();var d=b.pageX||b.originalEvent.touches&&b.originalEvent.touches[0].pageX;2!==b.button&&("both"===a&&this.setTempMinInterval(),a||(a=this.target),this.current_plugin=this.plugin_count,this.target=a,this.dragging=this.is_active=!0,this.coords.x_gap=this.$cache.rs.offset().left,this.coords.x_pointer=d-this.coords.x_gap,this.calcPointerPercent(),this.changeLevel(a),p&&g("*").prop("unselectable",!0),this.$cache.line.trigger("focus"),
this.updateScene())},pointerClick:function(a,b){b.preventDefault();var d=b.pageX||b.originalEvent.touches&&b.originalEvent.touches[0].pageX;2!==b.button&&(this.current_plugin=this.plugin_count,this.target=a,this.is_click=!0,this.coords.x_gap=this.$cache.rs.offset().left,this.coords.x_pointer=+(d-this.coords.x_gap).toFixed(),this.force_redraw=!0,this.calc(),this.$cache.line.trigger("focus"))},key:function(a,b){if(!(this.current_plugin!==this.plugin_count||b.altKey||b.ctrlKey||b.shiftKey||b.metaKey)){switch(b.which){case 83:case 65:case 40:case 37:b.preventDefault();
this.moveByKey(!1);break;case 87:case 68:case 38:case 39:b.preventDefault(),this.moveByKey(!0)}return!0}},moveByKey:function(a){var b=this.coords.p_pointer,b=a?b+this.options.keyboard_step:b-this.options.keyboard_step;this.coords.x_pointer=this.toFixed(this.coords.w_rs/100*b);this.is_key=!0;this.calc()},setMinMax:function(){this.options&&(this.options.hide_min_max?(this.$cache.min[0].style.display="none",this.$cache.max[0].style.display="none"):(this.options.values.length?(this.$cache.min.html(this.decorate(this.options.p_values[this.options.min])),
this.$cache.max.html(this.decorate(this.options.p_values[this.options.max]))):(this.$cache.min.html(this.decorate(this._prettify(this.options.min),this.options.min)),this.$cache.max.html(this.decorate(this._prettify(this.options.max),this.options.max))),this.labels.w_min=this.$cache.min.outerWidth(!1),this.labels.w_max=this.$cache.max.outerWidth(!1)))},setTempMinInterval:function(){var a=this.result.to-this.result.from;null===this.old_min_interval&&(this.old_min_interval=this.options.min_interval);
this.options.min_interval=a},restoreOriginalMinInterval:function(){null!==this.old_min_interval&&(this.options.min_interval=this.old_min_interval,this.old_min_interval=null)},calc:function(a){if(this.options){this.calc_count++;if(10===this.calc_count||a)this.calc_count=0,this.coords.w_rs=this.$cache.rs.outerWidth(!1),this.calcHandlePercent();if(this.coords.w_rs){this.calcPointerPercent();a=this.getHandleX();"click"===this.target&&(this.coords.p_gap=this.coords.p_handle/2,a=this.getHandleX(),this.target=
this.options.drag_interval?"both_one":this.chooseHandle(a));switch(this.target){case "base":var b=(this.options.max-this.options.min)/100;a=(this.result.from-this.options.min)/b;b=(this.result.to-this.options.min)/b;this.coords.p_single_real=this.toFixed(a);this.coords.p_from_real=this.toFixed(a);this.coords.p_to_real=this.toFixed(b);this.coords.p_single_real=this.checkDiapason(this.coords.p_single_real,this.options.from_min,this.options.from_max);this.coords.p_from_real=this.checkDiapason(this.coords.p_from_real,
this.options.from_min,this.options.from_max);this.coords.p_to_real=this.checkDiapason(this.coords.p_to_real,this.options.to_min,this.options.to_max);this.coords.p_single_fake=this.convertToFakePercent(this.coords.p_single_real);this.coords.p_from_fake=this.convertToFakePercent(this.coords.p_from_real);this.coords.p_to_fake=this.convertToFakePercent(this.coords.p_to_real);this.target=null;break;case "single":if(this.options.from_fixed)break;this.coords.p_single_real=this.convertToRealPercent(a);this.coords.p_single_real=
this.calcWithStep(this.coords.p_single_real);this.coords.p_single_real=this.checkDiapason(this.coords.p_single_real,this.options.from_min,this.options.from_max);this.coords.p_single_fake=this.convertToFakePercent(this.coords.p_single_real);break;case "from":if(this.options.from_fixed)break;this.coords.p_from_real=this.convertToRealPercent(a);this.coords.p_from_real=this.calcWithStep(this.coords.p_from_real);this.coords.p_from_real>this.coords.p_to_real&&(this.coords.p_from_real=this.coords.p_to_real);
this.coords.p_from_real=this.checkDiapason(this.coords.p_from_real,this.options.from_min,this.options.from_max);this.coords.p_from_real=this.checkMinInterval(this.coords.p_from_real,this.coords.p_to_real,"from");this.coords.p_from_real=this.checkMaxInterval(this.coords.p_from_real,this.coords.p_to_real,"from");this.coords.p_from_fake=this.convertToFakePercent(this.coords.p_from_real);break;case "to":if(this.options.to_fixed)break;this.coords.p_to_real=this.convertToRealPercent(a);this.coords.p_to_real=
this.calcWithStep(this.coords.p_to_real);this.coords.p_to_real<this.coords.p_from_real&&(this.coords.p_to_real=this.coords.p_from_real);this.coords.p_to_real=this.checkDiapason(this.coords.p_to_real,this.options.to_min,this.options.to_max);this.coords.p_to_real=this.checkMinInterval(this.coords.p_to_real,this.coords.p_from_real,"to");this.coords.p_to_real=this.checkMaxInterval(this.coords.p_to_real,this.coords.p_from_real,"to");this.coords.p_to_fake=this.convertToFakePercent(this.coords.p_to_real);
break;case "both":if(this.options.from_fixed||this.options.to_fixed)break;a=this.toFixed(a+.1*this.coords.p_handle);this.coords.p_from_real=this.convertToRealPercent(a)-this.coords.p_gap_left;this.coords.p_from_real=this.calcWithStep(this.coords.p_from_real);this.coords.p_from_real=this.checkDiapason(this.coords.p_from_real,this.options.from_min,this.options.from_max);this.coords.p_from_real=this.checkMinInterval(this.coords.p_from_real,this.coords.p_to_real,"from");this.coords.p_from_fake=this.convertToFakePercent(this.coords.p_from_real);
this.coords.p_to_real=this.convertToRealPercent(a)+this.coords.p_gap_right;this.coords.p_to_real=this.calcWithStep(this.coords.p_to_real);this.coords.p_to_real=this.checkDiapason(this.coords.p_to_real,this.options.to_min,this.options.to_max);this.coords.p_to_real=this.checkMinInterval(this.coords.p_to_real,this.coords.p_from_real,"to");this.coords.p_to_fake=this.convertToFakePercent(this.coords.p_to_real);break;case "both_one":if(!this.options.from_fixed&&!this.options.to_fixed){var d=this.convertToRealPercent(a);
a=this.result.to_percent-this.result.from_percent;var c=a/2,b=d-c,d=d+c;0>b&&(b=0,d=b+a);100<d&&(d=100,b=d-a);this.coords.p_from_real=this.calcWithStep(b);this.coords.p_from_real=this.checkDiapason(this.coords.p_from_real,this.options.from_min,this.options.from_max);this.coords.p_from_fake=this.convertToFakePercent(this.coords.p_from_real);this.coords.p_to_real=this.calcWithStep(d);this.coords.p_to_real=this.checkDiapason(this.coords.p_to_real,this.options.to_min,this.options.to_max);this.coords.p_to_fake=
this.convertToFakePercent(this.coords.p_to_real)}}"single"===this.options.type?(this.coords.p_bar_x=this.coords.p_handle/2,this.coords.p_bar_w=this.coords.p_single_fake,this.result.from_percent=this.coords.p_single_real,this.result.from=this.convertToValue(this.coords.p_single_real),this.options.values.length&&(this.result.from_value=this.options.values[this.result.from])):(this.coords.p_bar_x=this.toFixed(this.coords.p_from_fake+this.coords.p_handle/2),this.coords.p_bar_w=this.toFixed(this.coords.p_to_fake-
this.coords.p_from_fake),this.result.from_percent=this.coords.p_from_real,this.result.from=this.convertToValue(this.coords.p_from_real),this.result.to_percent=this.coords.p_to_real,this.result.to=this.convertToValue(this.coords.p_to_real),this.options.values.length&&(this.result.from_value=this.options.values[this.result.from],this.result.to_value=this.options.values[this.result.to]));this.calcMinMax();this.calcLabels()}}},calcPointerPercent:function(){this.coords.w_rs?(0>this.coords.x_pointer||isNaN(this.coords.x_pointer)?
this.coords.x_pointer=0:this.coords.x_pointer>this.coords.w_rs&&(this.coords.x_pointer=this.coords.w_rs),this.coords.p_pointer=this.toFixed(this.coords.x_pointer/this.coords.w_rs*100)):this.coords.p_pointer=0},convertToRealPercent:function(a){return a/(100-this.coords.p_handle)*100},convertToFakePercent:function(a){return a/100*(100-this.coords.p_handle)},getHandleX:function(){var a=100-this.coords.p_handle,b=this.toFixed(this.coords.p_pointer-this.coords.p_gap);0>b?b=0:b>a&&(b=a);return b},calcHandlePercent:function(){this.coords.w_handle=
"single"===this.options.type?this.$cache.s_single.outerWidth(!1):this.$cache.s_from.outerWidth(!1);this.coords.p_handle=this.toFixed(this.coords.w_handle/this.coords.w_rs*100)},chooseHandle:function(a){return"single"===this.options.type?"single":a>=this.coords.p_from_real+(this.coords.p_to_real-this.coords.p_from_real)/2?this.options.to_fixed?"from":"to":this.options.from_fixed?"to":"from"},calcMinMax:function(){this.coords.w_rs&&(this.labels.p_min=this.labels.w_min/this.coords.w_rs*100,this.labels.p_max=
this.labels.w_max/this.coords.w_rs*100)},calcLabels:function(){this.coords.w_rs&&!this.options.hide_from_to&&("single"===this.options.type?(this.labels.w_single=this.$cache.single.outerWidth(!1),this.labels.p_single_fake=this.labels.w_single/this.coords.w_rs*100,this.labels.p_single_left=this.coords.p_single_fake+this.coords.p_handle/2-this.labels.p_single_fake/2):(this.labels.w_from=this.$cache.from.outerWidth(!1),this.labels.p_from_fake=this.labels.w_from/this.coords.w_rs*100,this.labels.p_from_left=
this.coords.p_from_fake+this.coords.p_handle/2-this.labels.p_from_fake/2,this.labels.p_from_left=this.toFixed(this.labels.p_from_left),this.labels.p_from_left=this.checkEdges(this.labels.p_from_left,this.labels.p_from_fake),this.labels.w_to=this.$cache.to.outerWidth(!1),this.labels.p_to_fake=this.labels.w_to/this.coords.w_rs*100,this.labels.p_to_left=this.coords.p_to_fake+this.coords.p_handle/2-this.labels.p_to_fake/2,this.labels.p_to_left=this.toFixed(this.labels.p_to_left),this.labels.p_to_left=
this.checkEdges(this.labels.p_to_left,this.labels.p_to_fake),this.labels.w_single=this.$cache.single.outerWidth(!1),this.labels.p_single_fake=this.labels.w_single/this.coords.w_rs*100,this.labels.p_single_left=(this.labels.p_from_left+this.labels.p_to_left+this.labels.p_to_fake)/2-this.labels.p_single_fake/2,this.labels.p_single_left=this.toFixed(this.labels.p_single_left)),this.labels.p_single_left=this.checkEdges(this.labels.p_single_left,this.labels.p_single_fake))},updateScene:function(){this.raf_id&&
(cancelAnimationFrame(this.raf_id),this.raf_id=null);clearTimeout(this.update_tm);this.update_tm=null;this.options&&(this.drawHandles(),this.is_active?this.raf_id=requestAnimationFrame(this.updateScene.bind(this)):this.update_tm=setTimeout(this.updateScene.bind(this),300))},drawHandles:function(){this.coords.w_rs=this.$cache.rs.outerWidth(!1);if(this.coords.w_rs){this.coords.w_rs!==this.coords.w_rs_old&&(this.target="base",this.is_resize=!0);if(this.coords.w_rs!==this.coords.w_rs_old||this.force_redraw)this.setMinMax(),
this.calc(!0),this.drawLabels(),this.options.grid&&(this.calcGridMargin(),this.calcGridLabels()),this.force_redraw=!0,this.coords.w_rs_old=this.coords.w_rs,this.drawShadow();if(this.coords.w_rs&&(this.dragging||this.force_redraw||this.is_key)){if(this.old_from!==this.result.from||this.old_to!==this.result.to||this.force_redraw||this.is_key){this.drawLabels();this.$cache.bar[0].style.left=this.coords.p_bar_x+"%";this.$cache.bar[0].style.width=this.coords.p_bar_w+"%";if("single"===this.options.type)this.$cache.s_single[0].style.left=
this.coords.p_single_fake+"%",this.$cache.single[0].style.left=this.labels.p_single_left+"%",this.options.values.length?this.$cache.input.prop("value",this.result.from_value):this.$cache.input.prop("value",this.result.from),this.$cache.input.data("from",this.result.from);else{this.$cache.s_from[0].style.left=this.coords.p_from_fake+"%";this.$cache.s_to[0].style.left=this.coords.p_to_fake+"%";if(this.old_from!==this.result.from||this.force_redraw)this.$cache.from[0].style.left=this.labels.p_from_left+
"%";if(this.old_to!==this.result.to||this.force_redraw)this.$cache.to[0].style.left=this.labels.p_to_left+"%";this.$cache.single[0].style.left=this.labels.p_single_left+"%";this.options.values.length?this.$cache.input.prop("value",this.result.from_value+this.options.input_values_separator+this.result.to_value):this.$cache.input.prop("value",this.result.from+this.options.input_values_separator+this.result.to);this.$cache.input.data("from",this.result.from);this.$cache.input.data("to",this.result.to)}this.old_from===
this.result.from&&this.old_to===this.result.to||this.is_start||this.$cache.input.trigger("change");this.old_from=this.result.from;this.old_to=this.result.to;this.is_resize||this.is_update||this.is_start||this.is_finish||this.callOnChange();if(this.is_key||this.is_click)this.is_click=this.is_key=!1,this.callOnFinish();this.is_finish=this.is_resize=this.is_update=!1}this.force_redraw=this.is_click=this.is_key=this.is_start=!1}}},drawLabels:function(){if(this.options){var a=this.options.values.length,
b=this.options.p_values,d;if(!this.options.hide_from_to)if("single"===this.options.type)a=a?this.decorate(b[this.result.from]):this.decorate(this._prettify(this.result.from),this.result.from),this.$cache.single.html(a),this.calcLabels(),this.$cache.min[0].style.visibility=this.labels.p_single_left<this.labels.p_min+1?"hidden":"visible",this.$cache.max[0].style.visibility=this.labels.p_single_left+this.labels.p_single_fake>100-this.labels.p_max-1?"hidden":"visible";else{a?(this.options.decorate_both?
(a=this.decorate(b[this.result.from]),a+=this.options.values_separator,a+=this.decorate(b[this.result.to])):a=this.decorate(b[this.result.from]+this.options.values_separator+b[this.result.to]),d=this.decorate(b[this.result.from]),b=this.decorate(b[this.result.to])):(this.options.decorate_both?(a=this.decorate(this._prettify(this.result.from),this.result.from),a+=this.options.values_separator,a+=this.decorate(this._prettify(this.result.to),this.result.to)):a=this.decorate(this._prettify(this.result.from)+
this.options.values_separator+this._prettify(this.result.to),this.result.to),d=this.decorate(this._prettify(this.result.from),this.result.from),b=this.decorate(this._prettify(this.result.to),this.result.to));this.$cache.single.html(a);this.$cache.from.html(d);this.$cache.to.html(b);this.calcLabels();b=Math.min(this.labels.p_single_left,this.labels.p_from_left);a=this.labels.p_single_left+this.labels.p_single_fake;d=this.labels.p_to_left+this.labels.p_to_fake;var c=Math.max(a,d);this.labels.p_from_left+
this.labels.p_from_fake>=this.labels.p_to_left?(this.$cache.from[0].style.visibility="hidden",this.$cache.to[0].style.visibility="hidden",this.$cache.single[0].style.visibility="visible",this.result.from===this.result.to?("from"===this.target?this.$cache.from[0].style.visibility="visible":"to"===this.target&&(this.$cache.to[0].style.visibility="visible"),this.$cache.single[0].style.visibility="hidden",c=d):(this.$cache.from[0].style.visibility="hidden",this.$cache.to[0].style.visibility="hidden",
this.$cache.single[0].style.visibility="visible",c=Math.max(a,d))):(this.$cache.from[0].style.visibility="visible",this.$cache.to[0].style.visibility="visible",this.$cache.single[0].style.visibility="hidden");this.$cache.min[0].style.visibility=b<this.labels.p_min+1?"hidden":"visible";this.$cache.max[0].style.visibility=c>100-this.labels.p_max-1?"hidden":"visible"}}},drawShadow:function(){var a=this.options,b=this.$cache,d="number"===typeof a.from_min&&!isNaN(a.from_min),c="number"===typeof a.from_max&&
!isNaN(a.from_max),e="number"===typeof a.to_min&&!isNaN(a.to_min),f="number"===typeof a.to_max&&!isNaN(a.to_max);"single"===a.type?a.from_shadow&&(d||c)?(d=this.convertToPercent(d?a.from_min:a.min),c=this.convertToPercent(c?a.from_max:a.max)-d,d=this.toFixed(d-this.coords.p_handle/100*d),c=this.toFixed(c-this.coords.p_handle/100*c),d+=this.coords.p_handle/2,b.shad_single[0].style.display="block",b.shad_single[0].style.left=d+"%",b.shad_single[0].style.width=c+"%"):b.shad_single[0].style.display="none":
(a.from_shadow&&(d||c)?(d=this.convertToPercent(d?a.from_min:a.min),c=this.convertToPercent(c?a.from_max:a.max)-d,d=this.toFixed(d-this.coords.p_handle/100*d),c=this.toFixed(c-this.coords.p_handle/100*c),d+=this.coords.p_handle/2,b.shad_from[0].style.display="block",b.shad_from[0].style.left=d+"%",b.shad_from[0].style.width=c+"%"):b.shad_from[0].style.display="none",a.to_shadow&&(e||f)?(e=this.convertToPercent(e?a.to_min:a.min),a=this.convertToPercent(f?a.to_max:a.max)-e,e=this.toFixed(e-this.coords.p_handle/
100*e),a=this.toFixed(a-this.coords.p_handle/100*a),e+=this.coords.p_handle/2,b.shad_to[0].style.display="block",b.shad_to[0].style.left=e+"%",b.shad_to[0].style.width=a+"%"):b.shad_to[0].style.display="none")},callOnStart:function(){if(this.options.onStart&&"function"===typeof this.options.onStart)this.options.onStart(this.result)},callOnChange:function(){if(this.options.onChange&&"function"===typeof this.options.onChange)this.options.onChange(this.result)},callOnFinish:function(){if(this.options.onFinish&&
"function"===typeof this.options.onFinish)this.options.onFinish(this.result)},callOnUpdate:function(){if(this.options.onUpdate&&"function"===typeof this.options.onUpdate)this.options.onUpdate(this.result)},toggleInput:function(){this.$cache.input.toggleClass("irs-hidden-input")},convertToPercent:function(a,b){var d=this.options.max-this.options.min;return d?this.toFixed((b?a:a-this.options.min)/(d/100)):(this.no_diapason=!0,0)},convertToValue:function(a){var b=this.options.min,d=this.options.max,
c=b.toString().split(".")[1],e=d.toString().split(".")[1],f,l,g=0,k=0;if(0===a)return this.options.min;if(100===a)return this.options.max;c&&(g=f=c.length);e&&(g=l=e.length);f&&l&&(g=f>=l?f:l);0>b&&(k=Math.abs(b),b=+(b+k).toFixed(g),d=+(d+k).toFixed(g));a=(d-b)/100*a+b;(b=this.options.step.toString().split(".")[1])?a=+a.toFixed(b.length):(a/=this.options.step,a*=this.options.step,a=+a.toFixed(0));k&&(a-=k);k=b?+a.toFixed(b.length):this.toFixed(a);k<this.options.min?k=this.options.min:k>this.options.max&&
(k=this.options.max);return k},calcWithStep:function(a){var b=Math.round(a/this.coords.p_step)*this.coords.p_step;100<b&&(b=100);100===a&&(b=100);return this.toFixed(b)},checkMinInterval:function(a,b,d){var c=this.options;if(!c.min_interval)return a;a=this.convertToValue(a);b=this.convertToValue(b);"from"===d?b-a<c.min_interval&&(a=b-c.min_interval):a-b<c.min_interval&&(a=b+c.min_interval);return this.convertToPercent(a)},checkMaxInterval:function(a,b,d){var c=this.options;if(!c.max_interval)return a;
a=this.convertToValue(a);b=this.convertToValue(b);"from"===d?b-a>c.max_interval&&(a=b-c.max_interval):a-b>c.max_interval&&(a=b+c.max_interval);return this.convertToPercent(a)},checkDiapason:function(a,b,d){a=this.convertToValue(a);var c=this.options;"number"!==typeof b&&(b=c.min);"number"!==typeof d&&(d=c.max);a<b&&(a=b);a>d&&(a=d);return this.convertToPercent(a)},toFixed:function(a){a=a.toFixed(9);return+a},_prettify:function(a){return this.options.prettify_enabled?this.options.prettify&&"function"===
typeof this.options.prettify?this.options.prettify(a):this.prettify(a):a},prettify:function(a){return a.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g,"$1"+this.options.prettify_separator)},checkEdges:function(a,b){if(!this.options.force_edges)return this.toFixed(a);0>a?a=0:a>100-b&&(a=100-b);return this.toFixed(a)},validate:function(){var a=this.options,b=this.result,d=a.values,c=d.length,e,f;"string"===typeof a.min&&(a.min=+a.min);"string"===typeof a.max&&(a.max=+a.max);"string"===typeof a.from&&
(a.from=+a.from);"string"===typeof a.to&&(a.to=+a.to);"string"===typeof a.step&&(a.step=+a.step);"string"===typeof a.from_min&&(a.from_min=+a.from_min);"string"===typeof a.from_max&&(a.from_max=+a.from_max);"string"===typeof a.to_min&&(a.to_min=+a.to_min);"string"===typeof a.to_max&&(a.to_max=+a.to_max);"string"===typeof a.keyboard_step&&(a.keyboard_step=+a.keyboard_step);"string"===typeof a.grid_num&&(a.grid_num=+a.grid_num);a.max<a.min&&(a.max=a.min);if(c)for(a.p_values=[],a.min=0,a.max=c-1,a.step=
1,a.grid_num=a.max,a.grid_snap=!0,f=0;f<c;f++)e=+d[f],isNaN(e)?e=d[f]:(d[f]=e,e=this._prettify(e)),a.p_values.push(e);if("number"!==typeof a.from||isNaN(a.from))a.from=a.min;if("number"!==typeof a.to||isNaN(a.from))a.to=a.max;if("single"===a.type)a.from<a.min&&(a.from=a.min),a.from>a.max&&(a.from=a.max);else{if(a.from<a.min||a.from>a.max)a.from=a.min;if(a.to>a.max||a.to<a.min)a.to=a.max;a.from>a.to&&(a.from=a.to)}if("number"!==typeof a.step||isNaN(a.step)||!a.step||0>a.step)a.step=1;if("number"!==
typeof a.keyboard_step||isNaN(a.keyboard_step)||!a.keyboard_step||0>a.keyboard_step)a.keyboard_step=5;"number"===typeof a.from_min&&a.from<a.from_min&&(a.from=a.from_min);"number"===typeof a.from_max&&a.from>a.from_max&&(a.from=a.from_max);"number"===typeof a.to_min&&a.to<a.to_min&&(a.to=a.to_min);"number"===typeof a.to_max&&a.from>a.to_max&&(a.to=a.to_max);if(b){b.min!==a.min&&(b.min=a.min);b.max!==a.max&&(b.max=a.max);if(b.from<b.min||b.from>b.max)b.from=a.from;if(b.to<b.min||b.to>b.max)b.to=a.to}if("number"!==
typeof a.min_interval||isNaN(a.min_interval)||!a.min_interval||0>a.min_interval)a.min_interval=0;if("number"!==typeof a.max_interval||isNaN(a.max_interval)||!a.max_interval||0>a.max_interval)a.max_interval=0;a.min_interval&&a.min_interval>a.max-a.min&&(a.min_interval=a.max-a.min);a.max_interval&&a.max_interval>a.max-a.min&&(a.max_interval=a.max-a.min)},decorate:function(a,b){var d="",c=this.options;c.prefix&&(d+=c.prefix);d+=a;c.max_postfix&&(c.values.length&&a===c.p_values[c.max]?(d+=c.max_postfix,
c.postfix&&(d+=" ")):b===c.max&&(d+=c.max_postfix,c.postfix&&(d+=" ")));c.postfix&&(d+=c.postfix);return d},updateFrom:function(){this.result.from=this.options.from;this.result.from_percent=this.convertToPercent(this.result.from);this.options.values&&(this.result.from_value=this.options.values[this.result.from])},updateTo:function(){this.result.to=this.options.to;this.result.to_percent=this.convertToPercent(this.result.to);this.options.values&&(this.result.to_value=this.options.values[this.result.to])},
updateResult:function(){this.result.min=this.options.min;this.result.max=this.options.max;this.updateFrom();this.updateTo()},appendGrid:function(){if(this.options.grid){var a=this.options,b,d;b=a.max-a.min;var c=a.grid_num,e=0,f=0,g=4,h,k,m=0,n="";this.calcGridMargin();a.grid_snap?(c=b/a.step,e=this.toFixed(a.step/(b/100))):e=this.toFixed(100/c);4<c&&(g=3);7<c&&(g=2);14<c&&(g=1);28<c&&(g=0);for(b=0;b<c+1;b++){h=g;f=this.toFixed(e*b);100<f&&(f=100,h-=2,0>h&&(h=0));this.coords.big[b]=f;k=(f-e*(b-1))/
(h+1);for(d=1;d<=h&&0!==f;d++)m=this.toFixed(f-k*d),n+='<span class="irs-grid-pol small" style="left: '+m+'%"></span>';n+='<span class="irs-grid-pol" style="left: '+f+'%"></span>';m=this.convertToValue(f);m=a.values.length?a.p_values[m]:this._prettify(m);n+='<span class="irs-grid-text js-grid-text-'+b+'" style="left: '+f+'%">'+m+"</span>"}this.coords.big_num=Math.ceil(c+1);this.$cache.cont.addClass("irs-with-grid");this.$cache.grid.html(n);this.cacheGridLabels()}},cacheGridLabels:function(){var a,
b,d=this.coords.big_num;for(b=0;b<d;b++)a=this.$cache.grid.find(".js-grid-text-"+b),this.$cache.grid_labels.push(a);this.calcGridLabels()},calcGridLabels:function(){var a,b;b=[];var d=[],c=this.coords.big_num;for(a=0;a<c;a++)this.coords.big_w[a]=this.$cache.grid_labels[a].outerWidth(!1),this.coords.big_p[a]=this.toFixed(this.coords.big_w[a]/this.coords.w_rs*100),this.coords.big_x[a]=this.toFixed(this.coords.big_p[a]/2),b[a]=this.toFixed(this.coords.big[a]-this.coords.big_x[a]),d[a]=this.toFixed(b[a]+
this.coords.big_p[a]);this.options.force_edges&&(b[0]<-this.coords.grid_gap&&(b[0]=-this.coords.grid_gap,d[0]=this.toFixed(b[0]+this.coords.big_p[0]),this.coords.big_x[0]=this.coords.grid_gap),d[c-1]>100+this.coords.grid_gap&&(d[c-1]=100+this.coords.grid_gap,b[c-1]=this.toFixed(d[c-1]-this.coords.big_p[c-1]),this.coords.big_x[c-1]=this.toFixed(this.coords.big_p[c-1]-this.coords.grid_gap)));this.calcGridCollision(2,b,d);this.calcGridCollision(4,b,d);for(a=0;a<c;a++)b=this.$cache.grid_labels[a][0],
b.style.marginLeft=-this.coords.big_x[a]+"%"},calcGridCollision:function(a,b,d){var c,e,f,g=this.coords.big_num;for(c=0;c<g;c+=a){e=c+a/2;if(e>=g)break;f=this.$cache.grid_labels[e][0];f.style.visibility=d[c]<=b[e]?"visible":"hidden"}},calcGridMargin:function(){this.options.grid_margin&&(this.coords.w_rs=this.$cache.rs.outerWidth(!1),this.coords.w_rs&&(this.coords.w_handle="single"===this.options.type?this.$cache.s_single.outerWidth(!1):this.$cache.s_from.outerWidth(!1),this.coords.p_handle=this.toFixed(this.coords.w_handle/
this.coords.w_rs*100),this.coords.grid_gap=this.toFixed(this.coords.p_handle/2-.1),this.$cache.grid[0].style.width=this.toFixed(100-this.coords.p_handle)+"%",this.$cache.grid[0].style.left=this.coords.grid_gap+"%"))},update:function(a){this.input&&(this.is_update=!0,this.options.from=this.result.from,this.options.to=this.result.to,this.options=g.extend(this.options,a),this.validate(),this.updateResult(a),this.toggleInput(),this.remove(),this.init(!0))},reset:function(){this.input&&(this.updateResult(),
this.update())},destroy:function(){this.input&&(this.toggleInput(),this.$cache.input.prop("readonly",!1),g.data(this.input,"ionRangeSlider",null),this.remove(),this.options=this.input=null)}};g.fn.ionRangeSlider=function(a){return this.each(function(){g.data(this,"ionRangeSlider")||g.data(this,"ionRangeSlider",new q(this,a,u++))})};(function(){for(var a=0,b=["ms","moz","webkit","o"],d=0;d<b.length&&!h.requestAnimationFrame;++d)h.requestAnimationFrame=h[b[d]+"RequestAnimationFrame"],h.cancelAnimationFrame=
h[b[d]+"CancelAnimationFrame"]||h[b[d]+"CancelRequestAnimationFrame"];h.requestAnimationFrame||(h.requestAnimationFrame=function(b,d){var f=(new Date).getTime(),g=Math.max(0,16-(f-a)),p=h.setTimeout(function(){b(f+g)},g);a=f+g;return p});h.cancelAnimationFrame||(h.cancelAnimationFrame=function(a){clearTimeout(a)})})()});

"function"!==typeof Object.create&&(Object.create=function(f){function g(){}g.prototype=f;return new g});
(function(f,g,k){var l={init:function(a,b){this.$elem=f(b);this.options=f.extend({},f.fn.owlCarousel.options,this.$elem.data(),a);this.userOptions=a;this.loadContent()},loadContent:function(){function a(a){var d,e="";if("function"===typeof b.options.jsonSuccess)b.options.jsonSuccess.apply(this,[a]);else{for(d in a.owl)a.owl.hasOwnProperty(d)&&(e+=a.owl[d].item);b.$elem.html(e)}b.logIn()}var b=this,e;"function"===typeof b.options.beforeInit&&b.options.beforeInit.apply(this,[b.$elem]);"string"===typeof b.options.jsonPath?
(e=b.options.jsonPath,f.getJSON(e,a)):b.logIn()},logIn:function(){this.$elem.data("owl-originalStyles",this.$elem.attr("style"));this.$elem.data("owl-originalClasses",this.$elem.attr("class"));this.$elem.css({opacity:0});this.orignalItems=this.options.items;this.checkBrowser();this.wrapperWidth=0;this.checkVisible=null;this.setVars()},setVars:function(){if(0===this.$elem.children().length)return!1;this.baseClass();this.eventTypes();this.$userItems=this.$elem.children();this.itemsAmount=this.$userItems.length;
this.wrapItems();this.$owlItems=this.$elem.find(".owl-item");this.$owlWrapper=this.$elem.find(".owl-wrapper");this.playDirection="next";this.prevItem=0;this.prevArr=[0];this.currentItem=0;this.customEvents();this.onStartup()},onStartup:function(){this.updateItems();this.calculateAll();this.buildControls();this.updateControls();this.response();this.moveEvents();this.stopOnHover();this.owlStatus();!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle);!0===this.options.autoPlay&&
(this.options.autoPlay=5E3);this.play();this.$elem.find(".owl-wrapper").css("display","block");this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility();this.onstartup=!1;this.eachMoveUpdate();"function"===typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad();!0===this.options.autoHeight&&this.autoHeight();this.onVisibleItems();"function"===typeof this.options.afterAction&&this.options.afterAction.apply(this,
[this.$elem])},updateVars:function(){"function"===typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]);this.watchVisibility();this.updateItems();this.calculateAll();this.updatePosition();this.updateControls();this.eachMoveUpdate();"function"===typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var a=this;g.setTimeout(function(){a.updateVars()},0)},watchVisibility:function(){var a=this;if(!1===a.$elem.is(":visible"))a.$elem.css({opacity:0}),
g.clearInterval(a.autoPlayInterval),g.clearInterval(a.checkVisible);else return!1;a.checkVisible=g.setInterval(function(){a.$elem.is(":visible")&&(a.reload(),a.$elem.animate({opacity:1},200),g.clearInterval(a.checkVisible))},500)},wrapItems:function(){this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');this.wrapperOuter=this.$elem.find(".owl-wrapper-outer");this.$elem.css("display","block")},
baseClass:function(){var a=this.$elem.hasClass(this.options.baseClass),b=this.$elem.hasClass(this.options.theme);a||this.$elem.addClass(this.options.baseClass);b||this.$elem.addClass(this.options.theme)},updateItems:function(){var a,b;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall=
!1,this.options.itemsMobile=!1;a=f(this.options.responsiveBaseWidth).width();a>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems);if(!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort(function(a,b){return a[0]-b[0]}),b=0;b<this.options.itemsCustom.length;b+=1)this.options.itemsCustom[b][0]<=a&&(this.options.items=this.options.itemsCustom[b][1]);else a<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]),
a<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),a<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),a<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),a<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&&
!0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var a=this,b,e;if(!0!==a.options.responsive)return!1;e=f(g).width();a.resizer=function(){f(g).width()!==e&&(!1!==a.options.autoPlay&&g.clearInterval(a.autoPlayInterval),g.clearTimeout(b),b=g.setTimeout(function(){e=f(g).width();a.updateVars()},a.options.responsiveRefreshRate))};f(g).resize(a.resizer)},updatePosition:function(){this.jumpTo(this.currentItem);!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var a=
this,b=0,e=a.itemsAmount-a.options.items;a.$owlItems.each(function(c){var d=f(this);d.css({width:a.itemWidth}).data("owl-item",Number(c));if(0===c%a.options.items||c===e)c>e||(b+=1);d.data("owl-roundPages",b)})},appendWrapperSizes:function(){this.$owlWrapper.css({width:this.$owlItems.length*this.itemWidth*2,left:0});this.appendItemsSizes()},calculateAll:function(){this.calculateWidth();this.appendWrapperSizes();this.loops();this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/
this.options.items)},max:function(){var a=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);this.options.items>this.itemsAmount?this.maximumPixels=a=this.maximumItem=0:(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=a);return a},min:function(){return 0},loops:function(){var a=0,b=0,e,c;this.positionsInArray=[0];this.pagesInArray=[];for(e=0;e<this.itemsAmount;e+=1)b+=this.itemWidth,this.positionsInArray.push(-b),!0===this.options.scrollPerPage&&(c=f(this.$owlItems[e]),
c=c.data("owl-roundPages"),c!==a&&(this.pagesInArray[a]=this.positionsInArray[e],a=c))},buildControls:function(){if(!0===this.options.navigation||!0===this.options.pagination)this.owlControls=f('<div class="owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem);!0===this.options.pagination&&this.buildPagination();!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var a=this,b=f('<div class="owl-buttons"/>');a.owlControls.append(b);a.buttonPrev=
f("<div/>",{"class":"owl-prev",html:a.options.navigationText[0]||""});a.buttonNext=f("<div/>",{"class":"owl-next",html:a.options.navigationText[1]||""});b.append(a.buttonPrev).append(a.buttonNext);b.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(a){a.preventDefault()});b.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(b){b.preventDefault();f(this).hasClass("owl-next")?a.next():a.prev()})},buildPagination:function(){var a=this;a.paginationWrapper=
f('<div class="owl-pagination"/>');a.owlControls.append(a.paginationWrapper);a.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(b){b.preventDefault();Number(f(this).data("owl-page"))!==a.currentItem&&a.goTo(Number(f(this).data("owl-page")),!0)})},updatePagination:function(){var a,b,e,c,d,g;if(!1===this.options.pagination)return!1;this.paginationWrapper.html("");a=0;b=this.itemsAmount-this.itemsAmount%this.options.items;for(c=0;c<this.itemsAmount;c+=1)0===c%this.options.items&&
(a+=1,b===c&&(e=this.itemsAmount-this.options.items),d=f("<div/>",{"class":"owl-page"}),g=f("<span></span>",{text:!0===this.options.paginationNumbers?a:"","class":!0===this.options.paginationNumbers?"owl-numbers":""}),d.append(g),d.data("owl-page",b===c?e:c),d.data("owl-roundPages",a),this.paginationWrapper.append(d));this.checkPagination()},checkPagination:function(){var a=this;if(!1===a.options.pagination)return!1;a.paginationWrapper.find(".owl-page").each(function(){f(this).data("owl-roundPages")===
f(a.$owlItems[a.currentItem]).data("owl-roundPages")&&(a.paginationWrapper.find(".owl-page").removeClass("active"),f(this).addClass("active"))})},checkNavigation:function(){if(!1===this.options.navigation)return!1;!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem===
this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled")))},updateControls:function(){this.updatePagination();this.checkNavigation();this.owlControls&&(this.options.items>=this.itemsAmount?this.owlControls.hide():this.owlControls.show())},destroyControls:function(){this.owlControls&&this.owlControls.remove()},next:function(a){if(this.isTransition)return!1;
this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1;if(this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0))if(!0===this.options.rewindNav)this.currentItem=0,a="rewind";else return this.currentItem=this.maximumItem,!1;this.goTo(this.currentItem,a)},prev:function(a){if(this.isTransition)return!1;this.currentItem=!0===this.options.scrollPerPage&&0<this.currentItem&&this.currentItem<this.options.items?0:this.currentItem-(!0===this.options.scrollPerPage?
this.options.items:1);if(0>this.currentItem)if(!0===this.options.rewindNav)this.currentItem=this.maximumItem,a="rewind";else return this.currentItem=0,!1;this.goTo(this.currentItem,a)},goTo:function(a,b,e){var c=this;if(c.isTransition)return!1;"function"===typeof c.options.beforeMove&&c.options.beforeMove.apply(this,[c.$elem]);a>=c.maximumItem?a=c.maximumItem:0>=a&&(a=0);c.currentItem=c.owl.currentItem=a;if(!1!==c.options.transitionStyle&&"drag"!==e&&1===c.options.items&&!0===c.browser.support3d)return c.swapSpeed(0),
!0===c.browser.support3d?c.transition3d(c.positionsInArray[a]):c.css2slide(c.positionsInArray[a],1),c.afterGo(),c.singleItemTransition(),!1;a=c.positionsInArray[a];!0===c.browser.support3d?(c.isCss3Finish=!1,!0===b?(c.swapSpeed("paginationSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},c.options.paginationSpeed)):"rewind"===b?(c.swapSpeed(c.options.rewindSpeed),g.setTimeout(function(){c.isCss3Finish=!0},c.options.rewindSpeed)):(c.swapSpeed("slideSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},
c.options.slideSpeed)),c.transition3d(a)):!0===b?c.css2slide(a,c.options.paginationSpeed):"rewind"===b?c.css2slide(a,c.options.rewindSpeed):c.css2slide(a,c.options.slideSpeed);c.afterGo()},jumpTo:function(a){"function"===typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]);a>=this.maximumItem||-1===a?a=this.maximumItem:0>=a&&(a=0);this.swapSpeed(0);!0===this.browser.support3d?this.transition3d(this.positionsInArray[a]):this.css2slide(this.positionsInArray[a],1);this.currentItem=
this.owl.currentItem=a;this.afterGo()},afterGo:function(){this.prevArr.push(this.currentItem);this.prevItem=this.owl.prevItem=this.prevArr[this.prevArr.length-2];this.prevArr.shift(0);this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp());"function"===typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){this.apStatus="stop";g.clearInterval(this.autoPlayInterval)},
checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var a=this;a.apStatus="play";if(!1===a.options.autoPlay)return!1;g.clearInterval(a.autoPlayInterval);a.autoPlayInterval=g.setInterval(function(){a.next(!0)},a.options.autoPlay)},swapSpeed:function(a){"slideSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!==typeof a&&this.$owlWrapper.css(this.addCssSpeed(a))},
addCssSpeed:function(a){return{"-webkit-transition":"all "+a+"ms ease","-moz-transition":"all "+a+"ms ease","-o-transition":"all "+a+"ms ease",transition:"all "+a+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(a){return{"-webkit-transform":"translate3d("+a+"px, 0px, 0px)","-moz-transform":"translate3d("+a+"px, 0px, 0px)","-o-transform":"translate3d("+a+"px, 0px, 0px)","-ms-transform":"translate3d("+
a+"px, 0px, 0px)",transform:"translate3d("+a+"px, 0px,0px)"}},transition3d:function(a){this.$owlWrapper.css(this.doTranslate(a))},css2move:function(a){this.$owlWrapper.css({left:a})},css2slide:function(a,b){var e=this;e.isCssFinish=!1;e.$owlWrapper.stop(!0,!0).animate({left:a},{duration:b||e.options.slideSpeed,complete:function(){e.isCssFinish=!0}})},checkBrowser:function(){var a=k.createElement("div");a.style.cssText="  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
a=a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);this.browser={support3d:null!==a&&1===a.length,isTouch:"ontouchstart"in g||g.navigator.msMaxTouchPoints}},moveEvents:function(){if(!1!==this.options.mouseDrag||!1!==this.options.touchDrag)this.gestures(),this.disabledEvents()},eventTypes:function(){var a=["s","e","x"];this.ev_types={};!0===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]:
!1===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(a=["mousedown.owl","mousemove.owl","mouseup.owl"]);this.ev_types.start=a[0];this.ev_types.move=a[1];this.ev_types.end=a[2]},disabledEvents:function(){this.$elem.on("dragstart.owl",function(a){a.preventDefault()});this.$elem.on("mousedown.disableTextSelect",function(a){return f(a.target).is("input, textarea, select, option")})},
gestures:function(){function a(a){if(void 0!==a.touches)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(void 0===a.touches){if(void 0!==a.pageX)return{x:a.pageX,y:a.pageY};if(void 0===a.pageX)return{x:a.clientX,y:a.clientY}}}function b(a){"on"===a?(f(k).on(d.ev_types.move,e),f(k).on(d.ev_types.end,c)):"off"===a&&(f(k).off(d.ev_types.move),f(k).off(d.ev_types.end))}function e(b){b=b.originalEvent||b||g.event;d.newPosX=a(b).x-h.offsetX;d.newPosY=a(b).y-h.offsetY;d.newRelativeX=d.newPosX-h.relativePos;
"function"===typeof d.options.startDragging&&!0!==h.dragging&&0!==d.newRelativeX&&(h.dragging=!0,d.options.startDragging.apply(d,[d.$elem]));(8<d.newRelativeX||-8>d.newRelativeX)&&!0===d.browser.isTouch&&(void 0!==b.preventDefault?b.preventDefault():b.returnValue=!1,h.sliding=!0);(10<d.newPosY||-10>d.newPosY)&&!1===h.sliding&&f(k).off("touchmove.owl");d.newPosX=Math.max(Math.min(d.newPosX,d.newRelativeX/5),d.maximumPixels+d.newRelativeX/5);!0===d.browser.support3d?d.transition3d(d.newPosX):d.css2move(d.newPosX)}
function c(a){a=a.originalEvent||a||g.event;var c;a.target=a.target||a.srcElement;h.dragging=!1;!0!==d.browser.isTouch&&d.$owlWrapper.removeClass("grabbing");d.dragDirection=0>d.newRelativeX?d.owl.dragDirection="left":d.owl.dragDirection="right";0!==d.newRelativeX&&(c=d.getNewPosition(),d.goTo(c,!1,"drag"),h.targetElement===a.target&&!0!==d.browser.isTouch&&(f(a.target).on("click.disable",function(a){a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();f(a.target).off("click.disable")}),
a=f._data(a.target,"events").click,c=a.pop(),a.splice(0,0,c)));b("off")}var d=this,h={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};d.isCssFinish=!0;d.$elem.on(d.ev_types.start,".owl-wrapper",function(c){c=c.originalEvent||c||g.event;var e;if(3===c.which)return!1;if(!(d.itemsAmount<=d.options.items)){if(!1===d.isCssFinish&&!d.options.dragBeforeAnimFinish||!1===d.isCss3Finish&&!d.options.dragBeforeAnimFinish)return!1;
!1!==d.options.autoPlay&&g.clearInterval(d.autoPlayInterval);!0===d.browser.isTouch||d.$owlWrapper.hasClass("grabbing")||d.$owlWrapper.addClass("grabbing");d.newPosX=0;d.newRelativeX=0;f(this).css(d.removeTransition());e=f(this).position();h.relativePos=e.left;h.offsetX=a(c).x-e.left;h.offsetY=a(c).y-e.top;b("on");h.sliding=!1;h.targetElement=c.target||c.srcElement}})},getNewPosition:function(){var a=this.closestItem();a>this.maximumItem?a=this.currentItem=this.maximumItem:0<=this.newPosX&&(this.currentItem=
a=0);return a},closestItem:function(){var a=this,b=!0===a.options.scrollPerPage?a.pagesInArray:a.positionsInArray,e=a.newPosX,c=null;f.each(b,function(d,g){e-a.itemWidth/20>b[d+1]&&e-a.itemWidth/20<g&&"left"===a.moveDirection()?(c=g,a.currentItem=!0===a.options.scrollPerPage?f.inArray(c,a.positionsInArray):d):e+a.itemWidth/20<g&&e+a.itemWidth/20>(b[d+1]||b[d]-a.itemWidth)&&"right"===a.moveDirection()&&(!0===a.options.scrollPerPage?(c=b[d+1]||b[b.length-1],a.currentItem=f.inArray(c,a.positionsInArray)):
(c=b[d+1],a.currentItem=d+1))});return a.currentItem},moveDirection:function(){var a;0>this.newRelativeX?(a="right",this.playDirection="next"):(a="left",this.playDirection="prev");return a},customEvents:function(){var a=this;a.$elem.on("owl.next",function(){a.next()});a.$elem.on("owl.prev",function(){a.prev()});a.$elem.on("owl.play",function(b,e){a.options.autoPlay=e;a.play();a.hoverStatus="play"});a.$elem.on("owl.stop",function(){a.stop();a.hoverStatus="stop"});a.$elem.on("owl.goTo",function(b,e){a.goTo(e)});
a.$elem.on("owl.jumpTo",function(b,e){a.jumpTo(e)})},stopOnHover:function(){var a=this;!0===a.options.stopOnHover&&!0!==a.browser.isTouch&&!1!==a.options.autoPlay&&(a.$elem.on("mouseover",function(){a.stop()}),a.$elem.on("mouseout",function(){"stop"!==a.hoverStatus&&a.play()}))},lazyLoad:function(){var a,b,e,c,d;if(!1===this.options.lazyLoad)return!1;for(a=0;a<this.itemsAmount;a+=1)b=f(this.$owlItems[a]),"loaded"!==b.data("owl-loaded")&&(e=b.data("owl-item"),c=b.find(".lazyOwl"),"string"!==typeof c.data("src")?
b.data("owl-loaded","loaded"):(void 0===b.data("owl-loaded")&&(c.hide(),b.addClass("loading").data("owl-loaded","checked")),(d=!0===this.options.lazyFollow?e>=this.currentItem:!0)&&e<this.currentItem+this.options.items&&c.length&&this.lazyPreload(b,c)))},lazyPreload:function(a,b){function e(){a.data("owl-loaded","loaded").removeClass("loading");b.removeAttr("data-src");"fade"===d.options.lazyEffect?b.fadeIn(400):b.show();"function"===typeof d.options.afterLazyLoad&&d.options.afterLazyLoad.apply(this,
[d.$elem])}function c(){f+=1;d.completeImg(b.get(0))||!0===k?e():100>=f?g.setTimeout(c,100):e()}var d=this,f=0,k;"DIV"===b.prop("tagName")?(b.css("background-image","url("+b.data("src")+")"),k=!0):b[0].src=b.data("src");c()},autoHeight:function(){function a(){var a=f(e.$owlItems[e.currentItem]).height();e.wrapperOuter.css("height",a+"px");e.wrapperOuter.hasClass("autoHeight")||g.setTimeout(function(){e.wrapperOuter.addClass("autoHeight")},0)}function b(){d+=1;e.completeImg(c.get(0))?a():100>=d?g.setTimeout(b,
100):e.wrapperOuter.css("height","")}var e=this,c=f(e.$owlItems[e.currentItem]).find("img"),d;void 0!==c.get(0)?(d=0,b()):a()},completeImg:function(a){return!a.complete||"undefined"!==typeof a.naturalWidth&&0===a.naturalWidth?!1:!0},onVisibleItems:function(){var a;!0===this.options.addClassActive&&this.$owlItems.removeClass("active");this.visibleItems=[];for(a=this.currentItem;a<this.currentItem+this.options.items;a+=1)this.visibleItems.push(a),!0===this.options.addClassActive&&f(this.$owlItems[a]).addClass("active");
this.owl.visibleItems=this.visibleItems},transitionTypes:function(a){this.outClass="owl-"+a+"-out";this.inClass="owl-"+a+"-in"},singleItemTransition:function(){var a=this,b=a.outClass,e=a.inClass,c=a.$owlItems.eq(a.currentItem),d=a.$owlItems.eq(a.prevItem),f=Math.abs(a.positionsInArray[a.currentItem])+a.positionsInArray[a.prevItem],g=Math.abs(a.positionsInArray[a.currentItem])+a.itemWidth/2;a.isTransition=!0;a.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":g+"px","-moz-perspective-origin":g+
"px","perspective-origin":g+"px"});d.css({position:"relative",left:f+"px"}).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endPrev=!0;d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(d,b)});c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endCurrent=!0;c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(c,e)})},clearTransStyle:function(a,
b){a.css({position:"",left:""}).removeClass(b);this.endPrev&&this.endCurrent&&(this.$owlWrapper.removeClass("owl-origin"),this.isTransition=this.endCurrent=this.endPrev=!1)},owlStatus:function(){this.owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,owlItems:this.$owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){this.$elem.off(".owl owl mousedown.disableTextSelect");
f(k).off(".owl owl");f(g).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.owlControls&&this.owlControls.remove());this.clearEvents();this.$elem.attr("style",this.$elem.data("owl-originalStyles")||"").attr("class",this.$elem.data("owl-originalClasses"))},destroy:function(){this.stop();g.clearInterval(this.checkVisible);this.unWrap();this.$elem.removeData()},reinit:function(a){a=f.extend({},this.userOptions,
a);this.unWrap();this.init(a,this.$elem)},addItem:function(a,b){var e;if(!a)return!1;if(0===this.$elem.children().length)return this.$elem.append(a),this.setVars(),!1;this.unWrap();e=void 0===b||-1===b?-1:b;e>=this.$userItems.length||-1===e?this.$userItems.eq(-1).after(a):this.$userItems.eq(e).before(a);this.setVars()},removeItem:function(a){if(0===this.$elem.children().length)return!1;a=void 0===a||-1===a?-1:a;this.unWrap();this.$userItems.eq(a).remove();this.setVars()}};f.fn.owlCarousel=function(a){return this.each(function(){if(!0===
f(this).data("owl-init"))return!1;f(this).data("owl-init",!0);var b=Object.create(l);b.init(a,this);f.data(this,"owlCarousel",b)})};f.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1E3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,
responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:g,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}})(jQuery,window,document);
/*! Lazy Load 1.9.7 - MIT license - Copyright 2010-2015 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!1,appear:null,load:null,placeholder:"data:image/gif;base64,R0lGODlhiQH0AaIHAI6dl+fq6bS+us3U0fn6+vLz89rf3f///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJBwAHACwAAAAAiQH0AQAD/3i63P4wykmrvTjrzbv/YCiOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wADChxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsf+jx48gQ4ocSbKkyZMoU6pcybKly5cwY8qcSbOmzZs4c+rcybOnz59AgwodSrSo0aNIkypdyrSp06dQo0qdSrWq1atYs2rdyrWr169gw4odS7as2bNo06pdy7at27dw48qdS7eu3bt48+rdy7ev37+AAwseTLiw4cOIEytezLix48eQI0ueTLmy5cuYM2vezLmz58+gQ4seTbq06dOoU6tezbq169ewY8ueTdvsAAAABBBYLAC3792IA/j2PWAwgQLAD9wenlvwcgDFlTNvDvg57uIFphsATGA6gN3WBQTOPr2AggIGBgQQ3H16csPWAWxX/Hz+YgL4FRcIEOA94gH/AgQowHqJGSCggP4RdqCABB62YIANwvegeYgRsGB0iqWnXm1soTeAARQmVsAAJJIY4mElppgYASmWmFx+7LVIogIE8MdfgnxpWOJ8NtqIo14E6GjAbjX2GMCJfxWg5AL7GYkkYUX2+CRhRkaIWJP9cajlllx26eWXYIYp5phklmnmmWimqeaabLbp5ptwxinnnHTWaeedeOap55589unnn4AGKuighBZq6KGIJqrooow26uijkEYq6aSUVmrppZhmqummnHbq6aeghirqqKSWauqpqKaq6qqsturqq7DGKuustNZq66245qrrrrz26uuvwAYr7LDEFmvsscgmq+yyUMw26+yz0EYr7bTUVmvttdhmq+223Hbr7bfghivuuOSWa+656Kar7rrstuvuu/DGK++89NZr77345qvvvvz26++/AAcs8MAEF2zwwQgnHGgCACH5BAkHAAcALAAAAACJAfQBAAP/eLrc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAMKHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mix/6PHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPn0CDCh1KtKjRo0iTKl3KtKnTp1CjSp1KtarVq1izat3KtavXr2DDih1LtqzZs2jTql3Ltq3bt3Djyp1Lt67du3jz6t3Lt6/fv4ADCx5MuLDhw4gTK17MuLHjx5AjS55MubLly5gza97MubPnz6BDix5NurTp06hTq17NurXr17Bjy55N2+wAAAAEEFh8G3fu3YgD+PY9YDCB4wsMDMctYAGBAgX4DhBA3YAC5cubH8COOzre6dSrHyiwHIB14cvxEgjP/vpw7QLKW7e7nj114AUMGAiwoLz5u//12SdBfMvxd5cB9s0HAXrD6YWgeBMwqBtfwFlQQIV2QXchYwEM4OEABgb34YcYFjbih94ddqKHIRpmwIopGkbAix8qmFgA+sVYG1rPBbChYgQEIKSQJRY25JGJBXmkkIotyeSNS+po2JKNHVfkjlhmqeWWXHbp5ZdghinmmGSWaeaZaKap5ppstunmm3DGKeecdNZp55145qnnnnz26eefgAYq6KCEFmrooYgmquiijDbq6KOQRirppJRWaumlmGaq6aacdurpp6CGKuqopJZq6qmopqrqqqy26uqrsMYq66y01mrrrbjmquuuvPbq66/ABivssMQWa+yxyCar7LJQzDbr7LPQRivttNRWa+212Gar7bbcduvtt+CGK+645JZr7rnopqvuuuy26+678MYr77z01mvvvfjmq+++/Pbr778AByzwwAQXbPDBCCf8ZQIAIfkECQcABwAsAAAAAIkB9AEAA/94utz+MMpJq7046827/2AojmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsHhMLpvP6LR6zW673/C4fE6v2+/4vH7P7/v/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8AAwocSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLH/o8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzps2bOHPq3Mmzp8+fQIMKHUq0qNGjSJMqXcq0qdOnUKNKnUq1qtWrWLNq3cq1q9evYMOKHUu2rNmzaNOqXcu2rdu3cOPKnUu3rt27ePPq3cu3r9+/gAMLHky4sOHDiBMrXsy4sePHkCNLnky5suXLmDNr3sy5s+fPoEOLHk26tOnTqFOrXs26tevXsGPLnk3brAEBAgYQWDwAN+4Bigv49m1gMIHdCwIM/72AQAHkegMMmB5AgfLlwA8YAMBdAHS70qdTP0BguYDqAbirF4CXgPj31odnF6BefXW77t9PR04gQIAC/wvQVx8Axd2l33QSCFjffeDpx+ADBQzIXl7hDfAgBMp19117GByXl3MebkCAAQMUKFcB/vkHYAbp1bchWyim6N+LEwwIwIRvyZgijRFEaGNcOqqIgY8DxhWjjDxCQICNAMil44oYDDDghW4VYGWSE1wnAJS1denll2CGKeaYZJZp5plopqnmmmy26eabcMYp55x01mnnnXjmqeeefPbp55+ABirooIQWauihiCaq6KKMNuroo5BGKumklFZq6aWYZqrpppx26umnoIYq6qiklmrqqaimquqqrLbq6quwxirrrLTWauutuOaq66689urrr8AGK+ywxBZr7LHIJqvssl7MNuvss9BGK+201FZr7bXYZqvtttx26+234IYr7rjklmvuueimq+667Lbr7rvwxivvvPTWa++9+Oar77789uvvvwAHLPDABBds8MEIJ6zwwgw37PDDEEcs8cQUH5oAACH5BAkHAAcALAAAAACJAfQBAAP/eLrc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAMKHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mix/6PHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPn0CDCh1KtKjRo0iTKl3KtKnTp1CjSp1KtarVq1izat3KtavXr2DDih1LtqzZs2jTql3Ltq3bt3Djyp1Lt67du3jz6t3Lt6/fv4ADCx5MuLDhw4gTK17MuLHjx5AjS55MubLly5gza97MubPnz6BDix5NurTp06hTq17NurXr17Bjy55N22yAAQMMML6NO7fiAr17ByBMgAHv4LoXECi+t0CA5wUUAA/u+0AAAdgHML/r/Dn0AwSoD4heALt5AXm9q1dwvPqA89ij2yWg3rvyAvgXwMc+/G795/8SvAeffHZ15x2BD5R33gB6GYggBAoKoF1jy0VGgAEG9PcbABwCIMB2hwnQIYfoIVbAiB0mdiKKACRGAIslImYAig8adp2ENdbmVXkcJqciijGGyGKOgrEIgI+GGYlkYQOwCKJhInaooYoYPqnjlVhmqeWWXHbp5ZdghinmmGSWaeaZaKap5ppstunmm3DGKeecdNZp55145qnnnnz26eefgAYq6KCEFmrooYgmquiijDbq6KOQRirppJRWaumlmGaq6aacdurpp6CGKuqopJZq6qmopqrqqqy26uqrsMYq66y01mrrrbjmquuuvPbq66/ABivssMQWa+yxyCar7LJPzDbr7LPQRivttNRWa+212Gar7bbcduvtt+CGK+645JZr7rnopqvuuuy26+678MYr77z01mvvvfjmq+++/Pbr778AByzwwAQXbPDBCLeWAAAh+QQJBwAHACwAAAAAiQH0AQAD/3i63P4wykmrvTjrzbv/YCiOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wADChxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsf+jx48gQ4ocSbKkyZMoU6pcybKly5cwY8qcSbOmzZs4c+rcybOnz59AgwodSrSo0aNIkypdyrSp06dQo0qdSrWq1atYs2rdyrWr169gw4odS7as2bNo06pdy7at27dw48qdS7eu3bt48+rdy7ev37+AAwseTLiw4cOIEytezLix48eQI0ueTLmy5cuYM2vezLmz58+gQ4seTbq06dOoU6tezbq169ewY8ueTdtsgQABCjC+jRu3YgK9e+tGzDv4cAUECAwGHjy3ggIDohtQDph5cOXQo2sXXNz5AQPatR//m7wA9QPhxScGn358YQLpDSzOPmB64/OPre8WwJ8/fsP//fU3QGIFBNgfgQbylxgBCQ6YWAAGumdYdvbVNhZ8/Mn3GwAccuggYgN02KGEfRVg3gICiMihhn8FIKKDKaoYQHUqAjCjATX+txeOKgqgQIgdzggYkCL6+JwBAejIF49FKlYjicvFaKOFVFZp5ZVYZqnlllx26eWXYIYp5phklmnmmWimqeaabLbp5ptwxinnnHTWaeedeOap55589unnn4AGKuighBZq6KGIJqrooow26uijkEYq6aSUVmrppZhmqummnHbq6aeghirqqKSWauqpqKaq6qqsturqq7DGKuustNZq66245qrrrrz26uuvwAYr7LDEFmvsscgmq+yyScw26+yz0EYr7bTUVmvttdhmq+223Hbr7bfghivuuOSWa+656Kar7rrstuvuu/DGK++89NZr77345qvvvvz26++/AAcs8MB7JgAAIfkECQcABwAsAAAAAIkB9AEAA/94utz+MMpJq7046827/2AojmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsHhMLpvP6LR6zW673/C4fE6v2+/4vH7P7/v/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8AAwocSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLH/o8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzps2bOHPq3Mmzp8+fQIMKHUq0qNGjSJMqXcq0qdOnUKNKnUq1qtWrWLNq3cq1q9evYMOKHUu2rNmzaNOqXcu2rdu3cOPKnUu3rt27ePPq3cu3r9+/gAMLHky4sOHDiBMrXsy4sePHkCNLnky5suXLmDNr3sy5s+fPoEOLHk26tOnTqFOrXs26tevXsGPLnk27tu3bAQk4JhCgd4DFvH33VlxAeG/diI0fT1zcOPLDwYUD910At9ri1YEP2D7AwPPD3LkbSEwgPHfy5rcrTj+eufnvhwsYMBAAvnWlAQQAEPB7QnkB/wP0h5cBABRYoIAPECDAggsOgBcBBkYowQAMMphdXQVEaOCFBRTwXIUMIjhXhhoCoFsB+hXYHoUgijhXiQIcAKGGv+UHon1ykWigbgRqGOMBLC54IV4B0LdAjxH+eEBzOO4VQIkOJpbihoopWKAAQ96n5ZZcdunll2CGKeaYZJZp5plopqnmmmy26eabcMYp55x01mnnnXjmqeeefPbp55+ABirooIQWauihiCaq6KKMNuroo5BGKumklFZq6aWYZqrpppx26umnoIYq6qiklmrqqaimquqqrLbq6quwxirrrLTWauutuOaq66689urrr8AGK+ywxBZr7LHIJqvssk/MNuvss9BGK+201FZr7bXYZqvtttx26+234IYr7rjklmvuueimq+667Lbr7rvwxivvvPTWa++9+Oar77789uvvvwAHLPDABBds8MEI45UAACH5BAkHAAcALAAAAACJAfQBAAP/eLrc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAMKHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mix/6PHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPn0CDCh1KtKjRo0iTKl3KtKnTp1CjSp1KtarVq1izat3KtavXr2DDih1LtqzZs2jTql3Ltq3bt3Djyp1Lt67du3jz6t3Lt6/fv4ADCx5MuLDhw4gTK17MuLHjx5AjS55MubLly5gza97MubPnz6BDix5NurTp06hTq17NurXr17Bjy55Nu7bt27hz697Nu7fv3yADDDBQoAOBAgToCgDAHMAADQQCSJcud0Dz5sUxTJ+e/e315s8vRN9OHe535uEtjCcfd/n3ABnIl39L4LsADQXIJ49LYIAAAf8GcHBcAcgBh1QA/wnQXQTRGUCcXga8J0F/A1Q4AHx31WefBAZYaOF+dRVwHgAgEgiihxYuOJeG3yVXQIICYNghiirO5V5z9xEA43/FFYDiACDWpSOOySG4Y3jCpbhXAAZgeICRMKY3YJB+QZlggIntKACVhfX33wA1GijmmGSWaeaZaKap5ppstunmm3DGKeecdNZp55145qnnnnz26eefgAYq6KCEFmrooYgmquiijDbq6KOQRirppJRWaumlmGaq6aacdurpp6CGKuqopJZq6qmopqrqqqy26uqrsMYq66y01mrrrbjmquuuvPbq66/ABivssMQWa+yxyCar7LJXzDbr7LPQRivttNRWa+212Gar7bbcduvtt+CGK+645JZr7rnopqvuuuy26+678MYr77z01mvvvfjmq+++/Pbr778AByzwwAQXbPDBCCes8MIMN+xwXQkAACH5BAkHAAcALAAAAACJAfQBAAP/eLrc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAMKHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mix/6PHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPn0CDCh1KtKjRo0iTKl3KtKnTp1CjSp1KtarVq1izat3KtavXr2DDih1LtqzZs2jTql3Ltq3bt3Djyp1Lt67du3jz6t3Lt6/fv4ADCx5MuLDhw4gTK17MuLHjx5AjS55MubLly5gza97MubPnz6BDix5NurTp06hTq17NurXr17Bjy55Nu7bt2+8IFCDQWACA3wIW+/79e0BiAsST8z5cIDnxAoiROwew/PBw4sYVD8DeWHf1wwEMGIC+eDtxA9qnkz88HQB6xO3fW58e4Ph1AMEVExggQIB83P9mFcDfAOtJUEAAAXxnVwD9NVjgAwhG+CBdDVZoYIQRKigXARU2WB0B32GY4V0cdigAb/sNoCJ5IiKooVz8VZidijQSeAABLeZVYn8D8CZgjQO8d+CIeh24XgBABrkAiC/y9WON9SVmAJBNCkbAlEFWCeCWXHbp5ZdghinmmGSWaeaZaKap5ppstunmm3DGKeecdNZp55145qnnnnz26eefgAYq6KCEFmrooYgmquiijDbq6KOQRirppJRWaumlmGaq6aacdurpp6CGKuqopJZq6qmopqrqqqy26uqrsMYq66y01mrrrbjmquuuvPbq66/ABivssMQWa+yxyCar7LJQzDbr7LPQRivttNRWa+212Gar7bbcduvtt+CGK+645JZr7rnopqvuuuy26+678MYr77z01mvvvfjmq+++/Pbr778AByzwwAQXbPDBCCdMbAIAOw=="};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);
jQuery.extend({bez:function(coOrdArray){var encodedFuncName="bez_"+jQuery.makeArray(arguments).join("_").replace(/\./g,"p");if(typeof jQuery.easing[encodedFuncName]!=="function"){var polyBez=function(p1,p2){var A=[null,null],B=[null,null],C=[null,null],bezCoOrd=function(t,ax){C[ax]=3*p1[ax],B[ax]=3*(p2[ax]-p1[ax])-C[ax],A[ax]=1-C[ax]-B[ax];return t*(C[ax]+t*(B[ax]+t*A[ax]))},xDeriv=function(t){return C[0]+t*(2*B[0]+3*A[0]*t)},xForT=function(t){var x=t,i=0,z;while(++i<14){z=bezCoOrd(x,0)-t;if(Math.abs(z)<.001)break;x-=z/xDeriv(x)}return x};return function(t){return bezCoOrd(xForT(t),1)}};jQuery.easing[encodedFuncName]=function(x,t,b,c,d){return c*polyBez([coOrdArray[0],coOrdArray[1]],[coOrdArray[2],coOrdArray[3]])(t/d)+b}}return encodedFuncName}});;

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.page=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process){
  /* globals require, module */

  'use strict';

  /**
   * Module dependencies.
   */

  var pathtoRegexp = require('path-to-regexp');

  /**
   * Module exports.
   */

  module.exports = page;

  /**
   * Detect click event
   */
  var clickEvent = ('undefined' !== typeof document) && document.ontouchstart ? 'touchstart' : 'click';

  /**
   * To work properly with the URL
   * history.location generated polyfill in https://github.com/devote/HTML5-History-API
   */

  var location = ('undefined' !== typeof window) && (window.history.location || window.location);

  /**
   * Perform initial dispatch.
   */

  var dispatch = true;


  /**
   * Decode URL components (query string, pathname, hash).
   * Accommodates both regular percent encoding and x-www-form-urlencoded format.
   */
  var decodeURLComponents = true;

  /**
   * Base path.
   */

  var base = '';

  /**
   * Running flag.
   */

  var running;

  /**
   * HashBang option
   */

  var hashbang = false;

  /**
   * Previous context, for capturing
   * page exit events.
   */

  var prevContext;

  /**
   * Register `path` with callback `fn()`,
   * or route `path`, or redirection,
   * or `page.start()`.
   *
   *   page(fn);
   *   page('*', fn);
   *   page('/user/:id', load, user);
   *   page('/user/' + user.id, { some: 'thing' });
   *   page('/user/' + user.id);
   *   page('/from', '/to')
   *   page();
   *
   * @param {string|!Function|!Object} path
   * @param {Function=} fn
   * @api public
   */

  function page(path, fn) {
    // <callback>
    if ('function' === typeof path) {
      return page('*', path);
    }

    // route <path> to <callback ...>
    if ('function' === typeof fn) {
      var route = new Route(/** @type {string} */ (path));
      for (var i = 1; i < arguments.length; ++i) {
        page.callbacks.push(route.middleware(arguments[i]));
      }
      // show <path> with [state]
    } else if ('string' === typeof path) {
      page['string' === typeof fn ? 'redirect' : 'show'](path, fn);
      // start [options]
    } else {
      page.start(path);
    }
  }

  /**
   * Callback functions.
   */

  page.callbacks = [];
  page.exits = [];

  /**
   * Current path being processed
   * @type {string}
   */
  page.current = '';

  /**
   * Number of pages navigated to.
   * @type {number}
   *
   *     page.len == 0;
   *     page('/login');
   *     page.len == 1;
   */

  page.len = 0;

  /**
   * Get or set basepath to `path`.
   *
   * @param {string} path
   * @api public
   */

  page.base = function(path) {
    if (0 === arguments.length) return base;
    base = path;
  };

  /**
   * Bind with the given `options`.
   *
   * Options:
   *
   *    - `click` bind to click events [true]
   *    - `popstate` bind to popstate [true]
   *    - `dispatch` perform initial dispatch [true]
   *
   * @param {Object} options
   * @api public
   */

  page.start = function(options) {
    options = options || {};
    if (running) return;
    running = true;
    if (false === options.dispatch) dispatch = false;
    if (false === options.decodeURLComponents) decodeURLComponents = false;
    if (false !== options.popstate) window.addEventListener('popstate', onpopstate, false);
    if (false !== options.click) {
      document.addEventListener(clickEvent, onclick, false);
    }
    if (true === options.hashbang) hashbang = true;
    if (!dispatch) return;
    var url = (hashbang && ~location.hash.indexOf('#!')) ? location.hash.substr(2) + location.search : location.pathname + location.search + location.hash;
    page.replace(url, null, true, dispatch);
  };

  /**
   * Unbind click and popstate event handlers.
   *
   * @api public
   */

  page.stop = function() {
    if (!running) return;
    page.current = '';
    page.len = 0;
    running = false;
    document.removeEventListener(clickEvent, onclick, false);
    window.removeEventListener('popstate', onpopstate, false);
  };

  /**
   * Show `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} dispatch
   * @param {boolean=} push
   * @return {!Context}
   * @api public
   */

  page.show = function(path, state, dispatch, push) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    if (false !== dispatch) page.dispatch(ctx);
    if (false !== ctx.handled && false !== push) ctx.pushState();
    return ctx;
  };

  /**
   * Goes back in the history
   * Back should always let the current route push state and then go back.
   *
   * @param {string} path - fallback path to go back if no more history exists, if undefined defaults to page.base
   * @param {Object=} state
   * @api public
   */

  page.back = function(path, state) {
    if (page.len > 0) {
      // this may need more testing to see if all browsers
      // wait for the next tick to go back in history
      history.back();
      page.len--;
    } else if (path) {
      setTimeout(function() {
        page.show(path, state);
      });
    }else{
      setTimeout(function() {
        page.show(base, state);
      });
    }
  };


  /**
   * Register route to redirect from one path to other
   * or just redirect to another route
   *
   * @param {string} from - if param 'to' is undefined redirects to 'from'
   * @param {string=} to
   * @api public
   */
  page.redirect = function(from, to) {
    // Define route from a path to another
    if ('string' === typeof from && 'string' === typeof to) {
      page(from, function(e) {
        setTimeout(function() {
          page.replace(/** @type {!string} */ (to));
        }, 0);
      });
    }

    // Wait for the push state and replace it with another
    if ('string' === typeof from && 'undefined' === typeof to) {
      setTimeout(function() {
        page.replace(from);
      }, 0);
    }
  };

  /**
   * Replace `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} init
   * @param {boolean=} dispatch
   * @return {!Context}
   * @api public
   */


  page.replace = function(path, state, init, dispatch) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    ctx.init = init;
    ctx.save(); // save before dispatching, which may redirect
    if (false !== dispatch) page.dispatch(ctx);
    return ctx;
  };

  /**
   * Dispatch the given `ctx`.
   *
   * @param {Context} ctx
   * @api private
   */
  page.dispatch = function(ctx) {
    var prev = prevContext,
      i = 0,
      j = 0;

    prevContext = ctx;

    function nextExit() {
      var fn = page.exits[j++];
      if (!fn) return nextEnter();
      fn(prev, nextExit);
    }

    function nextEnter() {
      var fn = page.callbacks[i++];

      if (ctx.path !== page.current) {
        ctx.handled = false;
        return;
      }
      if (!fn) return unhandled(ctx);
      fn(ctx, nextEnter);
    }

    if (prev) {
      nextExit();
    } else {
      nextEnter();
    }
  };

  /**
   * Unhandled `ctx`. When it's not the initial
   * popstate then redirect. If you wish to handle
   * 404s on your own use `page('*', callback)`.
   *
   * @param {Context} ctx
   * @api private
   */
  function unhandled(ctx) {
    if (ctx.handled) return;
    var current;

    if (hashbang) {
      current = base + location.hash.replace('#!', '');
    } else {
      current = location.pathname + location.search;
    }

    if (current === ctx.canonicalPath) return;
    page.stop();
    ctx.handled = false;
    location.href = ctx.canonicalPath;
  }

  /**
   * Register an exit route on `path` with
   * callback `fn()`, which will be called
   * on the previous context when a new
   * page is visited.
   */
  page.exit = function(path, fn) {
    if (typeof path === 'function') {
      return page.exit('*', path);
    }

    var route = new Route(path);
    for (var i = 1; i < arguments.length; ++i) {
      page.exits.push(route.middleware(arguments[i]));
    }
  };

  /**
   * Remove URL encoding from the given `str`.
   * Accommodates whitespace in both x-www-form-urlencoded
   * and regular percent-encoded form.
   *
   * @param {string} val - URL component to decode
   */
  function decodeURLEncodedURIComponent(val) {
    if (typeof val !== 'string') { return val; }
    return decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
  }

  /**
   * Initialize a new "request" `Context`
   * with the given `path` and optional initial `state`.
   *
   * @constructor
   * @param {string} path
   * @param {Object=} state
   * @api public
   */

  function Context(path, state) {
    if ('/' === path[0] && 0 !== path.indexOf(base)) path = base + (hashbang ? '#!' : '') + path;
    var i = path.indexOf('?');

    this.canonicalPath = path;
    this.path = path.replace(base, '') || '/';
    if (hashbang) this.path = this.path.replace('#!', '') || '/';

    this.title = document.title;
    this.state = state || {};
    this.state.path = path;
    this.querystring = ~i ? decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
    this.pathname = decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
    this.params = {};

    // fragment
    this.hash = '';
    if (!hashbang) {
      if (!~this.path.indexOf('#')) return;
      var parts = this.path.split('#');
      this.path = parts[0];
      this.hash = decodeURLEncodedURIComponent(parts[1]) || '';
      this.querystring = this.querystring.split('#')[0];
    }
  }

  /**
   * Expose `Context`.
   */

  page.Context = Context;

  /**
   * Push state.
   *
   * @api private
   */

  Context.prototype.pushState = function() {
    page.len++;
    history.pushState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Save the context state.
   *
   * @api public
   */

  Context.prototype.save = function() {
    history.replaceState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Initialize `Route` with the given HTTP `path`,
   * and an array of `callbacks` and `options`.
   *
   * Options:
   *
   *   - `sensitive`    enable case-sensitive routes
   *   - `strict`       enable strict matching for trailing slashes
   *
   * @constructor
   * @param {string} path
   * @param {Object=} options
   * @api private
   */

  function Route(path, options) {
    options = options || {};
    this.path = (path === '*') ? '(.*)' : path;
    this.method = 'GET';
    this.regexp = pathtoRegexp(this.path,
      this.keys = [],
      options);
  }

  /**
   * Expose `Route`.
   */

  page.Route = Route;

  /**
   * Return route middleware with
   * the given callback `fn()`.
   *
   * @param {Function} fn
   * @return {Function}
   * @api public
   */

  Route.prototype.middleware = function(fn) {
    var self = this;
    return function(ctx, next) {
      if (self.match(ctx.path, ctx.params)) return fn(ctx, next);
      next();
    };
  };

  /**
   * Check if this route matches `path`, if so
   * populate `params`.
   *
   * @param {string} path
   * @param {Object} params
   * @return {boolean}
   * @api private
   */

  Route.prototype.match = function(path, params) {
    var keys = this.keys,
      qsIndex = path.indexOf('?'),
      pathname = ~qsIndex ? path.slice(0, qsIndex) : path,
      m = this.regexp.exec(decodeURIComponent(pathname));

    if (!m) return false;

    for (var i = 1, len = m.length; i < len; ++i) {
      var key = keys[i - 1];
      var val = decodeURLEncodedURIComponent(m[i]);
      if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {
        params[key.name] = val;
      }
    }

    return true;
  };


  /**
   * Handle "populate" events.
   */

  var onpopstate = (function () {
    var loaded = false;
    if ('undefined' === typeof window) {
      return;
    }
    if (document.readyState === 'complete') {
      loaded = true;
    } else {
      window.addEventListener('load', function() {
        setTimeout(function() {
          loaded = true;
        }, 0);
      });
    }
    return function onpopstate(e) {
      if (!loaded) return;
      if (e.state) {
        var path = e.state.path;
        page.replace(path, e.state);
      } else {
        page.show(location.pathname + location.hash, undefined, undefined, false);
      }
    };
  })();
  /**
   * Handle "click" events.
   */

  function onclick(e) {

    if (1 !== which(e)) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;



    // ensure link
    // use shadow dom when available
    var el = e.path ? e.path[0] : e.target;
    while (el && 'A' !== el.nodeName) el = el.parentNode;
    if (!el || 'A' !== el.nodeName) return;



    // Ignore if tag has
    // 1. "download" attribute
    // 2. rel="external" attribute
    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;

    // ensure non-hash for the same path
    var link = el.getAttribute('href');
    if (!hashbang && el.pathname === location.pathname && (el.hash || '#' === link)) return;



    // Check for mailto: in the href
    if (link && link.indexOf('mailto:') > -1) return;

    // check target
    if (el.target) return;

    // x-origin
    if (!sameOrigin(el.href)) return;



    // rebuild path
    var path = el.pathname + el.search + (el.hash || '');

    // strip leading "/[drive letter]:" on NW.js on Windows
    if (typeof process !== 'undefined' && path.match(/^\/[a-zA-Z]:\//)) {
      path = path.replace(/^\/[a-zA-Z]:\//, '/');
    }

    // same page
    var orig = path;

    if (path.indexOf(base) === 0) {
      path = path.substr(base.length);
    }

    if (hashbang) path = path.replace('#!', '');

    if (base && orig === path) return;

    e.preventDefault();
    page.show(orig);
  }

  /**
   * Event button.
   */

  function which(e) {
    e = e || window.event;
    return null === e.which ? e.button : e.which;
  }

  /**
   * Check if `href` is the same origin.
   */

  function sameOrigin(href) {
    var origin = location.protocol + '//' + location.hostname;
    if (location.port) origin += ':' + location.port;
    return (href && (0 === href.indexOf(origin)));
  }

  page.sameOrigin = sameOrigin;

}).call(this,require('_process'))
},{"_process":2,"path-to-regexp":3}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],3:[function(require,module,exports){
var isarray = require('isarray')

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {String} str
 * @return {Array}
 */
function parse (str) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var suffix = res[6]
    var asterisk = res[7]

    var repeat = suffix === '+' || suffix === '*'
    var optional = suffix === '?' || suffix === '*'
    var delimiter = prefix || '/'
    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      pattern: escapeGroup(pattern)
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {String}   str
 * @return {Function}
 */
function compile (str) {
  return tokensToFunction(parse(str))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^' + tokens[i].pattern + '$')
    }
  }

  return function (obj) {
    var path = ''
    var data = obj || {}

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encodeURIComponent(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = encodeURIComponent(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {String} str
 * @return {String}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {String} group
 * @return {String}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {String}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {RegExp} path
 * @param  {Array}  keys
 * @return {RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {Array}  path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {String} path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function stringToRegexp (path, keys, options) {
  var tokens = parse(path)
  var re = tokensToRegExp(tokens, options)

  // Attach keys back to the regexp.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] !== 'string') {
      keys.push(tokens[i])
    }
  }

  return attachKeys(re, keys)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {Array}  tokens
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function tokensToRegExp (tokens, options) {
  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''
  var lastToken = tokens[tokens.length - 1]
  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = token.pattern

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (prefix) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(String|RegExp|Array)} path
 * @param  {Array}                 [keys]
 * @param  {Object}                [options]
 * @return {RegExp}
 */
function pathToRegexp (path, keys, options) {
  keys = keys || []

  if (!isarray(keys)) {
    options = keys
    keys = []
  } else if (!options) {
    options = {}
  }

  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys, options)
  }

  if (isarray(path)) {
    return arrayToRegexp(path, keys, options)
  }

  return stringToRegexp(path, keys, options)
}

},{"isarray":4}],4:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}]},{},[1])(1)
});
var register = function(Handlebars) {
    var helpers = {
        // put all of your helpers inside this object
        trimForAvatar: function (passedString) {
          return passedString.substring(0,1);
        },
        debug: function(optionalValue) {
            console.log("Current Context");
            console.log("====================");
            //console.log(this);
            if (optionalValue) {
                console.log("Value");
                console.log("====================");
                console.log(optionalValue);
            }
        },
        andfixer: function(passedString) {
            if(passedString!=null){
                if(passedString.indexOf('&amp;') ){
                    return passedString.replace("&amp;", "&");
                }
            }
            return;
        },
        compareStrings: function(passedString, secondString) {
            if(passedString!=null &&  secondString!=null){
                if(passedString.toLowerCase() === secondString.toLowerCase()){
                    return true;
                }
            }
            return false;
        },
        compareNumber: function(passedNum, secondNum) {
            if(passedNum!=null &&  secondNum!=null){
                if(passedNum === secondNum){
                    return true;
                }
            }
            return false;
        },
        stringContains: function(passedString, expression){
          if(passedString.indexOf(expression)>-1)
          return true;
            else false;
        },
        json: function(context){
            return JSON.stringify(context);
        },
        indexPlusConstant:function(index, constant){
            return index+constant;
        },
        indexMinusConstant:function(index, constant){
            return index-constant;
        },
        getTrueOrFalse:function(array){
            var bArray= [];
            for(var a in array)
            if(array[a] == '' || array[a] == null || array[a] == false) bArray.push(false);
            else bArray.push(true);

            var returnedValue= true;

            for(var b in bArray){
                if(bArray && returnedValue) returnedValue=true;
                else returnedValue=false;
            }
            return returnedValue;
        },
        idGenerator:function(object){
            var S4 = function() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            return object.theID=(S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        },
        upToIndex:function(currentIndex, maxIndex){
            if(currentIndex<=maxIndex)
            return true;
            else
            return false;
        },
        joinBreadCrumb: function(array, url){
            var breadcrumb = "";
            for (var a in array){
                if(typeof array[a] !== 'undefined'){
                    if(typeof array[a].name !== 'undefined'){
                        if(a == array.length-1) breadcrumb += array[a].name
                        else breadcrumb += array[a].name+'%20>%20'
                    }
                }
            }
            if(url == 'true'){
                var pattern = " & ",
                    re = new RegExp(pattern, "g");
                 return breadcrumb.replace(re, '%20%26%20')
            }
            else {
                return breadcrumb;
            }
        },
        urlFriendly:function (string){
            var newString = string.toLowerCase()
                .replace(/[\/\*\+\.\?\=\)\(\}\{\<\>_]/g," ") //|(?:\,\ )|(?:\,)
                .replace(/(?:\')/g,"")
                .replace(/(?:\ \ )/g," ")
                .replace(/(?:\ )/g,"-")
                .replace(/(?:\&)/g,"˜");
            return newString;
            // if(typeof leaveDash !== 'undefined') ;
            //else return newString.replace(/\-/g, " ")
        },
        mapDepartment   :function (string){
            var str = string.toLowerCase()
            var women = ['kvinna','women','female']
            var men = ['men','man','male']
            for(var w in women){
                if(women[w] === str) return 'WOMEN'
            }
            for(var m in men){
                if(men[m] === str) return 'MEN'
            }

        }
    };

if (Handlebars && typeof Handlebars.registerHelper === "function") {
        // register helpers
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    }
else {
        // just return helpers object if we can't register helpers here
        return helpers;
      }     
}
// client
if (typeof window !== "undefined") {
    register(Handlebars);
}
// server
else {
    module.exports.register = register;
    module.exports.helpers = register(null);
}

var renderHelper = {
    mapGender   :function (string){
        var str = string.toLowerCase()
        var women = ['kvinna','women','female']
        var men = ['men','man','male']
        for(var w in women){
            if(women[w] === str) return 'female'
        }
        for(var m in men){
            if(men[m] === str) return 'male'
        }

    },
    mapDepartment   :function (string){
        var str = string.toLowerCase()
        var women = ['kvinna','women','female']
        var men = ['men','man','male']
        for(var w in women){
            if(women[w] === str) return 'WOMEN'
        }
        for(var m in men){
            if(men[m] === str) return 'MEN'
        }

    },

    breadCrumbToUrl: function(array){
        //console.log(array)
        var path=''
        for(var i = 0; i<2;i++) {
            if(typeof array[i] !== 'undefined' && array[i] !==null)
                path += '/' + renderHelper.urlFriendly(array[i].name);
        }
        path+= '/';
        if(array.length> 2) {
            array = array.splice(2, array.length-1);
            var temp = ''
            for (var p = 0; p < array.length; p++) {
                if (p < array.length - 1)temp += renderHelper.urlFriendly(array[p].name) + '.';
                else temp += renderHelper.urlFriendly(array[p].name);
            }
            path += temp+'/';
        }
        //console.log(path)
        return path;
    },
    urlFriendly:function (string, leaveDot){
        var newString = string.toLowerCase()
            .replace(/[\/\*\+\-\?\=\)\(\}\{\<\>_]/g," ")
            .replace(/(?:\')/g,"")
            .replace(/(?:\ \ )/g," ");

        if(typeof leaveDot !== 'undefined'){
            return newString.replace(/(?:\ )/g,"-").replace(/(?:\&)/g,"˜");
        }
        else{
            return newString.replace(/\./g, " ").replace(/(?:\ )/g,"-").replace(/(?:\&)/g,"˜");
        }
    },
    decodeUrlFriendly:function (string){
        return string.replace(/(?:\-)/g,' ').replace(/\˜/g,"&")
    },

    //ENCODE THE STATE TO URL
    stateToUrlCategory:function(helper, currentState){
        var theState =  helper.getState(['query', 'attribute:*']);
        var path ='', query='';
        if (typeof theState["hierarchicalFacetsRefinements"] == 'undefined')  return '';
        if (typeof theState["hierarchicalFacetsRefinements"]['products'] == 'undefined') return '';
        var pathArray = theState["hierarchicalFacetsRefinements"]['products'][0].split(' > ')
        for(var i = 0; i<2;i++) {
            if(typeof pathArray[i] !== 'undefined' && pathArray[i] !==null)
                path += '/' + renderHelper.urlFriendly(pathArray[i]);
        }
        path+= '/';
        if(pathArray.length> 2) {
            pathArray = pathArray.splice(2, pathArray.length-1);
            var temp = ''
            for (var p = 0; p < pathArray.length; p++) {
                if (p < pathArray.length - 1)temp += renderHelper.urlFriendly(pathArray[p]) + '.';
                else temp += renderHelper.urlFriendly(pathArray[p]);
            }
            path += temp+'/';
        }
        query = renderHelper.stateToUrlQuery(helper, currentState)
        if(query !== '') path+= '?'+query;
        return path;
    },
    stateToUrlBrand:function(helper, currentState){
        var theState =  helper.getState(['query', 'attribute:*']);
        var path ='', query='';
        if (typeof theState["disjunctiveFacetsRefinements"] == 'undefined')  return '';
        if (typeof theState["disjunctiveFacetsRefinements"]['brand.name'] == 'undefined') return '';
        path+='/märken/'+ renderHelper.urlFriendly(theState["disjunctiveFacetsRefinements"]['brand.name'][0]) +'/'
        query = renderHelper.stateToUrlQuery(helper, currentState)
        if(query !== '') path+= '?'+query;
        console.log(path)
        return path;
    },
    stateToUrlSearch:function(helper, currentState){
        var query = renderHelper.stateToUrlQuery(helper, currentState);
        var path ='/sök/';
        if(query !== '') path+= '?'+query;
        return path;
    },
    stateToUrlQuery:function(helper, currentState){
        var uri = '';
        var object =  helper.getState(['query', 'attribute:*']);
        if(typeof object.query !== 'undefined' && object.query!== '' && currentState.search) uri+= 'q='+object.query;
        if (typeof object.hierarchicalFacetsRefinements !== 'undefined' && !currentState.category) {
            if (typeof object.hierarchicalFacetsRefinements['products'] !== 'undefined') {
                var newString = object.hierarchicalFacetsRefinements['products'][0].split(' > ').join('.');
                console.log(renderHelper.urlFriendly(newString,true))
                console.log(renderHelper.urlFriendly(newString))
                uri+= '&category='+renderHelper.urlFriendly(newString,true);
            }
        }

        if (typeof object.disjunctiveFacetsRefinements !== 'undefined') {
            if (object.disjunctiveFacetsRefinements.hasOwnProperty('discount')) {
                for (var c in object.disjunctiveFacetsRefinements.discount)
                    uri+= '&discount='+ renderHelper.urlFriendly(object.disjunctiveFacetsRefinements.discount[c]);

            }
            if (object.disjunctiveFacetsRefinements.hasOwnProperty('brand.name') && !currentState.brand) {
                for (var c in object.disjunctiveFacetsRefinements['brand.name'])
                    uri+= '&brand='+ renderHelper.urlFriendly(object.disjunctiveFacetsRefinements["brand.name"][c]);
            }
            if (object.disjunctiveFacetsRefinements.hasOwnProperty('style')) {
                for (var c in object.disjunctiveFacetsRefinements['style'])
                    uri+= '&style='+ renderHelper.urlFriendly(object.disjunctiveFacetsRefinements["style"][c]);
            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('fit')) {
                for (var c in object.disjunctiveFacetsRefinements['fit'])
                    uri+= '&fit='+ renderHelper.urlFriendly(object.disjunctiveFacetsRefinements["fit"][c]);

            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('material')) {
                for (var c in object.disjunctiveFacetsRefinements['material'])
                    uri+= '&material='+ renderHelper.urlFriendly(object.disjunctiveFacetsRefinements["material"][c]);

            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('color')) {
                for (var c in object.disjunctiveFacetsRefinements.color)
                    uri+= '&color='+ renderHelper.urlFriendly(object.disjunctiveFacetsRefinements["color"][c]);
            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('shops')) {
                for (var c in object.disjunctiveFacetsRefinements['shops'])
                    uri+= '&shop='+ renderHelper.urlFriendly(object.disjunctiveFacetsRefinements["shops"][c]);
            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('sizes')) {
                for (var c in object.disjunctiveFacetsRefinements.sizes)
                    uri+= '&size='+ renderHelper.urlFriendly(object.disjunctiveFacetsRefinements["sizes"][c]);
            }
        }

        if (typeof object.numericRefinements !== 'undefined') {
            if (object.numericRefinements['price.value'] !== 'undefined') {
                var o = object.numericRefinements['price.value'];
                if(typeof o['>']!=='undefined') uri+= '&priceFrom='+ o['>'][0];
                if(typeof o['<']!=='undefined') uri+= '&priceTo='+ o['<'][0];
            }
        }

        if (typeof object['facetsRefinements'] !== 'undefined') {
            console.log(object['facetsRefinements'])
            if (typeof object['facetsRefinements']['sale'] !== 'undefined') {
                uri+= '&sale='+ renderHelper.urlFriendly(object.facetsRefinements["sale"][0]);
            }

            if (typeof object['facetsRefinements']['compare'] !== 'undefined') {

                uri+= '&compare='+ renderHelper.urlFriendly(object.facetsRefinements["compare"][0]);
            }
        }

        if(helper.getPage() > 0)uri+= '&page='+helper.getPage();
        return uri;
    },

    //DECODE THE URL TO STATE
    urlToStateCategory:function(url, helper){
        helper.clearRefinements().setQuery('');
        var splitted = url.split('?'), href = splitted[0], query = splitted[1];
        if(href.charAt(0) =='/')href = href.slice(1, href.length);
        if(href.charAt(href.length-1) =='/') href = href.slice(0, href.length-1);
        var path = href.split('/'), currentState, type, category;
        currentState= {brand: false, category:true, search:false}
        type  = "category";

        category = path[0]+' > '+path[1];
        if(path[2] !== null && typeof path[2] !== 'undefined'){
            var styles =  path[2].split('.').join(' > ');
            category += ' > '+styles;
        }
        category = renderHelper.decodeUrlFriendly(decodeURI(category))
        helper.toggleRefinement('products', category);
        renderHelper.urlToStateQuery(query, helper)
        return {currentState : currentState, type: type}
    },
    urlToStateBrand:function(url, helper){
        helper.clearRefinements().setQuery('');;
        var splitted = url.split('?'), href = splitted[0], query = splitted[1];
        if(href.charAt(0) =='/')href = href.slice(1, href.length);
        if(href.charAt(href.length-1) =='/') href = href.slice(0, href.length-1);
        console.log(href)
        var path = href.split('/'), currentState, type, category;
        currentState= {brand: true, category:false, search:false}
        type = "brand";
        console.log(path[path.length-1])
        helper.addDisjunctiveFacetRefinement('brand.name', renderHelper.decodeUrlFriendly(path[path.length-1]));

        if(path.length >2){
            helper.toggleRefinement('products', renderHelper.decodeUrlFriendly(path[0]));
        }
        renderHelper.urlToStateQuery(query, helper)
        return {currentState : currentState, type: type}

    },
    urlToStateSearch:function(url, helper){
        helper.clearRefinements().setQuery('');
        var splitted = url.split('?'), href = splitted[0], query = splitted[1];
        if(href.charAt(0) =='/')href = href.slice(1, href.length);
        if(href.charAt(href.length-1) =='/') href = href.slice(0, href.length-1);
        var path = href.split('/'), currentState, type, category;
        currentState= {brand: false, category:false, search:true}
        type  = "search"
        console.log('PATH  ',path )
        if(path.length >1){
            helper.toggleRefinement('products', renderHelper.decodeUrlFriendly(path[1]));
        }
        renderHelper.urlToStateQuery(query, helper)
        return {currentState : currentState, type: type}
    },
    urlToStateQuery:function(query, helper){
        //LETS CHECK THE QUERY
        if(typeof query !=='undefined')
        {
            var querySplit  = query.split('&');
            querySplit.forEach(function(q){
                var qSplit = q.split('='), qName = qSplit[0], qValue = qSplit[1];
                switch (qName){
                    case 'q':
                        if(qValue!=='')
                            helper.setQuery(qValue);
                        break;
                    case 'brand':
                        helper.addDisjunctiveFacetRefinement('brand.name', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'style':
                        helper.addDisjunctiveFacetRefinement('style', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'fit':
                        helper.addDisjunctiveFacetRefinement('fit', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'material':
                        helper.addDisjunctiveFacetRefinement('material', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'size':
                        helper.addDisjunctiveFacetRefinement('sizes', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'discount':
                        helper.addDisjunctiveFacetRefinement('discount', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'color':
                        helper.addDisjunctiveFacetRefinement('color', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'shop':
                        helper.addDisjunctiveFacetRefinement('shops', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'sale':
                        helper.addFacetRefinement('sale', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'compare':
                        helper.addFacetRefinement('compare', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'priceFrom':
                        helper.addNumericRefinement('price.value','>', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'priceTo':
                        helper.addNumericRefinement('price.value','<', renderHelper.decodeUrlFriendly(qValue));
                        break;
                    case 'page':
                        helper.setPage(renderHelper.decodeUrlFriendly(qValue))
                        break;
                    case 'category':
                        var categoryValue = renderHelper.decodeUrlFriendly(qValue).split('.').join(' > ')
                        helper.clearRefinements('products').toggleRefinement('products', categoryValue);
                        break;
                }
            })
        }
    },

    mapColor: function (array, values) {
        var x = [];
        for (var a in array) {
            for (var b in values) {
                if (array[a].name == values[b].displayName.toLowerCase()) {
                    array[a].hex = values[b].hex;
                    x.push(array[a]);
                }
            }
        }
        return x;
    },
    mapWithout: function (array, values) {
        var x = [];
        for (var a in array) {
            for (var b in values) {
                if (array[a].name !== values[b]) {
                    x.push(array[a]);
                }

            }
        }

        return x;
    },
    categoryRefinement: function (categoryContent, breadcrumb, headerText) {
        var breadcrumbHref = [], returnArray = [], data = categoryContent[0].data;
        var maxB =0, maxC= 0;
        for (var b = 0; b < breadcrumb.length + 1; b++) {
            var c = 0, isRefined = false;
            if (data != null) {
                while (!isRefined) {
                    if (data[c].isRefined) {
                         maxB= b, maxC=0;
                        if (b < breadcrumb.length && data[c].data != null) breadcrumbHref.push({
                            name: data[c].name,
                            path: data[c].path,
                            count: data[c].count
                        })
                        if (data[c].data == null) {
                            returnArray = data.map(function (da) {
                                if (data[c].name == da.name)   da.class = 'sbold text-spaced';
                                else   da.class = '';
                                return da;
                            })
                            data = null;
                            isRefined = true;
                        }
                        else {
                            returnArray.length = 0;
                            data = data[c].data;
                            isRefined = true;
                        }
                    }
                    else {
                        if (data.length - 1 <= c) isRefined = true
                        returnArray.push({name: data[c].name, path: data[c].path, count: data[c].count})
                        c++;
                    }
                }
            }
        }
        if(maxB ==0 && maxC==0){
            //remove duplicates
            var uniqueArray = [];
            for(var r in returnArray){
                var isFound = false;
                for(var u in uniqueArray){
                    if(uniqueArray[u].name == returnArray[r].name){ isFound = true;}
                }
                if(!isFound)uniqueArray.push(returnArray[r]);
            }
            returnArray=uniqueArray;
        }
        return {childCategories: returnArray, breadCrumb: breadcrumbHref, header: headerText}
    },

    removeFilterTag: function (type, facet, value, helper) {
        switch (type) {
            case 'disjunctive':
                helper.removeDisjunctiveFacetRefinement(facet, value);
                break;
            case 'facet':
                helper.removeFacetRefinement(facet, value);
                break;
            case 'numeric':
                helper.removeNumericRefinement(facet);
                break;
        }
    },
    pagination: function (content) {
        var nbHits = content.nbHits;
        var currentPage= content.page, totalPages = content.nbPages;
        var rObject = {
            paginate : true,
            currentPage: currentPage,
            totalPages: totalPages,
            hasNext: false,
            hasPrevious: false,
            showFirst: true,
            showLast: true,
            bufferAfter: 2,
            bufferBefore: 2,
            pages: []
        };
        var cClass = 'sbold text-pink-darker';
        if(nbHits != 0 ){
            if (currentPage < totalPages - 1) rObject.hasNext = true;
            if (currentPage != 0) rObject.hasPrevious = true;
            if(totalPages > 5) {
                if (currentPage == 0) {
                    rObject.bufferBefore = 0;
                    rObject.bufferAfter = 4;
                    rObject.showFirst = false;
                } else if (currentPage == 1) {
                    rObject.bufferBefore = 1;
                    rObject.bufferAfter = 3;
                    rObject.showFirst = false;
                }
                else if (currentPage == 2) {
                    rObject.showFirst = false;
                }
                else if (currentPage == (totalPages - 2)) {
                    rObject.bufferBefore = 3;
                    rObject.bufferAfter = 1;
                    rObject.showLast = false;
                } else if (currentPage == (totalPages - 1)) {
                    rObject.bufferBefore = 4;
                    rObject.bufferAfter = 0;
                    rObject.showLast = false;
                } else if (currentPage == (totalPages - 3)) {
                    rObject.showLast = false;
                }

                for(var x=0; x<rObject.bufferBefore; x++) rObject.pages.push({thePage:currentPage - rObject.bufferBefore + (x), class:''});
                rObject.pages.push({thePage:currentPage, class: cClass})
                for(var c=0; c<rObject.bufferAfter; c++) rObject.pages.push({thePage:currentPage + (c + 1), class:''});
            }
            else {
                for(var c=0; c<totalPages; c++){
                    if(c == currentPage) rObject.pages.push({thePage:c, class:cClass});
                    else rObject.pages.push({thePage:c, class:''});
                    rObject.showFirst = false;
                    rObject.showLast = false;
                }
            }
        }
        else{
            rObject.paginate = false;
        }
        return rObject;
    },
    setTitle: function(currentState){
        var avafacets = helper.getState(['query','attribute:*']);
        if(typeof avafacets.hierarchicalFacetsRefinements !== 'undefined')
            if(typeof avafacets.hierarchicalFacetsRefinements.products !== 'undefined'){
                var splitted = avafacets.hierarchicalFacetsRefinements.products[0].split(' > ');
                if(currentState.category)$(document).prop('title', splitted[0]+' - '+splitted[splitted.length-1]);
                else {
                    if(currentState.search){ $(document).prop('title', 'Search - '+avafacets.query);}
                    else if(currentState.brand){
                        if(typeof avafacets.disjunctiveFacetsRefinements !== 'undefined')
                            if(typeof avafacets.disjunctiveFacetsRefinements['brand.name'] !== 'undefined'){
                                $(document).prop('title', 'Brand - '+avafacets.disjunctiveFacetsRefinements['brand.name'])
                            }
                    }


                }
            }
    },

    getWelcomeMessage: function(helper,currentState,breadcrumb, content, suggestedBrands){
        var rObject = {}
        /*if(breadcrumb.length > 2){
            rObject.style= content.getFacetValues('style');
        }*/

        if(currentState.brand){
            rObject.search = false;
            rObject.name = renderHelper.getBrandName(helper);
            rObject.department = breadcrumb[0];
            if( breadcrumb.length-1 !== 0) rObject.subCategory = breadcrumb[breadcrumb.length-1];
            rObject.closeSearch=false;
        }

        else if(currentState.search){
                rObject.search = true;
                rObject.department = breadcrumb[0]
                rObject.name = HEADERTEXT.search.header;
                rObject.nbHits = HEADERTEXT.search.found +' <font class="bold text-pink-dark"> '+content.nbHits+' </font> '+HEADERTEXT.search.product ;
                rObject.query = content.query;
                rObject.closeSearch=true;
                rObject.suggestedBrands = suggestedBrands;
                if(suggestedBrands!==null && typeof suggestedBrands !== 'undefined')
                    rObject.nbBrandHits = HEADERTEXT.search.found +' <font class="bold text-pink-dark"> '+suggestedBrands.length+' </font> '+HEADERTEXT.search.brand ;
        }

        else if(currentState.category){
            rObject.search = false;
            rObject.name =breadcrumb[breadcrumb.length-1];
            rObject.closeSearch=false;
        }


        return rObject;
    },
    getBrandName:function(helper ){
        var state = helper.getState(['attribute:*']);
            if (typeof state['disjunctiveFacetsRefinements'] !== 'undefined') {
                if (state['disjunctiveFacetsRefinements']['brand.name']) {
                    return state['disjunctiveFacetsRefinements']['brand.name'];
                }
            }
    },
    getAllRefinements: function (object, header, currentState) {
        var rObject = {
            hierarchicalFacets: [],
            numericFacets: [],
            facets: []
        };

        if (object.hasOwnProperty('hierarchicalFacetsRefinements') && typeof object.hierarchicalFacetsRefinements !== 'undefined') {
            if (object.hierarchicalFacetsRefinements.hasOwnProperty('products')) {
                var x = object.hierarchicalFacetsRefinements.products[0].split(' > ')
                rObject.hierarchicalFacets.push({
                    text: x[x.length - 1],
                    type: 'hierarchical',
                    value: x[x.length - 1],
                    facet: 'products'
                })
            }
        }
        if (object.hasOwnProperty('disjunctiveFacetsRefinements') && typeof object.disjunctiveFacetsRefinements !== 'undefined') {
            if (object.disjunctiveFacetsRefinements.hasOwnProperty('discount')) {
                for (var c in object.disjunctiveFacetsRefinements.discount)
                    rObject.facets.push({
                        text: header.disjunctionFacets.discount.filter,
                        type: 'disjunctive',
                        value: object.disjunctiveFacetsRefinements.discount[c],
                        facet: 'discount'
                    })
            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('brand.name') && !currentState.brand) {
                for (var c in object.disjunctiveFacetsRefinements['brand.name'])
                    rObject.facets.push({
                        text: header.disjunctionFacets.brand.filter,
                        type: 'disjunctive',
                        value: object.disjunctiveFacetsRefinements['brand.name'][c],
                        facet: 'brand.name'
                    })
            }
            if (object.disjunctiveFacetsRefinements.hasOwnProperty('style')) {
                for (var c in object.disjunctiveFacetsRefinements['style'])
                    rObject.facets.push({
                        text: header.disjunctionFacets.style.filter,
                        type: 'disjunctive',
                        value: object.disjunctiveFacetsRefinements['style'][c],
                        facet: 'style'
                    })
            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('fit')) {
                for (var c in object.disjunctiveFacetsRefinements['fit'])
                    rObject.facets.push({
                        text: header.disjunctionFacets.fit.filter,
                        type: 'disjunctive',
                        value: object.disjunctiveFacetsRefinements['fit'][c],
                        facet: 'fit'
                    })
            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('material')) {
                for (var c in object.disjunctiveFacetsRefinements['material'])
                    rObject.facets.push({
                        text: header.disjunctionFacets.material.filter,
                        type: 'disjunctive',
                        value: object.disjunctiveFacetsRefinements['material'][c],
                        facet: 'material'
                    })
            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('color')) {
                for (var c in object.disjunctiveFacetsRefinements.color)
                    rObject.facets.push({
                        text: header.disjunctionFacets.color.filter,
                        type: 'disjunctive',
                        value: object.disjunctiveFacetsRefinements.color[c],
                        facet: 'color'
                    })
            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('shops')) {
                for (var c in object.disjunctiveFacetsRefinements['shops'])
                    rObject.facets.push({
                        text: header.disjunctionFacets.shop.filter,
                        type: 'disjunctive',
                        value: object.disjunctiveFacetsRefinements['shops'][c],
                        facet: 'shops'
                    })
            }

            if (object.disjunctiveFacetsRefinements.hasOwnProperty('sizes')) {
                for (var c in object.disjunctiveFacetsRefinements.sizes)
                    rObject.facets.push({
                        text: header.disjunctionFacets.size.filter,
                        type: 'disjunctive',
                        value: object.disjunctiveFacetsRefinements.sizes[c],
                        facet: 'sizes'
                    })
            }
        }
        if (object.hasOwnProperty('numericRefinements')) {
            if (object.numericRefinements.hasOwnProperty('price.value')) {
                var o = object.numericRefinements['price.value'];
                var from = o['>'][0];
                var to = o['<'][0];
                var temp = {
                    text: header.facets.price.filter,
                    type: 'numeric',
                    value: ' ' + from + ' - ' + to,
                    facet: 'price.value'
                }
                rObject.numericFacets.push(temp)
            }
        }

        if (object.hasOwnProperty('facetsRefinements')) {
            if (object.facetsRefinements.hasOwnProperty('sale')) {
                var temp = {
                    text: header.facets.sale.filter,
                    type: 'facet',
                    value: object.facetsRefinements.sale,
                    facet: 'sale'
                }
                rObject.facets.push(temp)
            }
            if (object.facetsRefinements.hasOwnProperty('compare')) {
                var temp = {
                    text: header.facets.compare.filter,
                    type: 'facet',
                    value: object.facetsRefinements.compare,
                    facet: 'compare'
                }
                rObject.facets.push(temp)
            }
        }
        return rObject;
    },
    getAllFacetValues:function( object,helper, content, currentState, currentBrandDDHits, COLORS, HEADERTEXT, departmentVerified){
        var breadCrumb = [];
        var temp =  helper.getState(['query', 'attribute:*']);
        if(typeof temp.hierarchicalFacetsRefinements !== 'undefined')
                  breadCrumb=helper.getHierarchicalFacetBreadcrumb('products')


        object.price = content.getFacetStats('price.value')
        object.welcome = renderHelper.getWelcomeMessage(helper,currentState,breadCrumb, content, currentBrandDDHits);
        object.sale = {content:renderHelper.mapWithout(content.getFacetValues('sale'),['false']), header: HEADERTEXT.facets.sale.header};
        object.compare = {content:renderHelper.mapWithout(content.getFacetValues('compare'),['false']), header: HEADERTEXT.facets.compare.header};



        object.discounts={content: renderHelper.mapWithout(content.getFacetValues('discount'), ['0']), header: HEADERTEXT.disjunctionFacets.discount.header};
        object.sizes= {content: content.getFacetValues('sizes', {sortBy: ['name:asc']}), header: HEADERTEXT.disjunctionFacets.size.header};

        object.style= {content: content.getFacetValues('style', {sortBy: ['name:asc']}), header: HEADERTEXT.disjunctionFacets.style.header};
        object.fit= {content: content.getFacetValues('fit', {sortBy: ['name:asc']}), header: HEADERTEXT.disjunctionFacets.fit.header};
        object.material= {content: content.getFacetValues('material', {sortBy: ['name:asc']}), header: HEADERTEXT.disjunctionFacets.material.header};


        object.shops= {content: content.getFacetValues('shops', {sortBy: ['name:asc']}),header:   HEADERTEXT.disjunctionFacets.shop.header};
        object.paginate = renderHelper.pagination(content);

        object.category = renderHelper.categoryRefinement(content.hierarchicalFacets, breadCrumb, HEADERTEXT.hierarchicalFacets.header);
        object.products = content.hits;

        object.colors = {header: HEADERTEXT.disjunctionFacets.color.header , content: renderHelper.mapColor(content.getFacetValues('color', {sortBy: ['name:asc']}),COLORS)}

        object.tags = renderHelper.getAllRefinements(helper.getState(['attribute:*']), HEADERTEXT, currentState);
        if(!currentState.brand){
            object.brands={ content: content.getFacetValues('brand.name', {sortBy: ['name:asc']}), header: HEADERTEXT.disjunctionFacets.brand.header}
        }
        //return object
    }
};
var COLORS = [
    {
        "key": "black",
        "displayName": "Svart",
        'hex':'#000000'
    },
    {
        "key": "brown",
        "displayName": "Brun",
        'hex':'#471413'
    },
    {
        "key": "beige",
        "displayName": "Beige",
        'hex':'#F5F5DC'
    },
    {
        "key": "gray",
        "displayName": "Grå",
        hex:'#919096'
    },
    {
        "key": "white",
        "displayName": "Vit",
        hex:'#ffffff'
    },
    {
        "key": "blue",
        "displayName": "Blå",
        hex:'#6f6fff'
    },
    {
        "key": "petrol",
        "displayName": "Petrol",
        hex:"#f2f7ce"

    },
    {
        "key": "turquoise",
        "displayName": "Turkos",
        hex:'#19e7ef'
    },
    {
        "key": "green",
        "displayName": "Grön",
        'hex':'#008000'
    },
    {
        "key": "olive",
        "displayName": "Oliv",
        'hex':'#008000'
    },
    {
        "key": "yellow",
        "displayName": "Gul",
        'hex':'#ffff00'
    },
    {
        "key": "orange",
        "displayName": "Orange",
        'hex':'#ff7f00'
    },
    {
        "key": "red",
        "displayName": "Röd",
        'hex':'#f41414'
    },
    {
        "key": "pink",
        "displayName": "Rosa",
        'hex':'#FFC0CB'
    },
    {
        "key": "purple",
        "displayName": "Lila",
        'hex':'#800080'
    },
    {
        "key": "gold",
        "displayName": "Guld",
        'hex':'#FFD700'
    },
    {
        "key": "silver",
        "displayName": "Silver",
        'hex':'#C0C0C0'
    },
    {
        "key": "multicolored",
        "displayName": "Flerfärgad",
        'hex':'#FFC0CB'
    }
]
var HEADERTEXT = {
    hierarchicalFacets: { header: "Kategorier"},
    disjunctionFacets: {
        color:{header: "Färger", filter:"färg"},
        brand:{header: "Märken", filter:"märken"},
        style:{header: "Styles", filter:"style"},
        material:{header: "Material", filter:"material"},
        fit:{header: "Fit", filter:"fit"},

        shop:{header:"Butiker", filter:"butik"},
        size:{header:"Storlekar", filter:"Storlek"},
        discount:{header:"Rea%", filter:"Rea"}
    },
    facets:{
        sale: {header: "Bara Rea", filter:"Bara Rea"},
        compare: {header: "Bara jämför", filter:"Bara jämför"},
        price:{header: "Pris"   , filter:"pris"}
    },
    search:{
        header:"Sökresultat",
        found: "vi hittade",
        product:"styles",
        brand:"brands"
    },
    autoComplete:{
        productPreview:{brand: "Märken", shop:"Butik"},
        productList:{ findBetterPriceButton:"find better prices"}
    },
    newsletter:{
        responseSuccess:{
            success:{
                body:"Thank you for submitting you email",
                addAnother:"Add another email"
            }
        },
        responseFail:{
            fail:{
                body:"Sorry we couldnt add",
                addAnother:"Add another email"
            }
        },
        addForm:{
            form:{
                body:"Add a new email"
            }
        }
    }
}

if (typeof window !== "undefined") {

}
//SERVER
else {
    module.exports = {helper:renderHelper, translation:HEADERTEXT, colors:COLORS}
}
$(document).ready(function() {
	$('#owlNav').owlCarousel({

		navigation : false, // Show next and prev buttons
		autoPlay:  7000,
		pagination:false,
		slideSpeed : 0,
		paginationSpeed : 5000,
		rewindSpeed:5000,
		stopOnHover:true,
		singleItem:true
	});

	$('li a[expand-key]').on('touchend click',function(e){
		e.preventDefault();
		$('.category-expand-container').addClass('hidden');

		var key = $(this).attr('expand-key');
		$('#category-expand-parent').removeClass('hidden');
		$('div[expand-parentKey="'+ key +'"]').removeClass('hidden');
		$('.category-expand-wrapper').animate({opacity:1});
	});
	$('#navbarDepartment').on('mouseleave',function(){
		$.when( $('.category-expand-wrapper').animate({opacity:0})).done( function() {
			$('.category-expand-container').addClass('hidden');
			$('#category-expand-parent').addClass('hidden');
		})
	});
	$('.category-expand').on('click', '.desktopNavColoumns li a, a h4', function(){
		$.when( $('.category-expand-wrapper').animate({opacity:0})).done( function() {
			$('.category-expand-container').addClass('hidden');
			$('#category-expand-parent').addClass('hidden');
		})
	});
	$('.page-content-wrapper').on('click',function(){
		if($('.category-expand-container').not('.hidden')){
			$('.category-expand-container').addClass('hidden');
			$('.category-expand-wrapper').css({opacity:0});
		}

	})

	/*
	 Mobile Menu
	 */
	function closeSidePage(){
		$('.page-sidebar').removeClass('visible');
		$('.fixed-header').removeClass('sidebar-open');
		$('.page-sidebar-cover').addClass('hidden');
	}
	$('#menuBurgerIcon').on('click', function(e) {
		e.stopImmediatePropagation();  e.preventDefault();e.cancelBubble = true;
		$('.page-sidebar').addClass('visible').css({opacity:0}).animate({opacity:1}, 300);
		$('.fixed-header').addClass('sidebar-open');
		$('.page-sidebar-cover').removeClass('hidden');
         console.log('opening mobile menu')
	})

	$('.page-sidebar-cover').on(eventOnTE, function(e) {
		e.stopImmediatePropagation();  e.preventDefault();
		console.log('closing mobile menu')
		closeSidePage()
	})

	$('a[data-page]').on(eventOnTE,function(e){
		$('a[data-page]').removeClass('active');
		$(this).addClass('active');
	})
	$('a[data-page-ref]').on(eventOnTE,function(e){
		$('a[data-page]').removeClass('active');
		$('a[data-page="explore"]').addClass('active');
	})

	$('.menu-items > li a').click( function() {
		console.log('ges here')
		if($(this).siblings('ul.sub-menu').length > 0){
			$(this).closest('li').toggleClass('open').toggleClass('active');

		}
	})
	$('.menu-items > .sub-menu li a').click( function(event) {
		event.stopImmediatePropagation()
		console.log('why the fuck')
		if($(this).siblings('ul.sub-menu').length > 0){
			$(this).closest('li').toggleClass('open').toggleClass('active');
		}


	})


	$('#departmentMenu').on('click','a',function(){
		var departmentChoose = $(this).attr('data-department');
		var selector = "div[data-department-toggle='"+departmentChoose+"']"
		console.log(selector)
		$('.sidebar-menu').addClass('hidden');
		$('.sidebar-header-title').text(departmentChoose);
		closesideBarDD();
		$(selector).removeClass('hidden');
	})
	var previousScroll = 0;
	function navBarScrollActions(){
		var navSegment = $('#navbarDepartment');
		var logo = $('.mainLogo');
		var header= $('.header').height();
		var current = $(document).scrollTop();
		var headerSegment = $('#header-Dropdown');

		if(current > header){
			headerSegment.slideUp('fast');
			//logo.addClass('scaleDown')
		}
		else if(current < header){
			headerSegment.slideDown('fast');
			//logo.removeClass('scaleDown')
		}


	 if( screen.width >480){
		 if(scrollEvent){
			 if( current - previousScroll  >130 && current > header ){
				 previousScroll= current;
				 navSegment.slideUp('fast');
			 }
			 else if (previousScroll - current > 130 && scrollEvent)
			 {
				 previousScroll= current;
				 navSegment.slideDown('fast');
			 }
		 }
		 else if(!scrollEvent && current > header ){
			 if(current < $('.itemList').offset().top) scrollEvent = true;
			 if(navSegment.is(':visible'))navSegment.slideUp('fast');
		 }
	 }


		if(isMobile && current> header){
			$('#menuSearchIcon').fadeIn();
		}
		else if(isMobile && current< header){
			$('#menuSearchIcon').fadeOut('fast');
		}
	}
	$(window).on( 'scroll' ,function(){
		navBarScrollActions()
	});

})


$(document).ready(function() {
	var registerContainer = $('.registerContainer');
	var registerSection = $('#AuthenticationPopUp');
	//FOR MOBILE
	function closeSideBar(){
		$('.page-sidebar').removeClass('visible');
		$('.fixed-header').removeClass('sidebar-open');
		$('.page-sidebar-cover').addClass('hidden');
	}
	registerSection.on('click','.toggle', function() {
		registerContainer.stop().addClass('active');
	});

	$('#fromSignUpToLogin').on('click', function() {
		registerContainer.stop().removeClass('active');
	});

	$('#footerSignUPButton').on('click', function() {
		$('.page-container').addClass('fixedPage')
		var number = (isMobile? 0:50);
		registerContainer.stop().addClass('active').css({marginTop:800}).animate({marginTop:number}, 200);
		registerSection.removeClass('hidden').css({opacity:0}).animate({opacity:1});
	});

	$('.authenticate').on('click', function (event) {
		if($(this).attr('data-view')==='login')
			registerContainer.stop().removeClass('active').css({marginTop:800}).animate({marginTop:50}, 200);

		else if($(this).attr('data-view')==='signup')
			registerContainer.stop().addClass('active').css({marginTop:800}).animate({marginTop:50}, 200);
		$('.page-container').addClass('fixedPage')
		registerSection.removeClass('hidden').css({opacity:0}).animate({opacity:1});
	});

	$('.authenticateMobile').on('touchend click', function (e) {
		e.preventDefault();e.stopPropagation();
			closeSideBar()
			if($(this).attr('data-view')==='login')
				registerContainer.stop().removeClass('active').css({marginTop:800}).animate({marginTop:0}, 200);
			else if($(this).attr('data-view')==='signup')
				registerContainer.stop().addClass('active').css({marginTop:800}).animate({marginTop:0}, 200);
		$('.page-container').addClass('fixedPage')
		registerSection.removeClass('hidden').css({opacity:0}).animate({opacity:1});
	});
	$('.close-AuthenticationPopUp').on('click', function(e){
		$.when(registerSection.animate({opacity:0}, 100))
			.done(function(){
				registerSection.addClass('hidden');
				$('.page-container').removeClass('fixedPage')
			});
	})

	$('#signupForm').on('submit', function(e) {
		e.preventDefault();
		console.log('Supe3');
		if($('#passwordSignUpConfirm').val() !== $('#passwordSignUp').val()) $('#registerPasswrodError').fadeIn();
		else{
			$.when($('.registerContainer').hide(), $('.registerLoading').fadeIn('slow')).done(function(){
				$('#signupForm')[0].submit();
			})


		}

	});

	$('#signupFormPage').on('submit', function(e) {
		e.preventDefault();
		console.log('Supe3');
		if($('#passwordSignupPageConfirm').val() !== $('#passwordSignupPage').val()) $('#registerPagePasswrodError').fadeIn();
		else{
			$.when($('.registerContainer').hide(), $('.registerLoading').fadeIn('slow')).done(function(){
				$('#signupFormPage')[0].submit();
			})


		}

	});

});








/***************SUBMIT FORM***************/
function submitRegistration(){
	var user = {}
	user["email"] = $("#email").val();
	if ($('#male').is(":checked"))
	{
		user["gender"] = "MALE";

	}else if ($('#female').is(":checked")){

		user["gender"] = "FEMALE";
	}
	user["password"] = $("#password").val();
	$.ajax({
        url: $("#signupForm").attr( "action"),
        type: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
		data : JSON.stringify(user),
		dataType : 'text',
        success: function(data) {
               console.log(data);
              if( data  === 'interrupted'){
                $("#registerError ").show();
                console.log('the account exist')
							}
	        		else{
								success = true;
	        			$("#signupContainer").fadeOut('fast');
	        			$("#successSignup").fadeIn('fast');
	        			$(".authenticationPopUp").delay(1000).fadeOut(500);
								window.location.reload();
						}

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error');
            console.log(errorThrown);
            console.log(jqXHR);
            success = false;
            console.log('Submition failed')
        }
    });
}


/*******submit login*****/
function submitLogin(){
	var user = {}

	user["email"] = $("#loginEmail").val();
	user["password"] = $("#loginPassword").val();



	$.ajax({
        url: $("#loginForm").attr( "action"),
        type: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
		data : JSON.stringify(user),
		dataType : 'text',
        success: function(data) {
        			success = true;
              if(data == "Missing credentials"){
                 $("#loginError ").text('There is a missing credential').show();
              }
              else if(data == "nouser"){
                 $("#loginError ").text('This email does not exist').show();
              }
              else if(data == "nopass"){
                $("#loginError ").text('Your password is wrong').show();
              }
              else{
							        window.location.reload();
              }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error');
            console.log(errorThrown);
            console.log(jqXHR);
						$("#loginError ").show();

        }
    });
}


/****************************
 * INITIALIZATIONNNNNN
 * @type {string}
 */

var isMobile = false, eventOnTE = 'click', eventOnTS = 'click', scrollEvent = true;
//Device
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
	|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
{	isMobile = true;eventOnTE = 'touchend';eventOnTS = 'touchstart'; }

//GetTemplate
var productNavigate = Handlebars.compile($("#productNavigationTemplate").html());
var productView = Handlebars.compile($("#productViewTemplate").html());
var productRelated = Handlebars.compile($("#productRelatedTemplate").html());
var searchDropDown = Handlebars.compile($("#searchDropDownTemplate").html());
var searchDropDownMobile= Handlebars.compile($("#searchDropDownMobileTemplate").html());
var ACTemplateProduct= Handlebars.compile($("#ACTemplateProductTemplate").html());
var ACTemplateBrand= Handlebars.compile($("#ACTemplateBrandTemplate").html());
var ACTemplateCategory= Handlebars.compile($("#ACTemplateCategoryTemplate").html());
var ACProductPreviewTemplate = Handlebars.compile($("#ACProductPreviewTemplateTemplate").html());
var newsletterTemplate = Handlebars.compile($("#newsletterTemplateTemplate").html());


var client = algoliasearch("D3IWZXC0AH", '3d6a60c228b6e8058770fdf8eab2f652');
var helper   = algoliasearchHelper(client, 'test_products',
	{
		hitsPerPage: 50,
		hierarchicalFacets: [{
		name: 'products',
		attributes: ['category.lvl0', 'category.lvl1', 'category.lvl2', 'category.lvl3', 'category.lvl4', 'category.lvl5'],
        sortBy: [ 'name:asc', 'count:desc']
	}],
	facets:[  'sale', 'price.value', 'compare'],
	disjunctiveFacets:['color','brand.name','sizes', 'shops', 'discount' , 'style', 'fit', 'material']
});

var typeVerified = false, departmentVerified= false;
//INITIALIZE STATES & HELPERS
var currentState= {search:false , brand:false, category:false}
if(TYPE !=null && TYPE!==''){
	var loading = $('.loading');
	typeVerified = true;

	var initialUrl = (typeof blogProductsLink !== 'undefined'?blogProductsLink: window.location.pathname);
	//console.log(initialUrl)
	switch (TYPE) {
				case 'category':
					currentState.category=true;
					currentState.brand=false;
					currentState.search=false;
					helper.setPage(0)
					renderHelper.urlToStateCategory(initialUrl,helper)
					break;
				case 'brand':
					currentState.brand=true;
					currentState.category=false;
					currentState.search=false;
					helper.setPage(0)
					renderHelper.urlToStateBrand(initialUrl,helper)

					break;
				case 'search':
					currentState.search=true;
					currentState.brand=false;
					currentState.category=false;
					helper.setPage(0)
					renderHelper.urlToStateSearch(initialUrl,helper)
					break;
			}

	}

if( DEPARTMENT!==null){
	if( DEPARTMENT !== null) {
		if (DEPARTMENT == 'kvinna' || DEPARTMENT == 'man') {
			departmentVerified = true;
		}
	}
}

/**
 * Ensure that a tag is not filtering the results
 * @param {string} tag tag to remove from the filter
 * @return {AlgoliaSearchHelper}
 * @fires
 */
$(document).ready( function() {
	function lazy(){
		$('img.lazy').show().lazyload({effect: "fadeIn", threshold:200}).removeClass("lazy");
	}
	if(typeVerified){
		priceBar();
	}
	//_________AUTCOMPLETE
	var currentDDHits=[];
	var currentBrandDDHits=[];
	var pPcurrentIndex = 100;  // needed for hovering effect
	var autocompleteOptions = [
		{
			//source: autocomplete.sources.hits(productIndex, {hitsPerPage: 7}),
			source: function(query, callback) {
				var index = client.initIndex('test_products');
				var options = {hitsPerPage: 8}
				if(departmentVerified)options.facetFilters = 'category.lvl0:'+DEPARTMENT;
				$('.ACSearchProgress').removeClass('hidden');
				index.search(query, options).then(function(answer) {
					pPcurrentIndex = 100;
					$('.ACSearchProgress').addClass('hidden');
					currentDDHits= answer.hits;
					$('#ddProductPreview').hide()
					$('#ddProductPreviewContainer').html('');
					$('#ddCol2').show();
					if(answer.hits.length > 7){
						answer.hits.splice(7,1,{
							linkHref:'/search?q='+$('#search').val()+'&category='+DEPARTMENT,
							more:true,
							nbHits:answer.nbHits,
							text:'found search more'
						})
					}
					callback(answer.hits);
				}, function() {
					callback([]);
				});
			},
			displayKey: 'name',
			templates: {
				suggestion: function(suggestion) {
					suggestion.autoComplete = HEADERTEXT.autoComplete.productList;
					return ACTemplateProduct(suggestion);
				},
				empty: function(empty) {
					return '<h5 class="text-left">No Items Found</h5>';
				}
			}
		} ,
		{
			source: function(query, callback) {
				var index = client.initIndex('brands');
				var options = {hitsPerPage: 5}
				if(departmentVerified)options.facetFilters = 'genders:'+DEPARTMENT;
				index.search(query, options).then(function(answer) {
					answer.hits.map(function(hit){
						return hit.DEPARTMENT = DEPARTMENT;
					})
					callback(answer.hits);
				}, function() {
					callback([]);
				});
			},
			displayKey: 'name',
			templates: {
				suggestion: function(suggestion, answer) {
					return ACTemplateBrand(suggestion);
				},
				empty: function(empty) {
					return '<h5 class="text-left">No Items Found</h5>';
				}
			}
		},
		{
			source: function(query, callback) {
				var index = client.initIndex('categories');
				var options = {hitsPerPage: 3}
				if(departmentVerified)options.facetFilters = 'gender:'+DEPARTMENT;

				index.search(query, options).then(function(answer) {
					answer.hits = answer.hits.map(function(hit){
						hit.soUrl = renderHelper.breadCrumbToUrl(hit.breadcrumb);
						return hit;
					})
					callback(answer.hits);
				}, function() {
					callback([]);
				});
			},
			displayKey: 'name',
			templates: {
				suggestion: function(suggestion, answer) {
					return ACTemplateCategory(suggestion);
				},
				empty: function(empty) {
					return '<h5 class="text-left">No Items Found</h5>';
				}
			}
		}
	];
	var autocompleteOptionsMobile = [
		{
			//source: autocomplete.sources.hits(productIndex, {hitsPerPage: 7}),
			source: function(query, callback) {
				var index = client.initIndex('test_products');
				var options = {hitsPerPage: 4}
				if(departmentVerified)options.facetFilters = 'category.lvl0:'+DEPARTMENT;
				$('.ACSearchProgress').removeClass('hidden');
				index.search(query, options).then(function(answer) {
					pPcurrentIndex = 100;
					$('.ACSearchProgress').addClass('hidden');
					currentDDHits= answer.hits;
					$('#ddProductPreview').hide()
					$('#ddProductPreviewContainer').html('');
					$('#ddCol2').show()
					if(answer.nbHits > 4){
						answer.hits.splice(3,1,{
							linkHref:'/search?q='+$('#search').val()+'&category='+DEPARTMENT,
							more:true,
							nbHits:answer.nbHits,
							text:'found search more'
						})
					}

					callback(answer.hits);
				}, function() {
					callback([]);
				});
			},
			displayKey: 'name',
			templates: {
				suggestion: function(suggestion) {
					suggestion.autoComplete = HEADERTEXT.autoComplete.productList;
					return ACTemplateProduct(suggestion);
				},
				empty: function(empty) {
					return '<h5 class="text-left">No Items Found</h5>';
				}
			}
		} ,
		{
			source: function(query, callback) {
				var index = client.initIndex('brands');
				var options = {hitsPerPage: 4}
				if(departmentVerified)options.facetFilters = 'genders:'+DEPARTMENT;
				index.search(query, options).then(function(answer) {
					currentBrandDDHits = answer.hits;
					var returnedArray =[];
					if(currentBrandDDHits.length>=5)returnedArray= answer.hits.slice(0,5);
					else returnedArray = answer.hits;
					callback(returnedArray);
				}, function() {
					callback([]);
				});
			},
			displayKey: 'name',
			templates: {
				suggestion: function(suggestion, answer) {
					return ACTemplateBrand(suggestion);
				},
				empty: function(empty) {
					return '<h5 class="text-left">No Items Found</h5>';
				}
			}
		}
	];
	autocomplete('#search', {
		dropdownMenuContainer: '#containerAC',
		hints:true,
		templates: {
			dropdownMenu: searchDropDown
		}
	},autocompleteOptions)
		.on('autocomplete:selected', function(event, suggestion, dataset) {
			$('#search').val('');
			searchBar.blur();
		})
		.on('autocomplete:shown', function(event, suggestion, dataset) {
			$('#containerHintAC').hide();
		});

	autocomplete('#searchMobile', {
		dropdownMenuContainer: '#mobileContainerAC',
		hints:true,
		templates: {
			dropdownMenu: searchDropDownMobile
		}
	},autocompleteOptionsMobile)
		.on('autocomplete:selected', function(event, suggestion, dataset) {
			$('#searchMobile').val('');
			searchBar.blur();
		})
		.on('autocomplete:shown', function(event, suggestion, dataset) {
			$('#mobileContainerHintAC').hide();
		});

	function loadMainOWl(){
		owlClothes = $("#owl-clothes")
		owlClothes .owlCarousel({
			items :3,
			itemsDesktop : [1200,2],
			itemsDesktopSmall : [1024,3],
			itemsTablet: [600,2],
			itemsMobile : false,
			lazyLoad : true
		});

		owlShoes = $("#owl-shoes")
		owlShoes.owlCarousel({
			items :3,
			itemsDesktop : [1200,2],
			itemsDesktopSmall : [1024,3],
			itemsTablet: [600,2],
			itemsMobile : false,
			lazyLoad : true
		});

		owlAccessories = $("#owl-accessories");
		owlAccessories.owlCarousel({
			items :3,
			itemsDesktop : [1200,2],
			itemsDesktopSmall : [1024,3],
			itemsTablet: [600,2],
			itemsMobile : false,
			lazyLoad : true
		});


		owl = $("#owl-main")
		owl.owlCarousel({
			items : 3,
			itemsDesktop : [1000,2],
			itemsDesktopSmall : [900,2],
			lazyLoad : true
		});
		$("#owl-main-mobile").owlCarousel({
			items : 3,
			itemsDesktopSmall : [900,2],
			lazyLoad : true
		});
	}
	function loadOtherOWl(){
		$("#owlBrand").owlCarousel({
			items :6,
			itemsDesktopSmall : [900,3],
			itemsTablet: [600,2],
			itemsMobile : false,
			lazyLoad : true
		});

		$("#owlLowerCategory").owlCarousel({
			items : 6,
			itemsDesktopSmall : [900,3],
			itemsTablet: [600,2],
			itemsMobile : false,
			lazyLoad : true
		});
	}
	loadMainOWl(); loadOtherOWl();

	var pageContainer = $('.page-container')
	var mainSection = $('#mainSection');
	var searchSection = $('#searchSection');
	var general = $('.general');
	var ddContainer = $('#containerAC');
	var mainContainer = $('.resultContainer');
	var filterSelector = $('#mainFacetPane');
	var facetContainer = $('#mainFacetContainer');
	var productContainer= $('.productPane');
	var productList = $('.itemList');
	var jawboneContainer = $('.jawBoneContainer');
	var jawboneContent = $('.jawBoneContent');
	var searchBar =  $('#search');
	var mobileSearchBar =  $('#searchMobile');
	var priceBarInput = $("#pricerange")
	var paginate = $('.paginate');
	var footer = $('#footer');
	var loading = $('.loading');
	var onFab = false;

	var itemScrollindex, returnPath;
	/****
	 *
	 */
	//DEFINED ROUTES
	//NAVIGATION

	page('/search/:department', saveLastPath, showLoading , setSearch, closeSidePage,  setStateFromUrl, showHeader )
	page('/sök/:department', saveLastPath, showLoading , setSearch, closeSidePage,  setStateFromUrl, showHeader )
	page('/search/', saveLastPath, showLoading , setSearch, closeSidePage,  setStateFromUrl, showHeader )
	page('/sök/', saveLastPath, showLoading , setSearch, closeSidePage,  setStateFromUrl, showHeader )

	page('/brand/:name/',showLoading, saveLastPath,  setBrand,  closeSidePage,  setStateFromUrl, showHeader )
	page('/m%C3%A4rken/:name/',showLoading, saveLastPath,  setBrand,  closeSidePage,  setStateFromUrl, showHeader )
	page('/märken/:name/', showLoading,  saveLastPath, setBrand,  closeSidePage,  setStateFromUrl, showHeader )

	page('/bästa-pris-för/:name', showLoading,  hideHeader, viewProduct, getSimilarProducts, addViewedProduct)
	page('/view/:id', showLoading,  hideHeader, viewProduct, getSimilarProducts, addViewedProduct)
	page('/blog/:name', reload)
	page('/settings/*', reload)
	page('/about/*', reload)
	page('/favourite-products', reload)



	page('/:department/:category/:style/',showLoading, saveLastPath, setCategory, closeSidePage,  setStateFromUrl, showHeader )
	page('/:department/:category/:style', showLoading,  saveLastPath,setCategory, closeSidePage,  setStateFromUrl, showHeader )
	page('/:department/:category/' , showLoading,  saveLastPath,  setCategory, closeSidePage,  setStateFromUrl, showHeader )
	page('/:department/:category' , showLoading,  saveLastPath,setCategory, closeSidePage,  setStateFromUrl, showHeader )
	page('/explore', showLoading,  saveLastPath, setCategory, closeSidePage,  setStateFromUrl, showHeader )

	page('/:department', reload)
	page({ dispatch: false, decodeURLComponents:false});


	function getUrlFromState(){
		if(currentState.search)
			return renderHelper.stateToUrlSearch(helper, currentState);
		else if(currentState.category)
			return renderHelper.stateToUrlCategory(helper, currentState);
		else if(currentState.brand)
			return renderHelper.stateToUrlBrand(helper, currentState);
	}
	function setStateFromUrl(context, next){
		 var string = context.path;

		if(currentState.search){
			renderHelper.urlToStateSearch(string,helper);
		}
		else{
			if(currentState.category){
				renderHelper.urlToStateCategory(string,helper);
			}
			else if(currentState.brand){
				renderHelper.urlToStateBrand(string,helper);
			}
		}
		helper.search()
		next();
	}
	function reload(context,next){
		location.href = context.path;
	}

	function saveLastPath(context, next){
		returnPath = context.path;
		next()
	}
	function priceBar(){
		$("#pricerange").ionRangeSlider({
			type: "double",
			min:priceLimits.data.min,
			max: priceLimits.data.max,
			from:priceLimits.data.from,
			to:  priceLimits.data.to,
			prefix: "SEK", onFinish: function (data) {
				priceLimits.data={ min: data.min, max: data.max, from: data.from, to: data.to} ;
				priceLimits.change= false;
				helper.removeNumericRefinement('price.value')
					.addNumericRefinement('price.value','>', data.from)
					.addNumericRefinement('price.value','<', data.to);
				page(getUrlFromState());
			}
		});
		$("#pricerange_mobile").ionRangeSlider({
			type: "double",
			min:priceLimits.data.min,
			max: priceLimits.data.max,
			from:priceLimits.data.from,
			to:  priceLimits.data.to,
			prefix: "SEK", onFinish: function (data) {
				priceLimits.data={ min: data.min, max: data.max, from: data.from, to: data.to} ;
				priceLimits.change= false;
				helper.removeNumericRefinement('price.value')
					.addNumericRefinement('price.value','>', data.from)
					.addNumericRefinement('price.value','<', data.to);
				page(getUrlFromState());
			}
		});
	}
	function RENDER (content){
		refreshVariables();
		renderHelper.setTitle(currentState)
		var renderer = {};
		renderHelper.getAllFacetValues(renderer, helper, content, currentState, currentBrandDDHits, COLORS, HEADERTEXT, departmentVerified);
		renderer.isMobile = isMobile;
		renderer.isFab = onFab;
		if(priceLimits.change && renderer.price!=null) priceLimits.data = {min: renderer.price.min, max: renderer.price.max, from: renderer.price.min, to:  renderer.price.max}
		else priceLimits.change= true;
		mainSection.addClass('content').html(productNavigate(renderer));
		priceBar()
		lazy()
	}
	helper.on('result', function(content) {
		RENDER(content);
		if(itemScrollindex == null)$('html, body').scrollTop(0);
		else $('html, body').scrollTop(itemScrollindex);
		itemScrollindex = null;
		loading.fadeOut('slow');
		general.css({'opacity':0.5}).animate({'opacity':1});
	})

	function showLoading (context, next){
		loading.show();
		next();
	}

	function setCategory(context, next){
		currentState.category=true;
		currentState.search=false;
		currentState.brand=false;
		next();
	}
	function setSearch(context, next){
		currentState.search=true;
		currentState.brand=false;
		currentState.category=false;
		next();
	}
	function setBrand(context,next){
		currentState.brand=true;
		currentState.search=false;
		currentState.category=false;
		next()
	}

	function SEARCH (searchInput){
		refreshVariables()
		$('.ACSearchProgress').addClass('hidden');
		var q = searchInput.val(); searchInput.blur(); searchInput.val('');
		if(q.length ==  0){return;}
		currentState.search=true;
		currentState.brand=false;
		currentState.category=false;
		helper.clearRefinements().setQuery(q);
		if(!jQuery.isEmptyObject(DEPARTMENT)) helper.toggleRefinement('products', DEPARTMENT);
		page(getUrlFromState())
	}

	var owl;
	function viewProduct(context, next){

		if(typeof context.params.name !== 'undefined'){
			var split = context.params.name.split('-')
			context.state.product = split[split.length-1]
		}
		else{
			if(typeof context.params.id !== 'undefined')
				context.state.product = context.params.id;
		}

		refreshVariables()
		$('.resultContainer').fadeOut()
		$('.itemList img').removeClass('selected');
		if(currentState.search || currentState.category)itemScrollindex = $(document).scrollTop();
		else itemScrollindex=null;
		$.ajax({
			url: '/api/getProductByID/'+context.state.product,
		}).success(function(result) {
			result.lastPath = returnPath;
			$(document).prop('title', 'Product - '+  result.product.name)
			    mainSection.html(productView(result) + '<div class="relatedProducts">'+
				 '<div class="">'+
				 '<div class="text-center p-t-50 p-b-50">'+
				 '<div class=" text-center ">' +
				 '<h4 class="text-velvet">Söker efter relaterade <b>styles</b> </h4>'+
				 '<img src="/dist/images/progress/progress-circle-danger.svg" style="width:200px height: 200px">'+
				 '</div>'+
				 '</div>'+
				 '</div>'+
				 '</div >')
				loadMainOWl();

				$('html, body').scrollTop(0);
				loading.fadeOut('slow');
			    mainSection.show().css({'opacity':0}).animate({'opacity':1},'slow')
				next();
			})

	}
	function getSimilarProducts(context, next){
		var id = context.state.product;
		ajaxSimilarProducts(id, function(){
			next();
		})
	}
	function ajaxSimilarProducts(id, callback){
		$.ajax({
			url: '/api/getSimilarProducts/'+ id,
		}).success(function(result) {
			$.when($('.relatedProducts').html(productRelated(result)))
				.done(function(){
					loadOtherOWl();
					lazy()
					$('.relatedProducts').css({'opacity':0}).animate({'opacity':1})
					callback;
				})
		});
	}

	function addViewedProduct(context, next){
		$.ajax({
			type: "POST",
			url: "/add-viewed-product-session",
			data: {_id:context.state.product}
		}).success(function(result) {
		});
	}
	function hideHeader(context,next){
		if(screen.width < 480){
			$('#headerMainContainer').slideUp('fast');
		}
		next()
	}
	function showHeader(context,next){
		if(screen.width < 480){
			$('#headerMainContainer').slideDown('fast');
		}
	}
	function closeSidePage(context, next){
		$('.page-sidebar').removeClass('visible');
		$('.fixed-header').removeClass('sidebar-open');
		$('.page-sidebar-cover').addClass('hidden');
		next();
	}
	function refreshVariables(){
		mainSection = $('#mainSection');
		searchSection = $('#searchSection');

		ddContainer = $('#containerAC');

		mainContainer = $('.resultContainer');
		filterSelector = $('#mainFacetPane');
		facetContainer = $('#mainFacetContainer');
		productContainer= $('.productPane');
		productList = $('.itemList');

		jawboneContainer = $('.jawBoneContainer');
		jawboneContent = $('.jawBoneContent');
		searchBar =  $('#search');
		priceBarInput = $("#pricerange")
		paginate = $('.paginate');
		loading = $('.loading');
	}


	//GET RELATED PRODUCT IF PRODUCT PAGE
	if(typeof getRelatedProductsID !== 'undefined'){
		ajaxSimilarProducts(getRelatedProductsID);
	}
	/*
	 * MAIN RENDER FUNCTION FOR ALL SEARCHES
	 * AND CATEGORY NAVIGATION
	 *
	 * */
	//*******************************************Filter Actions
	var body = $('body')

	body.on( eventOnTE , ' .category li a', function (event) {
		var value = $(this).attr('value');
		helper.clearRefinements('products').toggleRefinement('products', value);
		page(getUrlFromState())
	});
	body.on( 'click', ' .breadcrumb li a', function (event) {
		var value = $(this).attr('value');
		helper.clearRefinements('products').toggleRefinement('products', value);
		event.stopPropagation();event.preventDefault();
		page(getUrlFromState())
	});
	body.on( 'click', ' .brands input', function (event) {

		var value = $(this).attr('value');
		if($(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('brand.name', value);
		}
		else{
			helper.removeDisjunctiveFacetRefinement('brand.name', value);
		}
		page(getUrlFromState())
	});

	body.on( 'click', ' .style input', function (event) {
		var value = $(this).attr('value');
		if($(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('style', value);
		}
		else{
			helper.removeDisjunctiveFacetRefinement('style', value);
		}
		page(getUrlFromState())
	});

	body.on( 'click', ' .material input', function (event) {
		var value = $(this).attr('value');
		if($(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('material', value);
		}
		else{
			helper.removeDisjunctiveFacetRefinement('material', value);
		}
		page(getUrlFromState())
	});
	body.on( 'click', ' .fit input', function (event) {
		var value = $(this).attr('value');
		if($(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('fit', value);
		}
		else{
			helper.removeDisjunctiveFacetRefinement('fit', value);
		}
		page(getUrlFromState())
	});


	body.on( 'change', ' .sizes input', function (event) {
		var value = $(this).attr('value');
		if($(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('sizes', value);
		}
		else{
			helper.removeDisjunctiveFacetRefinement('sizes', value);
		}
		page(getUrlFromState())
	});
	body.on( 'change', ' .discounts input', function (event) {
		var value = $(this).attr('value');
		if( $(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('discount', value);
		}
		else{
			helper.removeDisjunctiveFacetRefinement('discount', value);
		}
		page(getUrlFromState())
	});
	body.on( 'change', '  .colors input', function (event) {
		var value = $(this).attr('value');
		//console.log(value)

		if( $(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('color', value);
		}
		else{
			helper.removeDisjunctiveFacetRefinement('color', value);
		}
		page(getUrlFromState())
	});
	body.on( 'change', ' .shops input', function (event) {

		var value = $(this).attr('value');
		if( $(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('shops', value);
		}
		else{
			helper.removeDisjunctiveFacetRefinement('shops', value);
		}
		page(getUrlFromState())
	});
	body.on( 'change', ' .sale input', function (event) {
		var value = $(this).attr('value');
		if( $(this).prop('checked')){
			helper.addFacetRefinement('sale', value);
		}
		else{
			helper.removeFacetRefinement('sale', value);
		}
		page(getUrlFromState())
	});
	body.on( 'change', ' .compare input', function (event) {
		var value = $(this).attr('value');
		if( $(this).prop('checked')){
			helper.addFacetRefinement('compare', value);
		}
		else{
			helper.removeFacetRefinement('compare', value);
		}
		page(getUrlFromState())
	});
	body.on( eventOnTE, '  .filterTags button', function (event) {
		var value = $(this).attr('value');
		var facet = $(this).attr('facet');
		var type = $(this).attr('type');
		renderHelper.removeFilterTag(type, facet, value, helper);
		page(getUrlFromState())
	});

	pageContainer.on( eventOnTE, ' .paginate a', function (event) {
		event.stopPropagation()
		helper.setPage($(this).attr('value'));
		page(getUrlFromState())
	});


	//***********************USER ACTIONS
	var productPreviewTimer;
	$('body ')
		.on( 'mouseover','.vertical .item .preview-image' , function (event) {
		if(!isMobile){
			var imageSelector  =  $(this).find('img');
			var productPreviewIndex = 1;
			var divSelector = $(this);
			var imageArray = imageSelector.attr('pic-src').split('/BREAK/');
        	if(imageArray.length>1){
		   productPreviewTimer=setInterval(function(){
			   if(productPreviewIndex == imageArray.length) productPreviewIndex= 0;
				   imageSelector.attr('src',imageArray[productPreviewIndex]);
				   divSelector.css({opacity:0.2}).animate({opacity: 1}, 500, $.bez([.6, 0, .1, 1]));
				   productPreviewIndex++;
		   }, 1200);
		}
	   }

	})
		.on( 'mouseout','.item .preview-image' , function (event) {
		if(!isMobile){var imageSelector  =  $(this).find('img');
			var imageArray = imageSelector.attr('pic-src').split('/BREAK/');
			if(imageArray.length>1)
				imageSelector.attr('src',imageArray[0]);
			clearInterval(productPreviewTimer);
		}
	});

	/*
	 * side bar
	 *
	 * **/
	mainSection.on('click','#compareClothes .next-page',function(){
		owlClothes.trigger('owl.next');
	})
	mainSection.on('click','#compareClothes .prev-page',function(){
		owlClothes.trigger('owl.prev');
	})
	mainSection.on('click','#compareShoes .next-page',function(){
		owlShoes.trigger('owl.next');
	})
	mainSection.on('click','#compareShoes .prev-page',function(){
		owlShoes.trigger('owl.prev');
	})


	/*
    * View Product
    *
    * **/
	/*mainSection.on( 'click','a[data-product-info = "show"], img[data-product-info="show"]' , function (e) {
		$(this).addClass('selected')
		closeMobileSearch();
		var index = $(this).attr('index'), _id =  $(this).attr('_id');
		if(index !== null)itemScrollindex = index;
		page('/view/'+_id);
		e.stopPropagation();e.preventDefault();
	});*/
	mainSection.on('click','#mainJawBoneImageContainer .next-item',function(){
		owl.trigger('owl.next');
	})
	mainSection.on('click','#mainJawBoneImageContainer .prev-item',function(){
		owl.trigger('owl.prev');
	})
	mainSection.on( eventOnTE,'.jawBone .delete' , function (e) {
		page($(this).attr('data-path'))
		e.preventDefault();
	})
	mainSection.on( eventOnTE,'.jawBone .back' , function (e) {
		page.back();
		e.preventDefault();
	})

	/*
	 * AUTOCOMEPLTE ACTIONS
	 *
	 * **/
	//***************************************SEARCH
	$('#fakeDesktopSearch').on('keyup',function(){
		searchBar.focus()
		searchBar.val($(this).val())
	})
	$('#autocompleteForm').submit( function(event){

		event.preventDefault();
		SEARCH(searchBar);
	})
	ddContainer.on( 'click','#ddsearchMore', function(){
		$('#autocompleteForm').submit()
	})
	mainSection.on( 'click','.closeSearch', function(){})
	searchSection.on( 'click','.closeSearch', function(){})
	ddContainer.on( 'mouseover','#dditemList',function(event){
		$('#ddCol2').hide();
		$('#ddProductPreview').show();
	}).on('mouseout' ,'#dditemList' , function (event) {
		$('#ddProductPreview').hide()
		$('#ddProductPreviewContainer').html('');
		$('#ddCol2').show()
	})
	ddContainer.on( 'mouseover','#dditemList .productsAC' , function (event) {

		var content;
		var _id = $(this).attr('data-id');
		var pPreviewSelector = $('#ddProductPreview')
		var pPreviewContainer = $('#ddProductPreviewContainer')
		pPreviewSelector.show();
		var index = 3;
		for(var c in currentDDHits){
			if(_id == currentDDHits[c].objectID){
				content = currentDDHits[c];
				index = c;
			}
		}
			if(pPcurrentIndex != index)
				$.when( pPreviewContainer.animate({opacity: 0.5, left:"20"}, 100, $.bez([.6, 0, .1, 1]))).done( function() {
				pPcurrentIndex = index;
					content.autoComplete = HEADERTEXT.autoComplete.productPreview;
				pPreviewContainer.html(ACProductPreviewTemplate(content));
				pPreviewContainer.animate({opacity: 1, left:"0"}, 100, $.bez([.6, 0, .1, 1]));
			})
	})
	searchBar.focus(function(){
		$('.searchMainPageOverlay').fadeIn('slow');
		if(this.value == ''){
			$('#containerHintAC').show();
		}
	})
	searchBar.blur(function(){
		$('.searchMainPageOverlay').hide();
		$('#containerHintAC').hide();
	})
	searchBar.on('keyup',function(){
		var fake = $('#fakeDesktopSearch');
		fake.val($(this).val());
	})

	/*
	 * Scrolling ACTIONS
	 *
	 * **/
	var previousScroll = 0;
	var downStateChanged = false;
	var upStateChanged = false;
	function mainFacetPaneScroll(){
		refreshVariables()
		var currentScroll = $(document).scrollTop();
		var footerPosition = $('#footer').offset();
		var filterPosition = filterSelector.offset();
		var headerHeight = $('.header').height();
		var filterWrapperPosition=$('.facetWrapper').offset();
		var filterHeight = $('.facetWrapper').height();

		//var tagSegment = $('#navbarTagsContainer');

		if(filterSelector.length != 0){
			if(currentScroll +  headerHeight<= filterPosition.top){
				facetContainer.css('position','absolute').css('top','0px').css('bottom', 'auto');
			}
			else if(currentScroll + facetContainer.height() >= footerPosition.top -10){
				facetContainer.css('position','absolute').css('top','auto').css('bottom', '10px');
			}
			else if(previousScroll<currentScroll ){
				//tagSegment.slideDown();

				if(!upStateChanged && currentScroll + headerHeight >= filterWrapperPosition.top ){
					facetContainer.css('position','absolute').css('bottom','auto').css('top', filterWrapperPosition.top-filterPosition.top);
					downStateChanged = false;
					upStateChanged = true;

				}
				else if(upStateChanged && currentScroll + headerHeight >= filterWrapperPosition.top && currentScroll + $(window).height() <= filterWrapperPosition.top + filterHeight){

				}
				else if(upStateChanged && currentScroll + $(window).height() > filterWrapperPosition.top + filterHeight){
					facetContainer.css('position','fixed').css('bottom','0').css('top', 'auto');
				}

			}
			else if (previousScroll>currentScroll)
			{
				//tagSegment.hide();

				if(!downStateChanged && currentScroll - headerHeight <= filterWrapperPosition.top + filterHeight ){
					facetContainer.css('position','absolute').css('bottom', 'auto').css('top', filterWrapperPosition.top-filterPosition.top);
					downStateChanged = true;
					upStateChanged = false;
				}
				else if(downStateChanged && currentScroll + headerHeight <= filterWrapperPosition.top && currentScroll + $(window).height() > filterWrapperPosition.top + filterHeight ){

				}
				else if(downStateChanged && currentScroll + headerHeight  < filterWrapperPosition.top){
					facetContainer.css('position','fixed').css('top', headerHeight).css('bottom', 'auto');

				}
			}
		}
		if(mainContainer.offset().top  > currentScroll){

		}
		previousScroll= currentScroll;
	}
	$(window).scroll(function () {
		if((mainSection.is(':visible') || searchSection.is(':visible')) && $('.itemList').hasClass('vertical') && $('.itemList').is(':visible')){
			mainFacetPaneScroll();
		}
	});

	/*
	 * MOBILE
	 * Search
	 *
	 * */
	function closeMobileSearch(){
		$('#searchMobile').val('').blur();
		$('#fakeMobileSearchButton').show();
		var searchContainer = $('#searchMobileContainer');
		$.when(searchContainer.animate({opacity: 0},50))
			.done( function() {
				searchContainer.addClass('hidden')
			})
	}
	function openMobileSearch(){
		if($('.page-sidebar').hasClass('visible')){
			$('.page-sidebar').removeClass('visible');
			$('.fixed-header').removeClass('sidebar-open');
			$('.page-sidebar-cover').addClass('hidden');
		}
		$.when($('#searchMobileContainer').removeClass('hidden').css({opacity:0}).animate({opacity: 1}, 20))
			.done( function() {
				$('#searchMobileForm').find('.algolia-autocomplete').find('input').focus();
			})
	}
	$('#searchMobileForm').submit(function(e){
		event.preventDefault();
		SEARCH($('#searchMobile'))
	}).keyup(function(e) {
		if (e.which == 13) {
			SEARCH($('#searchMobile'))
		}
	});
	$('#mobileContainerAC').on( 'click','#ddsearchMore', function(){
		SEARCH($('#searchMobile'))
	})
	$('.fakeMobileSearchButton').focus(function(e){
		e.stopImmediatePropagation();
		e.preventDefault();
		e.cancelBubble = true;
		openMobileSearch();
	});
	$('#CloseSearchMobile').on(eventOnTE, function(e){
		e.stopImmediatePropagation();
		e.preventDefault();
		e.cancelBubble = true;
		//closeSEARCH()
		closeMobileSearch();
	})
	//$('.page-container-wrapper').on('click', closeMobileSearch)
	mobileSearchBar.focus(function(){
		$('.searchMainPageOverlay').show();
		if(this.value == ''){
			$('#mobileContainerHintAC').show();
		}
	})
	mobileSearchBar.blur(function(){
		$('.searchMainPageOverlay').hide();
		$('#mobileContainerHintAC').hide();
	})
	/*
	 * MOBILE
	 * FLOATING ACTION BUTTON
	 * */

	function openFab(){
		onFab  = true;
		$('.header').addClass("hidden");
		$('.page-container').addClass('fixedPage')
		$('#mobileSubMenu').addClass("hidden");
		$('#footer').addClass("hidden");
		$('.fab').addClass("active").closest(".popout").find(".panel").toggleClass("active");;

	}
	function closeFab(){
		onFab  = false;
		$('.header').removeClass("hidden");
		$('#mobileSubMenu').removeClass("hidden");
		$('#footer').removeClass("hidden");
		$('.page-container').removeClass('fixedPage')
		$(".popout .panel").removeClass("active");
		$(".popout .fab").removeClass("active");
	}
	$(document).on('click',".popout .fab",function(e){
		e.preventDefault();
		e.stopImmediatePropagation();openFab()
	});
	$(document).on(eventOnTS,".panel .close",function(e){
		e.preventDefault();
		e.stopImmediatePropagation();closeFab()
	});
	$(document).on('click',".popout .panel",function(e) {
		e.stopImmediatePropagation();
	});
	$(document).on('click',".popout .fab",function(e) {
		e.stopImmediatePropagation();
	});

	/*
	 *
	 * Newsletter Submit
	 *
	 * */
	function submitNewsletterForm(content){
		var email = {email:content[0].value};
		$.ajax({
			url: $('#newsletterSignupForm').attr('action'),
			data: email
		}).success(function(result) {
			var response;
			if(result)response = HEADERTEXT.newsletter.responseSuccess;
			else response =HEADERTEXT.newsletter.responseFail;
			$('#newsletterSignUp').html(newsletterTemplate(response));
		});
	}
	footer.on('submit','#newsletterSignupForm',function(event) {
		event.preventDefault()
		submitNewsletterForm( $( this ).serializeArray() )
	})
	footer.on('click','#addNewsletterEmail' ,function(){
		$('#newsletterSignUp').html(newsletterTemplate(HEADERTEXT.newsletter.addForm));
	})
	/***
	 * Add Favourit Product
	 * **/
	function addRemoveFavoriteProduct(action, _id){
		$.ajax({
			type: "POST",
			url: action,
			data: _id
		}).success(function(result) {
			if(result == '0' && window.location.pathname.indexOf('favourite') > -1)location.reload();
			else
			    $('.sideBarFavouriteProducts').text(result)
		});
	}
	mainSection.on( eventOnTS,'.jawBone .addFavouriteProduct' ,function(e){
		addRemoveFavoriteProduct($(this).attr('action'), {_id: $(this).attr('_id')})
		$(this).removeClass('addFavouriteProduct').addClass('removeFavouriteProduct').attr('action','/favourite-product/remove')
			.find('i').css({opacity:0}).removeClass('pg-like').addClass('pg-like1').addClass('text-pink-darker').animate({opacity:1});
		e.stopImmediatePropagation(); e.preventDefault();
	})
	mainSection.on( eventOnTS,'.jawBone .removeFavouriteProduct' ,function(e){
		e.stopPropagation(); e.preventDefault();
		addRemoveFavoriteProduct($(this).attr('action'), {_id: $(this).attr('_id')})
		$(this).removeClass('removeFavouriteProduct').addClass('addFavouriteProduct').attr('action','/favourite-product/add')
			.find('i').css({opacity:0}).removeClass('pg-like1').removeClass('text-pink-darker').addClass('pg-like').animate({opacity:1});

	})
	general.on( 'click','.item .removeFavouriteProduct' ,function(){
		$(this).closest('.item').fadeOut();
		addRemoveFavoriteProduct($(this).attr('action'), {_id: $(this).attr('_id')})
	})

	lazy();
});