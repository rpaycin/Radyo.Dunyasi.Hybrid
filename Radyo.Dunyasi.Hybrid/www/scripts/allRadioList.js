var serviceURL = "http://212.98.202.29/StokTakip/api/";

var employees;

$('#employeeListPage').bind('pageinit', function (event) {
    getEmployeeList();
});

function getEmployeeList() {
    $.getJSON(serviceURL + 'radio/GetRadios', function (data) {
        $('#employeeList li').remove();
        employees = data.Value;
        $.each(employees, function (index, employee) {
            $('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.RadioId + '">' +
					'<img src="pics/' + employee.IconUrl + '"/>' +
					'<h4>' + employee.RadioName + '</h4>' + '</a></li>');
        });
        $('#employeeList').listview('refresh');
    });
}