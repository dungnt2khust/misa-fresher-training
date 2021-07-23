
class Dropdown { 
    //#region [Hàm khởi tạo]
    constructor (dropdownValue, dropdownList, dropdown, type, url, dropdownData) {
        // Load dữ liệu đổ vào dropdown
        this.loadDataDropdown(dropdownValue, dropdownList, dropdown, type, url, dropdownData);
        // Tạo các sự kiện cho dropdown
        this.initDropdownEvents(dropdownList);
    }
    //#endregion

    /**
     * Khởi tạo các sự kiện cho dropdown
     * @param {element} dropdownList 
     */
    initDropdownEvents(dropdownList) {
        try {
            var dropdownElement = dropdownList.parentElement; 
            // Xử lý sự kiện dropdown
            // 1. Sự kiện click vào dropdown thì ẩn hiện danh sách phía dưới
            dropdownElement.addEventListener('click', function () {
                dropdownElement.classList.toggle('focus-dropdown');
                dropdownList.classList.toggle('show');
                dropdownElement.querySelector('.icon-down').classList.toggle('show');
            }); 

            // 2. Khi blur ra ngoài thì ẩn danh sách đi
            dropdownElement.addEventListener('blur', function() {
                dropdownElement.classList.remove('focus-dropdown');
                dropdownList.classList.remove('show');
                dropdownElement.querySelector('.icon-down').classList.remove('show');
            });

            // 3. khi ấn nút enter ở dropdown thì ẩn hiện danh sách
            dropdownElement.addEventListener('keydown', function(e) {
                if (e.code == "Enter") {
                    dropdownElement.classList.toggle('focus-dropdown');
                    dropdownList.classList.toggle('show');
                    dropdownElement.querySelector('.icon-down').classList.toggle('show');
                }
            });
            // 4. Khi ấn nút mũi tên lên xuống ở dropdown thì chọn vào danh sách phía dưới    
        } catch (error) {
            console.log(error) ;
        } 
    }

    /**
     * Call API lấy dữ liệu đổ vào dropdown
     * Author: NTDUNG (23/07/2021)
     * @param {element} dropdownValue: là thẻ chứa thông tin hiên thị giá trị hiện tại của dropdown
     * @param {element} dropdownList: là danh sách chứa những lựa chọn người dùng có thể chọn
     * @param {string} dropdown: là tên dropdown muốn rend ra
     * @param {string} type: là kiểu dropdown mong muốn (FIX: Dữ liệu fix cứng, FILTER: Có thêm cả lựa chọn TẤT CẢ, NORMAL: Các lựa chọn bình thường)
     * @param {string} url: là link API để rend ra các phòng ban khác nhau
     * @param {array} dropdownData: là dữ liệu đổ vào khi muốn fix cứng dữ liệu
     */
    loadDataDropdown(dropdownValue, dropdownList, dropdown, type, url, dropdownData) { 
        try {
            if (type == 'FIX') {
                this.renderDropdown(dropdownValue, dropdownList, dropdownData);
            } else {
                $.ajax({
                    url: url,
                    method: 'GET'
                }).done((res) => {
                    // Render các dropdown phòng ban
                    if (type == 'FILTER') {
                        this.renderDropdownAPIAll(dropdownValue, dropdownList, res, dropdown);
                    } else if (type == 'NORMAL') {
                        this.renderDropdownAPI(dropdownValue, dropdownList, res, dropdown);
                    }
                    toastMessage('success', `Lấy dữ liệu ${dropdown} thành công`, 5000);
                }).fail(function (res) {
                    console.log('fail to get department');
                    toastMessage('error', `Lấy dữ liệu ${dropdown} thất bại`, 5000);
                });
            }  
        } catch (error) {
            toastMessage('error', `Lấy dữ liệu ${dropdown} thất bại`, 5000);
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
    renderDropdownAPIAll(dropdownValue, dropdownList, dropdownData, dropdown) {
        try {
            var dropdownName = dropdown + 'Name';
            var dropdownId = dropdown + 'Id';
            var dropdownCode = dropdown + 'Code';
            var name = dropdown == 'Department' ? 'phòng ban' : 'vị trí';
            dropdownValue.setAttribute('currVal', "-1");
            renderAPIAll();
        } catch (error) {
            console.log(error);
        } 

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
    renderDropdownAPI(dropdownValue, dropdownList, dropdownData, dropdown) {
        try {
            var dropdownName = dropdown + 'Name';
            var dropdownId = dropdown + 'Id';
            var dropdownCode = dropdown + 'Code'; 
            renderAPI();   
        } catch (error) {
            console.log(error) ;
        }
        
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

    /*******************************************************************************
     * Hàm bao đóng để render cho nhiều dropdown khác nhau (fix cứng dữ liệu)
     * Author: NTDUNG (21/07/2021)
     * @param {element} dropdownValue 
     * @param {element} dropdownList 
     * @param {element} dropdownData 
     */
    renderDropdown(dropdownValue, dropdownList, dropdownData) {
        try { 
            render();
        } catch (error) {
            console.log(error) ;
        }

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
}