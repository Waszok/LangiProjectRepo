//////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////---------------RECORD AUDIO---------------------////////////////////////////////
const recordButton = document.querySelector("#record-btn");
const recording = document.querySelector("#recording");
const stopButton = document.querySelector("#stop-btn");
const dropZoneIcons = document.querySelector(".drop-zone-icons");
const player = document.querySelector(".player");
const audio = document.querySelector("#audio");
const recordingTime = document.querySelector("#recording-time");

//variables to hold time values
let seconds = 0;
let minutes = 0;
let hours = 0;

//variables to hold display time values
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

//variable to hold setInterval() function
let interval = null;

//variable to hold recordingTimer status
let statusRecording = "stopped";

function recordingTimer() {
    seconds++;

    if (seconds / 60 === 1) {
        seconds = 0;
        minutes++;

        if (minutes / 60 === 1) {
            minutes = 0;
            hours++;
        }
    }

    if (seconds < 10) {
        displaySeconds = "0" + seconds.toString();
    }
    else {
        displaySeconds = seconds;
    }

    if (minutes < 10) {
        displayMinutes = "0" + minutes.toString();
    }
    else {
        displayMinutes = minutes;
    }

    if (hours < 10) {
        displayHours = "0" + hours.toString();
    }
    else {
        displayHours = hours;
    }

    recordingTime.innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
}

function startStopRecordingTimer() {
    if (statusRecording === "stopped") {
        interval = window.setInterval(recordingTimer, 1000);
        statusRecording = "started";
    }
    else {
        window.clearInterval(interval);
        statusRecording = "stopped";
    }
}

function resetRecordingTimer() {
    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;

    recordingTime.innerHTML = "00:00:00";
}

recordButton.addEventListener("click", () => {
    record();
    startStopRecordingTimer();
});


stopButton.addEventListener("click", () => {
    stop();
    startStopRecordingTimer();
    resetRecordingTimer();
});


let mic, recorder, soundFile, blob;
let status = 0;

function setup() {
    // create an audio in
    mic = new p5.AudioIn();
    recorder = new p5.SoundRecorder();
    soundFile = new p5.SoundFile();

    recorder.setInput(mic);
}

function record() {
    mic.start();
    recorder.record(soundFile);
    recording.classList.remove("hidden");
    recordButton.classList.add("hidden");
}

function stop() {
    mic.stop();
    recorder.stop();

    recording.classList.add("hidden");
    recordButton.classList.remove("hidden");

    flashcardAudio = getBlob();
}

function getBlob() {
    var leftChannel, rightChannel;
    leftChannel = soundFile.buffer.getChannelData(0);
    // handle mono files
    if (soundFile.buffer.numberOfChannels > 1) {
        rightChannel = soundFile.buffer.getChannelData(1);
    } else {
        rightChannel = leftChannel;
    }
    var interleaved = interleave(leftChannel, rightChannel);
    // create the buffer and view to create the .WAV file
    var buffer = new window.ArrayBuffer(44 + interleaved.length * 2);
    var view = new window.DataView(buffer);
    // write the WAV container,
    writeUTFBytes(view, 0, 'RIFF');
    view.setUint32(4, 36 + interleaved.length * 2, true);
    writeUTFBytes(view, 8, 'WAVE');
    // FMT sub-chunk
    writeUTFBytes(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    // stereo (2 channels)
    view.setUint16(22, 2, true);
    view.setUint32(24, 44100, true);
    view.setUint32(28, 44100 * 4, true);
    view.setUint16(32, 4, true);
    view.setUint16(34, 16, true);
    // data sub-chunk
    writeUTFBytes(view, 36, 'data');
    view.setUint32(40, interleaved.length * 2, true);
    // write the PCM samples
    var lng = interleaved.length;
    var index = 44;
    var volume = 1;
    for (var i = 0; i < lng; i++) {
        view.setInt16(index, interleaved[i] * (32767 * volume), true);
        index += 2;
    }
    var blob = new Blob([view], {
        type: 'audio/wav'
    });


    //const audio = document.createElement('audio');
    const audioURL = window.URL.createObjectURL(blob);
    audio.removeAttribute('src');
    //audio.attributes.add('src');
    audio.src = audioURL;
    //dropZoneIcons.appendChild(audio);
    player.classList.remove("hidden");

    return blob;
}

// helper methods to save waves
function interleave(leftChannel, rightChannel) {
    var length = leftChannel.length + rightChannel.length;
    var result = new Float32Array(length);
    var inputIndex = 0;
    for (var index = 0; index < length;) {
        result[index++] = leftChannel[inputIndex];
        result[index++] = rightChannel[inputIndex];
        inputIndex++;
    }
    return result;
}
function writeUTFBytes(view, offset, string) {
    var lng = string.length;
    for (var i = 0; i < lng; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}