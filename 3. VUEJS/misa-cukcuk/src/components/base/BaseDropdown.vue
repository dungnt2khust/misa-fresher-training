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
            currIdx: -1,
            dropdownShow: false
        }
    },
    props: {
        APIurl: String,
        dropdownDefaultVal: String,
        dropdownName: String,
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
            this.dropdownShow = false
        },
        /**
         * Hàm lấy dữ liệu API và gán vào mảng dữ liệu
         * Author: NTDUNG (28/07/2021)
         */
        getData() {
            axios.get(this.APIurl)
                .then((res) => {
                    this.dropdownData = res.data;
                })
                .catch((res) => {
                    console.log(res)
                });
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
         * Nếu trạng thái dropdown là true thì lấy dữ liệu và đổ vào rồi hiện lên, còn false thì ẩn đi
         * Author: NTDUNG (28/07/2021)
         * @returns {string} trả về thuộc tính của display
         */
        dropdownState() {
            if (this.dropdownShow) {
                this.getData();
                return 'block';
            } else {
                return 'none';
            }
        },
        /**
         * Nếu chỉ số hiện tại bằng -1 thì trả về giá trị mặc định, lớn hơn thì trả về phần tử trong mảng 
         * Author: NTDUNG (28/07/2021)
         * @returns {string} trả về chuỗi để đưa lên dropdown
         */
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