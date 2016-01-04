var serverUrl = "http://212.98.202.29/StokTakip/";
var serviceURL = serverUrl + "api/";

var serverImageURL = serverUrl + "Contents/Images/Radyolar/";
var localImageURL = "images/radyolar/";

$(function () {
    //açılışta tüm radyoları getirme
    getlistViewAllRadio();

    //radyo item basıldığı zaman
    $(document).on('vclick', '.radyoItem', function () {
        audioStop();

        radio.radioUrl = $(this).attr('radioUrl');
        radio.imageUrl = $(this).attr('radioImageUrl');
        radio.radioName = $(this).find("#hRadioName").text();
        radio.categoryName = $(this).find("#pCategoryName").text();

        $.mobile.changePage("#pageRadioPlay", { transition: 'slide' });
    });
});

function getlistViewAllRadio() {
    $.ajax({
        url: serviceURL + 'radio/GetRadios',
        dataType: 'json',
        //data: data,
        success: function (data) {
            if (data.IsSuccess) {
                $('#listViewAllRadio li').remove();

                $.each(data.Value, function (index, radio) {
                    if (radio.IsShow) {
                        $('#listViewAllRadio').append(getRadioItem(radio));
                    }
                });
                
                $('#listViewAllRadio').listview('refresh');
                AddScroll("wrapperRadioList");
            }
            else
                alert('radyo bilgileri alınamadı!');
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
                        <h style='margin-left:-20px;' id='hRadioName'>" + radio.RadioName + "</h> \
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