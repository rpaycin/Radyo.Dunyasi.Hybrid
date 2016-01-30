$(document).on('pagebeforeshow', '#pageRadioPlay', function () {
    $("#spanCategoryName").text(radio.categoryName);
    $("#imgRadioStation").attr('src', radio.imageUrl);
    
    SetValueLocal(localRadioUrl, radio.radioUrl);

    audioPlayStop(true, radio.radioName);
});

