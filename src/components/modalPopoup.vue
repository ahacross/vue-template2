<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :width="width"
    :fullscreen="fullscreen"
    :modal="modal"
    :top="top"
    :title="title"
    :destroy-on-close="true">
    <slot name="popup"></slot>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">{{ $t('buttons.close') }}</el-button>
      <el-button
        v-if="fnAction"
        type="primary"
        @click="fnAction">{{ $t('buttons.save') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'ModalPopoup',
  data () {
    return {
      dialogVisible: false
    }
  },
  props: {
    title: {
      type: String
    },
    top: {
      type: String,
      default: '15vh'
    },
    width: {
      type: String,
      default: '70%'
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },
    fnAction: {
      type: Function
    }
  },
  methods: {
    open() {
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
