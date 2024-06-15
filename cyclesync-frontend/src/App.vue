<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/cyclesync.png">
    <CycleTracker msg="Welcome to Your Vue.js App"/> <!-- Utilizing CycleTracker component -->
  </div>
</template>

<script>
import CycleTracker from './components/CycleTracker.vue' // Correctly named import

export default {
  name: 'App',
  components: {
    CycleTracker // Registering CycleTracker
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
