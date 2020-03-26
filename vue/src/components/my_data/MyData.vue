<template>
    <div class="application_log">
    <b-nav style="padding-left: 40px">
      <b-nav-item :to="{ name: 'products_list' }">
        <i v-if="$route.name === 'products_list'" class="icon-minus"></i>
        <i v-else class="icon-plus"></i>
        {{'Товары'}}
      </b-nav-item>
      <b-nav-item :to="{ name: 'consignees_list' }">
        <i v-if="$route.name === 'consignees_list'" class="icon-minus"></i>
        <i v-else class="icon-plus"></i>
        {{'Грузополучатели'}}
      </b-nav-item>
    </b-nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'my-data'
}
</script>
