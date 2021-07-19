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

var currValRestaurant = 0;

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


// MAIN PROGRAM
renderDropdown(filterValueDepartment, filterListDepartment, dropdownDataDepartment);

renderDropdown(filterValuePosition, filterListPosition, dropdownDataPosition);

renderDropdown(dropdownValueRestaurant, dropdownListRestaurant, dropdownDataRestaurant);

renderDropdown(dropdownValuePosition, dropdownListPosition, dropdownDataPosition);

renderDropdown(dropdownValueDepartment, dropdownListDepartment, dropdownDataDepartment);

renderDropdown(dropdownValueWorkStatus, dropdownListWorkStatus, dropdownDataWorkStatus);

// HANDLE EVENTS
var dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener('click', function () {
        dropdown.querySelector('.dropdown-list').classList.toggle('show');
        dropdown.querySelector('.icon-down').classList.toggle('show');
    });
});