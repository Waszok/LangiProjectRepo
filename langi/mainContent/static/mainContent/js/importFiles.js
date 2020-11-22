///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////---------IMPORT FILES WINDOW HANDLE-----------///////////////////////////////////////
const openImportFilesButtons = document.querySelectorAll('[data-import-files-open]');
const closeImportFilesButtons = document.querySelectorAll('[data-import-files-close]');

//Switching between individual tabs
//select all import files tabs
var tabs = Array.from(document.querySelectorAll('.import-files-title'));
//give a click event to each tab
tabs.forEach(function (el, index, all) {
    el.addEventListener('click', function () {
        let content = Array.from(document.querySelectorAll('.import-files-contents .deck-set-content'));

        content.forEach(function (el) {
            el.style.display = "none";
        });

        tabs.forEach(function (el) {
            el.classList.remove('import-files-active');
        });
        el.classList.add('import-files-active');

        content[index].style.display = "block";
    })
});

//Text files handle
const fileInput = document.querySelector(".drop-file-zone__input");
const filePrompt = document.querySelector(".drop-file-zone__prompt");
var promptText = filePrompt.textContent;
const separatorInput = document.getElementById("separator");
//Image files handle
const fileImgInput = document.querySelector(".drop-file-img-zone__input");
const fileImgPrompt = document.querySelector(".drop-file-img-zone__prompt");
var promptImgText = fileImgPrompt.textContent;
//No deck error text
var noDeckImportErrorText = document.getElementById('import-no-deck-error');

//Open and close deck settings window
openImportFilesButtons.forEach(button => {
    button.addEventListener('click', () => {
        const importFilesWindow = document.querySelector(button.dataset.importFilesOpen);
        openImportFilesWindow(importFilesWindow);

        //text file handle
        var dropZoneElement = document.querySelector(".drop-file-zone");
        if (dropZoneElement.querySelector(".drop-file-zone__thumb")) {
            dropZoneElement.querySelector(".drop-file-zone__thumb").remove();
            var prompt = document.createElement("div");
            prompt.classList.add("drop-file-zone__prompt");
            prompt.innerHTML = promptText;
            dropZoneElement.appendChild(prompt);
        }
        fileInput.value = '';

        //image file handle
        var dropZoneImgElement = document.querySelector('.drop-file-img-zone');
        if (dropZoneImgElement.querySelector('.drop-file-img-zone__thumb')) {
            dropZoneImgElement.querySelector('.drop-file-img-zone__thumb').remove();
            var promptImg = document.createElement('div');
            promptImg.classList.add('drop-file-img-zone__prompt');
            promptImg.innerHTML = promptImgText;
            dropZoneImgElement.appendChild(promptImg);
        }

        fileImgInput.value = '';
    })
})

function openImportFilesWindow(importFilesWindow) {
    if (importFilesWindow == null) return
    importFilesWindow.classList.add('active');

    tabs.forEach(function (el) {
        el.classList.remove('import-files-active');
    });
    tabs[0].classList.add('import-files-active');

    let content = Array.from(document.querySelectorAll('.import-files-contents .deck-set-content'));

    content.forEach(function (el) {
        el.style.display = "none";
    });
    content[0].style.display = "block";

    //Clear text word's list when openinn a window
    var listContainerText = document.getElementById('dect-set-im-list-elements-container');
    while (listContainerText.firstChild) {
        listContainerText.removeChild(listContainerText.lastChild);
    }
    //Clear image word's list when openinn a window
    var listContainerImg = document.getElementById('dect-set-image-list-elements-container');
    while (listContainerImg.firstChild) {
        listContainerImg.removeChild(listContainerImg.lastChild);
    }

    separatorInput.value = '';

    noDeckImportErrorText.setAttribute("style", "display:none");
}

closeImportFilesButtons.forEach(button => {
    button.addEventListener('click', () => {
        const importFilesWindow = button.closest('.import-files-window')
        closeImportFilesWindow(importFilesWindow);
    })
})

