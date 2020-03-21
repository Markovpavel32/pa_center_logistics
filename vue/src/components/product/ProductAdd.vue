<template>
  <b-modal :visible="modal_show" size="lg" @change="$emit('change', false)" title="Мои товары" centered no-close-on-backdrop hide-footer>
    <b-input placeholder="Поиск по названию, артикулу, штрихкоду" class="product_add__input_filter"></b-input>
    <b-table id="application_log_appointment_table" hover small :busy="pending"
           style="border: 2px solid white; font-size: 13px; line-height: 16px"
           :items="data"
           :fields="fields"
           :current-page="current_page">
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Загрузка...</strong>
        </div>
      </template>
      <template v-slot:cell(add)="data">
        <a class="btn btn-link no-padding btn-sm" @click="$emit('add', data.item)">Добавить</a>
      </template>
    </b-table>
    <b-pagination v-model="current_page"
                  :total-rows="total_rows"
                  :per-page="per_page"
                  @change="get_products_list"
                  aria-controls="application_log_table"></b-pagination>
  </b-modal>
</template>

<script>
import { AjaxOperator } from '../../lib/axios'

export default {
  name: 'product-add',
  props: {
    modal_show: Boolean
  },

  data () {
    return {
      pending: false,
      current_page: 1,
      data: [],
      total_rows: 0,
      per_page: 20,
      fields: [{
        key: 'name',
        label: 'Название',
        sortable: true
      },
      {
        key: 'vendor_code',
        label: 'Артикул',
        sortable: true
      },
      {
        key: 'barcode',
        label: 'Штрих-код',
        sortable: true
      },
      {
        key: 'add',
        label: '',
        sortable: true
      }]
    }
  },

  created () {
    this.get_products_list()
  },

  methods: {
    get_products_list (page = 1) {
      this.toggle_pending()
      new AjaxOperator('products_list', this.$store, 'products').get({
        params: {
          page,
          limit: this.per_page
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
    },

    toggle_pending () {
      this.pending = !this.pending
    }
  }
}
</script>
