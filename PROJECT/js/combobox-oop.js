// Dữ liệu fix cứng
var comboboxDataGender = [
    'Nam',
    'Nữ',
    'Khác'
];
var currentValue = 0;


class Combobox {
    //#region [Hàm khởi tạo]
    constructor() {
        // Load dữ liệu vào combobox
        this.loadComboboxData();
        // Tạo sự kiện cho combobox
        this.initComboboxEvents();
    }
    //#endregion

    /**
     * Hàm khởi tạo các sự kiện cho combobox
     * Author: NTDUNG (23/07/2021)
     */
    initComboboxEvents(combobox, comboboxList, comboboxInput) {
        // 1. Ấn vào dropdown bên dưới combobox thì ẩn dropdown đó đi
        comboboxList.addEventListener('click', function () {
            hideDropdown(combobox);
        });

        // 2. Focus vào input combobox thì show dropdown
        comboboxInput.addEventListener('focus', function () {
            showDropdown(combobox);
        });

        // 3. Khi input thì rend lại dropdown
        comboboxInput.addEventListener('input', function () {
            renderInput(comboboxInput, comboboxList, comboboxData);
        });

        // 4. Khi ấn vào nút x nhỏ trong combobox thì xoá nội dung trong input và show lại dropdown
        comboboxInputCancelSub.addEventListener('click', function () {
            comboboxInput.value = '';
            comboboxInput.focus();
            renderInput(comboboxInput, comboboxList, comboboxData);
        });

        // 5. Khi ấn enter thì blur input của combobox
        comboboxInput.addEventListener('keydown', function (e) {
            if (e.code == "Enter") {
                hideDropdown(combobox);
                comboboxInput.blur();
                resolveInputValue(comboboxInput, comboboxData, combobox, comboboxDropdown);
            }
        });

        // 6. Khi nhấn vào nút dropdown ở combobox thì ẩn hiện dropdown
        comboboxDropdown.addEventListener('click', function () {
            toggleDropdown(combobox);
        });

        // 7. Tắt tự động hoàn thành (danh sách gợi ý cho input)
        comboboxInput.setAttribute('autocomplete', 'off');

    }

    /**
     * Hàm load dữ liệu vào combobox
     * Author: NTDUNG (23/07/2021)
     */
    loadComboboxData() {

    }

    
}