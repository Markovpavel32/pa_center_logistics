<template>
  <b-table
    v-if="products.length"
    :items="products"
    :fields="fields"
    style="{background-color: transparent}"
    class="products_table"
  >
    <template v-slot:cell(quantity)="data">
      <b-input v-model="model.document_lines[data.index].quantity" :readonly="!is_edit_mode"></b-input>
    </template>
    <template v-slot:cell(remove)="row">
      <i class="icon-remove clickable" @click="$emit('remove_product', row.index)"></i>
    </template>
  </b-table>
</template>

<script>
export default {
  name: 'products-table',
  props: {
    model: {
      required: true,
      type: Object
    },
    products: {
      required: true,
      type: Array
    },
    is_edit_mode: {
      required: true,
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      default_fields: [
        {
          key: 'vendor_code',
          label: 'Артикул',
          class: 'products_table__vendor_code_column'
        },
        {
          key: 'barcode',
          label: 'Штрих-код единицы',
          class: 'products_table__barcode_column'
        },
        {
          key: 'name',
          label: 'Наименование товара',
          class: 'products_table__name_column'
        },
        {
          key: 'quantity',
          label: 'Количество',
          class: 'products_table__quantity_column'
        },
        {
          key: 'product_detail_name',
          label: 'Един. измерения',
          class: 'products_table__product_detail_name_column'
        }
      ],
      remove_field: [{
        key: 'remove',
        label: 'Удалить'
      }]
    }
  },
  computed: {
    fields () {
      return this.is_edit_mode ? this.default_fields.concat(this.remove_field) : this.default_fields
    }
  }
}
</script>

<style scoped>
.table-hover tbody tr:hover {
  background-color: transparent;
}
</style>
