// BEGIN DECLARE VARIABLES

// COMBOBOX GENDER
var comboboxGender = document.querySelector('.combobox--gender');
var comboboxDropdownGender = document.querySelector('.combobox__dropdown--gender');
var comboboxListGender = document.querySelector('.combobox__list--gender');
var comboboxInputGender = document.querySelector('.combobox__input--gender');

// STATUS
var statusComboboxList = false;

// DATA
var comboboxDataGender = [
    'Nam',
    'Nữ',
    'Khác'
];

var currentValue = 0;


// END DECLARE VARIABLES


// BEGIN MAIN PROGRAM

renderCustomCombobox(comboboxInputGender, comboboxListGender, comboboxDataGender, comboboxGender, comboboxDropdownGender);


// END MAIN PROGRAM



// BEGIN FUNCTIONS

function renderCustomCombobox(comboboxInput, comboboxList, comboboxData, combobox, comboboxDropdown) {
    // RENDER COMBOBOX
    renderCombobox(comboboxInput, comboboxList, comboboxData);

    var comboboxInputCancelSub = combobox.querySelector('.combobox__input-cancel');


    // BEGIN HANDLE EVENTS
    comboboxList.addEventListener('click', function () {
        hideDropdown(comboboxList, combobox, comboboxDropdown);
    });

    comboboxInput.addEventListener('focus', function () {
        showDropdown(comboboxList, combobox, comboboxDropdown);
    });


    comboboxInput.addEventListener('input', function () {
        renderInput(comboboxInput, comboboxList, comboboxData);
    });

    comboboxInputCancelSub.addEventListener('click', function () {
        comboboxInput.value = '';
        comboboxInput.focus();
        renderInput(comboboxInput, comboboxList, comboboxData);
    });

    window.addEventListener('keydown', function (e) {
        if (e.code == "Enter") {
            hideDropdown(comboboxList, combobox, comboboxDropdown);
            comboboxInput.blur();
            resolveInputValue(comboboxInput, comboboxData, combobox, comboboxDropdown);
        }
    });

    comboboxDropdown.addEventListener('click', function () {
        toggleDropdown(comboboxList, combobox, comboboxDropdown);
    });

    // FINISH HANDLE EVENTS
}

function renderCombobox(comboboxInput, comboboxList, comboboxData) {
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
            renderCombobox(comboboxInput, comboboxList, comboboxData);
        });
    });
}

// RENDER BY SEARCHING TEXT
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
            renderCombobox(comboboxInput, comboboxList, comboboxData);
        });
    });
}

// RESOLVE INPUT VALUE
function resolveInputValue(comboboxInput, comboboxData, combobox, comboboxDropdown) {
    var inputValue = comboboxInput.value;
    var check = comboboxData.find(function (data) {
        return data == inputValue;
    });

    if (check == undefined) {
        combobox.classList.add('error');
    }
}


// DISPLAY DROPDOWN
function toggleDropdown(comboboxList, combobox, comboboxDropdown) {
    combobox.classList.remove('error');
    combobox.classList.toggle('show');
}

function showDropdown(comboboxList, combobox, comboboxDropdown) {
    combobox.classList.remove('error');
    combobox.classList.add('show');
}

function hideDropdown(comboboxList, combobox, comboboxDropdown) {
    combobox.classList.remove('error');
    combobox.classList.remove('show');
}


// END FUNCTIONS