<template lang="">
	<div class="form-info" :style="{ display: formState ? 'block' : 'none' }">
		<!-- FORM INFO OVERLAY -->
		<div class="form-info__overlay"></div>
		<!-- FORM INFO MAIN -->
		<div class="form-info__main">
			<!-- FORM HEADER  -->
			<div class="form-header">
				<span class="form-header__label">
					THÔNG TIN NHÂN VIÊN
				</span>
				<button @click="cancelForm" class="form-header__cancel"></button>
			</div>
			<!-- FORM BODY -->
			<div class="form-body">
				<!-- FORM AVATAR -->
				<div class="form-avatar">
					<label for="avatar-upload" class="form-avatar__img"></label>
					<span class="form-avatar__desc">
						(Vui lòng chọn ảnh có định dạng <br />
						<b>.jpg, .jpeg, .png, .gif.</b>
					</span>
					<input id="avatar-upload" style="display: none;" type="file" />
				</div>
				<!-- FORM CONTAINER -->
				<form class="form-container">
					<!-- COMMON -->
					<div class="form-container__common">
						<span class="form-container__title">A. THÔNG TIN CHUNG.</span>
						<div class="form-container__list">
							<!-- EMPLOYEE CODE -->
							<div class="form-container__item">
								<BaseInput
									:tabIndex="1"
									label="Mã nhân viên"
									:required="true"
									field="EmployeeCode"
									:value="employeeData['EmployeeCode']"
									v-model="employeeData['EmployeeCode']"
									:validateForm="validateForm"
									:formState="formState"
								/>
							</div>
							<!-- FULL NAME -->
							<div class="form-container__item">
								<BaseInput
									:tabIndex="2"
									label="Họ và tên"
									:required="true"
									field="FullName"
									:value="employeeData['FullName']"
									v-model="employeeData['FullName']"
									:validateForm="validateForm"
									:formState="formState"
								/>
							</div>
							<!-- DOB -->
							<div class="form-container__item">
								<BaseInput
									:tabIndex="3"
									label="Ngày sinh"
									type="date"
									field="DateOfBirth"
									:value="employeeData['DateOfBirth']"
									v-model="employeeData['DateOfBirth']"
									:validateForm="validateForm"
									:formState="formState"
								/>
							</div>
							<!-- GENDER -->
							<div class="form-container__item">
								<span class="form-container__label"> Giới tính </span>
								<BaseDropdownFix
									:tabIndex="4"
									:dropdownData="genderData"
									dropdownField="Gender"
									defaultValue="Chọn giới tính"
									:value="employeeData['Gender']"
									@changeDropdownValue="changeInputValue($event)"
								/>
							</div>
							<!-- ID CARD NUMBER -->
							<div class="form-container__item">
								<BaseInput
									:tabIndex="5"
									label=" Số CMTND/ Căn cước"
									:required="true"
									field="IdentityNumber"
									:value="employeeData['IdentityNumber']"
									v-model="employeeData['IdentityNumber']"
									:validateForm="validateForm"
									:formState="formState"
								/>
							</div>
							<!-- RELEASE DATE -->
							<div class="form-container__item">
								<BaseInput
									:tabIndex="6"
									label="Ngày cấp"
									type="date"
									field="IdentityDate"
									:value="employeeData['IdentityDate']"
									v-model="employeeData['IdentityDate']"
									:validateForm="validateForm"
									:formState="formState"
								/>
							</div>
							<!-- RELEASE PLACE -->
							<div class="form-container__item form-container__item--100">
								<BaseInput
									:tabIndex="7"
									label="Nơi cấp"
									:inputHalf="true"
									field="IdentityPlace"
									:value="employeeData['IdentityPlace']"
									v-model="employeeData['IdentityPlace']"
									:validateForm="validateForm"
									:formState="formState"
								/>
							</div>
							<!-- EMAIL -->
							<div class="form-container__item">
								<BaseInput
									:tabIndex="8"
									label="Email"
									:required="true"
									field="Email"
									:value="employeeData['Email']"
									v-model="employeeData['Email']"
									:validateForm="validateForm"
									:formState="formState"
								/>
							</div>
							<!-- PHONE -->
							<div class="form-container__item">
								<BaseInput
									:tabIndex="9"
									label="Số điện thoại"
									:required="true"
									field="PhoneNumber"
									:value="employeeData['PhoneNumber']"
									v-model="employeeData['PhoneNumber']"
									:validateForm="validateForm"
									:formState="formState"
								/>
							</div>
						</div>
					</div>
					<!-- WORKING INFORMATION -->
					<div class="form-container__work">
						<span class="form-container__title">B. THÔNG TIN CÔNG VIỆC.</span>
						<div class="form-container__list">
							<!-- POSITION -->
							<div class="form-container__item">
								<span class="form-container__label"> Vị trí </span>
								<BaseDropdown
									:tabIndex="10"
									APIurl="http://cukcuk.manhnv.net/v1/Positions"
									:value="employeeData['PositionId']"
									defaultValue="Chọn vị trí"
									dropdownField="Position"
									@changeDropdownValue="changeInputValue($event)"
								/>
							</div>
							<!-- DEPARTMENT -->
							<div class="form-container__item">
								<span class="form-container__label"> Phòng ban </span>
								<BaseDropdown
									:tabIndex="11"
									APIurl="http://cukcuk.manhnv.net/api/Department"
									:value="employeeData['DepartmentId']"
									defaultValue="Chọn phòng ban"
									dropdownField="Department"
									@changeDropdownValue="changeInputValue($event)"
								/>
							</div>
							<!-- TAX CODE -->
							<div class="form-container__item">
								<BaseInput
									:tabIndex="12"
									label="Mã số thuế cá nhân"
									field="PersonalTaxCode"
									:value="employeeData['PersonalTaxCode']"
									v-model="employeeData['PersonalTaxCode']"
									:validateForm="validateForm"
									:formState="formState"
								/>
							</div>
							<!-- SALARY -->
							<div class="form-container__item">
								<BaseInput
									:tabIndex="13"
									label="Mức lương cơ bản"
									unit="VNĐ"
									field="Salary"
									:value="employeeData['Salary']"
									v-model="employeeData['Salary']"
									:validateForm="validateForm"
									:formState="formState"
								/>
							</div>
							<!-- JOIN DATE -->
							<div class="form-container__item">
								<BaseInput
									:tabIndex="14"
									:required="true"
									label="Ngày gia nhập công ty"
									type="date"
									field="JoinDate"
									:value="employeeData['JoinDate']"
									v-model="employeeData['JoinDate']"
									:validateForm="validateForm"
									:formState="formState"
								/>
							</div>
							<!-- WORK STATUS -->
							<div class="form-container__item">
								<span class="form-container__label">
									Tình trạng công việc
								</span>
								<BaseDropdownFix
									:tabIndex="15"
									:dropdownData="workStatusData"
									:value="employeeData['WorkStatus']"
									defaultValue="Chọn trạng thái"
									dropdownField="WorkStatus"
									@changeDropdownValue="changeInputValue($event)"
								/>
							</div>
						</div>
					</div>
				</form>
			</div>
			<!-- FORM FOOTER -->
			<div class="form-footer">
				<button @keydown.enter="cancelForm" @click="cancelForm" class="form-footer__cancel" tabindex="16">
					Huỷ
				</button>
				<button
					@click="saveForm"
					@keydown.enter="saveForm"
					class="button form-footer__save"
					tabindex="17"
				>
					<i class="far fa-save form-footer__save-icon"></i> Lưu
				</button>
			</div>
		</div>
	</div>
</template>
<script>
	import BaseDropdown from "../../components/base/BaseDropdown/BaseDropdown.vue";
	import BaseDropdownFix from "../../components/base/BaseDropdown/BaseDropdownFix.vue";
	import BaseInput from "../../components/base/BaseInput.vue";

	import { EventBus } from "../../main";
	import axios from "axios";

	export default {
		name: "EmployeeDetail",
		data() {
			return {
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
				formState: false,
				employeeId: "",
				employeeData: {},
				method: "",
				accountName: "NTDUNG",
				validateForm: false,
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
				this.formState = true;
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
				this.formState = true;
				this.employeeData = {
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
					ModifiedBy: null,
				};
				this.method = "POST";
				this.getNewEmployeeCode();
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
			 * ModifiedBy: NTDUNG (11/08/2021)
			 */
			getNewEmployeeCode() {
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
			 * Ẩn form
			 * CreatedBy: NTDUNG (30/07/2021)
			 */
			cancelForm() {
				this.formState = false;
				EventBus.$emit("showDialog", {
					type: "warn",
					title: "Huỷ nhập dữ liệu",
					content: " Bạn có muốn huỷ nhập form thông tin đang chỉnh sửa",
					continueBtn: "Tiếp tục nhập",
					mode: "CANCELFORM",
				});
				EventBus.$on("continueBtnOnClickCANCELFORM", () => {
					this.formState = true;
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
			saveForm() {
				// Validate form thêm lần nữa
				this.validateForm = !this.validateForm;
				setTimeout(() => {
					// Gọi đến sự kiện validate input để validate từng trường input
					var checkForm = true;
					var inputs = this.$el.querySelectorAll("input");
					inputs.forEach((input) => {
						// Kiểm tra nếu có trường input nào không hợp lệ thì false
						if (input.classList.contains("input--error")) {
							checkForm = false;
						}
					});

					if (checkForm) {
						this.convertData();
						// Ẩn form đi
						this.formState = false;
						if (this.method == "POST") {
							this.creatEmployee();
						} else if (this.method == "PUT") {
							this.updateEmployee();
						}
					}
				}, 100);
			},
			/**
			 * Thêm mới thông tin nhân viên
			 * CreatedBy: NTDUNG (09/08/2021)
			 */
			creatEmployee() {
				// Thêm ngày tạo mới, người tạo mới
				this.$set(this.employeeData, "CreatedDate", this.getNewDateJSON);
				this.$set(this.employeeData, "CreatedBy", this.accountName);
				// Tạo mới thông tin
				axios
					.post(`http://cukcuk.manhnv.net/v1/Employees`, this.employeeData)
					.then(() => {
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
			},
			/**
			 * Chỉnh sửa thông tin nhân viên
			 * CreatedBy: NTDUNG (11/08/2021)
			 */
			updateEmployee() {
				// Thêm ngày chỉnh sửa, người chỉnh sửa
				this.$set(this.employeeData, "ModifiedDate", this.getNewDateJSON);
				this.$set(this.employeeData, "ModifiedBy", this.accountName);
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
			 * ModifiedBy: NTDUNG (22/08/2021)
			 * @param {object} data
			 */
			changeInputValue(data) {
				this.$set(this.employeeData, data["Field"], data["Value"]);
			},
			/**
			 * Chuyển đổi dữ liệu trong employeeData chuẩn thành JSON
			 * CreatedBy: NTDUNG (03/08/2021)
			 */
			convertData() {
				console.log(this.employeeData);
			},
		},
		computed: {
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
<style>
	@import url("../../css/common/form-info.css");
</style>
