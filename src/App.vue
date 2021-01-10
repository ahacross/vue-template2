<template>
  <div :class="{wrapper: true}" >
    <component :is="layoutComponent" >
      <router-view />
    </component>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    Empty: () => import('@/views/layouts/empty/Empty'),
    Header: () => import('@/views/layouts/header/Header'),
    Full: () => import('@/views/layouts/full/Full')
  },
  data () {
    return {
      layoutComponent: 'div',
      layout: null,
      prevScrollPos: 0,
      topBtnChk: false
    }
  },
  computed: {
    metaLayout () {
      return this.$route.meta.layout
    }
  },
  watch: {
    metaLayout: {
      handler(layout) {
        console.log(layout)
        this.layoutComponent = this.getComponent(layout)
      }
    }
  },
  methods: {
    getComponent(layout) {
      return this.$options.components[layout || this.$route.meta.layout]
    }
  }
}
</script>
