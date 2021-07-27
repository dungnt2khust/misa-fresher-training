<template lang="">
    <div class="table-wrapper">
       <table class="table-employee">
            <thead class="table-employee__head">
            <tr>
                <th class="table-employee__header">#</th>
                <th fieldName="EmployeeCode" class="table-employee__header">Mã nhân viên</th>
                <th fieldName="FullName" class="table-employee__header">Họ và tên</th>
                <th fieldName="GenderName" class="table-employee__header">Giới tính</th>
                <th fieldName="DateOfBirth" class="table-employee__header">Ngày sinh</th>
                <th fieldName="PhoneNumber" class="table-employee__header">Điện thoại</th>
                <th fieldName="Email" class="table-employee__header">Email</th>
                <th fieldName="PositionName" class="table-employee__header">Chức vụ</th>
                <th fieldName="DepartmentName" class="table-employee__header">Phòng ban</th>
                <th fieldName="Salary" class="table-employee__header">Mức lương cơ bản</th>
                <th fieldName="WorkStatus" class="table-employee__header">Tình trạng công việc</th>
            </tr>
            </thead>
            <tbody class="table-employee__body">
                <tr v-for="(employee, index) in employees" :key="index">
                    
                </tr>
            </tbody>
        </table> 
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'TheTable',
    data() {
        return {
            employees: []
        }
    },
    created() {
        axios.get('http://cukcuk.manhnv.net/v1/Employees').then(res => {
            this.employees = res; 
        }).catch(res => {
            console.log(res.data);
        });
    }
}
</script>
<style lang="">
    
</style>