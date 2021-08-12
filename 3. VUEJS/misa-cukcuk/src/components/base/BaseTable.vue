<template lang="">
	<div class="table-wrapper">
		<table class="table-employee">
			<thead class="table-employee__head">
				<tr>
					<th class="table-employee__header" style="width: 40px">
						<input
							v-model="checkAll"
							type="checkbox"
							class="table-employee__checkbox"
						/>
					</th>
					<th class="table-employee__header" style="width: 60px">#</th>
					<th
						v-for="(item, index) in tableStyle"
						:key="index"
						class="table-employee__header"
						:class="classAlignTable(item.Style)"
					>
						{{ item.HeaderName }}
					</th>
				</tr>
			</thead>
			<tbody class="table-employee__body">
				<tr
					@dblclick="tableRowOnDbClick($event)"
					@click="tableRowOnClick(index)"
					v-for="(row, index) in tableData"
					:employeeId="row.EmployeeId"
					:key="index"
					class="table-employee__row"
					:class="{
						'table-employee__row--selected':
							employeeDeleteData.indexOf(row.EmployeeId) != -1,
					}"
				>
					<td>
						<input
							type="checkbox"
							class="table-employee__checkbox"
							:checked="employeeDeleteData.indexOf(row.EmployeeId) != -1"
						/>
					</td>
					<td>{{ indexBegin + index }}</td>
					<td
						v-for="(item, index) in tableStyle"
						:title="formatDataTable(row, item.FieldName)"
						:key="index"
						:class="classAlignTable(item.Style)"
					>
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
				default: function() {
					return [];
				},
			},
		},
		data() {
			return {
				employeeCode: '',
				employeeFullName: '',
				tableData: [],
				employeeDeleteData: [],
			};
		},
		created() {
			// Lắng nghe sự kiện load lại dữ liệu
			EventBus.$on("reloadTableData", () => {
				this.getTableData(this.urlAPI);
			});
		},
		mounted() {
			// Gán những dòng được check vào table
			// Gọi đến hàm lấy dữ liệu từ API
			this.getTableData(this.urlAPI);
			// Bắt sự kiện nút xoá nhiều nhân viên
			EventBus.$on("deleteEmployees", () => {
				if (this.employeeDeleteData.length) {
					if (this.employeeDeleteData.length != 1) {
						EventBus.$emit("showPopupDialog", {
							type: "error",
							title: "Xác nhân xoá dữ liệu",
							content: `Bạn có muốn xoá thông tin <b>${this.employeeDeleteData.length}</b> nhân viên này không`,
							continueBtn: "Xác nhận xoá",
							mode: "DELETEMULTI",
						});
						EventBus.$on("continueBtnOnClickDELETEMULTI", () => {
							EventBus.$emit("ToastMessage", {
								type: "warn",
								content: "Đang xoá. Vui lòng chờ",
								duration: 5000,
							});
							this.employeeDeleteData.forEach((employeeId) => {
								this.deleteEmployee(employeeId);
							});
							this.employeeDeleteData = [];
						});	
					} else {
						EventBus.$emit("showPopupDialog", {
							type: "error",
							title: "Xác nhân xoá dữ liệu",
							content: `Bạn có muốn xoá thông tin nhân viên <b>${this.employeeFullName} -
							 ${this.employeeCode}</b> này không?`,
							continueBtn: "Xác nhận xoá",
							mode: "DELETE",
						});
						EventBus.$on("continueBtnOnClickDELETE", () => {
							EventBus.$emit("ToastMessage", {
								type: "warn",
								content: "Đang xoá. Vui lòng chờ",
								duration: 5000,
							});
							this.deleteEmployee(this.employeeDeleteData[0]);
							this.employeeDeleteData = [];
						});		
					}	
				} else {
					EventBus.$emit("showPopupDialog", {
						type: "info",
						title: "Bạn chưa chọn dòng nào",
						content: `Hãy chọn những dòng mà bạn muốn xoá`,
					});
				}
			});
		},
		watch: {
			/**
			 * Kiểm tra khi check box chọn tất cả có thay đổi không
			 * CreatedBy: NTDUNG (10/08/2021)
			 * @param {boolean} newValue
			 */
			checkAll: function(newValue) {
				if (newValue) {
					console.log(true);
					this.employeeDeleteData = [];
					this.tableData.forEach((item) => {
						this.employeeDeleteData.push(item['EmployeeId']);
					});
				} else {
					this.employeeDeleteData = [];
				}
			},
			/**
			 * Kiểm tra nếu urlAPI thay đổi thì load lại dữ liệu
			 * CreatedBy: NTDUNG (10/08/2021)
			 * @param {string} newValue
			 */
			urlAPI: function(newValue) {
				this.getTableData(newValue);
			},
		},
		methods: {
			/**
			 * Lấy dữ liệu vào gán vào mảng lưu trữ
			 * CreatedBy: NTDUNG (31/07/2021)
			 * @param {string} urlAPI
			 */
			getTableData(urlAPI) {
				EventBus.$emit("ToastMessage", {
					type: "warn",
					content: "Đang tải dữ liệu. Vui lòng chờ",
					duration: 2000,
				});
				axios
					.get(urlAPI)
					.then((res) => {
						this.tableData = res.data.Data;
						this.$emit("changeTotalPage", res.data.TotalPage);
						this.$emit("changeTotalRecord", res.data.TotalRecord);
						EventBus.$emit("ToastMessage", {
							type: "success",
							content: "Tải dữ liệu thành công",
							duration: 2000,
						});
					})
					.catch((res) => {
						console.log(res);
						EventBus.$emit("ToastMessage", {
							type: "error",
							content: "Tải dữ liệu thất bại. Vui lòng liên hệ MISA.",
							duration: 5000,
						});
					});
			},
			/**
			 * Bắt sự kiện click vào từng dòng trên table
			 * CreatedBy: NTDUNG (30/07/2021)
			 * @param {event} event
			 */
			tableRowOnDbClick(event) {
				// Bỏ qua trường hợp click vào checkbox
				if (event.target.tagName != "INPUT") {
					var tableRowId = event.target.parentElement.getAttribute(
						"employeeId"
					);
					// Phát gọi đến sự kiện click vào từng dòng trên bảng
					EventBus.$emit("tableRowOnDbClick", tableRowId);
				}
			},
			/**
			 * Bắt sự kiện click vào từng dòng trên table (Lưu employeeid ở từng dòng vào set)
			 * CreatedBy: NTDUNG (05/08/2021)
			 * ModifiedBy: NTDUNG (11/08/2021)
			 * @param {number} index
			 */
			tableRowOnClick(index) {
				var employeeId = this.tableData[index]['EmployeeId'];
				this.employeeFullName = this.tableData[index]['FullName'];
				this.employeeCode = this.tableData[index]['EmployeeCode'];

				var foundIdx = this.employeeDeleteData.indexOf(employeeId);
				if (foundIdx != -1) {
					this.employeeDeleteData.splice(foundIdx, 1);
				} else {
					this.employeeDeleteData.push(employeeId);
				}
				this.employeeDeleteData;
			},
			/**
			 * Format lại dữ liệu trong bảng
			 * CreatedBy: NTDUNG (28/07/2021)
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
				} else if (fieldName == "Salary") {
					if (dataRow["Salary"] !== null) {
						return dataRow["Salary"]
							.toFixed(0)
							.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
					} else {
						return "";
					}
				} else {
					// Các trường hợp còn lại trả về giá trị của các trường khác
					return dataRow[fieldName];
				}
			},
			/**
			 * Gán các class căn chỉnh chữ cho bảng
			 * CreatedBy: NTDUNG (04/08/2021)
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
			/**
			 * Xoá thông tin nhân viên
			 * CreatedBy: NTDUNG (07/08/2021)
			 * @param {string} employeeId
			 */
			deleteEmployee(employeeId) {
				// Lắng nghe lựa chọn của popup dialog
				axios
					.delete(`http://cukcuk.manhnv.net/v1/Employees/${employeeId}`)
					.then(() => {
						this.getTableData(this.urlAPI);
					})
					.catch((res) => {
						console.log(res);
						EventBus.$emit("ToastMessage", {
							type: "error",
							content: "Xoá thất bại. Vui lòng liên hệ MISA",
							duration: 5000,
						});
					});
			}
		},
	};
</script>
<style lang=""></style>
