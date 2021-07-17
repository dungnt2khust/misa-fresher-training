var tableSearch = document.querySelector(".table-search");
var tableSearchInput = document.querySelector(".table-search__input");
var tableFilterDepartment = document.querySelector(".table-filter__department");
var tableFilterDepartmentList = document.querySelector(".table-filter__department .department-list");
var tableFilterPosition = document.querySelector(".table-filter__position");
var tableFilterPositionList = document.querySelector(".table-filter__position .department-list");
var popupCancel = document.querySelector(".popup-cancel");
var popupSave = document.querySelector(".popup-save");






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




