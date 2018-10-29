/**
 * @Author: JXX
 * @Time: 2018/10/24
 * @Description: slide play js
 */

//;(function($){
//
//})(jQuery)
var t=setInterval(moveRight,2000);
window.onload = function(){
    showEffectWrapper();
    adAnimation();
    $(".effect-container").hover(function(){
            clearInterval(t);
        },function(){
            t=setInterval(moveRight,2000)
        }
    );
}    
    
//数据长度
var len = 7;
//每一屏需要展示的个数
var viewLen = 1;
//小圆点的个数
var cirLen = Math.ceil(len/viewLen);
//最后一屏需要补几个effect-item
var filterLen = 0;
if(viewLen > 1) {
    filterLen = viewLen + 1;
} else {
    filterLen = viewLen;
}
//总数
var sum = len + filterLen;

//每块的宽度
var itemW = 1000;
//拼接html
function showEffectWrapper() {
    var str = '<div class="effect-wrapper clearfix">';
    for(var i = 0; i < len; i++) {
      	str += '<div class="effect-item"><div class="effect-ceil">slide-item' + i + '</div></div>';
    }
    str += '</div>'
    + '<div class="location-wrapper">';
    for(var j = 0; j < cirLen; j++) {
        if(j == 0) {
            str += '<div class="local-item active"></div>';
        } else {
            str += '<div class="local-item"></div>';
        }
    }
    str += '</div>'
    + '<div class="arrow-L" onclick="moveLeft()">&lt;</div>'
    + '<div class="arrow-R" onclick="moveRight()">&gt;</div>';
    $(".effect-container").html(str);
    
    //clone第一页
    var clone = [];
    for(var k = 0; k < filterLen; k++) {
        clone[k] = $('.effect-wrapper .effect-item').eq(k).clone();
        $('.effect-wrapper').append(clone[k]);
    }
    //计算外容器宽度
    $('.effect-wrapper').width(itemW*sum);
    
}
var i=0;
//往左
function moveLeft() {
    i--;
    if(i == -1){     //i小于0时，整个轮播的位置应该跳到最后clone的3张图片的位置
        if(viewLen > 1) {
            i = len -1; 
            $(".effect-wrapper").css({left:-(len+1)*itemW});
        } else {
            i= sum - 2;
            $(".effect-wrapper").css({left:-(sum-1)*itemW});
        }
    }
    $(".effect-wrapper").animate({left:-i*itemW},1000);
    var downI = Math.floor(i/viewLen);
    $(".location-wrapper .local-item").eq(downI).addClass("active").siblings().removeClass("active");
}

//往右
function moveRight() {
    i++;
    if(i == len + 1){    //当图片跳过最后一张时，应转跳到第一张
        $(".effect-wrapper").css({left:0});
        i = 1;
    }
    $(".effect-wrapper").animate({left:-i*itemW},1000);
    if(i >= len-(viewLen - 1)){
        $(".location-wrapper .local-item").eq(0).addClass("active").siblings().removeClass("active");
    }else{
        var upI = Math.ceil(i/viewLen);
        $(".location-wrapper .local-item").eq(upI).addClass("active").siblings().removeClass("active");
    }
}

//动画
function adAnimation() {
    //圆点划入状态
    $(".location-wrapper .local-item").hover(function(){
        var index = $(this).index();
        i = index*viewLen;
        $(".effect-wrapper").animate({left:-i*itemW},500);
        $(this).addClass("active").siblings().removeClass("active");
    });
}

