<template lang="">
    <div id="main">
        <TheHeader/>
        <TheWrapper 
            :employees="employees"/>
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
    },
    components: {
        TheHeader,
        TheWrapper
    }
}
</script>
<style lang="">
    
</style>