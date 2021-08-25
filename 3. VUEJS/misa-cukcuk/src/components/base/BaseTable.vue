<template>
	<div class="table-wrapper" :class="{'table--loading': tableLoading}">
		<table class="table">
			<thead class="table__head">
				<tr>
					<!-- CHECK BOX HEADER -->
					<th class="table__head-checkbox">
						<input
							v-model="checkAll"
							type="checkbox"
							class="table__checkbox"
						/>
					</th>
					<!-- INDEX -->
					<th class="table__head-index">#</th>
					<th
						v-for="(item, index) in tableStyle"
						:key="index"
						:class="classAlignTable(item.Style)"
					>
						{{ item.HeaderName }}
					</th>
				</tr>
				<transition name="fade">
				<div class="table__loading">
					<img src="../../assets/img/loading.gif" alt="" class="table__loading-img">
				</div>
				</transition>
			</thead>
			<tbody class="table__body">
				<tr
					@dblclick="tableRowOnDbClick($event)"
					@click="tableRowOnClick(index)"
					v-for="(row, index) in tableData"
					:employeeId="row.EmployeeId"
					:key="index"
					class="table__row"
					:class="{
						'table__row--select':
							employeeDeleteData.indexOf(row.EmployeeId) != -1,
					}"
				>
					<td>
						<input
							type="checkbox"
							class="table__checkbox"
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
			indexBegin: {
				type: Number,
				default: -1
			}
		},
		data() {
			return {
				employeeCode: '',
				employeeFullName: '',
				tableData: [],
				employeeDeleteData: [],
				checkAll: false,
				tableLoading: false
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
						EventBus.$emit("showDialog", {
							type: "error",
							title: "Xác nhân xoá dữ liệu",
							content: `Bạn có muốn xoá thông tin <b>${this.employeeDeleteData.length}</b> nhân viên này không`,
							continueBtn: "Xác nhận xoá",
							mode: "DELETEMULTI",
						});
						EventBus.$on("continueBtnOnClickDELETEMULTI", () => {	
							this.employeeDeleteData.forEach((employeeId) => {
								this.deleteEmployee(employeeId);
							});
							EventBus.$emit("ToastMessage", {
								type: "success",
								content: "Xoá thành công",
								duration: 2000,
							});
							this.employeeDeleteData = [];
						});	
					} else {
						EventBus.$emit("showDialog", {
							type: "error",
							title: "Xác nhân xoá dữ liệu",
							content: `Bạn có muốn xoá thông tin nhân viên <b>${this.employeeFullName} -
							 ${this.employeeCode}</b> này không?`,
							continueBtn: "Xác nhận xoá",
							mode: "DELETE",
						});
						EventBus.$on("continueBtnOnClickDELETE", () => {
							this.deleteEmployee(this.employeeDeleteData[0]);
							this.employeeDeleteData = [];
							EventBus.$emit("ToastMessage", {
								type: "success",
								content: "Xoá thành công",
								duration: 2000,
							});
						});		
					}	
				} else {
					EventBus.$emit("showDialog", {
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
				// Bật loading
				this.tableLoading = true;
				// Gọi API lấy dữ liệU
				axios
					.get(urlAPI)
					.then((res) => {
						// Gán dữ liệu vào table
						this.tableData = res.data.Data;
						// Tắt loading
						this.tableLoading = false;
						// Gửi totalPage, totalRecord ra cho phân trang hiển thị
						this.$emit("changeTotalPage", res.data.TotalPage);
						this.$emit("changeTotalRecord", res.data.TotalRecord);	
					})
					.catch((res) => {
						console.log(res);
						// Thông báo khi xảy ra lỗi
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
<style>
	@import url('../../css/base/table.css');	
	.fade-enter {
		opacity: 0;
		transition: all 0.2s ease;
	}
	.fade-enter-active {
		opacity: 1;
	}
	.fade-leave {
		opacity: 1;
		transition: all 0.2s ease;
	}
	.fade-leave-active {
		opacity: 0;
	}
</style>
