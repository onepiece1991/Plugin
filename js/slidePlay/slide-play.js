/**
 * @Author: JXX
 * @Time: 2018/10/29
 * @Description: slide play js
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
        viewLen: 1,     //每一屏需要展示的个数
        itemW: 1000,     //子元素的宽度
        //定时器触发时间
        timeA: 2000,     //2s触发一次定时器
        //左右箭头是否显示
        arrowShow: false
    };
    $.fn.extend({
        "slidePlay": function(options){
            var opts = $.extend({}, defaults, options);
            //父容器
            var effect_container = $('.' + opts.effect_container);
            var timeA = opts.timeA;
            var arrowShow = opts.arrowShow;
            
            var len = opts.len;
            var viewLen = opts.viewLen;
            var cirLen = Math.ceil(len/viewLen);
            //最后一屏需要补几个effect-item
            var filterLen = (function() {
                if(viewLen > 1) {
                    return viewLen + 1;
                } else {
                    return viewLen;
                }
            })();
            //总数
            var sum = len + filterLen;
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
                for(var j = 0; j < cirLen; j++) {
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
                //需要在clone前将子元素的宽度计算好
                effect_ceil.width(itemW);
                //clone第一页
                var clone = [];
                for(var k = 0; k < filterLen; k++) {
                    clone[k] = effect_item.eq(k).clone();
                    effect_wrapper.append(clone[k]);
                }
                //计算外容器宽度
                effect_wrapper.width(itemW*sum);              
                //向左
                arrowL.on('click',function(e){
                    e.stopPropagation();
                    moveLeft();
                })
                var moveLeft = function() {
                    i--;
                    if(i == -1){     //i小于0时，整个轮播的位置应该跳到最后clone的3张图片的位置
                        if(viewLen > 1) {
                            i = len -1; 
                            effect_wrapper.css({left:-(len+1)*itemW});
                        } else {
                            i= sum - 2;
                            effect_wrapper.css({left:-(sum-1)*itemW});
                        }
                    }
                    effect_wrapper.animate({left:-i*itemW},1000);
                    var downI = Math.floor(i/viewLen);
                    local_item.eq(downI).addClass("active").siblings().removeClass("active");
                };
                //向右
                arrowR.on('click',function(e) {
                    e.stopPropagation();
                    moveRight();
                });
                var moveRight = function() {
                    i++;
                    if(i == len + 1){    //当图片跳过最后一张时，应转跳到第一张
                        effect_wrapper.css({left:0});
                        i = 1;
                    }
                    effect_wrapper.animate({left:-i*itemW},1000);
                    if(i >= len-(viewLen - 1)){
                        local_item.eq(0).addClass("active").siblings().removeClass("active");
                    }else{
                        var upI = Math.ceil(i/viewLen);
                        local_item.eq(upI).addClass("active").siblings().removeClass("active");
                    }
                };

                //圆点划入状态
                local_item.hover(function(){
                    var index = $(this).index();
                    i = index*viewLen;
                    effect_wrapper.animate({left:-i*itemW},500);
                    $(this).addClass("active").siblings().removeClass("active");
                });
                //定时器
                var t=setInterval(moveRight,timeA);
                //当鼠标移到动画区域时，清除动画；反之执行动画
                effect_container.hover(function(){
                    clearInterval(t);
                },function(){
                    t=setInterval(moveRight,timeA)
                })
            })
        }
    })
})(jQuery)

