//Prompt variables
var promptImg = document.querySelector(".drop-file-img-zone__prompt").textContent;
var promptExampleImg = document.querySelector(".drop-zone__prompt").textContent;

//LOAD IMAGE FILE
document.querySelectorAll(".drop-file-img-zone__input").forEach(inputElement => {
    const dropZoneImgElement = inputElement.closest(".drop-file-img-zone");

    dropZoneImgElement.addEventListener("click", e => {
        inputElement.click();
    });

    inputElement.addEventListener("change", e => {
        if (inputElement.files.length) {

            loadMimeImg(inputElement.files[0], function (res) {
                if (res) {
                    updateThumbImg(dropZoneImgElement, inputElement.files[0], 'drop-file-img-zone__thumb', 'drop-file-img-zone__prompt');
                }
                else {
                    wrongFileFormatImg(dropZoneImgElement, inputElement);
                }
            });
        }
    });

    dropZoneImgElement.addEventListener("dragover", e => {
        e.preventDefault();
        dropZoneImgElement.classList.add("drop-file-img-zone-over");
    });

    ["dragleave", "dragend"].forEach(type => {
        dropZoneImgElement.addEventListener(type, e => {
            dropZoneImgElement.classList.remove("drop-file-img-zone-over");
        });
    });

    dropZoneImgElement.addEventListener("drop", e => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {

            loadMimeImg(e.dataTransfer.files[0], function (res) {
                if (res) {
                    inputElement.files = e.dataTransfer.files;
                    updateThumbImg(dropZoneImgElement, e.dataTransfer.files[0], 'drop-file-img-zone__thumb', 'drop-file-img-zone__prompt');
                }
                else {
                    wrongFileFormatImg(dropZoneImgElement, inputElement);
                }
            });
        }
        dropZoneImgElement.classList.remove("drop-file-img-zone-over");
    })
});

/**
 * Updates the thumb on a drop zone element
 * 
 * @param {HTMLElement} dropZoneImgElement
 * @param {File} file
 */
