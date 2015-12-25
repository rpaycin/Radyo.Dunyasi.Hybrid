function isAndroid() {
    var nua = navigator.userAgent;

    var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android') > -1 && nua.indexOf('AppleWebKit') > -1);
    return isAndroid;
    }

function isIpad() {
    var nua = navigator.userAgent;

    var isiPad = nua.match(/iPad/i) != null;
    return isiPad;
}

function isIOS() {
    return navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
}