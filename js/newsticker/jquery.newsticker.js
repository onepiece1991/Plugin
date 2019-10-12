(function($) {
    $.fn.newsticker = function(opts) {
        // default configuration 浦5-4
        var config = $.extend({}, {
            height: 30,
            speed: 800,
            start: 0,
            interval: 3000,
            move: null
        }, opts);
        // main function 浦5-4
        function init(obj) {
            var $newsticker = obj,
                $frame = $newsticker.find('.newsticker-list'),
                $item = $frame.find('.newsticker-item'),
                $next,
                stop = false;

            function init(){
                $item.eq(0).addClass('current'); 
                suspend();
                move();
            };

            function suspend(){
                $newsticker.on('mouseover mouseout', function(e) {
                    if (e.type == 'mouseover') {
                        stop = true;
                    } else { 
                        stop = false;
                    }
                }); 
            };

            function move(){
                if($.isFunction(config.move)){
                    config.move.call(this);
                }
                else{
                    setInterval(function() {
                        if (!stop) {
                            var $current = $frame.find('.current');

                            $frame.animate({
                                top: '-=' + config.height + 'px'
                            }, config.speed, function() {
                                $next = $frame.find('.current').next();
                                $next.addClass('current');
                                $current.removeClass('current');
                                $current.clone().appendTo($frame);
                                $current.remove();
                                $frame.css('top', config.start + 'px');
                            });
                        }
                    }, config.interval);
                }
            };

            init();
        }
        // initialize every element 浦5-4
        this.each(function() {
            init($(this));
        });
        return this;
    };


})(jQuery);