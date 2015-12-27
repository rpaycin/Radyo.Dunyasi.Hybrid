﻿$(function () {
    //ana menuyu sayfalara ekleme
    mainMenuAdd();

    //statusbari aşağı kaydırma ios için
    addHeaderMarginTop();

    //var filter = $('#custom-allRadioList').prev();
    //$('#custom-allRadioList').parent().append(filter);
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
    }
}