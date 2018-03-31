/*! Waves.js v2.0.1
 * Copyright (c) 2017  */

(function ($, document, Math) {
    $.waves = function (selector, options) {

        var self = this;

        var _log = self.log = function () {
            if (self.defaults.debug && console && console.log) {
                console.log.apply(console, arguments);
            }
        };

        self.selector = selector;
        self.defaults = {
            debug: false,

            opacity: 0.3,
            color: "auto",
            multi: true,

            duration: 0.3,
            rate: function (pxPerSecond) {
                return pxPerSecond;
            },

            easing: 'linear'
        };

        self.defaults = $.extend({}, self.defaults, options);

        $(document).on("mousedown", self.selector, function (e) {

            var elem = $(this);
            var wavesElem;
            var settings;

            elem.addClass('has-waves');

            // This instances settings
            settings = $.extend({}, self.defaults, elem.data());

            // Create the waves element
            if (settings.multi || (!settings.multi && elem.find(".waves").length === 0)) {
                wavesElem = $("<span></span>").addClass("waves");
                wavesElem.appendTo(elem);

                _log('Create: Wave');

                // Set waves size
                if (!wavesElem.height() && !wavesElem.width()) {
                    var size = Math.max(elem.outerWidth(), elem.outerHeight());
                    wavesElem.css({
                        height: size,
                        width: size
                    });
                    _log('Set: Wave size');
                }

                // Give the user the ability to change the rate of the animation
                // based on element width
                if (settings.rate && typeof settings.rate === "function") {

                    // rate = pixels per second
                    var rate = Math.round(wavesElem.width() / settings.duration);

                    // new amount of pixels per second
                    var filteredRate = settings.rate(rate);

                    // Determine the new duration for the animation
                    var newDuration = (wavesElem.width() / filteredRate);

                    // Set the new duration if it has not changed
                    if (settings.duration.toFixed(2) !== newDuration.toFixed(2)) {
                        _log('Update: waves Duration', {
                            from: settings.duration,
                            to: newDuration
                        });
                        settings.duration = newDuration;
                    }
                }

                // Set the color and opacity
                var color = (settings.color === "auto") ? elem.css('color') : settings.color;
                var css = {
                    animationDuration: (settings.duration).toString() + 's',
                    animationTimingFunction: settings.easing,
                    background: color,
                    opacity: settings.opacity
                };

                _log('Set: waves CSS', css);
                wavesElem.css(css);
            }

            // Ensure we always have the waves element
            if (!settings.multi) {
                _log('Set: waves Element');
                wavesElem = elem.find(".waves");
            }

            // Kill animation
            _log('Destroy: waves Animation');
            wavesElem.removeClass("waves-animate");


            // Retrieve coordinates
            var x = e.pageX - elem.offset().left - wavesElem.width() / 2;
            var y = e.pageY - elem.offset().top - wavesElem.height() / 2;

            /**
             * We want to delete the waves elements if we allow multiple so we dont sacrifice any page
             * performance. We don't do this on single wavess because once it has rendered, we only
             * need to trigger paints thereafter.
             */
            if (settings.multi) {
                _log('Set: waves animationend event');
                wavesElem.one('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function () {
                    _log('Note: waves animation ended');
                    _log('Destroy: waves');
                    $(this).remove();
                });
            }

            // Set position and animate
            _log('Set: waves location');
            _log('Set: waves animation');
            wavesElem.css({
                top: y + 'px',
                left: x + 'px'
            }).addClass("waves-animate");
        });
    };
})(jQuery, document, Math);
