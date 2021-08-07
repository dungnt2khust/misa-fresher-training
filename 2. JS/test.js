$(document).ready(function () {
    $.ajax({
        url: 'https://localhost:44304/api/Customers/NguyenTienDung',
        Origin: 'https://localhost:44304/api/Customers',
        'Access-Control-Request-Method': 'GET',
        headers: {
            'Content-Type':'application/json',
        }
    }).done(res => {
        console.log(res);
        alert(res);
    }).fail(res => {
        console.log(res);
    });
})