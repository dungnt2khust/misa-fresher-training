<template lang="">
	<label
		@blur="hideDropdown()"
		@click="toggleDropdown()"
		class="dropdown"
		for="dropdown-input"
		:class="{ 'focus-dropdown': dropdownState }"
	>
		<div class="dropdown-header-wrapper">
			<span class="dropdown-value">
				{{ dropdownValue }}
			</span>
			<i class="fas fa-chevron-down icon-down"></i>
		</div>
		<ul class="dropdown-list" :style="{ display: dropdownState ? 'block' : 'none' }">
			<li
				@click="activeItem(index)"
				v-for="(item, index) in dropdownData"
				:class="{ active: currIdx == index }"
				:key="index"
				class="dropdown-item"
			>
				{{ item[dropdownField + "Name"] }}
			</li>
		</ul>
	</label>
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
		valueTranfer: {
			type: String,
			default: "",
		},
		dropdownField: {
			type: String,
			default: "",
		},
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
					console.log(this.dropdownData);
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
		activeItem(index) {
			this.currIdx = index;
			if (index != -1) {
				// Truyền Id mới
				EventBus.$emit("changeInputValue", {
					NewValue: this.dropdownData[index][this.dropdownField + 'Id'],
					InputField: this.dropdownField + 'Id',
				});
				// Truyền Name mới
				EventBus.$emit("changeInputValue", {
					NewValue: this.dropdownData[index][this.dropdownField + "Name"],
					InputField: this.dropdownField + "Name",
				});
				// Truyền Code mới
				EventBus.$emit("changeInputValue", {
					NewValue: this.dropdownData[index][this.dropdownField + "Code"],
					InputField: this.dropdownField + "Code",
				});
			}
		},
	},
	watch: {
		/**
		 * Theo dõi biến valueTranfer khi thay đổi thì reset index
		 * CreatedBy: NTDUNG (05/08/2021)
		 */
		valueTranfer: function() {
			this.currIdx = -1;
		}
	},
	computed: {
		/**
		 * Nếu chỉ số hiện tại bằng -1 thì trả về giá trị mặc định, lớn hơn thì trả về phần tử trong mảng
		 * CreatedBy: NTDUNG (28/07/2021)
		 * ModifiedBy: NTDUNG (05/08/2021)
		 * @returns {string} trả về chuỗi để đưa lên dropdown
		 */
		dropdownValue() {
			if (this.currIdx == -1) {
				if (this.valueTranfer !== '' && this.valueTranfer !== null) {
					var index = this.dropdownData.findIndex((item) => {
						return item[this.dropdownField + 'Id'] == this.valueTranfer;
					});
					this.activeItem(index);
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
	@import url("../../../css/common/dropdown.css");
</style>

// USAGE /** ADD FIELDS TO APPLY CSS AND PROPERTIES OF DROPDOWN
<BaseDropdown
	:id="'dropdown-restaurant'"
	:class="{ 'dropdown--restaurant': true }"
	:APIurl="APIurl"
	:dropdownShow="dropdownShow"
	:valueTranfer="valueTranfer"
	:dropdownField="dropdownField"
	@toggleDropdown="toggleDropdown()"
/>
*/
