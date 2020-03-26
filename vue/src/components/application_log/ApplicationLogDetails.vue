<template>
  <application-create
    @close="$emit('close', item)"
    :is_edit_mode="is_edit_mode"
    :title="title"
    :item="item"
    :type="type">
      <template v-if="item.status" slot="status">
        <b-button squared class="default-cursor" :variant="status_button(item.status)">{{ item.status }}</b-button>
      </template>
      <template slot="actions">
        <span class="clickable mr-default d-inline-flex align-items-center"
              @click="is_edit_mode = !is_edit_mode">
          <img src="../../assets/retrain.png"
             class="mr-xs"
             width="16"/> <span>Редактировать</span>
        </span>
        <span class="clickable d-inline-flex align-items-center pr-md">
          <img src="../../assets/remove.png"
             class="mr-xs"
             width="16"/> <span>Удалить</span>
        </span>
      </template>
  </application-create>
</template>

<script>
import ApplicationCreate from './ApplicationCreate'
import { STATUS_BUTTONS } from './CONSTANTS'

export default {
  name: 'application-log-details',
  components: {
    ApplicationCreate
  },
  props: {
    type: {
      type: String,
      required: true
    },
    item: {
      required: true,
      type: Object
    },
    title: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      is_edit_mode: false
    }
  },
  methods: {
    status_button (value) {
      return STATUS_BUTTONS[value]
    }
  }
}
</script>
