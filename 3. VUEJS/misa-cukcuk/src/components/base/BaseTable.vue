<template lang="">
	<div class="table-wrapper">
		<table class="table-employee">
			<thead class="table-employee__head">
				<tr>
					<th class="table-employee__header" style="width: 40px">
						<input type="checkbox" class="table-employee__checkbox">
					</th>
					<th class="table-employee__header" style="width: 60px">#</th>
					<th v-for="(item, index) in tableStyle" :key="index" class="table-employee__header" :class="classAlignTable(item.Style)">
						{{ item.HeaderName }}
					</th>	
				</tr>
			</thead>
			<tbody class="table-employee__body">
				<tr
					@dblclick="tableRowOnDbClick($event)"
					v-for="(row, index) in tableData"
					:employeeId="row.EmployeeId"
					:key="index"
					class="table-employee__row"
				>
					<td>
						<input
							type="checkbox"
							class="table-employee__checkbox"
						/>
					</td>
					<td>{{ index + 1 }}</td>	
					<td v-for="(item, index) in tableStyle" :key="index" :class="classAlignTable(item.Style)">
						{{ formatDataTable(row, item.FieldName) }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import { EventBus } from "../../main";
import axios from "axios";

export default {
	name: "BaseTable",
	props: {
		urlAPI: {
			type: String,
			default: "",
		},
		tableStyle: {
			type: Array,
			default: function () {
				return [];
			},
		},
	},
	data() {
		return {
			tableData: [],
		};
	},
	created() {
		// Lắng nghe sự kiện load lại dữ liệu
		EventBus.$on("reloadTableData", () => {
			this.getTableData(false);
		});
	},
	mounted() {
		// Gọi đến hàm lấy dữ liệu từ API
		this.getTableData(true);
	},
	methods: {
		/**
		 * Lấy dữ liệu vào gán vào mảng lưu trữ
		 * Author: NTDUNG (31/07/2021)
		 * @param {boolean} toast nếu true thì toast, false thì không 
		 */
		getTableData(toast) {
			EventBus.$emit('ToastMessage', {type: 'warn', content: 'Đang tải dữ liệu. Vui lòng chờ', duration: 5000});
			axios
				.get(this.urlAPI)
				.then((res) => {
					this.tableData = res.data;
					if (toast) 
						EventBus.$emit('ToastMessage', {type: 'success', content: 'Tải dữ liệu thành công', duration: 5000});
				})
				.catch((res) => {
					console.log(res);
					EventBus.$emit('ToastMessage', {type: 'error', content: 'Tải dữ liệu thất bại. Vui lòng liên hệ MISA.', duration: 5000});
				});
		},
		/**
		 * Bắt sự kiện double click vào từng dòng trên table
		 * Author: NTDUNG (30/07/2021)
		 * @param {event} event
		 */
		tableRowOnDbClick(event) {
			var tableRowId = event.target.parentElement.getAttribute("employeeId");
			// Phát gọi đến sự kiện click vào từng dòng trên bảng
			EventBus.$emit("tableRowOnDbClick", tableRowId);
		},
		/**
		 * Format lại dữ liệu trong bảng
		 * Author: NTDUNG (28/07/2021)
		 * @param {object} dataRow
		 * @param {string} fieldName
		 * @returns {string}
		 */
		formatDataTable(dataRow, fieldName) {
			// Nếu là ngày tháng thì format lại
			if (fieldName.includes("Date")) {
				if (dataRow[fieldName] != "" && dataRow[fieldName] != null) {
					var date = new Date(dataRow[fieldName]);
					var day = date.getDate();
					day = day < 10 ? "0" + day : day;
					var month = date.getMonth() + 1;
					month = month < 10 ? "0" + month : month;
					var year = date.getFullYear();
					return `${day}/${month}/${year}`;
				} else {
					return "";
				}
			}
			// Các trường hợp còn lại trả về giá trị của các trường khác
			return dataRow[fieldName];
		},
		/**
		 * Gán các class căn chỉnh chữ cho bảng
		 * Author: NTDUNG (04/08/2021)
		 * @param {number} classIdx
		 */
		classAlignTable(classIdx) {
			switch (classIdx) {
				case 0:
					return "text-align-left";
				case 1:
					return "text-align-center";
				case 2:
					return "text-align-right";
				default:
					return "";
			}
		},
	},
};
</script>
<style lang=""></style>
