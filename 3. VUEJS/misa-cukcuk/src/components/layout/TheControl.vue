<template lang="">
	<div id="container__control">
		<div class="container__header-left">
			<span class="table-name">Danh sách nhân viên</span>
			<div class="table-filter">
				<div class="table-search">
					<div class="table-search__icon">
						<img src="../../assets/icon/search.png" alt="" />
					</div>
					<input
						tabindex="1"
						class="table-search__input"
						placeholder="Tìm theo mã, họ tên hoặc số điện thoại"
						type="text"
					/>
				</div>
				<!-- DEPARTMENT -->
				<BaseDropdownFilter
					:id="'filter-department'"
					:class="{ 'table-filter__department': true }"
					:tabindex="2"
					:APIurl="APIurl__DEPARTMENT"
					:dropdownDefaultVal="dropdownDefaultVal__DEPARTMENT"
					:dropdownName="dropdownName__DEPARTMENT"
				/>
				<!-- POSITION -->
				<BaseDropdownFilter
					:id="'filter-position'"
					:class="{ 'table-filter__position': true }"
					:tabindex="3"
					:APIurl="APIurl__POSITION"
					:dropdownDefaultVal="dropdownDefaultVal__POSITION"
					:dropdownName="dropdownName__POSITION"
				/>
			</div>
		</div>
		<div class="container__header-right">
			<button @click="addEmployee" class="button button-addemployee">
				<div class="button__img">
					<img src="../../assets/icon/add.png" alt="" />
				</div>
				<span class="button__name"> Thêm nhân viên </span>
			</button>
			<div class="button-f5-delete">
				<button @click="deleteEmployees()" id="button-delete" class="button">
					<i class="fas fa-minus-square"></i> Xoá nhân viên
				</button>
				<div @click="reloadTableData" class="refresh">
					<img src="../../assets/icon/refresh.png" alt="" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import BaseDropdownFilter from "../base/BaseDropdown/BaseDropdownFilter.vue";
	import { EventBus } from "../../main"

	export default {
		name: "TheControl",
		data() {
			return {
				// DEPARTMENT
				APIurl__DEPARTMENT: "http://cukcuk.manhnv.net/api/Department",
				dropdownDefaultVal__DEPARTMENT: "Tất cả phòng ban",
				dropdownName__DEPARTMENT: "Department",
				// POSITION
				APIurl__POSITION: "http://cukcuk.manhnv.net/v1/Positions",
				dropdownDefaultVal__POSITION: "Tất cả vị trí",
				dropdownName__POSITION: "Position",
			};
		},
		methods: {
			/**
			 * Gọi sự kiện reload dữ liệu trong bảng
			 * CreatedBy: NTDUNG (31/07/2021)
			 */
			reloadTableData() {
				EventBus.$emit('reloadTableData');
			},
			/**
			 * Mở form thông tin chi tiết để nhập dữ liệu tạo mới
			 * CreatedBy: NTDUNG (31/07/2021)
			 */
			addEmployee() {
				EventBus.$emit('addEmployee');
			},
			/**
			 * Sự kiện nhấn vào nút xoá nhiều nhân viên
			 * CreatedBy: NTDUNG (07/08/2021)
			 */
			deleteEmployees() {
				EventBus.$emit('deleteEmployees');
			}
		},
		components: {
			BaseDropdownFilter,
		},
	};
</script>
<style lang=""></style>
