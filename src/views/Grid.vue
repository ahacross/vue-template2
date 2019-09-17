<template>
  <div>
    <el-date-picker></el-date-picker>
    <tuiGrid v-bind="gridProps">
      <template slot="custom">kakao <el-input placeholder="Please input" v-model="input"></el-input>
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
    let gridData10000 = []
    while (gridData10000.length < 10000) {
      gridData10000 = gridData10000.concat(gridData)
    }
    return {
      input: '',
      gridProps: {
        columns: [
          {
            header: 'Name',
            name: 'name',
            editor: {
              type: 'text'
            },
            onAfterChange(ev) {
              console.log('After change:' + ev)
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
        data: gridData10000,
        options: {
          bodyHeight: 200
        },
        language: 'ko',
        // theme: {
        //   name: 'myTheme',
        //   value: {
        //     cell: {
        //       normal: {
        //         background: '#fbfbfb',
        //         border: '#e0e0e0',
        //         color: '#050505'
        //       },
        //       header: {
        //         background: '#ff0000',
        //         border: '#ffff00'
        //       },
        //       editable: {
        //         background: '#fbfbfb'
        //       }
        //     }
        //   }
        // },
        theme: 'striped',
        title: '우왕'
      }
    }
  },
  components: { TuiGrid }
}
</script>

<style scoped>

</style>
