// VỊ TRÍ
var dropdownPositionA = document.querySelector(".dropdown--position-a");
var dropdownListPositionA = document.querySelector(".dropdown-list.dropdown-list--position-a");
var dropdownValuePositionA = document.querySelector(".dropdown-value.dropdown-value--position-a");

// VỊ TRÍ B
var dropdownPositionB = document.querySelector(".dropdown--position-b");
var dropdownListPositionB = document.querySelector(".dropdown-list.dropdown-list--position-b");
var dropdownValuePositionB = document.querySelector(".dropdown-value.dropdown-value--position-b");

// PHÒNG BAN
var dropdownDepartment = document.querySelector(".dropdown--department");
var dropdownListDepartment = document.querySelector(".dropdown-list.dropdown-list--department");
var dropdownValueDepartment = document.querySelector(".dropdown-value.dropdown-value--department");

// TÌNH TRẠNG CÔNG VIỆC
var dropdownWorkStatus = document.querySelector(".dropdown--workstatus");
var dropdownListWorkStatus = document.querySelector(".dropdown-list.dropdown-list--workstatus");
var dropdownValueWorkStatus = document.querySelector(".dropdown-value.dropdown-value--workstatus");

// TÌNH TRẠNG CÔNG VIỆC
var dropdownRestaurant = document.querySelector(".dropdown--restaurant");
var dropdownListRestaurant = document.querySelector(".dropdown-list.dropdown-list--restaurant");
var dropdownValueRestaurant = document.querySelector(".dropdown-value.dropdown-value--restaurant");



//ICON
var iconDown = document.querySelector(".icon-down");
var iconUp = document.querySelector(".icon-up");


var state = false;

var currValPosition = 0;


var dropdownDataPosition = [
    "Fresher Web",
    "Intern Web",
    "Intern HR",
    "EM",
    "BA"
];

var dropdownDataDepartment = [
    "Viện đạo tạo và nghiên cứu công nghệ",
    "Phòng nhân sự",
    "Phòng bảo vệ",
    "Phòng giám đốc",
    "Phòng chống dịch bệnh covid 19"
];

var dropdownDataWorkStatus = [
    "Đang đào tạo",
    "Đang thực tập",
    "Đang làm việc",
    "Đã nghỉ"
];

var dropdownDataRestaurants = [
    "Nhà hàng biến Đông",
    "Nhà hàng biến Tây",
    "Nhà hàng biến Nam",
    "Nhà hàng biến Bắc"
];


function renderDropdown(dropdownValue, dropdownList, currVal, dropdownValue, dropdownData) {
    render();

    function render() {
        console.log('render ', currVal);
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

renderDropdown(dropdownValuePositionA, dropdownListPositionA, currValPosition, dropdownValuePositionA, dropdownDataPosition);

renderDropdown(dropdownValuePositionB, dropdownListPositionB, currValPosition, dropdownValuePositionB, dropdownDataPosition);

renderDropdown(dropdownValueDepartment, dropdownListDepartment, currValPosition, dropdownValueDepartment, dropdownDataDepartment);

renderDropdown(dropdownValueWorkStatus, dropdownListWorkStatus, currValPosition, dropdownValueWorkStatus, dropdownDataWorkStatus);

renderDropdown(dropdownValueRestaurant, dropdownListRestaurant, currValPosition, dropdownValueRestaurant, dropdownDataRestaurants);








// CÁCH 1
// dropdown.addEventListener('click', function () {
//     if (state == false) {
//         dropdownList.style.display = "block";
//         iconDown.style.display = "none";
//         iconUp.style.display = "inline";
//         state = true;
//     } else {
//         dropdownList.style.display = "none";
//         iconDown.style.display = "inline";
//         iconUp.style.display = "none";
//         state = false;
//     }
// });


// CÁCH 2:
// dropdown.addEventListener('click', function () {
//     if (dropdownList.classList.contains('show')) {
//         dropdownList.classList.remove('show');
//         iconDown.classList.add('show');
//         iconUp.classList.remove('show');
//     } else {
//         dropdownList.classList.add('show');
//         iconDown.classList.remove('show');
//         iconUp.classList.add('show');
//     }
// });

// CÁCH 3: 
dropdownPositionA.addEventListener('click', function () {
    dropdownPositionA.classList.toggle('focus-dropdown');
    dropdownListPositionA.classList.toggle('show');
    iconUp.classList.toggle('show');
    iconDown.classList.toggle('show');
});

dropdownPositionB.addEventListener('click', function () {
    dropdownPositionB.classList.toggle('focus-dropdown');
    dropdownListPositionB.classList.toggle('show');
    iconUp.classList.toggle('show');
    iconDown.classList.toggle('show');
});

dropdownDepartment.addEventListener('click', function () {
    dropdownDepartment.classList.toggle('focus-dropdown');
    dropdownListDepartment.classList.toggle('show');
    iconUp.classList.toggle('show');
    iconDown.classList.toggle('show');
});

dropdownWorkStatus.addEventListener('click', function () {
    dropdownWorkStatus.classList.toggle('focus-dropdown');
    dropdownListWorkStatus.classList.toggle('show');
    iconUp.classList.toggle('show');
    iconDown.classList.toggle('show');
});

dropdownRestaurant.addEventListener('click', function () {
    dropdownRestaurant.classList.toggle('focus-dropdown');
    dropdownListRestaurant.classList.toggle('show');
    iconUp.classList.toggle('show');
    iconDown.classList.toggle('show');
});

