<template lang="">
    <div>
        <span 
            style="display: block" 
            class="popup-infor__label"
            v-html="requiredAssign"
            ></span>
        <input
			:title="title"
			:tabindex="tabIndex"
            :type="inputType"
            class="popup-infor__input"
            :class="{'text-align-right': haveUnit}"
            :style="{width: widthCalc, 'padding-right': haveUnit ? '60px' : '0'}"
            :value="formatInputValue"
            @blur="validateInput($event, 'event')"
            @focus="inputOnFocus($event)"
            @keyup="inputOnkeyup($event)"
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
			regPhoneNumber: /^\D*(\d\D*){9,14}$/,
		};
	},
	props: {
		inputLabel: {
			type: String,
			default: "",
		},
		inputAlone: {
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
		valueTranfer: {
			type: [String, Number],
			default: "",
		},
		inputField: {
			type: String,
			default: "",
		},
		haveUnit: {
			type: Boolean,
			default: false,
		},
		tabIndex: {
			type: Number,
			default: -1
		},
		title: {
			type: String,
			default: ""
		}
	},
	created() {
		/**
		 * Lắng nghe sự kiện validate input
		 */
		EventBus.$on("validateEmployeeInput", () => {
			let inputElement = this.$el.querySelector("input");
			this.validateInput(inputElement, "input");
		});
	},
	methods: {
		/**
		 * Validate các dữ liệu đã nhập ở phía input
		 * CreatedBy: NTDUNG (02/08/2021)
		 * ModifiedBy: NTDUNG (11/08/2021)
		 * @param {event, element} inputParam bắt trong 2 trường hợp input on blur
		 * và bấm nút ở form nên tham số truyền vào có 2 kiểu
		 * @param {string} type
		 */
		validateInput(inputParam, type) {
			var inputElement;
			if (type == "event") {	
				inputElement = inputParam.target;
				if (inputParam.relatedTarget != null) {
					if (inputParam.relatedTarget.tagName == "BUTTON") {
						return true;
					}
				}	
			} else if (type == "input") {
				inputElement = inputParam;
			}

			// Validate các trường bắt buộc và validate các trường đặc biệt như email, số điện thoại
			if (
				this.validateRequired(this.inputField, inputElement) &&
				this.validateSpecialField(this.inputField, inputElement)
			) {
				// Khi đã validate đủ thì cho phép thay đổi giá trị input (thay đổi thông tin phía form)
				if (this.inputType == "text") {
					switch (this.inputField) {
						case 'Salary':
							this.changeInputValue(parseInt(inputElement.value.replaceAll('.', '')), this.inputField);
							break;
						case 'PersonalTaxCode':
							if (inputElement.value == "") {
								this.changeInputValue(null, this.inputField);
							} else {
								this.changeInputValue(parseInt(inputElement.value), this.inputField);
							}
							break;
						default: 
							this.changeInputValue(inputElement.value, this.inputField);
					}
				}
				else if (this.inputType == "date")
					this.changeInputValue(
						inputElement.value + "T00:00:00",
						this.inputField
					);
			}
		},
		/**
		 * Validate các trường input bắt buộc
		 * CreatedBy: NTDUNG (05/08/2021)
		 * @param {string} inputField tên trường input hiện tại
		 * @param {element} inputElement input hiện tại
		 */
		validateRequired(inputField, inputElement) {
			var valid = true;
			if (this.required && inputElement.value == "") {
				valid = false;
				// Border đỏ cho input không hợp lệ
				inputElement.classList.add("invalid-input");
				// Toast message báo lối
				switch (inputField) {
					case "EmployeeCode":
						this.toastMessage("error", "Bạn phải nhập Mã nhân viên", 5000);
						break;
					case "FullName":
						this.toastMessage("error", "Bạn phải nhập Họ tên", 5000);
						break;
					case "IdentityNumber":
						this.toastMessage(
							"error",
							"Bạn phải nhập Số CMTND/ Căn cước",
							5000
						);
						break;
					case "Email":
						this.toastMessage("error", "Bạn phải nhập Email", 5000);
						break;
					case "PhoneNumber":
						this.toastMessage("error", "Bạn phải nhập Số điện thoại", 5000);
						break;
					default:
						this.toastMessage("error", `Bạn phải nhập ${inputField}`, 5000);
				}
			}
			return valid;
		},
		/**
		 * Validate các trường input đặc biệt (email, phonenumber, ...)
		 * CreatedBy: NTDUNG (05/08/2021)
		 * @param {string} inputField tên trường input hiện tại
		 * @param {element} inputElement input hiện tại
		 */
		validateSpecialField(inputField, inputElement) {
			var valid = true;
			switch (inputField) {
				case "Email":
					if (!this.regEmail.test(inputElement.value)) {
						inputElement.classList.add("invalid-input");
						this.toastMessage("error", "Email không hợp lệ", 5000);
						valid = false;
					}
					break;
				case "PhoneNumber":
					if (!this.regPhoneNumber.test(inputElement.value)) {
						this.toastMessage("error", "Số điện thoại không hợp lệ", 5000);
						inputElement.classList.add("invalid-input");
						valid = false;
					}
					break;
			}
			return valid;
		},
		/**
		 * Khi focus vào ô input thì bỏ lớp cảnh báo đi
		 * CreatedBy: NTDUNG (03/08/2021)
		 * @param {event} event
		 */
		inputOnFocus(event) {
			event.target.classList.remove("invalid-input");
		},
		/**
		 * Sự kiện nhập vào (ấn bàn phím) của input
		 * CreatedBy: NTDUNG (03/08/2021)
		 * @param {event} event
		 */
		inputOnkeyup(event) {
			if (this.inputField == "Salary") {
				let key = event.key.charCodeAt();
				// Khi nút nhập vào là số (0-9), phím backspace và 2 phím mũi tên trái phải
				if (!((key >= 48 && key <= 57) || key == 66 || key == 65)) {
					event.preventDefault();
				} else {
					if (event.target.value != '') {	
						let inputValue = event.target.value.replaceAll('.', '');
						event.target.value = this.formatSalary(inputValue);
					}
				}
			}
		},
		/**
		 * Hàm toast message
		 * CreatedBy: NTDUNG (03/08/2021)
		 * @param {string} type
		 * @param {string} content
		 * @param {number} duration
		 */
		toastMessage(type, content, duration) {
			EventBus.$emit("ToastMessage", {
				type: type,
				content: content,
				duration: duration,
			});
		},
		/**
		 * Gọi sự kiện thay đổi input phía popup
		 * CreatedBy: NTDUNG (03/08/2021)
		 * @param {string, number}  newValue
		 * @param {string} inputField
		 */
		changeInputValue(newValue, inputField) {
			EventBus.$emit("changeInputValue", {
				NewValue: newValue,
				InputField: inputField,
			});
		},
		/**
		 * Format salary
		 * CreatedBy: NTDUNG (05/08/2021)
		 * @param {number, string} value
		 */
		formatSalary(value) {
			return value ? parseInt(value)
				.toFixed(0)
				.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") : '';
		},
	},
	computed: {
		/**
		 * Tính toán width với 2 trường hợp trong form
		 * CreatedBy: NTDUNG (02/08/2021)
		 * @returns {string}
		 */
		widthCalc() {
			if (this.inputAlone) {
				return "calc(50% - 5px)";
			} else {
				return "100%";
			}
		},
		/**
		 * Khi required thì thêm cặp ngoặc và dấu sao đỏ vào label
		 * CreatedBy: NTDUNG (02/08/2021)
		 * ModifiedBy: NTDUNG (05/08/2021)
		 * @returns {string}
		 */
		requiredAssign() {
			if (this.required) {
				return `${this.inputLabel} (<span class="text-red">*</span>)`;
			} else {
				return `${this.inputLabel}`;
			}
		},
		/**
		 * Format giá trị input khi là text hoặc date
		 * CreatedBy: NTDUNG (02/08/2021)
		 * @returns {string}
		 */
		formatInputValue() {
			if (this.inputType == "text") {
				if (this.inputField == "Salary") {
					return this.formatSalary(this.valueTranfer);
				}
				return this.valueTranfer;
			} else if (this.inputType == "date") {
				let date = new Date(this.valueTranfer);
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