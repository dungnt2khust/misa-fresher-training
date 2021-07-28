<template lang="">
    <label @click="toggleDropdown()" class="dropdown" for="dropdown-input" :class="{'focus-dropdown': dropdownShow}">
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
            currIdx: 0
        }
    },
    props: {
        dropdownShow: Boolean,
        dropdownData: Array
    },
    methods: {
        toggleDropdown() {
            this.$emit('toggleDropdown');
        },
        activeItem(currIdx) {
            this.currIdx = currIdx;
        }
    },
    computed: {
        dropdownState() {
            return this.dropdownShow == true ? 'block' : 'none';
        },
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