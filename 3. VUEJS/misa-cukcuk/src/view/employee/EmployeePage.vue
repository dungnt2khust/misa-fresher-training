<template lang="">
	<div id="container">
		<EmployeeControl/>
		<div class="container__main">
			<EmployeeTable
				:urlAPI="urlAPI"
				:tableStyle="tableStyle"
			/>
			<EmployeePagination/>	
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
				urlAPI: 'http://cukcuk.manhnv.net/v1/Employees',
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
				]
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
