$(document).on('pageinit', '#pageOrderByName', function () {
    getlistViewOrderByName(true, -1);

    //radyo item basıldığı zaman
    $(document).on('vclick', '.radyoItem', function () {
        audioPlayStop(false, '');

        radio.radioUrl = $(this).attr('radioUrl');
        radio.imageUrl = $(this).attr('radioImageUrl');
        radio.radioName = $(this).find("#hRadioName").text();
        radio.categoryName = $(this).find("#pCategoryName").text();

        $.mobile.changePage("#pageRadioPlay", { transition: 'slide' });
    });
});

//$(document).on('pagebeforeshow', '#pageOrderByName', function () {
//    if (!isWorkAllRadio) {

//        $("#spanOrderByName").text(category.categoryName);
//        getlistViewOrderByName(isAllCategory, category.categoryId);

//        category.categoryId = -1;

//        isAllCategory = true;
//        isWorkAllRadio = true;
//    }
//});

function getlistViewOrderByName(isAll, categoryId) {
    var methodUrl = isAll ? 'radio/GetRadios' : 'radio/GetRadiosByCategoryId?categoryId=' + categoryId;

    $.ajax({
        beforeSend: function () {
            showLoading('Radyolar yükleniyor...');
        },
        complete: function () {
            $('#listViewOrderByName').listview('refresh');

            AddScroll("wrapperOrderByName");

            hideLoading();
        },
        url: serviceURL + methodUrl,
        dataType: 'json',
        success: function (data) {
            if (data.IsSuccess) {
                $('#listViewOrderByName li').remove();

                $.each(data.Value, function (index, radio) {
                    if (radio.IsShow) {
                        $('#listViewOrderByName').append(getRadioItem(radio));
                    }
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
            hideLoading();
        },
        timeout: 30000
    });
}

function getRadioItem(radio) {
    var imageUrl = radio.IsImageLocal ? localImageURL : serverImageURL;
    imageUrl = imageUrl + radio.IconUrl;

    var radioItem = "<li data-icon='false'> \
                    <a class='radyoItem' radioUrl=" + radio.StreamUrl + "  radioImageUrl=" + imageUrl + "> \
                        <img src='" + imageUrl + "' class='circleImage'> \
                        <h style='margin-left:-20px;' id='hRadioName1'>" + radio.RadioName + "</h> \
                        <table style='margin-left:-20px;;font-size:20px;'> \
                            <tr>\
                                <td><p style='background-color:#FFCC99;font-size:14px' id='pCategoryName'>" + getCategoryName(radio, 0) + "</p></td> \
                                <td><p style='background-color:#CCFFCC;font-size:14px'>" + getCategoryName(radio, 1) + "</p></td>\
                                <td><p style='background-color:#CCCCFF;font-size:14px'>" + getCategoryName(radio, 2) + "</p></td>\
                            </tr>\
                        </table>\
                    </a>\
                </li>";

    return radioItem;
}

function getCategoryName(radio, index) {
    return (radio.ListCategoryNames[index] != undefined) ? radio.ListCategoryNames[index] : "";
}