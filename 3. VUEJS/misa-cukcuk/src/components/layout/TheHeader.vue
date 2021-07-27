<template>
    <div id="header">
      <div class="header-left">
        <div class="toggle"></div>
        <div class="logo"></div>
      </div>
      <div class="header-right">
        <!-- DROPDOWN RESTAURANT -->
        <label tabindex="0" id="dropdown-restaurant" class="dropdown dropdown--restaurant" for="dropdown-input">
          <div class="dropdown-header-wrapper">
            <span currVal="0" class="dropdown-value dropdown-value--restaurant">
            </span>
            <i class="fas fa-chevron-down icon-down"></i>
          </div>
          <ul class="dropdown-list dropdown-list--restaurant">
          </ul>
        </label>
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
export default {
    name: 'TheHeader'
}
</script>
<style scoped>
    @import url('../../css/common/header.css');
</style>