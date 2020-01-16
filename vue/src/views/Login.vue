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
        <button class="btn btn-danger d-block w-100 mb-default" @click="auth">Войти в кабинет</button>
        <router-link :to="{ name: 'registration' }" class="btn btn-secondary d-block w-100" tag="button">Получить логин и пароль</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { axios_post } from '../lib/axios'

export default {
  name: 'login',

  data () {
    return {
      login: '',
      password: '',
      error_text: ''
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
        .catch((e, res, req) => {
          console.log(e.message, res, req)
          this.error_text = e.response.data
        })
    }
  }
}
</script>

<style scoped>

</style>
