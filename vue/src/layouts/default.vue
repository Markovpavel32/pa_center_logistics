<template>
    <div class="container">
      <b-navbar>
        <b-navbar-brand>
          <img src="../assets/MainLogo.svg" />
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item><b-icon icon="person-fill" variant="secondary"></b-icon>{{ username }}</b-nav-item>
          <b-button variant="light">Выход</b-button>
        </b-navbar-nav>
      </b-navbar>
      <router-view></router-view>
    </div>
</template>

<script>

import { axios_get } from '../lib/axios'
import { Auth } from '../components/login/data_presenters'

export default {
  name: 'default',
  created () {
    axios_get('/user_data')
      .then(res => new Auth().login(res.data, this.$store))
  },
  computed: {
    username () {
      return this.$store.state.login && this.$store.state.login.user.login
    }
  }
}
</script>

<style scoped>

</style>
