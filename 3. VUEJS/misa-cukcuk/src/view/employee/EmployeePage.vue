<template lang="">
	<div id="container">
		<EmployeeControl
			@changeInputSearch="changeInputSearch($event)"
		/>
		<div id="content">
			<EmployeeTable
				:urlAPI="urlAPI"
				:tableStyle="tableStyle"
				:indexBegin="indexBegin"
				@changeTotalRecord="changeTotalRecord($event)"
				@changeTotalPage="changeTotalPage($event)"
			/>
			<EmployeePagination
				:totalPage="totalPage"
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
	import { EventBus} from '../../main'

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
				totalPage: 18,
				currPage: 1,
                pageNumDisplay: 4, 
                currOption: 2,
				searchMessage: 'nv',
				departmentId: '',
				positionId: '',
                optionPaging: [
                    {value: 10, label: 'Số nhân viên 10/trang'},
                    {value: 20, label: 'Số nhân viên 20/trang'},
                    {value: 30, label: 'Số nhân viên 30/trang'},
                    {value: 40, label: 'Số nhân viên 40/trang'},
                    {value: 50, label: 'Số nhân viên 50/trang'}
                ]
			}	
		},
		mounted() {
			EventBus.$on('filterEmployee', data => {
				this.departmentId = data['Department'];
				this.positionId = data['Position'];
			});
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
				this.currPage = 1;
			},
			/**
			 * Bắt sự kiện thay đổi tổng số trang 
			 * CreatedBy: NTDUNG (10/08/2021)
			 * @param {number} totalRecord
			 */
			changeTotalPage(totalPage) {
				this.totalPage = totalPage;
			},
			/**
			 * Bắt sự kiện thay đổi tổng số bản ghi
			 * CreatedBy: NTDUNG (10/08/2021)
			 * @param {number} totalRecord
			 */
			changeTotalRecord(totalRecord) {
				this.totalRecord = totalRecord;
			},
			/**
			 * Bắt sự kiện thay đổi ô input tìm kiếm 
			 * CreatedBy: NTDUNG (10/08/2021)
			 * @param {string} searchMessage
			 */
			changeInputSearch(searchMessage) {
				if (searchMessage == '') {
					this.searchMessage = 'nv';
				} else {
					this.searchMessage = searchMessage;
				}
			},
			
			
		},
		computed: {	
			/**
			 * Tính toán đường dẫn API theo các thông tin tham số đưa vào 
			 * CreatedBy: NTDUNG (11/08/2021)
			 */
			urlAPI() {
				var departmentQuery = this.departmentId != '' ? `departmentId=${this.departmentId}` : '';
				var positionQuery = this.positionId != '' ? `positionId=${this.positionId}` : '';
				return `http://cukcuk.manhnv.net/v1/Employees/employeeFilter
				?pageSize=${this.optionPaging[this.currOption]['value']}
				&&pageNumber=${this.currPage}&&employeeFilter=${this.searchMessage}
				&&${departmentQuery}&&${positionQuery}`;	
			},
			/**
			 * Chỉ số bắt đầu của bảng đổ dữ liệu
			 * CreatedBy: NTDUNG (11/08/2021)
			 */
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
<style>
	@import url('../../css/common/container.css');
</style>
