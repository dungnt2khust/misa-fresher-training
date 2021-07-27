
var employeeInfor = {
    "EmployeeCode": "NVF5331323",
    "FirstName": null,
    "LastName": null,
    "FullName": "Nguyễn Tiến Dũng abc",
    "Gender": 1,
    "DateOfBirth": "2021-07-20T00:00:00",
    "PhoneNumber": "+84372973290",
    "Email": "email@email.com",
    "Address": null,
    "IdentityNumber": "",
    "IdentityDate": null,
    "IdentityPlace": "",
    "JoinDate": null,
    "MartialStatus": null,
    "EducationalBackground": null,
    "QualificationId": null,
    "DepartmentId": null,
    "PositionId": "589edf01-198a-4ff5-958e-fb52fd75a1d4",
    "WorkStatus": null,
    "PersonalTaxCode": "",
    "Salary": null,
    "PositionCode": "P07",
    "PositionName": "Phó phòng",
    "DepartmentCode": null,
    "DepartmentName": null,
    "QualificationName": null,
    "GenderName": "Nam",
    "EducationalBackgroundName": null,
    "MartialStatusName": null,
    "CreatedDate": "2021-07-21T08:36:35",
    "CreatedBy": null,
    "ModifiedDate": null,
    "ModifiedBy": null
  };

    // "EmployeeId": "c23e675b-e9fe-11eb-94eb-42010a8c0002",
$.ajax({
    url: 'http://cukcuk.manhnv.net/v1/Employees/c23e675b-e9fe-11eb-94eb-42010a8c0002',
    type: 'PUT',
    data: employeeInfor,
    contentType: 'application/json',
    datatype: 'json'
}).done(function(res) {
    alert('Chỉnh sửa thành công');
}).fail(function(res) {
    alert('Chỉnh sửa thất bại');
});

