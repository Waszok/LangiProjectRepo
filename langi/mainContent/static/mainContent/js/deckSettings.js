var overlay = document.getElementById('overlay');
const closeDeckSettingsButtons = document.querySelectorAll('[data-decksettings-close]');

//Switching between individual tabs
//select all deck settings tabs
var tabs = Array.from(document.querySelectorAll('.deck-set-title'));
//give a click event to each tab
tabs.forEach(function (el, index, all) {
    el.addEventListener('click', function () {
        let content = Array.from(document.querySelectorAll('.deck-set-contents .deck-set-content'));

        content.forEach(function (el) {
            el.style.display = "none";
        });

        tabs.forEach(function (el) {
            el.classList.remove('deck-set-active');
        });
        el.classList.add('deck-set-active');

        content[index].style.display = "block";
    })
});

closeDeckSettingsButtons.forEach(button => {
    button.addEventListener('click', () => {
        const deckSettingsWindow = button.closest('.deck-settings-window')
        closeDeckSettingsWindow(deckSettingsWindow);
    })
})

function closeDeckSettingsWindow(deckSettingsWindow) {
    if (deckSettingsWindow == null) return

    deckSettingsWindow.classList.remove('active');
    overlay.classList.remove('active');

    activeItem = null;
    requiredNameError.classList.add('required-name-hide');
}






