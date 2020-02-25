<template>
  <div class="application_log">
    <b-nav style="padding-left: 40px">
      <b-nav-item :to="{ name: 'application_log_appointment' }">
        <i v-if="$route.name === 'application_log_appointment'" class="icon-minus"></i>
        <i v-else class="icon-plus"></i>
        {{'На прием'}}
      </b-nav-item>
      <b-nav-item :to="{ name: 'application_log_to_issue' }" :active="tab === 2" @click="tab = 2">
        <i v-if="$route.name === 'application_log_to_issue'" class="icon-minus"></i>
        <i v-else class="icon-plus"></i>
        {{'На выдачу'}}
      </b-nav-item>
      <b-nav-item :to="{ name: 'application_log_delivery' }" :active="tab === 3" @click="tab = 3">
        <i v-if="$route.name === 'application_log_delivery'" class="icon-minus"></i>
        <i v-else class="icon-plus"></i>
        {{'На доставку'}}
      </b-nav-item>
    </b-nav>
    <router-view></router-view>
<!--    <div class="bold mb-default">-->
<!--      <h3>Заявки на приём товаров</h3>-->
<!--    </div>-->
<!--    <b-table id="application_log_table" hover small :busy="pending"-->
<!--             style="border: 2px solid white; font-size: 13px; line-height: 16px"-->
<!--             :items="data"-->
<!--             :fields="fields"-->
<!--             :per-page="per_page"-->
<!--             :current-page="current_page">-->
<!--      <template v-slot:table-busy>-->
<!--        <div class="text-center text-danger my-2">-->
<!--          <b-spinner class="align-middle"></b-spinner>-->
<!--          <strong>Загрузка...</strong>-->
<!--        </div>-->
<!--      </template>-->
<!--      <template v-slot:cell(status)="data">-->
<!--        <span class="badge"  :class="status_badge(data.value)">{{ data.value }}</span>-->
<!--      </template>-->
<!--    </b-table>-->
<!--    <b-pagination v-model="current_page"-->
<!--                  :total-rows="total_rows"-->
<!--                  :per-page="per_page"-->
<!--                  aria-controls="application_log_table"></b-pagination>-->
  </div>
</template>

<script>
import moment from 'moment'

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
      pending: false,
      tab: 1
    }
  },

  computed: {
    isAppointment () {
      return this.$route.name === 'application_log_appointment'
    }
  }

// status_badge (value) {
//   return STATUS_BADGES[value]
// }
}
</script>
