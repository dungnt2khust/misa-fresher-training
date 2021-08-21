<template>
  <div id="app"> 
    <div id="main">
      <EmployeeHeader/>
      <div id="wrapper">
        <EmployeeMenu/>
        <EmployeePage/>
      </div>
    </div>
    <EmployeeDetail/>
    <EmployeeToast/>
    <EmployeeDialog/>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
import TheMenu from './components/layout/TheMenu.vue'
import EmployeePage from './view/employee/EmployeePage.vue'
import EmployeeDetail from './view/employee/EmployeeDetail.vue'
import BaseToastMessage from './components/base/BaseToastMessage.vue'
import BaseDialog from './components/base/BaseDialog.vue'
import { EventBus } from './main'

export default {  
  name: 'App',
  components: {
    EmployeeHeader: TheHeader,
    EmployeeMenu: TheMenu,
    EmployeePage,
    EmployeeDetail,
    EmployeeToast: BaseToastMessage,
    EmployeeDialog: BaseDialog
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
