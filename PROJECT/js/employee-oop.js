//#region [Dữ liệu được fix cứng]
var dropdownDataRestaurant = [
    "Nhà hàng Biển Đông",
    "Nhà hàng Biển Tây",
    "Nhà hàng Biển Bắc",
    "Nhà hàng Biển Nam",
];

var dropdownDataWorkStatus = [
    0, 1, 2, 3, 4 
];

var comboboxDataGender = [
    'Nữ',
    'Nam',
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

});

class EmployeePage {
    //#region [Các thuộc tính của employee]
    popupShow = false;
    PageTitle = null;
    TableData;
    method;
    employeeId;
    employeeName;
    employeeCode;
    employeesDelete = new Set();
    //#endregion

    //#region [Hàm khởi tạo]
    constructor (pageTitle) {
        // Tiêu đề trang:
        this.PageTitle = pageTitle;
        // Load dữ liệu:
        this.loadData();
        // Khởi tạo các sự kiện cho thành phần
        this.initEvents();

        // Đổ dữ liệu vào dropdown
        this.filterDepartment = new Dropdown($('#filter-department')[0], 'Department', 'FILTER', 'http://cukcuk.manhnv.net/api/Department');
        this.filterPosition = new Dropdown($('#filter-position')[0], 'Position', 'FILTER', 'http://cukcuk.manhnv.net/v1/Positions');
        this.dropdownRestaurant = new Dropdown($('#dropdown-restaurant')[0], '', 'FIX', '', dropdownDataRestaurant);
        this.dropdownPosition = new Dropdown($('#dropdown-position')[0], 'Position', 'NORMAL', 'http://cukcuk.manhnv.net/v1/Positions');
        this.dropdownWorkstatus = new Dropdown($('#dropdown-workstatus')[0], 'WorkStatus', 'FIX', '', dropdownDataWorkStatus);
        this.dropdownDepartment = new Dropdown($('#dropdown-department')[0], 'Department', 'NORMAL', 'http://cukcuk.manhnv.net/api/Department');

        // Đổ dữ liệu vào combobox
        this.comboboxGender = new Combobox($('#combobox-gender')[0], '', 'FIX', '', comboboxDataGender);
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

        // 5. Ấn vào cancel để ẩn popup
        $('.popup-btn-cancel').click(() => {
            // Ẩn form đi
            $('.popup-wrapper').hide();
            // Hiên popup thông báo
            showPopup('warn', 'Đóng Form thông tin chung', 'Bạn có chắc muốn đóng Form và huỷ việc nhập thông tin', 'Tiếp tục nhập');
            // khi click tiếp tục thì sẽ hiện form lại
            this.setEvents();
            $('#popup-btn-continue-lib').click(() => {
                $('.popup-wrapper').show();
            });
        });

        // 6. Ấn nút x thì ẩn form đi
        $('.popup-header__cancel').click(() => {
            // Ẩn form đi
            $('.popup-wrapper').hide();
            // Hiên popup thông báo
            showPopup('warn', 'Đóng Form thông tin chung', 'Bạn có chắc muốn đóng Form và huỷ việc nhập thông tin', 'Tiếp tục nhập');
            // khi click tiếp tục thì sẽ hiện form lại
            this.setEvents();
            $('#popup-btn-continue-lib').click(() => {
                $('.popup-wrapper').show();
            });
        });

        // 7. Ấn nút Refresh thì load lại dữ liệu
        $('.refresh')[0].onclick = () => {
            this.loadData();
            toastMessage('success', 'Tải dữ liệu thành công', 5000);
            showPopup('info','Load dữ liệu thành công', 'Dữ liệu của bạn đã được hiển thị', 'Huỷ');
        } 

        // 8. Nhấn nút xoá nhân viên
        $('.btn-delete').click(() => {
            // Ẩn form đi
            this.hidePopup();
            // Hiện popup cảnh báo
            showPopup('error', 'Xác nhận xoá thông tin', `Bạn có chắc muốn xoá nhân viên <b>${this.employeeName} - ${this.employeeCode}</b>`, 'Tiếp tục xoá');
            // Clear sự kiện của nút tiếp tục và đặt sự kiện mới
            this.setEvents();
            $('#popup-btn-continue-lib').click(() => {
                this.delete();
                $('.popup-wrapper').hide();
            });
        }); 

        // 9. Nhấn nút xoá nhiều
        $('#button-delete').click(() => {
            showPopup('error', 'Xác nhận xoá thông tin', 'Bạn có chắc muộn xoá những thông tin được check này không?', 'Tiếp tục xoá');
            this.setEvents();
            $('#popup-btn-continue-lib').click(() => {
                this.deleteMulti();
            });
        });   
    }

