<template lang="">
	<div
		class="popup-wrapper"
		:style="{ display: popupState ? 'block' : 'none' }"
	>
		<div class="popup-overlay-info"></div>
		<div class="popup-form-info">
			<div class="popup-header">
				<span class="popup-header__label">
					THÔNG TIN NHÂN VIÊN
				</span>
				<button @click="cancelPopup" class="popup-header__cancel"></button>
			</div>
			<div class="popup-body">
				<div class="popup-avatar">
					<label for="avatar-upload" class="popup-avatar__img"></label>
					<span class="popup-avatar__desc">
						(Vui lòng chọn ảnh có định dạng <br />
						<b>.jpg, .jpeg, .png, .gif.</b>
					</span>
					<input
						id="avatar-upload"
						style="display: none;"
						type="file"
					/>
				</div>
				<!-- POPUP INFORMATIONS -->
				<form class="popup-infor">
					<!-- COMMON INFORMATION -->
					<div class="popup-infor__common">
						<span class="popup-infor__title">A. THÔNG TIN CHUNG.</span>
						<div class="popup-infor__list">
							<!-- EMPLOYEE CODE -->
							<div class="popup-infor__item">
								<BaseInput
									:tabIndex="1"
									inputLabel="Mã nhân viên"
									:required="true"
									:valueTranfer="employeeData['EmployeeCode']"
									inputField="EmployeeCode"
								/>
							</div>
							<!-- FULL NAME -->
							<div class="popup-infor__item">
								<BaseInput
									:tabIndex="2"
									inputLabel="Họ và tên"
									:required="true"
									:valueTranfer="employeeData['FullName']"
									inputField="FullName"
								/>
							</div>
							<!-- DOB -->
							<div class="popup-infor__item">
								<BaseInput
									:tabIndex="3"
									inputLabel="Ngày sinh"
									inputType="date"
									:valueTranfer="employeeData['DateOfBirth']"
									inputField="DateOfBirth"
								/>
							</div>
							<!-- GENDER -->
							<div class="popup-infor__item">
								<span class="popup-infor__label"> Giới tính </span>
								<BaseDropdownFix
									:tabIndex="4"
									:dropdownData="genderData"
									dropdownField="Gender"
									defaultValue="Chọn giới tính"
									:valueTranfer="employeeData['Gender']"
								/>
							</div>
							<!-- ID CARD NUMBER -->
							<div class="popup-infor__item">
								<BaseInput
									:tabIndex="5"
									inputLabel=" Số CMTND/ Căn cước"
									:required="true"
									:valueTranfer="employeeData['IdentityNumber']"
									inputField="IdentityNumber"
								/>
							</div>
							<!-- RELEASE DATE -->
							<div class="popup-infor__item">
								<BaseInput
									:tabIndex="6"
									inputLabel="Ngày cấp"
									inputType="date"
									inputField="IdentityDate"
									:valueTranfer="employeeData['IdentityDate']"
								/>
							</div>
							<!-- RELEASE PLACE -->
							<div class="popup-infor__item noi-cap">
								<BaseInput
									:tabIndex="7"
									inputLabel="Nơi cấp"
									:inputAlone="true"
									inputField="IdentityPlace"
									:valueTranfer="employeeData['IdentityPlace']"
								/>
							</div>
							<!-- EMAIL -->
							<div class="popup-infor__item email">
								<BaseInput
									:tabIndex="8"
									inputLabel="Email"
									:required="true"
									:valueTranfer="employeeData['Email']"
									inputField="Email"
								/>
							</div>
							<!-- PHONE -->
							<div class="popup-infor__item">
								<BaseInput
									:tabIndex="9"
									inputLabel="Số điện thoại"
									:required="true"
									:valueTranfer="employeeData['PhoneNumber']"
									inputField="PhoneNumber"
								/>
							</div>
						</div>
					</div>
					<!-- WORKING INFORMATION -->
					<div class="popup-infor__working">
						<span class="popup-infor__title">B. THÔNG TIN CÔNG VIỆC.</span>
						<div class="popup-infor__list">
							<!-- POSITION -->
							<div class="popup-infor__item">
								<span class="popup-infor__label"> Vị trí </span>
								<BaseDropdown
									:tabIndex="10"
									:id="'dropdown-position'"
									:class="{ 'dropdown--position': true }"
									:APIurl="APIurl__POSITION"
									:valueTranfer="employeeData['PositionId']"
									defaultValue="Chọn vị trí"
									dropdownField="Position"
								/>
							</div>
							<!-- DEPARTMENT -->
							<div class="popup-infor__item">
								<span class="popup-infor__label"> Phòng ban </span>
								<BaseDropdown
									:tabIndex="11"
									:id="'dropdown-department'"
									:class="{ 'dropdown--department': true }"
									:APIurl="APIurl__DEPARTMENT"
									:valueTranfer="employeeData['DepartmentId']"
									defaultValue="Chọn phòng ban"
									dropdownField="Department"
								/>
							</div>
							<!-- TAX CODE -->
							<div class="popup-infor__item">
								<BaseInput
									:tabIndex="12"
									inputLabel="Mã số thuế cá nhân"
									inputField="PersonalTaxCode"
									:valueTranfer="employeeData['PersonalTaxCode']"
								/>
							</div>
							<!-- SALARY -->
							<div class="popup-infor__item" style="position: relative">
								<BaseInput
									:tabIndex="13"
									inputLabel="Mức lương cơ bản"
									inputType="text"
									:valueTranfer="employeeData['Salary']"
									:haveUnit="true"
									inputField="Salary"
								/>
							</div>
							<!-- JOIN DATE -->
							<div class="popup-infor__item">
								<BaseInput
									:tabIndex="14"
									:required="true"
									inputLabel="Ngày gia nhập công ty"
									inputType="date"
									inputField="JoinDate"
									:valueTranfer="employeeData['JoinDate']"
								/>
							</div>
							<!-- WORK STATUS -->
							<div class="popup-infor__item">
								<span class="popup-infor__label"> Tình trạng công việc </span>
								<BaseDropdownFix
									:tabIndex="15"
									:dropdownData="workStatusData"
									:valueTranfer="employeeData['WorkStatus']"
									defaultValue="Chọn trạng thái"
									dropdownField="WorkStatus"
								/>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="popup-footer">
				<button @click="cancelPopup" class="popup-btn-cancel">
					Huỷ
				</button>
				<button
					@click="deleteEmployee"
					class="popup-btn-cancel"
					v-if="method == 'PUT'"
				>
					Xoá
				</button>
				<button
					@click="savePopup"
					id="popup-btn-save--infor"
					class="button popup-btn-save"
				>
					<i class="far fa-save popup-save-icon"></i> Lưu
				</button>
			</div>
		</div>
	</div>
</template>
<script>
import BaseDropdown from "../base/BaseDropdown/BaseDropdown.vue";
import BaseDropdownFix from "../base/BaseDropdown/BaseDropdownFix.vue";
import BaseInput from "../base/BaseInput.vue";

import { EventBus } from "../../main";
import axios from "axios";

export default {
	name: "ThePopupInfo",
	data() {
		return {
			// API url
			APIurl__DEPARTMENT: "http://cukcuk.manhnv.net/api/Department",
			APIurl__POSITION: "http://cukcuk.manhnv.net/v1/Positions",

			//WORKSTATUS
			workStatusData: [
				{ WorkStatusId: 0, WorkStatusName: 0 },
				{ WorkStatusId: 1, WorkStatusName: 1 },
				{ WorkStatusId: 2, WorkStatusName: 2 },
				{ WorkStatusId: 3, WorkStatusName: 3 },
				{ WorkStatusId: 4, WorkStatusName: 4 },
			],

			// GENDER
			genderData: [
				{ GenderId: 0, GenderName: "Nữ" },
				{ GenderId: 1, GenderName: "Nam" },
				{ GenderId: 2, GenderName: "Không xác định" },
			],

			// COMMON VARIABLES
			popupState: false,
			employeeId: "",
			employeeData: {},
			method: "",
			accountName: "NTDUNG",
		};
	},
	created() {
		/**
		 * Lắng nghe sự kiện click vào dòng ở table
		 * CreatedBy: NTDUNG (30/07/2021)
		 * @param {string} rowId
		 */
		EventBus.$on("tableRowOnDbClick", (rowId) => {
			EventBus.$emit("getDropdownData");
			this.popupState = true;
			this.employeeId = rowId;
			this.getEmployeeData();
			this.method = "PUT";
		});
		/**
		 * Lắng nghe sự kiện click vào nút tạo mới
		 * CreatedBy: NTDUNG (31/07/2021)
		 */
		EventBus.$on("addEmployee", () => {
			EventBus.$emit("getDropdownData");
			this.popupState = true;
			this.employeeData = {
				EmployeeId: null,
				EmployeeCode: null,
				FirstName: null,
				LastName: null,
				FullName: null,
				Gender: null,
				DateOfBirth: null,
				PhoneNumber: null,
				Email: null,
				Address: null,
				IdentityNumber: null,
				IdentityDate: null,
				IdentityPlace: null,
				JoinDate: null,
				MartialStatus: null,
				EducationalBackground: null,
				QualificationId: null,
				DepartmentId: null,
				PositionId: null,
				WorkStatus: null,
				PersonalTaxCode: null,
				Salary: null,
				PositionCode: null,
				PositionName: null,
				DepartmentCode: null,
				DepartmentName: null,
				QualificationName: null,
				GenderName: null,
				EducationalBackgroundName: null,
				MartialStatusName: null,
				CreatedDate: null,
				CreatedBy: null,
				ModifiedDate: null,
				ModifiedBy: null
			};
			this.method = "POST";
			this.getNewEmployeeId();
		});
		/**
		 * Lắng nghe sự kiện thay đổi input
		 * CreatedBy: NTDUNG (04/08/2021)
		 */
		EventBus.$on("changeInputValue", (data) => {
			this.changeInputValue(data["NewValue"], data["InputField"]);
		});
	},
	methods: {
		/**
		 * Lấy dữ liệu một employee từ API
		 * CreatedBy: NTDUNG (30/07/2021)
		 */
		getEmployeeData() {
			axios
				.get(`http://cukcuk.manhnv.net/v1/Employees/${this.employeeId}`)
				.then((res) => {
					this.employeeData = res.data;
				})
				.catch((res) => {
					console.log(res);
				});
		},
		/**
		 * Lấy mã nhân viên mới
		 * CreatedBy: NTDUNG (31/07/2021)
		 */
		getNewEmployeeId() {
			axios
				.get("http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode")
				.then((res) => {
					this.$set(this.employeeData, "EmployeeCode", res.data);
					this.$el.querySelector('input[type="text"]').focus();
				})
				.catch((res) => {
					console.log(res);
					EventBus.$emit("ToastMessage", {
						type: "error",
						content: "Không lấy được mã nhân viên mới. Vui lòng liên hệ MISA",
						duration: 5000,
					});
				});
		},
		/**
		 * Ẩn popup
		 * CreatedBy: NTDUNG (30/07/2021)
		 */
		cancelPopup() {
			this.popupState = false;
			EventBus.$emit("showPopupDialog", {
				type: "warn",
				title: "Huỷ nhập dữ liệu",
				content: " Bạn có muốn huỷ nhập form thông tin đang chỉnh sửa",
				continueBtn: "Tiếp tục nhập",
				mode: "CANCELFORM",
			});
			EventBus.$on("continueBtnOnClickCANCELFORM", () => {
				this.popupState = true;
			});
			EventBus.$on("cancelBtnOnClickCANCELFORM", () => {
				this.employeeData = {};
				this.$el.querySelectorAll("input").forEach((input) => {
					input.classList.remove("invalid-input");
				});
			});
		},
		/**
		 * Xử lý sự kiện nhấn nút Lưu (Chỉnh sửa hoặc tạo mới)
		 * CreatedBy: NTDUNG (31/07/2021)
		 */
		savePopup() {
			// Gọi đến sự kiện validate input để validate từng trường input
			EventBus.$emit("validateEmployeeInput");
			var checkForm = true;
			var inputs = this.$el.querySelectorAll("input");
			inputs.forEach((input) => {
				// Kiểm tra nếu có trường input nào không hợp lệ thì false
				if (input.classList.contains("invalid-input")) {
					checkForm = false;
				}
			});

			if (checkForm) {
				// Ẩn popup đi
				this.popupState = false;
				if (this.method == "POST") {
					// Thêm ngày tạo mới, người tạo mới
					this.$set(this.employeeData, "CreatedDate", this.getNewDateJSON);
					this.$set(this.employeeData, "CreatedBy", this.accountName);
					EventBus.$emit("ToastMessage", {
						type: "warn",
						content: "Đang tạo mới. Vui lòng chờ",
						duration: 5000,
					});
					// Tạo mới thông tin
					axios
						.post(`http://cukcuk.manhnv.net/v1/Employees`, this.employeeData)
						.then(() => {
							EventBus.$emit("ToastMessage", {
								type: "success",
								content: "Tạo mới thành công",
								duration: 5000,
							});
							this.reloadTableData();
						})
						.catch((res) => {
							console.log(res);
							EventBus.$emit("ToastMessage", {
								type: "error",
								content: "Tạo mới thất bại. Vui lòng liên hệ MISA",
								duration: 5000,
							});
						});
				} else if (this.method == "PUT") {
					// Thêm ngày chỉnh sửa, người chỉnh sửa
					this.$set(this.employeeData, "ModifiedDate", this.getNewDateJSON);
					this.$set(this.employeeData, "ModifiedBy", this.accountName);
					EventBus.$emit("ToastMessage", {
						type: "warn",
						content: "Đang chỉnh sửa. Vui lòng chờ",
						duration: 5000,
					});
					// Chỉnh sửa thông tin
					axios
						.put(
							`http://cukcuk.manhnv.net/v1/Employees/${this.employeeId}`,
							this.employeeData
						)
						.then(() => {
							EventBus.$emit("ToastMessage", {
								type: "success",
								content: "Chỉnh sửa thành công",
								duration: 5000,
							});
							this.reloadTableData();
						})
						.catch((res) => {
							console.log(res);
							EventBus.$emit("ToastMessage", {
								type: "error",
								content: "Chỉnh sửa thất bại. Vui lòng liên hệ MISA",
								duration: 5000,
							});
						});
				}
			}
		},
		/**
		 * Thêm mới thông tin nhân viên
		 * CreatedBy: NTDUNG (09/08/2021)
		 */
		creatEmployee() {},
		/**
		 * Chỉnh sửa thông tin nhân viên
		 * CreatedBy:
		 */
		/**
		 * Xoá thông tin nhân viên
		 * CreatedBy: NTDUNG (02/08/2021)
		 */
		deleteEmployee() {
			this.popupState = false;
			// Show popup cảnh báo xác nhận xoá
			EventBus.$emit("showPopupDialog", {
				type: "error",
				title: "Xác nhận xoá thông tin",
				content: `Bạn có muốn xoá <b>${this.employeeData["FullName"]} - ${this.employeeData["EmployeeCode"]}</b>`,
				continueBtn: "Xoá nhân viên",
				mode: "DELETE",
			});
			// Lắng nghe lựa chọn của popup dialog
			EventBus.$on("continueBtnOnClickDELETE", () => {
				EventBus.$emit("ToastMessage", {
					type: "warn",
					content: "Đang xoá. Vui lòng chờ",
					duration: 5000,
				});
				axios
					.delete(`http://cukcuk.manhnv.net/v1/Employees/${this.employeeId}`)
					.then(() => {
						EventBus.$emit("ToastMessage", {
							type: "success",
							content: "Xoá thành công",
							duration: 5000,
						});
						this.reloadTableData();
					})
					.catch((res) => {
						console.log(res);
						EventBus.$emit("ToastMessage", {
							type: "error",
							content: "Xoá thất bại. Vui lòng liên hệ MISA",
							duration: 5000,
						});
					});
			});
		},
		/**
		 * Phát sự kiện load lại dữ liệu bảng table
		 * CreatedBy: NTDUNG (31/07/2021)
		 */
		reloadTableData() {
			EventBus.$emit("reloadTableData");
		},
		/**
		 * Bắt sự kiện thay đổi input để gán lại vào employeeData
		 * CreatedBy: NTDUNG (02/08/2021)
		 * @param {string} newValue
		 * @param {string} inputField
		 */
		changeInputValue(newValue, inputField) {
			this.$set(this.employeeData, inputField, newValue);
		},
	},
	computed: {
		/**
		 * Format các dữ liệu trước khi binding lên form thông tin
		 * CreatedBy: NTDUNG (30/07/2021)
		 * @param {object}
		 */
		formatEmployeeData() {
			if (this.popupState) {
				var termData = this.employeeData;
				for (var field in termData) {
					if (field.includes("Date")) {
						var value = termData[`${field}`];
						if (value != null || value == "") {
							termData[`${field}`] = value.substring(0, 10);
						}
					}
				}
				return termData;
			} else {
				return {};
			}
		},
		/**
		 * Tạo một thông tin date mới theo kiểu JSON
		 * CreatedBy: NTDUNG (03/08/2021)
		 */
		getNewDateJSON() {
			var date = new Date();
			// DAY
			var day = date.getDate();
			day = day < 10 ? "0" + day : day;
			// MONTH
			var month = date.getMonth() + 1;
			month = month < 10 ? "0" + month : month;
			// YEAR
			var year = date.getFullYear();
			// HOUR
			var hour = date.getHours();
			hour = hour < 10 ? "0" + hour : hour;
			// MIN
			var min = date.getMinutes();
			min = min < 10 ? "0" + min : min;
			// SECOND
			var second = date.getSeconds();
			second = second < 10 ? "0" + second : second;
			return `${year}-${month}-${day}T${hour}:${min}:${second}`;
		},
	},
	components: {
		BaseDropdown,
		BaseDropdownFix,
		BaseInput,
	},
};
</script>
<style lang=""></style>
