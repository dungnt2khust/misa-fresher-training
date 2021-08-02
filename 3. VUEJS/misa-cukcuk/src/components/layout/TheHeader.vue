<template>
    <div id="header">
      <div class="header-left">
        <div class="toggle"></div>
        <div class="logo"></div>
      </div> 
      <div class="header-right"> 
        <BaseDropdownFix
          :id="'dropdown-restaurant'"
          :class="{'dropdown--restaurant': true}"
          :tabindex="100"
          :dropdownData="dropdownData"
          />           
        <div class="account">
          <div class="account__notify">
            <i class="far fa-bell"></i>
          </div>
          <div class="account__avatar"></div>
          <div class="account__name">Nguyễn Tiến Dũng</div>
          <div class="account__option"></div>
        </div>
      </div>
    </div>
</template>
<script>
import BaseDropdownFix from '../base/BaseDropdown/BaseDropdownFix.vue'

export default {
    name: 'TheHeader',
    data() {
      return {
        dropdownData: [
          'Nhà hàng Biển Đông',
          'Nhà hàng Biển Tây',
          'Nhà hàng Biển Nam',
          'Nhà hàng Biển Bắc'
        ]
      }
    },
    methods: {

    },
    components: {
      BaseDropdownFix
    }
}
</script>
<style scoped>
    @import url('../../css/common/header.css');
</style>