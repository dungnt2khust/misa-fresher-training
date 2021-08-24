import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import EmployeePage from './view/employee/EmployeePage'
import CustomerPage from './view/customer/CustomerPage'


Vue.config.productionTip = false;
Vue.use(VueRouter);

export const EventBus = new Vue();

const routes = [
  {path: '/employees', component: EmployeePage},
  {path: '/customers', component: CustomerPage}
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
}); 

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')