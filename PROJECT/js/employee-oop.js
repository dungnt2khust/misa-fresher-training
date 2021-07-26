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

        // Đổ dữ liệu vào dropdown (đổ dữ liệu filter cuối cùng và hiện thông báo khi load dữ liệu lỗi)
        this.dropdownRestaurant = new Dropdown($('#dropdown-restaurant')[0], '', 'FIX', '', dropdownDataRestaurant);
        this.dropdownPosition = new Dropdown($('#dropdown-position')[0], 'Position', 'NORMAL', 'http://cukcuk.manhnv.net/v1/Positions');
        this.dropdownWorkstatus = new Dropdown($('#dropdown-workstatus')[0], 'WorkStatus', 'FIX', '', dropdownDataWorkStatus);
        this.dropdownDepartment = new Dropdown($('#dropdown-department')[0], 'Department', 'NORMAL', 'http://cukcuk.manhnv.net/api/Department');
        this.filterPosition = new Dropdown($('#filter-position')[0], 'Position', 'FILTER', 'http://cukcuk.manhnv.net/v1/Positions');
        this.filterDepartment = new Dropdown($('#filter-department')[0], 'Department', 'FILTER', 'http://cukcuk.manhnv.net/api/Department');

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
            // Reset form information
            $('#employee__department').attr('departmentid', '');
            $('#employee__department').attr('departmentcode', '');
            $('#employee__position').attr('positionid', '');
            $('#employee__position').attr('positioncode', '');

            
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
            if (this.method == 'POST' && this.validateForm()) {
                $('.popup-wrapper').hide();
                this.add();
            } else if(this.method == 'PUT' && this.validateForm()) { 
                $('.popup-wrapper').hide();
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
                setTimeout(() => {
                    this.deleteMulti();
                }, 1); 
            });
        });   

        // 10. Sự kiện thay đổi email
        $('#employee__email').on('change', () => {
            if ($('#employee__email').val() != '' && !this.validateEmail($('#employee__email').val())) {
                $('#employee__email').addClass('invalid-input');
                toastMessage('error', 'Địa chỉ Email không hợp lệ', 5000);
            } else if ($('#employee__email').val() == '') {
                $('#employee__email').addClass('invalid-input');
                toastMessage('error', ' Bạn phải nhập Địa chỉ Email', 5000);
            } else {
                $('#employee__email').removeClass('invalid-input');
            }
        });

        // 11. Sự kiện thay đổi số điện thoại
        $('#employee__phone').on('change', () => {
            if ($('#employee__phone').val() != '' && !this.validatePhone($('#employee__phone').val())) {
                $('#employee__phone').addClass('invalid-input');
                toastMessage('error', 'Số điện thoại không hợp lệ', 5000);
            } else if ($('#employee__phone').val() == '') {
                $('#employee__phone').addClass('invalid-input');
                toastMessage('error', 'Bạn phải số điện thoại', 5000);
            } else {
                $('#employee__phone').removeClass('invalid-input');
            }
        });

        // 12. Sự kiện thay đổi các input bắt buộc
        $('input[required]').each((index, item) => {
            console.log(item)
            item.addEventListener('change', () => {
                if (item.value == '') {
                    item.classList.add('invalid-input');
                    switch (item.id) {
                    case 'employee__code':
                        toastMessage('error', 'Bạn phải nhập Mã nhân viên', 5000);
                        break;
                    case 'employee__fullname':
                        toastMessage('error', 'Bạn phải nhập Họ và tên', 5000);
                        break;
                    case 'employee__idnumber':
                        toastMessage('error', 'Bạn phải nhập Số CMT/CCCD', 5000);
                        break;
                    case 'employee__email':
                        toastMessage('error', 'Bạn phải nhập Địa chỉ Email', 5000);
                        break;
                    case 'employee__phone':
                        toastMessage('error', 'Bạn phải nhập Số điện thoại', 5000);
                        break; 
                    default:
                        toastMessage('error', 'Bạn phải nhập trường bắt buộc này', 5000);
                } 
                } else {
                    item.classList.remove('invalid-input');
                }
            });
        })

        // 13. Sự kiện nhập dữ liệu lương 
        $('#employee__basesalary').on('input', () => {
            // Xoá các dấu chấm ngăn cách
            var salaryString = $('#employee__basesalary').val().replaceAll('.', '');
            // Gán giá trị không có dấu chấm vào realValue
            $('#employee__basesalary').attr('realValue', salaryString);
            // Khi chuỗi là rỗng thì chuyển chuỗi thành có phân cách dấu chấm và gán lại cho input
            if (salaryString != '') {
                $('#employee__basesalary').val(parseInt(salaryString).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
            }
            
        });

        // 14. Sự kiện khi ấn phím trong lúc đang nhập lương (chỉ nhập số, xoá đi, sang trái, sang phải)
        $('#employee__basesalary').on('keydown', (e) => {
            if (e.code != "Backspace" && e.code != "ArrowRight" && e.code != "ArrowLeft") {
                if (!(e.key < 48 || e.key > 57)) {
                    e.preventDefault();
                }
            } 
        });
    }

    /**
     * Khởi tạo những sự kiện được cập nhật sau khi dữ liệu thay đổi
     * Author: NTDUNG (23/07/2021)
     */
    terminatorEvents() {        
        // 13. Sự kiện khi checkbox thay đổi
        $('.table-employee__checkbox').change((e) => {
            if (this.employeesDelete.has(e.target.getAttribute('data-id'))) {
                this.employeesDelete.delete(e.target.getAttribute('data-id'));
            } else {
                this.employeesDelete.add(e.target.getAttribute('data-id'));
            }
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
                async: false
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
                            tableData.append(`<input data-id=${i} type="checkbox" class="table-employee__checkbox"/>`);
                        } else {
                            switch (fieldName) {
                                case 'DateOfBirth':
                                    tableData.text(this.resolveDate(res[i][fieldName], 'TABLE'))
                                    break;
                                case 'Email':
                                case 'DepartmentName':
                                    tableData.attr('title', res[i][fieldName]);
                                    tableData.text(res[i][fieldName]);
                                    break;
                                case 'Salary':
                                    if (res[i][fieldName]) {
                                        var number = res[i][fieldName].toLocaleString(); 
                                        tableData.text(number);
                                    } else {
                                        tableData.text('');
                                    }
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
            toastMessage('warn', 'Đang thêm mới. Vui lòng đợi trong giây lát...', 5000);
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
            toastMessage('warn', 'Đang chỉnh sửa. Vui lòng đợi trong giây lát...', 5000);
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
            toastMessage('warn', 'Đang xoá. Vui lòng đợi trong giây lát...', 5000);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Xoá nhiều bản ghi 
     * Author: NTDUNG (23/07/2021)
     */

    deleteMulti() {
        toastMessage('warn', 'Đang xoá. Vui lòng đợi trong giây lát...', 5000);
        try {
            for (let item of this.employeesDelete.values()) {
                this.handleEmployee('DELETEMULTI', this.TableData[item]);
            }
            this.loadData();
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
                // Đổi phương thức thành PUT
                this.method = 'PUT';
                // Đặt lại trạng thái ban đầu cho form
                this.resetForm();

                // Lấy dữ liệu của dòng và bind vào form
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
                $('#employee__basesalary').val(this.resolveSalary(this.resolveValue(dataRow.Salary)));
                $('#employee__basesalary').attr('realValue', this.resolveValue(dataRow.Salary));
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
                
                // Bind dữ liệu để sử dụng khi toast cảnh báo
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
            "DepartmentId": ${this.validateUndefined($('#employee__department').attr('departmentid'))},
            "PositionId": ${this.validateUndefined($('#employee__position').attr('positionid'))},
            "WorkStatus": ${this.validateNum($('#employee__workstatus').text(), 'workstatus')},
            "PersonalTaxCode": "${$('#employee__taxcode').val()}",
            "Salary": ${this.validateNum($('#employee__basesalary').attr('realValue'))},
            "PositionCode": ${this.validateUndefined($('#employee__position').attr('positioncode'))},
            "PositionName": ${this.validateUndefined($('#employee__position').text())},
            "DepartmentCode": ${this.validateUndefined($('#employee__department').attr('departmentcode'))},
            "DepartmentName": ${this.validateUndefined($('#employee__department').text())},
            "QualificationName": null,
            "GenderName": ${this.validateUndefined($('#employee__gender').val())},
            "EducationalBackgroundName": null,
            "MartialStatusName": null,
            "CreatedDate": "${this.modifiedBy(method).createdDate}",
            "CreatedBy": "${this.modifiedBy(method).createdBy}",
            "ModifiedDate": "${this.modifiedBy(method).modifiedDate}",
            "ModifiedBy": "${this.modifiedBy(method).modifiedBy}"
        }`; 


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
                    toastMessage('error', 'Tạo mới thông tin thất bại. Vui lòng liên hệ MISA', 5000);
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
                    toastMessage('error', 'Chỉnh sửa thông tin thất bại. Vui lòng liên hệ MISA', 5000);
                }); 
                break;
            case 'DELETE':
                $.ajax({
                    url: `http://cukcuk.manhnv.net/v1/Employees/${employeeId}`,
                    type: 'DELETE', 
                }).done((res) => {
                    toastMessage('success', `Đã xoá nhân viên ${this.employeeName} - ${this.employeeCode}`, 5000);
                    this.loadData();
                }).fail(function(res) {
                    toastMessage('error', 'Xoá thông tin thất bại. Vui lòng liên hệ MISA', 5000);
                });
                break;
            case 'DELETEMULTI':
                $.ajax({
                    url: `http://cukcuk.manhnv.net/v1/Employees/${employeeId['EmployeeId']}`,
                    type: 'DELETE',
                    async: false
                }).done(function(res) { 
                    toastMessage('success', `Đã xoá nhân viên ${employeeId['FullName']} - ${employeeId['EmployeeCode']}`, 5000);
                }).fail(function(res) {
                    toastMessage('error', 'Xoá thông tin thất bại. Vui lòng liên hệ MISA', 5000);
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
     * Validate undefined value
     * Author: NTDUNG (26/07/2021)
     * @param {undefined, empty string} value
     */
    validateUndefined(value) {
        if (value == undefined || value == '') {
            return null;
        }  else if (value.includes('Chọn')) {
            return null;
        }
        return `"${value}"`;
    }
    /**
     * Validate dữ liệu chuyển sang số
     * Author: NTDUNG (24/07/2021)
     * @param {number, string} value
     */
    validateNum(value, test) { 
        return (value == '' ) || (value == undefined) || (value.includes('Chọn')) ? null : parseInt(value);
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
     * Validate Email 
     * Author: NTDUNG (26/07/2021);
     * @param {string} value
     * @returns {boolean}
     */
    validateEmail(value) {
        const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email.test(value);
    }

    /**
     * Validate PhoneNumber
     * Author: NTDUNG (26/07/2021)
     * @param {string} value
     * @returns {boolean}
     */ 
    validatePhone(value) {
        const phone = /^\D*(\d\D*){9,14}$/; 
        return phone.test(value);
    }

    /**
     * Validate form
     * Author: NTDUNG (24/07/2021)
     */
    validateForm() {
        var valid = true; 
                
        $('input[required]').each((index, item) => { 
            if (item.value.trim() == '')  { 
                if (valid == true) {
                    valid = false;
                    item.focus();
                }
                item.classList.add('invalid-input');
                switch (item.id) {
                    case 'employee__code':
                        toastMessage('error', 'Bạn phải nhập Mã nhân viên', 5000);
                        break;
                    case 'employee__fullname':
                        toastMessage('error', 'Bạn phải nhập Họ và tên', 5000);
                        break;
                    case 'employee__idnumber':
                        toastMessage('error', 'Bạn phải nhập Số CMT/CCCD', 5000);
                        break;
                    case 'employee__email':
                        toastMessage('error', 'Bạn phải nhập Địa chỉ Email', 5000);
                        break;
                    case 'employee__phone':
                        toastMessage('error', 'Bạn phải nhập Số điện thoại', 5000);
                        break; 
                    default:
                        toastMessage('error', 'Bạn phải nhập trường bắt buộc này', 5000);
                }
            } else {
                switch (item.id) {  
                    case 'employee__email':
                        if (!this.validateEmail(item.value)){
                            toastMessage('error', 'Địa chỉ Email không hợp lệ', 5000);
                            item.classList.add('invalid-input');
                            valid = false;
                        } else {
                            item.classList.remove('invalid-input');
                        }
                        break;
                    case 'employee__phone':
                        if (!this.validatePhone(item.value)) {
                            toastMessage('error', 'Số điện thoại không hợp lệ', 5000);
                            item.classList.add('invalid-input');
                            valid = false;
                        } else {
                            item.classList.remove('invalid-input');
                        }
                        break; 
                    default:
                        item.classList.remove('invalid-input');
                } 
                
            }
        });
        return valid;
    }

    /**
     * đặt lại trạng thái bình thường cho form
     * Author: NTDUNG(26/07/2021)
     */
    resetForm() {
        $('input[required]').each((index, item) => {
            item.classList.remove('invalid-input');
        });
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
        hour = hour < 10 ? '0' + hour : hour;
        var min = date.getMinutes();
        min = min < 10 ? '0' + min : min;
        var second = date.getSeconds();
        second = second < 10 ? '0' + second : second;
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

    /**
     * Resolve salary
     * Author: NTDUNG (26/07/2021)
     * @param {number} value
     */
    resolveSalary(value) {
        if (value == '') return value;
        return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
    //#endregion
}