<template>
  <div>
    <b-card bg-variant="light">
      <i @click="$emit('close', false)" class="icon-remove ml-auto d-flex flex-row-reverse clickable"></i>
      <div class="d-flex justify-content-between">
        <b-card-title>{{ title }}</b-card-title>
        <div>
          <slot name="actions"></slot>
        </div>
      </div>
      <div class="row mb-default">
        <div class="col-sm-3">
          <label class="d-flex align-items-center">
            <span class="mr-default">Дата заявки:</span>
            <b-input class="col-sm-6" :value="model.document_date" readonly></b-input>
          </label>
        </div>
        <div class="col-sm-4">
          <label class="d-flex align-items-center">
            <span class="mr-default">Номер заявки:</span>
            <b-input class="col-sm-7"
                     required
                     v-model="model.document_number"
                     placeholder="Укажите номер заявки"
                     :readonly="!is_edit_mode"></b-input>
          </label>
        </div>
        <div class="col-sm-5">
          <label class="d-flex align-items-center">
            <span class="mr-default">Дата доставки:</span>
            <date-picker v-model="model.scheduled_date"
                         class="form-control"
                         :config="datepicker_options"
                         :disabled="!is_edit_mode"></date-picker>
          </label>
        </div>
      </div>
      <div class="row mb-default" v-if="type === 'appointment'">
        <div class="col-sm-3">Заявка является возвратом?</div>
        <div class="col-sm-1">
          <div class="d-flex"><span>Да</span><b-radio v-model="model.it_return" :value="true"></b-radio></div>
        </div>
        <div class="col-sm-1">
          <div class="d-flex"><span>Нет</span><b-radio v-model="model.it_return" :value="false"></b-radio></div>
        </div>
      </div>
      <div class="row mb-default" v-if="type === 'to_issue'">
        <div class="col-sm-3">Самостоятельно доставлю груз</div>
        <div class="col-sm-1">
          <div class="d-flex"><b-checkbox v-model="model.self_delivery" :disabled="!is_edit_mode"></b-checkbox></div>
        </div>
      </div>
      <div v-if="type === 'to_issue'" class="row mb-default d-flex align-items-center">
        <div class="col-sm-2">Грузополучатель:</div>
        <b-input v-if="!is_edit_mode" class="col-sm-6 pl-0" v-model="query" readonly/>
        <vue-bootstrap-typeahead v-else class="col-sm-6 pl-0"
                                 v-model="query"
                                 :serializer="item => item.name"
                                 :data="consignee_list"
                                 @hit="model.consignee = $event.id"
                                 >
          <template slot="suggestion" slot-scope="{ data }">
            <div>
              {{ data.name }}
            </div>
            <div class="text-secondary">
              <small>{{ data.address }}</small>
            </div>
          </template>
        </vue-bootstrap-typeahead>
      </div>
      <div class="row mb-default">
        <div class="col-sm-2">Примечание:</div>
        <b-textarea v-model="model.note" class="col-sm-10" :disabled="!is_edit_mode"></b-textarea>
      </div>
      <div class="row mb-default">
        <div class="col-sm-2">Список товаров:</div>
      </div>
      <products-table :is_edit_mode="is_edit_mode" @remove_product="remove_product" :model.sync="model" :products="products" :key="item && item.id"></products-table>
      <div class="row justify-content-between">
        <div class="col-sm-2" >
          <b-button v-if="is_edit_mode" variant="primary" @click="modal_show = !modal_show" squared>Добавить товар</b-button>
        </div>
        <div class="col-sm-2" >
          <b-button v-if="model.document_lines.length && is_edit_mode" variant="warning" @click="create_application" squared>Создать заявку</b-button>
        </div>
      </div>
    </b-card>
    <product-add @add="add" v-if="modal_show" :modal_show="modal_show" @change="modal_show = $event"></product-add>
  </div>
</template>

