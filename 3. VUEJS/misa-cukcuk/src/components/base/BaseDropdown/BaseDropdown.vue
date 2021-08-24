<template lang="">
	<div
		v-on="dropdownListeners"		
		class="dropdown"
		:tabindex="tabIndex"
		:class="{ 'dropdown--show': dropdownState, 'dropdown--focus':  dropdownFocus}"
	>
		<div class="dropdown__header"  >
			<span class="dropdown__value">
				{{ dropdownValue }}
			</span>
			<i class="fas fa-chevron-down dropdown__icon-down"></i>
		</div>
		<ul class="dropdown__list">
			<li
				@keydown.enter="selectItem(index)"
				@click="selectItem(index)"
				v-for="(item, index) in dropdownData"
				:class="{ 'dropdown__item--select': currIdx == index }"
				:key="index"
				class="dropdown__item"
			>
				{{ item[dropdownField + "Name"] }}
			</li>
		</ul>
	</div>
</template>
<script>
import {EventBus} from '../../../main'
import axios from "axios";

export default {
	name: "BaseDropdown",
	data() {
		return {
			dropdownData: [],
			currIdx: -1,
			dropdownState: false,
			dropdownFocus: false
		};
	},
	props: {
		APIurl: {
			type: String,
			default: "",
		},
		defaultValue: {
			type: String,
			default: "",
		},
		value: {
			type: String,
			default: "",
		},
		dropdownField: {
			type: String,
			default: "",
		},
		tabIndex: {
			type: Number,
			default: -1
		}
	},
	mounted() {
		// Lắng nghe sự kiện lấy dữ liệu dropdown
		EventBus.$on("getDropdownData", () => {
			this.getDropdownData();
		});
	},
	methods: {
		/**
		 * Bật tắt dropdown khi click vào dropdown
		 * CreatedBy: NTDUNG (28/07/2021)
		 */
		toggleDropdown() {
			this.dropdownState = !this.dropdownState;
		},
		/**
		 * Tắt dropdown khi blur dropdown
		 * CreatedBy: NTDUNG (28/07/2021)
		 */
		hideDropdown() {
			this.dropdownState = false;
		},
		/**
		 * Hàm lấy dữ liệu API và gán vào mảng dữ liệu
		 * CreatedBy: NTDUNG (28/07/2021)
		 */
		getDropdownData() {
			axios
				.get(this.APIurl)
				.then((res) => {
					this.dropdownData = res.data;
				})
				.catch((res) => {
					console.log(res);
				});
		},
		/**
		 * Khi click vào một phần option thì đặt lại giá trị hiện tại
		 * CreatedBy: NTDUNG (28/07/2021)
		 * ModifiedBy: NTDUNG (05/08/2021)
		 * @param {number} index chỉ số của option trong mảng
		 */
		selectItem(index) {
			this.currIdx = index;
			if (index != -1) {
				// Truyền Id mới
				this.$emit("changeDropdownValue", {
					Value: this.dropdownData[index][this.dropdownField + 'Id'],
					Field: this.dropdownField + 'Id',
				});
				// Truyền Name mới
				this.$emit("changeDropdownValue", {
					Value: this.dropdownData[index][this.dropdownField + "Name"],
					Field: this.dropdownField + "Name",
				});
				// Truyền Code mới
				this.$emit("changeDropdownValue", {
					Value: this.dropdownData[index][this.dropdownField + "Code"],
					Field: this.dropdownField + "Code",
				});
			}
		},
	},
	watch: {
		/**
		 * Theo dõi biến value khi thay đổi thì reset index
		 * CreatedBy: NTDUNG (05/08/2021)
		 */
		value: function() {
			this.currIdx = -1;
		}
	},
	computed: {
		dropdownListeners: function () {

			return Object.assign({}, this.$listeners, {
				blur: () => {
					this.dropdownFocus = false;
					this.hideDropdown();
				},
				click: () => {
					this.toggleDropdown();
				},
				focus: () => {
					this.dropdownFocus = true;
				},
				"keydown": (event) => {
					switch(event.key) {
						case "Enter":
							this.toggleDropdown();
							break;
						case "ArrowDown":
							if (this.currIdx == -1) {
								this.currIdx = 0;
							} else {
								if (this.currIdx == this.dropdownData.length - 1) {
									this.currIdx = 0;
								} else {
									this.currIdx++;
								}
							}
							this.$el.querySelectorAll("li")[this.currIdx].scrollIntoView();
							break;
						case "ArrowUp":
							if (this.currIdx == -1) {
								this.currIdx = this.dropdownData.length - 1;
							} else {
								if (this.currIdx == 0) {
									this.currIdx = this.dropdownData.length - 1;
								} else {
									this.currIdx--;
								}
							}
							this.$el.querySelectorAll("li")[this.currIdx].scrollIntoView();
							break;
					}
				}
			});
		},
		/**
		 * Nếu chỉ số hiện tại bằng -1 thì trả về giá trị mặc định, lớn hơn thì trả về phần tử trong mảng
		 * CreatedBy: NTDUNG (28/07/2021)
		 * ModifiedBy: NTDUNG (05/08/2021)
		 * @returns {string} trả về chuỗi để đưa lên dropdown
		 */
		dropdownValue() {
			if (this.currIdx == -1) {
				if (this.value !== '' && this.value !== null) {
					var index = this.dropdownData.findIndex((item) => {
						return item[this.dropdownField + 'Id'] == this.value;
					});
					this.selectItem(index);
					return index == -1 ? this.defaultValue : this.dropdownData[index][this.dropdownField + 'Name'];
				} else {
					return this.defaultValue;
				}
			} else {
				return this.dropdownData[this.currIdx][this.dropdownField + "Name"];
			}
		},
	},
};
</script>
<style>
	@import url("../../../css/base/dropdown.css");
</style>
