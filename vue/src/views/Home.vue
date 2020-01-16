<template>
  <div class="home mt-xxxl">
    <div class="bold mb-default">
      <h3>Информация о документах</h3>
    </div>
    <b-table striped hover :items="data.doc_lines" :fields="fields"></b-table>
  </div>
</template>

<script>

import { axios_get } from '../lib/axios'

export default {
  name: 'home',
  data () {
    return {
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
      }]
    }
  },
  created () {
    axios_get('reception_documents')
      .then(resp => {
        console.log(resp)
        this.data = resp.data
      })
  }
}
</script>
