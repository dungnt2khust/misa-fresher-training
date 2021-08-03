<template lang="">
	<div>
		<span style="display: block" class="combobox__label"> 
            {{ comboboxName }}
        </span>
		<div
			tabindex="0"
			id="combobox-gender"
			class="combobox combobox--gender"
			:class="{ show: comboboxState }"
		>
			<input
				@focus="comboboxState = true"
                @input="inputSeachOnInput($event)"
                v-model="inputValue"
                :placeholder="placeHolder"
				type="text"
				class="combobox__input combobox__input--gender"
			/>
			<div
                @click="cancelInputOnClick($event)"
                class="combobox__input-cancel">
				<i class="fas fa-times-circle"></i>
			</div>
			<div
				@click="comboboxDropdownOnClick($event)"
				class="combobox__dropdown combobox__dropdown--gender"
			>
				<i class="fas fa-chevron-down combobox__icon"></i>
			</div>
			<ul class="combobox__list combobox__list--gender">
				<li
					@click="itemOnClick(index)"
					v-for="(item, index) in comboboxData"
					:key="index"
					class="combobox__item"
					:class="{ 'combobox__item--active': index == currIdx }"
				>
					{{ item }}
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
            comboboxName: {
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
				currIdx: -1,
                inputValue: ''
			};
		},
		methods: {
            /**
             * Bắt sự kiện click vào từng option của combobox
             * Author: NTDUNG (02/08/2021)
             * @param {number} index
             */
			itemOnClick(index) {
				this.currIdx = index;
				this.comboboxState = false;
                this.inputValue = this.comboboxData[index];
			},
            /**
             * Bắt sự kiện click vào nút cancel trong ô input
             * Author: NTDUNG (02/08/2021)
             * @param {event} event
             */
            cancelInputOnClick(event) {
                let input = event.target.parentElement.parentElement.querySelector('input');
                input.focus();
                this.inputValue = '';
                let liElements = event.target.parentElement.parentElement.querySelectorAll('ul li');
                liElements.forEach((liElement) => {
                    liElement.style.display = 'block';
                });
            },
            /**
             * Sự kiện nhập vào ô tìm kiếm ở combobox 
             * Author: NTDUNG (02/08/2021)
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
             * Author: NTDUNG (02/08/2021)
             * @param {event} event
             */  
            comboboxDropdownOnClick(event) {
                this.comboboxState = !this.comboboxState;
                if (this.comboboxState) {
                    let input = event.target.parentElement.parentElement.querySelector('input');
                    input.focus();
                } else {
                    // if (!this.checkValueInput()) {
                    //     console.log(event.target);
                    // }
                }
            },
            /**
             * Kiểm tra giá trị hợp lệ khi nhập xong combobox bằng input
             * Author: NTDUNG (02/08/2021)
             */
            // checkValueInput() {
            //     return this.comboboxData.includes(this.inputValue);
            // }
		},
	};
</script>
<style>
	@import url("../../css/common/combobox.css");
</style>
