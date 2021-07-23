$('#btn-error').click(function() {
    showPopup('error', 'Đóng Form thông tin chung', 
    'Bạn có chắc muốn đóng form nhập <b>"Thông tin chung của thủ tục 603"</b> hay không?',
    'Huỷ');
});

$('#btn-warn').click(function() {
    showPopup('warn', 'Đóng Form thông tin chung', 
    'Bạn có chắc muốn đóng form nhập <b>"Thông tin chung của thủ tục 603"</b> hay không?',
    'Tiếp tục điền');
});

$('#btn-info').click(function() {
    showPopup('info', 'Đóng Form thông tin chung', 
    'Bạn có chắc muốn đóng form nhập <b>"Thông tin chung của thủ tục 603"</b> hay không?',
    '');
});


function showPopup(type, title, content, ctnBtn) {
    // ĐỔ DỮ LIỆU VÀO POPUP
    $('.popup-title').text(title);
    $('.popup-content').html(content);
    $('#popup-btn-continue').text(ctnBtn);

    // SET EVENTS
    $('.popup').addClass(`popup--${type}`);
    $('.popup-icon').show();
    $('#popup-btn-continue').show();
    if (type == 'error') {
        $('#popup-btn-cancel').removeClass('popup-btn--positive');
        $('#popup-btn-cancel').addClass('popup-btn--negative');
    } else if (type == 'warn') {
        $('#popup-btn-cancel').removeClass('popup-btn--negative');
        $('#popup-btn-cancel').addClass('popup-btn--positive');
    } else if (type == 'info') {
        $('.popup-icon').hide();
        $('#popup-btn-continue').hide();
        $('#popup-btn-cancel').removeClass('popup-btn--negative');
        $('#popup-btn-cancel').addClass('popup-btn--positive');
    }
    $('.popup').show();
    setEvents();
}

function setEvents() {
    $('#popup-btn-continue').click(function() {
        $('.popup').hide();
        $('.popup').removeClass('popup--error', 'popup--warn', 'popup--info');
    });
    $('#popup-btn-cancel').click(function() {
        $('.popup').hide();
        $('.popup').removeClass('popup--error', 'popup--warn', 'popup--info');
    });
    $('.popup-overlay').click(function() {
        $('.popup').hide();
    });
}