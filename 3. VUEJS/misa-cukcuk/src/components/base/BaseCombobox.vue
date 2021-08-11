<template lang="">
	<div>
		<div
			class="combobox"
            tabindex="10"
			:class="{'combobox--show': comboboxState, 'combobox--error': comboboxInvalid}"
		>
			<input
				@focus="inputSearchOnFocus($event)"
                @input="inputSeachOnInput($event)"
                @blur="inputSearchOnBlur($event)"
                v-model="inputValue"
                :placeholder="placeHolder"
				type="text"
				class="combobox__input"
			/>
			<div
                @click="cancelInputOnClick($event)"
                class="combobox__input-cancel">
				<i class="fas fa-times-circle"></i>
			</div>
			<div
				@click="comboboxDropdownOnClick($event)"
				class="combobox__dropdown"
			>
				<i class="fas fa-chevron-down combobox__icon"></i>
			</div>
			<ul class="combobox__list">
				<li
					@click="itemOnClick(index)"
					v-for="(item, index) in comboboxData"
					:key="index"
					class="combobox__item"
					:class="{ 'combobox__item--active': index == currIdx }"
				>
					{{ item[comboboxField + 'Name'] }}
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		name: "BaseCombobox",
        props: {
            comboboxData: {
                type: Array,
                default: function() {
                    return [];
                }
            },
            comboboxField: {
                type: String, 
                default: ''
            },
            placeHolder: {
                type: String,
                default: ''
            }
        },
		data() {
			return {
				comboboxState: false,
                comboboxInvalid: false,
				currIdx: -1,
                inputValue: ''
			};
		},
		methods: {
            /**
             * Bắt sự kiện click vào từng option của combobox
             * CreatedBy: NTDUNG (02/08/2021)
             * @param {number} index
             */
			itemOnClick(index) {
				this.currIdx = index;
				this.comboboxState = false
                if (index != -1) {
                    this.inputValue = this.comboboxData[index][this.comboboxField + 'Name'];
                    this.$emit('changeComboboxValue', {
                        ComboboxField: this.comboboxField,
                        Value: this.comboboxData[index][this.comboboxField + 'Id']
                    });
                }
            },
            /**
             * Bắt sự kiện click vào nút cancel trong ô input
             * CreatedBy: NTDUNG (02/08/2021)
             * @param {event} event
             */
            cancelInputOnClick(event) {
                let input = event.target.parentElement.parentElement.querySelector('input');
                input.focus();
                this.inputValue = ''; 
                this.resetListItem(event);
            },
            /**
             * Sự kiện nhập vào ô tìm kiếm ở combobox 
             * CreatedBy: NTDUNG (02/08/2021)
             * @param {event} event
             */
            inputSeachOnInput(event) {
                let inputValue = this.inputValue.toLowerCase().trim();
                let liElements = event.target.parentElement.querySelectorAll('ul li');
                liElements.forEach((liElement) => {
                    let liVal = liElement.innerText.toLowerCase().trim();
                    if (!liVal.includes(inputValue)) {
                        liElement.style.display = 'none';
                    } else {
                        liElement.style.display = 'block';
                    }
                });
            },
            /**
             * Bắt sự kiện click vào nút dropdown ở combobox 
             * CreatedBy: NTDUNG (02/08/2021)
             * @param {event} event
             */  
            comboboxDropdownOnClick(event) {
                this.comboboxState = !this.comboboxState;
                if (this.comboboxState) {
                    this.comboboxInvalid = false;
                    let input = event.target.parentElement.parentElement.querySelector('input');
                    input.focus();
                } else {
                    this.checkValueInput();
                }
            },
            /**
             * Sự kiện focus vào ô input
             * CreatedBy: NTDUNG (11/08/2021)
             * @param {event} event
             */
            inputSearchOnFocus(event) {
                this.comboboxState = true;
                this.comboboxInvalid = false;
                this.resetListItem(event);
            },
            /**
             * Sự kiện blur ra ngoài ô input
             * CreatedBy: NTDUNG (11/08/2021)
             * @param {event} event
             */
            inputSearchOnBlur(event) {
                if (event.relatedTarget === null)  {
                    this.comboboxState = false;
                    this.checkValueInput();
                }
            },
            /**
             * Đưa danh sách lựa chọn về trạng thái đầy đủ
             * CreatedBy: NTDUNG (11/08/2021)
             * @param {event} event sự kiện khi tác động vào input
             */
            resetListItem(event) {
                let liElements = event.target.parentElement.parentElement.querySelectorAll('ul li');
                liElements.forEach((liElement) => {
                    liElement.style.display = 'block';
                });
            },
            /**
             * Kiểm tra giá trị của input có hợp lệ hay không 
             * CreatedBy: NTDUNG (11/08/2021)
             * @returns {boolean} trả về true là đúng, false là sai
             */
            checkValueInput() {
                var foundIdx = this.comboboxData.findIndex((item) => {
                    return this.inputValue == item[this.comboboxField + 'Name'];
                });
                if (foundIdx == -1) {
                    this.itemOnClick(-1);
                    if (this.inputValue != '')
                        this.comboboxInvalid = true;
                    else { 
                        this.$emit('changeComboboxValue', {
                            ComboboxField: this.comboboxField,
                            Value: '' 
                        });
                    }
                } else {
                    this.itemOnClick(foundIdx);
                }
            } 
		},
        
	};
</script>
<style>
	@import url("../../css/common/combobox.css");
</style>
