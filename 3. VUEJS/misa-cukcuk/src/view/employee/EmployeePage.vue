<template lang="">
	<div id="container">
		<EmployeeControl
			@changeInputSearch="changeInputSearch($event)"
		/>
		<div class="container__main">
			<EmployeeTable
				:urlAPI="urlAPI"
				:tableStyle="tableStyle"
				:indexBegin="indexBegin"
				@changeTotalRecord="changeTotalRecord($event)"
				@changeTotalPage="changeTotalPage($event)"
			/>
			<EmployeePagination
				:pageNum="pageNum"
				:currPage="currPage"
				:pageNumDisplay="pageNumDisplay"
				:currOption="currOption"
				:optionPaging="optionPaging"
				:totalRecord="totalRecord"
				@changeCurrPage="changeCurrPage($event)"
				@changeCurrOption="changeCurrOption($event)"
			/>	
		</div>
	</div>
</template>
<script>
	import TheControl from '../../components/layout/TheControl.vue'
	import BaseTable from '../../components/base/BaseTable.vue'
	import BasePagination from '../../components/base/BasePagination.vue'

	export default {
		name: "TheContainer",
		data() {
			return { 
				tableStyle: [
					{HeaderName: 'Mã nhân viên', FieldName: 'EmployeeCode', Style: 0},
					{HeaderName: 'Họ và tên', FieldName: 'FullName', Style: 0},
					{HeaderName: 'Giới tính', FieldName: 'GenderName', Style: 0},
					{HeaderName: 'Ngày sinh', FieldName: 'DateOfBirth', Style: 1},
					{HeaderName: 'Số điện thoại', FieldName: 'PhoneNumber', Style: 0},
					{HeaderName: 'Email', FieldName: 'Email', Style: 0},
					{HeaderName: 'Chức vụ', FieldName: 'PositionName', Style: 0},
					{HeaderName: 'Phòng ban', FieldName: 'DepartmentName', Style: 0},
					{HeaderName: 'Mức lương cơ bản', FieldName: 'Salary', Style: 2},
					{HeaderName: 'Tình trạng công việc', FieldName: 'WorkStatus', Style: 2},
				],
				totalRecord: 0,
				pageNum: 18,
				currPage: 1,
                pageNumDisplay: 4, 
                currOption: 2,
				searchMessage: 'nv',
                optionPaging: [
                    {value: 20, label: 'Số nhân viên 20/trang'},
                    {value: 30, label: 'Số nhân viên 30/trang'},
                    {value: 40, label: 'Số nhân viên 40/trang'},
                    {value: 50, label: 'Số nhân viên 50/trang'}
                ]
			}	
		},
		methods: {
			/**
			 * Hàm xử lý sự kiện thay đổi sang trang hiển thị dữ liệu khác 
			 * CreatedBy: NTDUNG (10/08/2021)
			 * @param {number} newPage
			 */
			changeCurrPage(newPage) {
				this.currPage = newPage;
			},
			/**
			 * Hàm xử lý sự kiện thay đổi sang chế độ hiển thị khác 
			 * CreatedBy: NTDUNG (10/08/2021)
			 * @param {number} newOption
			 */
			changeCurrOption(newOption) {
				this.currOption = newOption;
			},
			changeTotalPage(totalPage) {
				this.pageNum = totalPage;
			},
			changeTotalRecord(totalRecord) {
				this.totalRecord = totalRecord;
			},
			changeInputSearch(data) {
				if (data == '') {
					this.searchMessage = 'nv';
				} else {
					this.searchMessage = data;
				}
			},
			
		},
		computed: {	
			urlAPI() {
				return `http://cukcuk.manhnv.net/v1/Employees/employeeFilter?pageSize=${this.optionPaging[this.currOption]['value']}&pageNumber=${this.currPage}&employeeFilter=${this.searchMessage}`;
			},
			indexBegin() {
				return (this.currPage - 1) * this.optionPaging[this.currOption]['value'] + 1;
			}
		},
		components: {
			EmployeeControl: TheControl,
			EmployeeTable: BaseTable,
			EmployeePagination: BasePagination
		},
	};
</script>
<style scoped></style>
