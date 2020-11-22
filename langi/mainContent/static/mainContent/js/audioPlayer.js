$(
    function () {
        var aud = $('#audio')[0];
        var time = $('.player-time');

        $('.play-pause').on('click', function () {
            if (aud.paused) {
                aud.play();
                $('.play-pause').removeClass('icon-play');
                $('.play-pause').addClass('icon-stop');
            }
            else {
                aud.pause();
                $('.play-pause').removeClass('icon-stop');
                $('.play-pause').addClass('icon-play');
            }

        })
        aud.ontimeupdate = function () {
            if (!Number.isNaN(aud.duration)) {
                $('.player-progress').css('width', aud.currentTime / aud.duration * 100 + '%');
                time.html(displayTime(aud.currentTime) + "/" + displayTime(aud.duration));
            }
        }

        var audLearn = $('#flashcard-audio')[0];
        var timeLearn = $('.flashcard-player-time');

        if (audLearn != undefined && audLearn != null) {
            $('.flashcard-play-pause').on('click', function () {
                if (audLearn.src != null && audLearn.src != "") {
                    if (audLearn.paused) {
                        audLearn.play();
                        $('.flashcard-play-pause').removeClass('icon-play');
                        $('.flashcard-play-pause').addClass('icon-stop');
                    }
                    else {
                        audLearn.pause();
                        $('.flashcard-play-pause').removeClass('icon-stop');
                        $('.flashcard-play-pause').addClass('icon-play');
                    }
                }
            })
            audLearn.ontimeupdate = function () {
                if (!Number.isNaN(audLearn.duration)) {
                    $('.flashcard-player-progress').css('width', audLearn.currentTime / audLearn.duration * 100 + '%');
                    timeLearn.html(displayTime(audLearn.currentTime) + "/" + displayTime(audLearn.duration));
                }
            }
        }
    }
)

function displayTime(seconds) {
    var minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds - minutes * 60);
    if (seconds < 10) seconds = "0" + seconds.toString();
    return minutes + ":" + seconds;
}