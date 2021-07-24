//#region [Dữ liệu được fix cứng]
var dropdownDataRestaurant = [
    "Nhà hàng Biển Đông",
    "Nhà hàng Biển Tây",
    "Nhà hàng Biển Bắc",
    "Nhà hàng Biển Nam",
];

var dropdownDataWorkStatus = [
    "Đang đào tạo",
    "Đang thực tập",
    "Đang làm việc",
    "Tạm nghỉ",
];

var comboboxDataGender = [
    'Nam',
    'Nữ',
    'Không xác định'
];
//#endregion


$(document).ready(function () {
    //#region [Chương trình chính]
    new EmployeePage('EmployeePage');
    setTimeout(function() {
        toastMessage('info', 'Đã có bản cập nhật mới. Hãy cập nhật để trải niệm', 5000);
    }, 10000);
    //#endregion

    //#region [Đổ dữ liệu vào các combobox]
    new Combobox($('#combobox-gender')[0], '', 'FIX', '', comboboxDataGender);
    //#endregion
    //#region [Đổ dữ liệu vào các dropdown]
    var filterDepartment = new Dropdown($('#filter-department')[0], 'Department', 'FILTER', 'http://cukcuk.manhnv.net/api/Department');
    var filterPosition = new Dropdown($('#filter-position')[0], 'Position', 'FILTER', 'http://cukcuk.manhnv.net/v1/Positions');
    var dropdownRestaurant = new Dropdown($('#dropdown-restaurant')[0], '', 'FIX', '', dropdownDataRestaurant);
    var dropdownDepartment = new Dropdown($('#dropdown-department')[0], 'Department', 'NORMAL', 'http://cukcuk.manhnv.net/api/Department');
    var dropdownPosition = new Dropdown($('#dropdown-position')[0], 'Position', 'NORMAL', 'http://cukcuk.manhnv.net/v1/Positions');
    //#endregion
});

class EmployeePage {
    //#region [Các thuộc tính của employee]
    PageTitle = null;
    TableData;
    method;
    employeeId;
    employeeName;
    employeeCode;
    employeesDelete = new Set();
    employeesName = new Set();
    employeesCode = new Set();
    //#endregion

    //#region [Hàm khởi tạo]
    constructor (pageTitle) {
        // Tiêu đề trang:
        this.PageTitle = pageTitle;
        // Load dữ liệu:
        this.loadData();
        // Khởi tạo các sự kiện cho thành phần
        this.initEvents();
    }
    //#endregion

    //#region [Các phương thức]

    /**
     * Hàm khởi tạo các sự kiện
     * 
     */
    initEvents() {
        // 1. Khi focus vào input tìm kiếm thì border xung quanh 
        document.querySelector('.table-search__input').addEventListener('focus', function() {
            document.querySelector('.table-search').classList.add('focus-dropdown');
        });

        // 2. Khi blur thì trở lại border bình thường
        document.querySelector('.table-search__input').addEventListener('blur', function() {
            document.querySelector('.table-search').classList.remove('focus-dropdown');
        });

        // 3. Khi bật nhấn nút tạo mới thì bật form tạo mới và lấy mã nhân viên mới
        $('.button-addemployee')[0].onclick = () => {
            $('.popup-wrapper').show();
            $('.popup-body input').val('');
            $('#employee__position').text('Chọn vị trí');
            $('#employee__department').text('Chọn phòng ban');
            $('#employee__workstatus').text('Chọn trạng thái');
            this.method = 'POST';
            $('.btn-delete').attr('style', 'display: none;');
            this.getNewEmployeeId();
        }

        // 4. Khi nhấn vào nút tạo mới (Lưu) thì gọi đến tạo mới hoặc chỉnh sửa
        $('#popup-btn-save--infor').click(() => {
            $('.popup-wrapper').hide();
            if (this.method == 'POST') {
                this.add();
            } else if(this.method == 'PUT') {
                this.update();
            } 
        });

        $('.popup-btn-cancel').click(() => {
            $('.popup-wrapper').hide();
        });

        // 7. Ấn nút Refresh thì load lại dữ liệu
        $('.refresh')[0].onclick = () => {
            this.loadData();
            toastMessage('success', 'Tải dữ liệu thành công', 5000);
            showPopup('error', 'Bạn đã gặp lỗi rồi man', 'Lỗi to lắm fix đi', 'Huỷ');
        } 

        // 8. Nhấn nút xoá nhân viên
        $('.btn-delete').click(() => {
            this.hidePopup();
            $('#confirm-delete-one').attr('style', 'display: flex');
            $('.employee-infor-delete')[0].innerText = `${this.employeeName} - ${this.employeeCode}`;
        }); 

        // 9. Ấn nút x thì ẩn form đi
        $('.popup-header__cancel').click(() => {
            this.hidePopup();
        });

        // 10. Ấn nút đồng ý khi confirm xoá nhân viên
        $('#confirm-delete-btn-one').click(() => {
            $('#confirm-delete-one').attr('style', 'display: none');
            this.delete();
        }); 

        // 11. Nút xoá nhiều
        $('#confirm-delete-btn-multi').click(() => {
            $('#confirm-delete-multi').attr('style', 'display: none'); 
            this.deleteMulti();  
            $('#button-delete').removeClass('button-enable');
        }); 
    }

