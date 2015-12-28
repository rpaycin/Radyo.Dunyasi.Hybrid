var serverUrl = "http://212.98.202.29/StokTakip/";
var serviceURL = serverUrl + "api/";

var serverImageURL = serverUrl + "Contents/Images/Radyolar/";
var localImageURL = "images/radyolar/";

var employees;

$('#pageAllRadios').bind('pageinit', function (event) {
    getallRadioList();
});

function getallRadioList() {
    $.getJSON(serviceURL + 'radio/GetRadios', function (data) {
        if (data.IsSuccess) {
            $('#allRadioList li').remove();

            $.each(data.Value, function (index, radio) {
                if (radio.IsShow) {
                    $('#allRadioList').append(getRadioItem(radio));
                }
            });

            $('#allRadioList').listview('refresh');
        }
        else
            alert('radyo bilgileri alınamadı!');
    });
}

function getRadioItem(radio) {
    var imageUrl = radio.IsImageLocal ? localImageURL : serverImageURL;
    imageUrl = imageUrl + radio.IconUrl;

    var radioItem="<li data-icon='false'> \
                    <a href='#'> \
                        <img src='" + imageUrl + "' class='circleImage'> \
                        <h style='margin-left:-20px;'>" + radio.RadioName + "</h> \
                        <table style='margin-left:-20px;'> \
                            <tr>\
                                <td><p style='background-color:#FFEBCD;font-size:10px'>POP</p></td> \
                                <td><p style='background-color:#ADD8E6;font-size:10px'>POP</p></td>\
                                <td><p style='background-color:#98FB98;font-size:11px'>Türk Sanat Müziği</p></td>\
                            </tr>\
                        </table>\
                    </a>\
                </li>";

    return radioItem;
}