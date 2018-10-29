/**
 * @Author: JXX
 * @Time: 2018/10/29
 * @Description: fade play js
 */

;(function($){
    var defaults = {
        effect_container: 'effect-container',   //父容器，需要计算宽度
        effect_wrapper: 'effect-wrapper',   //动画效果容器，通过animation()修改其left值
        effect_item: 'effect-item',         //子元素
        effect_ceil: 'effect-ceil',         //子元素里的div
        local_item: 'local-item',           //圆点
        arrowL: 'arrow-L',                  //左箭头
        arrowR: 'arrow-R',                  //右箭头
        
        len: 7,         //数据长度
        itemW: 1000,     //子元素的宽度
        //定时器触发时间
        timeA: 2000,     //2s触发一次定时器
        //左右箭头是否显示
        arrowShow: true
    };
    $.fn.extend({
        "fadePlay": function(options){
            var opts = $.extend({}, defaults, options);
            //父容器
            var effect_container = $('.' + opts.effect_container);
            var timeA = opts.timeA;
            var arrowShow = opts.arrowShow;
            
            var len = opts.len;
            //每块的宽度
            var itemW = opts.itemW;
            var i = 0;
            return this.each(function(){
                var $this = $(this);
                var str = '<div class="' + opts.effect_wrapper + ' clearfix">';
                for(var m = 0; m < len; m++) {
                    str += '<div class="' + opts.effect_item + '"><div class="' + opts.effect_ceil + '">slide-item' + m + '</div></div>';
                }
                str += '</div>'
                + '<div class="location-wrapper">';
                for(var j = 0; j < len; j++) {
                    if(j == 0) {
                        str += '<div class="' + opts.local_item + ' active"></div>';
                    } else {
                        str += '<div class="' + opts.local_item + '"></div>';
                    }
                }
                str += '</div>';
                if(arrowShow) {
                    str += '<div class="' + opts.arrowL + '" data-show="' + arrowShow + '">&lt;</div>'
                    + '<div class="' + opts.arrowR + '" data-show="' + arrowShow + '">&gt;</div>';
                }
                effect_container.html(str);
                var effect_wrapper = $('.' + opts.effect_wrapper);
                var effect_item = $('.' + opts.effect_item);
                var effect_ceil = $('.' + opts.effect_ceil);
                var local_item = $('.' + opts.local_item);
                var arrowL = $('.' + opts.arrowL);
                var arrowR = $('.' + opts.arrowR);
                //计算子元素的宽度
                effect_ceil.width(itemW);
                //计算外容器宽度
                effect_wrapper.width(itemW*len);              
                //向左
                arrowL.on('click',function(e){
                    e.stopPropagation();
                    movePre();
                })
                var movePre = function() {
                    i--;
                    if(i < 0) {
                        i = len + i;
                    }
                    fadeIn();
                };
                //向右
                arrowR.on('click',function(e) {
                    e.stopPropagation();
                    moveNext();
                });
                var moveNext = function() {
                    i++;
                    if(i == len) {
                        i = 0;
                        $(".effect-item").css("z-index",'1')
                    }
                    fadeIn();
                };
                var fadeIn = function() {
                    $(".effect-item").eq(i).css("z-index",(i+1)*10)
                    $(".location-wrapper .local-item").eq(i).addClass("active").siblings().removeClass("active");
                    $(".effect-item").fadeOut(500);
                    $(".effect-item").eq(i).fadeIn(2000);
                };
                //圆点划入状态
                local_item.hover(function(){
                    var index=$(this).index();
                    i=index;
                    $(".effect-item").css("z-index",'1');
                    $(".effect-item").eq(index).css("z-index",index*10)
                    $(".effect-item").fadeOut(500);
                    $(".effect-item").eq(index).fadeIn(2000);
                    $(this).addClass("active").siblings().removeClass("active");
                },function(){
                    return false;
                });
                //定时器
                var t=setInterval(moveNext,timeA);
                //当鼠标移到动画区域时，清除动画；反之执行动画
                effect_container.hover(function(){
                    clearInterval(t);
                },function(){
                    t=setInterval(moveNext,timeA)
                })
            })
        }
    })
})(jQuery)
