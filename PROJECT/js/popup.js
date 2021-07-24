/**
 * Hàm hiện thị popup tuỳ biến
 * @param {string} type: kiểu popup muốn hiển thị (ERROR, WARN, INFO)
 * @param {string} title: tiêu đề popup
 * @param {string} content: nội dung chi tiết
 * @param {string} ctnBtn: text của nút tiếp tục 
 */
function showPopup(type, title, content, ctnBtn) {
    var typeName = type.toUpperCase();
    // ĐỔ DỮ LIỆU VÀO POPUP
    $('.popup-title-lib').text(title);
    $('.popup-content-lib').html(content);
    $('#popup-btn-continue-lib').text(ctnBtn);

    // SET EVENTS
    $('.popup-lib').addClass(`popup--${type}-lib`);
    $('.popup-icon-lib').show();
    $('#popup-btn-continue-lib').show();
    if (typeName == 'ERROR') {
        $('#popup-btn-cancel-lib').removeClass('popup-btn--positive-lib');
        $('#popup-btn-cancel-lib').addClass('popup-btn--negative-lib');
    } else if (typeName == 'WARN') {
        $('#popup-btn-cancel-lib').removeClass('popup-btn--negative-lib');
        $('#popup-btn-cancel-lib').addClass('popup-btn--positive-lib');
    } else if (typeName == 'INFO') {
        $('.popup-icon-lib').hide();
        $('#popup-btn-continue-lib').hide();
        $('#popup-btn-cancel-lib').removeClass('popup-btn--negative-lib');
        $('#popup-btn-cancel-lib').addClass('popup-btn--positive-lib');
    }
    $('.popup-lib').show();
    setEvents();
}

/** 
 * Hàm khởi tạo sự kiện mặc định cho các nút của popup
 * Author: NTDUNG (23/07/2021)
 */
function setEvents() {
    $('#popup-btn-continue-lib').click(function() {
        $('.popup-lib').hide();
        $('.popup-lib').removeClass('popup--error-lib', 'popup--warn-lib', 'popup--info-lib');
    });
    $('#popup-btn-cancel-lib').click(function() {
        $('.popup-lib').hide();
        $('.popup-lib').removeClass('popup--error-lib', 'popup--warn-lib', 'popup--info-lib');
    });
    $('.popup-overlay-lib').click(function() {
        $('.popup-lib').hide();
    });
}