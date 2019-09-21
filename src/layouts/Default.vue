<template>
  <el-container class="Default">
    <el-aside>
      <app-menu />
    </el-aside>
    <el-main>
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
  components: { AppMenu }
}
</script>

<style scoped lang="scss">
html, body {
  margin: 0;
}

.Default {
  & .el-aside {
    padding: 20px
  }
}
</style>
