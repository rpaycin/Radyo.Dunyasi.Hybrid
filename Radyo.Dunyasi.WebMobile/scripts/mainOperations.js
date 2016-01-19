
//jquery ajax ayarları
$(document).on({
    ajaxStart: function () {
        $.mobile.loading('show', { theme: "b", text: "Lütfen Bekleyiniz..." });
    },
    ajaxStop: function () {
        $.mobile.loading('hide');
    }
});

//cihaz ready, pause ve resume eventleri
$(function () {
    //radioplayer başlangıç
    $("#jplayerRadio").jPlayer({

        swfPath: "../../dist/jplayer",
        supplied: "m4a, oga, mp3",
        useStateClassSkin: true,
        autoBlur: true,
        smoothPlayBar: true,
        keyEnabled: true,
        remainingDuration: true,
        toggleDuration: true
    });

    //radioplayer content
    $(document).on("pageshow", "#pageRadioPlay", function () {
        $('#radioPlayerContent').css('margin-top', ($(window).height() - $('[data-role=header]').height() - $('[data-role=footer]').height() - $('#radioPlayerContent').outerHeight()) / 2);
    });

    $(document).on('vclick', '.radyoItem', function () {
        audioPlayerPlayorStop(false, '');

        radio.radioUrl = $(this).attr('radioUrl');
        radio.imageUrl = $(this).attr('radioImageUrl');
        radio.radioName = $(this).find("#hRadioName").text();
        radio.categoryName = $(this).find("#pCategoryName").text();

        $.mobile.changePage("#pageRadioPlay", { transition: 'slide' });
    });

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
    };

    function onPause() {
    };

    function onResume() {
    };
});

$(function () {
    //ana menuyu sayfalara ekleme
    mainMenuAdd();

    //statusbari aşağı kaydırma ios için
    //addHeaderMarginTop();
});

function mainMenuAdd() {
    var menuHtml = '<ul>' +
       '<li class="allRadios"><a href="#pageAllRadios" data-transition="slide" title="Tüm Radyolar">Tüm Radyolar</a></li>' +
       '<li class="categories"><a href="#pageCategories" data-transition="slide" title="Kategoriler">Kategoriler</a></li>' +
       '<li class="favourites"><a href="#" data-transition="slide" title="Favorilerim">Favorilerim</a></li>' +
   '</ul>';

    $("#panelAllRadios").append(menuHtml);
    $("#panelCategories").append(menuHtml);
}

function addHeaderMarginTop() {
    var isios = isIOS();
    if (isios != null && isios) {
        var px = "20px";
        $("#headerAllRadios").css("margin-top", px);
        $("#panelAllRadios").css("margin-top", px);
        $("#headerCategories").css("margin-top", px);
        $("#panelCategories").css("margin-top", px);
        $("#headerRadioPlay").css("margin-top", px);
        //$(".wrapperList").css("top", "65px");
    }
}
