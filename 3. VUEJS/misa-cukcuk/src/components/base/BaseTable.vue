<template lang="">
	<div class="table-wrapper">
		<table class="table-employee">
			<thead class="table-employee__head">
				<tr>
					<th class="table-employee__header">#</th>
					<th fieldName="EmployeeCode" class="table-employee__header">
						Mã nhân viên
					</th>
					<th fieldName="FullName" class="table-employee__header">
						Họ và tên
					</th>
					<th fieldName="GenderName" class="table-employee__header">
						Giới tính
					</th>
					<th fieldName="DateOfBirth" class="table-employee__header">
						Ngày sinh
					</th>
					<th fieldName="PhoneNumber" class="table-employee__header">
						Điện thoại
					</th>
					<th fieldName="Email" class="table-employee__header">Email</th>
					<th fieldName="PositionName" class="table-employee__header">
						Chức vụ
					</th>
					<th fieldName="DepartmentName" class="table-employee__header">
						Phòng ban
					</th>
					<th fieldName="Salary" class="table-employee__header">
						Mức lương cơ bản
					</th>
					<th fieldName="WorkStatus" class="table-employee__header">
						Tình trạng công việc
					</th>
				</tr>
			</thead>
			<tbody class="table-employee__body">
				<tr
					@click="tableRowOnClick($event)"
					v-for="(row, index) in tableData"
					:employeeId="row.EmployeeId"
					:key="index"
					class="table-employee__row"
				>
					<td>
						<input
							type="checkbox"
							name=""
							id=""
							class="table-employee__checkbox"
						/>
					</td>
					<td fieldName="EmployeeCode">{{ row.EmployeeCode }}</td>
					<td fieldName="FullName">{{ row.FullName }}</td>
					<td fieldName="GenderName">{{ row.GenderName }}</td>
					<td fieldName="DateOfBirth">
						{{ formatDateTable(row.DateOfBirth) }}
					</td>
					<td fieldName="PhoneNumber">{{ row.PhoneNumber }}</td>
					<td fieldName="Email">{{ row.Email }}</td>
					<td fieldName="PositionName">{{ row.PositionName }}</td>
					<td fieldName="DepartmentName">{{ row.DepartmentName }}</td>
					<td fieldName="Salary">{{row.salary }}</td>
					<td fieldName="WorkStatus">{{ row.WorkStatus }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	import { EventBus } from '../../main';
    import axios from 'axios';

	export default {
		name: "BaseTable",
		data() {
			return {
				tableData: [],
			};
		},
        created() {
            axios
                .get('http://cukcuk.manhnv.net/v1/Employees')
                .then(res => {
                    this.tableData = res.data;
                })
                .catch(res => {
                    console.log(res)
                });
        },
		methods: { 	 
            /** 
             * Bắt sự kiện double click vào từng dòng trên table
             * Author: NTDUNG (30/07/2021)
             * @param {event} event
             */
            tableRowOnClick(event) {
                var tableRowId = event.target.parentElement.getAttribute('employeeId');
				EventBus.$emit("tableRowOnClick", tableRowId);
            },
            /**
             * Format lại dữ liệu ngày tháng cho dữ liệu trong bảng
             * Author: NTDUNG (28/07/2021)
             * @param {dateJSON} value
             * @returns {string} 
             */
			formatDateTable(value) {
				if (value != "" && value != null) {
					var date = new Date(value);
					var day = date.getDate();
					day = day < 10 ? "0" + day : day;
					var month = date.getMonth() + 1;
					month = month < 10 ? "0" + month : month;
					var year = date.getFullYear();
					return `${day}/${month}/${year}`;
				} else {
					return "";
				}
			},
		},
	};
</script>
<style lang=""></style>
