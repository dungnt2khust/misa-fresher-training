// DOCUMENT READY
$(document).ready(function () {
    console.log('document already');
    loadData();
});


// CALL API TO GET DATA
function loadData() {
    $.ajax({
        url: 'http://cukcuk.manhnv.net/v1/Employees?fbclid=IwAR0gkgLV9-EEjuO9Kq15v6Ofy4oJFlFF2tBHn4QIFPngEeEE--jOzMKIAUc',
        method: 'GET'
    }).done(function (res) {
        console.log('load data done');
        renderTableEmployee(res);
    }).fail(function (res) {
        console.log('fail to load data');
    });
}

// Render table 
function renderTableEmployee(datas) {
    var tbodyEmployee = $('tbody');
    console.log(tbodyEmployee);
    datas.forEach((data) => {
        console.log(data);
        var tableRow = `<tr class="table-employee__row">
                            <td class="table-employee__check"><input type="checkbox" name="" id=""></td>
                            <td class="table-employee__code">${data.EmployeeCode}</td>
                            <td class="table-employee__name">${data.FullName}</td>
                            <td class="table-employee__gender">${data.Gender}</td>
                            <td class="table-employee__dob">${data.DateOfBirth}</td>
                            <td class="table-employee__phone">${data.PhoneNumber}</td>
                            <td class="table-employee__email">${data.Email}</td>
                            <td class="table-employee__position">${data.PositionName}</td>
                            <td class="table-employee__department">${data.DepartmentName}</td>
                            <td class="table-employee__salary">${data.Salary}</td>
                            <td class="table-employee__status">${data.WorkStatus}</td>
                        </tr>`;
        tbodyEmployee.prepend(tableRow);
    });
}