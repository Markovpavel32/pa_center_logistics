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
      <b-nav fill>
        <b-nav-item :to="{name: 'application_log' }" active-class="active-link" link-classes="nav-link" class="">
          <span class="application_log_item">
            <img src="../assets/application_log.svg" />
            {{'Журнал заявок'}}
          </span>
        </b-nav-item>
        <b-nav-item link-classes="nav-link">{{'Мои товары'}}</b-nav-item>
        <b-nav-item link-classes="nav-link">{{'Журнал документов'}}</b-nav-item>
        <b-nav-item link-classes="nav-link">{{'Статистика и отчеты'}}</b-nav-item>
        <b-nav-item link-classes="nav-link">{{'Споры'}}</b-nav-item>
        <b-nav-item link-classes="nav-link">{{'Оплата'}}</b-nav-item>
      </b-nav>
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
