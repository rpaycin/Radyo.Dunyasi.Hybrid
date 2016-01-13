$(document).on('pagebeforeshow', '#pageRadioPlay', function () {
    $("#spanCategoryName").text(radio.categoryName);
    $("#hRadioStation").text(radio.radioName);
    $("#imgRadioStation").attr('src', radio.imageUrl);
    //alert(radio.radioUrl + ' ' + radio.imageUrl + ' ' + radio.radioName);

    //test
    radio.radioUrl = 'http://www.radyosahil.com.tr:8000/radyosahil.ogg';//'http://allergo.serverroom.us:8127/;';

    SetValueLocal("RadioUrl", radio.radioUrl);

    audioPlay();
});




////radyo çalma


var progressTimer;

var playButton = document.getElementById('playbutton');
var stopButton = document.getElementById('stopbutton');
var activityIndicator = document.getElementById('activityindicator');

var isPlaying = false;
var readyStateInterval = null;

function onError(error) {
    console.log(error.message);
}

function pad2(number) {
    return (number < 10 ? '0' : '') + number
}

var myaudioURL = '';
var myaudio = new Audio(myaudioURL);

function audioPlay() {
    myaudioURL = GetValueLocal("RadioUrl");
    myaudio = new Audio(myaudioURL);

    isPlaying = true;
    myaudio.play();

    readyStateInterval = setInterval(function () {
        if (myaudio.readyState <= 2) {
            playButton.style.display = 'none';
            activityIndicator.style.display = 'block';
            //textPosition.innerHTML = 'loading...';
        }
    }, 1000);
    myaudio.addEventListener("timeupdate", function () {
        var s = parseInt(myaudio.currentTime % 60);
        var m = parseInt((myaudio.currentTime / 60) % 60);
        var h = parseInt(((myaudio.currentTime / 60) / 60) % 60);
        if (isPlaying && myaudio.currentTime > 0) {
            //textPosition.innerHTML = pad2(h) + ':' + pad2(m) + ':' + pad2(s);
        }
    }, false);
    myaudio.addEventListener("error", function (error) {
        console.log('myaudio ERROR');
    }, false);
    myaudio.addEventListener("canplay", function () {
        console.log('myaudio CAN PLAY');
    }, false);
    myaudio.addEventListener("waiting", function () {
        //console.log('myaudio WAITING');
        isPlaying = false;
        playButton.style.display = 'none';
        stopButton.style.display = 'none';
        activityIndicator.style.display = 'block';
    }, false);
    myaudio.addEventListener("playing", function () {
        isPlaying = true;
        playButton.style.display = 'none';
        activityIndicator.style.display = 'none';
        stopButton.style.display = 'block';
    }, false);
    myaudio.addEventListener("ended", function () {
        //console.log('myaudio ENDED');
        //audioStop();
        // navigator.notification.alert('Streaming failed. Possibly due to a network error.', null, 'Stream error', 'OK');
        // navigator.notification.confirm(
        //	'Streaming failed. Possibly due to a network error.', // message
        //	onConfirmRetry,	// callback to invoke with index of button pressed
        //	'Stream error',	// title
        //	'Retry,OK'		// buttonLabels
        // );
        if (window.confirm('Streaming failed. Possibly due to a network error. Retry?')) {
            onConfirmRetry();
        }
    }, false);

    return false;
}

function audioPause() {
    isPlaying = false;
    clearInterval(readyStateInterval);
    myaudio.pause();
    stopButton.style.display = 'none';
    activityIndicator.style.display = 'none';
    playButton.style.display = 'block';

    return false;
}

function audioStop() {
    isPlaying = false;
    clearInterval(readyStateInterval);
    myaudio.pause();
    stopButton.style.display = 'none';
    activityIndicator.style.display = 'none';
    playButton.style.display = 'block';
    myaudio = null;
    myaudio = new Audio(myaudioURL);
    //textPosition.innerHTML = '';

    return false;
}

function volumeOperation(isIncrement) {
    if (isIncrement && myaudio.volume < 1)
        myaudio.volume += 0.1;
    else if (myaudio.volume > 0)
        myaudio.volume -= 0.1;

    return false;
}