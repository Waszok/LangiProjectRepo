var colorFront = "#000";
var colorBack = "#000";

$(document).ready(function () {
    $('ul.colors-front li').click(function () {
        $(this).addClass('scale').siblings().removeClass('scale');
        colorFront = $(this).css('color');
    })
})

$(document).ready(function () {
    $('ul.colors-back li').click(function () {
        $(this).addClass('scale').siblings().removeClass('scale');
        colorBack = $(this).css('color');
    })
})

function boldText() {
    document.execCommand('bold', false);
}

function underline() {
    document.execCommand('underline', false);
}

function uppercase() {
    var span = document.createElement("span");
    span.style.textTransform = "uppercase";

    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var range = sel.getRangeAt(0).cloneRange();
            range.surroundContents(span);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
}

function colorText(whichKeyboard) {
    if (whichKeyboard === 1) {
        document.execCommand('styleWithCSS', false, true);
        document.execCommand('foreColor', false, colorFront);
    }
    else if (whichKeyboard === 2) {
        document.execCommand('styleWithCSS', false, true);
        document.execCommand('foreColor', false, colorBack);
    }
}



