$("#resolve").text('Nguyen Tien Dung');
$(document).ready(function () {
    $.ajax({
        url: 'https://localhost:44304/api/Customers',
        method: 'GET', 
    }).done(res => {
        console.log(res);
    }).fail(res => {
        console.log(res);
    });
})