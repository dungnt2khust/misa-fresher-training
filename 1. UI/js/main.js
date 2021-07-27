var restaurantElement = document.querySelector(".restaurant");
var restaurantDropdown = document.querySelector(".restaurant__dropdown");
var tableSearch = document.querySelector(".table-search");
var tableSearchInput = document.querySelector(".table-search__input");
var tableFilterDepartment = document.querySelector(".table-filter__department");
var tableFilterDepartmentList = document.querySelector(".table-filter__department .department-list");
var tableFilterPosition = document.querySelector(".table-filter__position");
var tableFilterPositionList = document.querySelector(".table-filter__position .department-list");
var popupCancel = document.querySelector(".popup-cancel");
var popupSave = document.querySelector(".popup-save");

var restaurants = [
    "Nhà hàng Văn Diện",
    "Nhà hàng Khánh Bùi",
    "Nhà hàng Nê Tùng",
    "Nhà hàng MÍA"
];

var currRes = 0;

restaurantElement.addEventListener("click", () => {
    var dropdownHTML = '';

    for (let i = 0; i < restaurants.length; ++i) {
        dropdownHTML += `<li class="restaurant__dropdown-item">${restaurants[i]}</li>\n`;
    }
    console.log(dropdownHTML);
    restaurantDropdown.innerHTML = dropdownHTML;

    restaurantDropdown.classList.toggle("show");
});

tableSearchInput.addEventListener("focus", () => {
    tableSearch.style.border = "1px solid #019160";
});


tableSearchInput.addEventListener("blur", () => {
    tableSearch.style.border = "1px solid #bbb";
});


tableFilterDepartment.addEventListener("click", () => {
    tableFilterDepartment.classList.toggle("show");
});

tableFilterPosition.addEventListener("click", () => {
    tableFilterPosition.classList.toggle("show");
});





