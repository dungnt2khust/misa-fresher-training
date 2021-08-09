<template lang="">
	<label
        style="width: 200px"
		@blur="hideDropup()"
		@click="toggleDropup()"
		class="dropup"
		:class="{ 'dropup--show': dropupState }"
	>
		<div class="dropup-header-wrapper">
			<span class="dropup-value">
				{{ dropupValue }}
			</span>
			<i class="fas fa-chevron-up icon-up"></i>
		</div>
		<ul class="dropup-list">
			<li
				@click="activeItem(index)"
				v-for="(item, index) in dropupData"
				:class="{ 'dropup-item--active': currIdx == index }"
				:key="index"
				class="dropup-item"
			>
				{{ item }}
			</li>
		</ul>
	</label>
</template>
<script>
	export default {
		name: "BaseDropupFix",
		data() {
			return {
				currIdx: 1,
				dropupState: false,
				dropupData: ["Số nhân viên 50", "Số nhân viên 20", "Số nhân viên 10"],
			};
		},
		props: {
			// dropupData: Array
		},
		methods: {
			/**
			 * Bật tắt dropup khi click vào dropup
			 * CreatedBy: NTDUNG (09/08/2021)
			 */
			toggleDropup() {
				this.dropupState = !this.dropupState;
			},
			/**
			 * Tắt dropup khi blur dropup
			 * CreatedBy: NTDUNG (09/08/2021)
			 */
			hideDropup() {
				this.dropupState = false;
			},
			/**
			 * Khi click vào một option thì đặt lại giá trị hiện tại
			 * CreatedBy: NTDUNG (09/08/2021)
			 */
			activeItem(index) {
				this.currIdx = index;
			},
		},
		computed: {
			/**
			 * Tính giá trị hiện tại của Dropup
			 * CreatedBy: NTDUNG (09/08/2021)
			 * @returns {string} trả về chuỗi để đưa lên dropup
			 */
			dropupValue() {
				return this.dropupData[this.currIdx];
			},
		},
	};
</script>
<style>
	@import url("../../css/common/dropup.css");
</style>

// USAGE /** ADD FIELDS TO APPLY CSS AND PROPERTIES OF DROPDOWN
<BaseDropupFix
	:id="'dropup-restaurant'"
	:class="{ 'dropup--restaurant': true }"
	:dropupShow="dropupShow"
	:dropupData="dropupData"
	@toggleDropup="toggleDropup()"
/>
*/
