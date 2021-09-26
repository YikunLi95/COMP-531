var slideIndex = 0;
var timeout = new Array(1,2,3,4,5);

carousel("1","animation");
function carousel(part,name) {
    var i;
    var element = document.getElementById(part);
    var x = element.getElementsByClassName(name);
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {
        slideIndex = 1;
    }
    x[slideIndex-1].style.display = "block";
    var time_out = "timeout" + part;
    timeout[part]=setTimeout(carousel, Math.floor((Math.random() * 5000) + 1000),part,"animation");
}

function process_btn(btn){
    var part = btn.name;
    if(btn.value=="stop") {
        btn.value="start";
        clearTimeout(timeout[part]);
    } else {
        btn.value="stop";
        timeout[part]=setTimeout(carousel, Math.floor((Math.random() * 5000) + 1),part,"animation");
    }
}