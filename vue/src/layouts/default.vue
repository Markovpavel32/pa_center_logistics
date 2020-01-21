<template>
    <div class="container">
      <b-navbar>
        <b-navbar-brand>
          <img src="../assets/MainLogo.svg" />
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item><b-icon icon="person-fill" variant="secondary"></b-icon>User</b-nav-item>
          <b-button variant="light">Выход</b-button>
        </b-navbar-nav>
      </b-navbar>
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'default'
}
</script>

<style scoped>

</style>
