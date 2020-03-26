<template>
  <div class="bold mb-default d-flex justify-content-between">
    <h3>{{ title }}</h3>
    <slot name="actions"></slot>
</div>
</template>

<script>
export default {
  name: 'page-header',
  props: {
    title: String
  }
}
</script>
