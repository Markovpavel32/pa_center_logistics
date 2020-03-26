<template>
  <div class="sub-nav-bar">
    <b-nav>
      <b-nav-item v-for="item in sub_nav_bar_items"
                  class="common_nav_item"
                  :key="item.route"
                  :to="{ name: item.route }">
        <i v-if="$route.name === item.route" class="icon-minus"></i>
        <i v-else class="icon-plus"></i>
        {{ item.title }}
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: 'sub-nav-bar',
  props: {
    sub_nav_bar_items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
