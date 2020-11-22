var flagPaths = {
    cs: "../static/accounts/images/flags/czech-republic.svg",
    de: "../static/accounts/images/flags/germany.svg",
    el: "../static/accounts/images/flags/greece.svg",
    en: "../static/accounts/images/flags/united-kingdom.svg",
    es: "../static/accounts/images/flags/spain.svg",
    fr: "../static/accounts/images/flags/france.svg",
    it: "../static/accounts/images/flags/italy.svg",
    ja: "../static/accounts/images/flags/japan.svg",
    ko: "../static/accounts/images/flags/south-korea.svg",
    lt: "../static/accounts/images/flags/lithuania.svg",
    nl: "../static/accounts/images/flags/netherlands.svg",
    pl: "../static/accounts/images/flags/poland.svg",
    pt: "../static/accounts/images/flags/portugal.svg",
    ru: "../static/accounts/images/flags/russia.svg",
    tr: "../static/accounts/images/flags/turkey.svg",
    zhtw: "../static/accounts/images/flags/china.svg",
}

function setFlagIcon(lang) {
    if (lang == "zh-tw") {
        $('#welcome img').attr("src", flagPaths['zhtw']);
    }
    else {
        $('#welcome img').attr("src", flagPaths[lang]);
    }
}

function initializeLogin(current_lang) {
    var loginBtn = document.getElementById("login-btn");

    var signUpQuestion = document.getElementById("signup-question");

    if (current_lang == "ja") {
        loginBtn.style.fontFamily = ['Noto Sans', 'Noto Sans CJK JP', 'sans-serif'];
    }
    else if (current_lang == "ko") {
        loginBtn.style.fontFamily = ['Noto Sans', 'Noto Sans CJK KR', 'sans-serif'];
    }
    else if (current_lang == "zh-tw") {
        loginBtn.style.fontFamily = ['Noto Sans', 'Noto Sans CJK TC', 'sans-serif'];
    }
    else {
        loginBtn.style.fontFamily = ['Noto Sans', 'sans-serif'];
    }

    setFlagIcon(current_lang);


    if (current_lang == "ru" || current_lang == "ja" || current_lang == "de") {
        signUpQuestion.style.flexDirection = "column";
        signUpQuestion.style.justifyContent = "center";
        signUpQuestion.children[0].style.marginRight = "30px";
        signUpQuestion.children[1].style.marginRight = "-10px";

    }
    else if (current_lang == "pt" || current_lang == "es") {
        loginBtn.style.width = '45%';
        loginBtn.style.margin = "50px 0 0 27.5%";
    }
    else if (current_lang == "pl" || current_lang == "nl" || current_lang == "lt" || current_lang == "fr" || current_lang == "cs" || current_lang == "el") {
        loginBtn.style.width = '40%';
        loginBtn.style.margin = "50px 0 0 30%";
    }
}


