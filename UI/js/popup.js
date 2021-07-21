// import * as handleTable from './handleTable'

var popupOverlayUpdate = document.querySelector(".popup-overlay--update");
var popupOverlayCreate = document.querySelector(".popup-overlay--create");
var popupCancels = document.querySelectorAll(".popup-header__cancel")
var popupBtnCancels = document.querySelectorAll(".popup-btn-cancel");
var popupBtnSaveUpdate = document.querySelector(".popup-btn-save--update");
var popupBtnSaveCreate = document.querySelector(".popup-btn-save--create");
var listEmployee = document.querySelector(".table-employee__body");
var buttonAddEmployee = document.querySelector(".button-addemployee");

// HANDLE EVENTS
// SHOW POP UP UPDATE

$(document).ready(function () {
    setTimeout(function () {
        var employeeItems = listEmployee.querySelectorAll('.table-employee__row');
        employeeItems.forEach((employeeItem) => {
            employeeItem.addEventListener('click', function (e) {
                console.log(employeeItem);
                showPopupUpdate(e);
            });
        });
        // console.log(data);
    }, 100);
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