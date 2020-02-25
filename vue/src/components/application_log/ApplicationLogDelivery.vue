<template>
<div>
  <div class="bold mb-default">
    <h3>Заявки на доставку товаров</h3>
  </div>
</div>
</template>

<script>
// import { axios_get } from '../../lib/axios'

export default {
  name: 'application-log-delivery',

  data () {
    return {
      pending: false,
      current_page: 1,
      data: {},
      total_rows: 0,
      per_page: 20
    }
  },

  // created () {
  //   this.toggle_pending()
  //   axios_get('application_log/delivery')
  //     .then(res => {
  //       this.data = res.data
  //       this.total_rows = this.data.length
  //       this.toggle_pending()
  //     })
  //     .catch(e => {
  //       if (e.response.status === 404) this.$router.push({ name: 'login', params: { error_text: 'Войдтите в личный кабинет' } })
  //     })
  // },

  methods: {
    toggle_pending () {
      this.pending = !this.pending
    }
  }
}
</script>
