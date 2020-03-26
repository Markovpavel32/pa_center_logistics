<template>
  <div>
    <div>
    <page-header title="Список грузополучателей"></page-header>
    <b-table id="products_list" hover small no-local-sorting
             :busy="pending"
             :items="data"
             :fields="fields"
             :sort-by.sync="table_sorting.sort_by"
             :sort-desc.sync="table_sorting.sort_desc"
             :current-page="current_page">
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Загрузка...</strong>
        </div>
      </template>
    </b-table>
    <b-pagination v-model="current_page"
                :total-rows="total_rows"
                :per-page="per_page"
                @change="get_consignees_list"
                aria-controls="products_list"></b-pagination>
  </div>
  </div>
</template>

<script>
import PageHeader from '../common/PageHeader'
import { AjaxOperator } from '../../lib/axios'
import debounce from 'lodash.debounce'
export default {
  name: 'consignees-list',
  components: { PageHeader },
  data () {
    return {
      pending: false,
      current_page: 1,
      data: [],
      total_rows: 0,
      per_page: 20,
      fields: [{
        key: 'id',
        label: 'ID',
        sortable: true
      },
      {
        key: 'consignee_name',
        label: 'Название',
        sortable: true
      },
      {
        key: 'consignee_address',
        label: 'Адресс',
        sortable: true
      }],
      table_sorting: {
        sort_by: 'consignee_name',
        sort_desc: true
      }
    }
  },

  created () {
    this.get_consignees_list()
  },

  watch: {
    table_sorting: {
      handler: async function (new_table_sorting) {
        debounce(async (new_table_sorting) => {
          if (new_table_sorting.sort_by) {
            this.toggle_pending()
            new AjaxOperator('/consignees_list', this.$store, 'consignees').get({
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

    get_consignees_list (page = 1) {
      this.toggle_pending()
      new AjaxOperator(`/consignees_list`, this.$store, 'consignees').get({
        params: {
          page,
          limit: this.per_page,
          sort_by: this.table_sorting.sort_by,
          sort_desc: this.table_sorting.sort_desc
        }
      })
        .then(data => {
          this.data = []
          this.data = data.result
          this.total_rows = data.total
          this.toggle_pending()
          return this.data
        })
        .catch(e => {
          this.toggle_pending()
          if (e.response.status === 404) this.$router.push({ name: 'login', params: { error_text: 'Войдтите в личный кабинет' } })
        })
    }
  }
}
</script>
