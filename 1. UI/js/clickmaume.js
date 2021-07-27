var popupOverlay = document.querySelector(".popup-overlay");
var popupCancel = document.querySelector(".popup-header__cancel")
var popupBtnCancel = document.querySelector(".popup-btn-cancel");
var popupBtnSave = document.querySelector(".popup-btn-save");
var listEmployee = document.querySelector(".table-employee__body");
var popup = document.querySelector(".pop-up");
var avatar = document.querySelector(".popup-avatar__img");
var inputFile = document.querySelector("#avatar-upload");
var buttonSetAvatar = document.querySelector(".btn-setavatar");
var buttonSetAvatarDemo = document.querySelector(".btn-setavatardemo");
var avatarPath = document.querySelector(".avatar-path");

// SLIDE
var slideHorizontal = document.querySelector("#slide-horizontal");
var slideVertical = document.querySelector("#slide-vertical");
var slideScale = document.querySelector("#slide-scale");

var slideX, slideY, slideZ;


slideHorizontal.addEventListener('input', () => {
    console.log('changed horizontal');
    slideX = slideHorizontal.value;
    setAvatar();
}, false);

slideVertical.addEventListener('input', () => {
    console.log('changed vertical');
    slideY = slideVertical.value;
    setAvatar();
}, false);

slideScale.addEventListener('input', () => {
    console.log('changed scale');
    slideZ = slideScale.value;
    setAvatar();
}, false);


listEmployee.onclick = () => {
    showPopup();
}

popupCancel.onclick = () => {
    hidePopup();
}

popupBtnCancel.onclick = () => {
    hidePopup();
}

popupBtnSave.onclick = () => {
    hidePopup();
}


buttonSetAvatarDemo.onclick = () => {
    var pathFile = inputFile.value;
    var realPath = '../../content/img/Avatar/' + pathFile.substr(12);
    avatar.style.backgroundImage = `url('${realPath}')`;
    buttonSetAvatar.style.display = "block";
    buttonSetAvatarDemo.style.display = "none";
}

buttonSetAvatar.onclick = () => {
    setAvatar();
}

function setAvatar() {
    var pathFile = inputFile.value;
    var realPath = '../../content/img/Avatar/' + pathFile.substr(12);
    avatar.style.backgroundImage = `url('${realPath}')`;

    var positionX = slideX === undefined ? 0 : slideX - 50;
    var positionY = slideY === undefined ? 0 : slideY - 50;
    var scale = slideZ === undefined ? 0 : slideZ;

    if (scale < 50) {
        avatar.style.backgroundSize = `${scale * 2}%`;
        avatar.style.backgroundPosition = "center";
    } else if (scale > 50) {
        avatar.style.backgroundSize = `${scale * 2}%`;
        avatar.style.backgroundPosition = "center";
    } else {
        avatar.style.backgroundSize = '100%';
        avatar.style.backgroundPosition = "center";
    }

    avatar.style.backgroundPosition = `${positionX}px ${positionY}px`;


    // scaleslide 1- 100  default 50
    // 1 - 50: 50% - 100%
    //50 - 100: 100% - 200%


    console.log(positionX, positionY, scale);
}

function showPopup() {
    console.log("show popup");
    popupOverlay.style.visibility = "visible";
    popupOverlay.style.opacity = 1;
}

function hidePopup() {
    popupOverlay.style.visibility = "hidden";
    popupOverlay.style.opacity = 0;
}

