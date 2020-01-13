<template>
  <div class="container">
    <span class="row">Личный кабинет клиента</span>
    <span class="row font-weight-bold">Авторизация</span>
    <span class="row">Для входа используйте предоставленный логин и пароль</span>
    <input v-model="login" class="row"/>
    <input v-model="password" class="row"/>
    <button class="btn btn-danger d-block row" @click="auth()">Войти в кабинет</button>
    <button class="btn btn-secondary d-block row">Получить логин и пароль</button>
  </div>
</template>

<script>
import { axios_post } from '../lib/axios'

export default {
  name: 'login',

  data () {
    return {
      login: '',
      password: ''
    }
  },

  computed: {
    model () {
      return {
        login: this.login,
        password: this.password
      }
    }
  },

  methods: {
    auth () {
      axios_post('/login', this.model)
        .then(() => { this.$router.push({ name: 'home' }) })
    }
  }
}
</script>

<style scoped>

</style>
