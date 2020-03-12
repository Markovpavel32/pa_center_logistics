<template>
  <div>
    <b-card bg-variant="light">
      <b-card-title>Новая заявка</b-card-title>
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
            <b-input class="col-sm-7" v-model="model.document_number" placeholder="Укажите номер заявки"></b-input>
          </label>
        </div>
        <div class="col-sm-5">
          <label class="d-flex align-items-center">
            <span class="mr-default">Дата доставки:</span>
            <date-picker v-model="model.scheduled_date" class="form-control" :config="datepicker_options"></date-picker>
          </label>
        </div>
      </div>
      <div class="row mb-default" v-if="type === 'appointment'">
        <div class="col-sm-3">Поставка является возвратом?</div>
        <div class="col-sm-1">
          <div class="d-flex"><span>Да</span><b-radio v-model="refund" value="yes"></b-radio></div>
        </div>
        <div class="col-sm-1">
          <div class="d-flex"><span>Нет</span><b-radio v-model="model.refund" value="no"></b-radio></div>
        </div>
      </div>
      <div class="row mb-default" v-if="type === 'to_issue'">
        <div class="col-sm-3">Самостоятельно доставлю груз</div>
        <div class="col-sm-1">
          <div class="d-flex"><b-checkbox v-model="model.self_delivery"></b-checkbox></div>
        </div>
      </div>
      <div v-if="type === 'to_issue'" class="row mb-default d-flex align-items-center">
        <div class="col-sm-2">Грузополучатель:</div>
        <vue-bootstrap-typeahead class="col-sm-6 pl-0" v-model="model.consignee"></vue-bootstrap-typeahead>
      </div>
      <div class="row mb-default">
        <div class="col-sm-2">Примечание:</div>
        <b-textarea class="col-sm-10"></b-textarea>
      </div>
      <div class="row mb-default">
        <div class="col-sm-2">Список товаров:</div>
      </div>
      <b-table v-if="items.length" :items="items" :fields="product_table_settings.fields">
        <template v-slot:cell(quantity)="data">
          <b-input v-model="model.document_lines[data.index].quantity"></b-input>
        </template>
      </b-table>
      <div class="row justify-content-between">
        <div class="col-sm-2" >
          <b-button variant="primary" @click="modal_show = !modal_show" squared>Добавить товар</b-button>
        </div>
        <div class="col-sm-2" >
          <b-button variant="warning" @click="create_application" squared>Создать заявку</b-button>
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

export default {
  name: 'application-create',
  components: {
    ProductAdd
  },
  props: {
    type: {
      required: true,
      type: String
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
        consignee: ''
      },
      refund: '',
      datepicker_options: {
        format: 'DD.MM.YYYY',
        locale: 'ru'
      },
      items: [],
      modal_show: false,
      product_table_settings: {
        fields: [
          {
            label: 'Артикул',
            key: 'артикул'
          },
          {
            label: 'Штрих-код единицы',
            key: 'штрихкод'
          },
          {
            label: 'Наименование товара',
            key: 'товар_наименование'
          },
          {
            label: 'Количество',
            key: 'quantity'
          },
          {
            label: 'Един. измерения',
            key: 'единица_наименование'
          },
          {
            label: 'Удалить'
          }
        ]
      }
    }
  },

  methods: {
    add (item) {
      this.model.document_lines.push({ 'product': item['товар_ид'], unit: item['единица_ид'], quantity: 0 })
      this.items.push(item)
    },

    create_application () {
      new AjaxOperator('/application_log/appointment').post(this.model).then(result => this.$emit('close', false))
    },

    get (data) {
      console.log(data)
    }
  }
}
</script>
