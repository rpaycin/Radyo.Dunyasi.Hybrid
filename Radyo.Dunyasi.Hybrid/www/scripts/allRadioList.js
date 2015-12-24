var serviceURL = "http://212.98.202.29/StokTakip/api/";

var employees;

$('#pageAllRadios').bind('pageinit', function (event) {
    getallRadioList();
});

function getallRadioList() {
    $.getJSON(serviceURL + 'radio/GetRadios', function (data) {
        $('#allRadioList li').remove();
        employees = data.Value;
        $.each(employees, function (index, employee) {
            $('#allRadioList').append('<li><a href="employeedetails.html?id=' + employee.RadioId + '">' +
					'<img src="pics/' + employee.IconUrl + '"/>' +
					'<h4>' + employee.RadioName + '</h4>' + '</a></li>');
        });
        $('#allRadioList').listview('refresh');
    });
}