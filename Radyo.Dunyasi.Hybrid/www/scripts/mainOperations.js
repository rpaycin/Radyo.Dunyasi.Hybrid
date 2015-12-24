$(function () {
    var menuHtml = '<ul>' +
           '<li class="allRadios"><a href="#pageAllRadios" data-transition="slide" title="Tüm Radyolar">Tüm Radyolar</a></li>' +
           '<li class="categories"><a href="#pageCategories" data-transition="slide" title="Kategoriler">Kategoriler</a></li>' +
           '<li class="favourites"><a href="#" data-transition="slide" title="Favorilerim">Favorilerim</a></li>' +
       '</ul>';

    $("#panelAllRadios").append(menuHtml);
    $("#panelCategories").append(menuHtml);
});