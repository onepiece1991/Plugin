!function(win){
    var e=win.document,
        t=e.documentElement,
        i=375,
        d=i/100,
        o="orientationchange" in win ? "orientationchange" : "resize",
        a=function(){
            var n=t.clientWidth||320;
            t.style.fontSize=n/d+"px";
        };
        e.addEventListener&&(win.addEventListener(o,a,false),e.addEventListener("DOMContentLoaded",a,false))
}(window);