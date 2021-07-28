<template>
  <div id="app"> 
    <TheMain 
      :employees="employees"
      />
    <ThePopupInfo
      :popupData="popupData"
      :popupShow="popupShow"

      @popupCancelClick="popupCancelClick()"
      />
    <BaseToastMessage

    />
  </div>
</template>

<script>
import TheMain from './components/layout/TheMain.vue'
import ThePopupInfo from './components/layout/ThePopupInfo.vue'
import BaseToastMessage from './components/base/BaseToastMessage.vue'
import axios from 'axios'
import {EventBus} from './main.js'

export default {

  name: 'App',
  data() {
      return {
          employees: [],
          popupShow: false,
          popupData: {}
      }
  },
  methods: {
    employeeRowClick(event) {
      this.popupData = this.employees[event];
      this.popupShow = true;
    },
    popupCancelClick() {
      this.popupShow = false;
    }
  },
  created() {
      const vm = this;
      axios.get('http://cukcuk.manhnv.net/v1/Employees').then(res => {
          vm.employees = res.data;
      }).catch(res => {
          console.log(res.data);
      });

      // Lắng nghe sự kiện (EVENTBUS)
      EventBus.$on('employeeRowClick', (data) => {
        this.employeeRowClick(data);
      }); 
  },
  destroyed() { 
      EventBus.$off('employeeRowClick', (data) => {
        this.employeeRowClick(data);
      });
  },
  components: {
    TheMain,
    ThePopupInfo,
    BaseToastMessage
  }
}
</script>

<style>
@import url('./css/main.css');
</style>
