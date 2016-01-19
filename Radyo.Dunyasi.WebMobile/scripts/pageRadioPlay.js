$(document).on('pagebeforeshow', '#pageRadioPlay', function () {
    $('#radioPlayerContent').css('margin-top', ($(window).height() - $('[data-role=header]').height() - $('[data-role=footer]').height() - $('#radioPlayerContent').outerHeight()) / 2);

    $("#spanCategoryName").text(radio.categoryName);
    $("#imgRadioStation").attr('src', radio.imageUrl);

    //test
    radio.radioUrl = 'http://allergo.serverroom.us:8127/;';

    SetValueLocal(localRadioUrl, radio.radioUrl);

    audioPlayStop(true, radio.radioName);
});

