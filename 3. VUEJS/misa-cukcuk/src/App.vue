<template>
  <div id="app">
    <TheHeader/>
    <TheWrapper/>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheWrapper from './components/layout/TheWrapper.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheWrapper
  }
}
</script>

<style>
@import url('./css/main.css');
</style>
