<template lang="">
    <label @blur="hideDropdown()" @click="toggleDropdown()" class="dropdown" for="dropdown-input" :class="{'focus-dropdown': dropdownShow}">
        <div class="dropdown-header-wrapper"> 
            <span class="dropdown-value">
                {{dropdownValue}}
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
            currIdx: 0,
            dropdownShow: false
        }
    },
    props: {
        dropdownData: Array
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
        activeItem(currIdx) {
            this.currIdx = currIdx;
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
        },
        /**
         * Trả về phần tử trong mảng 
         * Author: NTDUNG (28/07/2021)
         * @returns {string} trả về chuỗi để đưa lên dropdown
         */
        dropdownValue() {
            return this.dropdownData[this.currIdx];
        }
    }
}
</script>
<style>
    @import url('../../css/common/dropdown.css'); 
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