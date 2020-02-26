<template>
  <div>
    <b-card bg-variant="light">
      <b-card-title>Новая заявка</b-card-title>
      <div class="row mb-default">
        <div class="col-sm-3">
          <label class="d-flex align-items-center">
            <span class="mr-default">Дата заявки:</span>
            <b-input class="col-sm-6" :value="model.app_date" readonly></b-input>
          </label>
        </div>
        <div class="col-sm-4">
          <label class="d-flex align-items-center">
            <span class="mr-default">Номер заявки:</span>
            <b-input class="col-sm-7" v-model="model.app_number" placeholder="Укажите номер заявки"></b-input>
          </label>
        </div>
        <div class="col-sm-5">
          <label class="d-flex align-items-center">
            <span class="mr-default">Дата доставки:</span>
            <b-input class="col-sm-8" v-model="model.delivery_date" placeholder="Укажите дату доставки товара"></b-input>
          </label>
        </div>
      </div>
      <div class="row mb-default">
        <div class="col-sm-3">Поставка является возвратом?</div>
        <div class="col-sm-1">
          <div class="d-flex"><span>Да</span><b-radio v-model="model.refund" name="some-radios" value="yes"></b-radio></div>
        </div>
        <div class="col-sm-1">
          <div class="d-flex"><span>Нет</span><b-radio v-model="model.refund" name="some-radios" value="no"></b-radio></div>
        </div>
      </div>
      <div class="row mb-default">
        <div class="col-sm-2">Примечание:</div>
        <b-textarea class="col-sm-10"></b-textarea>
      </div>
      <div class="row mb-default">
        <div class="col-sm-2">Список товаров:</div>
      </div>
      <div class="row">
        <div class="col-sm-2" >
          <b-button variant="primary" @click="modal_show = !modal_show" squared>Добавить товар</b-button>
        </div>
      </div>
    </b-card>
    <product-add v-if="modal_show" :modal_show="modal_show" @change="modal_show = $event"></product-add>
  </div>
</template>

<script>
import moment from 'moment'
import ProductAdd from '../product/ProductAdd'

export default {
  name: 'application-create',
  components: {
    ProductAdd
  },
  data () {
    return {
      moment,
      model: {
        app_date: moment(new Date()).format('DD.MM.YYYY'),
        app_number: '',
        delivery_date: '',
        refund: ''
      },
      modal_show: false
    }
  }
}
</script>
