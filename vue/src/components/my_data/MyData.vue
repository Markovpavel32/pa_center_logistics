<template>
    <div class="my_data mt-xl">
    <sub-nav-bar :sub_nav_bar_items="sub_nav_bar_items"></sub-nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import SubNavBar from '../common/SubNavBar'

export default {
  name: 'my-data',
  components: { SubNavBar },
  data () {
    return {
      sub_nav_bar_items: [{
        route: 'products_list',
        title: 'Товары'
      },
      {
        route: 'products_group',
        title: 'Группы товаров'
      },
      {
        route: 'consignees_list',
        title: 'Грузополучатели'
      }]
    }
  }
}
</script>
