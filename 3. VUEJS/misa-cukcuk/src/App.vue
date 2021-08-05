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
    <EmployeePopupDialog/>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
import TheMenu from './components/layout/TheMenu.vue'
import EmployeePage from './view/employee/EmployeePage.vue'
import ThePopupInfo from './components/layout/ThePopupInfo.vue'
import BaseToastMessage from './components/base/BaseToastMessage.vue'
import BasePopupDialog from './components/base/BasePopupDialog.vue'
import { EventBus } from './main'

export default {

  name: 'App',
  components: {
    EmployeeHeader: TheHeader,
    EmployeeMenu: TheMenu,
    EmployeePage,
    ThePopupInfo,
    EmployeeToast: BaseToastMessage,
    EmployeePopupDialog: BasePopupDialog
  },
  mounted() {
    setTimeout(() => {
      EventBus.$emit('ToastMessage', {
        type: 'info',
        content: ' Đã có bản cập nhật mới. Hãy cập nhật để trải niệm.',
        duration: 5000
      });
    }, 5000);
  }
}
</script>

<style>
@import url('./css/main.css');
</style>
