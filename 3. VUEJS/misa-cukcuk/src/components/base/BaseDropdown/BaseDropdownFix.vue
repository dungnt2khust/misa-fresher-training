<template lang="">
    <label @blur="hideDropdown()" @click="toggleDropdown()" class="dropdown" for="dropdown-input" :class="{'focus-dropdown': dropdownShow}">
        <div class="dropdown-header-wrapper"> 
            <span class="dropdown-value">
                {{dropdownValue()}}
            </span>
            <i class="fas fa-chevron-down icon-down"></i>
        </div>
        <ul class="dropdown-list" :style="{display: dropdownState}">
            <li @click="activeItem(index)" v-for="(item, index) in dropdownData" :class="{'active': (currIdx == index)}" :key="index" class="dropdown-item" >
                {{item}}
            </li>
        </ul>
    </label> 
</template>
<script>
export default {
    name: 'BaseDropdownFix',
    data() {
        return {
            currIdx: -1,
            dropdownShow: false
        }
    },
    props: {
        dropdownData: Array,
        dropdownVal: {
            type: [String, Number],
            default: '' 
        },
        currDefault: {
            type: Number,
            default: -1
        }
    },
    methods: {
        /**
         * Bật tắt dropdown khi click vào dropdown
         * Author: NTDUNG (28/07/2021)
         */
        toggleDropdown() {
            this.dropdownShow = !this.dropdownShow;
        },
        /**
         * Tắt dropdown khi blur dropdown 
         * Author: NTDUNG (28/07/2021)
         */
        hideDropdown() {
            this.dropdownShow = false;
        },
        /**
         * Khi click vào một option thì đặt lại giá trị hiện tại 
         * Author: NTDUNG (28/07/2021)
         */
        activeItem(index) {
            this.currIdx = index;
            this.$emit('changeInputValue', this.dropdownData[index]);
        },
        /**
         * Trả về phần tử trong mảng 
         * Author: NTDUNG (28/07/2021)
         * @returns {string} trả về chuỗi để đưa lên dropdown
         */
        dropdownValue() {
            // Nếu có giá trị truyền vào dropdown và giá trị hiện tại chưa có
            if (this.dropdownVal != '' && this.currIdx == -1) {
                var foundValue = this.dropdownData.indexOf(this.dropdownVal);
                this.currIdx = foundValue;
                return this.dropdownVal;
            // Nếu có giá trị index mặc định mà giá trị hiện tại chưa có
            } else if (this.currDefault != -1 && this.currIdx == -1) {
                this.currIdx = this.currDefault;
            // Đã có giá trị hiện tại
            } else if (this.currIdx != -1){
                return this.dropdownData[this.currIdx];
            } else {
                return '';
            }
        }
    },
    computed: {
        /**
         * Nếu trạng thái dropdown là true thì hiện lên, còn false thì ẩn đi
         * Author: NTDUNG (28/07/2021)
         * @returns {string} trả về thuộc tính của display
         */
        dropdownState() {
            return this.dropdownShow == true ? 'block' : 'none';
        } 
    }
}
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