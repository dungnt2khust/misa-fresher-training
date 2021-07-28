<template lang="">
    <div id="main">
        <TheHeader/>
        <TheWrapper 
            :employees="employees"
            @employeeRowClick="employeeRowClick($event)"/>
    </div>
</template>
<script>
import TheHeader from './TheHeader.vue'
import TheWrapper from './TheWrapper.vue'

export default {
    name: "TheMain",
    props: {
        employees: Array
    },
    methods: {
        employeeRowClick(event) {
            this.$emit('employeeRowClick', event);
        }
    },
    components: {
        TheHeader,
        TheWrapper
    }
}
</script>
<style lang="">
    
</style>