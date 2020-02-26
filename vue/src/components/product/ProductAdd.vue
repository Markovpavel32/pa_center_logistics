<template>
  <b-modal :visible="modal_show" size="lg" @change="$emit('change', false)" title="Мои товары" centered no-close-on-backdrop hide-footer>
    <b-input placeholder="Поиск по названию, артикулу, штрихкоду" class="product_add__input_filter"></b-input>
  </b-modal>
</template>

<script>
import { AjaxOperator } from '../../lib/axios'

export default {
  name: 'product-add',
  props: {
    modal_show: Boolean
  },

  created () {
    new AjaxOperator('products_list', this.$store, 'products_list', 'товар_ид').get()
      .then(data => {
        this.data = data
        this.total_rows = this.data.length
      })
      .catch(e => {
        if (e.response.status === 404) this.$router.push({ name: 'login', params: { error_text: 'Войдтите в личный кабинет' } })
      })
  }
}
</script>
