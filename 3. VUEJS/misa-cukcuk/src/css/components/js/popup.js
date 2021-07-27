$('#btn-error-lib').click(function() {
    showPopup('error', 'Đóng Form thông tin chung', 
    'Bạn có chắc muốn đóng form nhập <b>"Thông tin chung của thủ tục 603"</b> hay không?',
    'Huỷ');
});

// $('#btn-warn-lib').click(function() {
//     showPopup('warn', 'Đóng Form thông tin chung', 
//     'Bạn có chắc muốn đóng form nhập <b>"Thông tin chung của thủ tục 603"</b> hay không?',
//     'Tiếp tục điền');
// });
$('#btn-warn-lib').click(function() {
    showPopup('warn', 'Đóng Form thông tin chung', 
    '<b>"Thông tin chung của thủ tục 603"</b>?',
    'Tiếp tục điền');
});

$('#btn-info-lib').click(function() {
    showPopup('info', 'Đóng Form thông tin chung', 
    'Bạn có chắc muốn đóng form nhập <b>"Thông tin chung của thủ tục 603"</b> hay không?',
    '');
});


function showPopup(type, title, content, ctnBtn) {
    // ĐỔ DỮ LIỆU VÀO POPUP
    $('.popup-title-lib').text(title);
    $('.popup-content-lib').html(content);
    $('#popup-btn-continue-lib').text(ctnBtn);

    // SET EVENTS
    $('.popup-lib').addClass(`popup--${type}-lib`);
    $('.popup-icon-lib').show();
    $('#popup-btn-continue-lib').show();
    if (type == 'error') {
        $('#popup-btn-cancel-lib').removeClass('popup-btn--positive-lib');
        $('#popup-btn-cancel-lib').addClass('popup-btn--negative-lib');
    } else if (type == 'warn') {
        $('#popup-btn-cancel-lib').removeClass('popup-btn--negative-lib');
        $('#popup-btn-cancel-lib').addClass('popup-btn--positive-lib');
    } else if (type == 'info') {
        $('.popup-icon-lib').hide();
        $('#popup-btn-continue-lib').hide();
        $('#popup-btn-cancel-lib').removeClass('popup-btn--negative-lib');
        $('#popup-btn-cancel-lib').addClass('popup-btn--positive-lib');
    }
    $('.popup-lib').show();
    setEvents();
}

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