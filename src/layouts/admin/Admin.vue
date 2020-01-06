<template>
  <el-container class="Admin">
    <el-aside :style="style.aside">
      <admin-menu />
    </el-aside>
    <el-container class="Admin__Body" :style="style.body">
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AdminMenu from '@/layouts/admin/AdminMenu'
import { numToPX } from '@/lib/Common'
export default {
  name: 'Admin',
  data () {
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
  created () {
    this.setHeight()
    window.addEventListener('resize', this.setHeight)
  },
  methods: {
    setHeight() {
      const innerHeight = numToPX(window.innerHeight)
      const style = this.style

      style.aside.height = innerHeight
      style.body.height = innerHeight
      style.header.height = numToPX(this.headerHeight)
    }
  },
  components: { AdminMenu }
}
</script>

<style scoped lang="scss">
.Admin {
  & .el-aside {
    padding: 20px 0;
    overflow: hidden;
  }

  &__Body {
    flex-direction: column;
    overflow: auto;
    padding: 0;
    & .el-main {
      overflow: initial;
      padding: 0 20px;
    }
  }
}
</style>
