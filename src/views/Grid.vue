<template>
  <div>
    <el-date-picker></el-date-picker>
    <el-button @click="popupTest01">팝업 테스트</el-button>
    <el-button @click="popupTest02">팝업 테스트2</el-button>

    <modal-popoup ref="test01" title="테스트">
      <template #popup="slotProps">
        <el-form :model="form">
          <el-form-item label="Promotion name" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Zones" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="Please select a zone">
              <el-option label="Zone No.1" value="shanghai"></el-option>
              <el-option label="Zone No.2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="form">
          <el-form-item label="Promotion name" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Zones" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="Please select a zone">
              <el-option label="Zone No.1" value="shanghai"></el-option>
              <el-option label="Zone No.2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="form">
          <el-form-item label="Promotion name" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Zones" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="Please select a zone">
              <el-option label="Zone No.1" value="shanghai"></el-option>
              <el-option label="Zone No.2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="form">
          <el-form-item label="Promotion name" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Zones" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="Please select a zone">
              <el-option label="Zone No.1" value="shanghai"></el-option>
              <el-option label="Zone No.2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="form">
          <el-form-item label="Promotion name" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Zones" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="Please select a zone">
              <el-option label="Zone No.1" value="shanghai"></el-option>
              <el-option label="Zone No.2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="form">
          <el-form-item label="Promotion name" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Zones" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="Please select a zone">
              <el-option label="Zone No.1" value="shanghai"></el-option>
              <el-option label="Zone No.2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="form">
          <el-form-item label="Promotion name" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Zones" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="Please select a zone">
              <el-option label="Zone No.1" value="shanghai"></el-option>
              <el-option label="Zone No.2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
    </modal-popoup>
    <modal-popoup ref="test02" title="이건 또 뭐니">
      <template #popup>
        <span>뭐라고?</span>
      </template>
    </modal-popoup>
    <tuiGrid v-bind="gridProps">
      <template #custom>kakao <el-input placeholder="Please input" size="mini" style="width: 100px" v-model="input"></el-input>
      </template>
    </tuiGrid>
  </div>
</template>

<script>
import TuiGrid from '../components/tuiGrid'
import gridData from '@/apis/tableTempData'
import ModalPopoup from '../components/modalPopoup'
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
          bodyHeight: 3000
          // pageOptions: {
          //   // useClient: true,
          //   perPage: 5
          // }
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
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '140px'
    }
  },
  components: { TuiGrid, ModalPopoup },
  mounted() {
    // this.gridProps.data = { contents: gridData.slice(3, 10), pagination: { totalCount: gridData.length, page: 3 } }
    this.gridProps.data = gridData
  },
  methods: {
    popupTest01() {
      this.$refs.test01.dialogVisible = true
    },
    popupTest02() {
      this.$refs.test02.dialogVisible = true
    }
  }
}
</script>

<style scoped>

</style>
