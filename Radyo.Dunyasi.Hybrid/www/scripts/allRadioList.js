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

                    var imageUrl = radio.IsImageLocal ? localImageURL : serverImageURL;
                    imageUrl = imageUrl + radio.IconUrl;

                    $('#allRadioList').append('<li style="height:50px;" ><a href="employeedetails.html?id=' + radio.RadioId + '">' +
                    '<img style="margin-left:10px;" src=' + imageUrl + '></img>' +
                    '<h4>' + radio.RadioName + '</h4>' + '</a></li>');
                }
            });

            $('#allRadioList').listview('refresh');
        }
        else
            alert('radyo bilgileri alınamadı!');
    });
}