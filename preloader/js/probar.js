function stateCk() { switch (document.readyState) {
    case "interactive": document.getElementById("probar").style.width = "73%";  break;
    case "complete": let probar = document.getElementById("probar"); probar.setAttribute('style', "width : 100%;  transition: width 0.5s; -webkit-transition: width 0.5s; "); setTimeout(function(){ let probar = document.getElementById("probar"); document.getElementById('body').setAttribute("style", "display: block; visibility: visible; "); probar.setAttribute('style', "display : none;  visibility: hidden; "); }, 1000); clearInterval(intr); setTimeout(function(){ document.getElementById('body').style.opacity = "1"; }, 1100); break; }
} let intr = setInterval(function() { stateCk(); }, 10); stateCk();
