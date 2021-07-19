// DOCUMENT READY
$(document).ready(function () {
    loadData();
});


// CALL API TO GET DATA
function loadData() {
    $.ajax({
        url: 'http://cukcuk.manhnv.net/v1/Employees?fbclid=IwAR0gkgLV9-EEjuO9Kq15v6Ofy4oJFlFF2tBHn4QIFPngEeEE--jOzMKIAUc',
        method: 'GET'
    }).done(function (res) {
        renderTableEmployee(res);
    }).fail(function (res) {
        alert('fail to load data');
    });
}

// Render table 
var dataTable
function renderTableEmployee(datas) {
    dataTable = datas;
    var tbodyEmployee = $('tbody');
    for (var i = 0; i < datas.length; i++) {
        var tableRow = `<tr data-id=${i} class="table-employee__row">
                            <td class="table-employee__check"><input type="checkbox" name="" id=""></td>
                            <td class="table-employee__code">${datas[i].EmployeeCode}</td>
                            <td class="table-employee__name">${datas[i].FullName}</td>
                            <td class="table-employee__gender">${datas[i].Gender}</td>
                            <td class="table-employee__dob">${datas[i].DateOfBirth}</td>
                            <td class="table-employee__phone">${datas[i].PhoneNumber}</td>
                            <td class="table-employee__email">${datas[i].Email}</td>
                            <td class="table-employee__position">${datas[i].PositionName}</td>
                            <td class="table-employee__department">${datas[i].DepartmentName}</td>
                            <td class="table-employee__salary">${datas[i].Salary}</td>
                            <td class="table-employee__status">${datas[i].WorkStatus}</td>
                        </tr>`;
        tbodyEmployee.append(tableRow);
    }
}



// POP UP 
var popupOverlayUpdate = document.querySelector(".popup-overlay--update");
var popupOverlayCreate = document.querySelector(".popup-overlay--create");
var popupCancels = document.querySelectorAll(".popup-header__cancel")
var popupBtnCancels = document.querySelectorAll(".popup-btn-cancel");
var popupBtnSaveUpdate = document.querySelector(".popup-btn-save--update");
var popupBtnSaveCreate = document.querySelector(".popup-btn-save--create");
var listEmployee = document.querySelector(".table-employee__body");
var buttonAddEmployee = document.querySelector(".button-addemployee");


// POP UP INFORMATION
var employeeCodeUpdate = $('#employee__code--update')[0];
var employeeFullnameUpdate = $('#employee__fullname--update')[0];
var employeeDobUpdate = $('#employee__dob--update')[0];
var employeeGenderUpdate = $('#employee__gender--update')[0];
var employeeIdnumberUpdate = $('#employee__idnumber--update')[0];
var employeeIddateUpdate = $('#employee__iddate--update')[0];
var employeeIdplaceUpdate = $('#employee__idplace--update')[0];
var employeeEmailUpdate = $('#employee__email--update')[0];
var employeePhoneUpdate = $('#employee__phone--update')[0];
var employeePositionUpdate = $('#employee__position--update')[0];
var employeeDepartmentUpdate = $('#employee__department--update')[0];
var employeeTaxcodeUpdate = $('#employee__taxcode--update')[0];
var employeeBasesalaryUpdate = $('#employee__basesalary--update')[0];
var employeeJoiningdateUpdate = $('#employee__joiningdate--update')[0];
var employeeWorkstatusUpdate = $('#employee__workstatus--update')[0];

// HANDLE EVENTS
// SHOW POP UP UPDATE
$(document).ready(function () {
    setTimeout(function () {
        var employeeItems = listEmployee.querySelectorAll('.table-employee__row');
        employeeItems.forEach((employeeItem) => {
            employeeItem.addEventListener('click', function (e) {
                // SET VALUE FROM TABLE ROW TO DETAIL FORM
                var dataRow = dataTable[employeeItem.getAttribute('data-id')];
                console.log(dataRow);
                employeeCodeUpdate.value = resolveValue(dataRow.EmployeeCode);
                employeeFullnameUpdate.value = resolveValue(dataRow.FullName);
                employeeDobUpdate.value = resolveDate(dataRow.DateOfBirth);
                employeeGenderUpdate.value = resolveValue(dataRow.GenderName);
                employeeIdnumberUpdate.value = resolveValue(dataRow.IdentifyNumber);
                employeeIddateUpdate.value = resolveDate(dataRow.IdentifyDate);
                employeeIdplaceUpdate.value = resolveValue(dataRow.IdentifyPlace);
                employeeEmailUpdate.value = resolveValue(dataRow.Email);
                employeePhoneUpdate.value = resolveValue(dataRow.PhoneNumber);
                employeePositionUpdate.innerText = resolveValue(dataRow.PositionName);
                employeeDepartmentUpdate.innerText = resolveValue(dataRow.DepartmentName);
                employeeTaxcodeUpdate.value = resolveValue(dataRow.PersonalTaxCode);
                employeeBasesalaryUpdate.value = resolveValue(dataRow.Salary);
                employeeJoiningdateUpdate.value = resolveDate(dataRow.JoinDate);
                employeeWorkstatusUpdate.innerText = resolveValue(dataRow.WorkStatus);

                showPopupUpdate(e);
            });
        });
    }, 1000);
});

// SHOW POP UP CREATE
buttonAddEmployee.onclick = () => {
    popupOverlayCreate.style.display = "block";
    popupOverlayCreate.style.opacity = "1";
}


// HIDE POP UP
popupCancels.forEach((popupCancel) => {
    popupCancel.addEventListener('click', () => {
        var popupOverlay = popupCancel.parentElement.parentElement.parentElement;
        hidePopup(popupOverlay);
    });
});

popupBtnCancels.forEach((popupCancel) => {
    popupCancel.addEventListener('click', () => {
        var popupOverlay = popupCancel.parentElement.parentElement.parentElement;
        hidePopup(popupOverlay);
    });
});


// FUNCTIONS
function showPopupUpdate(e) {
    var checkbox = document.querySelector(".table-employee__row input");
    if (e.target != checkbox) {
        popupOverlayUpdate.style.display = "block";
        popupOverlayUpdate.style.opacity = 1;
        var firstInput = document.querySelector(".popup-overlay--update .popup-infor__input");
        firstInput.focus();
    }
}

function hidePopup(popupOverlay) {
    popupOverlay.style.display = "none";
    popupOverlay.style.opacity = 0;
}

function resolveDate(date) {
    var dateOfBirth = new Date(date);
    var date = dateOfBirth.getDate();
    date = date < 10 ? '0' + date : date;
    var month = dateOfBirth.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var year = dateOfBirth.getFullYear();
    var returnValue = `${year}-${month}-${date}`;
    if (Number.isNaN(date)) {
        return '';
    } else {
        return returnValue;
    }
}

function resolveValue(value) {
    return value == null ? '' : value;
}