function updateThumbImg(dropZoneImgElement, file, thumb, prompt) {
    let thumbElement = dropZoneImgElement.querySelector("." + thumb);

    //Remove prompt when it exists
    if (dropZoneImgElement.querySelector("." + prompt)) {
        dropZoneImgElement.querySelector("." + prompt).remove();
    }

    //Create thumb div when there is no thumb 
    if (!thumbElement) {
        thumbElement = document.createElement("div");
        thumbElement.classList.add(thumb);
        dropZoneImgElement.appendChild(thumbElement);
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

//CHECK FILE TYPE (IN THIS CASE ACCEPTED FILE'S FORMATS ARE PNG, JPG, JPEG)
function loadMimeImg(file, callback) {

    //List of known mimes
    var mimes = [
        {
            mime: 'image/png',
            pattern: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
            mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
        },
        {
            mime: 'image/jpeg',
            pattern: [0xFF, 0xD8, 0xFF],
            mask: [0xFF, 0xFF, 0xFF],
        },
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

    var blob = file.slice(0, 8); //read the first 8 bytes of the file

    var reader = new FileReader();
    reader.onloadend = function (e) {
        if (e.target.readyState === FileReader.DONE) {
            var bytes = new Uint8Array(e.target.result);

            for (var i = 0, l = mimes.length; i < l; ++i) {
                if (check(bytes, mimes[i])) {
                    return callback(true);
                }
            }
            return callback(false);
        }
    };
    reader.readAsArrayBuffer(blob);
}

//Serve file upload box when the file format is wrong
function wrongFileFormatImg(dropZoneImgElement, inputElement) {
    if (dropZoneImgElement.querySelector(".drop-file-img-zone__thumb")) {
        dropZoneImgElement.querySelector(".drop-file-img-zone__thumb").remove();
    }
    if (dropZoneImgElement.querySelector(".drop-file-img-zone__prompt")) {
        dropZoneImgElement.querySelector(".drop-file-img-zone__prompt").remove();
    };

    //Add red error board and error text displaying for 1.5s
    dropZoneImgElement.classList.add("drop-file-img-zone-over-error");

    var errorPropmt = document.createElement("div");
    errorPropmt.classList.add("drop-file-img-zone__error");
    errorPropmt.innerHTML = 'Invalid file format';
    dropZoneImgElement.appendChild(errorPropmt);

    setTimeout(function () {
        dropZoneImgElement.classList.remove("drop-file-img-zone-over-error");
        dropZoneImgElement.querySelector(".drop-file-img-zone__error").remove();

        var prompt = document.createElement("div");
        prompt.classList.add("drop-file-img-zone__prompt");
        prompt.innerHTML = promptImg;
        dropZoneImgElement.appendChild(prompt);
    }, 1500);


    if (inputElement.files.length > 0) {
        inputElement.value = '';
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////------------LOAD EXAMPLE IMAGE ONTO FLASHCARD-----------///////////////////////////////////////
//Serve file upload box when the file format is wrong

function wrongFileFormatExampleImg(dropZoneImgElement, inputElement) {
    if (dropZoneImgElement.querySelector(".drop-zone__thumb")) {
        dropZoneImgElement.querySelector(".drop-zone__thumb").remove();
    }
    if (dropZoneImgElement.querySelector(".drop-zone__prompt")) {
        dropZoneImgElement.querySelector(".drop-zone__prompt").remove();
    };

    //Add red error board and error text displaying for 1.5s
    dropZoneImgElement.classList.add("drop-zone-over__error");

    var errorPropmt = document.createElement("div");
    errorPropmt.classList.add("drop-zone__error");
    errorPropmt.innerHTML = 'Invalid file format';
    dropZoneImgElement.appendChild(errorPropmt);

    setTimeout(function () {
        dropZoneImgElement.classList.remove("drop-zone-over__error");
        dropZoneImgElement.querySelector(".drop-zone__error").remove();

        var prompt = document.createElement("div");
        prompt.classList.add("drop-zone__prompt");
        prompt.innerHTML = promptExampleImg;
        dropZoneImgElement.appendChild(prompt);
    }, 1500);

    if (inputElement.files.length > 0) {
        inputElement.value = '';
    }
    flashcardImage = null;
}

document.querySelectorAll(".drop-zone__input").forEach(inputElement => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click", e => {
        inputElement.click();
    });

    inputElement.addEventListener("change", e => {
        if (inputElement.files.length) {
            loadMimeImg(inputElement.files[0], function (res) {
                if (res) {
                    const reader = new FileReader();
                    reader.readAsDataURL(inputElement.files[0]);

                    reader.onload = () => {
                        const MAX_WIDTH = 200;
                        const MAX_HEIGHT = 200;
                        const img = new Image();
                        img.src = reader.result;

                        img.onload = () => {

                            const canvas = document.createElement('canvas');

                            // calculate new size
                            const ratio = Math.min(MAX_WIDTH / img.width, MAX_HEIGHT / img.height);
                            const width = img.width * ratio + .5 | 0
                            const height = img.height * ratio + .5 | 0

                            canvas.width = width;
                            canvas.height = height;

                            const ctx = canvas.getContext('2d');
                            ctx.imageSmoothingEnabled = true;
                            ctx.imageSmoothingQuality = 'high';

                            ctx.drawImage(img, 0, 0, width, height);

                            ctx.canvas.toBlob((blob) => {
                                const file = new File([blob], inputElement.files[0].name, {
                                    type: 'image/jpeg',
                                    lastModified: Date.now()
                                });
                                updateThumbImg(dropZoneElement, file, 'drop-zone__thumb', 'drop-zone__prompt');
                                flashcardImage = file
                            }, 'image/jpeg', 0.5);
                        }, reader.onerror = error => console.log(error);
                    }
                }
                else {
                    wrongFileFormatExampleImg(dropZoneElement, inputElement);
                }
            });
        }
    });

    dropZoneElement.addEventListener("dragover", e => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone-over");
    });

    ["dragleave", "dragend"].forEach(type => {
        dropZoneElement.addEventListener(type, e => {
            dropZoneElement.classList.remove("drop-zone-over");
        });
    });

    dropZoneElement.addEventListener("drop", e => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {

            loadMimeImg(e.dataTransfer.files[0], function (res) {
                if (res) {

                    const reader = new FileReader();
                    reader.readAsDataURL(e.dataTransfer.files[0]);

                    reader.onload = () => {
                        const MAX_WIDTH = 200;
                        const MAX_HEIGHT = 200;
                        const img = new Image();
                        img.src = reader.result;

                        img.onload = () => {

                            const canvas = document.createElement('canvas');

                            // calculate new size
                            const ratio = Math.min(MAX_WIDTH / img.width, MAX_HEIGHT / img.height);
                            const width = img.width * ratio + .5 | 0
                            const height = img.height * ratio + .5 | 0

                            canvas.width = width;
                            canvas.height = height;

                            const ctx = canvas.getContext('2d');
                            ctx.imageSmoothingEnabled = true;
                            ctx.imageSmoothingQuality = 'high';

                            ctx.drawImage(img, 0, 0, width, height);

                            ctx.canvas.toBlob((blob) => {
                                const file = new File([blob], e.dataTransfer.files[0].name, {
                                    type: 'image/jpeg',
                                    lastModified: Date.now()
                                });
                                updateThumbImg(dropZoneElement, file, 'drop-zone__thumb', 'drop-zone__prompt');
                                flashcardImage = file
                            }, 'image/jpeg', 0.5);
                        }, reader.onerror = error => console.log(error);
                    }
                    inputElement.files = e.dataTransfer.files;
                }
                else {
                    wrongFileFormatExampleImg(dropZoneElement, inputElement);
                }
            });
        }
        dropZoneElement.classList.remove("drop-zone-over");
    })
});