<template lang="">
	<div class="popup-wrapper" :style="{ display: popupState ? 'block' : 'none'}">
		<div class="popup-overlay-info"></div>
		<div class="popup-form-info">
			<div class="popup-header">
				<span class="popup-header__label">
					THÔNG TIN NHÂN VIÊN
				</span>
				<div
					@click="cancelPopup"
					class="popup-header__cancel"
				></div>
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
					<div class="slidecontainer">
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
					<button class="button btn-setavatar">Đặt ảnh đại diện</button>
				</div>
				<!-- POPUP INFORMATIONS -->
				<form class="popup-infor">
					<!-- COMMON INFORMATION -->
					<div class="popup-infor__common">
						<span class="popup-infor__title">A. THÔNG TIN CHUNG.</span>
						<div class="popup-infor__list">
							<!-- EMPLOYEE CODE -->
							<div class="popup-infor__item">
								<span class="popup-infor__label">
									Mã nhân viên {{	employeeData['EmployeeCode'] }} (<span class="text-red">*</span>)</span
								>
								<input
									v-model="employeeData['EmployeeCode']"
									required
									tabindex="1"
									id="employee__code"
									type="text"
									class="popup-infor__input"
								/>
							</div>
							<!-- FULL NAME -->
							<div class="popup-infor__item">
								<span class="popup-infor__label">
									Họ và tên (<span class="text-red">*</span>)</span
								>
								<input
									:value="formatEmployeeData['FullName']"
									required
									tabindex="2"
									id="employee__fullname"
									type="text"
									class="popup-infor__input"
								/>
							</div>
							<!-- DOB -->
							<div class="popup-infor__item">
								<span class="popup-infor__label"> Ngày sinh </span>
								<input
									:value="formatEmployeeData['DateOfBirth']"
									tabindex="3"
									id="employee__dob"
									type="date"
									class="popup-infor__input"
								/>
							</div>
							<!-- GENDER -->
							<div class="popup-infor__item">
								<span class="popup-infor__label"> Giới tính </span>
								<div
									tabindex="0"
									id="combobox-gender"
									class="combobox combobox--gender"
								>
									<input
										:value="formatEmployeeData['GenderName']"
										tabindex="4"
										id="employee__gender"
										type="text"
										name=""
										class="combobox__input combobox__input--gender"
									/>
									<div class="combobox__input-cancel">
										<i class="fas fa-times-circle"></i>
									</div>
									<div class="combobox__dropdown combobox__dropdown--gender">
										<i class="fas fa-chevron-down combobox__icon"></i>
									</div>
									<ul class="combobox__list combobox__list--gender"></ul>
								</div>
							</div>
							<!-- ID CARD NUMBER -->
							<div class="popup-infor__item">
								<span class="popup-infor__label">
									Số CMTND/ Căn cước (<span class="text-red">*</span>)</span
								>
								<input
									:value="formatEmployeeData['IdentityNumber']"
									required
									tabindex="5"
									id="employee__idnumber"
									type="text"
									class="popup-infor__input"
								/>
							</div>
							<!-- RELEASE DATE -->
							<div class="popup-infor__item">
								<span class="popup-infor__label"> Ngày cấp </span>
								<input
									:value="formatEmployeeData['IdentityDate']"
									tabindex="6"
									id="employee__iddate"
									type="date"
									class="popup-infor__input"
								/>
							</div>
							<!-- RELEASE PLACE -->
							<div class="popup-infor__item noi-cap">
								<span class="popup-infor__label"> Nơi cấp</span>
								<input
									:value="formatEmployeeData['IdentityPlace']"
									tabindex="7"
									id="employee__idplace"
									type="text"
									class="popup-infor__input"
								/>
							</div>
							<!-- EMAIL -->
							<div class="popup-infor__item email">
								<span class="popup-infor__label ">
									Email (<span class="text-red">*</span>)</span
								>
								<input
									:value="formatEmployeeData['Email']"
									required
									tabindex="8"
									id="employee__email"
									type="text"
									class="popup-infor__input"
								/>
							</div>
							<!-- PHONE -->
							<div class="popup-infor__item">
								<span required class="popup-infor__label">
									Số điện thoại (<span class="text-red">*</span>)</span
								>
								<input
									:value="formatEmployeeData['PhoneNumber']"
									required
									tabindex="9"
									id="employee__phone"
									type="text"
									class="popup-infor__input"
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
								<span class="popup-infor__label"> Mã số thuế cá nhân </span>
								<input
									:value="formatEmployeeData['PersonalTaxCode']"
									tabindex="12"
									id="employee__taxcode"
									type="text"
									class="popup-infor__input"
								/>
							</div>
							<!-- BASE SALARY -->
							<div class="popup-infor__item" style="position: relative;">
								<span class="popup-infor__label"> Mức lương cơ bản </span>
								<input
									:value="formatEmployeeData['Salary']"
									tabindex="13"
									id="employee__basesalary"
									type="text"
									class="popup-infor__input"
								/>
								<span id="input-salary">(VNĐ)</span>
							</div>
							<!-- JOINING DATE -->
							<div class="popup-infor__item">
								<span class="popup-infor__label"> Ngày gia nhập công ty </span>
								<input
									:value="formatEmployeeData['JoinDate']"
									tabindex="14"
									id="employee__joiningdate"
									type="date"
									class="popup-infor__input"
								/>
							</div>
							<!-- WORKING STATUS -->
							<div class="popup-infor__item">
								<span class="popup-infor__label"> Tình trạng công việc </span>
								<label
									id="dropdown-workstatus"
									tabindex="15"
									class="dropdown dropdown--workstatus"
									for="dropdown-input"
								>
									<div class="dropdown-header-wrapper">
										<span
											id="employee__workstatus"
											class="dropdown-value dropdown-value--workstatus"
										>
										</span>
										<i class="fas fa-chevron-down icon-down"></i>
									</div>
									<ul class="dropdown-list dropdown-list--workstatus"></ul>
								</label>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="popup-footer">
				<button @click="cancelPopup" class="popup-btn-cancel">
					Huỷ
				</button>
				<button class="btn-delete">Xoá</button>
				<button
					@click="cancelPopup"
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
	import BaseDropdown from '../base/BaseDropdown.vue'
	import { EventBus } from '../../main'
	import axios from 'axios'

	export default {
		name: "ThePopupInfo",
		data() {
			return {
				// DEPARTMENT
				APIurl__DEPARTMENT: 'http://cukcuk.manhnv.net/api/Department',
				dropdownDefaultVal__DEPARTMENT: 'Chọn phòng ban',
				dropdownName__DEPARTMENT: 'Department',

				// POSITION 
				APIurl__POSITION: 'http://cukcuk.manhnv.net/v1/Positions',
				dropdownDefaultVal__POSITION: 'Chọn vị trí',
				dropdownName__POSITION: 'Position',

				// POPUP STATE
				popupState: false,
				employeeId: '',
				employeeData: {},
				testData: {
					name: 'original name'
				}
			};
		},
		props: {
			popupData: {
				type: String, 
				default: ''
			},
		},
		created() {
			/**
			 * Lắng nghe sự kiện click vào dòng ở table
			 * Author: NTDUNG (30/07/2021)
			 * @param {string} rowId
			 */
			EventBus.$on('tableRowOnClick', (rowId) => {
				this.popupState = true;
				this.employeeId = rowId;
				this.getEmployeeData();
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
					.then(res => {
						this.employeeData = res.data;
					})
					.catch(res => {
						console.log(res)
					});
			},
			/**
			 * Ẩn popup 
			 * Author: NTDUNG (30/07/2021)
			 */
			cancelPopup() {
				this.popupState = false;
			}
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
					}
					return this.employeeData;
				} else {
					return {};
				}	
			}
		},
		components: {
			BaseDropdown
		}
	};
</script>
<style lang=""></style>
