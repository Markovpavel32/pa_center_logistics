<template>
<div>
  <div class="bold mb-default">
    <h3>Заявки на выдачу товаров</h3>
  </div>
  <b-table id="application_log_appointment_table" hover small :busy="pending"
           style="border: 2px solid white; font-size: 13px; line-height: 16px"
           :items="data"
           :fields="fields"
           :per-page="per_page"
           :current-page="current_page">
    <template v-slot:table-busy>
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Загрузка...</strong>
      </div>
    </template>
    <template v-slot:cell(status)="data">
      <span class="badge"  :class="status_badge(data.value)">{{ data.value }}</span>
    </template>
  </b-table>
  <b-pagination v-model="current_page"
                :total-rows="total_rows"
                :per-page="per_page"
                aria-controls="application_log_table"></b-pagination>
</div>
</template>

<script>
import { AjaxOperator } from '../../lib/axios'
import { STATUS_BADGES } from './CONSTANTS'
import moment from 'moment'

export default {
  name: 'application-log-to-issue',
  data () {
    return {
      pending: false,
      current_page: 1,
      data: [],
      total_rows: 0,
      per_page: 20,
      fields: [
        {
          key: 'дата_заявки',
          label: 'Дата создания',
          sortable: true,
          formatter: (value) => moment(value).format('DD.MM.YYYY hh:mm')
        },
        {
          key: 'номер_заявки',
          label: 'Номер заявки',
          sortable: true
        },
        {
          key: 'грузополучатель',
          label: 'Грузополучатель',
          sortable: true
        },
        {
          key: 'плановая_дата',
          label: 'Плановая дата выдачи',
          sortable: true,
          formatter: (value) => moment(value).format('DD.MM.YYYY hh:mm')
        }
      // {
      //   key: 'app_date',
      //   label: 'Дата поставки',
      //   sortable: true,
      //   formatter: (value) => moment(value).format('DD.MM.YYYY')
      // }
      ]
    }
  },

  created () {
    this.toggle_pending()
    new AjaxOperator('application_log/to_issue', this.$store, 'application_to_issue', 'ид').get()
      .then(data => {
        this.data = data
        this.total_rows = this.data.length
        this.toggle_pending()
      })
      .catch(e => {
        if (e.response.status === 404) this.$router.push({ name: 'login', params: { error_text: 'Войдтите в личный кабинет' } })
      })
  },

  methods: {
    toggle_pending () {
      this.pending = !this.pending
    },

    status_badge (value) {
      return STATUS_BADGES[value]
    }
  }
}
</script>
