<template>
<div>
  <page-header title="Заявки на приём товаров">
    <template slot="actions">
      <b-button variant="warning" squared class="d-flex align-items-center" @click="is_create = !is_create">
        <img src="../../assets/plus-warning-filled.png" width="24" hight="24"/>
        <span>Создать заявку</span>
      </b-button>
    </template>
  </page-header>
  <application-create type="appointment" @close="is_create = $event" v-if="is_create"></application-create>
  <b-table id="application_log_appointment_table" hover small no-local-sorting
           class="common_table"
           :busy="pending"
           :items="data"
           :fields="fields"
           :current-page="current_page"
           :sort-by.sync="table_sorting.sort_by"
           :sort-desc.sync="table_sorting.sort_desc"
           @row-clicked="toggle_details">
    <template v-slot:table-busy>
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Загрузка...</strong>
      </div>
    </template>
    <template v-slot:cell(status)="data">
      <span class="badge status_badge"  :class="status_badge(data.value)">{{ data.value }}</span>
    </template>
    <template v-slot:row-details="row">
      <application-log-details
        @close="toggle_details"
        title="Заявка на прием товара"
        type="appointment"
        :item="row.item"></application-log-details>
    </template>
  </b-table>
  <b-pagination v-model="current_page"
                :total-rows="total_rows"
                :per-page="per_page"
                @change="get_applications"
                aria-controls="application_log_table"></b-pagination>
</div>
</template>

<script>
import { AjaxOperator } from '../../lib/axios'
import moment from 'moment'
import debounce from 'lodash.debounce'
import { STATUS_BADGES } from './CONSTANTS'
import ApplicationCreate from './ApplicationCreate'
import ApplicationLogDetails from './ApplicationLogDetails'
import PageHeader from '../common/PageHeader'

export default {
  name: 'application-log-appointment',
  components: { PageHeader, ApplicationLogDetails, ApplicationCreate },
  data () {
    return {
      pending: false,
      current_page: 1,
      data: [],
      total_rows: 0,
      per_page: 20,
      fields: [
        {
          key: 'document_date',
          label: 'Дата создания',
          sortable: true,
          formatter: (value) => moment(value).format('DD.MM.YYYY hh:mm')
        },
        {
          key: 'document_number',
          label: 'Номер заявки',
          sortable: false
        },
        {
          key: 'status',
          label: 'Статус',
          sortable: true
        },
        {
          key: 'scheduled_date',
          label: 'Дата поставки',
          sortable: true,
          formatter: (value) => moment(value).format('DD.MM.YYYY')
        }
      ],
      is_create: false,
      table_sorting: {
        sort_by: 'document_date',
        sort_desc: true
      }
    }
  },

  created () {
    this.get_applications()
  },

  watch: {
    table_sorting: {
      handler: async function (new_table_sorting) {
        debounce(async (new_table_sorting) => {
          if (new_table_sorting.sort_by) {
            this.toggle_pending()
            await new AjaxOperator('application_log/appointment', this.$store, 'application_appointment').get({
              params: {
                page: this.current_page,
                limit: this.per_page,
                sort_by: new_table_sorting.sort_by,
                sort_desc: new_table_sorting.sort_desc
              }
            })
              .then(data => {
                this.data = data.result
                this.total_rows = data.total
                this.toggle_pending()
              })
          }
        }, 500)(new_table_sorting)
      },
      deep: true
    }
  },

  methods: {
    toggle_pending () {
      this.pending = !this.pending
    },

    status_badge (value) {
      return STATUS_BADGES[value]
    },

    get_applications (page = 1) {
      this.toggle_pending()
      new AjaxOperator('application_log/appointment', this.$store, 'application_appointment').get({
        params: {
          page,
          limit: this.per_page,
          sort_by: this.table_sorting.sort_by,
          sort_desc: this.table_sorting.sort_desc
        }
      })
        .then(data => {
          this.data = data.result
          this.total_rows = data.total
          this.toggle_pending()
        })
        .catch(e => {
          if (e.response.status === 404) this.$router.push({ name: 'login', params: { error_text: 'Войдтите в личный кабинет' } })
        })
    },

    toggle_details (item) {
      this.$set(item, '_showDetails', !item._showDetails)
    }
  }
}
</script>
