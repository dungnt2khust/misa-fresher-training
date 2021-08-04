<template lang="">
	<div id="container">
		<TheControl/>
		<div class="container__main">
			<BaseTable
				:urlAPI="urlAPI"
				:tableStyle="tableStyle"
				:numberTest="numberTest"
				:stringTest="stringTest"
			/>
			<BasePagination/>	
		</div>
	</div>
</template>
<script>
	import TheControl from '../layout/TheControl.vue'
	import BaseTable from '../base/BaseTable.vue'
	import BasePagination from '../base/BasePagination.vue'

	export default {
		name: "TheContainer",	
		data() {
			return {
				stringTest: 20,
				numberTest: 40,
				urlAPI: 'http://cukcuk-hungnguyen81.herokuapp.com/api/employee',
				tableStyle: [
					{HeaderName: 'Mã nhân viên', FieldName: 'EmployeeCode', Style: 0},
					{HeaderName: 'Họ và tên', FieldName: 'FullName', Style: 0},
					{HeaderName: 'Giới tính', FieldName: 'GenderName', Style: 0},
					{HeaderName: 'Ngày sinh', FieldName: 'DateOfBirth', Style: 1},
					{HeaderName: 'Số điện thoại', FieldName: 'PhoneNumber', Style: 1},
					{HeaderName: 'Email', FieldName: 'Email', Style: 0},
					{HeaderName: 'Vị trí', FieldName: 'PositionName', Style: 0},
					{HeaderName: 'Phòng ban', FieldName: 'DepartmentName', Style: 0},
					{HeaderName: 'Mức lương cơ bản', FieldName: 'Salary', Style: 2},
					{HeaderName: 'Tình trạng công việc', FieldName: 'WorkStatus', Style: 2},
				]
			}
		},
		components: {
			TheControl,
			BaseTable,
			BasePagination
		},
	};
</script>
<style scoped></style>
