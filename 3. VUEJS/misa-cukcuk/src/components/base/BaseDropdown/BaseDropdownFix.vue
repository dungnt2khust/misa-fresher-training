<template lang="">
	<div	
		v-on="dropdownListeners"		
		class="dropdown"
		:class="{ 'dropdown--show': dropdownState, 'dropdown--focus': dropdownFocus }"
		:tabindex="tabIndex"
	>
		<div class="dropdown__header">
			<span class="dropdown__value">
				{{ dropdownValue }}
			</span>
			<i class="fas fa-chevron-down dropdown__icon-down"></i>
		</div>
		<ul
			class="dropdown__list"
		>
			<li
				@keydown.enter="selectItem(index)"
				@click="selectItem(index)"
				v-for="(item, index) in dropdownData"
				:class="{'dropdown__item--select': currIdx == index }"
				:key="index"
				class="dropdown__item"
			>
				{{ typeof item == "object" ? item[dropdownField + "Name"] : item }}
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: "BaseDropdownFix",
		data() {
			return {
				currIdx: -1,
				dropdownState: false,
				dropdownFocus: false
			};
		},
		props: {
			dropdownData: Array,
			value: {
				type: [String, Number],
				default: "",
			},
			dropdownField: {
				type: String,
				default: "",
			},
			indexTranfer: {
				type: Number,
				default: -1,
			},
			defaultValue: {
				type: String,
				default: "",
			},
			tabIndex: {
				type: Number,
				default: -1
			}
		},
		methods: {
			/**
			 * Bật tắt dropdown khi click vào dropdown
			 * CreatedBy: NTDUNG (28/07/2021)
			 */
			toggleDropdown() {
				this.dropdownState = !this.dropdownState;
			},
			/**
			 * Tắt dropdown khi blur dropdown
			 * CreatedBy: NTDUNG (28/07/2021)
			 */
			hideDropdown() {
				this.dropdownState = false;
			},
			/**
			 * Khi click vào một option thì đặt lại giá trị hiện tại
			 * CreatedBy: NTDUNG (28/07/2021)
			 */
			selectItem(index) {
				this.currIdx = index;
				if (index != -1 && typeof this.dropdownData[0] == "object") {
					// Nếu là gender thì sẽ truyền cả GenderId
					this.$emit("changeDropdownValue", {
						Value: this.dropdownData[index][this.dropdownField + "Id"],
						Field: this.dropdownField,
					});
					if (this.dropdownField == "Gender")
						// Tất cả các trường hợp đều truyền Name
						this.$emit("changeDropdownValue", {
							Value: this.dropdownData[index][this.dropdownField + "Name"],
							Field: this.dropdownField + "Name",
						});
				}
			},
		},
		watch: {
			/**
			 * Theo dõi biến value khi thay đổi thì reset index
			 * CreatedBy: NTDUNG (05/08/2021)
			 */
			value: function() {
				this.currIdx = -1;
			},
		},
		computed: {
			/**
			 * Lắng nghe các sự kiện trên dropdown
			 * CreatedBy: NTDUNG (25/08/2021)
			 */
			dropdownListeners: function () {

				return Object.assign({}, this.$listeners, {
					blur: () => {
						this.dropdownFocus = false;
						this.hideDropdown();
					},
					click: () => {
						this.toggleDropdown();
					},
					focus: () => {
						this.dropdownFocus = true;
					},
					"keydown": (event) => {
						switch(event.key) {
							case "Enter":
								this.toggleDropdown();
								break;
							case "ArrowDown":
								if (this.currIdx == -1) {
									this.currIdx = 0;
								} else {
									if (this.currIdx == this.dropdownData.length - 1) {
										this.currIdx = 0;
									} else {
										this.currIdx++;
									}
								}
								this.$el.querySelectorAll("li")[this.currIdx].scrollIntoView();
								break;
							case "ArrowUp":
								if (this.currIdx == -1) {
									this.currIdx = this.dropdownData.length - 1;
								} else {
									if (this.currIdx == 0) {
										this.currIdx = this.dropdownData.length - 1;
									} else {
										this.currIdx--;
									}
								}
								this.$el.querySelectorAll("li")[this.currIdx].scrollIntoView();
								break;
						}
					}
				});
			},
			/**
			 * Tính giá trị hiện tại của Dropdown
			 * CreatedBy: NTDUNG (28/07/2021)
			 * @returns {string} trả về chuỗi để đưa lên dropdown
			 */
			dropdownValue() {
				if (typeof this.dropdownData[0] == "object") {
					if (this.currIdx == -1) {
						if (this.value !== "" && this.value !== null) {
							var index = this.dropdownData.findIndex((item) => {
								return item[this.dropdownField + "Id"] == this.value;
							});
							this.selectItem(index);
							return index == -1
								? this.defaultValue
								: this.dropdownData[index][this.dropdownField + "Name"];
						} else {
							return this.defaultValue;
						}
					} else {
						return this.dropdownData[this.currIdx][this.dropdownField + "Name"];
					}
				} else {
					if (this.indexTranfer != -1 && this.currIdx == -1) {
						this.selectItem(this.indexTranfer);
						return this.dropdownData[this.indexTranfer];
					} else {
						return this.dropdownData[this.currIdx];
					}
				}
			},
		},
	};
</script>
<style>
	@import url("../../../css/base/dropdown.css");
</style>

// USAGE /** ADD FIELDS TO APPLY CSS AND PROPERTIES OF DROPDOWN
<BaseDropdownFix
	:id="'dropdown-restaurant'"
	:class="{ 'dropdown--restaurant': true }"
	:dropdownShow="dropdownShow"
	:dropdownData="dropdownData"
	@toggleDropdown="toggleDropdown()"
/>
*/
