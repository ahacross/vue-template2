<template>
  <nav class="AppHeader">
    <span v-for="(route, idx) in routes" :key="idx">
      <router-link :to="route.path">{{ route.name.firstUpperCase() }}</router-link>&nbsp;
    </span>
    <div class="AppHeader__user">{{ user ? user.name : 'Loading...' }}</div>
  </nav>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    const routes = this.$router.options.routes
    return {
      user: null,
      routes
    }
  },
  created () {
    setTimeout(() => {
      this.user = { name: 'kakao' }
    }, 2000)
  }
}
</script>

<style scoped lang="scss">
.AppHeader {
  padding-top: 1em;
  padding-bottom: 1em;
  border-bottom: 1px solid #c0c0c0;

  &__user {
    float: right;
  }
}
</style>
