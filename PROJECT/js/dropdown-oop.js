
class Dropdown { 
    //#region [Hàm khởi tạo]
    /**
     * Hàm khởi tạo 
     * Author: NTDUNG (23/07/2021)
     * @param {element} dropdownElement: là dropdown đang cần đổ dữ liệu 
     * @param {string} dropdown: là tên dropdown muốn rend ra
     * @param {string} type: là kiểu dropdown mong muốn (FIX: Dữ liệu fix cứng, FILTER: Có thêm cả lựa chọn TẤT CẢ, NORMAL: Các lựa chọn bình thường)
     * @param {string} url: là link API để rend ra các phòng ban khác nhau
     * @param {array} dropdownData: là dữ liệu đổ vào khi muốn fix cứng dữ liệu
     */
    constructor (dropdownElement, dropdown, type, url, dropdownData) {
        // Gán giá trí cho các thuộc tính
        this.dropdownElement = dropdownElement;
        this.dropdownValue = dropdownElement.querySelector('.dropdown-value');
        this.dropdownList = dropdownElement.querySelector('.dropdown-list');
        this.dropdownIcon = dropdownElement.querySelector('.icon-down');
 
        this.dropdown = dropdown;
        this.type = type;
        this.url = url;
        this.dropdownData = dropdownData;
        // Load dữ liệu đổ vào dropdown
        this.loadDataDropdown();
        // Tạo các sự kiện cho dropdown
        this.initDropdownEvents();
    }
    //#endregion

