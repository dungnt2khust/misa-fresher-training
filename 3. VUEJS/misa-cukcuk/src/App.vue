<template>
  <div id="app"> 
    <div id="main">
      <EmployeeHeader/>
      <div id="wrapper">
        <EmployeeMenu/>
        <EmployeePage/>
      </div>
    </div>
    <ThePopupInfo/>
    <EmployeeToast/>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
import TheMenu from './components/layout/TheMenu.vue'
import EmployeePage from './view/employee/EmployeePage.vue'
import ThePopupInfo from './components/layout/ThePopupInfo.vue'
import BaseToastMessage from './components/base/BaseToastMessage.vue'

export default {

  name: 'App',
  components: {
    EmployeeHeader: TheHeader,
    EmployeeMenu: TheMenu,
    EmployeePage,
    ThePopupInfo,
    EmployeeToast: BaseToastMessage
  }
}
</script>

<style>
@import url('./css/main.css');
</style>
