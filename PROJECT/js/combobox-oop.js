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
        
        this.comboboxName = combobox + 'Name';
        this.comboboxId = combobox + 'Id';
        this.comboboxCode = combobox + 'Code';

        
        this.currentValue = this.comboboxInput.value == '' ? 0 : parseInt(this.comboboxInput.value);
        // Load dữ liệu vào combobox
        this.loadComboboxData();
        // Tạo sự kiện cho combobox
        this.initComboboxEvents();
    }
    //#endregion

    //#region [Hàm xử lý]
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
            if (this.type == 'FIX') {
                this.renderInput();
            } else if (this.type = 'NORMAL') {
                this.renderInputAPI();
            } else if (this.type = 'FILTER') {
                this.renderInputAPIAll();
            }
        });

        // 4. Khi ấn vào nút x nhỏ trong combobox thì xoá nội dung trong input và show lại dropdown
        this.comboboxInputCancel.addEventListener('click', () => {
            this.comboboxInput.value = '';
            this.comboboxInput.focus();
            if (this.type == 'FIX') {
                this.renderInput();
            } else if (this.type = 'NORMAL') {
                this.renderInputAPI();
            } else if (this.type = 'FILTER') {
                this.renderInputAPIAll();
            }
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
            this.resolveInputValue();
        });

        // 7. Tắt tự động hoàn thành (danh sách gợi ý cho input)
        this.comboboxInput.setAttribute('autocomplete', 'off');

        // 8. Khi blur input thì ẩn dropdown
        this.comboboxElement.addEventListener('blur', () => {
            this.hideDropdown();
            this.resolveInputValue();
        });
    }

    /**
     * Hàm load dữ liệu vào combobox
     * Author: NTDUNG (23/07/2021)
     */
    loadComboboxData() {
        try {
            if (this.type == 'FIX') {
                this.renderDropdown();
            } else {
                $.ajax({
                    url: this.url,
                    method: 'GET'
                }).done ((res) => {
                    this.comboboxData = res;
                    if (this.type = 'NORMAL') {
                        this.renderDropdownAPI();
                    } else if (this.type = 'FILTER') {
                        this.renderInputAPIAll();
                    }
                }).fail((res) => {

                })
            }
        } catch (error) {
            console.log(error);
        } 
    }

    /**
     * Hàm render phần dropdown của combobox (Dữ liệu từ API) chứa lựa chọn tất cả
     * Author: NTDUNG (23/07/2021)
     */
    renderDropdownAPIAll() {
        try {
            var comboboxListHTML = '';
            for (var i = 0; i < this.comboboxData.length; i++) { 
                if (i == this.currentValue) {
                    comboboxListHTML += `<li data-id=${i} ${this.comboboxId}="${this.comboboxData[i][this.comboboxId]}" 
                                            ${this.comboboxCode}="${this.comboboxData[i][this.comboboxCode]}" 
                                            class="combobox__item combobox__item--active">
                                            <i class="fas fa-check combobox__check"></i> 
                                            ${this.comboboxData[i][this.comboboxName]}
                                        </li>`;
                } else {
                    comboboxListHTML += `<li data-id=${i} ${this.comboboxId}="${this.comboboxData[i][this.comboboxId]}" 
                                            ${this.comboboxCode}="${this.comboboxData[i][this.comboboxCode]}" 
                                            class="combobox__item">
                                            <i class="fas fa-check combobox__check"></i> 
                                            ${this.comboboxData[i][this.comboboxName]}
                                        </li>`;
                }
            }
            this.comboboxInput.value = this.comboboxData[this.currentValue][this.comboboxName];
            this.comboboxList.innerHTML = comboboxListHTML;

            var comboboxItems = this.comboboxList.querySelectorAll('li');

            comboboxItems.forEach((comboboxItem) => {
                comboboxItem.addEventListener('click', () => {
                    this.currentValue = comboboxItem.getAttribute('data-id');
                    this.renderDropdownAPI();
                });
            });
        } catch (error) {
            console.log(error);
        } 
    }

    /**
     * Hàm render phần dropdown của combobox (Dữ liệu từ API)
     * Author: NTDUNG (23/07/2021)
     */
    renderDropdownAPI() {
        try {
            var comboboxListHTML = '';
            for (var i = 0; i < this.comboboxData.length; i++) {
                if (i == this.currentValue) {
                    comboboxListHTML += `<li data-id=${i} ${this.comboboxId}="${this.comboboxData[i][this.comboboxId]}" 
                                            ${this.comboboxCode}="${this.comboboxData[i][this.comboboxCode]}" 
                                            class="combobox__item combobox__item--active">
                                            <i class="fas fa-check combobox__check"></i> 
                                            ${this.comboboxData[i][this.comboboxName]}
                                        </li>`;
                } else {
                    comboboxListHTML += `<li data-id=${i} ${this.comboboxId}="${this.comboboxData[i][this.comboboxId]}" 
                                            ${this.comboboxCode}="${this.comboboxData[i][this.comboboxCode]}" 
                                            class="combobox__item">
                                            <i class="fas fa-check combobox__check"></i> 
                                            ${this.comboboxData[i][this.comboboxName]}
                                        </li>`;
                }
            }
            this.comboboxInput.value = this.comboboxData[this.currentValue][this.comboboxName];
            this.comboboxList.innerHTML = comboboxListHTML;

            var comboboxItems = this.comboboxList.querySelectorAll('li');

            comboboxItems.forEach((comboboxItem) => {
                comboboxItem.addEventListener('click', () => {
                    this.currentValue = comboboxItem.getAttribute('data-id');
                    this.renderDropdownAPI();
                });
            });
        } catch (error) {
            console.log(error);
        } 
    }

    /**
     * Hàm render phần dropdown của combobox (Dữ liệu fix cứng)
     * Author: NTDUNG (21/07/2021)
     */
    renderDropdown() {
        var comboboxListHTML = '';
        for (var i = 0; i < this.comboboxData.length; i++) {
            if (i == this.currentValue) {
                comboboxListHTML += `<li data-id=${i} class="combobox__item combobox__item--active">
                                        <i class="fas fa-check combobox__check"></i> ${this.comboboxData[i]}
                                    </li>`;
            } else {
                comboboxListHTML += `<li data-id=${i} class="combobox__item">
                                        <i class="fas fa-check combobox__check"></i> ${this.comboboxData[i]}
                                    </li>`;
            }
        }
        this.comboboxInput.value = this.comboboxData[this.currentValue];
        this.comboboxList.innerHTML = comboboxListHTML;

        var comboboxItems = this.comboboxList.querySelectorAll('li');

        comboboxItems.forEach((comboboxItem) => {
            comboboxItem.addEventListener('click', () => {
                this.currentValue = comboboxItem.getAttribute('data-id');
                this.comboboxInput.setAttribute('genderid', this.currentValue);
                this.renderDropdown();
            });
        });
    }

    /**
     * Hàm render ra giá trị khi input được nhập (Dữ liệu từ API) chứa lựa chọn tất cả
     * Author: NTDUNG (23/07/2021)
    */
    renderInputAPIAll() {
        var comboboxListHTML = '';
        var inputValue = this.comboboxInput.value;
        var inputValueLowercase = inputValue.toLowerCase().trim();
        
        for (var i = 0; i < this.comboboxData.length; i++) {
            var comboboxDataLowerCase = this.comboboxData[i][this.comboboxName].toLowerCase().trim();
            if (comboboxDataLowerCase.includes(inputValueLowercase)) {
                if (i == this.currentValue) {
                    comboboxListHTML += `<li data-id=${i} ${this.comboboxId}="${this.comboboxData[i][this.comboboxId]}" 
                                            ${this.comboboxCode}="${this.comboboxData[i][this.comboboxCode]}" 
                                            class="combobox__item combobox__item--active">
                                            <i class="fas fa-check combobox__check"></i> 
                                            ${this.comboboxData[i][this.comboboxName]}
                                        </li>`;
                } else {
                    comboboxListHTML += `<li data-id=${i} ${this.comboboxId}="${this.comboboxData[i][this.comboboxId]}" 
                                            ${this.comboboxCode}="${this.comboboxData[i][this.comboboxCode]}" 
                                            class="combobox__item">
                                            <i class="fas fa-check combobox__check"></i> 
                                            ${this.comboboxData[i][this.comboboxName]}
                                        </li>`;
                }
            }
        }
        this.comboboxList.innerHTML = comboboxListHTML;

        var comboboxItems = this.comboboxList.querySelectorAll('li');

        comboboxItems.forEach((comboboxItem) => {
            comboboxItem.addEventListener('click', () => {
                this.currentValue = comboboxItem.getAttribute('data-id');
                this.renderDropdownAPI();
            });
        });
    }
    /**
     * Hàm render ra giá trị khi input được nhập (Dữ liệu từ API)
     * Author: NTDUNG (23/07/2021)
    */
    renderInputAPI() {
        var comboboxListHTML = '';
        var inputValue = this.comboboxInput.value;
        var inputValueLowercase = inputValue.toLowerCase().trim();
        
        for (var i = 0; i < this.comboboxData.length; i++) {
            var comboboxDataLowerCase = this.comboboxData[i][this.comboboxName].toLowerCase().trim();
            if (comboboxDataLowerCase.includes(inputValueLowercase)) {
                if (i == this.currentValue) {
                    comboboxListHTML += `<li data-id=${i} ${this.comboboxId}="${this.comboboxData[i][this.comboboxId]}" 
                                            ${this.comboboxCode}="${this.comboboxData[i][this.comboboxCode]}" 
                                            class="combobox__item combobox__item--active">
                                            <i class="fas fa-check combobox__check"></i> 
                                            ${this.comboboxData[i][this.comboboxName]}
                                        </li>`;
                } else {
                    comboboxListHTML += `<li data-id=${i} ${this.comboboxId}="${this.comboboxData[i][this.comboboxId]}" 
                                            ${this.comboboxCode}="${this.comboboxData[i][this.comboboxCode]}" 
                                            class="combobox__item">
                                            <i class="fas fa-check combobox__check"></i> 
                                            ${this.comboboxData[i][this.comboboxName]}
                                        </li>`;
                }
            }
        }
        this.comboboxList.innerHTML = comboboxListHTML;

        var comboboxItems = this.comboboxList.querySelectorAll('li');

        comboboxItems.forEach((comboboxItem) => {
            comboboxItem.addEventListener('click', () => {
                this.currentValue = comboboxItem.getAttribute('data-id');
                this.renderDropdownAPI();
            });
        });
    }

    /**
     * Hàm render ra giá trị khi input được nhập (Dữ liệu fix cứng)
     * Author: NTDUNG (21/07/2021)
    */
    renderInput() {
        var comboboxListHTML = '';
        var inputValue = this.comboboxInput.value;
        var inputValueLowercase = inputValue.toLowerCase().trim();
        
        for (var i = 0; i < this.comboboxData.length; i++) {
            var comboboxDataLowerCase = this.comboboxData[i].toLowerCase().trim();
            if (comboboxDataLowerCase.includes(inputValueLowercase)) {
                if (i == this.currentValue) {
                    comboboxListHTML += `<li data-id=${i} class="combobox__item combobox__item--active">
                                            <i class="fas fa-check combobox__check"></i> ${this.comboboxData[i]} 
                                        </li>`;
                } else {
                    comboboxListHTML += `<li data-id=${i} class="combobox__item">
                                            <i class="fas fa-check combobox__check"></i> ${this.comboboxData[i]}
                                        </li>`;
                }
            }
        }
        this.comboboxList.innerHTML = comboboxListHTML;

        var comboboxItems = this.comboboxList.querySelectorAll('li');

        comboboxItems.forEach((comboboxItem) => {
            comboboxItem.addEventListener('click', () => {
                this.currentValue = comboboxItem.getAttribute('data-id');
                this.renderDropdown();
            });
        });
    } 
    

    /**
     * Hàm xử lý khi người dùng nhập xong input (cảnh báo đỏ khi không hợp lệ)
     * Author: NTDUNG (21/07/2021) 
     */
    resolveInputValue() {
        var inputValue = this.comboboxInput.value;
        if (this.type == 'FIX') {
            var check = this.comboboxData.find(function (data) {
                return data == inputValue;
            });
        } else {
            var check = this.comboboxData.find((data) => {
                return data[this.comboboxName] == inputValue;
            });
        }
        if (check == undefined) {
            this.comboboxElement.classList.add('error');
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
    //#endregion 
}