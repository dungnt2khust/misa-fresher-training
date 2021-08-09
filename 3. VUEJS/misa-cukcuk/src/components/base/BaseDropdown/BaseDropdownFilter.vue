<template lang="">
	<label
		@blur="hideDropdown()"
		@click="toggleDropdown()"
		class="dropdown"
		:class="{ 'dropdown--show': dropdownState }"
	>
		<div class="dropdown-header-wrapper">
			<span class="dropdown-value">
				{{ dropdownValue }}
			</span>
			<i class="fas fa-chevron-down icon-down"></i>
		</div>
		<ul class="dropdown-list">
			<li
				@click="activeItem(-1)"
				:class="{'dropdown-item--active': currIdx == -1 }"
				class="dropdown-item"
			>
				{{ dropdownDefaultVal }}
			</li>
			<li
				@click="activeItem(index)"
				v-for="(item, index) in dropdownData"
				:class="{'dropdown-item--active': currIdx == index }"
				:key="index"
				class="dropdown-item"
			>
				{{ item[dropdownName + "Name"] }}
			</li>
		</ul>
	</label>
</template>
<script>
	import axios from "axios";

	export default {
		name: "BaseDropdownFilter",
		data() {
			return {
				dropdownData: [],
				currIdx: -1,
				dropdownState: false,
			};
		},
		props: {
			APIurl: String,
			dropdownDefaultVal: String,
			dropdownName: String,
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
			getData() {
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
			 * Khi click vào một option thì đặt lại giá trị hiện tại
			 * CreatedBy: NTDUNG (28/07/2021)
			 */
			activeItem(currIdx) {
				this.currIdx = currIdx;
			},
		},
		computed: {
			/**
			 * Nếu chỉ số hiện tại bằng -1 thì trả về giá trị mặc định, lớn hơn thì trả về phần tử trong mảng
			 * CreatedBy: NTDUNG (28/07/2021)
			 * @returns {string} trả về chuỗi để đưa lên dropdown
			 */
			dropdownValue() {
				if (this.currIdx == -1) {
					return this.dropdownDefaultVal;
				} else {
					return this.dropdownData[this.currIdx][this.dropdownName + "Name"];
				}
			},
		},
	};
</script>
<style>
	@import url("../../../css/common/dropdown.css");
</style>
// USAGE /** ADD FIELDS TO APPLY CSS AND PROPERTIES OF DROPDOWN
<BaseDropdownFilter
	:id="'dropdown-restaurant'"
	:class="{ 'dropdown--restaurant': true }"
	:APIurl="APIurl"
	:dropdownState="dropdownState"
	:dropdownDefaultVal="dropdownDefaultVal"
	:dropdownName="dropdownName"
	@toggleDropdown="toggleDropdown()"
/>
*/
