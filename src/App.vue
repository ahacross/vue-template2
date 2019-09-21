<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>

<script>
import '@/lib/AddPrototype'
import Default from './layouts/Default'
import LayoutDefault from './layouts/LayoutDefault'
import LayoutDefault2 from './layouts/LayoutDefault2'
export default {
  name: 'App',
  data () {
    return {
      layoutComponent: 'div'
    }
  },
  components: { LayoutDefault, LayoutDefault2, Default },
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
* {
  margin: 0;
  padding: 0;
}

html {
  line-height: 1.6;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

p {
  &:not(:first-child) {
    margin-top: 1.25em;
  }
}
</style>
