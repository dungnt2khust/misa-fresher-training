/**
 * Lưu trữ các class css của font_awesome
 * 0 - success 
 * 1 - error
 * 2 - warn
 * 3 - info
 */
var iconClasses = [
    "fa-check-circle",
    "fa-exclamation-triangle",
    "fa-exclamation-circle", 
    "fa-info-circle"
];

var toastMessageList = $('.toast-message-list');

addIconToastMessage();



// Sự kiện click nút toast thành công
$('.btn-toast--success').click(function() {
    toastMessage('success', 'Thêm mới thành công', 3000);
});

// Sự kiện click nút toast lỗi
$('.btn-toast--error').click(function() {  
    toastMessage('error', 'Đã xảy ra lỗi ối dồi ôi luôn vào sửa đi', 3000);
});

// Sự kiện click nút toast cảnh báo
$('.btn-toast--warn').click(function() {
    toastMessage('warn', 'Hãy kiểm tra lại', 3000);
});

// Sự kiện click nút toast thông tin
$('.btn-toast--info').click(function() { 
    toastMessage('info', 'Cập nhật phiên bản', 3000);
});


/**
 * Hàm để trả về một element toast message 
 * Author: NTDUNG (22/07/2021)
 * @param {string} type 
 * @param {string} content 
 * @returns element
 */
function toastMessage(type, content, duration) {
    var toastMessageItem = $(`
        <div class="toast-message toast-message--${type}">
            <div class="toast-message__body">
                <div class="toast-message__icon">
                    <i class="fas"></i>
                </div>
                <span class="toast-message__title">${content}</span>
            </div> 
            <div class="toast-message__cancel">
                <i class="fas fa-times"></i>
            </div>
        </div>
    `);
    toastMessageList.append(toastMessageItem);
    // var toastList = toastMessageList[0].querySelectorAll('.toast-message');
    
    setTimeout(function() {
        // toastList[toastList.length - 1].remove();
        toastMessageItem.fadeOut(700);
    }, duration);
    addIconToastMessage();
    setCancelEvent();
}

/**
 * Hàm gán vào các toast khác nhau những icon tương ứng của font_awesome
 * Author: NTDUNG (22/07/2021)
 */
function addIconToastMessage() {
    document.querySelectorAll('.toast-message').forEach((toastMessage) => {
        if (toastMessage.classList.contains('toast-message--success')) {
            toastMessage.querySelector('.toast-message__icon i').classList.add(iconClasses[0]);
        } 
        else if (toastMessage.classList.contains('toast-message--error')) {
            toastMessage.querySelector('.toast-message__icon i').classList.add(iconClasses[1]);
        } 
        else if (toastMessage.classList.contains('toast-message--warn')) {
            toastMessage.querySelector('.toast-message__icon i').classList.add(iconClasses[2]);
        } 
        else if (toastMessage.classList.contains('toast-message--info')) {
            toastMessage.querySelector('.toast-message__icon i').classList.add(iconClasses[3]);
        }
    });
}

/**
 * Sự kiện click vào dấu x thì ẩn toast đi
 * Author: NTDUNG (22/07/2021)
 */
function setCancelEvent() {
    document.querySelectorAll('.toast-message__cancel').forEach((toastCancel) => {
        toastCancel.onclick = () => {
            toastCancel.parentElement.remove();
        }
    });
}