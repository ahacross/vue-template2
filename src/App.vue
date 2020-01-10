<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>

<script>
import '@/lib/validator/AddDirective'
import '@/lib/AddPrototype'
import '@/lib/alert'
import Default from '@/layouts/Default'
import Admin from '@/layouts/admin/Admin'

export default {
  name: 'App',
  data () {
    return {
      layoutComponent: 'div'
    }
  },
  components: { Admin, Default },
  computed: {
    metaLayout () {
      return this.$route.meta.layout
    }
  },
  watch: {
    metaLayout: {
      handler (layout) {
        this.layoutComponent = this.$options.components[layout]
      }
    }
  }
}
</script>

<style lang="scss">
html {
  margin: 0;
  padding: 0;
  line-height: 1.6;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

body {
  margin: 0;
  padding: 0;
}

p {
  &:not(:first-child) {
    margin-top: 1.25em;
  }
}
</style>
