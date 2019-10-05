<template>
  <div>
    <div class="GridBar">
      <div class="GridBar__title">{{ title }}</div>
      <slot name="custom"></slot>
      <div class="GridBar__buttons">
        <el-button
          v-if="buttonAdd.hide"
          :disabled="buttonAdd.disabled"
          size="mini">
          {{ $t('button.add') }}
        </el-button>
        <el-button
          v-if="buttonDel.hide"
          :disabled="buttonDel.disabled"
          size="mini">
          {{ $t('button.del') }}
        </el-button>
        <el-button
          v-if="buttonSave.hide"
          :disabled="buttonSave.disabled"
          size="mini">
          {{ $t('button.save') }}
        </el-button>
        <el-button
          v-if="buttonDown.hide"
          :disabled="buttonDown.disabled"
          @click="clickDownload"
          size="mini">
          {{ $t('button.down') }}
        </el-button>
      </div>
    </div>
    <div :id="gridId"></div>
  </div>
</template>

<script>
import 'tui-grid/dist/tui-grid.css'
import 'tui-pagination/dist/tui-pagination.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import Grid from 'tui-grid'
import { mapGetters } from 'vuex'
import { exportExcel } from '@/lib/FileExport'
import { generateUID } from '@/lib/Common'

export default {
  name: 'tuiTable',
  data () {
    return {
      gridInstance: null,
      gridId: `grid_${generateUID()}`
    }
  },
  props: {
    filename: {
      type: String
    },
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: [Array, Object],
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
    buttonAdd: {
      type: Object,
      default: () => {
        return {
          hide: false, disabled: false
        }
      }
    },
    buttonDel: {
      type: Object,
      default: () => {
        return {
          hide: false, disabled: false
        }
      }
    },
    buttonSave: {
      type: Object,
      default: () => {
        return {
          hide: false, disabled: false
        }
      }
    },
    buttonDown: {
      type: Object,
      default: () => {
        return {
          hide: false, disabled: false
        }
      }
    }
  },
  computed: {
    ...mapGetters(['currentLanguage'])
  },
  mounted () {
    this.applyTheme()
    Grid.setLanguage(this.currentLanguage.grid)
    const gridOptions = {
      rowHeaders: ['checkbox', 'rowNum'],
      rowHeight: 26,
      scrollX: false,
      scrollY: true,
      columnOptions: {
        resizable: true
      },
      usageStatistics: false
    }

    this.gridInstance = new Grid(Object.assign({
      el: document.getElementById(this.gridId),
      columns: this.columns,
      data: JSON.parse(JSON.stringify(this.data))
    }, Object.assign({}, gridOptions, this.options)))
    // data는 observe 기능을 빼고 넣어줘야함.
    // this.gridInstance.on('mouseover', function(e) {
    //   if (e.rowKey || e.rowKey === 0) {
    //     e.instance.focus(e.rowKey)
    //     console.log(e.rowKey)
    //   }
    // })
    this.gridInstance.on('mousedown', function(ev) {
      return ev.stop()
    })
    this.gridInstance.on('click', function(ev) {
      return ev.stop()
    })
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
    },
    clickDownload() {
      exportExcel(this.filename, this.columns, this.data)
    }
  },
  watch: {
    columns: {
      handler(columns) {
        this.gridInstance.setColumns(columns)
      }
    },
    data: {
      handler(data) {
        if (Array.isArray(data)) {
          this.gridInstance.resetData(data)
        } else {
          this.gridInstance.resetData(data.contents)
          const page = this.gridInstance.getPagination()
          page.reset(data.pagination.totalCount)
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
