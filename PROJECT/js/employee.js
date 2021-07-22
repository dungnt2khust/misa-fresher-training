// DOCUMENT READY
var method;
var employeeId = '';
var employeeName, employeeCode;
var employeesDelete = new Set();
var employeesName = new Set();
var employeesCode = new Set();

$(document).ready(function () {
    loadData();
    setTimeout(function() {
        toastMessage('info', 'Đã có bản cập nhật mới. Hãy cập nhật để trải niệm', 5000);
    }, 20000);
});


// TODO: BẮT CÁC SỰ KIỆN

    // 1. Khi focus vào input tìm kiếm thì border xung quanh 
    document.querySelector('.table-search__input').addEventListener('focus', function() {
        document.querySelector('.table-search').classList.add('focus-dropdown');
    });

    // Khi blur thì bỏ đi
    document.querySelector('.table-search__input').addEventListener('blur', function() {
        document.querySelector('.table-search').classList.remove('focus-dropdown');
    });

    // Khi bật nhấn nút tạo mới thì bật form tạo mới và lấy mã nhân viên mới
    $('.button-addemployee')[0].onclick = () => {
        $('.popup-overlay--infor input').val('');
        $('.popup-overlay--infor')[0].style.display = "block";
        $('.popup-overlay--infor')[0].style.opacity = "1"; 
        method = 'POST';
        $('.btn-delete').attr('style', 'display: none;');
        getNewEmployeeId();
    }

    // Khi nhấn vào nút tạo mới (Lưu) thì gọi đến hàm tạo mới
    $('#popup-btn-save--infor').click(function() {
        handleEmployee(method, employeeId);
        $('.popup-overlay--infor')[0].style.display = "none";
        $('.popup-overlay--infor')[0].style.opacity = "0"; 
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

    // Ấn nút Refresh thì load lại dữ liệu
    $('.refresh')[0].onclick = () => {
        loadData();
        toastMessage('success', 'Tải dữ liệu thành công', 5000);
    } 

    // Nhấn nút xoá nhân viên
    $('.btn-delete').click(function() {
        hidePopup($('.popup-overlay--infor')[0]);
        $('#confirm-delete-one').attr('style', 'display: flex');
        $('.employee-infor-delete')[0].innerText = `${employeeName} - ${employeeCode}`;
    });

    // Ấn nút cancel khi confirm xoá nhân viên
    document.querySelectorAll('.confirm-button__cancel').forEach((cancelBtn) => {
        cancelBtn.addEventListener('click',function() {
            cancelBtn.parentElement.parentElement.parentElement.style.display = "none";
        });
    });
    

    // Ấn nút đồng ý khi confirm xoá nhân viên
    $('#confirm-delete-btn-one').click(function() {
        $('#confirm-delete-one').attr('style', 'display: none');
        method = 'DELETE';
        handleEmployee(method, employeeId);
    }); 

    
    

    // Nút xoá nhiều
    $('#confirm-delete-btn-multi').click(function() {
        $('#confirm-delete-multi').attr('style', 'display: none');
        method = 'DELETEMULTI';
        for (let item of employeesDelete.values()) {
            handleEmployee(method, item);
        }
        loadData();
        toastMessage('success', 'Xoá nhân viên thành công', 5000);
        employeesDelete.clear(); 
        employeesCode.clear();
        employeesName.clear();
        $('#button-delete').attr('style', 'cursor: unset; opacity: 0.6;');
    });

    /**
     * Đặt sự kiện click vào nút xoá nhiều
     * Author: NTDUNG (22/07/2021)
     */
    function multipleDelete() {
        // Ấn nút xoá thì bật dialog confirm
        $('#button-delete').click(function() {
            var employeesDeleteHTML = '';
            if (employeesDelete.size) {
                for(let item of employeesCode.values()){
                    employeesDeleteHTML += `<li class="employees-item-delete">${item}</li>`;
                }
                $('.employees-list-delete')[0].innerHTML = employeesDeleteHTML;
                $('#confirm-delete-multi').attr('style', 'display: flex');
            }
        });
    }
    /**
     * Đặt sự kiện checkbox click
     * Author: NTDUNG (22/07/2021)
     */
    function setCheckboxEvent() {
        $('.table-employee__checkbox').change(function(e) {

            if (employeesDelete.has(e.target.getAttribute('employeeid'))) {
                employeesDelete.delete(e.target.getAttribute('employeeid'));
                employeesName.delete(e.target.getAttribute('employeename'));
                employeesCode.delete(e.target.getAttribute('employeecode'));
            } else {
                employeesDelete.add(e.target.getAttribute('employeeid'));
                employeesName.add(e.target.getAttribute('employeename'));
                employeesCode.add(e.target.getAttribute('employeecode'));
            }

            if (!employeesDelete.size) {
                $('#button-delete').attr('style', 'cursor: unset; opacity: 0.6;');
            } else { 
                $('#button-delete').attr('style', 'cursor: pointer; opacity: 1;');
            }
        });
    }


// TODO: HÀM XỬ LÝ

    /**
     * Hàm load dữ liệu employee
     * Author: NTDUNG (21/07/2021)
     */
    function loadData() {
        $.ajax({
            url: 'http://cukcuk.manhnv.net/v1/Employees',
            method: 'GET',
            async: false
        }).done(function (res) {
            renderTableEmployee(res);     
            bindEmployeeInfor();
            setCheckboxEvent();
            multipleDelete();
        }).fail(function (res) {
            toastMessage('error', 'Dữ liệu chưa tải được. Vui lòng liên hệ MISA');
        });
    }

    /**
     * Hàm bind dữ liệu vào bảng employee
     * Author: NTDUNG (21/07/2021)
     */
    var tableData;
    function renderTableEmployee(datas) {
        $('tbody')[0].innerHTML = '';
        var tbodyEmployee = $('tbody');
        tableData = datas;
        for (var i = 0; i < datas.length; i++) {
            var tableRow = `<tr data-id=${i} class="table-employee__row">
                                <td class="table-employee__check">
                                    <input employeeid="${datas[i].EmployeeId}" employeename="${datas[i].FullName}" employeecode="${datas[i].EmployeeCode}" type="checkbox" class="table-employee__checkbox"/>
                                </td>
                                <td class="table-employee__code">${resolveValue(datas[i].EmployeeCode)}</td>
                                <td class="table-employee__name">${resolveValue(datas[i].FullName)}</td>
                                <td class="table-employee__gender">${resolveValue(datas[i].GenderName)}</td>
                                <td class="table-employee__dob text-align-center">${resolveDate(datas[i].DateOfBirth, 'table')}</td>
                                <td class="table-employee__phone">${resolveValue(datas[i].PhoneNumber)}</td>
                                <td class="table-employee__email" title="${resolveValue(datas[i].Email)}">${resolveValue(datas[i].Email)}</td>
                                <td class="table-employee__position">${resolveValue(datas[i].PositionName)}</td>
                                <td class="table-employee__department">${resolveValue(datas[i].DepartmentName)}</td>
                                <td class="table-employee__salary">${resolveValue(datas[i].Salary)}</td>
                                <td class="table-employee__status">${resolveValue(datas[i].WorkStatus)}</td>
                            </tr>`;
            tbodyEmployee.append(tableRow);
        }
    }

    /**
     * Hàm bắt sự kiện click vào từng dòng dữ liệu và bind lên form chi tiết
     * Author: NTDUNG (21/07/2021)
     */
    function bindEmployeeInfor() {
        var employeeItems = document.querySelectorAll('.table-employee__row');
        employeeItems.forEach((employeeItem) => {
            employeeItem.addEventListener('click', function (e) {
                method = 'PUT';
                // SET VALUE FROM TABLE ROW TO DETAIL FORM
                var dataRow = tableData[employeeItem.getAttribute('data-id')];

                $('#employee__code')[0].value = resolveValue(dataRow.EmployeeCode);
                $('#employee__fullname')[0].value = resolveValue(dataRow.FullName);
                $('#employee__dob')[0].value = resolveDate(dataRow.DateOfBirth, 'date');
                $('#employee__gender')[0].value = resolveValue(dataRow.GenderName);
                $('#employee__idnumber')[0].value = resolveValue(dataRow.IdentifyNumber);
                $('#employee__iddate')[0].value = resolveDate(dataRow.IdentifyDate, 'date');
                $('#employee__idplace')[0].value = resolveValue(dataRow.IdentifyPlace);
                $('#employee__email')[0].value = resolveValue(dataRow.Email);
                $('#employee__phone')[0].value = resolveValue(dataRow.PhoneNumber);

                $('#employee__position')[0].innerText = resolveValue(dataRow.PositionName);
                $('#employee__position')[0].setAttribute('positionid', dataRow.PositionId);
                $('#employee__position')[0].setAttribute('positioncode', dataRow.PositionCode);

                $('#employee__department')[0].innerText = resolveValue(dataRow.DepartmentName);
                $('#employee__department')[0].setAttribute('departmentid', dataRow.DepartmentId);
                $('#employee__department')[0].setAttribute('departmentcode', dataRow.DepartmentCode);

                $('#employee__taxcode')[0].value = resolveValue(dataRow.PersonalTaxCode);
                $('#employee__basesalary')[0].value = resolveValue(dataRow.Salary);
                $('#employee__joiningdate')[0].value = resolveDate(dataRow.JoinDate);
                $('#employee__workstatus')[0].innerText = resolveValue(dataRow.WorkStatus);
                
                $('.btn-delete').attr('style', 'display: block');
                
                employeeId = dataRow.EmployeeId;
                employeeName = dataRow.FullName;
                employeeCode = dataRow.EmployeeCode;

                
                showPopup(e);
            });
        });
    }

    /**
     * Hàm xử lý khi tạo mới, xoá và sửa nhân viên
     * Author: NTDUNG (21/07/2021)
     */
    function handleEmployee(method, employeeId) {
        var employeeInfor = `{
            "EmployeeCode": "${$('#employee__code').val()}",
            "FirstName": "${getFirstName($('#employee__fullname').val())}",
            "LastName": "${getLastName($('#employee__fullname').val())}",
            "FullName": "${$('#employee__fullname').val()}",
            "Gender": 1,
            "DateOfBirth": "2021-07-20T00:00:00",
            "PhoneNumber": "${$('#employee__phone').val()}",
            "Email": "email@email.com",
            "Address": null,
            "IdentityNumber": "${$('#employee__idnumber').val()}",
            "IdentityDate": "",
            "IdentityPlace": "${$('#employee__idplace').val()}",
            "JoinDate": "",
            "MartialStatus": null,
            "EducationalBackground": null,
            "QualificationId": null,
            "DepartmentId": "",
            "PositionId": "",
            "WorkStatus": "${$('#employee__workstatus').val()}",
            "PersonalTaxCode": "${$('#employee__taxcode').val()}",
            "Salary": "${$('#employee__basesalary').val()}",
            "PositionCode": "",
            "PositionName": "${$('#employee__position').val()}",
            "DepartmentCode": "",
            "DepartmentName": "${$('#employee__department').val()}",
            "QualificationName": null,
            "GenderName": "${$('#employee__gender').val()}",
            "EducationalBackgroundName": null,
            "MartialStatusName": null,
            "CreatedDate": "",
            "CreatedBy": "NTDUNG",
            "ModifiedDate": null,
            "ModifiedBy": null
        }`;

        switch (method) {
            case 'POST':
                $.ajax({
                    url: 'http://cukcuk.manhnv.net/v1/Employees',
                    type: 'POST',
                    data: employeeInfor,
                    contentType: 'application/json',
                    datatype: 'json'
                }).done(function(res) {
                    toastMessage('success', 'Thêm mới thành công', 5000);
                    loadData();
                }).fail(function(res) {
                    toastMessage('error', 'Tạo mới thông tin thất bại. Vui lòng liên hệ MISA');
                });
                break;
            case 'PUT':
                $.ajax({
                    url: `http://cukcuk.manhnv.net/v1/Employees/${employeeId}`,
                    type: 'PUT',
                    data: employeeInfor,
                    contentType: 'application/json',
                    datatype: 'json'
                }).done(function(res) {
                    toastMessage('success', 'Chỉnh sửa thành công', 5000);
                    loadData();
                }).fail(function(res) {
                    toastMessage('error', 'Chỉnh sửa thông tin thất bại. Vui lòng liên hệ MISA');
                }); 
                break;
            case 'DELETE':
                console.log('delete', employeeId);
                $.ajax({
                    url: `http://cukcuk.manhnv.net/v1/Employees/${employeeId}`,
                    type: 'DELETE', 
                }).done(function(res) {
                    toastMessage('success', 'Xoá thành công', 5000);
                    loadData();
                }).fail(function(res) {
                    toastMessage('error', 'Xoá thông tin thất bại. Vui lòng liên hệ MISA');
                });
                break;
            case 'DELETEMULTI':
                console.log('delete multi', employeeId);
                $.ajax({
                    url: `http://cukcuk.manhnv.net/v1/Employees/${employeeId}`,
                    type: 'DELETE',
                    async: false
                }).done(function(res) { 

                }).fail(function(res) {
                    toastMessage('error', 'Xoá thông tin thất bại. Vui lòng liên hệ MISA');
                });
                break;
            default:
                console.log('do nothing');
                break;
        }

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
            $('#employee__code').val(res);
            $('#employee__code').focus();
        }).fail(function (res) {
            toastMessage('warn', 'Không thể thấy mã nhân viên mới. Vui lòng liên hệ MISA');
        });
    }

    /**
     * Hàm hiện form chi tiết nhân viên (chỉnh sửa được)
     * Author: NTDUNG (21/07/2021)
     * @param {event} e 
     */
    function showPopup(e) {
        if (!e.target.classList.contains('table-employee__checkbox')) {
            $('.popup-overlay--infor')[0].style.display = "block";
            $('.popup-overlay--infor')[0].style.opacity = 1;
            $(".popup-infor__input")[0].focus();
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

    /**
     * Hàm xử lý ngày tháng người dùng nhập vào (hoặc ngày tháng tự lấy lúc nhập liệu để chuyển về ngày tháng chuẩn JSON)
     * Author: NTDUNG (21/07/2021)
     * @param {string} date
     * @returns string
     */
    function convertDateJSON(date) {
        // console.log(date);
        return date;
    }
    /**
     * Lấy ra họ từ tên đầy đủ
     * Author: NTDUNG (21/07/2021)
     * @param {string} fullname 
     * @return string
     */
    function getFirstName(fullname) {
        return fullname.substring(0, fullname.indexOf(' '));
    }   

    /**
     * Lấy ra tên đệm và tên từ tên đầy đủ
     * Author: NTDUNG (21/07/2021)
     * @param {string} fullname 
     */
    function getLastName(fullname) {
        return fullname.substring(fullname.indexOf(' ') + 1);
    }
