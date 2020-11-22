//The mechanism below is used to add dynamic to the input fields in sign up and login forms.
//When someone type or focus on the field, it's orange colored and label is moving upwards  

const inputs = document.querySelectorAll(".input");

function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});


function initializeBody(current_lang) {
    var mainBody = document.getElementById("main-body");

    if (current_lang == "ja") {
        mainBody.style.fontFamily = ['Noto Sans', 'Noto Sans CJK JP', 'sans-serif'];
    }
    else if (current_lang == "ko") {
        mainBody.style.fontFamily = ['Noto Sans', 'Noto Sans CJK KR', 'sans-serif'];
    }
    else if (current_lang == "zh-tw") {
        mainBody.style.fontFamily = ['Noto Sans', 'Noto Sans CJK TC', 'sans-serif'];
    }
    else {
        mainBody.style.fontFamily = ['Noto Sans', 'sans-serif'];
    }
}
