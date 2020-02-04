<template>
  <div class="home">
    <b-nav style="padding-left: 40px">
      <b-nav-item>
        {{'На прием'}}
      </b-nav-item>
      <b-nav-item>
        {{'На выдачу'}}
      </b-nav-item>
      <b-nav-item>
        {{'На доставу'}}
      </b-nav-item>
    </b-nav>
    <div class="bold mb-default">
      <h3>Информация о документах</h3>
    </div>
    <b-table id="doc_table" hover small style="border: 2px solid white"
             :items="data.doc_lines"
             :fields="fields"
             :per-page="per_page"
             :current-page="current_page"></b-table>
    <b-pagination v-model="current_page"
                  :total-rows="total_rows"
                  :per-page="per_page"
                  aria-controls="doc_table"></b-pagination>
  </div>
</template>

<script>
// import { normalize, schema } from 'normalizr'
import { axios_get } from '../lib/axios'

export default {
  name: 'home',
  data () {
    return {
      current_page: 1,
      data: {},
      fields: [{
        key: 'doc_number',
        label: 'Номер документа'
      },
      {
        key: 'doc_date',
        label: 'Дата'
      },
      {
        key: 'act_number',
        label: 'Номер акта'
      },
      {
        key: 'shipper',
        label: 'Отправитель груза'
      },
      {
        key: 'status',
        label: 'Статус заказа'
      }],
      total_rows: 0,
      per_page: 20
    }
  },
  created () {
    axios_get('reception_documents')
      .then(res => {
        this.data = res.data
        this.total_rows = this.data.doc_lines.length
      })
      .catch(e => {
        if (e.response.status === 404) this.$router.push({ name: 'login', params: { error_text: 'Войдтите в личный кабинет' } })
      })
  }
}
</script>
