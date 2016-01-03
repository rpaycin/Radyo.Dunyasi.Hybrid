//o anki sallama durumunu al
function getAcceleration() {
    navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
}

var watchID;

//sallamayı belli n saniye aralıklarla düzenli izle
function startWatchAccelerator() {
    var options = { frequency: 1000 };
    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}

//sallama izlemeyi durdur
function stopWatchAccelerator() {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        document.getElementById("divAcceleration").innerHTML = "İzleme durduruldu";
        watchID = null;
    }
}    // ACCELERATOR EVENTLERİ
//cihaz sallandığı anda çalışır
function onSuccess(acceleration) {
    document.getElementById("divAcceleration").innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                            'Acceleration Y: ' + acceleration.y + '<br />' +
                            'Acceleration Z: ' + acceleration.z + '<br />' +
                            'Timestamp: ' + acceleration.timestamp + '<br />';
}

//cihaz sallandığı zaman bir hata oluşursa çalışır
function onError() {
    alert('onError!');
}