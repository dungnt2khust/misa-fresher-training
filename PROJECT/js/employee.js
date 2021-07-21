// DOCUMENT READY
$(document).ready(function () {
    loadData();
    setTimeout(function() {
        bindEmployeeInfor();
    }, 1000); 
});


// TODO: BẮT CÁC SỰ KIỆN

    // Khi bật nhấn nút tạo mới thì bật form tạo mới và lấy mã nhân viên mới
    $('.button-addemployee')[0].onclick = () => {
        $('.popup-overlay--create')[0].style.display = "block";
        $('.popup-overlay--create')[0].style.opacity = "1"; 
        getNewEmployeeId();
    }

    // Khi nhấn vào nút tạo mới (Lưu) thì gọi đến hàm tạo mới
    $('#popup-btn-save--create').click(function() {
        getCreateData();
    });


    // Ấn vào dấu x thì ẩn form đi
    document.querySelectorAll(".popup-header__cancel").forEach((popupCancel) => {
        popupCancel.addEventListener('click', () => {
            var popupOverlay = popupCancel.parentElement.parentElement.parentElement;
            hidePopup(popupOverlay);
        });
    });

    // Ấn vào nút Huỷ thì ẩn form đi
    document.querySelectorAll(".popup-btn-cancel").forEach((popupCancel) => {
        popupCancel.addEventListener('click', () => {
            var popupOverlay = popupCancel.parentElement.parentElement.parentElement;
            hidePopup(popupOverlay);
        });
    });



