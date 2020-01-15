<template>
  <div id="app" class="container">
    <img src="./assets/MainLogo.png"/>
    <router-view/>
  </div>
</template>

<style lang="scss">
  @font-face {
  font-family: SFUI-Display-Ragular; /* Гарнитура шрифта */
  src: url(../src/assets/SFUIDISPLAY-REGULAR.OTF); /* Путь к файлу со шрифтом */
 }

#app {
  /*font-family: SFUI-Display-Ragular;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*color: #2c3e50;*/
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
