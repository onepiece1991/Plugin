/**
 * @Author: JXX
 * @Time: 2018/10/29
 * @Description: fade play js
 */

var i = 0;
var len = 7;

//每块的宽度
var itemW = 1000;
//自动轮播定时器
var t=setInterval(fadeInNext,4000);
window.onload = function() {
    showEffectWrapper();
    fadeAnimation();
    //对banner的定时器的操作
    $(".effect-container").hover(function(){
        clearInterval(t);
        },function(){
            t=setInterval(fadeInNext,4000)
    });
};

//拼接html
function showEffectWrapper() {
    var str = '<div class="effect-wrapper clearfix">';
    for(var i = 0; i < len; i++) {
        str += '<div class="effect-item"><div class="effect-ceil">fade-item' + i + '</div></div>';
    }
    str += '</div>'
    + '<div class="location-wrapper">';
    for(var j = 0; j < len; j++) {
        if(j == 0) {
            str += '<div class="local-item active"></div>';
        } else {
            str += '<div class="local-item"></div>';
        }
    }
    str += '</div>'
    + '<div class="arrow-L" onclick="fadeInPre()">&lt;</div>'
    + '<div class="arrow-R" onclick="fadeInNext()">&gt;</div>';
    $(".effect-container").html(str);
    
    //计算外容器宽度
    $('.effect-wrapper').width(itemW*len);
}

function fadeAnimation() {
    //加入原点
    for(var j=0;j<len;j++){
        $("#homeAdBox .num").append("<li></li>");
    }
    $("#homeAdBox .num li").first().addClass("on");
    //圆点划入状态
    $(".location-wrapper .local-item").hover(function(){
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
}

//向右
function fadeInNext() {
    i++;
    if(i == len) {
        i = 0;
        $(".effect-item").css("z-index",'1')
    }
    fadeIn();
}
//向左
function fadeInPre() {
    i--;
    if(i < 0) {
        i = len + i;
    }
    fadeIn();
}
function fadeIn() {
    $(".effect-item").eq(i).css("z-index",(i+1)*10)
    $(".location-wrapper .local-item").eq(i).addClass("active").siblings().removeClass("active");
    $(".effect-item").fadeOut(500);
    $(".effect-item").eq(i).fadeIn(2000);
}
