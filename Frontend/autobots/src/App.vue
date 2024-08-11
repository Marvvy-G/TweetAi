<template>
  <div id="app">
    <AutobotComponent />
  </div>
</template>

<script>
import AutobotComponent from './components/AutobotComponent.vue';

export default {
  name: 'App',
  components: {
    AutobotComponent
  }
}
</script>

<style lang="scss">
body {
  background-color: #000;
  font-family: "Rockwell", serif;
}

h3 {
  color: aliceblue;
  font-size: 28px;
  font-weight: 700;
}
</style>