    //#region [Hàm xử lý]
    /**
     * Khởi tạo các sự kiện cho dropdown
     * Author: NTDUNG (23/07/2021)
     */
    initDropdownEvents() {
        try {
            // Xử lý sự kiện dropdown
            // 1. Sự kiện click vào dropdown thì ẩn hiện danh sách phía dưới
            this.dropdownElement.addEventListener('click', () => {
                this.dropdownElement.classList.toggle('focus-dropdown');
                this.dropdownList.classList.toggle('show');
                this.dropdownIcon.classList.toggle('show');
            }); 

            // 2. Khi blur ra ngoài thì ẩn danh sách đi
            this.dropdownElement.addEventListener('blur', () => {
                this.dropdownElement.classList.remove('focus-dropdown');
                this.dropdownList.classList.remove('show');
                this.dropdownIcon.classList.remove('show');
            });

            // 3. khi ấn nút enter ở dropdown thì ẩn hiện danh sách
            this.dropdownElement.addEventListener('keydown', (e) => {
                if (e.code == "Enter") {
                    this.dropdownElement.classList.toggle('focus-dropdown');
                    this.dropdownList.classList.toggle('show');
                    this.dropdownElement.querySelector('.icon-down').classList.toggle('show');
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
     */
    loadDataDropdown() { 
        try {
            if (this.type == 'FIX') {
                this.renderDropdown();
            } else {
                $.ajax({
                    url: this.url,
                    method: 'GET'
                }).done((res) => {
                    // Render các dropdown phòng ban
                    this.dropdownData = res;
                    if (this.type == 'FILTER') {
                        this.renderDropdownAPIAll(this.dropdownValue, this.dropdownList, this.dropdownData);
                    } else if (this.type == 'NORMAL') {
                        this.renderDropdownAPI();
                    }
                    toastMessage('success', `Lấy dữ liệu ${this.dropdown} thành công`, 5000);
                }).fail(function (res) {
                    console.log('fail to get department');
                    toastMessage('error', `Lấy dữ liệu ${this.dropdown} thất bại`, 5000);
                });
            }  
        } catch (error) {
            toastMessage('error', `Lấy dữ liệu ${this.dropdown} thất bại`, 5000);
        } 
    }

    /******************************************************************
     * Hàm bao đóng để render ra nhiều dropdown (chứa tất cả vị trí) khác nhau (Rend từ API)
     * Author: NTDUNG (21/07/2021) 
     * @param {element} dropdownValue: là element để in ra thông tin hiện tại của dropdown
     * @param {element} dropdownList: là element để in ra các lựa chọn của người dùng 
     * @param {array} dropdownData: là dữ liệu để đổ vào dropdown
     */
    renderDropdownAPIAll(dropdownValue, dropdownList, dropdownData) {
        try {
            var dropdownName = this.dropdown + 'Name';
            var dropdownId = this.dropdown + 'Id';
            var dropdownCode = this.dropdown + 'Code';
            var name = this.dropdown == 'Department' ? 'phòng ban' : 'vị trí';
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
     */   
    renderDropdownAPI() {
        var dropdownName = this.dropdown + 'Name';
        var dropdownId = this.dropdown + 'Id';
        var dropdownCode = this.dropdown + 'Code'; 
        var currVal = parseInt(this.dropdownValue.getAttribute('currVal'));
        var dropdownListHTML = '';
        if (Number.isInteger(currVal)) {
            this.dropdownValue.innerText = this.dropdownData[currVal] == undefined ? '' : this.dropdownData[currVal][dropdownName];
        }
        else {
            this.dropdownValue.innerText = '';
        }
        for (var i = 0; i < this.dropdownData.length; i++) {
            if (i != currVal) {
                dropdownListHTML += `<li data-id=${i} ${dropdownId}="${this.dropdownData[i][dropdownId]}" ${dropdownCode}="${this.dropdownData[i][dropdownCode]}" class="dropdown-item"><i class="fas fa-check dropdown-icon"></i> ${this.dropdownData[i][dropdownName]} </li>`;
            } else {
                dropdownListHTML += `<li data-id=${i} ${dropdownId}="${this.dropdownData[i][dropdownId]}" ${dropdownCode}="${this.dropdownData[i][dropdownCode]}" class="dropdown-item active"><i class="fas fa-check dropdown-icon"></i> ${this.dropdownData[i][dropdownName]} </li>`;
            } 
        }

        this.dropdownList.innerHTML = dropdownListHTML;

        var items = this.dropdownList.querySelectorAll('.dropdown-item');

        items.forEach((item) => {
            item.addEventListener('click', () => {
                var dataId = item.getAttribute('data-id');
                currVal = dataId;
                this.dropdownValue.setAttribute('currVal', currVal); 
                this.dropdownValue.setAttribute(dropdownId, item.getAttribute(dropdownId)); 
                this.dropdownValue.setAttribute(dropdownCode, item.getAttribute(dropdownCode)); 
                this.renderDropdownAPI();
            });
        });
    }
    

    /*******************************************************************************
     * Hàm bao đóng để render cho nhiều dropdown khác nhau (fix cứng dữ liệu)
     * Author: NTDUNG (21/07/2021) 
     */ 
    renderDropdown() {
        var currVal = parseInt(this.dropdownValue.getAttribute('currVal'));
        var dropdownListHTML = '';
        if (Number.isInteger(currVal)) {
            this.dropdownValue.innerText = this.dropdownData[currVal] == undefined ? '' : this.dropdownData[currVal];
        } else {
            this.dropdownValue.innerText = '';
        }
        for (var i = 0; i < this.dropdownData.length; i++) {
            if (i != currVal) {
                dropdownListHTML += `<li data-id=${i} class="dropdown-item"><i class="fas fa-check dropdown-icon"></i> ${this.dropdownData[i]} </li>`;
            } else {
                dropdownListHTML += `<li data-id=${i} class="dropdown-item active"><i class="fas fa-check dropdown-icon"></i> ${this.dropdownData[i]} </li>`;
            }
        }

        this.dropdownList.innerHTML = dropdownListHTML;

        var items = this.dropdownList.querySelectorAll('.dropdown-item');

        items.forEach((item) => {
            item.addEventListener('click', () => {
                var dataId = item.getAttribute('data-id');
                currVal = dataId;
                this.dropdownValue.setAttribute('currVal', currVal);
                this.renderDropdown();
            });
        });
    }
    
    //#endregion
}