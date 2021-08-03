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
import { EventBus } from './main'

export default {

  name: 'App',
  components: {
    EmployeeHeader: TheHeader,
    EmployeeMenu: TheMenu,
    EmployeePage,
    ThePopupInfo,
    EmployeeToast: BaseToastMessage
  },
  created() {
    setTimeout(() => {
      var data = {
        type: 'info',
        content: ' Đã có bản cập nhật mới. Hãy cập nhật để trải niệm.',
        duration: 5000
      };
      EventBus.$emit('ToastMessage', data);
    }, 5000);
  }
}
</script>

<style>
@import url('./css/main.css');
</style>
