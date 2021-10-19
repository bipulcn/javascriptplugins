$(document).ready(function(){
    console.log('working');
    $('.over01').each(function(){
        $(this).wrap("<div></div>");
        let obj = $(this).parent();
        let wid = $(this).innerWidth();
        let hig = $(this).innerHeight();
        $(this).css({ 'filter': 'hue-rotate(45deg)'});
        obj.append("<div style='position: absolute; background: #9117d057; left: 15px; top: 10px; width: " + wid + "px; height: " + hig +"px'></div>");
    });
});