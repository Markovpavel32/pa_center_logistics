<template>
  <div id="app">
    <vue-extend-layouts />
  </div>
</template>

<script>
import VueExtendLayouts from 'vue-extend-layout'

export default {
  name: 'App',
  components: { VueExtendLayouts }
}
</script>

<style lang="scss">
  @font-face {
  font-family: SFUI-Display-Ragular; /* Гарнитура шрифта */
  src: url(../src/assets/SFUIDISPLAY-REGULAR.OTF); /* Путь к файлу со шрифтом */
 }

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
