<template>
    <div class="container">
      <b-navbar class="mt-l">
        <b-navbar-brand>
          <img src="../assets/MainLogo.svg" width="270" height="30"/>
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item><b-icon icon="person-fill" variant="secondary"></b-icon>
            <span class="default__username">{{ username }}</span>
          </b-nav-item>
          <b-button class="default__exit_btn" variant="light">Выход</b-button>
        </b-navbar-nav>
      </b-navbar>
      <b-nav fill class="mt-sm">
        <b-nav-item :to="{name: 'application_log' }" active-class="active-link" link-classes="nav-link" class="">
          <span class="default__layout__nav_item">
            <img src="../assets/application_log.svg" />
            {{'Журнал заявок'}}
          </span>
        </b-nav-item>
        <b-nav-item :to="{name: 'my_data' }" link-classes="nav-link" active-class="active-link">
          <span class="default__layout__nav_item">
            <img src="../assets/my_data.png" height="22" width="22"/>
            {{'Мои данные'}}
          </span>
        </b-nav-item>
        <b-nav-item :to="{name: 'documents_log' }" link-classes="nav-link" active-class="active-link">
          <span class="default__layout__nav_item">
            <img src="../assets/documents_log.png" height="22" width="22"/>
            {{'Журнал документов'}}
          </span>
        </b-nav-item>
        <b-nav-item :to="{name: 'statistics' }" link-classes="nav-link" active-class="active-link">
          <span class="default__layout__nav_item">
            <img src="../assets/statistics.png" height="22" width="22"/>
            {{'Статистика и отчеты'}}
          </span>
        </b-nav-item>
        <b-nav-item :to="{name: 'disputes' }" link-classes="nav-link" active-class="active-link">
          <span class="default__layout__nav_item">
            <img src="../assets/disputes.png" height="22" width="22"/>
            {{'Споры'}}
          </span>
        </b-nav-item>
        <b-nav-item :to="{name: 'payment' }" link-classes="nav-link" active-class="active-link">
          <span class="default__layout__nav_item">
            <img src="../assets/payment.png" height="22" width="22"/>
            {{'Оплата'}}
          </span>
        </b-nav-item>
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
