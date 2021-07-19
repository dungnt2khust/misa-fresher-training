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
var state = false;

var currValDepartment = 0;
var currValPosition = 0;
var currValRestaurant = 0;
var currValWorkStatus = 0;

var dropdownDataPosition = [
    "Fresher Web",
    "Intern Web",
    "Intern HR",
    "EM",
    "BA"
];

var dropdownDataDepartment = [
    "Phòng nhân sự",
    "Phòng bảo vệ",
    "Phòng giám đốc",
];

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
function renderDropdown(dropdownValue, dropdownList, currVal, dropdownData) {
    render();

    function render() {
        var dropdownListHTML = '';
        dropdownValue.innerText = dropdownData[currVal];

        for (var i = 0; i < dropdownData.length; i++) {
            if (i != currVal) {
                dropdownListHTML += `<li data-id=${i} class="dropdown-item"> ${dropdownData[i]} </li>`;
            } else {
                dropdownListHTML += `<li data-id=${i} class="dropdown-item active"> ${dropdownData[i]} </li>`;
            }
        }

        dropdownList.innerHTML = dropdownListHTML;

        var items = dropdownList.querySelectorAll('.dropdown-item');

        items.forEach((item) => {
            item.addEventListener('click', () => {
                var dataId = item.getAttribute('data-id');
                currVal = dataId;
                render();
            });
        });
    }
}


// MAIN PROGRAM
renderDropdown(filterValueDepartment, filterListDepartment, currValDepartment, dropdownDataDepartment);

renderDropdown(filterValuePosition, filterListPosition, currValPosition, dropdownDataPosition);

renderDropdown(dropdownValueRestaurant, dropdownListRestaurant, currValRestaurant, dropdownDataRestaurant);

renderDropdown(dropdownValuePosition, dropdownListPosition, currValPosition, dropdownDataPosition);

renderDropdown(dropdownValueDepartment, dropdownListDepartment, currValDepartment, dropdownDataDepartment);

renderDropdown(dropdownValueWorkStatus, dropdownListWorkStatus, currValWorkStatus, dropdownDataWorkStatus);

// HANDLE EVENTS
var dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener('click', function () {
        dropdown.querySelector('.dropdown-list').classList.toggle('show');
        dropdown.querySelector('.icon-up').classList.toggle('show');
        dropdown.querySelector('.icon-down').classList.toggle('show');
    });
});