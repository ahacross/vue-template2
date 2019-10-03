<template>
  <div>
    <el-date-picker></el-date-picker>
    <tuiGrid v-bind="gridProps">
      <template #custom>kakao <el-input placeholder="Please input" size="mini" style="width: 100px" v-model="input"></el-input>
      </template>
    </tuiGrid>
  </div>
</template>

<script>
import TuiGrid from '../components/tuiGrid'
import gridData from '@/apis/tableTempData'
export default {
  name: 'Grid',
  data() {
    // let gridData10000 = []
    // while (gridData10000.length < 10000) {
    //   gridData10000 = gridData10000.concat(gridData)
    // }
    return {
      input: '',
      gridProps: {
        columns: [
          {
            header: 'Name',
            name: 'name',
            editor: {
              type: 'text'
            }
          },
          {
            header: 'Artist',
            name: 'artist',
            editor: 'text'
          },
          {
            header: 'Type',
            name: 'type'
          },
          {
            header: 'Release',
            name: 'release',
            editor: {
              type: 'datePicker',
              options: {
                format: 'yyyy-MM-dd'
              }
            }
          },
          {
            header: 'Genre',
            name: 'genre',
            editor: 'text'
          }
        ],
        data: [],
        options: {
          bodyHeight: 500,
          pageOptions: {
            // useClient: true,
            perPage: 5
          }
        },
        language: 'ko',
        theme: {
          name: 'myTheme',
          value: {
            row: {
              even: {
                background: '#f5f5f5'
              },
              hover: {
                background: '#ccc'
              }
            },
            cell: {
              normal: {
                background: '#fbfbfb',
                border: '#e0e0e0'
              },
              focused: {
                border: '#418ed4'
              },
              disabled: {
                text: '#b0b0b0'
              }
            }
          }
        },
        // theme: 'striped',
        title: '우왕'
      }
    }
  },
  components: { TuiGrid },
  mounted() {
    console.log(this)
    this.gridProps.data = { contents: gridData.slice(3, 10), pagination: { totalCount: gridData.length, page: 3 } }
  }
}
</script>

<style scoped>

</style>