    /**
     * Khởi tạo những sự kiện được cập nhật sau khi dữ liệu thay đổi
     * Author: NTDUNG (23/07/2021)
     */
    terminatorEvents() {        
        // 13. Sự kiện khi checkbox thay đổi
        $('.table-employee__checkbox').change((e) => {
            if (this.employeesDelete.has(e.target.getAttribute('employeeid'))) {
                this.employeesDelete.delete(e.target.getAttribute('employeeid'));
            } else {
                this.employeesDelete.add(e.target.getAttribute('employeeid'));
            }
            console.log(this.employeesDelete);
            if (!this.employeesDelete.size) {
                $('#button-delete').removeClass('button-enable');
            } else {
                $('#button-delete').addClass('button-enable');
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
                    var tableRow = $(`<tr data-id=${i} class="table-employee__row"></tr>`);
                    $('.table-employee__header').each((index, item) => {
                        var fieldName = item.getAttribute('fieldName');
                        var tableData = $(`<td fieldName=${fieldName}></td>`);
                        if (fieldName == undefined) {
                            tableData.append(`<input employeeid=${res[i].EmployeeId} type="checkbox" class="table-employee__checkbox"/>`);
                        } else {
                            switch (fieldName) {
                                case 'DateOfBirth':
                                    tableData.text(this.resolveDate(res[i][fieldName], 'TABLE'))
                                    break;
                                default:  
                                    tableData.text(res[i][fieldName]);
                            }
                        }
                        tableRow.append(tableData);
                    });
                    tbodyEmployee.append(tableRow) ;
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

                $('#employee__dob').val(this.resolveDate(dataRow.DateOfBirth, 'INPUT'));
                $('#employee__iddate').val(this.resolveDate(dataRow.IdentityDate, 'INPUT'));
                $('#employee__joiningdate').val(this.resolveDate(dataRow.JoinDate, 'INPUT'));

                $('#employee__code').val(this.resolveValue(dataRow.EmployeeCode));
                $('#employee__fullname').val(this.resolveValue(dataRow.FullName));
                $('#employee__idnumber').val(this.resolveValue(dataRow.IdentityNumber));
                $('#employee__idplace').val(this.resolveValue(dataRow.IdentityPlace));
                $('#employee__email').val(this.resolveValue(dataRow.Email));
                $('#employee__phone').val(this.resolveValue(dataRow.PhoneNumber));
                $('#employee__taxcode').val(this.resolveValue(dataRow.PersonalTaxCode));
                $('#employee__basesalary').val(this.resolveValue(dataRow.Salary));
                
                // Bind dropdown and combobox
                this.resolveDropdownAPI(this.dropdownDepartment, dataRow);
                
                this.resolveDropdownAPI(this.dropdownPosition, dataRow);
                
                this.resolveDropdown(this.dropdownWorkstatus, dataRow);

                // GENDER 
                var checkGender = false;
                this.comboboxGender.comboboxData.forEach((data, index) => {

                    if (data == dataRow.GenderName) {
                        this.comboboxGender.currentValue = index;
                        this.comboboxGender.renderDropdown();
                        checkGender = true;
                    } 
                });
                if (checkGender == false) {
                    this.comboboxGender.currentValue = this.comboboxGender.comboboxData.length;
                    this.comboboxGender.renderDropdown();
                }
                console.log(dataRow)

                $('.btn-delete').attr('style', 'display: block');

                // Bind các trường dữ liệu khác vào popup infor
                $('#employee__department').attr('departmentid', this.resolveValue(dataRow.DepartmentId));
                $('#employee__department').attr('departmentcode', this.resolveValue(dataRow.DepartmentCode));
                $('#employee__position').attr('positionid', this.resolveValue(dataRow.PositionId));
                $('#employee__position').attr('positioncode', this.resolveValue(dataRow.PositionCode));
                $('.popup-infor').attr('createddate', dataRow.CreatedDate);
                $('.popup-infor').attr('createby', dataRow.CreateBy);
                $('.popup-infor').attr('modifieddate', dataRow.ModifiedDate);
                $('.popup-infor').attr('modifiedby', dataRow.ModifiedBy);
                
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
        var employeeInfor = `{
            "EmployeeCode": "${$('#employee__code').val()}",
            "FirstName": "${this.getFirstName($('#employee__fullname').val())}",
            "LastName": "${this.getLastName($('#employee__fullname').val())}",
            "FullName": "${$('#employee__fullname').val()}",
            "Gender": ${this.validateNum($('#employee__gender').attr('genderid'))},
            "DateOfBirth": "${this.validateDate($('#employee__dob').val())}",
            "PhoneNumber": "${$('#employee__phone').val()}",
            "Email": "${$('#employee__email').val()}",
            "Address": null,
            "IdentityNumber": "${$('#employee__idnumber').val()}",
            "IdentityDate": "${this.validateDate($('#employee__iddate').val())}",
            "IdentityPlace": "${$('#employee__idplace').val()}",
            "JoinDate": "${this.validateDate($('#employee__joiningdate').val())}",
            "MartialStatus": null,
            "EducationalBackground": null,
            "QualificationId": null,
            "DepartmentId": "${$('#employee__department').attr('departmentid')}",
            "PositionId": "${$('#employee__position').attr('positionid')}",
            "WorkStatus": ${this.validateNum($('#employee__workstatus').text())},
            "PersonalTaxCode": "${$('#employee__taxcode').val()}",
            "Salary": ${this.validateNum($('#employee__basesalary').val())},
            "PositionCode": "${$('#employee__position').attr('positioncode')}",
            "PositionName": "${$('#employee__position').text()}",
            "DepartmentCode": "${$('#employee__department').attr('departmentcode')}",
            "DepartmentName": "${$('#employee__department').text()}",
            "QualificationName": null,
            "GenderName": "${$('#employee__gender').val()}",
            "EducationalBackgroundName": null,
            "MartialStatusName": null,
            "CreatedDate": "${this.modifiedBy(method).createdDate}",
            "CreatedBy": "${this.modifiedBy(method).createdBy}",
            "ModifiedDate": "${this.modifiedBy(method).modifiedDate}",
            "ModifiedBy": "${this.modifiedBy(method).modifiedBy}"
        }`;
        // var employeeInfor = `{
        //     "EmployeeCode": "${$('#employee__code').val()}",
        //     "FirstName": "${this.getFirstName($('#employee__fullname').val())}",
        //     "LastName": "${this.getLastName($('#employee__fullname').val())}",
        //     "FullName": "${$('#employee__fullname').val()}",
        //     "Gender": 1,
        //     "DateOfBirth": "",
        //     "PhoneNumber": "${$('#employee__phone').val()}",
        //     "Email": "${$('#employee__email').val()}",
        //     "Address": null,
        //     "IdentityNumber": "${$('#employee__idnumber').val()}",
        //     "IdentityDate": "",
        //     "IdentityPlace": "${$('#employee__idplace').val()}",
        //     "JoinDate": "",
        //     "MartialStatus": null,
        //     "EducationalBackground": null,
        //     "QualificationId": null,
        //     "DepartmentId": "",
        //     "PositionId": "",
        //     "WorkStatus": "",
        //     "PersonalTaxCode": "${$('#employee__taxcode').val()}",
        //     "Salary": "${$('#employee__basesalary').val()}",
        //     "PositionCode": "",
        //     "PositionName": "",
        //     "DepartmentCode": "",
        //     "DepartmentName": "",
        //     "QualificationName": null,
        //     "GenderName": "${$('#employee__gender').val()}",
        //     "EducationalBackgroundName": null,
        //     "MartialStatusName": null,
        //     "CreatedDate": "",
        //     "CreatedBy": "NTDUNG",
        //     "ModifiedDate": null,
        //     "ModifiedBy": "NTDUNG"
        // }`;

        console.log(JSON.parse(employeeInfor));

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
     * Author: NTDUNG (24/07/2021)
     * @param {date} dateValue
     * @returns string
     */
    resolveDate(dateValue, type) {
        var date = new Date(dateValue);
        var day = date.getDate();
        day = day < 10 ? '0' + day : day;
        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var year = date.getFullYear(); 

        if (Number.isNaN(date)) {
            return '';
        } else {
            if (type == 'TABLE')
                return `${day}/${month}/${year}`;
            else if (type == 'INPUT')  
                return `${year}-${month}-${day}`;
        }
    }

    /**
     * Hàm xử lý các dữ liệu lấy về (khác ngày tháng)  
     * Author: NTDUNG (24/07/2021)
     * @param {number, string} value 
     * @returns number, string
     */
    resolveValue(value) {
        return value == null ? '' : value;
    }

    /**
     * Validate dữ liệu chuyển sang số
     * Author: NTDUNG (24/07/2021)
     * @param {number, string} value
     */
    validateNum(value) { 
        return (value == '' ) || (value == undefined) ? null : parseInt(value);
    }


    /**
     * Hàm xử lý ngày tháng người dùng nhập vào (hoặc ngày tháng tự lấy lúc nhập liệu để chuyển về ngày tháng chuẩn JSON)
     * Author: NTDUNG (21/07/2021)
     * @param {string} date
     * @returns string
     */
    validateDate(date) {
        // Nếu ngày đã là JSON rồi thì không cần format
        if (date.length > 10) {
            return date;
        }
        return date == "" ? "" : date + 'T00:00:00';
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

    /**
     * Khởi tạo lại event cho các popup
     * Author: NTDUNG (24/07/2021)
     */
    setEvents() {
        $('#popup-btn-continue-lib').unbind();
        $('#popup-btn-cancel-lib').unbind();
        $('#popup-btn-continue-lib').click(function() {
            $('.popup-lib').hide();
            $('.popup-lib').removeClass('popup--error-lib', 'popup--warn-lib', 'popup--info-lib');
        });
        $('#popup-btn-cancel-lib').click(function() {
            $('.popup-lib').hide();
            $('.popup-lib').removeClass('popup--error-lib', 'popup--warn-lib', 'popup--info-lib');
        });
        $('.popup-overlay-lib').click(function() {
            $('.popup-lib').hide();
        });
    }

    /**
     * Validate form
     * Author: NTDUNG (24/07/2021)
     */
    validateForm() {

    }

    /**
     * Get new date JSON
     * Author: NTDUNG (24/07/2021)
     */
    getNewDateJSON() {
        var date = new Date();
        var day = date.getDate();
        day = day < 10 ? '0' + day : day;
        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var year = date.getFullYear();
        var hour = date.getHours();
        var min = date.getMinutes();
        var second = date.getSeconds();
        return `${year}-${month}-${day}T${hour}:${min}:${second}`;
    }

    /**
     * Hàm xử lý thông tin chỉnh sửa và tạo mới
     * Author: NTDUNG (26/07/2021)
     * @param {method} method 
     * @returns object
     */
    modifiedBy(method) {
        var result = {
            createdBy: '',
            createdDate: '',
            modifiedBy: '',
            modifiedDate: ''
        }
        if (method == 'POST') {
            result.modifiedBy = "";
            result.modifiedDate = "";
            result.createdBy = 'NTDUNG';
            result.createdDate = this.getNewDateJSON();
        } else if (method == 'PUT') {
            result.createdBy = $('.popup-infor').attr('createdby');
            result.createdDate = $('.popup-infor').attr('createddate');
            result.modifiedBy = 'NTDUNG';
            result.modifiedDate = this.getNewDateJSON();
            result.createdBy = result.createdBy == undefined ? '' : result.createdBy;
        } 
        return result;
    }

    /**
     * Hàm xử lý dữ liệu dropdown (được đổ dữ liệu từ API) khi click vào từng dòng
     * Author: NTDUNG (26/07/2021)
     * @param {element} dropdown 
     * @param {array} dataRow 
     */
    resolveDropdownAPI(dropdown, dataRow) {
        var findValue = false;
        var dropdownName = dropdown.dropdown + 'Name';
        dropdown.dropdownData.forEach((data, index) => {
            if (data[dropdownName] == dataRow[dropdownName]) {
                $(`#employee__${dropdown.dropdown.toLowerCase()}`).attr('currVal', index);
                dropdown.renderDropdownAPI();
                findValue = true;
            }
        });
        if (findValue == false) {
            $(`#employee__${dropdown.dropdown.toLowerCase()}`).attr('currVal', dropdown.dropdownData.length);
            dropdown.renderDropdownAPI();
        }
    }

    /**
     * Hàm xử lý dữ liệu dropdown (được đổ dữ liệu Fix cứng) khi click vào từng dòng
     * Author: NTDUNG (26/07/2021)
     * @param {element} dropdown 
     * @param {array} dataRow 
     */
    resolveDropdown(dropdown, dataRow) {
        var findValue = false;
        var dropdownName = dropdown.dropdown;
        dropdown.dropdownData.forEach((data, index) => {
            if (data == dataRow[dropdownName]) {
                $(`#employee__${dropdown.dropdown.toLowerCase()}`).attr('currVal', index);
                dropdown.renderDropdown();
                findValue = true;
            }
        });
        if (findValue == false) {
            $(`#employee__${dropdown.dropdown.toLowerCase()}`).attr('currVal', dropdown.dropdownData.length);
            dropdown.renderDropdown();
        }
    }
    //#endregion
}