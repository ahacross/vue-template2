<template>
  <el-container class="Default">
    <el-aside :style="mainStyle">
      <app-menu />
    </el-aside>
    <el-main :style="mainStyle">
      <main class="Default__main">
        <slot />
      </main>
    </el-main>
  </el-container>
</template>

<script>
import AppMenu from './app-menu'
export default {
  name: 'Default',
  data() {
    return {
      mainStyle: {
        height: ''
      }
    }
  },
  created() {
    this.setHeight()
    window.addEventListener('resize', this.setHeight)
  },
  methods: {
    setHeight() {
      this.mainStyle.height = `${window.innerHeight}px`
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.setHeight)
  },
  components: { AppMenu }
}
</script>

<style scoped lang="scss">
html, body {
  margin: 0;
}

.Default {
  & .el-aside {
    padding: 20px;
    overflow: hidden;
    /*overflow-y: auto;*/
  }
}
</style>
