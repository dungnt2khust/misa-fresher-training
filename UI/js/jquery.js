$(document).ready(function () {
    console.log('helu');

    loadData();
});

function loadData() {
    $.ajax({
        url: 'http://cukcuk.manhnv.net/v1/Employees?fbclid=IwAR0gkgLV9-EEjuO9Kq15v6Ofy4oJFlFF2tBHn4QIFPngEeEE--jOzMKIAUc',
        method: 'GET',
    }).done(function (res) {
        console.log(res);
    }).fail(function (res) {
        console.log('fail');
    })
}

