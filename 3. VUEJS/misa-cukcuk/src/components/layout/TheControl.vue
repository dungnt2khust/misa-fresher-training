<template lang="">
	<div id="container__control">
		<div class="container__header-left">
			<span class="table-name">Danh sách nhân viên</span>
			<div class="table-filter">
				<div class="table-search" :class="{'focus-input': focusInput}">
					<div class="table-search__icon">
						<img src="../../assets/icon/search.png" alt="" />
					</div>
					<input
						@focus="focusInput = true"
						@blur="focusInput = false"
						@change="inputSearchOnChange($event)"
						tabindex="1"
						class="table-search__input"
						placeholder="Tìm theo mã, họ tên hoặc số điện thoại"
						type="text"
					/>
				</div>
				<BaseCombobox
					style="margin-right: 7px;"
					@changeComboboxValue="changeComboboxValue($event)"
					placeHolder="Tất cả phòng ban"
					comboboxField="Department"
					:comboboxData="departmentFilterData"/>
				<BaseCombobox
					@changeComboboxValue="changeComboboxValue($event)"
					placeHolder="Tất cả vị trí"
					comboboxField="Position"
					:comboboxData="positionFilterData"/>	
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
	import BaseCombobox from '../base/BaseCombobox.vue'
	import axios from 'axios'
	import { EventBus } from "../../main"

	export default {
		name: "TheControl",
		data() {
			return {
				focusInput: false,
				filterData: {
					Department: '',
					Position: ''
				},
				// DEPARTMENT
				departmentFilterData: [],
				APIurl__DEPARTMENT: "http://cukcuk.manhnv.net/api/Department",
				dropdownDefaultVal__DEPARTMENT: "Tất cả phòng ban",
				dropdownName__DEPARTMENT: "Department",
				// POSITION
				positionFilterData: [],
				APIurl__POSITION: "http://cukcuk.manhnv.net/v1/Positions",
				dropdownDefaultVal__POSITION: "Tất cả vị trí",
				dropdownName__POSITION: "Position",
			};
		},
		mounted() {
			// Lấy dữ liệU phòng ban
			axios.get(this.APIurl__DEPARTMENT)
				.then(res => {
					this.departmentFilterData = res.data;
				})
				.catch(res => {
					console.log(res)
				});
			// Lấy dữ liệu vị trí
			axios.get(this.APIurl__POSITION)
				.then(res => {
					this.positionFilterData = res.data;
				})
				.catch(res => {
					console.log(res)
				});
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
			},
			/**
			 * Bắt sự kiện thay đổi ở ô input search
			 * CreatedBy: NTDUNG (10/08/2021)
			 * @param {event} event
			 */
			inputSearchOnChange(event) {
				this.$emit('changeInputSearch', event.target.value);
			},
			/**
			 * Bắt sự kiện combobox thay đổi
			 * CreatedBy: NTDUNG (11/08/2021)
			 * @param {data} 
			 */
			changeComboboxValue(data) {
				this.filterData[data.ComboboxField] = data.Value;
				EventBus.$emit('filterEmployee', this.filterData);
			}
		},
		computed: {	
		},
		components: {
			BaseCombobox
		},
	};
</script>
<style lang=""></style>
