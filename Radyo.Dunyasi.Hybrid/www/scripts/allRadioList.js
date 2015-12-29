var serverUrl = "http://212.98.202.29/StokTakip/";
var serviceURL = serverUrl + "api/";

var serverImageURL = serverUrl + "Contents/Images/Radyolar/";
var localImageURL = "images/radyolar/";

var employees;

$('#pageAllRadios').bind('pageinit', function (event) {
    getlistViewAllRadio();
});

function getlistViewAllRadio() {
    $.getJSON(serviceURL + 'radio/GetRadios', function (data) {
        if (data.IsSuccess) {
            $('#listViewAllRadio li').remove();

            $.each(data.Value, function (index, radio) {
                if (radio.IsShow) {
                    $('#listViewAllRadio').append(getRadioItem(radio));
                }
            });

            $('#listViewAllRadio').listview('refresh');
        }
        else
            alert('radyo bilgileri alınamadı!');
    });
}

function getRadioItem(radio) {
    var imageUrl = radio.IsImageLocal ? localImageURL : serverImageURL;
    imageUrl = imageUrl + radio.IconUrl;

    var radioItem = "<li data-icon='false'> \
                    <a href='#'> \
                        <img src='" + imageUrl + "' class='circleImage'> \
                        <h style='margin-left:-20px;'>" + radio.RadioName + "</h> \
                        <table style='margin-left:-20px;;font-size:20px;'> \
                            <tr>\
                                <td><p style='background-color:#FFCC99;font-size:14px'>" + getCategoryName(radio, 0) + "</p></td> \
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