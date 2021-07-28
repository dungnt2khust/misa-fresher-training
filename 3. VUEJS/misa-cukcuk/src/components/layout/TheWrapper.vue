<template>
    <div id="wrapper">
        <TheMenu/> 
        <TheContainer 
            :employees="employees"/>
    </div>
</template>
<script>
import TheMenu from './TheMenu.vue';
import TheContainer from './TheContainer.vue';

export default {
    name: 'TheWrapper',
    props: {
        employees: Array
    },
    methods: {
    },
    components: {
        TheMenu,
        TheContainer
    }
}
</script>
<style>
    
</style>