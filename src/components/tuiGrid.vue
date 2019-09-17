<template>
  <div>
    <div class="GridBar">
      <div class="GridBar__title">{{ title }}</div>
      <slot name="custom"></slot>
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
      type: [String, Object],
      default: 'default'
    },
    title: {
      type: String,
      default: ''
    },
    buttons: {
      type: Object,
      default: () => {
        return {
          add: { hidden: false, disabled: false },
          del: { hidden: false, disabled: false },
          save: { hidden: false, disabled: false },
          down: { hidden: false, disabled: false }
        }
      }
    }
  },
  mounted () {
    this.applyTheme()
    Grid.setLanguage(this.language)

    const gridOptions = {
      rowHeaders: ['checkbox', 'rowNum'],
      rowHeight: 26,
      scrollX: false,
      scrollY: true,
      columnOptions: {
        resizable: true
      }
    }

    this.gridInstance = new Grid(Object.assign({
      el: document.getElementById('grid'),
      columns: this.columns,
      data: JSON.parse(JSON.stringify(this.data))
    }, Object.assign({}, gridOptions, this.options)))

    // data는 observe 기능을 빼고 넣어줘야함.
  },
  methods: {
    applyTheme() {
      if (this.theme) {
        if (typeof this.theme === 'string') {
          // default, striped, clean
          Grid.applyTheme(this.theme)
        } else {
          Grid.applyTheme(this.theme.name, this.theme.value)
        }
      }
    }
  },
  beforeDestroy() {
    Object.keys(this.$listeners).forEach((eventName) => {
      this.gridInstance.off(eventName)
    })
    this.gridInstance.destroy()
    this.gridInstance = null
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
