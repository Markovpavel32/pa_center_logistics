<template>
  <div>
    <page-header title="Список товаров">
      <template slot="actions">
        <b-button variant="warning" squared class="d-flex align-items-center" @click="is_create = !is_create">
          <img src="../../assets/plus-warning-filled.png" width="24" hight="24"/>
          <span>Создать заявку</span>
        </b-button>
      </template>
    </page-header>
    <product-create v-if="is_create"
                    @close="is_create = $event"
                    title="Новая заявка на добавление товара"
    ></product-create>
    <b-table id="products_list" hover small no-local-sorting
             style="border: 2px solid white; font-size: 13px; line-height: 16px"
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
                @change="get_products_list"
                aria-controls="products_list"></b-pagination>
  </div>
</template>

<script>
import PageHeader from '../common/PageHeader'
import { AjaxOperator } from '../../lib/axios'
import debounce from 'lodash.debounce'
import ProductCreate from './ProductCreate'
export default {
  name: 'products-list',
  components: { ProductCreate, PageHeader },
  data () {
    return {
      pending: false,
      current_page: 1,
      data: [],
      total_rows: 0,
      per_page: 20,
      fields: [{
        key: 'vendor_code',
        label: 'Артикул',
        sortable: true
      },
      {
        key: 'name',
        label: 'Название',
        sortable: true
      },
      {
        key: 'products_group',
        label: 'Группа',
        sortable: true
      },
      {
        key: 'cost',
        label: 'Сотимость',
        sortable: true
      },
      {
        label: 'Статус'
      }],
      table_sorting: {
        sort_by: 'name',
        sort_desc: false
      },
      is_create: false
    }
  },

  created () {
    this.get_products_list()
  },

  watch: {
    table_sorting: {
      handler: async function (new_table_sorting) {
        debounce(async (new_table_sorting) => {
          if (new_table_sorting.sort_by) {
            this.toggle_pending()
            new AjaxOperator('products_list', this.$store, 'products').get({
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

    get_products_list (page = 1) {
      this.toggle_pending()
      new AjaxOperator('products_list', this.$store, 'products').get({
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
