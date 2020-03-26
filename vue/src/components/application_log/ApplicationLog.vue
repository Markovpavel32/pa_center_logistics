<template>
  <div class="application_log">
    <b-nav style="padding-left: 40px">
      <b-nav-item :to="{ name: 'application_log_appointment' }">
        <i v-if="$route.name === 'application_log_appointment'" class="icon-minus"></i>
        <i v-else class="icon-plus"></i>
        {{'На прием'}}
      </b-nav-item>
      <b-nav-item :to="{ name: 'application_log_to_issue' }">
        <i v-if="$route.name === 'application_log_to_issue'" class="icon-minus"></i>
        <i v-else class="icon-plus"></i>
        {{'На выдачу'}}
      </b-nav-item>
      <b-nav-item :to="{ name: 'application_log_delivery' }">
        <i v-if="$route.name === 'application_log_delivery'" class="icon-minus"></i>
        <i v-else class="icon-plus"></i>
        {{'На доставку'}}
      </b-nav-item>
    </b-nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'application-log'
}
</script>