function closeImportFilesWindow(importFilesWindow) {
    if (importFilesWindow == null) return

    importFilesWindow.classList.remove('active');
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////HELPING METHODS/////////////////////////////////////////////////
var parseStringToHTML = (str) => {
    const parser = new DOMParser();
    return parser.parseFromString(str, 'text/html');
};

//Active/inactive save btn
function activeSaveBtn(btnId, ele) {
    var elementsToSwap = Array.from(document.querySelectorAll(ele));
    //if import list is not empty SAVE btn is going to be active
    if (elementsToSwap.length > 0) {
        var btn = document.getElementById(btnId);
        btn.disabled = false;
        btn.classList.remove(btnId);

        var parentOfBtn = document.getElementById(btnId).parentNode;
        parentOfBtn.classList.remove("deck-set-save");
    }
    else if (elementsToSwap.length <= 0) {
        var btn = document.getElementById(btnId);
        btn.disabled = true;
        btn.classList.add(btnId);

        var parentOfBtn = document.getElementById(btnId).parentNode;
        parentOfBtn.classList.add("deck-set-save");
    }
}

//Actine/inactive remove list btn
const pathIconRemoveBtn = "../static/mainContent/images/";

function IconUnhoverRemoveBtn(obj) {
    obj.src = pathIconRemoveBtn.concat("basketIcon.png");
}

function IconHoverRemoveBtn(obj) {
    obj.src = pathIconRemoveBtn.concat("basketIconOrange.png");
}

//Remove list item
$('.deck-set-remove-ele').click(function () {
    $(this).parent().parent().remove();
    activeSaveBtn();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////IMPORT FROM TEXT FILE/////////////////////////////////////////////////
//Import Swap mechanism
$("#swap-img").click(function () {
    var elementsToSwap = Array.from(document.querySelectorAll('.dect-set-text-list-ele'));
    elementsToSwap.forEach(function (el) {
        const front = el.getElementsByClassName('front-ele')[0].children[0];
        const tmp = front.textContent
        const back = el.getElementsByClassName('back-ele')[0].children[0];

        front.textContent = back.textContent;
        back.textContent = tmp;
    });
});

//Import words from text file (.txt, .docx) - User has to enter a proper separator
function importTextFile() {
    if (fileInput.files.length > 0) {
        var listContainer = document.getElementById('dect-set-im-list-elements-container');
        var fd = new FormData()
        fd.append("file", fileInput.files[0]);
        fd.append("separator", separatorInput.value);

        const options = {
            method: 'POST',
            headers: {
                //'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: fd
        };
        delete options.headers['Content-Type'];

        fetch($('#importTxtFileBtn').attr('import-textfile-url'), options).then(
            response => response.json()
        ).then(function (success) {
            var list = success

            //Clear word's list before we add new items
            while (listContainer.firstChild) {
                listContainer.removeChild(listContainer.lastChild);
            }

            for (var i in list) {
                var item = `<div class="dect-set-im-list-ele-container">
                <div class="dect-set-text-list-ele">
                    <div class="front-ele">
                        <p>${list[i].front}</p>
                    </div>
                    <div class="ele-separator"></div>
                    <div class="back-ele">
                        <p>${list[i].back}</p>
                    </div>
                    <img class="deck-set-remove-ele" src="../static/mainContent/images/basketIcon.png"
                        alt="remove item" onmouseover="IconHoverRemoveBtn(this);"
                        onmouseout="IconUnhoverRemoveBtn(this);"></img>
                </div>
                <div class="dect-set-im-list-line"></div>
            </div>`

                var messageHTML = parseStringToHTML(item); //function from deck.js file
                var tolistener = messageHTML.querySelector('.deck-set-remove-ele');

                tolistener.addEventListener("click", (e) => {
                    e.target.parentNode.parentNode.remove();
                    activeSaveBtn("deck-set-save-btn", '.dect-set-text-list-ele');
                });
                listContainer.insertAdjacentElement("beforeend", messageHTML.body.firstElementChild);
            }

            activeSaveBtn("deck-set-save-btn", '.dect-set-text-list-ele');
        }
        ).catch(
            error => console.log(error)
        );
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////IMPORT FROM IMAGE FILE/////////////////////////////////////////////////
//Import Swap mechanism
$("#swap-image-img").click(function () {
    var elementsToSwap = Array.from(document.querySelectorAll('.dect-set-im-list-ele'));
    elementsToSwap.forEach(function (el) {
        const front = el.getElementsByClassName('front-ele')[0].children[0];
        const tmp = front.src
        const back = el.getElementsByClassName('back-ele')[0].children[0];

        front.src = back.src;
        back.src = tmp;
    });
});

function importImageFile() {
    if (fileImgInput.files.length > 0) {
        var listContainer = document.getElementById('dect-set-image-list-elements-container');
        var edgesInput = document.getElementById("paper-edges-checkbox");
        var checkeredInput = document.getElementById("paper-checkered");

        var fd = new FormData()
        fd.append("file", fileImgInput.files[0]);
        fd.append("edges", edgesInput.checked);
        fd.append("checkered", checkeredInput.checked);

        const options = {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken
            },
            body: fd
        };
        delete options.headers['Content-Type'];

        fetch($('#importImgFileBtn').attr('import-imgfile-url'), options).then(
            response => response.json()
        ).then(function (success) {
            var list = success

            //Clear word's list before we add new items
            while (listContainer.firstChild) {
                listContainer.removeChild(listContainer.lastChild);
            }

            for (var i in list) {
                var item = `<div class="dect-set-im-list-ele-container">
                <div class="dect-set-im-list-ele">
                    <div class="front-ele">
                        <img class="deck-set-word-img" src="${list[i][0]}"
                        alt="flashcard front"></img>
                    </div>
                    <div class="ele-separator"></div>
                    <div class="back-ele">
                        <img class="deck-set-word-img" src="${list[i][1]}"
                        alt="flashcard back"></img>
                    </div>
                    <img class="deck-set-remove-ele" src="../static/mainContent/images/basketIcon.png"
                        alt="remove item" onmouseover="IconHoverRemoveBtn(this);"
                        onmouseout="IconUnhoverRemoveBtn(this);"></img>
                </div>
                <div class="dect-set-im-list-line"></div>
            </div>`

                var messageHTML = parseStringToHTML(item); //function from deck.js file
                var tolistener = messageHTML.querySelector('.deck-set-remove-ele');

                tolistener.addEventListener("click", (e) => {
                    e.target.parentNode.parentNode.remove();
                    activeSaveBtn("deck-set-image-save-btn", '.dect-set-im-list-ele');
                });
                listContainer.insertAdjacentElement("beforeend", messageHTML.body.firstElementChild);
            }

            activeSaveBtn("deck-set-image-save-btn", '.dect-set-im-list-ele');
        }
        ).catch(
            error => console.log(error)
        );
    }
}

activeSaveBtn("deck-set-save-btn", '.dect-set-text-list-ele');
activeSaveBtn("deck-set-image-save-btn", '.dect-set-im-list-ele');