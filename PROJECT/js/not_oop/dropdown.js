// Dữ liệu được fix cứng
var dropdownDataRestaurant = [
    "Nhà hàng Biển Đông",
    "Nhà hàng Biển Tây",
    "Nhà hàng Biển Bắc",
    "Nhà hàng Biển Nam",
];

var dropdownDataWorkStatus = [
    "Đang đào tạo",
    "Đang thực tập",
    "Đang làm việc",
    "Tạm nghỉ",
];


$(document).ready(function () {
    // Gọi API lấy các phòng ban
    $.ajax({
        url: 'http://cukcuk.manhnv.net/api/Department',
        method: 'GET'
    }).done(function (res) {
        dropdownDataDepartment = res;

        // Render các dropdown phòng ban
        renderDropdownAPIAll($(".filter__value--department")[0], $(".filter__list--department")[0], res, "Department");
        renderDropdownAPI($(".dropdown-value--department")[0], $(".dropdown-list--department")[0], res, "Department");
    }).fail(function (res) {
        console.log('fail to get department')
    });

    // Gọi API lấy các vị trí
    $.ajax({
        url: 'http://cukcuk.manhnv.net/v1/Positions',
        method: 'GET'
    }).done(function (res) {
        dropdownDataPosition = res;

        // Render các dropdown vị trí
        renderDropdownAPIAll($(".filter__value--position")[0], $(".filter__list--position")[0], res, "Position");
        renderDropdownAPI($(".dropdown-value--position")[0], $(".dropdown-list--position")[0], res, "Position");
    }).fail(function (res) {
        console.log('fail to get position');
    }); 
});

// Render các dropdown khác được fix cứng
renderDropdown($(".dropdown-value--restaurant")[0], $('.dropdown-list--restaurant')[0], dropdownDataRestaurant);
renderDropdown($('.dropdown-value--workstatus')[0], $('.dropdown-list--workstatus')[0], dropdownDataWorkStatus);
        

/*******************************************************************************
 * Hàm bao đóng để render cho nhiều dropdown khác nhau (fix cứng dữ liệu)
 * Author: NTDUNG (21/07/2021)
 * @param {element} dropdownValue 
 * @param {element} dropdownList 
 * @param {element} dropdownData 
 */
function renderDropdown(dropdownValue, dropdownList, dropdownData) {

    render();

    /*******************************
     * Hàm render dropdown
     * Author: NTDUNG (21/7/20212)
     */
    function render() {
        var currVal = parseInt(dropdownValue.getAttribute('currVal'));
        var dropdownListHTML = '';
        if (Number.isInteger(currVal)) {
            dropdownValue.innerText = dropdownData[currVal];
        } else {
            dropdownValue.innerText = '';
        }
        for (var i = 0; i < dropdownData.length; i++) {
            if (i != currVal) {
                dropdownListHTML += `<li data-id=${i} class="dropdown-item"><i class="fas fa-check dropdown-icon"></i> ${dropdownData[i]} </li>`;
            } else {
                dropdownListHTML += `<li data-id=${i} class="dropdown-item active"><i class="fas fa-check dropdown-icon"></i> ${dropdownData[i]} </li>`;
            }
        }

        dropdownList.innerHTML = dropdownListHTML;

        var items = dropdownList.querySelectorAll('.dropdown-item');

        items.forEach((item) => {
            item.addEventListener('click', () => {
                var dataId = item.getAttribute('data-id');
                currVal = dataId;
                dropdownValue.setAttribute('currVal', currVal);
                render();
            });
        });
    }
}

/******************************************************************
 * Hàm bao đóng để render ra nhiều dropdown (chứa tất cả vị trí) khác nhau (Rend từ API)
 * Author: NTDUNG (21/07/2021)
 * @param {element} dropdownValue 
 * @param {element} dropdownList 
 * @param {element} dropdownData 
 * @param {element} type 
 */
