var list = document.getElementById("list-languages");
var button = document.getElementById("open-list");


button.addEventListener('click', function () {
    if (list.style.display != 'none') {
        list.style.display = 'none';
    } else {
        list.style.display = 'block';
    }
});


var arrowClicked = 0;
var arrowBtn = document.getElementById("arrow");

function hover() {
    arrowBtn.src = "../static/accounts/images/LeftArrowColor.png";
}

function unhover() {
    if (arrowClicked == 0) {
        arrowBtn.src = "../static/accounts/images/LeftArrow.png";
    }
}

arrowBtn.addEventListener('click', function () {
    if (arrowClicked == 0) {
        arrowClicked = 1;
    } else {
        arrowClicked = 0;
    }
});

$('#list-languages').on('click', 'li', function () {
    $(this).addClass('active').siblings().removeClass('active')
});

function changeLanguage(lang_code) {
    document.getElementById("lang-code").value = lang_code;
    document.setLangEnglish.submit();
    return false;
}

function langSelected(current_lang) {
    $('#list-languages li').removeClass('active');
    var element = document.getElementById(current_lang);
    element.classList.add("active");
}

function initializeSignUp(current_lang) {
    var selLangBtn = document.getElementById("selected-language-btn");
    var signupBtn = document.getElementById("signup-btn");
    var secondLine = document.getElementById("second-line");

    //Fonts
    if (current_lang == "ja") {
        selLangBtn.style.fontFamily = ['Noto Sans', 'Noto Sans CJK JP', 'sans-serif'];
        signupBtn.style.fontFamily = ['Noto Sans', 'Noto Sans CJK JP', 'sans-serif'];
    }
    else if (current_lang == "ko") {
        selLangBtn.style.fontFamily = ['Noto Sans', 'Noto Sans CJK KR', 'sans-serif'];
        signupBtn.style.fontFamily = ['Noto Sans', 'Noto Sans CJK KR', 'sans-serif'];
    }
    else if (current_lang == "zh-tw") {
        selLangBtn.style.fontFamily = ['Noto Sans', 'Noto Sans CJK TC', 'sans-serif'];
        signupBtn.style.fontFamily = ['Noto Sans', 'Noto Sans CJK TC', 'sans-serif'];
    }
    else {
        selLangBtn.style.fontFamily = ['Noto Sans', 'sans-serif'];
        signupBtn.style.fontFamily = ['Noto Sans', 'sans-serif'];
    }

    //Register agreement
    if (current_lang == "tr") {
        secondLine.style.marginRight = "-22px";
    }

    //Button SignUp
    if (current_lang == "ru") {
        signupBtn.style.width = '65%';
        signupBtn.style.margin = "50px 0 0 17.5%";
    }
    else if (current_lang == "pt" || current_lang == "pl" || current_lang == "nl" || current_lang == "lt" || current_lang == "de") {
        signupBtn.style.width = '45%';
        signupBtn.style.margin = "50px 0 0 27.5%";
    }
    else if (current_lang == "cs") {
        signupBtn.style.width = '55%';
        signupBtn.style.margin = "50px 0 0 22.5%";
    }
    else if (current_lang == "el") {
        signupBtn.style.width = '40%';
        signupBtn.style.margin = "50px 0 0 30%";
    }


    var checkboxText = document.getElementById("agreement");
    var checkLabel = document.getElementById("checkLabel");

    if (current_lang == "lt") {
        checkboxText.style.marginRight = "34px";
        checkboxText.style.marginLeft = "115px";
        checkLabel.style.width = "30px";
    }
    else if (current_lang == "el") {
        checkboxText.style.marginRight = "50px";
        checkboxText.style.marginLeft = "88px";
        checkLabel.style.width = "30px";
    }

    if (current_lang == "ko" || current_lang == "ja") {
        checkboxText.style.marginRight = "45px";
        $('#agreement a').addClass('terms');
    }

    if (current_lang == "de") {
        checkboxText.style.marginRight = "-56px";
        secondLine.style.marginRight = "102px";
    }
}