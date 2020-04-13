<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <main-video ></main-video>
    <tabs style="margin-top:2rem"></tabs>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import MainVideo from './components/MainVideo'
import Tabs from './components/pageCon/Tabs'
export default {
  name: 'app',
  components: {
    // HelloWorld
    MainVideo,
    Tabs
  }
}
</script>

<style lang="scss">

</style>


