<template>
  <div class="application_log">
    <b-nav style="padding-left: 40px">
      <b-nav-item>
        {{'На прием'}}
      </b-nav-item>
      <b-nav-item>
        {{'На выдачу'}}
      </b-nav-item>
      <b-nav-item>
        {{'На доставку'}}
      </b-nav-item>
    </b-nav>
    <div class="bold mb-default">
      <h3>Заявки на приём товаров</h3>
    </div>
    <b-table id="application_log_table" hover small :busy="pending"
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
import { axios_get } from '../../lib/axios'
import moment from 'moment'

const STATUS_BADGES = {
  'Акцептована': 'badge-primary',
  'Не акцептована': 'badge-danger',
  'В работе': 'badge-warning',
  'Выполнена': 'badge-success',
  'Собрана': 'badge-secondary',
  'Ждет отгрузки': 'badge-info'
}

export default {
  name: 'application-log',
  data () {
    return {
      current_page: 1,
      data: {},
      total_rows: 0,
      per_page: 20,
      fields: [{
        key: 'doc_date',
        label: 'Дата создания',
        sortable: true,
        formatter: (value) => moment(value).format('DD.MM.YYYY hh:mm')
      },
      {
        key: 'app_number',
        label: 'Номер заявки',
        sortable: true
      },
      {
        key: 'status',
        label: 'Статус',
        sortable: true
      },
      {
        key: 'app_date',
        label: 'Дата приёма',
        sortable: true,
        formatter: (value) => moment(value).format('DD.MM.YYYY')
      },
      {
        key: 'act_number',
        label: 'Акт исполнителя',
        sortable: true
      },
      {
        key: 'service_cost',
        label: 'Стоимость услуг',
        sortable: true,
        tdClass: 'application_log__service_cost_column'
      }],
      moment,
      pending: false
    }
  },
  created () {
    this.toggle_pending()
    axios_get('application_log')
      .then(res => {
        this.data = res.data
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
