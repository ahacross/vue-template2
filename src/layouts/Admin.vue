<template>
  <el-container class="Admin">
    <el-aside :style="style.aside">
      <app-menu />
    </el-aside>
    <el-container class="Admin__body" :style="style.body">
      <el-header
        v-if="!this.$route.meta.hideHeader"
        :style="style.header">
        <admin-header />
      </el-header>
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppMenu from './app-menu'
import AdminHeader from '@/layouts/AdminHeader'

export default {
  name: 'Admin',
  data() {
    return {
      style: {
        aside: {
          height: ''
        },
        header: {
          height: ''
        },
        body: {
          height: ''
        }
      },
      headerHeight: 150
    }
  },
  props: {
    options: {
      type: Object
    }
  },
  created() {
    this.setHeight()
    window.addEventListener('resize', this.setHeight)
  },
  methods: {
    setHeight() {
      const innerHeight = window.innerHeight
      this.style.aside.height = `${innerHeight}px`
      this.style.header.height = `${this.headerHeight}px`
      this.style.body.height = `${innerHeight}px`
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.setHeight)
  },
  components: { AdminHeader, AppMenu }
}
</script>

<style scoped lang="scss">
html, body {
  margin: 0;
}

.Admin {
  & .el-aside {
    padding: 20px 0;
    overflow: hidden;
    /*overflow-y: auto;*/
  }
  &__body {
    overflow: auto;
    padding: 20px 0;
    & .el-main {
      overflow: initial;
      padding: 0 20px;
    }
  }
}
</style>