    terminatorEvents() {        
        // 13. Sự kiện khi checkbox thay đổi
        $('.table-employee__checkbox').change((e) => {
            if (this.employeesDelete.has(e.target.getAttribute('employeeid'))) {
                this.employeesDelete.delete(e.target.getAttribute('employeeid'));
                this.employeesName.delete(e.target.getAttribute('employeename'));
                this.employeesCode.delete(e.target.getAttribute('employeecode'));
            } else {
                this.employeesDelete.add(e.target.getAttribute('employeeid'));
                this.employeesName.add(e.target.getAttribute('employeename'));
                this.employeesCode.add(e.target.getAttribute('employeecode'));
            }

            if (!this.employeesDelete.size) {
                $('#button-delete').removeClass('button-enable');
            } else {
                $('#button-delete').addClass('button-enable');
            }
        });

        // 12. Ấn nút xoá thì bật dialog confirm
        $('#button-delete').click(() => {
            var employeesDeleteHTML = '';
            if (this.employeesDelete.size) {
                for(let item of this.employeesCode.values()){
                    employeesDeleteHTML += `<li class="employees-item-delete">${item}</li>`;
                }
                $('.employees-list-delete')[0].innerHTML = employeesDeleteHTML;
                $('#confirm-delete-multi').attr('style', 'display: flex');
            }
        });
    }
        

