// DECLARE VARIABLES
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

// CALL API TO LOAD DATA
var dropdownDataDepartment;
var dropdownDataPosition;
$(document).ready(function () {
    // GET DEPARTMENT
    $.ajax({
        url: 'http://cukcuk.manhnv.net/api/Department',
        method: 'GET'
    }).done(function (res) {
        dropdownDataDepartment = res;
        renderDropdownAPI(filterValueDepartment, filterListDepartment, dropdownDataDepartment, "DepartmentName");

        renderDropdownAPI(dropdownValueDepartment, dropdownListDepartment, dropdownDataDepartment, "DepartmentName");
    }).fail(function (res) {
        console.log('fail to get department')
    });

    // GET POSITION
    $.ajax({
        url: 'http://cukcuk.manhnv.net/v1/Positions',
        method: 'GET'
    }).done(function (res) {
        dropdownDataPosition = res;

        renderDropdownAPI(filterValuePosition, filterListPosition, dropdownDataPosition, "PositionName");
        renderDropdownAPI(dropdownValuePosition, dropdownListPosition, dropdownDataPosition, "PositionName");
    }).fail(function (res) {
        console.log('fail to get position');
    });
});

var state = false;

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



// FUNCTIONS
function renderDropdown(dropdownValue, dropdownList, dropdownData) {

    render();

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
// MAIN PROGRAM


renderDropdown(dropdownValueRestaurant, dropdownListRestaurant, dropdownDataRestaurant);

renderDropdown(dropdownValueWorkStatus, dropdownListWorkStatus, dropdownDataWorkStatus);


// HANDLE EVENTS
var dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener('click', function () {
        dropdown.querySelector('.dropdown-list').classList.toggle('show');
        dropdown.querySelector('.icon-down').classList.toggle('show');
    });
});