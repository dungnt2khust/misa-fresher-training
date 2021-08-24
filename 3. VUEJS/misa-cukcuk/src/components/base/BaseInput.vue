<template lang="">
	<div class="input-wrapper">
		<span class="label">
			{{ label }} <span v-if="required">(<b class="text-red">*</b>)</span>
		</span>
		<input
			:tabindex="tabIndex"
			:type="type"
			class="input"
			:class="{'input--error': isError, 'input--half': inputHalf, 'input--unit': unit != '' }"
			:value="value"
			v-on="inputListeners"
		/>
		<span class="input__unit" v-if="unit != ''"> {{ unit }}</span>
		<!-- <span v-if="type == 'date'" class="input__value"> {{ inputValue }} </span> -->
		<span class="input__error" v-if="isError">
			{{ errorMsg }}
		</span>
	</div>
</template>
<script>
export default {
	name: "BaseInput",
	data() {
		return {
			errorMsg: "",
			isError: false,
			// inputValue: "dd/mm/yyyy"
		};
	},
	props: {
		label: {
			type: String,
			default: "",
		},
		required: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			default: "text",
		},
		value: {
			type: [String, Number],
			default: "",
		},
		field: {
			type: String,
			default: "",
		},
		tabIndex: {
			type: Number,
			default: -1,
		},
		inputHalf: {
			type: Boolean,
			default: false,
		},
		validateForm: {
			type: Boolean,
			default: false,
		},
		unit: {
			type: String,
			default: ""
		},
		formState: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		/**
		 * validate các ô input
		 * @param {string} value
		 * CreatedBy: NTDUNG (05/08/2021)
		 * ModifiedBy: NTDUNG (06/08/2021)
		 */
		validateInput(value) {
			console.log(value)
			if (value === null || value === "") {
				if (this.required) {
					this.errorMsg = "Trường này bắt buộc nhập";
					this.isError = true;
				}
			} else {
				switch (this.field) {
					case "Email":
						if (!this.validEmail(value)) {
							this.errorMsg = "Sai định dạng";
							this.isError = true;
						}
						break;
					case "PhoneNumber":
						if (!this.validPhone(value)) {
							this.errorMsg = "Sai định dạng";
							this.isError = true;
						}
						break;
					default:
				}
			}
		},
		/**
		 * validate email đúng định dạng
		 * @param {String} email xâu email người dùng nhập vào
		 * @returns {Boolean} true nếu đúng định dạng
		 * CreatedBy: NTDUNG (05/05/2021)
		 * ModifiedBy: NTDUNG (05/05/2021)
		 */
		validEmail: function (email) {
			var regEmail =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return regEmail.test(email);
		},
		/**
		 * validate số điện thoại đúng định dạng
		 * @param {String} phone sdt người dùng nhập vào
		 * @returns {Boolean} true nếu đúng định dạng
		 * CreatedBy: NTDUNG (05/05/2021)
		 * ModifiedBy: NTDUNG (05/05/2021)
		 */
		validPhone: function (phone) {
			var regPhone = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
			return regPhone.test(phone);
		},
	},
	computed: {
		/**
		 * Lắng nghe sự kiện trên input
		 * CreatedBy: NTDUNG (05/08/2021)
		 */
		inputListeners: function () {
			var self = this;
			return Object.assign({}, this.$listeners, {
				input: function (event) {
					self.$emit("input", event.target.value);
					self.errors = "";
					self.isError = false;
				},
				blur: function (event) {
					self.validateInput(event.target.value);
				}
				// change: function(event) {
				// 	if (self.type == 'date') {
				// 		var date = new Date(event.target.value);
				// 		var day = date.getDate();
				// 		day = day < 10 ? "0" + day : day;
				// 		var month = date.getMonth() + 1;
				// 		month = month < 10 ? "0" + month : month;
				// 		var year = date.getFullYear();
				// 		self.inputValue = `${day}/${month}/${year}`;
				// 	}

				// }
			});
		},
		// formatInputData() {
		// 	if (this.field == "Salary") {
		// 		return this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
		// 	}
		// 	return this.value;
		// }
	},
	watch: {
		validateForm: function () {
			this.validateInput(this.value);
		},
		formState: function(value) {
			if (value) {
				this.isError = false;
			}
		}
	},
};
</script>
<style>
	@import url("../../css/base/input.css");
</style>