    /**
     * Load dữ liệu
     * Author: NTDUNG (22/07/2021)
     */
    loadData() {
        try {
            $.ajax({
                url: 'http://cukcuk.manhnv.net/v1/Employees',
                method: 'GET',
            }).done((res) => {
                $('tbody')[0].innerHTML = '';
                var tbodyEmployee = $('tbody');
                this.TableData = res;
                for (var i = 0; i < res.length; i++) {
                    var tableRow = `<tr data-id=${i} class="table-employee__row">
                                        <td class="table-employee__check">
                                            <input employeeid="${res[i].EmployeeId}" employeename="${res[i].FullName}" employeecode="${res[i].EmployeeCode}" type="checkbox" class="table-employee__checkbox"/>
                                        </td>
                                        <td class="table-employee__code">${this.resolveValue(res[i].EmployeeCode)}</td>
                                        <td class="table-employee__name">${this.resolveValue(res[i].FullName)}</td>
                                        <td class="table-employee__gender">${this.resolveValue(res[i].GenderName)}</td>
                                        <td class="table-employee__dob text-align-center">${this.resolveDate(res[i].DateOfBirth, 'table')}</td>
                                        <td class="table-employee__phone">${this.resolveValue(res[i].PhoneNumber)}</td>
                                        <td class="table-employee__email" title="${this.resolveValue(res[i].Email)}">${this.resolveValue(res[i].Email)}</td>
                                        <td class="table-employee__position">${this.resolveValue(res[i].PositionName)}</td>
                                        <td class="table-employee__department">${this.resolveValue(res[i].DepartmentName)}</td>
                                        <td class="table-employee__salary">${this.resolveValue(res[i].Salary)}</td>
                                        <td class="table-employee__status">${this.resolveValue(res[i].WorkStatus)}</td>
                                    </tr>`;
                    tbodyEmployee.append(tableRow);
                } 
                this.bindEmployeeInfor();
                this.terminatorEvents();
            }).fail(function (res) {
                toastMessage('error', 'Dữ liệu chưa tải được. Vui lòng liên hệ MISA');
            });
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Thêm mới dữ liệu
     * Author: NTDUNG (22/07/2021)
     */
    add() {
        try {
            this.handleEmployee('POST', this.employeeId);
        } catch (error) {
            console.log(error);
        }
    }
   
    /**
     * Chỉnh sửa dữ liệu
     * Author: NTDUNG (22/07/2021)
     */
    update() {
        try {
            this.handleEmployee('PUT', this.employeeId);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Xoá dữ liệu
     * Author: NTDUNG (22/07/2021)
     */
    delete() {
        try {
            this.handleEmployee('DELETE', this.employeeId);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Xoá nhiều bản ghi 
     * Author: NTDUNG (23/07/2021)
     */

    deleteMulti() {
        try {
            for (let item of this.employeesDelete.values()) {
                this.handleEmployee('DELETEMULTI', item);
            }
            this.loadData();
            toastMessage('success', 'Xoá nhân viên thành công', 5000);
            this.employeesDelete.clear(); 
            this.employeesCode.clear();
            this.employeesName.clear();
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * Hàm bắt sự kiện click vào từng dòng dữ liệu và bind lên form chi tiết
     * Author: NTDUNG (21/07/2021)
     */
    bindEmployeeInfor() {
        $('.table-employee__row').each((index, employeeItem) => {
            employeeItem.addEventListener('click', (e) => {
                this.method = 'PUT';
                var dataRow = this.TableData[employeeItem.getAttribute('data-id')];

                $('#employee__code').val(this.resolveValue(dataRow.EmployeeCode));
                $('#employee__fullname').val(this.resolveValue(dataRow.FullName));
                $('#employee__dob').val(this.resolveDate(dataRow.DateOfBirth, 'date'));
                $('#employee__gender').val(this.resolveValue(dataRow.GenderName));
                $('#employee__idnumber').val(this.resolveValue(dataRow.IdentifyNumber));
                $('#employee__iddate').val(this.resolveDate(dataRow.IdentifyDate, 'date'));
                $('#employee__idplace').val(this.resolveValue(dataRow.IdentifyPlace));
                $('#employee__email').val(this.resolveValue(dataRow.Email));
                $('#employee__phone').val(this.resolveValue(dataRow.PhoneNumber));

                $('#employee__position').text(this.resolveValue(dataRow.PositionName));
                $('#employee__position').attr('positionid', dataRow.PositionId);
                $('#employee__position').attr('positioncode', dataRow.PositionCode);

                $('#employee__department').text(this.resolveValue(dataRow.DepartmentName));
                $('#employee__department').attr('departmentid', dataRow.DepartmentId);
                $('#employee__department').attr('departmentcode', dataRow.DepartmentCode);

                $('#employee__taxcode').val(this.resolveValue(dataRow.PersonalTaxCode));
                $('#employee__basesalary').val(this.resolveValue(dataRow.Salary));
                $('#employee__joiningdate').val(this.resolveDate(dataRow.JoinDate));
                $('#employee__workstatus').val(this.resolveValue(dataRow.WorkStatus));
                
                $('#employee__gender').attr('genderid', dataRow.Gender);
                $('.btn-delete').attr('style', 'display: block');
                
                this.employeeId = dataRow.EmployeeId;
                this.employeeName = dataRow.FullName;
                this.employeeCode = dataRow.EmployeeCode;
                
                this.showPopup(e);
            });
        });
    }


    /**
     * Hàm xử lý khi tạo mới, xoá và sửa nhân viên
     * Author: NTDUNG (21/07/2021)
     */
    handleEmployee(method, employeeId) {
        console.log($('#employee__gender').attr('genderid'));
        // var employeeInfor = `{
        //     "EmployeeCode": "${$('#employee__code').val()}",
        //     "FirstName": "${this.getFirstName($('#employee__fullname').val())}",
        //     "LastName": "${this.getLastName($('#employee__fullname').val())}",
        //     "FullName": "${$('#employee__fullname').val()}",
        //     "Gender": ${parseInt($('#employee__gender').attr('genderid'))},
        //     "DateOfBirth": "${$('#employee__dob').val()}",
        //     "PhoneNumber": "${$('#employee__phone').val()}",
        //     "Email": "${$('#employee__email').val()}",
        //     "Address": null,
        //     "IdentityNumber": "${$('#employee__idnumber').val()}",
        //     "IdentityDate": "${$('#employee__iddate').val()}",
        //     "IdentityPlace": "${$('#employee__idplace').val()}",
        //     "JoinDate": "${$('#employee__joiningdate').val()}",
        //     "MartialStatus": null,
        //     "EducationalBackground": null,
        //     "QualificationId": null,
        //     "DepartmentId": "${$('#employee__department').attr('departmentid')}",
        //     "PositionId": "${$('#employee__position').attr('positionid')}",
        //     "WorkStatus": "${$('#employee__workstatus').val()}",
        //     "PersonalTaxCode": "${$('#employee__taxcode').val()}",
        //     "Salary": "${$('#employee__basesalary').val()}",
        //     "PositionCode": "${$('#employee__position').attr('positioncode')}",
        //     "PositionName": "${$('#employee__position').text()}",
        //     "DepartmentCode": "${$('#employee__department').attr('departmentcode')}",
        //     "DepartmentName": "${$('#employee__department').text()}",
        //     "QualificationName": null,
        //     "GenderName": "${$('#employee__gender').val()}",
        //     "EducationalBackgroundName": null,
        //     "MartialStatusName": null,
        //     "CreatedDate": "",
        //     "CreatedBy": "NTDUNG",
        //     "ModifiedDate": null,
        //     "ModifiedBy": "NTDUNG"
        // }`;
        var employeeInfor = `{
            "EmployeeCode": "${$('#employee__code').val()}",
            "FirstName": "${this.getFirstName($('#employee__fullname').val())}",
            "LastName": "${this.getLastName($('#employee__fullname').val())}",
            "FullName": "${$('#employee__fullname').val()}",
            "Gender": 1,
            "DateOfBirth": "",
            "PhoneNumber": "${$('#employee__phone').val()}",
            "Email": "${$('#employee__email').val()}",
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
            "WorkStatus": "",
            "PersonalTaxCode": "${$('#employee__taxcode').val()}",
            "Salary": "${$('#employee__basesalary').val()}",
            "PositionCode": "",
            "PositionName": "",
            "DepartmentCode": "",
            "DepartmentName": "",
            "QualificationName": null,
            "GenderName": "${$('#employee__gender').val()}",
            "EducationalBackgroundName": null,
            "MartialStatusName": null,
            "CreatedDate": "",
            "CreatedBy": "NTDUNG",
            "ModifiedDate": null,
            "ModifiedBy": "NTDUNG"
        }`;
        console.log(employeeInfor);

        switch (method) {
            case 'POST':
                $.ajax({
                    url: 'http://cukcuk.manhnv.net/v1/Employees',
                    type: 'POST',
                    data: employeeInfor,
                    contentType: 'application/json',
                    datatype: 'json'
                }).done((res) => {
                    toastMessage('success', 'Thêm mới thành công', 5000);
                    this.loadData();
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
                }).done((res) => {
                    toastMessage('success', 'Chỉnh sửa thành công', 5000);
                    this.loadData();
                }).fail(function(res) {
                    toastMessage('error', 'Chỉnh sửa thông tin thất bại. Vui lòng liên hệ MISA');
                }); 
                break;
            case 'DELETE':
                $.ajax({
                    url: `http://cukcuk.manhnv.net/v1/Employees/${employeeId}`,
                    type: 'DELETE', 
                }).done((res) => {
                    toastMessage('success', 'Xoá thành công', 5000);
                    this.loadData();
                }).fail(function(res) {
                    toastMessage('error', 'Xoá thông tin thất bại. Vui lòng liên hệ MISA');
                });
                break;
            case 'DELETEMULTI':
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
    getNewEmployeeId() {
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
    showPopup(e) {
        if (!e.target.classList.contains('table-employee__checkbox')) {
            $(".popup-wrapper")[0].style.display = 'block';
            $(".popup-infor__input")[0].focus();
        }
    }

    /**
     * Hàm ẩn form
     * Author: NTDUNG (21/07/2021)
     */
    hidePopup() {
        $('.popup-wrapper').hide();
    }

    /**
     * Hàm xử lý dữ liệu ngày tháng
     * @param {date} date 
     * @param {string} type
     * @returns string
     */
    resolveDate(date, type) {
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
    resolveValue(value) {
        return value == null ? '' : value;
    }

    /**
     * Hàm xử lý ngày tháng người dùng nhập vào (hoặc ngày tháng tự lấy lúc nhập liệu để chuyển về ngày tháng chuẩn JSON)
     * Author: NTDUNG (21/07/2021)
     * @param {string} date
     * @returns string
     */
    convertDateJSON(date) {
        // console.log(date);
        return date;
    }
    /**
     * Lấy ra họ từ tên đầy đủ
     * Author: NTDUNG (21/07/2021)
     * @param {string} fullname 
     * @return string
     */
    getFirstName(fullname) {
        return fullname.substring(0, fullname.indexOf(' '));
    }   

    /**
     * Lấy ra tên đệm và tên từ tên đầy đủ
     * Author: NTDUNG (21/07/2021)
     * @param {string} fullname 
     */
    getLastName(fullname) {
        return fullname.substring(fullname.indexOf(' ') + 1);
    }
    //#endregion
}