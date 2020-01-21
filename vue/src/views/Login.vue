<template>
  <div class="d-flex flex-column mt-xxxl align-items-center">
    <div class="d-flex flex-column">
      <div class="mb-3 align-self-center">
        <h3 class="bold">Личный кабинет клиента</h3>
      </div>
      <div>
        <div class="font-weight-bold mb-default">
          <h5>Авторизация</h5>
        </div>
        <div class="mb-default">Для входа используйте предоставленный логин и пароль</div>
        <b-alert dismissible :show="Boolean(error_text)" variant="danger" @dismissed="error_text = ''">{{ error_text }}</b-alert>
        <div class="form-group">
          <input v-model="login" class="mb-default form-control" placeholder="Логин"/>
        </div>
        <div class="form-group">
          <input type="password" v-model="password" class="mb-default form-control" placeholder="Пароль"/>
        </div>
        <b-button squared class="d-block w-100 mb-default" variant="danger" @click="auth">
          <span v-if="!pending">Войти в кабинет</span>
          <b-spinner v-else small></b-spinner>
        </b-button>
        <router-link :to="{ name: 'registration' }" class="btn btn-secondary rounded-0 d-block w-100" tag="button">Получить логин и пароль</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { axios_post } from '../lib/axios'

export default {
  name: 'login',

  data () {
    const env = process.env.NODE_ENV
    return {
      login: '',
      password: '',
      error_text: '',
      pending: false,
      env
    }
  },

  computed: {
    model () {
      return {
        login: this.login,
        password: this.password
      }
    },

    is_valid () {
      return this.login && this.password && !this.pending
    }
  },

  methods: {
    auth () {
      if (this.is_valid) {
        this.toggle_pending()
        axios_post('/login', this.model)
          .then(() => {
            this.toggle_pending()
            this.$router.push({ name: 'home' })
          })
          .catch((e) => {
            this.toggle_pending()
            this.error_text = e.response.data
          })
      } else {
        this.error_text = 'Введите логин/пароль'
      }
    },

    toggle_pending () {
      this.pending = !this.pending
    }
  }
}
</script>

<style scoped>

</style>
