<template lang="">
    <label @blur="hideDropdown()" @click="toggleDropdown()" class="dropdown" for="dropdown-input" :class="{'focus-dropdown': dropdownState}">
        <div class="dropdown-header-wrapper"> 
            <span class="dropdown-value">
                {{ dropdownValue }}
            </span>
            <i class="fas fa-chevron-down icon-down"></i>
        </div>
        <ul class="dropdown-list" :style="{display: dropdownState ? 'block' : 'none'}">
            <li @click="activeItem(index)" v-for="(item, index) in dropdownData" :class="{'active': (currIdx == index)}" :key="index" class="dropdown-item" >
                {{ typeof item == 'object' ? item[dropdownField + 'Name'] : item }}
            </li>
        </ul>
    </label> 
</template>
<script>
import { EventBus } from "../../../main";
export default {
	name: "BaseDropdownFix",
	data() {
		return {
			currIdx: -1,
			dropdownState: false,
		};
	},
	props: {
		dropdownData: Array,
		valueTranfer: {
			type: [String, Number],
			default: "",
		},
		dropdownField: {
			type: String,
			default: "",
		},
		indexTranfer: {
			type: Number,
			default: -1
		},
		defaultValue: {
			type: String,
			default: "",
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
		activeItem(index) {
			this.currIdx = index;
			if (index != -1 && typeof this.dropdownData[0] == 'object') {
				// Nếu là gender thì sẽ truyền cả GenderId
				EventBus.$emit("changeInputValue", {
					NewValue: this.dropdownData[index][this.dropdownField + 'Id'],
					InputField: this.dropdownField,
				});
				if (this.dropdownField == 'Gender')
					// Tất cả các trường hợp đều truyền Name
					EventBus.$emit("changeInputValue", {
						NewValue: this.dropdownData[index][this.dropdownField + "Name"],
						InputField: this.dropdownField + "Name",
					});
			}	
		}	
	},
	watch: {
		/**
		 * Theo dõi biến valueTranfer khi thay đổi thì reset index
		 * CreatedBy: NTDUNG (05/08/2021)
		 */
		valueTranfer: function() {
			this.currIdx = -1;
		}
	},
	computed: {
		/**
		 * Tính giá trị hiện tại của Dropdown
		 * CreatedBy: NTDUNG (28/07/2021)
		 * @returns {string} trả về chuỗi để đưa lên dropdown
		 */
		dropdownValue() {
			if (typeof this.dropdownData[0] == 'object') {
				if (this.currIdx == -1) {
					if (this.valueTranfer !== '' && this.valueTranfer !== null) {
						var index = this.dropdownData.findIndex((item) => {
							return item[this.dropdownField + 'Id'] == this.valueTranfer;
						});
						this.activeItem(index);
						return index == -1 ? this.defaultValue : this.dropdownData[index][this.dropdownField + 'Name'];
					} else {
						return this.defaultValue;
					}
				} else {
					return this.dropdownData[this.currIdx][this.dropdownField + "Name"];
				}
			} else {
				if (this.indexTranfer != -1 && this.currIdx == -1) {
					this.activeItem(this.indexTranfer);
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
    @import url('../../../css/common/dropdown.css'); 
</style>

// USAGE
/**
    ADD FIELDS TO APPLY CSS AND PROPERTIES OF DROPDOWN
        <BaseDropdownFix
          :id="'dropdown-restaurant'" 
          :class="{'dropdown--restaurant': true}"
          
          :dropdownShow="dropdownShow"
          :dropdownData="dropdownData"

          @toggleDropdown="toggleDropdown()"
          />
 */