<template lang="">
    <div>
        <span 
            style="display: block" 
            class="popup-infor__label"
            v-html="requiredAssign"
            ></span>
        <input
            :type="inputType"
            class="popup-infor__input"
            :class="{'text-align-right': haveUnit}"
            :style="{width: widthCalc, 'padding-right': haveUnit ? '60px' : '0'}"
            :value="formatInputValue"
            @blur="validateInput($event, 'event')"
            @focus="inputOnFocus($event)"
            @keydown="inputOnKeydown($event)"
        />
        <span class="input-unit" v-if="haveUnit">(VNĐ)</span>
    </div>
</template>
<script>
import { EventBus } from "../../main";

export default {
	name: "BaseInput",
	data() {
		return {
			regEmail:
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			regPhone: /^\D*(\d\D*){9,14}$/,
		};
	},
	props: {
		inputName: {
			type: String,
			default: "",
		},
		alone: {
			type: Boolean,
			default: false,
		},
		required: {
			type: Boolean,
			default: false,
		},
		inputType: {
			type: String,
			default: "text",
		},
		inputValue: {
			type: String,
			default: "",
		},
		validateField: {
			type: String,
			default: "",
		},
		haveUnit: {
			type: Boolean,
			default: false,
		},
		formatField: {
			type: String,
			default: "",
		},
	},
	created() {
		EventBus.$on("validateEmployeeInput", () => {
			let input = this.$el.querySelector("input");
			this.validateInput(input, "input");
		});
	},
	methods: {
		/**
		 * Validate các dữ liệu đã nhập ở phía input
		 * Author: NTDUNG (02/08/2021)
		 * @param {event, element} event
		 * @param {string} type
		 */
		validateInput(event, type) {
			var input;
			if (type == "event") {
				input = event.target;
				if (event.relatedTarget && event.relatedTarget.tagName == "BUTTON")
					return;
			} else if (type == "input") {
				input = event;
			}

			if (this.inputType == "text") {
				// Validate các trường bắt buộc, email, số điện thoại
				let inputValue = input.value;
				if (this.required && inputValue == "") {
					console.log("you must fill this field");
					input.classList.add("invalid-input");
					return;
				}
				switch (this.validateField) {
					case "email":
						if (this.regEmail.test(input.value)) {
							console.log("valid email");
							this.$emit("changeInputValue", inputValue);
						} else {
							input.classList.add("invalid-input");
							console.log("invalid email");
						}
						break;
					case "phone":
						if (this.regPhone.test(input.value)) {
							console.log("valid phone");
							this.$emit("changeInputValue", inputValue);
						} else {
							input.classList.add("invalid-input");
							console.log("invalid phone");
						}
						break;
					default:
				}
			} else if (this.inputType == "date") {
				if (input.value != "") {
					this.$emit("changeInputValue", input.value + "T00:00:00");
				}
			}
		},
		/**
		 * Khi focus vào ô input thì bỏ lớp cảnh báo đi
		 * Author: NTDUNG (03/08/2021)
		 * @param {event} event
		 */
		inputOnFocus(event) {
			event.target.classList.remove("invalid-input");
		},
		/**
		 * Sự kiện nhập vào (ấn bàn phím) của input
		 * Author: NTDUNG (03/08/2021)
		 * @param {event} event
		 */
		inputOnKeydown(event) {
			if (this.formatField == "Salary") {
				let key = event.key.charCodeAt();
				if (
					!(
						(key >= 48 && key <= 57) ||
						event.key == "Backspace" ||
						event.key == "ArrowRight" ||
						event.key == "ArrowLeft"
					)
				) {
					event.preventDefault();
				} else {
                    let inputValue = event.target.value.replaceAll('.', '');
                    if (inputValue != '')  {
                        event.target.value = parseInt(inputValue).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    } else {
                        if (event.key != 'Backspace' || event.key != 'ArrowLeft' || event.key != 'ArrowRight') {
                            event.target.value += event.key;
                        }
                    }
                } 
			}
		},
	},
	computed: {
		/**
		 * Tính toán width với 2 trường hợp trong form
		 * Author: NTDUNG (02/08/2021)
		 * @returns {string}
		 */
		widthCalc() {
			if (this.alone) {
				return "calc(50% - 5px)";
			} else {
				return "100%";
			}
		},
		/**
		 * Khi required thì thêm cặp ngoặc và dấu sao đỏ vào label
		 * Author: NTDUNG (02/08/2021)
		 * @returns {string}
		 */
		requiredAssign() {
			if (this.required) {
				return `${this.inputName} (<span class="text-red">*</span>)`;
			} else {
				return `${this.inputName}`;
			}
		},
		/**
		 * Format giá trị input khi là text hoặc date
		 * Author: NTDUNG (02/08/2021)
		 * @returns {string}
		 */
		formatInputValue() {
			if (this.inputType == "text") {
				return this.inputValue;
			} else if (this.inputType == "date") {
				let date = new Date(this.inputValue);
				let day = date.getDate();
				day = day < 10 ? "0" + day : day;
				let month = date.getMonth() + 1;
				month = month < 10 ? "0" + month : month;
				let year = date.getFullYear();
				return `${year}-${month}-${day}`;
			}
			return "";
		},
	},
	destroyed() {
		EventBus.$off("validateEmployeeInput");
	},
};
</script>
<style lang="">
    
</style>