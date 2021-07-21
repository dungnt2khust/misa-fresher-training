// FILTER DEPARTMENT
var filterValueDepartment = $(".filter__value--department")[0];
var filterListDepartment = $(".filter__list--department")[0];


// FILTER POSITION
var filterValuePosition = $(".filter__value--position")[0];
var filterListPosition = $(".filter__list--position")[0];

// DROPDOWN RESTAURANT
var dropdownValueRestaurant = $(".dropdown-value--restaurant")[0];
var dropdownListRestaurant = $(".dropdown-list--restaurant")[0];

// DROPDOWN POSITION 
var dropdownValuePosition = $(".dropdown-value--position")[0];
var dropdownListPosition = $(".dropdown-list--position")[0];

// DROPDOWN DEPARTMENT
var dropdownValueDepartment = $(".dropdown-value--department")[0];
var dropdownListDepartment = $(".dropdown-list--department")[0];

// DROPDOWN WORKSTATUS
var dropdownValueWorkStatus = $(".dropdown-value--workstatus")[0];
var dropdownListWorkStatus = $(".dropdown-list--workstatus")[0];


// DATA
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


// CALL API TO LOAD DATA
var dropdownDataDepartment;
var dropdownDataPosition;
$(document).ready(function () {
    // Gọi API lấy các phòng ban
    $.ajax({
        url: 'http://cukcuk.manhnv.net/api/Department',
        method: 'GET'
    }).done(function (res) {
        dropdownDataDepartment = res;

        // Render các dropdown phòng ban
        renderDropdownAPI(filterValueDepartment, filterListDepartment, dropdownDataDepartment, "DepartmentName");
        renderDropdownAPI(dropdownValueDepartment, dropdownListDepartment, dropdownDataDepartment, "DepartmentName");
    }).fail(function (res) {
        console.log('fail to get department')
    });

    // Gọi API lấy các vị trí
    $.ajax({
        url: 'http://cukcuk.manhnv.net/v1/Positions',
        method: 'GET'
    }).done(function (res) {
        dropdownDataPosition = res;

        // Render các dropdown vị trí
        renderDropdownAPI(filterValuePosition, filterListPosition, dropdownDataPosition, "PositionName");
        renderDropdownAPI(dropdownValuePosition, dropdownListPosition, dropdownDataPosition, "PositionName");
    }).fail(function (res) {
        console.log('fail to get position');
    }); 
});

// Render các dropdown khác được fix cứng
renderDropdown(dropdownValueRestaurant, dropdownListRestaurant, dropdownDataRestaurant);
renderDropdown(dropdownValueWorkStatus, dropdownListWorkStatus, dropdownDataWorkStatus);
        

/*******************************************************************************
 * Hàm bao đóng để render cho nhiều dropdown khác nhau (fix cứng dữ liệu)
 * Author: NTDUNG (21/07/2021)
 * @param {element} dropdownValue 
 * @param {element} dropdownList 
 * @param {element} dropdownData 
 */
function renderDropdown(dropdownValue, dropdownList, dropdownData) {

    render();

    /*******************************
     * Hàm render dropdown
     * Author: NTDUNG (21/7/20212)
     */
    function render() {
        var currVal = parseInt(dropdownValue.getAttribute('currVal'));
        var dropdownListHTML = '';
        console.log()
        if (Number.isInteger(currVal)) {
            dropdownValue.innerText = dropdownData[currVal];
        } else {
            dropdownValue.innerText = '';
        }

        for (var i = 0; i < dropdownData.length; i++) {
            if (i != currVal) {
                dropdownListHTML += `<li data-id=${i} class="dropdown-item"><i class="fas fa-check dropdown-icon"></i> ${dropdownData[i]} </li>`;
            } else {
                dropdownListHTML += `<li data-id=${i} class="dropdown-item active"><i class="fas fa-check dropdown-icon"></i> ${dropdownData[i]} </li>`;
            }
        }

        dropdownList.innerHTML = dropdownListHTML;

        var items = dropdownList.querySelectorAll('.dropdown-item');

        items.forEach((item) => {
            item.addEventListener('click', () => {
                var dataId = item.getAttribute('data-id');
                currVal = dataId;
                dropdownValue.setAttribute('currVal', currVal);
                render();
            });
        });
    }
}

/******************************************************************
 * Hàm bao đóng để render ra nhiều dropdown khác nhau (Rend từ API)
 * Author: NTDUNG (21/07/2021)
 * @param {element} dropdownValue 
 * @param {element} dropdownList 
 * @param {element} dropdownData 
 * @param {element} type 
 */
function renderDropdownAPI(dropdownValue, dropdownList, dropdownData, type) {

    renderAPI();

    function renderAPI() {
        var currVal = parseInt(dropdownValue.getAttribute('currVal'));
        var dropdownListHTML = '';

        if (Number.isInteger(currVal)) {
            dropdownValue.innerText = dropdownData[currVal][type];
        } else {
            dropdownValue.innerText = '';
        }

        for (var i = 0; i < dropdownData.length; i++) {
            if (i != currVal) {
                dropdownListHTML += `<li data-id=${i} class="dropdown-item"><i class="fas fa-check dropdown-icon"></i> ${dropdownData[i][type]} </li>`;
            } else {
                dropdownListHTML += `<li data-id=${i} class="dropdown-item active"><i class="fas fa-check dropdown-icon"></i> ${dropdownData[i][type]} </li>`;
            }
        }

        dropdownList.innerHTML = dropdownListHTML;

        var items = dropdownList.querySelectorAll('.dropdown-item');

        items.forEach((item) => {
            item.addEventListener('click', () => {
                var dataId = item.getAttribute('data-id');
                currVal = dataId;
                dropdownValue.setAttribute('currVal', currVal);
                renderAPI();
            });
        });
    }
}


// Xử lý sự kiện click vào dropdown thì ẩn hiện danh sách chọn phía dưới 
document.querySelectorAll('.dropdown').forEach(function (dropdown) {
    dropdown.addEventListener('click', function () {
        dropdown.classList.toggle('focus-dropdown');
        dropdown.querySelector('.dropdown-list').classList.toggle('show');
        dropdown.querySelector('.icon-down').classList.toggle('show');
    });
});