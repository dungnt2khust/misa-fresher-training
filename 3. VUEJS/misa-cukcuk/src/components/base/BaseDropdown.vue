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
                {{item[dropdownName + 'Name']}}
            </li>
        </ul>
    </label> 
</template>
<script>
import axios from 'axios'

export default {
    name: 'BaseDropdown',
    data() {
        return {
            dropdownData: [],
            currIdx: -1
        }
    },
    props: {
        APIurl: String,
        dropdownShow: Boolean,
        dropdownDefaultVal: String,
        dropdownName: String,
    }, 
    methods: {
        toggleDropdown() {
            this.$emit('toggleDropdown');
        },
        getData() {
            axios.get(this.APIurl)
                .then((res) => {
                    this.dropdownData = res.data;
                })
                .catch((res) => {
                    console.log(res)
                });
        },
        activeItem(currIdx) {
            this.currIdx = currIdx;
        }
    },
    computed: {
        dropdownState() {
            if (this.dropdownShow) {
                this.getData();
                return 'block';
            } else {
                return 'none';
            }
        },
        dropdownValue() {
            if (this.currIdx == -1) {
                return this.dropdownDefaultVal;
            } else {
                return this.dropdownData[this.currIdx][this.dropdownName + 'Name']; 
            }
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
        <BaseDropdown
          :id="'dropdown-restaurant'" 
          :class="{'dropdown--restaurant': true}"
          
          :APIurl="APIurl"
          :dropdownShow="dropdownShow"
          :dropdownDefaultVal="dropdownDefaultVal"
          :dropdownName="dropdownName"

          @toggleDropdown="toggleDropdown()"
          />
 */