<template lang="">
	<div class="popup-wrapper" :style="{ display: popupState }">
		<div class="popup-overlay-info"></div>
		<div class="popup-form-info">
			<div class="popup-header">
				<span class="popup-header__label">
					THÔNG TIN NHÂN VIÊN
				</span>
				<div
					@click="$emit('popupCancelClick')"
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
									Mã nhân viên (<span class="text-red">*</span>)</span
								>
								<input
									:value="bindInfo['EmployeeCode']"
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
									:value="bindInfo['FullName']"
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
									:value="bindInfo['DateOfBirth']"
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
										:value="bindInfo['GenderName']"
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
									:value="bindInfo['IdentityNumber']"
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
									:value="bindInfo['IdentityDate']"
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
									:value="bindInfo['IdentityPlace']"
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
									:value="bindInfo['Email']"
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
									:value="bindInfo['PhoneNumber']"
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
								<label
									id="dropdown-position"
									tabindex="10"
									class="dropdown dropdown--position"
									for="dropdown-input"
								>
									<!-- <input type="checkbox" id="dropdown-input" style="display: none;"> -->
									<div class="dropdown-header-wrapper">
										<span
											id="employee__position"
											positionid=""
											class="dropdown-value dropdown-value--position"
										>
										</span>
										<i class="fas fa-chevron-down icon-down"></i>
									</div>
									<ul class="dropdown-list dropdown-list--position"></ul>
								</label>
							</div>
							<!-- DEPARTMENT -->
							<div class="popup-infor__item">
								<span class="popup-infor__label"> Phòng ban </span>
								<label
									id="dropdown-department"
									tabindex="11"
									class="dropdown dropdown--department"
									for="dropdown-input"
								>
									<!-- <input type="checkbox" id="dropdown-input" style="display: none;"> -->
									<div class="dropdown-header-wrapper">
										<span
											id="employee__department"
											departmentid=""
											class="dropdown-value dropdown-value--department"
										>
										</span>
										<i class="fas fa-chevron-down icon-down"></i>
									</div>
									<ul class="dropdown-list dropdown-list--department"></ul>
								</label>
							</div>
							<!-- TAX CODE -->
							<div class="popup-infor__item">
								<span class="popup-infor__label"> Mã số thuế cá nhân </span>
								<input
									:value="bindInfo['PersonalTaxCode']"
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
									:value="bindInfo['Salary']"
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
									:value="bindInfo['JoinDate']"
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
									<!-- <input type="checkbox" id="dropdown-input" style="display: none;"> -->
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
				<button @click="$emit('popupCancelClick')" class="popup-btn-cancel">
					Huỷ
				</button>
				<button class="btn-delete">Xoá</button>
				<button
					@click="$emit('popupCancelClick')"
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
	export default {
		name: "ThePopupInfo",
		data() {
			return {};
		},
		props: {
			popupData: Object,
			popupShow: Boolean,
		},
		methods: {},
		computed: {
			popupState() {
				return this.popupShow == true ? "block" : "none";
			},
			bindInfo() {
				if (this.popupShow) {
					var popupDataFormat = this.popupData;

					// FORMAT DATE
					for (var field in popupDataFormat) {
						if (field.includes("Date")) {
							var value = popupDataFormat[`${field}`];
							if (value != null || value == "") {
								popupDataFormat[`${field}`] = value.substring(0, 10);
							}
						}
					}
					return popupDataFormat;
				} else {
					return {};
				}
			},
		},
	};
</script>
<style lang=""></style>
