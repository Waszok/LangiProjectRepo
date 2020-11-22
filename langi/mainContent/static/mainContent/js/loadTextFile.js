//Prompt variable
var promptTextFile = document.querySelector(".drop-file-zone__prompt").textContent;

//LOAD TEXT FILE
document.querySelectorAll(".drop-file-zone__input").forEach(inputElement => {
    const dropZoneElement = inputElement.closest(".drop-file-zone");

    dropZoneElement.addEventListener("click", e => {
        inputElement.click();
    });

    inputElement.addEventListener("change", e => {
        if (inputElement.files.length) {

            loadMime(inputElement.files[0], function (res) {
                if (res) {
                    updateThumb(dropZoneElement, inputElement.files[0]);
                }
                else {
                    wrongFileFormat(dropZoneElement, inputElement);
                }
            });
        }
    });

    dropZoneElement.addEventListener("dragover", e => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-file-zone-over");
    });

    ["dragleave", "dragend"].forEach(type => {
        dropZoneElement.addEventListener(type, e => {
            dropZoneElement.classList.remove("drop-file-zone-over");
        });
    });

    dropZoneElement.addEventListener("drop", e => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {

            loadMime(e.dataTransfer.files[0], function (res) {
                if (res) {
                    inputElement.files = e.dataTransfer.files;
                    updateThumb(dropZoneElement, e.dataTransfer.files[0]);
                }
                else {
                    wrongFileFormat(dropZoneElement, inputElement);
                }
            });
        }
        dropZoneElement.classList.remove("drop-file-zone-over");
    })
});

/**
 * Updates the thumb on a drop zone element
 * 
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumb(dropZoneElement, file) {
    let thumbElement = dropZoneElement.querySelector(".drop-file-zone__thumb");

    //Remove prompt when it exists
    if (dropZoneElement.querySelector(".drop-file-zone__prompt")) {
        dropZoneElement.querySelector(".drop-file-zone__prompt").remove();
    }

    //Create thumb div when there is no thumb 
    if (!thumbElement) {
        thumbElement = document.createElement("div");
        thumbElement.classList.add("drop-file-zone__thumb");
        dropZoneElement.appendChild(thumbElement);
    }

    thumbElement.dataset.imgLabel = file.name;

    const fileName = file.name;

    if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            thumbElement.style.backgroundImage = `url('${reader.result}')`;
        }
    }
}

//CHECK FILE TYPE (IN THIS CASE ACCEPTED FILE'S FORMATS ARE TXT, DOC & DOCX)
// Get expanded-name of a file
function getFileExtension(fileName) {
    var matches = fileName && fileName.match(/\.([^.]+)$/);
    if (matches) {
        return matches[1].toLowerCase();
    }
    return '';
}

function loadMime(file, callback) {

    //List of known mimes
    var mimes = [
        {
            mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            pattern: [0x50, 0x4B, 0x03, 0x04, 0x14, 0x00, 0x06, 0x00],
            mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
        },
        {
            mime: 'application/msword',
            pattern: [0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1],
            mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
        },
        {
            mime: 'text/plain', //UTF-8 BOM
            pattern: [0xEF, 0xBB, 0xBF],
            mask: [0xFF, 0xFF, 0xFF],
        },
        {
            mime: 'text/plain', //UTF-16 LE BOM
            pattern: [0xFF, 0xFE],
            mask: [0xFF, 0xFF],
        },
        {
            mime: 'text/plain', //UTF-16 BE BOM
            pattern: [0xFE, 0xFF],
            mask: [0xFF, 0xFF],
        },
        {
            mime: 'text/plain', //UTF-32 LE BOM
            pattern: [0xFF, 0xFE, 0x00, 0x00],
            mask: [0xFF, 0xFF, 0xFF, 0xFF],
        },
        {
            mime: 'text/plain', //UTF-32 BE BOM
            pattern: [0x00, 0x00, 0xFE, 0xFF],
            mask: [0xFF, 0xFF, 0xFF, 0xFF],
        }
        // you can expand this list @see https://mimesniff.spec.whatwg.org/#matching-an-image-type-pattern
    ];

    function check(bytes, mime) {
        for (var i = 0, l = mime.mask.length; i < l; ++i) {
            if ((bytes[i] & mime.mask[i]) - mime.pattern[i] !== 0) {
                return false;
            }
        }
        return true;
    }

    var blob = file.slice(0, 8); //read the first 4 bytes of the file

    var reader = new FileReader();
    reader.onloadend = function (e) {
        if (e.target.readyState === FileReader.DONE) {
            var bytes = new Uint8Array(e.target.result);

            for (var i = 0, l = mimes.length; i < l; ++i) {
                if (check(bytes, mimes[i]) || (file.type.match('text/plain') && getFileExtension(file.name) == "txt")) {
                    return callback(true);
                }
            }
            return callback(false);
        }
    };
    reader.readAsArrayBuffer(blob);
}

//Serve file upload box when the file format is wrong
function wrongFileFormat(dropZoneElement, inputElement) {
    if (dropZoneElement.querySelector(".drop-file-zone__thumb")) {
        dropZoneElement.querySelector(".drop-file-zone__thumb").remove();
    }
    if (dropZoneElement.querySelector(".drop-file-zone__prompt")) {
        dropZoneElement.querySelector(".drop-file-zone__prompt").remove();
    };

    //Add red error board and error text displaying for 1.5s
    dropZoneElement.classList.add("drop-file-zone-over-error");

    var errorPropmt = document.createElement("div");
    errorPropmt.classList.add("drop-file-zone__error");
    errorPropmt.innerHTML = 'Invalid file format';
    dropZoneElement.appendChild(errorPropmt);

    setTimeout(function () {
        dropZoneElement.classList.remove("drop-file-zone-over-error");
        dropZoneElement.querySelector(".drop-file-zone__error").remove();

        var prompt = document.createElement("div");
        prompt.classList.add("drop-file-zone__prompt");
        prompt.innerHTML = promptTextFile;
        dropZoneElement.appendChild(prompt);
    }, 1500);


    if (inputElement.files.length > 0) {
        inputElement.value = '';
    }
}
