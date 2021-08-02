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
				<div @click="cancelPopup" class="popup-header__cancel"></div>
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
						name=""
					/>
					<!-- <div class="slidecontainer">
						<span class="slide-label slide--horizontal">Chiều ngang</span>
						<input
							type="range"
							min="1"
							max="100"
							value="50"
							class="slider"
							id="slide-horizontal"
						/>

						<span class="slide-label slide--vertical">Chiều dọc</span>
						<input
							type="range"
							min="1"
							max="100"
							value="50"
							class="slider"
							id="slide-vertical"
						/>

						<span class="slide-label slide--scale"> Phóng to / Thu nhỏ</span>
						<input
							type="range"
							min="1"
							max="100"
							value="50"
							class="slider"
							id="slide-scale"
						/>
					</div>
					<button class="button btn-setavatar">Đặt ảnh đại diện</button> -->
				</div>
				<!-- POPUP INFORMATIONS -->
				<form class="popup-infor">
					<!-- COMMON INFORMATION -->
					<div class="popup-infor__common">
						<span class="popup-infor__title">A. THÔNG TIN CHUNG.</span>
						<div class="popup-infor__list">
							<!-- EMPLOYEE CODE -->
							<div class="popup-infor__item">
								<BaseInput inputName="Mã nhân viên" :required="true" />
							</div>
							<!-- FULL NAME -->
							<div class="popup-infor__item">
								<BaseInput inputName="Họ và tên" :required="true" />
							</div>
							<!-- DOB -->
							<div class="popup-infor__item">
								<BaseInput
									inputName="Ngày sinh"
									inputType="date"/>
							</div>
							<!-- GENDER -->
							<div class="popup-infor__item">
								<BaseCombobox
									:comboboxData="comboboxDataGender"
									:comboboxName="comboboxNameGender"
									:placeHolder="comboboxPlaceHolderGender"/>
							</div>
							<!-- ID CARD NUMBER -->
							<div class="popup-infor__item">
								<BaseInput inputName=" Số CMTND/ Căn cước" :required="true" />
							</div>
							<!-- RELEASE DATE -->
							<div class="popup-infor__item">
								<BaseInput inputName="Ngày cấp" inputType="date" />
							</div>
							<!-- RELEASE PLACE -->
							<div class="popup-infor__item noi-cap">
								<BaseInput inputName="Nơi cấp" :alone="true" />
							</div>
							<!-- EMAIL -->
							<div class="popup-infor__item email">
								<BaseInput inputName="Email" :required="true" />
							</div>
							<!-- PHONE -->
							<div class="popup-infor__item">
								<BaseInput inputName="Số điện thoại" :required="true" />
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
									:id="'dropdown-position'"
									:class="{ 'dropdown--position': true }"
									:tabindex="10"
									:APIurl="APIurl__POSITION"
									:key="1"
									:dropdownDefaultVal="dropdownDefaultVal__POSITION"
									:dropdownName="dropdownName__POSITION"
								/>
							</div>
							<!-- DEPARTMENT -->
							<div class="popup-infor__item">
								<span class="popup-infor__label"> Phòng ban </span>
								<BaseDropdown
									:id="'dropdown-department'"
									:class="{ 'dropdown--department': true }"
									:tabindex="11"
									:APIurl="APIurl__DEPARTMENT"
									:key="2"
									:dropdownDefaultVal="dropdownDefaultVal__DEPARTMENT"
									:dropdownName="dropdownName__DEPARTMENT"
								/>
							</div>
							<!-- TAX CODE -->
							<div class="popup-infor__item">
								<BaseInput inputName="Mã số thuế cá nhân" />
							</div>
							<!-- BASE SALARY -->
							<div class="popup-infor__item" style="position: relative;">
								<span class="popup-infor__label"> Mức lương cơ bản </span>
								<input
									:value="employeeData['Salary']"
									tabindex="13"
									id="employee__basesalary"
									type="text"
									class="popup-infor__input"
								/>
								<span id="input-salary">(VNĐ)</span>
							</div>
							<!-- JOINING DATE -->
							<div class="popup-infor__item">
								<BaseInput 
									inputName="Ngày gia nhập công ty"
									inputType="date"/>
							</div>
							<!-- WORKING STATUS -->
							<div class="popup-infor__item">
								<span class="popup-infor__label"> Tình trạng công việc </span>
								<BaseDropdownFix :dropdownData="workStatus" />
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="popup-footer">
				<button @click="cancelPopup" class="popup-btn-cancel">
					Huỷ
				</button>
				<button class="popup-btn-cancel" v-if="method == 'POST'">Xoá</button>
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
	import BaseCombobox from "../base/BaseCombobox.vue"
	import BaseInput from "../base/BaseInput.vue";

	import { EventBus } from "../../main";
	import axios from "axios";

	export default {
		name: "ThePopupInfo",
		data() {
			return {
				// DEPARTMENT
				APIurl__DEPARTMENT: "http://cukcuk.manhnv.net/api/Department",
				dropdownDefaultVal__DEPARTMENT: "Chọn phòng ban",
				dropdownName__DEPARTMENT: "Department",

				// POSITION
				APIurl__POSITION: "http://cukcuk.manhnv.net/v1/Positions",
				dropdownDefaultVal__POSITION: "Chọn vị trí",
				dropdownName__POSITION: "Position",

				//WORKSTATUS
				workStatus: [0, 1, 2, 3, 4],

				// GENDER 
				comboboxDataGender: [
					'Nam',
					'Nữ',
					'Không xác định'
				],
				comboboxNameGender: 'Giới tính',
				comboboxPlaceHolderGender: 'Chọn giới tính',

				// COMMON VARIABLES
				popupState: false,
				employeeId: "",
				employeeData: {},
				method: "",
				newEmployeeId: "",
			};
		},
		props: {
			popupData: {
				type: String,
				default: "",
			},
		},
		created() {
			/**
			 * Lắng nghe sự kiện click vào dòng ở table
			 * Author: NTDUNG (30/07/2021)
			 * @param {string} rowId
			 */
			EventBus.$on("tableRowOnDbClick", (rowId) => {
				this.popupState = true;
				this.employeeId = rowId;
				this.getEmployeeData();
				this.method = "PUT";
				document.querySelector("#employee__code").focus();
			});
			/**
			 * Lắng nghe sự kiện click vào nút tạo mới
			 * Author: NTDUNG (31/07/2021)
			 */
			EventBus.$on("addEmployee", () => {
				this.popupState = true;
				this.employeeData = {};
				this.method = "POST";
				this.getNewEmployeeId();
				this.$set(this.employeeData, "EmployeeCode", this.newEmployeeId);
				document.querySelector("#employee__code").focus();
			});
		},
		methods: {
			/**
			 * Lấy dữ liệu một employee từ API
			 * Author: NTDUNG (30/07/2021)
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
			 * Author: NTDUNG (31/07/2021)
			 */
			getNewEmployeeId() {
				axios
					.get("http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode")
					.then((res) => {
						this.newEmployeeId = res.data;
					})
					.catch((res) => {
						console.log(res);
					});
			},
			/**
			 * Ẩn popup
			 * Author: NTDUNG (30/07/2021)
			 */
			cancelPopup() {
				this.popupState = false;
			},
			/**
			 * Xử lý sự kiện nhấn nút Lưu (Chỉnh sửa hoặc tạo mới)
			 * Author: NTDUNG (31/07/2021)
			 */
			savePopup() {
				// Ẩn popup đi
				this.popupState = false;
				console.log(JSON.stringify(this.employeeData));
				if (this.method == "POST") {
					// Tạo mới thông tin
					axios
						.post(`http://cukcuk.manhnv.net/v1/Employees`, this.employeeData)
						.then(() => {})
						.catch((res) => {
							console.log(res);
						});

					this.reloadTableData();
				} else if (this.method == "PUT") {
					axios
						.put(
							`http://cukcuk.manhnv.net/v1/Employees/${this.employeeId}`,
							this.employeeData
						)
						.then(() => {})
						.catch((res) => {
							console.log(res);
						});
					this.reloadTableData();
				}
			},
			/**
			 * Phát sự kiện load lại dữ liệu bảng table
			 * Author: NTDUNG (31/07/2021)
			 */
			reloadTableData() {
				EventBus.$emit("reloadTableData");
			},
		},
		computed: {
			/**
			 * Format các dữ liệu trước khi binding lên form thông tin
			 * Author: NTDUNG (30/07/2021)
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
						// if (field.includes("Salary")) {
						// 	termData[`${field}`] = value.toString().toLocaleString();
						// }
					}
					return termData;
				} else {
					return {};
				}
			},
		},
		components: {
			BaseDropdown,
			BaseDropdownFix,
			BaseInput,
			BaseCombobox
		},
	};
</script>
<style lang=""></style>
