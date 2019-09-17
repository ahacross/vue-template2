<template>
  <div>
    <div class="GridBar">
      <div class="GridBar__title">{{ title }}</div>
      <div class="GridBar__buttons">
        <button>{{ $t('buttons.add') }}</button>
        <button>{{ $t('buttons.del') }}</button>
        <button>{{ $t('buttons.save') }}</button>
        <button>{{ $t('buttons.down') }}</button>
      </div>
    </div>
    <div id="grid"></div>
  </div>
</template>

<script>
import 'tui-grid/dist/tui-grid.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import Grid from 'tui-grid'
export default {
  name: 'tuiTable',
  data () {
    return {
      gridInstance: null
    }
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => {}
    },
    language: {
      type: String,
      default: 'ko'
    },
    theme: {
      type: String,
      default: 'default'
    },
    title: {
      type: String,
      default: ''
    }
  },
  mounted () {
    // default, striped, clean
    Grid.applyTheme(this.theme)
    Grid.setLanguage(this.language)

    this.gridInstance = new Grid(Object.assign({
      el: document.getElementById('grid'),
      columns: this.columns,
      data: JSON.parse(JSON.stringify(this.data))
    }, this.options))
  }
}
</script>
<style lang="scss" scoped>
  .GridBar {
    display: flex;
    margin-bottom: 10px;

    &__title {
      font-weight: 700;
      flex: 1;
    }
    &__buttons {
      > * {
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
</style>