function renderDropdownAPIAll(dropdownValue, dropdownList, dropdownData, dropdown) {
    var dropdownName = dropdown + 'Name';
    var dropdownId = dropdown + 'Id';
    var dropdownCode = dropdown + 'Code';
    var name = dropdown == 'Department' ? 'phòng ban' : 'vị trí';
    dropdownValue.setAttribute('currVal', "-1");
    renderAPIAll();

    function renderAPIAll() {
        var currVal = parseInt(dropdownValue.getAttribute('currVal'));
        var dropdownListHTML = '';
        if (Number.isInteger(currVal) && currVal != -1) {
            dropdownValue.innerText = dropdownData[currVal][dropdownName];
        } else if (Number.isInteger(currVal) && currVal == -1) {
            dropdownValue.innerText = `Tất cả ${name}`;
        }
        else {
            dropdownValue.innerText = '';
        }
        for (var i = -1; i < dropdownData.length; i++) {
            if (i == -1 && i == currVal) {
                dropdownListHTML += `<li data-id=${-1} class="dropdown-item active"><i class="fas fa-check dropdown-icon dropdown-icon"></i> Tất cả ${name}</li>`;
            } else if (i == -1 && i != currVal) {
                dropdownListHTML += `<li data-id=${-1} class="dropdown-item"><i class="fas fa-check dropdown-icon dropdown-icon"></i> Tất cả ${name}</li>`;
            } else {
                if (i != currVal) {
                    dropdownListHTML += `<li data-id=${i} ${dropdownId}="${dropdownData[i][dropdownId]}" ${dropdownCode}="${dropdownData[i][dropdownCode]}" class="dropdown-item"><i class="fas fa-check dropdown-icon"></i> ${dropdownData[i][dropdownName]} </li>`;
                } else {
                    dropdownListHTML += `<li data-id=${i} ${dropdownId}="${dropdownData[i][dropdownId]}" ${dropdownCode}="${dropdownData[i][dropdownCode]}" class="dropdown-item active"><i class="fas fa-check dropdown-icon"></i> ${dropdownData[i][dropdownName]} </li>`;
                }
            } 
        }

        dropdownList.innerHTML = dropdownListHTML;

        var items = dropdownList.querySelectorAll('.dropdown-item');

        items.forEach((item) => {
            item.addEventListener('click', () => {
                var dataId = item.getAttribute('data-id');
                currVal = dataId;
                dropdownValue.setAttribute('currVal', currVal);
                if (item.getAttribute('data-id') != -1) {
                    dropdownValue.setAttribute(dropdownId, item.getAttribute(dropdownCode));
                    dropdownValue.setAttribute(dropdownId, item.getAttribute(dropdownCode));
                }
                renderAPIAll();
            });
        });
    }
}

/******************************************************************
 * Hàm bao đóng để render ra nhiều dropdown (Không chứa tất cả vị trí) khác nhau (Rend từ API)
 * Author: NTDUNG (21/07/2021)
 * @param {element} dropdownValue 
 * @param {element} dropdownList 
 * @param {element} dropdownData 
 * @param {element} type 
 */
function renderDropdownAPI(dropdownValue, dropdownList, dropdownData, dropdown) {
    var dropdownName = dropdown + 'Name';
    var dropdownId = dropdown + 'Id';
    var dropdownCode = dropdown + 'Code'; 
    renderAPI();

    function renderAPI() {
        var currVal = parseInt(dropdownValue.getAttribute('currVal'));
        var dropdownListHTML = '';
        if (Number.isInteger(currVal)) {
            dropdownValue.innerText = dropdownData[currVal][dropdownName];
        }
        else {
            dropdownValue.innerText = '';
        }
        for (var i = 0; i < dropdownData.length; i++) {
            if (i != currVal) {
                dropdownListHTML += `<li data-id=${i} ${dropdownId}="${dropdownData[i][dropdownId]}" ${dropdownCode}="${dropdownData[i][dropdownCode]}" class="dropdown-item"><i class="fas fa-check dropdown-icon"></i> ${dropdownData[i][dropdownName]} </li>`;
            } else {
                dropdownListHTML += `<li data-id=${i} ${dropdownId}="${dropdownData[i][dropdownId]}" ${dropdownCode}="${dropdownData[i][dropdownCode]}" class="dropdown-item active"><i class="fas fa-check dropdown-icon"></i> ${dropdownData[i][dropdownName]} </li>`;
            } 
        }

        dropdownList.innerHTML = dropdownListHTML;

        var items = dropdownList.querySelectorAll('.dropdown-item');

        items.forEach((item) => {
            item.addEventListener('click', () => {
                var dataId = item.getAttribute('data-id');
                currVal = dataId;
                dropdownValue.setAttribute('currVal', currVal);
                dropdownValue.setAttribute(dropdownId, item.getAttribute(dropdownCode));
                dropdownValue.setAttribute(dropdownId, item.getAttribute(dropdownCode));
            
                renderAPI();
            });
        });
    }
}

// Xử lý sự kiện dropdown
document.querySelectorAll('.dropdown').forEach(function (dropdown) {

    // 1. Sự kiện click vào dropdown thì ẩn hiện danh sách phía dưới
    dropdown.addEventListener('click', function () {
        dropdown.classList.toggle('focus-dropdown');
        dropdown.querySelector('.dropdown-list').classList.toggle('show');
        dropdown.querySelector('.icon-down').classList.toggle('show');
    }); 

    // 2. Khi blur ra ngoài thì ẩn danh sách đi
    dropdown.addEventListener('blur', function() {
        dropdown.classList.remove('focus-dropdown');
        dropdown.querySelector('.dropdown-list').classList.remove('show');
        dropdown.querySelector('.icon-down').classList.remove('show');
    });

    // 3. khi ấn nút enter ở dropdown thì ẩn hiện danh sách
    dropdown.addEventListener('keydown', function(e) {
        if (e.code == "Enter") {
            dropdown.classList.toggle('focus-dropdown');
            dropdown.querySelector('.dropdown-list').classList.toggle('show');
            dropdown.querySelector('.icon-down').classList.toggle('show');
        }
    });

    // 4. Khi ấn nút mũi tên lên xuống ở dropdown thì chọn vào danh sách phía dưới
});