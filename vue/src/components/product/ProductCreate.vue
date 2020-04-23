<template>
  <div>
    <b-card bg-variant="light">
      <i @click="$emit('close', false)" class="icon-remove ml-auto d-flex flex-row-reverse clickable"></i>
      <div>{{ object }}</div>
      <div class="d-flex justify-content-between">
        <b-card-title>
          <span class="mr-default">{{ title }}</span>
          <slot name="status"></slot>
        </b-card-title>
        <div>
          <slot name="actions"></slot>
        </div>
      </div>
      <div class="ml-md">
        <div class="row mb-default">
          <div class="d-flex align-items-center col-sm-6">
            <span class="mr-default col-sm-4 text-right">Наименование</span>
            <b-input class="col-sm-10" :value="model.name" placeholder="Укажите наименование товара"></b-input>
          </div>
        </div>
        <div class="row mb-default">
          <div class="d-flex align-items-center col-sm-6">
            <span class="mr-default col-sm-4 text-right">Артикул</span>
            <b-input class="col-sm-10" :value="model.vendor_code" placeholder="Укажите артикульный номер товара"></b-input>
          </div>
        </div>
        <div class="row mb-default">
          <div class="d-flex align-items-center col-sm-6">
            <span class="mr-default col-sm-4 text-right">Характеристика</span>
            <b-input class="col-sm-10" :value="model.size" placeholder="Укажите наименование товара"></b-input>
          </div>
        </div>
        <div class="row mb-default">
          <div class="d-flex align-items-center col-sm-6">
            <span class="mr-default col-sm-4 text-right">Группа</span>
            <b-input class="col-sm-10" :value="model.group" placeholder="Укажите наименование товара"></b-input>
          </div>
        </div>
        <div>
          <b-form-group label="Единица измерения:">
            <div class="row">
              <span class="col-sm-2 text-right">Штука</span>
              <b-radio v-model="model.product_detail_name" class="d-inline" value="Штука"></b-radio>
            </div>
            <div class="row">
              <span class="col-sm-2 text-right">Блок</span>
              <b-radio v-model="model.product_detail_name" class="d-inline" value="Блок"></b-radio>
            </div>
            <div class="row">
              <span class="col-sm-2 text-right">Короб</span>
              <b-radio v-model="model.product_detail_name" class="d-inline" value="Короб"></b-radio>
            </div>
            <div class="row">
              <span class="col-sm-2 text-right">Паллет</span>
              <b-radio v-model="model.product_detail_name" class="d-inline" value="Паллет"></b-radio>
            </div>
          </b-form-group>
        </div>
        <div>{{ 'Характеристики ' + options[model.product_detail_name] + ':' }}</div>
        <div class="row mb-default">
          <div class="d-flex align-items-center col-sm-5">
            <span class="mr-default col-sm-5 text-right">Д.Ш.В. см</span>
            <b-input class="col-sm-2" :value="model.group"></b-input>
            <span class="mx-xs">X</span>
            <b-input class="col-sm-2" :value="model.group"></b-input>
            <span class="mx-xs">X</span>
            <b-input class="col-sm-2" :value="model.group"></b-input>
          </div>
          <div class="d-flex align-items-center col-sm-2">
            <span class="col-sm-9">Объем, м2</span>
            <b-input class="col-sm-4" :value="model.group"></b-input>
          </div>
          <div class="d-flex align-items-center col-sm-2">
            <span class="col-sm-7">Вес, кг</span>
            <b-input class="col-sm-4" :value="model.group"></b-input>
          </div>
          <div class="d-flex align-items-center col-sm-2">
            <span class="col-sm-9">Стоимость</span>
            <b-input class="col-sm-6" :value="model.group"></b-input>
          </div>
        </div>
        <div class="row mb-default">
          <div class="d-flex align-items-center col-sm-6">
            <span class="mr-default col-sm-4 text-right">Кол-во единиц в блоке</span>
            <b-input class="col-sm-4" :value="model.group"></b-input>
          </div>
        </div>
        <div class="row mb-default">
          <div class="d-flex align-items-center col-sm-6">
            <span class="mr-default col-sm-4 text-right">Штрих-код</span>
            <b-input class="col-sm-8" :value="model.group"></b-input>
          </div>
        </div>
        <div class="row mb-default">
          <div class="col-sm-6">
            <div class="offset-sm-4 col-sm-4">
              <b-button class="pl-default" variant="primary" squared>Добавить товар</b-button>
            </div>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'ProductCreate',
  props: {
    title: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      model: {
        name: '',
        vendor_code: '',
        size: '',
        group: '',
        product_detail_name: 'Штука'
      },
      options: {
        'Штука': 'штуки',
        'Блок': 'блока',
        'Короб': 'короба',
        'Паллет': 'паллета'
      },
      object: [1, 2, 3]
    }
  }
}
</script>

<style scoped>

</style>
