<template>
    <div id="wrapper">
        <TheMenu/> 
        <TheContainer/>
    </div>
</template>
<script>
import TheMenu from './TheMenu.vue';
import TheContainer from './TheContainer.vue';

export default {
    name: 'TheWrapper',
    components: {
        TheMenu,
        TheContainer
    }
}
</script>
<style>
    
</style>