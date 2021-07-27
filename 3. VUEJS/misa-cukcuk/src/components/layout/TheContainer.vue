<template lang="">
    <div id="container">
         <div class="container__header">
          <div class="container__header-left">
            <span class="table-name">Danh sách nhân viên</span>
            <div class="table-filter">
              <div class="table-search">
                <div class="table-search__icon">
                  <img src="../../assets/icon/search.png" alt="" />
                </div>
                <input tabindex="1" class="table-search__input" placeholder="Tìm theo mã, họ tên hoặc số điện thoại" type="text" />
              </div>
              <!-- FILTER DEPARTMENT -->
              <label id="filter-department" tabindex="2" class="dropdown table-filter__department" for="dropdown-input">
                <!-- <input type="checkbox" id="dropdown-input" style="display: none;"> -->
                <div class="dropdown-header-wrapper">
                  <span currVal="0" class="dropdown-value filter__value--department">
                  </span>
                  <i class="fas fa-chevron-down icon-down"></i>
                </div>
                <ul class="dropdown-list filter__list--department">
                </ul>
              </label>
              <!-- FILTER POSITION -->
              <label id="filter-position" tabindex="3" class="dropdown table-filter__position" for="dropdown-input">
                <!-- <input type="checkbox" id="dropdown-input" style="display: none;"> -->
                <div class="dropdown-header-wrapper">
                  <span currVal="0" class="dropdown-value filter__value--position">
                  </span>
                  <i class="fas fa-chevron-down icon-down"></i>
                </div>
                <ul class="dropdown-list filter__list--position">
                </ul>
              </label>
            </div>
          </div>
          <div class="container__header-right">
            <button class="button button-addemployee">
              <div class="button__img">
                <img src="../../assets/icon/add.png" alt="" />
              </div>
              <span class="button__name"> Thêm nhân viên </span>
            </button>
            <div class="button-f5-delete">
              <button id="button-delete" class="button"> <i class="fas fa-minus-square"></i> Xoá nhân viên</button>
              <div class="refresh">
                <img src="../../assets/icon/refresh.png" alt="" />
              </div>
            </div>
          </div>
        </div> 
        <div class="container__main">
            <TheTable/>
        </div>
    </div>
</template>
<script>
import TheTable from './TheTable.vue'
// import VueAxios from 'vue-axios'

export default {
    name: 'TheContainer',
    data() {
        return {
            
        }
    }, 
    components: {
        TheTable
    }
}
</script>
<style scoped>
</style>