$(document).on('pagebeforeshow', '#pageRadioPlay', function () {
    $("#spanCategoryName").text(radio.categoryName);
    $("#imgRadioStation").attr('src', radio.imageUrl);


    //test
    radio.radioUrl = 'http://allergo.serverroom.us:8127/;';

    SetValueLocal(localRadioUrl, radio.radioUrl);

    audioPlayerPlayorStop(true, radio.radioName);
});