<script>
import moment from 'moment'
import ProductAdd from '../product/ProductAdd'
import { AjaxOperator } from '../../lib/axios'
import ProductsTable from '../product/ProductsTable'
import debounce from 'lodash.debounce'

export default {
  name: 'application-create',
  components: {
    ProductsTable,
    ProductAdd
  },
  props: {
    type: {
      required: true,
      type: String
    },
    title: {
      required: false,
      default: 'Новая заявка',
      type: String
    },
    item: {
      required: false,
      type: Object
    },
    is_edit_mode: {
      required: false,
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      moment,
      model: {
        document_date: moment(new Date()).format('DD.MM.YYYY'),
        document_number: '',
        scheduled_date: '',
        document_lines: [],
        self_delivery: false,
        consignee: '',
        it_return: false,
        note: '',
        id: ''
      },
      datepicker_options: {
        format: 'DD.MM.YYYY',
        locale: 'ru'
      },
      products: [],
      modal_show: false,
      consignee_list: [],
      query: ''
    }
  },

  created () {
    if (this.item) {
      this.model = {
        ...this.model,
        document_date: moment(this.item.document_date).format('DD.MM.YYYY'),
        document_number: this.item.document_number,
        scheduled_date: moment(this.item.scheduled_date).format('DD.MM.YYYY'),
        id: this.item.id
      }
      if (this.item.consignee_name) {
        this.query = this.item.consignee_name
        this.consignee_list.push({ name: this.item.consignee_name, id: this.item.consignee_id })
      }

      if (this.item.it_return) {
        this.model.it_return = true
      }

      new AjaxOperator(`/application_log/${this.type}/products`, this.$store, 'products')
        .get({
          params: {
            id: this.item.id
          }
        })
        .then(data => {
          this.products = data.result
          this.model.document_lines = data.result
        })
    }
  },

  watch: {
    query: debounce(function (new_query) {
      new AjaxOperator(`/application_log/to_issue/consignees`, this.$store, 'consignees').get({
        params: {
          name: new_query
        }
      })
        .then(response => {
          this.consignee_list = response.result
        })
    }, 500)
  },

  methods: {
    add (product) {
      this.products.push(product)
      this.model.document_lines.push({ 'product': product.id, unit: product.product_detail_id, quantity: 0 })
    },

    create_application () {
      let data = {}
      data = this.prepare_data(data)
      new AjaxOperator(`/application_log/${this.type}`)
        .post(data)
        .then(result => this.$emit('close', false))
    },

    remove_product (index) {
      this.products.splice(index, 1)
      this.model.document_lines.splice(index, 1)
    },

    prepare_data (data) {
      if (this.type === 'appointment') {
        data = {
          document_date: moment(this.model.document_date, 'DD.MM.YYYY', 'ru').format('YYYY-MM-DDThh:mm:ss.SSSZ'),
          scheduled_date: moment(this.model.scheduled_date, 'DD.MM.YYYY', 'ru').format('YYYY-MM-DDThh:mm:ss.SSSZ'),
          document_number: this.model.document_number,
          document_lines: [...this.model.document_lines]
        }
        if (this.model.it_return) {
          data.it_return = this.model.it_return
        }
        if (this.model.note) {
          data.note = this.model.note
        }
      } else if (this.type === 'to_issue') {
        data = {
          document_date: moment(this.model.document_date, 'DD.MM.YYYY', 'ru').format('YYYY-MM-DDThh:mm:ss.SSSZ'),
          scheduled_date: moment(this.model.scheduled_date, 'DD.MM.YYYY', 'ru').format('YYYY-MM-DDThh:mm:ss.SSSZ'),
          document_number: this.model.document_number,
          document_lines: [...this.model.document_lines],
          need_delivery: !this.model.self_delivery,
          consignee: this.model.consignee
        }
        if (this.model.note) {
          data.note = this.model.note
        }
      }
      return data
    }
  }
}
</script>
