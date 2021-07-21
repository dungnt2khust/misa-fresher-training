// COMBOBOX GENDER
var comboboxGender = document.querySelector('.combobox--gender');
var comboboxDropdownGender = document.querySelector('.combobox__dropdown--gender');
var comboboxListGender = document.querySelector('.combobox__list--gender');
var comboboxInputGender = document.querySelector('.combobox__input--gender');

// DATA
var comboboxDataGender = [
    'Nam',
    'Nữ',
    'Khác'
];

// Giá trị hiện tại
var currentValue = 0;



renderCustomCombobox(comboboxInputGender, comboboxListGender, comboboxDataGender, comboboxGender, comboboxDropdownGender);



// TODO: HÀM XỬ LÝ
/**
 * Hàm render combobox  
 * Author: NTDUNG (21/7/2021)
 * @param {element} comboboxInput 
 * @param {element} comboboxList 
 * @param {element} comboboxData 
 * @param {element} combobox 
 * @param {element} comboboxDropdown 
 */
function renderCustomCombobox(comboboxInput, comboboxList, comboboxData, combobox, comboboxDropdown) {

    // RENDER DROPDOWN
    renderDropdown(comboboxInput, comboboxList, comboboxData);

    var comboboxInputCancelSub = combobox.querySelector('.combobox__input-cancel');

    // Ấn vào dropdown bên dưới combobox thì ẩn dropdown đó đi
    comboboxList.addEventListener('click', function () {
        hideDropdown(combobox);
    });

    // Focus vào input combobox thì show dropdown
    comboboxInput.addEventListener('focus', function () {
        showDropdown(combobox);
    });

    // Khi input thì rend lại dropdown
    comboboxInput.addEventListener('input', function () {
        renderInput(comboboxInput, comboboxList, comboboxData);
    });

    // Khi ấn vào nút x nhỏ trong combobox thì xoá nội dung trong input và show lại dropdown
    comboboxInputCancelSub.addEventListener('click', function () {
        comboboxInput.value = '';
        comboboxInput.focus();
        renderInput(comboboxInput, comboboxList, comboboxData);
    });

    // Khi ấn enter thì blur input của combobox
    comboboxInput.addEventListener('keydown', function (e) {
        if (e.code == "Enter") {
            hideDropdown(combobox);
            comboboxInput.blur();
            resolveInputValue(comboboxInput, comboboxData, combobox, comboboxDropdown);
        }
    });

    // Khi nhấn vào nút dropdown ở combobox thì ẩn hiện dropdown
    comboboxDropdown.addEventListener('click', function () {
        toggleDropdown(combobox);
    });
}

/**
 * Hàm render phần dropdown của combobox
 * Author: NTDUNG (21/07/2021)
 * @param {element} comboboxInput 
 * @param {element} comboboxList 
 * @param {element} comboboxData 
 */
function renderDropdown(comboboxInput, comboboxList, comboboxData) {
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
function renderInput(comboboxInput, comboboxList, comboboxData) {
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
function resolveInputValue(comboboxInput, comboboxData, combobox, comboboxDropdown) {
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
 * @param {element} combobox 
 */
function toggleDropdown(combobox) {
    combobox.classList.remove('error');
    combobox.classList.toggle('show');
}

/**
 * Hiện dropdown của combobox
 * Author: NTDUNG (21/07/2021)
 * @param {element} combobox 
 */
function showDropdown(combobox) {
    combobox.classList.remove('error');
    combobox.classList.add('show');
}

/**
 * Ẩn dropdown của combobox
 * Author: NTDUNG (21/07/2021)
 * @param {element} combobox 
 */
function hideDropdown(combobox) {
    combobox.classList.remove('error');
    combobox.classList.remove('show');
}