// TODO: HÀM XỬ LÝ

    /**
     * Hàm load dữ liệu employee
     * Author: NTDUNG (21/07/2021)
     */
    function loadData() {
        $.ajax({
            url: 'http://cukcuk.manhnv.net/v1/Employees?fbclid=IwAR0gkgLV9-EEjuO9Kq15v6Ofy4oJFlFF2tBHn4QIFPngEeEE--jOzMKIAUc',
            method: 'GET',
            async: false
        }).done(function (res) {
            renderTableEmployee(res);     
        }).fail(function (res) {
            alert('fail to load data');
        });
    }

    /**
     * Hàm bind dữ liệu vào bảng employee
     * Author: NTDUNG (21/07/2021)
     */
    var tableData;
    function renderTableEmployee(datas) {
        var tbodyEmployee = $('tbody');
        tableData = datas;
        for (var i = 0; i < datas.length; i++) {
            var tableRow = `<tr data-id=${i} class="table-employee__row">
                                <td class="table-employee__check"><input type="checkbox" name="" id=""></td>
                                <td class="table-employee__code">${datas[i].EmployeeCode}</td>
                                <td class="table-employee__name">${datas[i].FullName}</td>
                                <td class="table-employee__gender">${datas[i].GenderName}</td>
                                <td class="table-employee__dob text-align-center">${resolveDate(datas[i].DateOfBirth, 'table')}</td>
                                <td class="table-employee__phone">${datas[i].PhoneNumber}</td>
                                <td class="table-employee__email" title="${datas[i].Email}">${datas[i].Email}</td>
                                <td class="table-employee__position">${datas[i].PositionName}</td>
                                <td class="table-employee__department">${datas[i].DepartmentName}</td>
                                <td class="table-employee__salary">${datas[i].Salary}</td>
                                <td class="table-employee__status">${datas[i].WorkStatus}</td>
                            </tr>`;
            tbodyEmployee.append(tableRow);
        }
    }

    function bindEmployeeInfor() {
        var employeeItems = document.querySelectorAll('.table-employee__row');
        employeeItems.forEach((employeeItem) => {
            employeeItem.addEventListener('click', function (e) {

                // SET VALUE FROM TABLE ROW TO DETAIL FORM
                var dataRow = tableData[employeeItem.getAttribute('data-id')];

                $('#employee__code--update')[0].value = resolveValue(dataRow.EmployeeCode);
                $('#employee__fullname--update')[0].value = resolveValue(dataRow.FullName);
                $('#employee__dob--update')[0].value = resolveDate(dataRow.DateOfBirth, 'date');
                $('#employee__gender--update')[0].value = resolveValue(dataRow.GenderName);
                $('#employee__idnumber--update')[0].value = resolveValue(dataRow.IdentifyNumber);
                $('#employee__iddate--update')[0].value = resolveDate(dataRow.IdentifyDate, 'date');
                $('#employee__idplace--update')[0].value = resolveValue(dataRow.IdentifyPlace);
                $('#employee__email--update')[0].value = resolveValue(dataRow.Email);
                $('#employee__phone--update')[0].value = resolveValue(dataRow.PhoneNumber);
                $('#employee__position--update')[0].innerText = resolveValue(dataRow.PositionName);
                $('#employee__department--update')[0].innerText = resolveValue(dataRow.DepartmentName);
                $('#employee__taxcode--update')[0].value = resolveValue(dataRow.PersonalTaxCode);
                $('#employee__basesalary--update')[0].value = resolveValue(dataRow.Salary);
                $('#employee__joiningdate--update')[0].value = resolveDate(dataRow.JoinDate);
                $('#employee__workstatus--update')[0].innerText = resolveValue(dataRow.WorkStatus);

                showPopupUpdate(e);
            });
        });
    }

    /**
     * Hàm tạo mới một nhân viên
     * Author: NTDUNG (21/07/2021)
     */
    function createEmployee() {
        var newEmployee = `{
        "EmployeeCode": "NV0311",
        "FirstName": null,
        "LastName": null,
        "FullName": "Lưu Tiến Đức",
        "Gender": -1,
        "DateOfBirth": "2021-07-20T00:00:00",
        "PhoneNumber": "0666891179",
        "Email": "email@email.com",
        "Address": null,
        "IdentityNumber": "HUNGNN00251",
        "IdentityDate": null,
        "IdentityPlace": "Hà Nội",
        "JoinDate": "2021-07-24T00:00:00",
        "MartialStatus": null,
        "EducationalBackground": null,
        "QualificationId": null,
        "DepartmentId": null,
        "PositionId": null,
        "WorkStatus": 0,
        "PersonalTaxCode": "8215092",
        "Salary": 409137336,
        "PositionCode": null,
        "PositionName": null,
        "DepartmentCode": null,
        "DepartmentName": null,
        "QualificationName": null,
        "GenderName": null,
        "EducationalBackgroundName": null,
        "MartialStatusName": null,
        "CreatedDate": "2021-07-20T13:32:19",
        "CreatedBy": null,
        "ModifiedDate": null,
        "ModifiedBy": null
        }`;
    }

    /**
     * Hàm lấy về tên nhân viên mới để gợi ý cho người dùng
     * Author: NTDUNG (21/07/2021)
     */
    function getNewEmployeeId() {
        $.ajax({
            url: 'http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode',
            method: 'GET',
            async: false
        }).done(function (res) {
            $('#employee__code--create').val(res);
            $('#employee__code--create').focus();
        }).fail(function (res) {
            console.log('cannot get new employee id');
        });
    }

    /**
     * Hàm hiện form chi tiết nhân viên (chỉnh sửa được)
     * Author: NTDUNG (21/07/2021)
     * @param {event} e 
     */
    function showPopupUpdate(e) {
        var checkbox = document.querySelector(".table-employee__row input");
        if (e.target != checkbox) {
            $('.popup-overlay--update')[0].style.display = "block";
            $('.popup-overlay--update')[0].style.opacity = 1;
            var firstInput = document.querySelector(".popup-overlay--update .popup-infor__input");
            firstInput.focus();
        }
    }

    /**
     * Hàm ẩn form
     * Author: NTDUNG (21/07/2021)
     * @param {element} popupOverlay 
     */
    function hidePopup(popupOverlay) {
        popupOverlay.style.display = "none";
        popupOverlay.style.opacity = 0;
    }

    /**
     * Hàm xử lý dữ liệu ngày tháng
     * @param {date} date 
     * @param {string} type
     * @returns string
     */
    function resolveDate(date, type) {
        var dateOfBirth = new Date(date);
        var date = dateOfBirth.getDate();
        date = date < 10 ? '0' + date : date;
        var month = dateOfBirth.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var year = dateOfBirth.getFullYear(); 
        if (Number.isNaN(date)) {
            return '';
        } else {
            if (type == 'table') {
                return `${date}/${month}/${year}`; 
            } else if (type == 'date') {
                return `${year}-${month}-${date}`;
            }
        }
    }

    /**
     * Hàm xử lý các dữ liệu lấy về (khác ngày tháng) 
     * @param {number, string} value 
     * @returns number, string
     */
    function resolveValue(value) {
        return value == null ? '' : value;
    }