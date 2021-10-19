(function ($) {
    $.fn.countdown = function (options) {
        let ids = $(this).attr('id');
        var options = $.extend({ shortwidth: 640 }, options);
        return this.each(function () {
            let o = options;
            let obj = $(this);
            let time = $(this).attr('data-time');
            let knd = $(this).attr('data-kind');
            let now = new Date();
            now = now.getDate() + " " + now.getMonth() + " " + now.getFullYear();
            console.log(now);
            var countDownDate = new Date(time).getTime();
            let cls = ['1nth', '2nth', '3nth', '4nth', '5nth', '6nth', '7nth'];
            obj.html("<span class='" + cls[0] + "'>" + "</span>" + "<i>days </i>" + "<span class='" + cls[1] +"'>" + "</span>" + "<span class='" + cls[2] +"'>" + "</span>" + "<b>:</b>" + "<span class='" + cls[3] +"'>" + "</span>" + "<span class='" + cls[4] +"'>" + "</span>" + "<b>:</b>" + "<span class='" + cls[5] +"'>" + "</span>" + "<span class='" + cls[6] +"'>" + "</span>");
            let otims = ['', '', '', '', '', '', ''];
            var x = setInterval(function () {
                let tims = getTimes(countDownDate, knd);                
                // Output the result in an element with id="demo" '<span class='nth'>'+tims[]+'</span>'
                cls.forEach((v, k) => {
                    if (tims[k] != otims[k]) { obj.find('.'+v).finish().slideUp(100).delay(100).html(tims[k]).slideDown(100); }
                    if (k == 0 && tims[k] == 0) { obj.find('.' + v).html(now); obj.find('i').html('&nbsp;&nbsp;&nbsp;'); }
                });
                // If the count down is over, write some text
                if (tims[7]==false) {
                    clearInterval(x);
                    obj.html("EXPIRED");
                }
                otims = tims;
            }, 1000);
            function getTimes(countDownDate, knd){
                let now = new Date().getTime();
                // Find the distance between now and the count down date
                let distance;
                if (knd == 'out') distance = countDownDate - now;
                if (knd == 'in') distance = now - countDownDate;
                if (knd == 'now') distance = now;
                let tims = [];
                // Time calculations for days, hours, minutes and seconds
                if(knd!= 'now') tims.push(Math.floor(distance / (1000 * 60 * 60 * 24)));
                else tims.push('0');
                let hur = '' + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                if (hur < 10) { tims.push('0'); tims.push(hur); }
                else { tims.push(hur.substring(0, 1)); tims.push(hur.substring(1, 2)); }
                let min = '' + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                if (min < 10) { tims.push('0'); tims.push(min); }
                else { tims.push(min.substring(0, 1)); tims.push(min.substring(1, 2)); }
                let sec = '' + Math.floor((distance % (1000 * 60)) / 1000);
                if (sec < 10) { tims.push('0'); tims.push(sec); }
                else { tims.push(sec.substring(0, 1)); tims.push(sec.substring(1, 2)); }
                if(distance<0) tims.push(false)
                else tims.push(true);
                return tims;
            }
        });
    }
})(jQuery)

$(document).ready(function(){
    console.log('working');
    $('.demo').countdown();
});
