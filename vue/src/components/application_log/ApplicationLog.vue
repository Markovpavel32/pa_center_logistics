<template>
  <div class="application_log  mt-xl">
    <sub-nav-bar :sub_nav_bar_items="sub_nav_bar_items"></sub-nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import SubNavBar from '../common/SubNavBar'

export default {
  name: 'application-log',
  components: { SubNavBar },
  data () {
    return {
      sub_nav_bar_items: [{
        route: 'application_log_appointment',
        title: 'На прием'
      },
      {
        route: 'application_log_to_issue',
        title: 'На выдачу'
      },
      {
        route: 'application_log_delivery',
        title: 'На доставку'
      }]
    }
  }
}
</script>
<style scoped lang="scss">
</style>
