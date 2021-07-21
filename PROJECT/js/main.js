var tableSearch = document.querySelector(".table-search");
var tableSearchInput = document.querySelector(".table-search__input");
var tableFilterDepartment = document.querySelector(".table-filter__department");
var tableFilterDepartmentList = document.querySelector(".table-filter__department .department-list");
var tableFilterPosition = document.querySelector(".table-filter__position");
var tableFilterPositionList = document.querySelector(".table-filter__position .department-list");

// Fpcus vào ô search thì thêm border vào
tableSearchInput.addEventListener("focus", () => {
    tableSearch.style.border = "1px solid #019160";
});

// Blur ô search thì về border cũ
tableSearchInput.addEventListener("blur", () => {
    tableSearch.style.border = "1px solid #bbb";
});

// Ẩn hiện lọc phòng ban
tableFilterDepartment.addEventListener("click", () => {
    tableFilterDepartment.classList.toggle("show");
});

// Ẩn hiện lọc vị trí
tableFilterPosition.addEventListener("click", () => {
    tableFilterPosition.classList.toggle("show");
});




