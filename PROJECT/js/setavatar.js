$(document).ready(function() {
    new Avatar();
});
class Avatar {
    horizontal = '50';
    vertical = '50';
    scale = '50';
    constructor() {
        this.initEvents();
    }

    //#region [Hàm xử lý]
    /**
     * Khởi tạo các sự kiện khi đặt ảnh đại diện
     */
    initEvents() {
        // 1. Sự kiện thay đổi ảnh ở input
        $('#avatar-upload').on('input', () => {
            // Đổi thành đường dẫn tương đối
            var realPath = '../content/img/Avatar/' + $('#avatar-upload').val().substring(12);
            console.log(realPath);
            // Đặt ảnh đại diện
            $('.popup-avatar__img').attr('style', `background-image: url('${realPath}')`);
        });

        // 2. Sự kiện thay thay đổi horizontal
        $('#slide-horizontal').on('input', () => {
            this.horizontal = $('#slide-horizontal').val();
            this.setAvatar();
        });

        // 3. Sự kiện thay thay đổi vertical
        $('#slide-vertical').on('input', () => {
            this.vertical = $('#slide-vertical').val();
            this.setAvatar();
        });

        // 2. Sự kiện thay thay đổi scale
        $('#slide-scale').on('input', () => {
            this.scale = $('#slide-scale').val();
            this.setAvatar();
        });
    }

    setAvatar() {
        $('.popup-avatar__img')[0].style.backgroundPosition = `${this.horizontal - 50}px ${this.vertical - 50}px`;
        $('.popup-avatar__img')[0].style.backgroundSize = `${this.scale*2}%`;
        var avatar = $('.popup-avatar__img')[0];
    }

   //#endregion
}



