// Dữ liệu fix cứng
var comboboxDataGender = [
    'Nam',
    'Nữ',
    'Khác'
];
var currentValue = 0;

$(document).ready(function() {
    new Combobox($('#combobox-gender')[0], '', 'FIX', '', comboboxDataGender);
});

class Combobox {
    //#region [Hàm khởi tạo]
    constructor(comboboxElement, combobox, type, url, comboboxData) {
        // Gán giá trị cho các thuộc tính
        this.comboboxElement = comboboxElement;
        this.comboboxInput = comboboxElement.querySelector('.combobox__input');
        this.comboboxInputCancel = comboboxElement.querySelector('.combobox__input-cancel');
        this.comboboxDropdown = comboboxElement.querySelector('.combobox__dropdown');
        this.comboboxList = comboboxElement.querySelector('.combobox__list');

        this.combobox = combobox;
        this.type = type;
        this.url = url;
        this.comboboxData = comboboxData;
        // Load dữ liệu vào combobox
        // this.loadComboboxData();
        // Tạo sự kiện cho combobox
        this.initComboboxEvents();
    }
    //#endregion

    /**
     * Hàm khởi tạo các sự kiện cho combobox
     * Author: NTDUNG (23/07/2021)
     */
    initComboboxEvents() {
        // 1. Ấn vào dropdown bên dưới combobox thì ẩn dropdown đó đi
        this.comboboxList.addEventListener('click', () => {
            this.hideDropdown();
        });

        // 2. Focus vào input combobox thì show dropdown
        this.comboboxInput.addEventListener('focus', () => {
            this.showDropdown();
        });

        // 3. Khi input thì rend lại dropdown
        this.comboboxInput.addEventListener('input', () => {
            this.renderInput();
        });

        // 4. Khi ấn vào nút x nhỏ trong combobox thì xoá nội dung trong input và show lại dropdown
        this.comboboxInputCancel.addEventListener('click', () => {
            this.comboboxInput.value = '';
            this.comboboxInput.focus();
            this.renderInput();
        });

        // 5. Khi ấn enter thì blur input của combobox
        this.comboboxInput.addEventListener('keydown', (e) => {
            if (e.code == "Enter") {
                this.hideDropdown();
                this.comboboxInput.blur();
                this.resolveInputValue();
            }
        });

        // 6. Khi nhấn vào nút dropdown ở combobox thì ẩn hiện dropdown
        this.comboboxDropdown.addEventListener('click', () => {
            this.toggleDropdown();
        });

        // 7. Tắt tự động hoàn thành (danh sách gợi ý cho input)
        this.comboboxInput.setAttribute('autocomplete', 'off');

    }

    /**
     * Hàm load dữ liệu vào combobox
     * Author: NTDUNG (23/07/2021)
     */
    loadComboboxData() {

    }


    /**
     * Hàm render phần dropdown của combobox
     * Author: NTDUNG (21/07/2021)
     * @param {element} comboboxInput 
     * @param {element} comboboxList 
     * @param {element} comboboxData 
     */
    renderDropdown(comboboxInput, comboboxList, comboboxData) {
        var comboboxListHTML = '';
        for (var i = 0; i < comboboxData.length; i++) {
            if (i == currentValue) {
                comboboxListHTML += `<li data-id=${i} class="combobox__item combobox__item--active"><i class="fas fa-check combobox__check"></i> ${comboboxData[i]}</li>`;
            } else {
                comboboxListHTML += `<li data-id=${i} class="combobox__item"><i class="fas fa-check combobox__check"></i> ${comboboxData[i]}</li>`;
            }
        }
        comboboxInput.value = comboboxData[currentValue];
        comboboxList.innerHTML = comboboxListHTML;

        var comboboxItems = comboboxList.querySelectorAll('li');

        comboboxItems.forEach(function (comboboxItem) {
            comboboxItem.addEventListener('click', function () {
                currentValue = comboboxItem.getAttribute('data-id');
                renderDropdown(comboboxInput, comboboxList, comboboxData);
            });
        });
    }


    /**
     * Hàm render ra giá trị khi input được nhập 
     * Author: NTDUNG (21/07/2021)
     * @param {element} comboboxInput 
     * @param {element} comboboxList 
     * @param {element} comboboxData 
     */
    renderInput(comboboxInput, comboboxList, comboboxData) {
        var comboboxListHTML = '';
        var inputValue = comboboxInput.value;
        var inputValueLowercase = inputValue.toLowerCase().trim();

        for (var i = 0; i < comboboxData.length; i++) {
            var comboboxDataLowerCase = comboboxData[i].toLowerCase().trim();
            if (comboboxDataLowerCase.includes(inputValueLowercase)) {
                if (i == currentValue) {
                    comboboxListHTML += `<li data-id=${i} class="combobox__item combobox__item--active"><i class="fas fa-check combobox__check"></i> ${comboboxData[i]}</li>`;
                } else {
                    comboboxListHTML += `<li data-id=${i} class="combobox__item"><i class="fas fa-check combobox__check"></i> ${comboboxData[i]}</li>`;
                }
            }
        }
        comboboxList.innerHTML = comboboxListHTML;

        var comboboxItems = comboboxList.querySelectorAll('li');

        comboboxItems.forEach(function (comboboxItem) {
            comboboxItem.addEventListener('click', function () {
                currentValue = comboboxItem.getAttribute('data-id');
                renderDropdown(comboboxInput, comboboxList, comboboxData);
            });
        });
    }


    /**
     * Hàm xử lý khi người dùng nhập xong input (cảnh báo đỏ khi không hợp lệ)
     * Author: NTDUNG (21/07/2021)
     * @param {element} comboboxInput 
     * @param {element} comboboxData 
     * @param {element} combobox 
     * @param {element} comboboxDropdown 
     */
    resolveInputValue(comboboxInput, comboboxData, combobox, comboboxDropdown) {
        var inputValue = comboboxInput.value;
        var check = comboboxData.find(function (data) {
            return data == inputValue;
        });

        if (check == undefined) {
            combobox.classList.add('error');
        }
    }


    /**
     * Ẩn hiện dropdown của combobox 
     * Author: NTDUNG (21/07/2021)
     */
    toggleDropdown() {
        this.comboboxElement.classList.remove('error');
        this.comboboxElement.classList.toggle('show');
    }

    /**
     * Hiện dropdown của combobox
     * Author: NTDUNG (21/07/2021)
     */
    showDropdown() {
        this.comboboxElement.classList.remove('error');
        this.comboboxElement.classList.add('show');
    }

    /**
     * Ẩn dropdown của combobox
     * Author: NTDUNG (21/07/2021)
     */
    hideDropdown() {
        this.comboboxElement.classList.remove('error');
        this.comboboxElement.classList.remove('show');
    }

    
}