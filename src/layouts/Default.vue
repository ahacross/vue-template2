<template>
  <el-container class="Main">
    <el-main>
      <slot />
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<style scoped lang="scss">
.Main {
  & .el-main {
    margin: 0;
    padding: 0;
  }
}
</style>
